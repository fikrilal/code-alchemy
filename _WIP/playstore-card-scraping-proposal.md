# Play Store Card Scraping Proposal

## Status

- Status: Draft
- Scope: Work detail pages only
- Implementation: Not started

## Summary

This proposal adds a Play Store metadata card to work detail pages using server-side scraping of the public Google Play Store page. The card is intended to enrich projects that already have a `playStoreUrl` by showing public metadata such as:

- app icon
- app name
- app id
- short summary
- installs label
- rating
- review count
- developer name

The recommended implementation uses the `google-play-scraper` Node.js library behind a small server-only adapter in this repo. The UI should never depend directly on the scraper response shape, and the page must continue to render cleanly when scraping fails.

## Goals

- Add a richer Play Store card to work detail pages.
- Keep Play data dynamic instead of hardcoding metadata in frontmatter.
- Keep scraping logic server-side only.
- Normalize third-party scraper output into a stable internal shape.
- Cache aggressively to reduce request volume and avoid unnecessary scraper load.
- Preserve a clean fallback experience when Play metadata is unavailable.

## Non-Goals

- Building a generic external links framework.
- Adding a client-side Play Store data fetch.
- Introducing a separate microservice for scraping.
- Guaranteeing exact real-time Play Store metrics.
- Supporting non-Play app stores in this phase.

## Why Scraping

### Official Google APIs Are Not a Good Fit

Google Play has official APIs tied to Play Console and app-management workflows, but they are not a clean public storefront metadata API for portfolio use. They are aimed at publishing, listings management, reviews management, subscriptions, and app administration.

That means they are a poor fit for:

- anonymous public storefront reads
- public app metadata for a marketing site
- install/rating-style public card data

### Scraping Matches the Actual Use Case

The desired UI card is based on what is publicly visible on the Play Store page. Scraping is the direct way to retrieve that presentation-layer metadata for a portfolio site.

Tradeoff:

- scraper-based integration is practical
- scraper-based integration is brittle when Google changes markup or upstream payloads

Because of that, the scraper must be treated as infrastructure behind a stable internal adapter and fallback path.

## Recommended Library

Recommended package:

- `google-play-scraper`

Repository:

- <https://github.com/facundoolano/google-play-scraper>

Why this choice:

- established Node.js package
- focused on Play Store scraping
- exposes app details directly
- already returns most of the fields needed for the custom card
- can be used directly in server-side Next.js code

Important caveat:

- the maintainer explicitly notes that the project is not actively maintained and the parser can break when Google changes Play Store layout

This is acceptable only if the integration is wrapped defensively.

## Alternative Considered

Alternative:

- `google-play-api`

Repository:

- <https://github.com/facundoolano/google-play-api>

This turns `google-play-scraper` into a REST API.

Why it is not the default recommendation:

- adds another layer without solving the underlying scraper fragility
- unnecessary for a single Next.js app
- increases moving parts, deployment surface, and maintenance cost

Use it only if this scraping capability needs to be shared across multiple services or deployments.

## Proposed Architecture

### High-Level Flow

1. Work detail page receives a project slug.
2. Work frontmatter provides `playStoreUrl` and preferably `playStoreAppId`.
3. Server-only Play Store adapter fetches metadata using `google-play-scraper`.
4. Adapter normalizes scraper output into an internal stable type.
5. Result is cached.
6. Work detail page renders the Play Store card from normalized data.
7. If fetch fails, page falls back to a simpler static CTA.

### Server-Only Integration

The scraper must never run in browser code.

Recommended file:

- `src/lib/playstore.ts`

Recommended responsibilities:

- accept `appId`
- call the scraper library
- normalize upstream data
- hide third-party fields the UI should not rely on directly
- apply caching
- return `null` or a typed error-safe result on failure

## Proposed Internal Data Contract

Suggested normalized type:

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

Why normalize:

- the scraper may expose many more fields than the UI needs
- field names from third-party libraries should not leak into page components
- internal normalization reduces future migration cost if the scraper changes

## Expected Scraper Fields

Based on the library’s documented `app()` response, the following fields are available and relevant:

- `title`
- `summary`
- `installs`
- `minInstalls`
- `maxInstalls`
- `score`
- `ratings`
- `reviews`
- `developer`
- `icon`
- `appId`
- `url`

These are sufficient for the first version of the Play Store card.

## Content Model Changes

### Recommended Frontmatter

Keep:

- `playStoreUrl?: string`

Add:

- `playStoreAppId?: string`

