# Code Alchemy Architecture Audit

Historical note: this audit captures the pre-refactor state from 2026-03-05. Some file paths and findings were resolved during the 2026-03-06 architecture normalization work.

Date: 2026-03-05  
Scope: repository-level architecture review (App Router boundaries, feature structure, content pipeline, API design, security posture, CI/quality gates).

## Executive Summary

The codebase has a strong foundation (strict TypeScript config, route groups, typed API libs, MDX pipeline), but it currently suffers from **architecture drift** between documented standards and implementation.

Primary concerns:
1. Security and content-safety drift around MDX/Mermaid rendering.
2. Environment/runtime inconsistency across package, docs, and CI.
3. CI quality gates are weaker than documented standards.
4. Server-first and feature-first rules are only partially enforced.

Overall maturity (architecture): **7/10**  
Current direction is good, but the standards are not yet enforced end-to-end.

## Validation Run

Commands executed:
- `npm install`
- `npm run lint` -> PASS
- `npm run typecheck` -> PASS
- `npm run build` -> FAIL

Build failure reason:
- Zod env parse fails during build route collection for Spotify API routes because required env vars are missing (`SPOTIFY_*`, `GITHUB_TOKEN`).
- Build log: `Failed to collect page data for /api/spotify/login`.

## What’s Good

1. Strong TS baseline is in place.
- Evidence: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, etc. in `tsconfig.json`.

2. App Router route groups are implemented.
- Evidence: `src/app/(marketing|blog|work)` structure, matching target architecture docs.

3. Typed env and typed external API wrappers exist.
- Evidence: [`src/lib/env.ts`](../src/lib/env.ts), [`src/lib/github.ts`](../src/lib/github.ts), [`src/lib/spotify.ts`](../src/lib/spotify.ts).

4. MDX rendering is server-side and component-mapped (no `dangerouslySetInnerHTML` for posts).
- Evidence: [`src/features/blog/lib/mdx.ts`](../src/features/blog/lib/mdx.ts), [`src/features/work/lib/mdx.ts`](../src/features/work/lib/mdx.ts).

5. Blog/work pages support static params + metadata.
- Evidence: [`src/app/(blog)/blog/[slug]/page.tsx`](../src/app/%28blog%29/blog/%5Bslug%5D/page.tsx), [`src/app/(work)/work/[slug]/page.tsx`](../src/app/%28work%29/work/%5Bslug%5D/page.tsx).

6. Baseline security headers are present.
- Evidence: [`next.config.mjs`](../next.config.mjs).

## What’s Bad (Findings)

### High

1. **Content-safety/security drift in MDX pipeline (ADR mismatch).**
- Docs require sanitize in MDX path, but runtime pipeline omits it.
- Evidence:
  - ADR says include `rehype-sanitize`: [`docs/adr/0002-mdx-next-mdx-remote.md:7`](../docs/adr/0002-mdx-next-mdx-remote.md)
  - Blog/work MDX pipeline has no `rehype-sanitize`: [`src/features/blog/lib/mdx.ts:24-40`](../src/features/blog/lib/mdx.ts), [`src/features/work/lib/mdx.ts:33-38`](../src/features/work/lib/mdx.ts)
  - Mermaid uses `securityLevel: "loose"` and `innerHTML`: [`src/features/mdx/Mermaid.tsx:19`](../src/features/mdx/Mermaid.tsx), [`src/features/mdx/Mermaid.tsx:32`](../src/features/mdx/Mermaid.tsx)
- Risk: If content trust assumptions ever change (contributors/CMS/imported content), this becomes an XSS vector.

2. **Runtime/version alignment is inconsistent.**
- `package.json` pins Node `22.x`, while CI/docs target Node `24.x`.
- Evidence:
  - [`package.json:5-7`](../package.json)
  - [`docs/CI_CD.md:11`](../docs/CI_CD.md)
  - [`.github/workflows/ci.yml:16-20`](../.github/workflows/ci.yml)
- Risk: Non-reproducible local vs CI behavior and dependency/tooling drift.

3. **Build gate depends on production secrets during route collection.**
- Env is parsed at module load; API route build collection fails if secrets are absent.
- Evidence:
  - Build failure for `/api/spotify/login`.
  - Env parse at import-time: [`src/lib/env.ts:3-16`](../src/lib/env.ts)
  - Spotify login route imports env directly: [`src/app/api/spotify/login/route.ts:5`](../src/app/api/spotify/login/route.ts)
- Risk: Build pipeline becomes brittle unless all secrets are injected in every environment.

### Medium

4. **CI quality gates do not match documented standards.**
- Docs require lint + typecheck + build; CI only runs lint + build.
- Evidence:
  - Required checks: [`docs/CI_CD.md:4-6`](../docs/CI_CD.md)
  - CI workflow omits typecheck step: [`.github/workflows/ci.yml:25-31`](../.github/workflows/ci.yml)
- Related gap: docs mention `npm run test`, but no `test` script exists.
  - [`docs/TESTING.md:12`](../docs/TESTING.md)
  - [`package.json:8-14`](../package.json)
- Risk: architectural regressions slip into main branch undetected.

5. **Feature-first boundaries are mixed with legacy shared-component coupling.**
- Top routes still compose from monolithic `src/components/*` + `src/lib/*` instead of feature modules.
- Evidence:
  - [`src/app/(marketing)/page.tsx:1-8`](../src/app/%28marketing%29/page.tsx)
  - [`src/app/(blog)/blog/page.tsx:1-5`](../src/app/%28blog%29/blog/page.tsx)
  - [`src/app/(work)/work/page.tsx:1-4`](../src/app/%28work%29/work/page.tsx)
