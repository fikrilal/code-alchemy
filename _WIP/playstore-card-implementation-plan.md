# Play Store Card Implementation Plan

## Status

- Status: Draft
- Scope: Work detail pages only
- Depends on: `_WIP/playstore-card-scraping-proposal.md`

## Summary

This plan breaks the Play Store card feature into small, reversible phases. The implementation should remain server-first, failure-tolerant, and safe to ship incrementally.

Core rule:

- the work detail page must never depend on Play Store scraping to render successfully

The existing `playStoreUrl` flow must continue working even when the scraper fails.

## Implementation Principles

- Keep scraping logic server-only.
- Hide third-party scraper output behind an internal adapter.
- Cache aggressively.
- Fail soft.
- Ship the data layer before the UI layer.
- Preserve the current static CTA as a fallback until the richer card is proven stable.

## Phase 1: Data Contract and Frontmatter

### Goal

Establish the stable internal types and the explicit content contract before integrating the scraper.

### Tasks

- Add `playStoreAppId?: string` to the work frontmatter type.
- Keep `playStoreUrl?: string` as-is.
- Define the normalized Play Store data type in the codebase.
- Add a small utility to parse `appId` from `playStoreUrl` as a fallback path.

### Files Likely Touched

- `src/features/work/types.ts`
- `src/content/work/*.mdx` for projects that already have `playStoreUrl`
- `src/lib/playstore.ts` or a colocated type file if preferred

### Suggested Normalized Type

```ts
export type PlayStoreAppPublicInfo = {
  appId: string;
  title: string;
  summary?: string;
  icon?: string;
  installsLabel?: string;
  minInstalls?: number;
  maxInstalls?: number;
  rating?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  developer?: string;
  storeUrl: string;
};
```

### Exit Criteria

- work frontmatter supports `playStoreAppId`
- app id can be derived from URL when explicit value is absent
- normalized shape is defined and independent from scraper-specific naming

### Validation

- `npm run lint`
- `npm run typecheck`

## Phase 2: Server Adapter

### Goal

Create a single server-only abstraction over `google-play-scraper`.

### Tasks

- Install `google-play-scraper`
- Add `src/lib/playstore.ts`
- Implement a function that:
  - accepts `appId`
  - calls `google-play-scraper.app()`
  - normalizes fields into `PlayStoreAppPublicInfo`
  - returns `null` on failure

### Recommended API

```ts
export async function getPlayStoreAppPublicInfo(
  input: { appId: string; lang?: string; country?: string }
): Promise<PlayStoreAppPublicInfo | null>
```

### Adapter Responsibilities

- validate the input before calling the scraper
- map third-party fields to internal fields
- avoid leaking scraper field names into page components
- centralize locale defaults such as `lang` and `country`

### Files Likely Touched

- `package.json`
- `package-lock.json`
- `src/lib/playstore.ts`

### Exit Criteria

- scraper dependency installed
- server adapter returns normalized data
- invalid ids or upstream failures return `null` instead of throwing into the route

### Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Phase 3: Caching and Safeguards

### Goal

Prevent repeated live scraping and make the integration operationally safe.

### Tasks

- Add server-side caching or revalidation around the adapter
- Choose a conservative revalidation interval such as 12 hours
- Add structured logging for failures on the server side
- Ensure the adapter cannot crash page rendering

### Recommended Behavior

- cache by `appId`
- do not fetch on every request
- do not block the page with hard dependency semantics
- use best-effort fetch semantics

### Files Likely Touched

- `src/lib/playstore.ts`

### Exit Criteria

- repeated page requests do not repeatedly scrape the Play Store
- failures are observable in logs
- missing or invalid app metadata does not cause route failure

### Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Phase 4: Work Detail Route Integration

### Goal

Wire Play metadata into the work detail route without changing the current user-visible fallback behavior.

### Tasks

- Update the work detail page to:
  - read `playStoreAppId`
  - derive app id from `playStoreUrl` when needed
  - call the Play Store adapter server-side
  - pass the result into the work detail UI
