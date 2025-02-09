export async function GET(req) {
  console.log("🔄 Handling Spotify Callback...");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  const urlParams = new URL(req.url);
  const code = urlParams.searchParams.get("code");

  if (!code) {
    console.error("❌ No authorization code found.");
    return new Response(JSON.stringify({ error: "No authorization code" }), {
      status: 400,
    });
  }

  console.log("🔄 Exchanging Code for Access & Refresh Tokens...");
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const tokenData = await tokenResponse.json();
  console.log("🔍 Token Response from Spotify:", tokenData);

  if (!tokenResponse.ok || !tokenData.access_token) {
    console.error("❌ Failed to get Spotify token:", tokenData);
    return new Response(
      JSON.stringify({ error: "Failed to get token", details: tokenData }),
      { status: tokenResponse.status }
    );
  }

  // We'll just store the refresh token in a cookie
  const refreshToken = tokenData.refresh_token;
  if (!refreshToken) {
    console.error("❌ No refresh token received from Spotify.");
    return new Response(
      JSON.stringify({ error: "No refresh token received." }),
      { status: 500 }
    );
  }

  // Set the refresh token in an HTTP‐only cookie
  // Also redirect the user somewhere—home page, “success” page, etc.
  // IMPORTANT: In production add "Secure; HttpOnly; SameSite=Lax" etc.
  const headers = new Headers({
    Location: "/", // or wherever you want to redirect after success
  });
  headers.append(
    "Set-Cookie",
    `spotifyRefreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Lax;`
  );

  console.log("✅ Refresh token saved in cookie. Redirecting...");
  return new Response(null, {
    status: 302,
    headers,
  });
}
