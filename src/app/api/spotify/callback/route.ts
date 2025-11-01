import { NextResponse } from "next/server";

export const runtime = "nodejs";

import { env } from "@/lib/env";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No authorization code" }, { status: 400 });
  }

  const authString = Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return NextResponse.json(
      { error: "Failed to get token" },
      { status: tokenResponse.status }
    );
  }

  const refreshToken = tokenData.refresh_token as string | undefined;
  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token received" }, { status: 500 });
  }

  const res = NextResponse.redirect(new URL("/", url.origin));
  res.headers.append(
    "Set-Cookie",
    `spotifyRefreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Lax;`
  );
  return res;
}
