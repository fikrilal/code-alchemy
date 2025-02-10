export const revalidate = 120; // Revalidate every 120 seconds

export async function GET(req) {
  console.log("🟢 API Route /api/spotify Hit");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!refreshToken) {
    console.error("❌ No refresh token available.");
    return new Response(
      JSON.stringify({ error: "User authentication required" }),
      { status: 401 }
    );
  }

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
  console.log("✅ Access token refreshed.");

  console.log("🔄 Fetching Currently Playing Track...");
  const currentRes = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 120 }, // 🚀 Enable ISR (Revalidate every 120 sec)
    }
  );

  if (currentRes.status === 204) {
    console.log("🎵 No track playing. Fetching last played track...");
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const recentData = await recentRes.json();
    if (!recentRes.ok || !recentData.items?.length) {
      console.error("❌ Failed to fetch recently played track:", recentData);
      return new Response(
        JSON.stringify({ error: "Failed to fetch recently played track" }),
        { status: recentRes.status }
      );
    }

    return new Response(
      JSON.stringify({ item: recentData.items[0].track, last_played: true }),
      { status: 200 }
    );
  }

  const data = await currentRes.json();
  console.log("✅ Currently Playing Track:", data);
  return new Response(JSON.stringify(data), { status: 200 });
}
