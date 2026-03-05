import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = process.env;

function jsonResponse(payload: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  delete (globalThis as { __githubStatsCache?: unknown }).__githubStatsCache;
  process.env = {
    ...ORIGINAL_ENV,
    GITHUB_TOKEN: "github-test-token",
  };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe("github lib", () => {
  it("maps GraphQL contribution response into stats", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      jsonResponse({
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: {
                totalContributions: 12,
                weeks: [
                  {
                    contributionDays: [
                      { date: "2026-03-01", contributionCount: 1 },
                      { date: "2026-03-02", contributionCount: 2 },
                      { date: "2026-03-03", contributionCount: 0 },
                      { date: "2026-03-04", contributionCount: 3 },
                    ],
                  },
                ],
              },
            },
          },
        },
      })
    );
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getGithubStats } = await import("./github");
    const stats = await getGithubStats({
      username: "fikrilal",
      startYear: 2026,
      revalidateSec: 0,
    });

    expect(stats).toEqual({
      totalContributions: 12,
      lastCommitDate: "March 4th",
      longestStreak: 2,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer github-test-token",
        }),
      })
    );
  });
});
