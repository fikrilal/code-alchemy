# Code Alchemy — Migration Plan (Incremental TODOs)

This document breaks the re‑architecture and TypeScript migration into small, reversible PRs. It aligns with the engineering rules and proposal docs and is designed for safe rollout with clear acceptance criteria.

Scope: Next.js (App Router) • TypeScript • MDX • Tailwind • Zod‑validated env • Typed external API libs.

## Guiding Principles
- Server‑first rendering; client islands only for true interactivity (motion, widgets).
- TypeScript everywhere; Zod for env and external data validation.
- MDX for content with a whitelisted component map and pretty code highlighting.
- Thin API routes that call typed libs with caching/revalidate.
- Small, reversible PRs; no visual or URL changes unless stated.

---

## Phase 0 — Prep & Guardrails
- Decide MDX approach: compile at request time via `next-mdx-remote/rsc` (preferred).
- Create tracking issues per phase; add “no visual changes” note where applicable.
- Set up CI: `npm ci && next build && next lint` on PRs.

Acceptance
- CI is green on a no‑op PR.
- No route or visual changes.

---

## Phase 1 — Tooling Baseline (TypeScript + Lint + Env)
PR‑sized tasks
- Add strict `tsconfig.json` with `allowJs: true`, path alias `@/*`, and `next-env.d.ts`.
- Extend ESLint with `@typescript-eslint`, `jsx-a11y`, and `import/order` (keep Prettier optional).
- Add `@tailwindcss/typography` (will leverage in Phase 2; keep current prose CSS for now).
- Add `src/lib/env.ts` (Zod‑validated env) and wire it for reading required variables.

Acceptance
- `next build` passes under strict TS config (with JS allowed).
- ESLint runs with new rules.
- `env.ts` parses all required vars successfully with valid `.env.local`.

---

