import { beforeEach, describe, expect, it, vi } from "vitest";

function htmlResponse(body: string, init?: ResponseInit) {
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    ...init,
  });
}

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  delete (
    globalThis as {
      __githubRepoPreviewCache?: unknown;
    }
  ).__githubRepoPreviewCache;
});

describe("github open graph utilities", () => {
  it("normalizes a standard GitHub repo URL", async () => {
    const { normalizeGithubRepoUrl } = await import("./github-open-graph");

    expect(
      normalizeGithubRepoUrl(
        "https://github.com/fikrilal/mobile-core-kit?tab=readme-ov-file"
      )
    ).toBe("https://github.com/fikrilal/mobile-core-kit");
  });

  it("returns null for non-repository GitHub URLs", async () => {
    const { normalizeGithubRepoUrl } = await import("./github-open-graph");

    expect(normalizeGithubRepoUrl("https://github.com/fikrilal")).toBeNull();
    expect(normalizeGithubRepoUrl("https://example.com/fikrilal/mobile-core-kit")).toBeNull();
  });

  it("parses og metadata even when attributes appear in different orders", async () => {
    const { parseGithubRepoOpenGraphPreview } = await import("./github-open-graph");

    const preview = parseGithubRepoOpenGraphPreview(
      `
        <html>
          <head>
            <meta content="https://opengraph.githubassets.com/hash/fikrilal/mobile-core-kit" property="og:image" />
            <meta property="og:title" content="fikrilal/mobile-core-kit" />
            <meta content="Reusable mobile starter &amp; tooling" property="og:description" />
          </head>
        </html>
      `,
      "https://github.com/fikrilal/mobile-core-kit"
    );

    expect(preview).toEqual({
      repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      imageUrl:
        "https://opengraph.githubassets.com/hash/fikrilal/mobile-core-kit",
      title: "fikrilal/mobile-core-kit",
      description: "Reusable mobile starter & tooling",
    });
  });

  it("returns normalized repo preview metadata from GitHub HTML", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      htmlResponse(`
        <html>
          <head>
            <meta property="og:image" content="https://opengraph.githubassets.com/hash/fikrilal/mobile-core-kit" />
            <meta property="og:title" content="fikrilal/mobile-core-kit" />
            <meta property="og:description" content="Reusable mobile starter" />
          </head>
        </html>
      `)
    );
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getGithubRepoOpenGraphPreview } = await import("./github-open-graph");

    await expect(
      getGithubRepoOpenGraphPreview({
        repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      })
    ).resolves.toEqual({
      repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      imageUrl:
        "https://opengraph.githubassets.com/hash/fikrilal/mobile-core-kit",
      title: "fikrilal/mobile-core-kit",
      description: "Reusable mobile starter",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://github.com/fikrilal/mobile-core-kit",
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "text/html,application/xhtml+xml",
        }),
      })
    );
  });

  it("returns null without fetching when the repo URL is invalid", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getGithubRepoOpenGraphPreview } = await import("./github-open-graph");

    await expect(
      getGithubRepoOpenGraphPreview({
        repoUrl: "https://example.com/fikrilal/mobile-core-kit",
      })
    ).resolves.toBeNull();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reuses a fresh cached preview for identical repo requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      htmlResponse(`
        <html>
          <head>
            <meta property="og:image" content="https://opengraph.githubassets.com/hash/fikrilal/mobile-core-kit" />
          </head>
        </html>
      `)
    );
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getGithubRepoOpenGraphPreview } = await import("./github-open-graph");

    const first = await getGithubRepoOpenGraphPreview({
      repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      revalidateSec: 60,
    });
    const second = await getGithubRepoOpenGraphPreview({
      repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      revalidateSec: 60,
    });

    expect(first).toEqual(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("falls back to stale cache when refresh fails for the same repo", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-27T00:00:00.000Z"));
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        htmlResponse(`
          <html>
            <head>
              <meta property="og:image" content="https://opengraph.githubassets.com/hash/fikrilal/mobile-core-kit" />
            </head>
          </html>
        `)
      )
      .mockRejectedValueOnce(new Error("GitHub unavailable"));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getGithubRepoOpenGraphPreview } = await import("./github-open-graph");

    const fresh = await getGithubRepoOpenGraphPreview({
      repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      revalidateSec: 1,
    });

    vi.setSystemTime(new Date("2026-03-27T00:00:02.000Z"));

    const stale = await getGithubRepoOpenGraphPreview({
      repoUrl: "https://github.com/fikrilal/mobile-core-kit",
      revalidateSec: 1,
    });

    expect(stale).toEqual(fresh);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
