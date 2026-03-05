import { NextResponse } from "next/server";

export const runtime = "nodejs";

import { getSpotifyEnv } from "@/lib/env";

export async function GET() {
  const spotifyEnv = getSpotifyEnv();
  const scope = "user-read-currently-playing user-read-playback-state";
  const authUrl =
    `https://accounts.spotify.com/authorize` +
    `?client_id=${encodeURIComponent(spotifyEnv.SPOTIFY_CLIENT_ID)}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(spotifyEnv.SPOTIFY_REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  return NextResponse.redirect(authUrl);
}
