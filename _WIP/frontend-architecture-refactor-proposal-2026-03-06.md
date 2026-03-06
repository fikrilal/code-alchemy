# Frontend Architecture Refactor Proposal

Date: 2026-03-06
Status: Approved
Audience: Project owner and future contributors

## Executive Summary

This project already uses a modern baseline:

- Next.js App Router
- TypeScript strict mode
- server-first rendering by default
- MDX/content-driven pages
- thin API route handlers with typed server libs

The main architectural problem is not that the repo uses the wrong paradigm. The problem is that it uses multiple organizational styles at once:

- feature-sliced folders in `src/features/*`
- broad shared sections in `src/components/*`
- route-local page sections in `src/app/(marketing)/about/components/*`

That inconsistency makes the codebase harder to learn than it needs to be, especially for external contributors cloning the repo.

This proposal recommends a consistency refactor, not a rewrite:

- Keep Next.js App Router and server-first rendering
- Keep content-first MDX architecture
- Standardize on feature-based organization for page/domain-specific code
- Restrict `src/components` to shared layout and reusable UI primitives
- Restrict `src/lib` to infrastructure and cross-cutting utilities
- Use nested layouts and route groups more intentionally

This is closer to current mainstream Next.js practice than trying to force mobile-style Clean Architecture into a personal website.

Decision recorded on 2026-03-06:

- `about` will become a feature slice under `src/features/about`
- route-local colocation will not be the primary organizational strategy for this repo

## Current-State Assessment

### What is working well

- Route entrypoints are thin and mostly delegate to feature modules or server libs.
- Blog and work content are content-driven and typed.
- API routes are thin wrappers over dedicated server libs.
- The app largely respects server components by default.
- Route groups already exist in `src/app/(marketing)`, `src/app/(blog)`, and `src/app/(work)`.

### Current structural issues

1. `src/components` is overloaded.
   It contains true shared components such as `Navbar`, `Footer`, and `ui/*`, but it also contains page-specific sections such as `HeroSection`, `PortfolioSection`, `BlogSection`, and `SelectedWork`.

2. The codebase mixes folder strategies.
   Blog and work mostly use `src/features/*`, while about uses route-local components under `src/app/(marketing)/about/components`.

3. Shared page chrome is duplicated.
   `Navbar` and `Footer` are composed repeatedly in page-level files instead of using nested layouts.

4. `src/lib` contains both infrastructure and feature/domain logic.
   For example, `src/lib/work.ts` depends on `src/features/work/*`, which weakens the boundary between cross-cutting code and feature-owned code.

5. Route groups are present, but segment layouts are underused.
   The current structure gets the naming benefit without fully using layout composition for section-level shared UI.

## Recommended Target Architecture

The recommended target is:

**Next.js App Router + server-first rendering + feature-based organization + shared UI/layout folders + infra-only lib**

This is the best fit for the project because:

- it matches the current Next.js ecosystem
- it keeps the code simple for a personal site
- it is easy for contributors to navigate
- it avoids overengineering
- it scales cleanly as the site grows

## Why Not Clean Architecture?

Flutter-style Clean Architecture works well when:

- business rules are complex
- domain workflows are long-lived
- multiple data sources and repository abstractions are central
- platform independence is a serious requirement

That is not the main shape of this codebase.

This project is primarily:

- route-driven
- content-driven
- UI-heavy
- server-rendered
- integration-light

For a site like this, strict entities/use-cases/repositories across every area would add ceremony without improving clarity. The more natural boundary in modern Next.js is:

- route segment
- feature slice
- server vs client boundary
- shared UI vs feature-owned UI

## Proposed Folder Structure

