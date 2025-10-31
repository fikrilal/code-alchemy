# Contributing

Thanks for helping improve this project. This repository is migrating to a modern, industry‑standard stack: Next.js (App Router) + TypeScript (strict) + MDX + Tailwind + Zod + typed API libs. Please keep changes small, focused, and reversible.

## Setup
- Prereqs: Node.js 24 LTS and npm.
- Install: `npm install`
- Run dev server: `npm run dev`
- Build locally: `npm run build`

## Branch & Commit
- Create feature branches: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`
- Conventional Commits:
  - `feat: add MDX compile util`
  - `fix: sanitize MDX image attrs`
  - `refactor: migrate blog page to TS`

## Before Opening a PR
- Lint: `npm run lint`
- Type check: `npm run typecheck` (add if missing: `tsc --noEmit`)
- Build: `npm run build`
- If the change affects content/MDX, open the preview and verify rendering.

## Pull Requests
- Keep PRs small; one concern per PR.
- Include: summary, acceptance criteria, screenshots (for UI), and linked issue.
- Note breaking changes and migration steps if any.
- Target branch: `main` (Vercel will create a Preview Deployment).

## Code Guidelines (Essentials)
- Server‑first; client islands only for interactivity.
- TypeScript strict; no `any`. Validate env and external data with Zod.
- MDX via `next-mdx-remote/rsc` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`, and `rehype-sanitize`.
- Use `next/image` with proper `sizes`. Tailwind + `@tailwindcss/typography` for posts.

## Reviews
- Expect checks to pass (lint, typecheck, build).
- Reviewers focus on: server/client boundaries, types, content safety, and performance.

## Deployment
- Hosted on Vercel. Each PR gets a Preview URL. Merging to `main` deploys to Production.
