// src/app/api/spotify/route.js

export async function GET(req) {
  console.log("🟢 API Route /api/spotify Hit");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // 1. Use the refresh token from the environment variable.
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
  const currentRes = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  // If Spotify returns a 204, it means nothing is currently playing.
  if (currentRes.status === 204) {
    console.log("🎵 No track currently playing. Fetching last played track...");

    // 4. Fetch the last played track from recently played endpoint
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const recentData = await recentRes.json();

    if (!recentRes.ok || !recentData.items || recentData.items.length === 0) {
      console.error("❌ Failed to fetch recently played track:", recentData);
      return new Response(
        JSON.stringify({ error: "Failed to fetch recently played track" }),
        { status: recentRes.status }
      );
    }

    // Extract the last played track from the first item.
    const lastPlayedTrack = recentData.items[0].track;
    console.log("✅ Last played track:", lastPlayedTrack);

    // Return the track info in the same format as the currently playing endpoint.
    // (We add an extra field to indicate it’s the last played track if needed.)
    return new Response(
      JSON.stringify({ item: lastPlayedTrack, last_played: true }),
      {
        status: 200,
      }
    );
  }

  // Handle any other non-OK responses.
  if (!currentRes.ok) {
    const errorText = await currentRes.text();
    return new Response(
      JSON.stringify({
        error: "Failed to fetch currently playing track",
        details: errorText,
      }),
      { status: currentRes.status }
    );
  }

  try {
    const data = await currentRes.json();
    console.log("✅ Currently Playing Track:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("❌ Error parsing Spotify API response:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to parse Spotify response",
      }),
      { status: 500 }
    );
  }
}
