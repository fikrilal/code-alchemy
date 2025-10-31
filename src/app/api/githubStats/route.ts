import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github";

export async function GET() {
  try {
    const stats = await getGithubStats({ revalidateSec: 60 * 60 });
    return NextResponse.json(stats, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}

