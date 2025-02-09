// /app/api/spotify/route.js

// A little helper to parse cookies from the request header
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

  // 1. Get refresh token from cookie
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parseCookies(cookieHeader);
  const refreshToken = cookies["spotifyRefreshToken"];

  if (!refreshToken) {
    console.error("❌ No refresh token cookie. User must log in again.");
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

  // (Optional) If Spotify returns a new refresh token, store it in the cookie again
  if (refreshData.refresh_token) {
    const newRefresh = refreshData.refresh_token;
    console.log("🔄 Updating refresh token cookie.");
    // (But be aware we have to set it in the response below if we want to keep the user updated.)
  }

  // 3. Fetch the currently playing track
  console.log("🔄 Fetching Currently Playing Track...");
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const resultText = await res.text(); // Log raw text for debugging
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
      {
        status: 204,
      }
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
