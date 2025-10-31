# Code Alchemy — Re-Architecture and TypeScript Migration Proposal

This document proposes a pragmatic, incremental re-architecture of the Code Alchemy site and a migration to TypeScript. The goals are safer changes (types), clearer structure (feature-first), improved performance (server components by default), and a content pipeline that’s easy to evolve.

## Goals

- Improve maintainability with a clear, feature-oriented structure.
- Increase safety with TypeScript and runtime validation for env and external APIs.
- Reduce client-side JavaScript by making server the default and isolating interactivity.
- Keep content-driven workflow (Markdown/MDX) but add strong typing and better UX for posts.
- Preserve current behavior during migration; ship incremental improvements without regressions.

## Non‑Goals (for this migration)

- Visual redesign. UX polish is welcome but not the objective.
- Changing hosting/deployment platform.
- Adding a full testing framework beyond light, targeted tests for libraries (optional).

## Architectural Principles

- Feature-first organization: colocate UI + data + types within feature folders.
- Server-first rendering: prefer Server Components and server data functions; limit client islands.
- Typed boundaries: use TypeScript everywhere; Zod (or equivalent) for env and API responses.
- Content-first: keep blog/case studies as content (Markdown/MDX) with typed frontmatter.
- Thin routes: API routes only orchestrate; real logic lives in `src/lib` with types and tests.

## Target Structure (proposed)

```
src/
  app/
    (marketing)/
      page.tsx
      layout.tsx
    (blog)/
      blog/page.tsx
      blog/[slug]/page.tsx
    (work)/
      work/page.tsx           // optional list page
      work/[slug]/page.tsx
    api/
      github-stats/route.ts
      spotify/route.ts
  features/
    blog/
      components/
      lib/
      types.ts
    work/
      components/
      lib/
      types.ts
    about/
      components/
    home/
      components/
  components/
    ui/                       // reusable primitives (Button, Card, Badge, etc.)
  content/
    blog/*.md or *.mdx
    work/*.md or *.mdx        // optional: move case studies to content
  lib/
    env.ts                    // Zod-validated env
    fetch.ts                  // typed fetch wrapper
    markdown.ts               // remark/mdx pipeline utils
    date.ts                   // formatting helpers
  types/
    index.d.ts or shared model types
```

Notes:
- Route Groups partition concerns while reusing shared layouts.
- Keep `@/*` path alias.
- Prefer `next/image` consistently.

## Tooling & Standards

- TypeScript: strict mode, incremental migration (`allowJs: true`) to convert file-by-file.
- ESLint: Next + TypeScript config; consider enabling import/order.
- Prettier: optional; if adopted, configure and integrate with ESLint.
- Tailwind: keep as-is; add `@tailwindcss/typography` for blog post styling.
- Commit style: small, narrative PRs aligned to phases (below) with acceptance criteria.

### Baseline tsconfig (illustrative)

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "incremental": true,
    "allowJs": true,
    "checkJs": false,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["./src", "next-env.d.ts"],
  "exclude": ["node_modules"]
}
```

## Environment Safety

- Add `src/lib/env.ts` with Zod to validate at startup (build/runtime):

```ts
import { z } from "zod";

const EnvSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),
  GITHUB_TOKEN: z.string().min(1)
});

export const env = EnvSchema.parse({
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN
});
```

Use `env` in lib functions and API routes instead of accessing `process.env` directly.

## Content Strategy (Chosen: MDX)

We will use MDX for blog (and optionally work) content to enable rich, component‑driven posts and avoid `dangerouslySetInnerHTML`.

### MDX Stack

- Packages: `@next/mdx`, `next-mdx-remote`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code` (Shiki), `zod`.
- Rendering: compile MDX at request time in App Router using `next-mdx-remote/rsc`’s `compileMDX`.
- Components mapping: central map for elements like `a`, `img`, `pre/code`, plus custom blocks (e.g., Callout).
- Images: map Markdown `img` to a wrapper that uses `next/image` when feasible.

### next.config (enable MDX imports)

```ts
// next.config.mjs (illustrative)
import nextMDX from '@next/mdx';

const withMDX = nextMDX({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const base = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(base);
```

### Compile pattern (App Router)

