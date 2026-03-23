# Work Detail Redesign Proposal

## Status

- Status: Draft
- Scope: Work detail pages only
- Implementation: Not started

## Summary

The current work detail page is too close to the blog detail template. It renders as a centered prose page with a hero image, optional Play Store link, and tech stack chips. That is functionally correct, but it undersells product work and makes case studies read like articles.

This proposal introduces a dedicated work detail layout that treats each project as a product artifact first and a long-form write-up second. The new template keeps MDX as the source of narrative depth, but moves key product metadata, screenshots, and actions into structured sections outside the prose column.

## Goals

- Make work detail pages feel distinct from blog posts.
- Elevate product proof earlier in the page: hero visual, project facts, screenshots, and calls to action.
- Promote `playStoreUrl` as a first-class action when present.
- Keep the implementation small, reversible, and aligned with the current App Router and MDX setup.
- Preserve the current content pipeline and avoid turning the work page into a CMS-heavy system.

## Non-Goals

- Redesigning blog detail pages.
- Changing the site-wide brand or global navigation.
- Replacing MDX with a structured content system.
- Adding many speculative content fields or complex portfolio filters.

## Current State

Current work detail behavior lives in:

- `src/app/(work)/work/[slug]/page.tsx`
- `src/features/work/components/WorkGallery.tsx`
- `src/features/work/types.ts`

Current characteristics:

- Single centered article column.
- Title and short description at the top.
- Optional Play Store CTA rendered as the generic site button.
- Gallery placed inline before prose.
- Tech stack chips at the bottom.
- No dedicated project facts, summary strip, or sticky supporting rail.

This is simple, but it compresses all content into one reading mode. Product pages need at least two modes:

- scan mode for proof and orientation
- read mode for the detailed narrative

## Design Direction

The reference direction is editorial in structure, not visual imitation.

Patterns worth borrowing from the Amp article:

- large, expressive hero title
- narrow reading measure inside a wider page canvas
- strong separation between media bands and reading bands
- restrained metadata treatment
- asymmetric desktop layout

Patterns to avoid copying literally:

- cream paper palette
- serif-led brand treatment that clashes with the existing site
- overly sparse metadata that works for essays but not case studies

## Proposed Page Architecture

### 1. Work Detail Shell

Purpose:

- define the overall page rhythm
- create a wider canvas than the current `max-w-3xl` article
- allow section bands instead of one continuous centered column

High-level structure:

1. back link / breadcrumb
2. hero
3. highlights strip
4. gallery band
5. body + sticky aside
6. next case study

### 2. Work Hero

This becomes the primary orientation layer.

Content:

- eyebrow row: category, year, optional platform
- large title
- short description
- CTA cluster
- quick facts grid
- hero visual

Desktop layout:

- left column for title, summary, CTA, and facts
- right column for the main visual

Mobile layout:

- stacked
- CTA directly below summary
- facts in a compact grid

### 3. Work Action Cluster

Purpose:

- group external links near the top
- make the Play Store action visually distinct from generic navigation actions

Initial actions:

- `PlayStoreButton` when `playStoreUrl` exists

Optional future actions:

- live site
- GitHub
- App Store
- case study PDF

The proposal intentionally avoids introducing all of these now.

### 4. Work Highlights Strip

Purpose:

- provide fast proof before the user enters the long narrative

Examples:

- Founding engineer
- Shipped on Play Store
- Built backend and mobile
- 4-person team

This section should support 2 to 4 short items only. If no structured highlights are available yet, it can be omitted in phase 1.

### 5. Work Gallery Band

Purpose:

- separate screenshots from the prose flow
- let the user understand the product visually before reading the case study

Notes:

- reuse the current `WorkGallery` logic where possible
- redesign it as a dedicated page section instead of an inline artifact
- keep one strong hero visual and support supporting screenshots below it

### 6. Work Body Layout

Purpose:

- split the page into a reading column and a supporting side rail

Desktop:

- main content column for MDX
- sticky aside for structured project context and repeated CTA

Mobile:

- single column
- no sticky behavior

### 7. Work Sticky Aside

Initial modules:

- `PlayStoreCard`
- `ProjectFactsCard`
- `TechStackCard`

Optional module:

- `WorkToc`, only if the MDX article is long enough to justify it

This rail should support scan behavior without forcing users to return to the top for key facts or the Play Store CTA.

### 8. Next Case Study

Purpose:

- provide simple forward navigation at the bottom

This should stay lightweight. One next-project card is enough.

## Proposed Component Structure

Suggested components and responsibilities:

- `WorkDetailShell`
  - section spacing, width, and background handling
- `WorkHero`
  - top-level composition of hero content
- `WorkActionCluster`
  - groups external actions
- `PlayStoreButton`
  - dedicated CTA for Play Store
- `WorkFactsGrid`
  - compact top-level facts under the summary
- `WorkHighlightsStrip`
  - short product proof items
