import "server-only";

import { z } from "zod";

import { hasSpotifyEnv, getSpotifyEnv } from "@/lib/env";
import type {
  SpotifyPlayback,
  SpotifyPlaybackApiResponse,
} from "@/lib/spotify-contract";
export type { SpotifyPlayback, SpotifyTrack } from "@/lib/spotify-contract";

const SpotifyImage = z.object({ url: z.string().url() });
const SpotifyExternalUrls = z.object({ spotify: z.string().url() });
const SpotifyArtist = z.object({ name: z.string() });
const SpotifyTrack = z.object({
  name: z.string(),
  artists: z.array(SpotifyArtist),
  album: z.object({ images: z.array(SpotifyImage) }),
  external_urls: SpotifyExternalUrls,
});

const SpotifyTokenResponse = z.object({
  access_token: z.string().min(1),
  expires_in: z.number().int().positive().optional(),
});

const SpotifyRecentTrackResponse = z.object({
  items: z.array(
    z.object({
      track: SpotifyTrack,
    })
  ),
});

type TokenCache = { accessToken: string; expiresAt: number };

const spotifyTokenCache: TokenCache =
  (globalThis as unknown as { __spotifyTokenCache?: TokenCache }).__spotifyTokenCache ?? {
    accessToken: "",
    expiresAt: 0,
  };

(
  globalThis as unknown as { __spotifyTokenCache?: TokenCache }
).__spotifyTokenCache = spotifyTokenCache;

function setSpotifyTokenCache(entry: TokenCache) {
  Object.assign(spotifyTokenCache, entry);
}

function getFreshSpotifyTokenFromCache(): string | null {
  const now = Date.now();

  return spotifyTokenCache.accessToken && spotifyTokenCache.expiresAt > now
    ? spotifyTokenCache.accessToken
    : null;
}

function rememberSpotifyToken(accessToken: string, expiresInSec: number) {
  setSpotifyTokenCache({
    accessToken,
    expiresAt: Date.now() + Math.max(expiresInSec - 60, 60) * 1000,
  });
}

async function refreshAccessToken(): Promise<string> {
  const spotifyEnv = getSpotifyEnv();
  const cachedToken = getFreshSpotifyTokenFromCache();

  if (cachedToken) {
    return cachedToken;
  }

  const authString = Buffer.from(
    `${spotifyEnv.SPOTIFY_CLIENT_ID}:${spotifyEnv.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: spotifyEnv.SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify token refresh failed (${res.status})`);
  const payload = SpotifyTokenResponse.parse(await res.json());
  const expiresIn = payload.expires_in ?? 3600;

  rememberSpotifyToken(payload.access_token, expiresIn);

  return payload.access_token;
}

function simplify(tr: z.infer<typeof SpotifyTrack>) {
  return {
    name: tr.name,
    artist: tr.artists.map((a) => a.name).join(", "),
    albumImage: tr.album.images[0]?.url ?? "",
    spotifyUrl: tr.external_urls.spotify,
  };
}

type PlaybackCache = {
  value: SpotifyPlayback;
  expiresAt: number;
};

function getSpotifyPlaybackCache(): PlaybackCache | undefined {
  return (globalThis as unknown as { __spotifyTrackCache?: PlaybackCache })
    .__spotifyTrackCache;
}

function setSpotifyPlaybackCache(entry: PlaybackCache) {
  (globalThis as unknown as { __spotifyTrackCache?: PlaybackCache })
    .__spotifyTrackCache = entry;
}

function getFreshSpotifyPlaybackFromCache(
  revalidateSec: number
): SpotifyPlayback | null {
  const trackCache = getSpotifyPlaybackCache();
  const now = Date.now();
  const isFresh = Boolean(
    trackCache && trackCache.expiresAt > now && revalidateSec > 0
  );

  return isFresh && trackCache ? trackCache.value : null;
}

function rememberSpotifyPlayback(playback: SpotifyPlayback, revalidateSec: number) {
  if (revalidateSec <= 0) {
    return;
  }

  setSpotifyPlaybackCache({
    value: playback,
    expiresAt: Date.now() + revalidateSec * 1000,
  });
}

async function fetchCurrentlyPlayingTrack(
  accessToken: string,
  revalidateSec: number
): Promise<z.infer<typeof SpotifyTrack> | null> {
  const currentRes = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: revalidateSec },
    }
  );

  if (currentRes.status === 204) {
    return null;
  }

  if (!currentRes.ok) {
    const text = await currentRes.text();
    throw new Error(`Spotify current failed (${currentRes.status}): ${text}`);
  }

  const currentJson = await currentRes.json();
  return SpotifyTrack.parse(currentJson?.item);
}

async function fetchRecentlyPlayedTrack(
  accessToken: string,
  revalidateSec: number
): Promise<z.infer<typeof SpotifyTrack>> {
  const recentRes = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: revalidateSec },
    }
  );

  if (!recentRes.ok) {
    throw new Error(`Spotify recently played failed (${recentRes.status})`);
  }

  const recentJson = SpotifyRecentTrackResponse.parse(await recentRes.json());
  const recentTrack = recentJson.items[0]?.track;

  if (!recentTrack) {
    throw new Error("Spotify recently played returned no tracks");
  }

  return recentTrack;
}

async function resolveSpotifyPlayback(
  accessToken: string,
  revalidateSec: number
): Promise<SpotifyPlayback> {
  const currentTrack = await fetchCurrentlyPlayingTrack(accessToken, revalidateSec);

  if (currentTrack) {
    return {
      item: simplify(currentTrack),
      isLastPlayed: false,
    };
  }

  const recentTrack = await fetchRecentlyPlayedTrack(accessToken, revalidateSec);

  return {
    item: simplify(recentTrack),
    isLastPlayed: true,
  };
}

export async function getCurrentOrLastPlayed(
  revalidateSec = 60
): Promise<SpotifyPlayback> {
  const cachedPlayback = getFreshSpotifyPlaybackFromCache(revalidateSec);
  if (cachedPlayback) {
    return cachedPlayback;
  }

  const accessToken = await refreshAccessToken();
  const playback = await resolveSpotifyPlayback(accessToken, revalidateSec);

  // Do not fall back to stale playback after cache expiry: recency matters more than availability here.
  rememberSpotifyPlayback(playback, revalidateSec);

  return playback;
}

export async function getSpotifyPlaybackResponse(
  revalidateSec = 60
): Promise<SpotifyPlaybackApiResponse> {
  if (!hasSpotifyEnv()) {
    return { status: "unavailable" };
  }

  try {
    const playback = await getCurrentOrLastPlayed(revalidateSec);
    return { status: "ok", data: playback };
  } catch {
    return {
      status: "error",
      message: "Failed to fetch Spotify track",
    };
  }
}
