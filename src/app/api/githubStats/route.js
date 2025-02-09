// src/app/api/githubStats/route.js

import { NextResponse } from "next/server";
import { format, parseISO } from "date-fns";

export async function GET(request) {
  const token = process.env.GITHUB_TOKEN;
  const username = "fikrilal";
  const startYear = 2015;
  const currentYear = new Date().getFullYear();

  // Create an array of years from startYear to currentYear
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  // Map each year to a fetch promise that queries contributions for that calendar year.
  // The query now also includes rateLimit info.
  const queries = years.map((year) => {
    const fromDate = `${year}-01-01T00:00:00Z`;
    const toDate = `${year}-12-31T23:59:59Z`;
    const query = `
      query {
        rateLimit {
          limit
          cost
          remaining
          resetAt
        }
        user(login: "${username}") {
          contributionsCollection(from: "${fromDate}", to: "${toDate}") {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;
    return fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  });

  // Execute all queries in parallel
  const results = await Promise.all(queries);

  // Log the rate limit info from the first query (they should be similar for all)
  if (results.length > 0 && results[0].data && results[0].data.rateLimit) {
    console.log("GitHub API Rate Limit:", results[0].data.rateLimit);
  }

  let totalContributionsAllTime = 0;
  let lastCommitDate = null;
  let allDays = [];

  // Process each year's data
  for (const json of results) {
    if (json.data && json.data.user) {
      const calendar =
        json.data.user.contributionsCollection.contributionCalendar;
      totalContributionsAllTime += calendar.totalContributions;

      // Flatten the weekly data into a single array of days for this year
      const days = calendar.weeks.flatMap((week) => week.contributionDays);
      allDays = allDays.concat(days);

      // Find the most recent day (in this year) with contributions
      const yearLastCommit = [...days]
        .reverse()
        .find((day) => day.contributionCount > 0)?.date;
      if (yearLastCommit) {
        if (
          !lastCommitDate ||
          new Date(yearLastCommit) > new Date(lastCommitDate)
        ) {
          lastCommitDate = yearLastCommit;
        }
      }
    }
  }

  // Compute longest streak from allDays
  // Sort allDays by date ascending
  allDays.sort((a, b) => new Date(a.date) - new Date(b.date));
  let longestStreak = 0;
  let currentStreak = 0;

  for (const day of allDays) {
    if (day.contributionCount > 0) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  // Format the last commit date without the year (e.g., "February 8th")
  const formattedLastCommitDate = lastCommitDate
    ? format(parseISO(lastCommitDate), "MMMM do")
    : null;

  return NextResponse.json({
    totalContributions: totalContributionsAllTime,
    lastCommitDate: formattedLastCommitDate,
    longestStreak,
  });
}
