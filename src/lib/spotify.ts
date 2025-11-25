import { z } from "zod";

import { env } from "@/lib/env";

const SpotifyImage = z.object({ url: z.string().url() });
const SpotifyExternalUrls = z.object({ spotify: z.string().url() });
const SpotifyArtist = z.object({ name: z.string() });
const SpotifyTrack = z.object({
  name: z.string(),
  artists: z.array(SpotifyArtist),
  album: z.object({ images: z.array(SpotifyImage) }),
  external_urls: SpotifyExternalUrls,
});

export type SimplifiedTrack = {
  name: string;
  artist: string;
  albumImage: string;
  spotifyUrl: string;
};

type TokenCache = { accessToken: string; expiresAt: number };

const spotifyTokenCache: TokenCache =
  (globalThis as unknown as { __spotifyTokenCache?: TokenCache }).__spotifyTokenCache ?? {
    accessToken: "",
    expiresAt: 0,
  };

function setSpotifyTokenCache(entry: TokenCache) {
  (globalThis as unknown as { __spotifyTokenCache?: TokenCache }).__spotifyTokenCache = entry;
}

async function refreshAccessToken(): Promise<string> {
  const now = Date.now();
  if (spotifyTokenCache.accessToken && spotifyTokenCache.expiresAt > now) {
    return spotifyTokenCache.accessToken;
  }

  const authString = Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify token refresh failed (${res.status})`);
  const json = await res.json();
  const access = json?.access_token as string | undefined;
  const expiresIn = typeof json?.expires_in === "number" ? json.expires_in : 3600;
  if (!access) throw new Error("Spotify access token missing in response");
  setSpotifyTokenCache({
    accessToken: access,
    expiresAt: Date.now() + Math.max(expiresIn - 60, 60) * 1000, // refresh a minute before expiry
  });
  return access;
}

function simplify(tr: z.infer<typeof SpotifyTrack>): SimplifiedTrack {
  return {
    name: tr.name,
    artist: tr.artists.map((a) => a.name).join(", "),
    albumImage: tr.album.images[0]?.url ?? "",
    spotifyUrl: tr.external_urls.spotify,
  };
}

export async function getCurrentOrLastPlayed(revalidateSec = 60): Promise<
  | { item: SimplifiedTrack; last_played?: false }
  | { item: SimplifiedTrack; last_played: true }
> {
  type TrackCache = {
    value:
      | { item: SimplifiedTrack; last_played?: false }
      | { item: SimplifiedTrack; last_played: true };
    expiresAt: number;
  };

  const trackCache: TrackCache | undefined = (globalThis as unknown as { __spotifyTrackCache?: TrackCache })
    .__spotifyTrackCache;
  const now = Date.now();
  if (trackCache && trackCache.expiresAt > now && revalidateSec > 0) {
    return trackCache.value;
  }

  const accessToken = await refreshAccessToken();

  const currentRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: revalidateSec },
  });

  if (currentRes.status === 204) {
    const recentRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: revalidateSec },
    });
    if (!recentRes.ok) throw new Error(`Spotify recently played failed (${recentRes.status})`);
    const recentJson = await recentRes.json();
    const track = SpotifyTrack.parse(recentJson?.items?.[0]?.track);
    const result = { item: simplify(track), last_played: true } as const;
    if (revalidateSec > 0) {
      (globalThis as unknown as { __spotifyTrackCache?: TrackCache }).__spotifyTrackCache = {
        value: result,
        expiresAt: Date.now() + revalidateSec * 1000,
      };
    }
    return result;
  }

  if (!currentRes.ok) {
    const text = await currentRes.text();
    throw new Error(`Spotify current failed (${currentRes.status}): ${text}`);
  }
  const currentJson = await currentRes.json();
  const track = SpotifyTrack.parse(currentJson?.item);
  const result = { item: simplify(track) } as const;

  if (revalidateSec > 0) {
    (globalThis as unknown as { __spotifyTrackCache?: TrackCache }).__spotifyTrackCache = {
      value: result,
      expiresAt: Date.now() + revalidateSec * 1000,
    };
  }

  return result;
}
