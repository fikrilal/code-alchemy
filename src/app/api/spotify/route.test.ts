import { beforeEach, describe, expect, it, vi } from "vitest";

describe("spotify route", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("returns 200 for ok responses", async () => {
    vi.doMock("@/lib/spotify", () => ({
      getSpotifyPlaybackResponse: vi.fn().mockResolvedValue({
        status: "ok",
        data: {
          item: {
            name: "Track",
            artist: "Artist",
            albumImage: "https://cdn.example.com/cover.jpg",
            spotifyUrl: "https://open.spotify.com/track/mock",
          },
          isLastPlayed: false,
        },
      }),
    }));

    const { GET } = await import("./route");
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      data: {
        item: {
          name: "Track",
          artist: "Artist",
          albumImage: "https://cdn.example.com/cover.jpg",
          spotifyUrl: "https://open.spotify.com/track/mock",
        },
        isLastPlayed: false,
      },
    });
  });

  it("returns 200 for unavailable responses", async () => {
    vi.doMock("@/lib/spotify", () => ({
      getSpotifyPlaybackResponse: vi.fn().mockResolvedValue({
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
    vi.doMock("@/lib/spotify", () => ({
      getSpotifyPlaybackResponse: vi.fn().mockResolvedValue({
        status: "error",
        message: "Failed to fetch Spotify track",
      }),
    }));

    const { GET } = await import("./route");
    const response = await GET();

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      status: "error",
      message: "Failed to fetch Spotify track",
    });
  });
});
