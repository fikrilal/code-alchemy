# Environment & Configuration

This project validates environment variables at startup via `src/lib/env.ts` (Zod). Missing or invalid values fail fast during build or boot.

## Required Variables (.env.local)
```env
# Spotify OAuth
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback

# GitHub API (GraphQL)
GITHUB_TOKEN=
```

## How to Obtain Credentials
- Spotify
  1) Create an app at https://developer.spotify.com/dashboard
  2) Add Redirect URI: `http://localhost:3000/api/spotify/callback` (and your prod URL)
  3) Get `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
  4) Acquire `SPOTIFY_REFRESH_TOKEN` by completing the OAuth flow once, then persist the refresh token server‑side
- GitHub
  - Create a Personal Access Token (classic); for public contribution stats, no special scopes are required. To be safe, grant `read:user`.

## Validation
- `src/lib/env.ts` uses Zod to parse and validate required variables:
  - Non‑empty strings for all required values
  - Accessed only server‑side (never expose secrets to client code)

## Notes
- Never commit `.env.local`. Use Vercel Environments for production and preview.
- Only expose public config via `NEXT_PUBLIC_*` (none required by default).
- Rotate credentials if leaked; secrets are never logged by the app.
