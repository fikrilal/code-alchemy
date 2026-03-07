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

type GithubStatsAggregate = {
  lifetimeContributions: number;
  lastContributionDate: string | null;
  longestStreak: number;
};

const EMPTY_GITHUB_STATS: GithubStats = {
  lifetimeContributions: 0,
  lastContributionDate: null,
  longestStreak: 0,
};

const githubStatsCache: StatsCache =
  (globalThis as unknown as { __githubStatsCache?: StatsCache }).__githubStatsCache ?? {
    value: EMPTY_GITHUB_STATS,
    expiresAt: 0,
    key: "",
  };

(
  globalThis as unknown as { __githubStatsCache?: StatsCache }
).__githubStatsCache = githubStatsCache;

function setGithubStatsCache(entry: StatsCache) {
  Object.assign(githubStatsCache, entry);
}

function getGithubCacheKey(username: string, startYear?: number): string {
  return `${username}:${startYear ?? "all"}`;
}

function getFreshGithubStatsFromCache(cacheKey: string): GithubStats | null {
  const isFresh =
    githubStatsCache.expiresAt > Date.now() && githubStatsCache.key === cacheKey;

  return isFresh ? githubStatsCache.value : null;
}

function getStaleGithubStatsFromCache(cacheKey: string): GithubStats | null {
  return githubStatsCache.key === cacheKey ? githubStatsCache.value : null;
}

function rememberGithubStats(
  cacheKey: string,
  stats: GithubStats,
  revalidateSec: number
) {
  setGithubStatsCache({
    value: stats,
    expiresAt: Date.now() + revalidateSec * 1000,
    key: cacheKey,
  });
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

function getRequestedContributionYears(years: number[], startYear?: number): number[] {
  return years
    .filter((year) => (typeof startYear === "number" ? year >= startYear : true))
    .sort((a, b) => a - b);
}

async function fetchContributionCalendars(
  username: string,
  years: number[],
  revalidateSec: number
): Promise<ContributionCalendarData[]> {
  const now = new Date();

  return Promise.all(
    years.map((year) => {
      const { from, to } = getYearRange(year, now);
      return fetchContributionRange(username, from, to, revalidateSec);
    })
  );
}

function getLastContributionDate(
  days: Array<{ date: string; contributionCount: number }>
): string | null {
  return [...days].reverse().find((day) => day.contributionCount > 0)?.date ?? null;
}

function calculateLongestStreak(
  allDays: Array<{ date: string; contributionCount: number }>
): number {
  const orderedDays = [...allDays].sort((a, b) => a.date.localeCompare(b.date));
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  for (const day of orderedDays) {
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

  return Math.max(longestStreak, currentStreak);
}

function aggregateGithubStats(
  calendars: ContributionCalendarData[]
): GithubStatsAggregate {
  let lifetimeContributions = 0;
  let lastContributionDate: string | null = null;
  const allDays: Array<{ date: string; contributionCount: number }> = [];

  for (const calendar of calendars) {
    lifetimeContributions += calendar.totalContributions;
    const days = calendar.weeks.flatMap((week) => week.contributionDays);
    allDays.push(...days);

    const rangeLastContributionDate = getLastContributionDate(days);
    if (
      rangeLastContributionDate &&
      (!lastContributionDate || rangeLastContributionDate > lastContributionDate)
    ) {
      lastContributionDate = rangeLastContributionDate;
    }
  }

  return {
    lifetimeContributions,
    lastContributionDate,
    longestStreak: calculateLongestStreak(allDays),
  };
}

function formatGithubStats(stats: GithubStatsAggregate): GithubStats {
  return {
    lifetimeContributions: stats.lifetimeContributions,
    lastContributionDate: stats.lastContributionDate
      ? format(parseISO(stats.lastContributionDate), "MMMM do")
      : null,
    longestStreak: stats.longestStreak,
  };
}

export async function getGithubStats(opts?: {
  username?: string;
  startYear?: number;
  revalidateSec?: number;
}): Promise<GithubStats> {
  const username = opts?.username ?? "fikrilal";
  const revalidateSec = opts?.revalidateSec ?? 60 * 60; // 1 hour
  const cacheKey = getGithubCacheKey(username, opts?.startYear);
  const freshCache = getFreshGithubStatsFromCache(cacheKey);

  if (freshCache) {
    return freshCache;
  }

  let years: number[];
  try {
    years = await fetchContributionYears(username, revalidateSec);
  } catch (error) {
    const staleCache = getStaleGithubStatsFromCache(cacheKey);
    if (staleCache) {
      return staleCache;
    }
    throw error;
  }

  const yearsToQuery = getRequestedContributionYears(years, opts?.startYear);

  if (yearsToQuery.length === 0) {
    rememberGithubStats(cacheKey, EMPTY_GITHUB_STATS, revalidateSec);
    return EMPTY_GITHUB_STATS;
  }

  let calendars: ContributionCalendarData[];
  try {
    calendars = await fetchContributionCalendars(
      username,
      yearsToQuery,
      revalidateSec
    );
  } catch (error) {
    const staleCache = getStaleGithubStatsFromCache(cacheKey);
    if (staleCache) {
      return staleCache;
    }
    throw error;
  }

  const stats = formatGithubStats(aggregateGithubStats(calendars));

  rememberGithubStats(cacheKey, stats, revalidateSec);

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
