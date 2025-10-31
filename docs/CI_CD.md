# CI/CD & Deployment

## Checks (PRs)
- Lint: `npm run lint`
- Type check: `npm run typecheck` (`tsc --noEmit`)
- Build: `npm run build`

All checks must pass before merge. Keep PRs small and focused.

## Previews & Production
- Platform: Vercel (Node.js 24 LTS)
- Every PR triggers a Preview Deployment. Validate content rendering (MDX), interactivity, and performance.
- Merge to `main` deploys to Production.

## Performance & Monitoring
- Monitor preview metrics via Vercel (Speed Insights/Monitoring).
- Budget: avoid large client bundles; keep animations in small client islands.

## Env & Runtime Management
- Use Vercel Project Settings for environment variables.
- Production and Preview environments must include required secrets (see `docs/ENVIRONMENT.md`).
- Ensure Node.js version is 24 LTS via package `engines` or Vercel Project Settings.

## Release Notes
- For user-facing changes, add a short summary to the PR. Include screenshots if UI changed.
