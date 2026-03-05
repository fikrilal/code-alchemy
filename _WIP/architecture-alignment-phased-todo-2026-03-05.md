# Architecture Alignment TODO (Phased)

Date: 2026-03-05  
Source: `_WIP/architecture-audit-2026-03-05.md`

## Goal
Bring the codebase to high-standard, staff-level architecture quality by fully aligning implementation with documented rules (server-first, typed boundaries, security hardening, CI enforcement, and feature-first organization).

## Phase 0 — Tracking Setup

### Objective
Establish execution structure before making changes.

### Tasks
- [ ] Create one tracking issue/board card per phase.
- [ ] Add this TODO file link to project planning docs.
- [ ] Decide target branch strategy (single epic branch vs incremental PRs per phase).

### Done Criteria
- [ ] Phases are tracked with owners and statuses.

---

## Phase 1 — Runtime and CI Contract Alignment

### Objective
Remove environment/tooling drift so local, CI, and deployment run the same contract.

### Tasks
- [x] Choose one Node LTS target for all environments: `22.x`.
- [x] Update `package.json` engines to match chosen target.
- [x] Update CI setup-node version to same target.
- [x] Update docs (`README.md`, `docs/CI_CD.md`, and env/setup docs) to same target.
- [x] Add explicit `npm run typecheck` step to CI workflow.
- [x] Add `npm run test` script in `package.json` (placeholder runner for now).
- [x] Update CI to run `npm run test`.

### Done Criteria
- [x] `package.json`, CI workflow, and docs all declare the same Node version.
- [x] CI executes lint + typecheck + build + test.

---

## Phase 2 — Build and Env Strategy Hardening

### Objective
Stop build brittleness caused by strict env parsing during route collection.

### Tasks
- [x] Decide env policy.
- [ ] Option A: strict CI/preview secrets provisioning for all required env vars.
- [x] Option B: lazy env parsing per API execution path to avoid unrelated build failures.
- [x] Implement selected policy in `src/lib/env.ts` and API routes.
- [x] Ensure `/api/spotify/*` and `/api/githubStats` routes do not break unrelated build outputs.
- [x] Document required env behavior for local, preview, and prod.

### Done Criteria
- [x] `npm run build` succeeds in CI under documented env policy.
- [x] Env behavior is explicit and reproducible.

---

## Phase 3 — Content and Security Hardening

### Objective
Align MDX and CSP implementation with ADR/security targets.

### Tasks
- [x] Add `rehype-sanitize` to blog/work MDX compile pipeline.
- [x] Define sanitize schema compatible with `rehype-pretty-code`, heading anchors, and Mermaid rendering.
- [x] Review Mermaid rendering strategy.
- [x] Remove or strictly constrain `innerHTML` usage.
- [x] Replace `securityLevel: "loose"` unless fully justified and documented.
- [x] Tighten CSP from permissive `unsafe-inline` to nonce/hash-based policy.
- [x] Implement `next-safe` (or equivalent strict CSP mechanism) per ADR direction.
- [x] Validate Vercel Analytics / Speed Insights / fonts against tightened CSP.

### Done Criteria
- [x] MDX output is sanitized with tested allowlist.
- [x] CSP no longer relies on broad `unsafe-inline` defaults (except justified exceptions).

---

## Phase 4 — Feature Boundary and Codebase Hygiene

### Objective
Make architecture boundaries explicit and remove stale code paths.

### Tasks
- [x] Remove unused `WorkCaseStudyClient` import/path or re-activate intentionally.
- [x] Move route composition closer to feature modules where practical.
- [x] Stop importing feature types from `src/lib/*` where feature types exist.
- [x] Update `SelectedWork` to use feature-owned work types directly.
- [x] Audit `src/data/*` for legacy/unused modules and delete or migrate.
- [x] Ensure canonical data source for blog/work remains MDX content folders.

### Done Criteria
- [x] No dead architecture paths in active routes.
- [x] Feature types and feature logic are consistently colocated.

---

## Phase 5 — Server-First and Media Consistency

### Objective
Reduce unnecessary client surface area and standardize image handling.

### Tasks
- [ ] Audit `"use client"` files and classify by required interactivity.
- [ ] Convert static/presentational sections to server components where possible.
- [ ] Keep only small client islands for true interactivity/animation.
- [ ] Replace raw `<img>` usage with `next/image` where feasible.
- [ ] Add proper `sizes` to all relevant `next/image` components.
- [ ] Remove redundant Google font `@import` from global CSS (use `next/font` only).

### Done Criteria
- [ ] Client bundle surface is reduced for marketing/blog/work routes.
- [ ] Image strategy is consistent with engineering rules.

---

## Phase 6 — OAuth and API Flow Coherence

### Objective
Eliminate misleading auth paths and ensure backend behavior is intentional.

### Tasks
- [ ] Decide canonical Spotify refresh token source (env-only vs cookie/session-based flow).
- [ ] Align `/api/spotify/login` + `/api/spotify/callback` behavior with runtime token strategy.
- [ ] Remove unused OAuth artifacts if env-only token refresh remains the approach.
- [ ] Document final Spotify auth architecture in `docs/ENVIRONMENT.md`.

### Done Criteria
- [ ] Spotify auth flow has one coherent model and no dead branches.

---

## Phase 7 — Test and Guardrail Enforcement

### Objective
Add confidence and prevent regression to architecture drift.

### Tasks
- [ ] Add unit tests for env parsing (`src/lib/env.ts`).
- [ ] Add API contract tests for GitHub/Spotify libs (mock external responses).
- [ ] Add MDX compile/sanitization snapshot tests for representative blog/work posts.
- [ ] Enable stricter typed ESLint rules once parser project config is wired:
- [ ] `@typescript-eslint/no-floating-promises`
- [ ] `@typescript-eslint/no-misused-promises`
- [ ] Add lint/type/build/test commands to CI as required gates.

### Done Criteria
- [ ] Test suite exists and runs in CI.
- [ ] ESLint guardrails match engineering-rules intent.

---

## Cross-Phase Acceptance Criteria

- [ ] Local and CI runtime/tool versions are aligned.
- [ ] Build is stable under documented env strategy.
- [ ] Security posture matches ADR intent (sanitized content + strict CSP).
- [ ] Route and feature boundaries are clean and intentional.
- [ ] Client/server split follows server-first discipline.
- [ ] Tests and CI gates prevent reintroduction of current drift.

---

## Suggested Execution Order

1. Phase 1  
2. Phase 2  
3. Phase 3  
4. Phase 4  
5. Phase 5  
6. Phase 6  
7. Phase 7

Reason: this order fixes reliability and security first, then structural hygiene, then long-term guardrails.