```text
src/
  app/
    (marketing)/
      layout.tsx
      page.tsx
      about/
        page.tsx
    (blog)/
      layout.tsx
      blog/
        page.tsx
        [slug]/
          page.tsx
    (work)/
      layout.tsx
      work/
        page.tsx
        [slug]/
          page.tsx
    api/
      githubStats/route.ts
      spotify/route.ts

  features/
    home/
      components/
        HeroSection.tsx
        PortfolioSection.tsx
        BlogSection.tsx
        SelectedWorkSection.tsx
      lib/
    about/
      components/
      data/
    blog/
      components/
      lib/
      types.ts
    work/
      components/
      lib/
      types.ts
    mdx/
      components.tsx
      Mermaid.tsx
      remark-mermaid.ts
      sanitize-schema.ts

  components/
    layout/
      Navbar.tsx
      Footer.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx

  content/
    blog/
    work/

  lib/
    env.ts
    github.ts
    spotify.ts
    images.ts
```

## Architecture Rules for This Repo

### 1. `app` is routing and composition only

`src/app` should contain:

- route files
- layouts
- metadata
- error and loading boundaries
- thin composition only

`app` should not become the place where page-specific business logic accumulates.

### 2. `features` owns page/domain-specific code

Anything specific to home, blog, work, or about should live under a corresponding feature folder.

Examples:

- `HeroSection` belongs to `features/home`
- blog detail/list helpers belong to `features/blog`
- about page sections belong to `features/about`

### 3. `components` is for shared primitives and shared site chrome only

Allowed categories:

- `components/ui/*` for reusable primitives
- `components/layout/*` for cross-site layout pieces

Avoid placing feature sections in `src/components` unless they are reused across unrelated features and truly deserve to be shared.

### 4. `lib` is infrastructure only

Good examples:

- environment parsing
- typed API integrations
- image/path utilities

Bad examples:

- feature summaries
- blog/work content orchestration that depends on feature modules

Feature-owned logic should move into `features/*/lib`.

### 5. Favor server components and small client islands

Keep data fetching and content assembly on the server.

Use client components only for:

- local state
- effects
- browser APIs
- interactive widgets
- animation wrappers where the animation is actually client-side

### 6. Use layouts for shared route-section UI

Blog, work, and marketing segments should use nested layouts when they share UI. Repeating `Navbar` and `Footer` in multiple pages is unnecessary once route groups already exist.

## Expected Refactor Outcomes

If implemented well, this refactor should produce:

- clearer ownership for each file
- less duplication in route composition
- easier onboarding for contributors
- fewer confusing cross-imports
- cleaner app-vs-feature-vs-lib boundaries
- a more standard public portfolio template structure

## What Will Not Change

This proposal does not require:

- a visual redesign
- a runtime model rewrite
- moving away from App Router
- replacing MDX
- introducing repository/use-case layers everywhere

The goal is architectural clarity, not architectural novelty.

## Risks

1. Over-refactoring layout composition
   Moving too much into layouts can make shared UI harder to vary per route if done carelessly.

2. Unnecessary file movement without boundary cleanup
   Renaming folders alone will not help if imports still cross boundaries arbitrarily.

3. Regressions during page section relocation
   Moving feature sections out of `src/components` should be done incrementally, with lint/type/build verification after each phase.

## Success Criteria

- A new contributor can predict where new code belongs without asking.
- Every page-specific section has a clear feature owner.
- `src/components` no longer acts like a general dumping ground.
- `src/lib` no longer depends on feature-owned modules.
- Marketing/blog/work shared chrome is expressed through layouts where appropriate.
- README and architecture docs explain the structure in one screenful.

## Implementation Strategy

This should be implemented as a sequence of small, reversible phases.

Recommended order:

1. Document target boundaries
2. Introduce nested segment layouts
3. Move feature-specific sections out of `src/components`
4. Normalize about page structure into `src/features/about`
5. Move blog/work aggregation logic into feature-owned libs
6. Tighten server/client boundaries and cleanup
7. Update README and contributor docs

## References

Official Next.js documentation:

- Project Structure: https://nextjs.org/docs/app/getting-started/project-structure
- Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Layouts and Pages: https://nextjs.org/docs/app/getting-started/layouts-and-pages

Relevant local docs:

- `docs/engineering-rules.md`
- `docs/re-architecture-typescript-migration.md`
- `docs/migration-plan.md`
- `docs/ARCHITECTURE.md`
