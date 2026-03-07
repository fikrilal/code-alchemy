import { NextResponse } from "next/server";

import { getGithubStatsResponse } from "@/lib/github";

export async function GET() {
  const response = await getGithubStatsResponse({ revalidateSec: 60 * 60 });
  return NextResponse.json(response, {
    status: response.status === "error" ? 500 : 200,
  });
}
