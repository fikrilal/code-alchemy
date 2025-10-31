import { NextResponse } from "next/server";
import { getCurrentOrLastPlayed } from "@/lib/spotify";

export async function GET() {
  try {
    const data = await getCurrentOrLastPlayed(60);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch Spotify track" },
      { status: 500 }
    );
  }
}

