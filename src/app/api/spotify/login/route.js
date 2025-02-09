export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = "user-read-currently-playing user-read-playback-state";

  const authUrl =
    `https://accounts.spotify.com/authorize` +
    `?client_id=${client_id}` +
    `&response_type=code` +
    `&redirect_uri=${redirect_uri}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  console.log("🔄 Redirecting user to Spotify login...");

  return new Response(null, {
    status: 302,
    headers: { Location: authUrl },
  });
}
