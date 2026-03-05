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
  delete (globalThis as { __spotifyTokenCache?: unknown }).__spotifyTokenCache;
  delete (globalThis as { __spotifyTrackCache?: unknown }).__spotifyTrackCache;
  process.env = {
    ...ORIGINAL_ENV,
    SPOTIFY_CLIENT_ID: "spotify-client-id",
    SPOTIFY_CLIENT_SECRET: "spotify-client-secret",
    SPOTIFY_REFRESH_TOKEN: "spotify-refresh-token",
  };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe("spotify lib", () => {
  it("maps currently playing track into the simplified response", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ access_token: "access-token", expires_in: 3600 }))
      .mockResolvedValueOnce(
        jsonResponse({
          item: {
            name: "Mock Track",
            artists: [{ name: "Artist One" }, { name: "Artist Two" }],
            album: { images: [{ url: "https://cdn.example.com/cover.jpg" }] },
            external_urls: { spotify: "https://open.spotify.com/track/mock-track" },
          },
        })
      );
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getCurrentOrLastPlayed } = await import("./spotify");
    const result = await getCurrentOrLastPlayed(0);

    expect(result).toEqual({
      item: {
        name: "Mock Track",
        artist: "Artist One, Artist Two",
        albumImage: "https://cdn.example.com/cover.jpg",
        spotifyUrl: "https://open.spotify.com/track/mock-track",
      },
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("falls back to recently played when nothing is currently playing", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ access_token: "access-token", expires_in: 3600 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(
        jsonResponse({
          items: [
            {
              track: {
                name: "Recent Track",
                artists: [{ name: "Recent Artist" }],
                album: { images: [{ url: "https://cdn.example.com/recent.jpg" }] },
                external_urls: { spotify: "https://open.spotify.com/track/recent" },
              },
            },
          ],
        })
      );
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getCurrentOrLastPlayed } = await import("./spotify");
    const result = await getCurrentOrLastPlayed(0);

    expect(result).toEqual({
      item: {
        name: "Recent Track",
        artist: "Recent Artist",
        albumImage: "https://cdn.example.com/recent.jpg",
        spotifyUrl: "https://open.spotify.com/track/recent",
      },
      last_played: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
