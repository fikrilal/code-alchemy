import "server-only";

import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { z } from "zod";

import { hasGithubEnv, getGithubEnv } from "@/lib/env";
import type { GithubStats, GithubStatsApiResponse } from "@/lib/github-contract";
export type { GithubStats } from "@/lib/github-contract";

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

type ContributionCalendarData = z.infer<typeof ContributionCalendar>;

const ContributionYearsResponse = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionYears: z.array(z.number()),
      }),
    }),
  }),
});

const ContributionCalendarResponse = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: ContributionCalendar,
      }),
    }),
  }),
});

type StatsCache = {
  value: GithubStats;
  expiresAt: number;
  key: string;
};

const githubStatsCache: StatsCache =
  (globalThis as unknown as { __githubStatsCache?: StatsCache }).__githubStatsCache ?? {
    value: { lifetimeContributions: 0, lastContributionDate: null, longestStreak: 0 },
    expiresAt: 0,
    key: "",
  };

(
  globalThis as unknown as { __githubStatsCache?: StatsCache }
).__githubStatsCache = githubStatsCache;

function setGithubStatsCache(entry: StatsCache) {
  Object.assign(githubStatsCache, entry);
}

async function postGithubQuery(
  query: string,
  variables: Record<string, string>,
  revalidateSec: number
) {
  const { GITHUB_TOKEN } = getGithubEnv();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
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

  return json;
}

async function fetchContributionYears(username: string, revalidateSec: number): Promise<number[]> {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionYears
        }
      }
    }
  `;

  const json = await postGithubQuery(query, { username }, revalidateSec);
  const parsed = ContributionYearsResponse.safeParse(json);

  if (!parsed.success) {
    throw new Error("Invalid GitHub contribution years response shape");
  }

  return parsed.data.data.user.contributionsCollection.contributionYears;
}

async function fetchContributionRange(
  username: string,
  from: Date,
  to: Date,
  revalidateSec: number
): Promise<ContributionCalendarData> {
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

  const json = await postGithubQuery(
    query,
    {
      username,
      from: from.toISOString(),
      to: to.toISOString(),
    },
    revalidateSec
  );
  const parsed = ContributionCalendarResponse.safeParse(json);
  if (!parsed.success) {
    throw new Error("Invalid GitHub response shape");
  }
  return parsed.data.data.user.contributionsCollection.contributionCalendar;
}

function getYearRange(year: number, now: Date) {
  return {
    from: new Date(Date.UTC(year, 0, 1, 0, 0, 0)),
    to:
      year === now.getUTCFullYear()
        ? now
        : new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)),
  };
}

export async function getGithubStats(opts?: {
  username?: string;
  startYear?: number;
  revalidateSec?: number;
}): Promise<GithubStats> {
  const username = opts?.username ?? "fikrilal";
  const revalidateSec = opts?.revalidateSec ?? 60 * 60; // 1 hour
  const cacheKey = `${username}:${opts?.startYear ?? "all"}`;
  const cacheValid = githubStatsCache.expiresAt > Date.now() && githubStatsCache.key === cacheKey;

  if (cacheValid) {
    return githubStatsCache.value;
  }

  let years: number[];
  try {
    years = await fetchContributionYears(username, revalidateSec);
  } catch (error) {
    // Fallback to stale cache if available to avoid hard failures
    if (githubStatsCache.key === cacheKey) {
      return githubStatsCache.value;
    }
    throw error;
  }

  const yearsToQuery = years
    .filter((year) =>
      typeof opts?.startYear === "number" ? year >= opts.startYear : true
    )
    .sort((a, b) => a - b);

  if (yearsToQuery.length === 0) {
    const emptyStats = {
      lifetimeContributions: 0,
      lastContributionDate: null,
      longestStreak: 0,
    };

    setGithubStatsCache({
      value: emptyStats,
      expiresAt: Date.now() + revalidateSec * 1000,
      key: cacheKey,
    });

    return emptyStats;
  }

  const now = new Date();

  let calendars: ContributionCalendarData[];
  try {
    calendars = await Promise.all(
      yearsToQuery.map((year) => {
        const { from, to } = getYearRange(year, now);
        return fetchContributionRange(username, from, to, revalidateSec);
      })
    );
  } catch (error) {
    if (githubStatsCache.key === cacheKey) {
      return githubStatsCache.value;
    }
    throw error;
  }

  let lifetimeContributions = 0;
  let lastContributionDate: string | null = null;
  const allDays: Array<{ date: string; contributionCount: number }> = [];

  for (const calendar of calendars) {
    lifetimeContributions += calendar.totalContributions;
    const days = calendar.weeks.flatMap((week) => week.contributionDays);
    allDays.push(...days);

    const rangeLast = [...days]
      .reverse()
      .find((day) => day.contributionCount > 0)?.date;
    if (rangeLast) {
      if (!lastContributionDate || rangeLast > lastContributionDate) {
        lastContributionDate = rangeLast;
      }
    }
  }

  allDays.sort((a, b) => a.date.localeCompare(b.date));
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  for (const day of allDays) {
    const currentDate = parseISO(day.date);

    if (
      previousDate &&
      differenceInCalendarDays(currentDate, previousDate) > 1
    ) {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }

    if (day.contributionCount > 0) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }

    previousDate = currentDate;
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  const formattedLastContributionDate = lastContributionDate
    ? format(parseISO(lastContributionDate), "MMMM do")
    : null;

  const stats = {
    lifetimeContributions,
    lastContributionDate: formattedLastContributionDate,
    longestStreak,
  };

  setGithubStatsCache({
    value: stats,
    expiresAt: Date.now() + revalidateSec * 1000,
    key: cacheKey,
  });

  return stats;
}

export async function getGithubStatsResponse(opts?: {
  username?: string;
  startYear?: number;
  revalidateSec?: number;
}): Promise<GithubStatsApiResponse> {
  if (!hasGithubEnv()) {
    return { status: "unavailable" };
  }

  try {
    const stats = await getGithubStats(opts);
    return { status: "ok", data: stats };
  } catch {
    return {
      status: "error",
      message: "Failed to fetch GitHub stats",
    };
  }
}
