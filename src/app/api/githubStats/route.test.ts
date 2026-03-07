import { beforeEach, describe, expect, it, vi } from "vitest";

describe("githubStats route", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("returns 200 for ok responses", async () => {
    vi.doMock("@/lib/github", () => ({
      getGithubStatsResponse: vi.fn().mockResolvedValue({
        status: "ok",
        data: {
          lifetimeContributions: 100,
          lastContributionDate: "March 7th",
          longestStreak: 10,
        },
      }),
    }));

    const { GET } = await import("./route");
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      data: {
        lifetimeContributions: 100,
        lastContributionDate: "March 7th",
        longestStreak: 10,
      },
    });
  });

  it("returns 200 for unavailable responses", async () => {
    vi.doMock("@/lib/github", () => ({
      getGithubStatsResponse: vi.fn().mockResolvedValue({
        status: "unavailable",
      }),
    }));

    const { GET } = await import("./route");
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "unavailable",
    });
  });

  it("returns 500 for error responses", async () => {
    vi.doMock("@/lib/github", () => ({
      getGithubStatsResponse: vi.fn().mockResolvedValue({
        status: "error",
        message: "Failed to fetch GitHub stats",
      }),
    }));

    const { GET } = await import("./route");
    const response = await GET();

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      status: "error",
      message: "Failed to fetch GitHub stats",
    });
  });
});
