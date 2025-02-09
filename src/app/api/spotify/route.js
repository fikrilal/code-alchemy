// src/app/api/spotify/route.js

import { NextResponse } from "next/server";
import { format, parseISO } from "date-fns";

// A helper to parse cookies from the request header (if needed)
function parseCookies(cookieHeader = "") {
  const cookies = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name && rest.length > 0) {
      cookies[name] = rest.join("=");
    }
  });
  return cookies;
}

export async function GET(req) {
  console.log("🟢 API Route /api/spotify Hit");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // 1. Use the refresh token from the environment variable instead of a cookie.
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refreshToken) {
    console.error("❌ No refresh token available. Set SPOTIFY_REFRESH_TOKEN.");
    return new Response(
      JSON.stringify({ error: "User authentication required" }),
      { status: 401 }
    );
  }

  // 2. Refresh the access token
  console.log("🔄 Refreshing Spotify Access Token...");
  const refreshAuthString = Buffer.from(
    `${client_id}:${client_secret}`
  ).toString("base64");

  const refreshResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${refreshAuthString}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    }
  );

  const refreshData = await refreshResponse.json();
  console.log("🔍 Refresh Token Response:", refreshData);

  if (!refreshResponse.ok || !refreshData.access_token) {
    console.error("❌ Failed to refresh token:", refreshData);
    return new Response(
      JSON.stringify({
        error: "Failed to refresh token",
        details: refreshData,
      }),
      { status: refreshResponse.status }
    );
  }

  const accessToken = refreshData.access_token;
  console.log("✅ Access token refreshed successfully.");

  // 3. Fetch the currently playing track
  console.log("🔄 Fetching Currently Playing Track...");
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const resultText = await res.text();
  console.log("🔍 Spotify API Response:", resultText);

  if (!res.ok) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch currently playing track",
        details: resultText,
      }),
      { status: res.status }
    );
  }

  if (res.status === 204) {
    console.log("🎵 No track currently playing.");
    return new Response(
      JSON.stringify({ message: "No track currently playing" }),
      { status: 204 }
    );
  }

  try {
    const data = JSON.parse(resultText);
    console.log("✅ Currently Playing Track:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error parsing Spotify API response:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to parse Spotify response",
        details: resultText,
      }),
      { status: 500 }
    );
  }
}
