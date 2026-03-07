import { NextResponse } from "next/server";

import { getSpotifyPlaybackResponse } from "@/lib/spotify";

export async function GET() {
  const response = await getSpotifyPlaybackResponse(60);
  return NextResponse.json(response, {
    status: response.status === "error" ? 500 : 200,
  });
}