- `SelectedWork` pulls type from lib layer instead of feature type.
  - [`src/components/SelectedWork.tsx:7`](../src/components/SelectedWork.tsx)
- Risk: blurred boundaries, harder future refactors, slower onboarding.

6. **Dead/legacy code path retained in work detail route.**
- `WorkCaseStudyClient` is imported but never used.
- Evidence: [`src/app/(work)/work/[slug]/page.tsx:8`](../src/app/%28work%29/work/%5Bslug%5D/page.tsx)
- Risk: maintenance overhead and conceptual confusion (which rendering path is canonical?).

7. **Server-first rule is partially violated by broad client-surface area.**
- Many full sections are client components with animation/state even for largely static content.
- Example evidence:
  - [`src/app/(marketing)/about/components/MainSection.tsx:1`](../src/app/%28marketing%29/about/components/MainSection.tsx)
  - [`src/components/Footer.tsx:1`](../src/components/Footer.tsx)
  - [`src/components/TechStack.tsx:1`](../src/components/TechStack.tsx)
- Risk: higher client JS than necessary and weaker long-term performance discipline.

8. **Image strategy is inconsistent with engineering rules.**
- Rules prioritize `next/image`; key pages still use raw `<img>`.
- Evidence:
  - Rule: [`docs/engineering-rules.md:23`](../docs/engineering-rules.md)
  - Raw image in blog detail: [`src/app/(blog)/blog/[slug]/page.tsx:126-133`](../src/app/%28blog%29/blog/%5Bslug%5D/page.tsx)
  - Raw image in about: [`src/app/(marketing)/about/components/MainSection.tsx:72-77`](../src/app/%28marketing%29/about/components/MainSection.tsx)
- Risk: inconsistent optimization behavior and avoidable layout/perf issues.

### Low

9. **CSP strategy is weaker than ADR target and conflicts with styling choices.**
- Current CSP permits `unsafe-inline` for style/script.
- ADR recommends nonce/hash-based stricter approach (`next-safe` or equivalent).
- Evidence:
  - CSP values: [`next.config.mjs:5-7`](../next.config.mjs)
  - ADR target: [`docs/adr/0004-csp-next-safe.md:7`](../docs/adr/0004-csp-next-safe.md)

10. **Global CSS has redundant font loading path.**
- Uses `next/font` in layout but also `@import` Google Fonts in global CSS.
- Evidence:
  - `next/font`: [`src/app/layout.tsx:3`](../src/app/layout.tsx)
  - CSS import: [`src/app/globals.css:1`](../src/app/globals.css)
- Risk: unnecessary external request path and avoidable style policy complexity.

11. **Spotify OAuth callback flow appears partially disconnected from runtime token usage.**
- Callback stores refresh token in cookie, but runtime player logic always reads env refresh token.
- Evidence:
  - Cookie set: [`src/app/api/spotify/callback/route.ts:45-48`](../src/app/api/spotify/callback/route.ts)
  - Runtime token source: [`src/lib/spotify.ts:49`](../src/lib/spotify.ts)
- Risk: misleading auth flow and maintainability debt.

## Alignment Plan (Prioritized)

### Phase 1 (Immediate: 1-2 days)

1. Unify runtime contract.
- Pick one Node LTS target (recommended: `24.x`), update `package.json` engines and docs consistently.

2. Align CI with declared quality gates.
- Add explicit `npm run typecheck` in CI.
- Add `npm run test` script (even if initially smoke/unit baseline) so docs and pipeline are truthful.

3. Decide env policy for build.
- Option A (strict): enforce secrets in CI/preview and document mandatory env injection.
- Option B (resilient): parse env lazily per API route invocation and avoid blocking unrelated build artifacts.

### Phase 2 (Security hardening: 2-4 days)

4. Implement a consistent content-safety model.
- Add `rehype-sanitize` with an explicit schema compatible with `rehype-pretty-code` and Mermaid output.
- Remove/replace raw `innerHTML` write path for Mermaid if possible, or constrain accepted diagram grammar + sanitize output.

5. Tighten CSP toward ADR goal.
- Move away from broad `unsafe-inline` policy.
- Use nonce/hash-based policy (via `next-safe` or equivalent pattern).

### Phase 3 (Architecture cleanup: 3-5 days)

6. Consolidate route-to-feature boundaries.
- Move route composition into feature modules where practical.
- Stop importing feature types from lib layer (`WorkSummary` should come from feature type modules).

7. Remove dead paths and stale assets.
- Delete unused `WorkCaseStudyClient` path (or re-activate intentionally).
- Audit and remove unused legacy data files in `src/data` if superseded by MDX content pipeline.

8. Reduce client surface area.
- Keep client islands only for true interactivity.
- Convert purely presentational/animated wrappers to server components with smaller client subcomponents.

### Phase 4 (Reliability and confidence)

9. Add architecture guardrails via tests.
- Frontmatter schema tests for blog/work.
- MDX render/sanitization snapshot tests.
- API lib contract tests for GitHub/Spotify response parsing.

10. Add static analysis guardrails.
- Enable stricter ESLint typed rules currently commented out (`no-floating-promises`, `no-misused-promises`) once ts-eslint project config is wired.

## Final Assessment

You already have many pieces of a high-standard personal-site architecture, but standards enforcement is currently inconsistent.  
If Phase 1 + 2 are completed, this repo becomes significantly more defensible as a “staff-level quality” codebase, not just a visually strong portfolio site.
