import { NextResponse } from "next/server";

import { getCurrentOrLastPlayed } from "@/lib/spotify";

export async function GET() {
  const hasSpotifyEnv = [
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET,
    process.env.SPOTIFY_REFRESH_TOKEN,
  ].every((value) => value?.trim());

  if (!hasSpotifyEnv) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const data = await getCurrentOrLastPlayed(60);
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Spotify track" },
      { status: 500 }
    );
  }
}
