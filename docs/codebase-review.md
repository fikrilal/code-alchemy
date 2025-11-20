# Codebase Review Findings (2025-xx-xx)

Ordered by severity (highest first). Paths are relative to the repo root.

## Critical

- `next.config.mjs`: `headers()` is exported separately from the default config, so Next ignores it. CSP, HSTS, and other hardening headers are not applied, leaving the app without the intended security protections. Move `headers` onto the default export or inline it in the config. Revisit CSP to ensure required domains (e.g., Vercel analytics) are whitelisted without being overly permissive.
- `package.json`: `engines.node` is set to `>=24 <25`, which is not a supported LTS for Next 15 and will fail installs in typical Node 18/20/22 environments (including CI). Align to supported LTS versions to unblock installs and avoid runtime mismatches.

## High

- `src/lib/github.ts` + `src/app/api/githubStats/route.ts` + `src/components/GithubActivity.tsx`: Every stats request loads all contribution years since 2015 (N GraphQL requests) and SWR revalidates on the client. This is high-latency and can exhaust the GitHub PAT rate limit under traffic. Limit the queried window (e.g., last 12–24 months), cache server-side, and avoid client polling for data that can be statically revalidated.
- `src/lib/spotify.ts` + `src/app/api/spotify/route.ts` + `src/components/SpotifyNowPlaying.tsx`: The Spotify access token is refreshed on every poll (each visitor hits refresh + 1–2 data calls every 60s). This increases latency and risks refresh throttling. Cache the token until expiry, reuse between requests, and add backoff/error handling.
- `src/app/(work)/work/[slug]/page.tsx`: When MDX load fails, the page renders a friendly message but still returns HTTP 200 (soft 404). This can be indexed or cached incorrectly. Use `notFound()` for missing content so Next serves a proper 404.

## Medium

- `src/app/(blog)/blog/[slug]/page.tsx`, `src/app/(work)/work/[slug]/page.tsx`: `params` is typed/handled as a `Promise`, but Next supplies a plain object. This diverges from the Next API, weakens type safety, and can confuse future route helpers/static inference. Accept `{ params: { slug: string } }` directly.
- `src/lib/work.ts`: `getWorkSummaries` compiles each MDX sequentially and fully per request. This is unnecessary overhead and will scale poorly as entries grow. Parallelize reads and/or parse frontmatter without compiling full MDX when only summaries are needed.
- `src/components/ui/Button.tsx`: When `as="a"`, the component drops anchor props (e.g., `target`, `rel`, `aria-*`, handlers). This blocks opening in new tabs or adding `rel="noopener"` and analytics. Forward remaining anchor props when rendering as a link.
- `src/app/layout.tsx`: Injects JSON-LD via `dangerouslySetInnerHTML`. Repository rules discourage this. Prefer `metadata` API (e.g., `other`/`script`) or a safe structured-data helper to avoid inline HTML.
- `src/app/layout.tsx`: `next lint` currently fails due to import ordering; lint gating will block CI until imports are grouped per the configured rule.

## Notes / Questions

- Should engines align to Node 18/20/22 LTS (recommended for Next 15)?  
- Should security headers be enabled now? If yes, we need to wire `headers()` into the default export and confirm CSP allows required third-party domains.  
- Are GitHub/Spotify rate limits a concern in production? If so, prioritize caching/backoff and narrower query windows.
