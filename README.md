# Code Alchemy

Personal site and content hub built with Next.js App Router, React 19, Tailwind CSS 4, MDX, and Zod-validated server integrations.

## Stack

- Next.js 16
- React 19
- TypeScript 5 (strict)
- Tailwind CSS 4
- MDX via `next-mdx-remote/rsc`
- Zod for env and external data validation
- Vitest for targeted unit tests

## Quick Start

Requirements:

- Node.js 22
- npm

Install and run:

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Environment Variables

The site can run without external API credentials. If the GitHub or Spotify secrets are missing, the related API routes return `204` and the widgets fail soft instead of crashing the app.

Add a `.env.local` file only if you want live widget data:

```bash
GITHUB_TOKEN=...
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

## Available Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run test:watch
```

Recommended validation before commit:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Architecture

The codebase uses a server-first, feature-sliced Next.js App Router structure.

- `src/app` owns routes, layouts, metadata, and route handlers.
- `src/features` owns domain/page-specific UI and logic.
- `src/components/ui` contains reusable primitives.
- `src/components/layout` contains shared site chrome.
- `src/lib` contains infrastructure concerns such as env parsing, API clients, and filesystem helpers.
- `src/content` contains MDX source for blog posts and work case studies.

Current route groups:

- `(marketing)` for the home page and static marketing pages
- `(blog)` for blog index and post routes
- `(work)` for work index and case study routes

## Content Model

Blog posts live in `src/content/blog` as `.md` or `.mdx` files.

Minimal blog frontmatter:

```yaml
---
title: "Post title"
date: "2026-01-01"
description: "Short summary"
coverImage: "/images/blog/example.jpg"
readTime: "8 min read"
---
```

Work case studies live in `src/content/work` as `.md` or `.mdx` files.

Minimal work frontmatter:

```yaml
---
title: "Project title"
slug: "project-slug"
shortDescription: "What this project is"
thumbnail: "/images/project-thumb.png"
date: "2026-01-01"
techStack:
  - "Flutter"
  - "Firebase"
---
```

Notes:

- Blog routes are derived from the filename.
- Work routes are generated from the filename/slug pipeline used by `src/features/work/lib/mdx.ts`.
- Image paths should be absolute site paths such as `/images/blog/example.jpg`.

## Project Layout

```text
src/
  app/
  components/
    layout/
    ui/
  content/
    blog/
    work/
  features/
    about/
    blog/
    home/
    mdx/
    work/
  lib/
```

## Operational Notes

- `npm run dev` uses Turbopack. If you see a `.next/dev/lock` error, another `next dev` process is still running for this repo.
- Production mode is the real acceptance check for rendering issues. Use `npm run build && npm run start` when validating framework or styling changes.
- GitHub and Spotify integrations are server-only and should never expose secrets to client code.

## Deployment

The app is deployable to Vercel or any Node.js host that can run:

```bash
npm run build
npm run start
```

If you want live GitHub/Spotify widgets in production, provide the same environment variables there.
