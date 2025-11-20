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
};

const githubStatsCache: StatsCache =
  (globalThis as unknown as { __githubStatsCache?: StatsCache }).__githubStatsCache ?? {
    value: { totalContributions: 0, lastCommitDate: null, longestStreak: 0 },
    expiresAt: 0,
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

  if (!res.ok) {
    throw new Error(`GitHub API error (${res.status})`);
  }
  const json = await res.json();
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
  const now = new Date();
  const currentYear = now.getFullYear();
  const startYear = Math.min(
    currentYear,
    Math.max(opts?.startYear ?? currentYear - 1, 2008) // default: last two years window; clamp to a sane floor
  );

  const cacheExpiresAt = githubStatsCache.expiresAt;
  if (cacheExpiresAt > Date.now()) {
    return githubStatsCache.value;
  }

  const fromDate = new Date(Date.UTC(startYear, 0, 1, 0, 0, 0));
  const toDate = new Date(Date.UTC(now.getFullYear(), 11, 31, 23, 59, 59));

  const calendar = await fetchContributionRange(username, fromDate, toDate, revalidateSec);

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
  });

  return stats;
}
