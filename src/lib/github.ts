import { env } from "@/lib/env";
import { z } from "zod";
import { format, parseISO } from "date-fns";

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

async function fetchContributionYear(username: string, year: number, revalidateSec: number) {
  const fromDate = `${year}-01-01T00:00:00Z`;
  const toDate = `${year}-12-31T23:59:59Z`;
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${fromDate}", to: "${toDate}") {
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
    body: JSON.stringify({ query }),
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
  const startYear = opts?.startYear ?? 2015;
  const revalidateSec = opts?.revalidateSec ?? 60 * 60; // 1 hour

  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = startYear; y <= currentYear; y++) years.push(y);

  const calendars = await Promise.all(
    years.map((y) => fetchContributionYear(username, y, revalidateSec))
  );

  let totalContributionsAllTime = 0;
  let lastCommitDate: string | null = null;
  const allDays: Array<{ date: string; contributionCount: number }> = [];

  for (const cal of calendars) {
    totalContributionsAllTime += cal.totalContributions;
    const days = cal.weeks.flatMap((w) => w.contributionDays);
    allDays.push(...days);

    const yearLast = [...days].reverse().find((d) => d.contributionCount > 0)?.date;
    if (yearLast) {
      if (!lastCommitDate || new Date(yearLast) > new Date(lastCommitDate)) {
        lastCommitDate = yearLast;
      }
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

  return {
    totalContributions: totalContributionsAllTime,
    lastCommitDate: formattedLastCommitDate,
    longestStreak,
  };
}

