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
  it("returns unavailable without calling Spotify when env is missing", async () => {
    process.env = {
      ...ORIGINAL_ENV,
      SPOTIFY_CLIENT_ID: "",
      SPOTIFY_CLIENT_SECRET: "",
      SPOTIFY_REFRESH_TOKEN: "",
    };
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getSpotifyPlaybackResponse } = await import("./spotify");
    const result = await getSpotifyPlaybackResponse();

    expect(result).toEqual({ status: "unavailable" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

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
      isLastPlayed: false,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("reuses the cached Spotify access token across playback requests", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({ access_token: "access-token", expires_in: 3600 })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          item: {
            name: "First Track",
            artists: [{ name: "Artist One" }],
            album: { images: [{ url: "https://cdn.example.com/cover-1.jpg" }] },
            external_urls: { spotify: "https://open.spotify.com/track/first" },
          },
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          item: {
            name: "Second Track",
            artists: [{ name: "Artist Two" }],
            album: { images: [{ url: "https://cdn.example.com/cover-2.jpg" }] },
            external_urls: { spotify: "https://open.spotify.com/track/second" },
          },
        })
      );
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const { getCurrentOrLastPlayed } = await import("./spotify");

    await getCurrentOrLastPlayed(0);
    const result = await getCurrentOrLastPlayed(0);

    expect(result).toEqual({
      item: {
        name: "Second Track",
        artist: "Artist Two",
        albumImage: "https://cdn.example.com/cover-2.jpg",
        spotifyUrl: "https://open.spotify.com/track/second",
      },
      isLastPlayed: false,
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
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
      isLastPlayed: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
