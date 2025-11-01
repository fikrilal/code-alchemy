import { NextResponse } from "next/server";

export const runtime = "nodejs";

import { env } from "@/lib/env";

export async function GET() {
  const scope = "user-read-currently-playing user-read-playback-state";
  const authUrl =
    `https://accounts.spotify.com/authorize` +
    `?client_id=${encodeURIComponent(env.SPOTIFY_CLIENT_ID)}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(env.SPOTIFY_REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  return NextResponse.redirect(authUrl);
}