- `WorkGalleryBand`
  - wraps the gallery as a standalone page section
- `WorkBodyLayout`
  - two-column desktop layout for prose + aside
- `WorkContentProse`
  - owns work-specific prose styling
- `WorkStickyAside`
  - sticky supporting rail
- `ProjectFactsCard`
  - structured project metadata
- `TechStackCard`
  - stack listing outside prose
- `WorkToc`
  - optional heading navigation
- `NextCaseStudyCard`
  - footer navigation to the next work item

## Suggested File Layout

No final structure is required yet, but the likely placement is:

- `src/app/(work)/work/[slug]/page.tsx`
- `src/features/work/components/WorkDetailShell.tsx`
- `src/features/work/components/WorkHero.tsx`
- `src/features/work/components/PlayStoreButton.tsx`
- `src/features/work/components/WorkFactsGrid.tsx`
- `src/features/work/components/WorkHighlightsStrip.tsx`
- `src/features/work/components/WorkGalleryBand.tsx`
- `src/features/work/components/WorkBodyLayout.tsx`
- `src/features/work/components/WorkContentProse.tsx`
- `src/features/work/components/WorkStickyAside.tsx`
- `src/features/work/components/ProjectFactsCard.tsx`
- `src/features/work/components/TechStackCard.tsx`
- `src/features/work/components/NextCaseStudyCard.tsx`

`WorkGallery.tsx` can be kept and wrapped by `WorkGalleryBand` rather than deleted immediately.

## Content Model Changes

### Keep As-Is

The current frontmatter already supports:

- `title`
- `shortDescription`
- `thumbnail`
- `playStoreUrl`
- `techStack`
- `images`
- `category`
- `date`

This is enough to start the redesign.

### Optional Additions

To support the proposed structure cleanly, add these optional fields only if they create immediate UI value:

- `role?: string`
- `platform?: string`
- `timeline?: string`
- `company?: string`
- `highlights?: string[]`

These fields should remain optional. The page must still render cleanly without them.

### Explicitly Deferred

Do not add these yet:

- generic `links` object
- multiple CTA schemas
- client logo systems
- project stats models
- per-page theme overrides

## MDX Content Contract

The structured UI should handle orientation. MDX should handle explanation.

Recommended narrative sections:

- `Context`
- `Problem`
- `Solution`
- `Architecture` or `Implementation`
- `Impact`
- `Learnings`

This keeps the page from repeating the same facts in both structured UI and prose.

## Responsive Behavior

### Mobile

- all sections stack vertically
- CTA sits directly below the description
- quick facts become a compact two-column grid
- gallery remains full-width within the content container
- sticky aside collapses into inline cards below the main content or near the top, depending on density

### Tablet

- hero may still stack if the visual does not fit well side by side
- gallery spacing increases
- body remains mostly single column unless the aside creates enough value

### Desktop

- hero becomes split layout
- gallery sits in its own wide band
- prose and supporting rail become two columns
- supporting rail uses sticky positioning

## Implementation Plan

### Phase 1: Layout Separation

- replace the current single-column article layout with section bands
- introduce `WorkHero`, `WorkGalleryBand`, and `WorkBodyLayout`
- move prose classes into a dedicated `WorkContentProse` wrapper
- keep existing frontmatter unchanged

Outcome:

- immediate visual separation from blog detail pages

### Phase 2: Dedicated Play Store Treatment

- add `PlayStoreButton`
- render it in the hero action cluster
- repeat it in the sticky aside on desktop
- remove reliance on the generic site button for this action

Outcome:

- stronger product positioning for Play Store-backed projects

### Phase 3: Structured Supporting Rail

- add `ProjectFactsCard`
- move `techStack` out of the page footer and into `TechStackCard`
- optionally compute a lightweight table of contents from MDX headings if useful

Outcome:

- better scanability and less dependence on long prose for basic project context

### Phase 4: Optional Metadata Expansion

- add `role`, `platform`, `timeline`, `company`, and `highlights` only if needed by actual pages
- backfill only the projects that benefit from them

Outcome:

- richer case-study storytelling without forcing every work item into the same metadata burden

## Validation Plan

For implementation work, run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Specific review checks:

- work pages should feel visually distinct from blog pages
- pages without `playStoreUrl` should not leave visual gaps
- pages with sparse frontmatter should still render well
- long MDX pages should keep readable line length on desktop
- screenshots should load and crop cleanly across breakpoints

## Risks

- If the hero becomes too dense, the page will regress into dashboard-like clutter instead of premium case-study layout.
- If too many optional fields are added at once, content maintenance cost will rise quickly.
- If the sticky aside is overused, it can compete with the narrative rather than support it.
- If the redesign is built as a shared detail abstraction, blog and work pages will drift back toward the same shape.

## Recommendation

Implement phase 1 and phase 2 first. That is the smallest change set that will materially improve the work detail experience and promote the Play Store CTA without committing the codebase to unnecessary content schema complexity.
