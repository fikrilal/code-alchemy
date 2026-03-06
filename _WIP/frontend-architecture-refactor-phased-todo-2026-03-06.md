# Frontend Architecture Refactor TODO (Phased)

Date: 2026-03-06
Source: `_WIP/frontend-architecture-refactor-proposal-2026-03-06.md`
Status: In Progress

## Goal

Standardize the repo around one clear architecture:

- App Router for routing and layouts
- feature-based organization for page/domain-specific code
- shared `components/ui` and `components/layout`
- infra-only `src/lib`
- server-first rendering with small client islands

This is a consistency refactor, not a rewrite.

---

## Phase 0 - Alignment and Guardrails

### Objective

Freeze the target architecture and avoid ad-hoc folder moves.

### Tasks

- [x] Approve the target architecture in `_WIP/frontend-architecture-refactor-proposal-2026-03-06.md`.
- [x] Decide whether about should become a feature slice (`features/about`) or whether route-local colocation should be the standard for all pages.
- [x] Decision: `about` becomes `src/features/about`; route-local colocation is not the primary standard for this repo.
- [x] Record one canonical folder rule:
  - `app` for routes and layouts
  - `features` for page/domain-specific code
  - `components/ui` and `components/layout` for shared code
  - `lib` for infrastructure only
- [x] Add a short architecture section to `README.md`.

### Done Criteria

- [x] The project has one agreed folder strategy and one agreed ownership rule for new code.

---

## Phase 1 - Route Layout Normalization

### Objective

Use nested layouts for section-level shared UI instead of repeating page chrome.

### Tasks

- [x] Add `layout.tsx` under `src/app/(marketing)`, `src/app/(blog)`, and `src/app/(work)` where it improves clarity.
- [x] Move shared route chrome like `Navbar` and `Footer` into those layouts where appropriate.
- [x] Remove duplicated `Navbar` and `Footer` composition from page files that no longer need it.
- [x] Keep root-level concerns in `src/app/layout.tsx` only.

### Done Criteria

- [x] Page files focus on page-specific content.
- [x] Shared route UI is defined through layouts, not repeated page composition.

---

## Phase 2 - Shared vs Feature Component Cleanup

### Objective

Remove page-specific sections from `src/components`.

### Tasks

- [x] Move home-specific sections from `src/components/*` into `src/features/home/components/*`.
- [x] Move any blog-specific or work-specific sections out of `src/components` unless they are truly cross-feature shared.
- [x] Create `src/components/layout/*` for shared site chrome such as `Navbar` and `Footer`.
- [x] Keep `src/components/ui/*` limited to reusable primitives.

### Candidate Moves

- [x] `src/components/HeroSection.tsx` -> `src/features/home/components/HeroSection.tsx`
- [x] `src/components/PortfolioSection.tsx` -> `src/features/home/components/PortfolioSection.tsx`
- [x] `src/components/BlogSection.tsx` -> `src/features/home/components/BlogSection.tsx`
- [x] `src/components/SelectedWork.tsx` -> `src/features/work/components/SelectedWorkSection.tsx`
- [x] `src/components/Navbar.tsx` -> `src/components/layout/Navbar.tsx`
- [x] `src/components/Footer.tsx` -> `src/components/layout/Footer.tsx`
- [x] Supporting home-only widgets moved under `src/features/home/components/*` (`GithubActivity`, `SpotifyNowPlaying`, `TechStack`, `IconCards`, `SideHustleFlashCard`, `Carousel`, `TextCursor`)

### Done Criteria

- [x] `src/components` no longer contains feature/page sections masquerading as shared components.

---

## Phase 3 - About Page Structure Normalization

### Objective

Stop using a separate structural style for the about page.

### Tasks

- [x] Move `src/app/(marketing)/about/components/*` into `src/features/about/components/*`.
- [x] Move page-specific static data for about into `src/features/about/data/*` if it is only used there.
- [x] Keep `src/app/(marketing)/about/page.tsx` thin and feature-composed.

### Done Criteria

- [x] About uses the same organizational model as home/blog/work.

---

## Phase 4 - Feature-Owned Data and Content Logic

### Objective

Make feature boundaries explicit by moving domain/content logic out of `src/lib`.

### Tasks

- [ ] Move blog aggregation logic from `src/lib/blog.ts` to `src/features/blog/lib/*`.
- [ ] Move work summary/content orchestration from `src/lib/work.ts` to `src/features/work/lib/*`.
- [ ] Update imports so feature modules own their own types and content helpers.
- [ ] Keep `src/lib` only for infra-level concerns like env, API integrations, and generic utilities.

### Done Criteria

- [ ] `src/lib` does not import from feature folders.
- [ ] Feature content orchestration is owned by the relevant feature slice.

---

## Phase 5 - App Folder Colocation Rules

### Objective

Make route-local internals predictable where colocation is useful.

### Tasks

- [ ] Decide whether route-local implementation folders should use private folders such as `_components` and `_lib`.
- [ ] If using route-local colocation, apply it consistently for route-specific utilities only.
- [ ] Avoid mixing route-local feature code with top-level shared feature code unless the ownership rule is clear.

### Done Criteria

- [ ] Contributors can tell whether a file belongs in `app`, `features`, or a route-local private folder.

---

## Phase 6 - Server/Client Boundary Cleanup

### Objective

Tighten the runtime boundary to match server-first Next.js practice.

### Tasks

- [ ] Audit `"use client"` files again after folder cleanup.
- [ ] Mark server-only modules with `import "server-only"` where appropriate.
- [ ] Ensure content parsing, env access, and API integrations stay server-side.
- [ ] Keep client components focused on interactivity, effects, or browser APIs only.

### Done Criteria

- [ ] The server/client boundary is intentional and obvious from file placement and imports.

---

## Phase 7 - Naming, Docs, and Public-Cloneability

### Objective

Make the repo understandable to strangers without oral context.

### Tasks

- [ ] Add a concise architecture section to `README.md`.
- [ ] Document folder ownership with examples.
- [ ] Add a short "where new code goes" section for contributors.
- [ ] Ensure file names communicate ownership clearly.
- [ ] Remove any stale docs that describe a structure different from the real repo.

### Done Criteria

- [ ] A contributor can clone the repo and understand the folder strategy in a few minutes.

---

## Cross-Phase Acceptance Criteria

- [ ] `app` owns routing and layouts, not feature logic.
- [ ] `features` owns page/domain-specific code.
- [ ] `components/ui` and `components/layout` are the only shared component buckets.
- [ ] `src/lib` is infrastructure-only.
- [ ] Blog/work/about/home use one consistent organizational strategy.
- [ ] Shared chrome uses layouts where appropriate.
- [ ] The structure is simple enough for public cloning and contribution.

---

## Suggested Execution Order

1. Phase 0
2. Phase 1
3. Phase 2
4. Phase 3
5. Phase 4
6. Phase 5
7. Phase 6
8. Phase 7

Reason:
First lock the rules, then fix route composition, then clean component ownership, then tighten boundaries, and only after that update public docs.
