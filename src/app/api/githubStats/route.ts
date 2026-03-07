import { NextResponse } from "next/server";

import { getGithubStats } from "@/lib/github";

export async function GET() {
  if (!process.env.GITHUB_TOKEN?.trim()) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const stats = await getGithubStats({ revalidateSec: 60 * 60 });
    return NextResponse.json(stats, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