## Phase 2 — MDX Content Pipeline (Blog)
PR‑sized tasks
- Add MDX compiler utility: `src/features/blog/lib/mdx.ts` using `next-mdx-remote/rsc` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code` (Shiki). Optionally `rehype-sanitize` if untrusted content is possible.
- Introduce `src/features/blog/types.ts` with typed frontmatter.
- Migrate blog detail page to render MDX React elements (remove `dangerouslySetInnerHTML`). Support `.md` and `.mdx` during transition.
- Apply `@tailwindcss/typography` classes to post content; keep visuals equivalent.
- Keep current URLs and page structure intact.

Acceptance
- Existing posts render identically (title, cover, content, code highlighting, anchor links).
- No `dangerouslySetInnerHTML` for posts.
- List page reads metadata only and does not parse full content.

---

## Phase 3 — Route Groups + Server‑First
PR‑sized tasks
- Introduce route groups to organize concerns without altering URLs: `(marketing)`, `(blog)`, `(work)`.
- Ensure pages are server components by default; isolate motion to leaf client wrappers.
- Standardize images to `next/image` with correct `sizes` on hero/cover/grid media.

Acceptance
- No URL changes; navigation works exactly as before.
- Client JS size stable or reduced on Home/Blog key pages.
- Visual parity maintained.

---

## Phase 4 — Typed External API Libs + Caching
PR‑sized tasks
- Create `src/lib/github.ts` with Zod‑validated response schemas, typed fetchers, and caching (`fetch(..., { next: { revalidate: 3600 } })` or `cache()`).
- Create `src/lib/spotify.ts` similarly; remove any sensitive logging; define clear error shapes.
- Convert API routes to TypeScript and make them thin wrappers:
  - `src/app/api/githubStats/route.ts`
  - `src/app/api/spotify/route.ts`
- Use `env` from `src/lib/env.ts` in all server code.

Acceptance
- Widgets function as before; reduced upstream calls verified by logs.
- No secrets logged; consistent error JSON shapes.
- Build and lint pass; types enforced across libs and routes.

---

## Phase 5 — Components to TypeScript + UI Primitives
PR‑sized tasks
- Add `src/components/ui` primitives (Button, Card, Badge, etc.) in TS and adopt incrementally.
- Migrate non‑interactive components to TS; reduce `"use client"` where not needed.
- Address a11y: headings/labels/alt/focus states; resolve `jsx-a11y` lint warnings.

Acceptance
- No UI regressions; pages render as before.
- Lint clean; no runtime type errors.
- Client islands limited to interactive parts.

---

## Phase 6 — Work/Case Studies Content (Optional)
Two options
- Content‑first: move case studies to MDX (`src/content/work/*.mdx`) with frontmatter and render via the MDX pipeline.
- Data‑first: keep structured data but add a Zod schema and render with server components.
- Implement `generateStaticParams` and SEO metadata for work routes either way.

Acceptance
- Work detail routes unchanged; pages render identically.
- Content/data is typed or validated at load time.

---

## Phase 7 — Cleanup & DX
PR‑sized tasks
- Remove obsolete JS files superseded by TS; drop bespoke prose CSS replaced by typography.
- Add `error.js` and `not-found.js` where appropriate in route groups.
- Optional: Security headers (CSP via `next-safe`) and monitoring (Sentry/Vercel).
- Refresh README and add contribution notes aligned to these phases.

Acceptance
- >80% of files in TS by count.
- Build, type‑check, and lint pass in CI.
- Docs updated; onboarding is clear.

---

## Parallelization Notes
- Phase 1 tasks can be split into multiple PRs (tsconfig, eslint, env) and run in parallel.
- Phase 2 (MDX) should land before Phase 3 touches blog routes.
- Phase 4 libs can start once `env.ts` exists; route conversions come after libs.
- Phase 5 (components to TS) can proceed in parallel with Phase 4.

---

## Risks & Mitigations
- Third‑party typing gaps → add `@types/*` or local module shims.
- Server/client boundary regressions → test pages when removing `"use client"`; isolate motion wrappers.
- Content parsing differences → snapshot a few posts; enable `rehype-sanitize` if needed.
- API rate limits → caching, typed error shapes, and graceful fallbacks.

---

## Success Criteria
- Type coverage: >80% of code in TypeScript.
- Client JS: reduced or stable on Home/Blog key pages.
- Content safety: MDX only; no raw HTML injection for posts.
- Stability: validated env at boot; API routes typed, cached, and never log secrets.

---

## Tracking Checklist (copy into GitHub issues)

- [x] Phase 0: CI created; MDX approach confirmed (next‑mdx‑remote/rsc). Tracking issues pending.
- [x] Phase 1: tsconfig added; ESLint updated (warn-only for disruptive rules during migration); typography plugin installed; `src/lib/env.ts` added.
- [x] Phase 2: MDX utility added; blog detail migrated off `dangerouslySetInnerHTML` to server-rendered MDX; list continues to use metadata only; visuals preserved.
- [x] Phase 3: Route groups added; pages server‑first; standardized `next/image` on blog list/cover with sizes.
- [x] Phase 4: `src/lib/github.ts` and `src/lib/spotify.ts` implemented with Zod + caching; API routes converted to TS and thinned; env consumed via `src/lib/env.ts`.
- [x] Phase 5: UI primitives created (Button, Card, Badge in TS); initial adoption in work page; further component TS migration and a11y cleanups planned.
- [ ] Phase 6: Work/case studies typed (MDX or Zod schema) with SSG params and metadata.
- [ ] Phase 7: Obsolete JS and custom prose CSS removed; error/not‑found routes; docs updated.

---

## Decision Log (fill as you go)
- MDX pipeline: next‑mdx‑remote/rsc (request‑time compile) ✅
- Sanitization: Yes — enable `rehype-sanitize` with a schema compatible with `rehype-pretty-code` and autolinked headings.
- Prettier adoption: Yes — integrate with ESLint and lint-staged.
- Monitoring: Yes — use Vercel Monitoring initially; consider Sentry for deeper error tracking.
- Security headers/CSP: Yes — add strict CSP via `next-safe` (nonce/hash-based) and standard security headers.