- Keep the current Play Store button path working even if the richer data is unavailable

### Route-Level Rules

- if `playStoreUrl` does not exist, do nothing
- if `playStoreUrl` exists and Play metadata succeeds, expose both CTA and structured metadata
- if `playStoreUrl` exists and Play metadata fails, render the CTA only

### Files Likely Touched

- `src/app/(work)/work/[slug]/page.tsx`
- possibly new work-specific prop types in `src/features/work`

### Exit Criteria

- route loads Play metadata only when needed
- route remains resilient when metadata is unavailable
- no client-side fetch is introduced

### Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Phase 5: Play Store Card UI

### Goal

Render a dedicated Play Store card in the work detail experience using normalized server data.

### Tasks

- Add a dedicated `PlayStoreCard` component
- Render:
  - app icon
  - app title
  - app id
  - short summary
  - installs label
  - rating
  - reviews count
  - developer name
  - CTA to open the Play Store page
- Handle missing optional fields gracefully

### Recommended Placement

- richer card in the supporting facts area / sticky aside
- existing or upgraded Play Store CTA in the hero action cluster

### UI Rules

- never render empty value placeholders
- do not promise exact installs if only bucketed installs labels are available
- keep the card visually secondary to the main project hero, not the hero itself

### Files Likely Touched

- `src/features/work/components/PlayStoreCard.tsx`
- `src/features/work/components/WorkStickyAside.tsx` or equivalent
- `src/app/(work)/work/[slug]/page.tsx`

### Exit Criteria

- pages with Play Store data show the richer metadata card
- pages without complete data still look intentional
- pages without Play Store links show no Play-specific empty container

### Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Phase 6: Hardening and Verification

### Goal

Ensure the feature behaves correctly under real-world failure modes.

### Tasks

- add targeted tests for:
  - app-id parsing from URL
  - normalized adapter mapping
  - adapter soft-fail behavior
- manually verify:
  - valid Play Store app
  - invalid app id
  - missing `playStoreAppId` with valid `playStoreUrl`
  - project with no Play Store data
- verify mobile and desktop rendering

### Suggested Test Areas

- parsing utility tests
- adapter mapping tests with mocked scraper response
- route-level conditional rendering tests if practical

### Files Likely Touched

- `src/lib/playstore.test.ts`
- possibly existing test setup depending on chosen structure

### Exit Criteria

- core data utilities are covered
- page behavior is verified for both success and failure paths
- build remains green

### Validation

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Delivery Order Recommendation

Recommended order:

1. Phase 1
2. Phase 2
3. Phase 3
4. Phase 4
5. Phase 5
6. Phase 6

This order is important because:

- it keeps unstable external integration behind internal boundaries first
- it preserves the current UX fallback while the data path is being proven
- it avoids building a UI card against an unstable data shape

## Rollback Strategy

If the scraper proves too brittle:

- keep `playStoreUrl` CTA only
- disable the richer Play Store card
- preserve the internal adapter code for later reactivation

This is why the current CTA fallback should not be removed early.

## Open Questions

- Should `lang` and `country` be hardcoded for the first version, or should they be configurable?
- Should the card show review count, ratings count, or both?
- Should the card appear only in the sticky aside, or also inline on mobile near the hero?
- Do we want to surface screenshots from the Play Store later, or keep the card focused on core metadata only?

These questions should be resolved before phase 5 UI work starts, not after.

## Definition of Done

The Play Store card feature is complete when:

- work entries can optionally provide `playStoreAppId`
- the server adapter fetches and normalizes Play Store metadata
- responses are cached
- work detail pages render a richer Play Store card when data exists
- work detail pages still render safely when scraping fails
- lint, typecheck, test, and build all pass

## Notes

- Do not expose scraper output directly to components.
- Do not introduce client-side Play scraping.
- Do not remove the current CTA fallback until the richer flow is proven stable.
