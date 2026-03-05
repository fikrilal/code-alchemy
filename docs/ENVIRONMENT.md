# Environment & Configuration

This project validates environment variables with `src/lib/env.ts` (Zod). Validation is performed lazily by feature scope at runtime.

## Runtime Baseline
- Node.js: **22 LTS** (`22.x`) for local development, CI, and deployment.

## Validation Strategy
- Environment variables are validated lazily at runtime per feature scope:
  - Spotify routes/libs validate Spotify-specific variables when invoked.
  - GitHub routes/libs validate `GITHUB_TOKEN` when invoked.
- Build can complete without secrets, but API endpoints that require missing variables will return runtime errors until configured.

## Spotify Auth Architecture
- Canonical model: **env-only refresh token flow**.
- Runtime route: `/api/spotify` only.
- `/api/spotify` uses:
  - `SPOTIFY_CLIENT_ID`
  - `SPOTIFY_CLIENT_SECRET`
  - `SPOTIFY_REFRESH_TOKEN`
- OAuth callback/login routes are intentionally not part of runtime architecture.
- Refresh tokens must be provisioned out-of-band and stored as server secrets.

## Required Variables (.env.local)
```env
# Spotify (server-only refresh flow)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# GitHub API (GraphQL)
GITHUB_TOKEN=
```

## How to Obtain Credentials
- Spotify
  1) Create an app at https://developer.spotify.com/dashboard
  2) Get `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
  3) Acquire a `SPOTIFY_REFRESH_TOKEN` once (for example via Spotify's OAuth tooling or a one-time local script)
  4) Store the refresh token in environment secrets; do not store it in cookies/session for this app
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
