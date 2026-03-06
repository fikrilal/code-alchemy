# Architecture Overview

This project uses a server-first Next.js App Router structure with feature slices, shared UI/layout buckets, MDX content, and typed server integrations.

## Structure
- Route groups: `src/app/(marketing|blog|work)` with server components by default.
- APIs: thin route handlers in `src/app/api/*` delegating to typed libs.
- Features: `src/features/{about,blog,home,work}/(components|data|lib|types.ts)`.
- Shared libs: `src/lib/{env.ts,github.ts,spotify.ts,images.ts}`.
- UI primitives and low-level shared wrappers: `src/components/ui/*`.
- Shared layout: `src/components/layout/*`.
- App-shell-private helpers: `src/app/_*/*` when a helper belongs only to the root app shell or a single route segment.
- Content: `src/content/{blog,work}/*.mdx`.

## Principles
- Server‑first; client islands only for interactivity (animations, widgets).
- Typed boundaries: TypeScript strict; Zod for env and external data.
- Content safety: MDX compiled via `next-mdx-remote/rsc` with sanitize and pretty code.
- Caching: `fetch` with `next: { revalidate }` and/or `cache()` for stable data.
- Route ownership: `src/app` owns routing, layouts, metadata, and route handlers. Domain-specific implementation belongs in `src/features`.
- Route-local colocation: only use private folders such as `_components`, `_lib`, `_data`, or `_providers` for files that are truly private to one route segment or the root app shell. Avoid public `components` or `lib` folders inside `src/app`.
- Server boundaries: env parsing, external API clients, content loading, and filesystem helpers are fenced with `server-only`.

## Where New Code Goes
- Put new pages, layouts, metadata, and route handlers in `src/app`.
- Put page/domain logic in the owning feature slice under `src/features`.
- Put shared primitives or reusable motion wrappers in `src/components/ui`.
- Put shared site chrome in `src/components/layout`.
- Put infra-level code in `src/lib`.
- Use `src/app/**/_*` folders only when a file is genuinely route-private.

## External APIs
- GitHub and Spotify logic live in `src/lib/{github,spotify}.ts` with Zod response schemas and unified error shapes.

## Images & Styling
- `next/image` with `sizes`; Tailwind with `@tailwindcss/typography` for post content.

## References
- Engineering rules: `docs/engineering-rules.md`
- Migration plan: `docs/migration-plan.md`
- Re-architecture proposal: `docs/re-architecture-typescript-migration.md`
