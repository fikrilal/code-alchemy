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
  it("returns unavailable without calling GitHub when env is missing", async () => {
    process.env = {
      ...ORIGINAL_ENV,
      GITHUB_TOKEN: "",
    };
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getGithubStatsResponse } = await import("./github");
    const result = await getGithubStatsResponse();

    expect(result).toEqual({ status: "unavailable" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("aggregates lifetime contribution history across contribution years", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                contributionYears: [2026, 2025],
              },
            },
          },
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                contributionCalendar: {
                  totalContributions: 7,
                  weeks: [
                    {
                      contributionDays: [
                        { date: "2026-01-01", contributionCount: 1 },
                        { date: "2026-01-02", contributionCount: 2 },
                        { date: "2026-01-03", contributionCount: 0 },
                        { date: "2026-03-04", contributionCount: 3 },
                      ],
                    },
                  ],
                },
              },
            },
          },
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                contributionCalendar: {
                  totalContributions: 10,
                  weeks: [
                    {
                      contributionDays: [
                        { date: "2025-12-30", contributionCount: 0 },
                        { date: "2025-12-31", contributionCount: 4 },
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
      revalidateSec: 60,
    });

    expect(stats).toEqual({
      lifetimeContributions: 17,
      lastContributionDate: "March 4th",
      longestStreak: 3,
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.github.com/graphql",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer github-test-token",
        }),
      })
    );
  });

  it("reuses the in-memory cache for identical requests", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                contributionYears: [2026],
              },
            },
          },
        })
      )
      .mockResolvedValueOnce(
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
    const first = await getGithubStats({
      username: "fikrilal",
      startYear: 2026,
      revalidateSec: 60,
    });
    const second = await getGithubStats({
      username: "fikrilal",
      startYear: 2026,
      revalidateSec: 60,
    });

    expect(first).toEqual({
      lifetimeContributions: 12,
      lastContributionDate: "March 4th",
      longestStreak: 2,
    });
    expect(second).toEqual(first);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("falls back to stale stats when refresh fails for the same cache key", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-05T00:00:00.000Z"));

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                contributionYears: [2026],
              },
            },
          },
        })
      )
      .mockResolvedValueOnce(
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
      )
      .mockRejectedValueOnce(new Error("GitHub unavailable"));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    try {
      const { getGithubStats } = await import("./github");

      const fresh = await getGithubStats({
        username: "fikrilal",
        startYear: 2026,
        revalidateSec: 1,
      });

      vi.setSystemTime(new Date("2026-03-05T00:00:02.000Z"));

      const stale = await getGithubStats({
        username: "fikrilal",
        startYear: 2026,
        revalidateSec: 1,
      });

      expect(stale).toEqual(fresh);
      expect(fetchMock).toHaveBeenCalledTimes(3);
    } finally {
      vi.useRealTimers();
    }
  });
});
