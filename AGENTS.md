# Repository Guidelines

## Active Re-Architecture & Migration
- We are actively re-architecting and migrating to a server-first Next.js stack with TypeScript (strict), MDX, Zod, and typed API libs.
- Before making changes, read these docs for context and requirements:
  - `docs/engineering-rules.md`
  - `docs/re-architecture-typescript-migration.md`
  - `docs/migration-plan.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CONTENT_AUTHORING.md`
  - `docs/ENVIRONMENT.md`
- Keep PRs aligned with the migration phases and acceptance criteria. Avoid ad-hoc features or refactors that conflict with the rules above.

## Internet Access & External References
- Always consult authoritative sources when needed (package docs, release notes, API refs, Node LTS table).
- Prefer official sites (npmjs.com, nodejs.org, framework docs) over third-party summaries.
- If internet access is unavailable in the environment, pause and ask the user to provide the needed info or enable access (e.g., exact package versions, links, or excerpts).

## Windows CMD & Git (from this environment)
- Access Windows CMD from bash using `cmd.exe /c "<command>"`.
- Run multiple commands by chaining with `&&` and using `/d` to switch drives:
  - Example: `cmd.exe /c "cd /d C:\\Development\\Web-Project\\code-alchemy && git status"`
- Commit flow via CMD (uses the host Git):
  - Stage: `cmd.exe /c "cd /d C:\\Development\\Web-Project\\code-alchemy && git add -A"`
  - Commit: `cmd.exe /c "cd /d C:\\Development\\Web-Project\\code-alchemy && git commit -m \"feat: message\""`
  - Push: `cmd.exe /c "cd /d C:\\Development\\Web-Project\\code-alchemy && git push origin main"`
- If quoting becomes tricky, write a temporary `.bat` and execute it.
- Line endings: Windows may warn about CRLF; this is expected. Configure as needed: `git config core.autocrlf true`.
- If CMD/Git access is unavailable, pause and ask the user to run the git commands or provide access.

## Project Structure & Module Organization
- App Router with route groups: `src/app/(marketing|blog|work)`; pages are server by default (`page.tsx`, `layout.tsx`).
- APIs are thin handlers: `src/app/api/{github-stats,spotify}/route.ts` calling typed libs.
- Feature-first folders: `src/features/{blog,work}/(components|lib|types.ts)`.
- Shared libs: `src/lib/{env.ts,github.ts,spotify.ts,markdown.ts,fetch.ts}`.
- UI primitives: `src/components/ui/*` (Button, Card, Badge, etc.).
- Content: `src/content/{blog,work}/*.mdx`. Assets in `public/`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start Next.js dev server.
- `npm run build` — type-check and build for production.
- `npm start` — run the production build.
- `npm run lint` — ESLint (Next + TS + a11y + import/order).
- `npm run typecheck` — `tsc --noEmit` (add if missing).
- `npm run test` — unit tests (Vitest or Jest) (add if missing).

## Validate Changes Before Commit
- Always validate locally and iterate until clean:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- For content/MDX or visual changes, verify a local or Vercel Preview render.
- If validation needs internet or env secrets, fetch docs/versions or ask the user to provide access/variables.

## Coding Style & Naming Conventions
- TypeScript strict; no `any`. Prefer `type` aliases; use `satisfies` and `as const` on configs.
- Validate env and external data with Zod (`src/lib/env.ts`, typed API libs).
- Server-first; client islands only for interactivity (framer-motion, widgets).
- MDX via `next-mdx-remote/rsc` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`, and `rehype-sanitize`.
- Use `next/image` with proper `sizes`; Tailwind + `@tailwindcss/typography` for posts.
- Naming: PascalCase components/files in `components/`, camelCase for functions/vars, kebab-case route segments.

## Testing Guidelines
- Unit tests for libs (env, markdown, github/spotify) using Vitest/Jest.
- Snapshot a few MDX posts to catch rendering regressions.
- Optional E2E (Playwright) for blog routing and critical widgets.
- Filenames: `*.test.ts` or `*.spec.ts`. Run with `npm run test`.

## Commit & Pull Request Guidelines
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`.
- Small, reversible PRs aligned to migration phases; include acceptance criteria.
- Link issues, describe changes, add screenshots for visual diffs.
- Before submitting: run `npm run lint`, `npm run typecheck`, and build locally.

## Security & Configuration Tips
- Never log secrets. Read env via `src/lib/env.ts` only.
- Keep tokens/cookies server-only; no client exposure beyond `NEXT_PUBLIC_*`.
- Enforce CSP and security headers (e.g., `next-safe`).
- Do not use `dangerouslySetInnerHTML`; MDX is sanitized and component-mapped.
