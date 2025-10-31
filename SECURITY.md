# Security Policy

## Reporting Vulnerabilities
- Please open a private issue or email the maintainer to report security concerns. Do not file public issues with sensitive details.

## Supported Runtime
- Node.js 24 LTS and Next.js App Router.

## Secrets & Data Handling
- Validate env with Zod in `src/lib/env.ts`. Fail fast on missing/invalid values.
- Never log secrets or access tokens. Keep tokens/cookies server‑only.
- Only `NEXT_PUBLIC_*` vars may be used in client code.

## Content Safety
- MDX is compiled with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`, and `rehype-sanitize`.
- Whitelist MDX components; do not perform network fetches from MDX.

## Platform Security
- Enforce strict CSP and security headers (e.g., via `next-safe`).
- CORS is not required for same-origin usage; avoid relaxing defaults.

## Dependencies
- Prefer minor/patch updates regularly; audit in CI if enabled.

## Production
- Use Vercel Environment Variables; restrict access; rotate credentials if leaked.