Example:

```yaml
playStoreUrl: "https://play.google.com/store/apps/details?id=com.orymu.app"
playStoreAppId: "com.orymu.app"
```

### Why Add `playStoreAppId`

It is technically possible to parse the app id from the Play Store URL, but storing it explicitly is better because:

- it is the stable lookup key
- it avoids repeated URL parsing logic
- it simplifies validation and debugging
- it keeps the data dependency explicit

Fallback behavior:

- if `playStoreAppId` is missing and `playStoreUrl` exists, parse from the URL as a fallback

## Page Integration

### UI Placement

The Play Store card should appear in work detail pages only.

Recommended placement:

- hero action cluster for the button
- sticky aside or supporting facts area for the richer metadata card

This keeps the hero clean while still surfacing the richer app metadata in a high-value position.

### Rendering Rules

If Play metadata fetch succeeds:

- render the full Play Store metadata card
- render the Play Store CTA button

If Play metadata fetch fails but `playStoreUrl` exists:

- render only the CTA button
- omit the richer metadata card

If no Play Store link exists:

- render nothing Play-related

## Caching Strategy

This integration should be treated as slow-changing external content.

Recommended cache behavior:

- server-side caching only
- revalidate every 6 to 24 hours
- never scrape the Play page on every request

Why:

- Play Store metadata does not require second-level freshness
- scraping on every request increases fragility and latency
- repeated requests increase the chance of throttling or temporary upstream failures

Reasonable initial default:

- revalidate every 12 hours

## Error Handling Strategy

This integration must fail soft.

Rules:

- scraper exceptions must not break the page
- invalid app ids must not break the page
- transient upstream errors must not break the page
- missing optional fields must not block rendering

Recommended approach:

- adapter returns `null` on known failures
- log server-side failures for diagnosis
- UI treats `null` as “render simple Play Store CTA only” or “render nothing”

## Security and Runtime Considerations

- keep scraper access server-side only
- do not expose raw scraper responses to the client
- do not depend on browser-side secrets or tokens
- do not promise exact totals for installs

Important nuance:

- public Play Store “download total” is usually exposed as a bucketed public installs label such as `10K+` or `1M+`, not an exact internal count

UI language should reflect that reality. Prefer:

- `10K+ installs`

not:

- `10,423 installs`

unless exact data actually exists and is stable

## Suggested Implementation Phases

### Phase 1: Data Adapter

- install `google-play-scraper`
- add `src/lib/playstore.ts`
- implement app-id parsing utility
- implement normalized fetch function
- add caching

Outcome:

- internal Play metadata retrieval exists without touching the UI yet

### Phase 2: Work Detail Wiring

- update work frontmatter types to include `playStoreAppId`
- load Play metadata in the work detail page
- pass normalized data to the work detail UI

Outcome:

- page can conditionally render Play data

### Phase 3: Play Store Card UI

- add dedicated card component
- render icon, app name, app id, summary, installs label, rating, review count, developer name
- render CTA linking to the Play Store page

Outcome:

- richer Play-aware project presentation

### Phase 4: Hardening

- add fallback tests or type-level guards
- validate behavior for missing fields
- validate rendering for broken scraper responses

Outcome:

- safer failure behavior

## Validation Plan

When implementation starts, run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Specific manual review checks:

- pages with `playStoreUrl` and valid `playStoreAppId` show the full card
- pages with only `playStoreUrl` still work through URL parsing fallback
- pages with invalid Play Store data still render safely
- pages without Play Store data do not show empty containers
- the page remains fast and visually stable even when the scraper returns slowly

## Risks

- upstream Google Play changes can break the scraper
- scraper library maintenance is limited
- repeated uncached requests could trigger throttling or temporary blocking
- field availability may vary by locale, app, or Play page format

These risks are manageable only if:

- the scraper is wrapped
- results are cached
- the UI is resilient to missing data

## Recommendation

Proceed with direct server-side integration using `google-play-scraper`, wrapped inside a small internal adapter and protected by caching and soft-failure behavior.

This is the best tradeoff for the current repo because it:

- keeps architecture simple
- matches the actual public-data use case
- avoids unnecessary service complexity
- supports a richer Play Store card without turning frontmatter into a metadata dump

## Sources

- Google Play Developer API overview: <https://developers.google.com/android-publisher>
- `google-play-scraper`: <https://github.com/facundoolano/google-play-scraper>
- `google-play-api`: <https://github.com/facundoolano/google-play-api>