```ts
// src/features/blog/lib/mdx.ts (illustrative)
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

export async function compilePost(source: string, components?: Record<string, any>) {
  const { content, frontmatter } = await compileMDX<{ [k: string]: unknown }>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrettyCode, { theme: 'github-dark' }]],
      },
    },
  });
  return { content, frontmatter };
}
```

Frontmatter type example:

```ts
export type PostFrontmatter = {
  title: string;
  date: string;            // ISO
  description: string;
  coverImage?: string;
  tags?: string[];
  readTime?: string;
  author?: string;
  authorImage?: string;
  featured?: boolean;
};
```

## External API Patterns

- Move Spotify and GitHub logic into `src/lib/{spotify,github}.ts`.
- Validate responses with Zod; surface typed results to the UI.
- Add lightweight caching (e.g., `fetch` with `next: { revalidate: 60 }` or `cache()` in server components) to reduce rate limits and latency.
- API routes become thin proxies that call typed libs and map errors.

## UI Patterns

- Server by default: lists/detail pages render on the server.
- Client islands: wrap only interactive pieces with `"use client"` (e.g., framer-motion wrappers, mobile menu toggle, Spotify widget, GitHub calendar).
- Reusable primitives in `src/components/ui` (Button, Card, Badge) to reduce duplication.
- MDX rendering: compile to React elements and render directly. No `dangerouslySetInnerHTML` for posts.

## Incremental Migration Plan (PR‑sized steps)

Each phase is shippable and low‑risk. We keep behavior identical where possible.

1) Phase 1: Tooling foundation
- Add tsconfig, ESLint TS config, and optional Prettier.
- Add `src/lib/env.ts` (Zod validation) and migrate API routes to use it.
- Keep `allowJs: true` to avoid big-bang rewrites.

Acceptance: TypeScript compiles, app runs, APIs read env via `env`.

2) Phase 2: MDX content pipeline
- Add `features/blog/types.ts` for typed frontmatter.
- Introduce MDX compilation (`next-mdx-remote/rsc`) and component mapping.
- Support `.mdx` (primary) and optionally `.md` during transition.

Acceptance: Blog pages render identically; posts render as React elements with MDX; code highlighting and heading links work.

3) Phase 3: Route groups + server-first
- Restructure `src/app` into `(marketing)`, `(blog)`, `(work)` groups.
- Convert blog pages to `.tsx`; ensure server components by default; move animation to client wrappers only where needed.

Acceptance: Routes unchanged for users; client bundle size stable or reduced.

4) Phase 4: API libs + caching
- Create `src/lib/spotify.ts` and `src/lib/github.ts` with Zod-validated responses.
- Convert API routes to `.ts`, use typed libs, add revalidation/caching.

Acceptance: Widgets behave the same; fewer network calls; clearer error handling.

5) Phase 5: Components to TypeScript
- Migrate shared primitives (Button, Navbar pieces) then feature components.
- Standardize `next/image`; remove unused imports/data; add `@tailwindcss/typography` to replace heavy custom blog CSS.

Acceptance: No UI regressions; fewer `"use client"` files.

6) Phase 6: Cleanup & docs
- Delete obsolete JS files; update README; add contribution notes and coding standards.

Acceptance: >80% TS coverage by file count; CI passes; docs updated.

## Risks & Mitigations

- Third‑party typing gaps: add `@types/*` or local module shims.
- Server/client boundary changes: test pages after toggling `"use client"`; keep animations isolated.
- Content parsing differences: snapshot a few posts to verify rendering; add `rehype-sanitize` if needed.
- API rate limits: add caching + guardrails in libs; handle 204s and error shapes explicitly.

## Success Metrics

- Type coverage: >80% of codebase in TypeScript.
- Client JS: reduced or unchanged bundle size on key pages (Home, Blog list, Post).
- Stability: no 500s from API routes, validated env at boot.
- DX: faster iteration, fewer runtime type errors, clearer module boundaries.

## Rollout Strategy

- Keep PRs focused and reversible; ship behind small steps.
- Validate each phase locally (and on preview deployments if available).
- Maintain a running checklist tied to the phases above.

## Next Steps (recommended)

- MDX confirmed. Proceed with Phase 1 (TS + env), then Phase 2 (MDX pipeline + blog pages migration).
- We can keep `.md` support temporarily to migrate posts incrementally.

---

Questions and preferences:
- Adopt Prettier or keep existing formatting?
- Any additional metrics or targets (e.g., Lighthouse budgets) you want tracked during migration?
