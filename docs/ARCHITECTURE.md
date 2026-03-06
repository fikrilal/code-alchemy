# Architecture Overview (Future-State)

This project targets a modern, maintainable structure: Next.js App Router + TypeScript (strict) + MDX + Tailwind + Zod + typed API libs.

## Structure
- Route groups: `src/app/(marketing|blog|work)` with server components by default.
- APIs: thin route handlers in `src/app/api/*` delegating to typed libs.
- Features: `src/features/{about,blog,home,work}/(components|data|lib|types.ts)`.
- Shared libs: `src/lib/{env.ts,github.ts,spotify.ts,markdown.ts,fetch.ts}`.
- UI primitives: `src/components/ui/*`.
- Shared layout: `src/components/layout/*`.
- Content: `src/content/{blog,work}/*.mdx`.

## Principles
- Server‑first; client islands only for interactivity (animations, widgets).
- Typed boundaries: TypeScript strict; Zod for env and external data.
- Content safety: MDX compiled via `next-mdx-remote/rsc` with sanitize and pretty code.
- Caching: `fetch` with `next: { revalidate }` and/or `cache()` for stable data.
- Route ownership: `src/app` owns routing, layouts, metadata, and route handlers. Domain-specific implementation belongs in `src/features`.
- Route-local colocation: only use private folders such as `_components`, `_lib`, or `_data` for files that are truly private to one route segment. Avoid public `components` or `lib` folders inside `src/app`.

## External APIs
- GitHub and Spotify logic live in `src/lib/{github,spotify}.ts` with Zod response schemas and unified error shapes.

## Images & Styling
- `next/image` with `sizes`; Tailwind with `@tailwindcss/typography` for post content.

## References
- Engineering rules: `docs/engineering-rules.md`
- Migration plan: `docs/migration-plan.md`
- Re-architecture proposal: `docs/re-architecture-typescript-migration.md`
