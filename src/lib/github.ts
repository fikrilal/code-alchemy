import { z } from "zod";
import { format, parseISO } from "date-fns";

import { env } from "@/lib/env";

const ContributionDay = z.object({
  date: z.string(),
  contributionCount: z.number(),
});

const ContributionWeek = z.object({
  contributionDays: z.array(ContributionDay),
});

const ContributionCalendar = z.object({
  totalContributions: z.number(),
  weeks: z.array(ContributionWeek),
});

const ContributionsResponse = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: ContributionCalendar,
      }),
    }),
  }),
});

type ContributionsResponse = z.infer<typeof ContributionsResponse>;

type StatsCache = {
  value: GithubStats;
  expiresAt: number;
  username: string;
  fromISO: string;
  toISO: string;
};

const githubStatsCache: StatsCache =
  (globalThis as unknown as { __githubStatsCache?: StatsCache }).__githubStatsCache ?? {
    value: { totalContributions: 0, lastCommitDate: null, longestStreak: 0 },
    expiresAt: 0,
    username: "",
    fromISO: "",
    toISO: "",
  };

function setGithubStatsCache(entry: StatsCache) {
  (globalThis as unknown as { __githubStatsCache?: StatsCache }).__githubStatsCache = entry;
}

async function fetchContributionRange(username: string, from: Date, to: Date, revalidateSec: number) {
  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: revalidateSec },
  });

  const json = await res.json();
  const errorMessages =
    Array.isArray(json?.errors) && json.errors.length > 0
      ? json.errors.map((e: { message?: string }) => e.message ?? "Unknown error").join("; ")
      : null;

  if (!res.ok || errorMessages) {
    throw new Error(`GitHub API error (${res.status}): ${errorMessages ?? "request failed"}`);
  }

  const parsed = ContributionsResponse.safeParse(json);
  if (!parsed.success) {
    throw new Error("Invalid GitHub response shape");
  }
  return parsed.data.data.user.contributionsCollection.contributionCalendar;
}

export type GithubStats = {
  totalContributions: number;
  lastCommitDate: string | null; // e.g., "February 8th"
  longestStreak: number;
};

export async function getGithubStats(opts?: {
  username?: string;
  startYear?: number;
  revalidateSec?: number;
}): Promise<GithubStats> {
  const username = opts?.username ?? "fikrilal";
  const revalidateSec = opts?.revalidateSec ?? 60 * 60; // 1 hour
  const toDate = new Date();
  const fromDate = (() => {
    if (typeof opts?.startYear === "number") {
      return new Date(Date.UTC(opts.startYear, 0, 1, 0, 0, 0));
    }
    const fallback = new Date(toDate);
    fallback.setFullYear(toDate.getFullYear() - 1); // default: trailing 12 months
    return fallback;
  })();

  const cacheExpiresAt = githubStatsCache.expiresAt;
  const cacheValid =
    cacheExpiresAt > Date.now() &&
    githubStatsCache.username === username &&
    githubStatsCache.fromISO === fromDate.toISOString() &&
    githubStatsCache.toISO === toDate.toISOString();

  if (cacheValid) {
    return githubStatsCache.value;
  }

  let calendar;
  try {
    calendar = await fetchContributionRange(username, fromDate, toDate, revalidateSec);
  } catch (error) {
    // Fallback to stale cache if available to avoid hard failures
    if (githubStatsCache.value.totalContributions > 0) {
      return githubStatsCache.value;
    }
    throw error;
  }

  let totalContributionsAllTime = 0;
  let lastCommitDate: string | null = null;
  const allDays: Array<{ date: string; contributionCount: number }> = [];

  totalContributionsAllTime += calendar.totalContributions;
  const days = calendar.weeks.flatMap((w) => w.contributionDays);
  allDays.push(...days);

  const rangeLast = [...days].reverse().find((d) => d.contributionCount > 0)?.date;
  if (rangeLast) {
    if (!lastCommitDate || new Date(rangeLast) > new Date(lastCommitDate)) {
      lastCommitDate = rangeLast;
    }
  }

  allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let longestStreak = 0;
  let currentStreak = 0;
  for (const day of allDays) {
    if (day.contributionCount > 0) currentStreak++;
    else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  const formattedLastCommitDate = lastCommitDate ? format(parseISO(lastCommitDate), "MMMM do") : null;

  const stats: GithubStats = {
    totalContributions: totalContributionsAllTime,
    lastCommitDate: formattedLastCommitDate,
    longestStreak,
  };

  setGithubStatsCache({
    value: stats,
    expiresAt: Date.now() + revalidateSec * 1000,
    username,
    fromISO: fromDate.toISOString(),
    toISO: toDate.toISOString(),
  });

  return stats;
}
