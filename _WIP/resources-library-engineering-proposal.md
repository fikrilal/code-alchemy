# Resources Library Engineering Proposal

## Status

- Status: **Phase 1 complete** (MVP shipped on `redesign`)
- Scope: Dedicated curated resources page, content model, taxonomy, feature module
- Positioning: Utility library (not personal bookmark dump)
- Public name: **Resources** (nav + page)
- Route: `/resources`
- Implementation: Done for Phase 1 MVP
- Related: portfolio information architecture (orthogonal surface; does not replace Work / Open Source / Labs)
- Follow-up: `_WIP/resources-preview-pipeline-proposal.md` — grid cards + GHA/Playwright screenshot previews (not started)

### Phase 0 locked decisions

| Decision | Lock |
|----------|------|
| Positioning | Utility library (intent B) |
| Nav / page name | **Resources** |
| Route | `/resources` |
| Category set | Keep all **9** categories (no launch trim) |
| Storage format | `src/content/resources/catalog.json` |
| Seed policy | Hard-curated **20–40** entries; not full bookmark import |
| Homepage | Out of scope for v1 |

## Summary

The site already publishes three kinds of proof: case studies (`Work`), public engineering artifacts (`Open Source`), and writing (`Blog`). A fourth useful surface is a **curated utility library of external links** — tools, component kits, motion references, design systems, and high-signal inspiration found mostly via X and the broader web.

Today those finds live only in private browser bookmarks. Publishing a selective subset on the site makes the same taste available to other mobile and design engineers, without putting a link dump on the homepage.

This proposal defines engineering for:

- closed category taxonomy + optional tags
- validated structured content (not MDX)
- a dedicated `/resources` route with navbar entry labeled **Resources**
- a small feature module that loads, groups, and renders the catalog

Homepage placement is explicitly out of scope for v1.

**Name decision (locked):** nav/page label is **Resources**, not Links/Library/Bookmarks. “Links” was rejected for affiliate / link-in-bio connotations.

## Goals

- Give visitors a useful, browsable library: “I need X — is there something good here?”
- Keep editorial control; no auto-import from browser or X.
- Make taxonomy the hard design decision, not card styling.
- Fit existing architecture: content source of truth, feature-owned UI/logic, Zod at boundaries, server-first rendering.
- Stay maintainable as the list grows from ~20–40 seed entries toward ~100 without redesigning the data model.

## Non-Goals

- Homepage teaser, strip, or “recently saved” widget (revisit only after the page earns its keep).
- Browser bookmark sync, Raindrop/Pinboard import, or X API ingestion.
- MDX long-form notes per link (optional later if notes become real prose).
- Dead-link crawler in CI (manual care for v1).
- Client-side search/filter UI until the catalog is large enough to need it (~40–50+ entries).
- Per-click analytics or affiliate tracking.
- Replacing or merging with Work / Open Source / Labs.

## Product Positioning

| Choice | Decision |
|--------|----------|
| Primary intent | **B — Utility library** for other mobile/design engineers |
| Secondary intent | Light taste signal (selection and one-line “why”) |
| Not primary | Personal scratchpad / full bookmark mirror |

Nav and page copy should describe a **curated set of useful resources**, not “my bookmarks” or affiliate links.

### Naming (locked)

| Surface | Value |
|---------|--------|
| Nav label | **Resources** |
| Route | `/resources` |
| Page title (suggested) | Resources |
| Intro framing | Curated tools and references for mobile and design engineers |

Alternatives considered and rejected:

| Name | Why not |
|------|---------|
| Links | Reads as affiliate / link-in-bio |
| Library | Strong shelf metaphor; not chosen |
| Tools | Too narrow (excludes inspiration, systems) |
| Bookmarks | Private browser chrome; visitor-weak |
| Shelf / Radar / Finds | More personal taste than utility catalog |

Internal module path: `src/features/resources`. Public copy and route use **Resources**.

## Relationship to Site IA

| Surface | Question it answers |
|---------|---------------------|
| Work | What real products have you shipped or owned? |
| Open Source | What reusable public systems have you designed? |
| Labs (proposal) | What are you exploring or incubating? |
| Blog | What have you written and argued? |
| **Resources** | What external tools and references are worth an engineer’s time? |

Resources are **orthogonal** to portfolio proof. They must not dilute Selected Work or compete for homepage attention in v1.

## Taxonomy

### Principle

- **Category** = primary browse axis (closed enum, required, exactly one per entry).
- **Tags** = secondary keywords (optional, small set; not a second category system).

Freeform dual taxonomies rot. Closed categories keep the page navigable.

### Category set (v1, locked)

Keep all **nine** categories at launch. Do not trim `infra` or `ai` before shipping; empty categories simply do not render.

| ID | Label | What belongs here |
|----|--------|-------------------|
| `ui-components` | UI Components | Component kits, block libraries, production UI packs |
| `motion` | Motion | Transition tools, animation systems, motion references |
| `design-systems` | Design Systems | System kits, token/docs patterns, foundational UI systems |
| `mobile` | Mobile | Flutter/mobile craft, mobile-specific design and engineering |
| `icons-assets` | Icons & Assets | Icon libraries, asset collections |
| `tooling` | Tooling & DX | Linters, editors, developer utilities, agent/sandbox tooling |
| `inspiration` | Inspiration | Strong personal sites, design-engineer portfolios |
| `infra` | Infra | Hosting, deploy platforms, niche infrastructure |
| `ai` | AI & Agents | AI product kits, agent-oriented tools |

### Taxonomy governance

1. Exactly **one primary category** per entry.
2. If an entry fits two categories, choose the **main reason a visitor would open it**.
3. People and portfolios go in **Inspiration**, not mixed into Tooling.
4. **Description is required** and must answer “why open this?” — not restate the title.
5. Prefer not adding over adding weak links. Utility libraries die from noise.
6. **Add a new category only when** an existing group is painful to browse, or the job is clearly distinct.
7. Tags are optional helpers (`react`, `next`, `flutter`, `design`, `css`) — not a parallel hierarchy.
8. Seed from high-signal finds first; do not import the full browser bookmark set.

### Optional later taxonomy changes (post-launch only)

- Merge `infra` into `tooling` if infra stays thin.
- Retire `ai` only if it never accumulates strong entries.
- Split `tooling` only after it becomes noisy (e.g. 15+ mixed items).

## Data Model

### Entry shape

```ts
type ResourceCategoryId =
  | "ui-components"
  | "motion"
  | "design-systems"
  | "mobile"
  | "icons-assets"
  | "tooling"
  | "inspiration"
  | "infra"
  | "ai";

type ResourceEntry = {
  /** Stable id for anchors, deep links, tests — not derived from title alone */
  id: string;
  title: string;
  url: string;
  /** One line: why an engineer would care */
  description: string;
  category: ResourceCategoryId;
  tags?: string[];
  /** ISO date string, e.g. "2026-07-01" */
  addedAt: string;
  /** Optional “start here” within a category */
  featured?: boolean;
};
```

### Field rules

| Field | Required | Notes |
|-------|----------|--------|
| `id` | Yes | kebab-case, unique, stable (e.g. `transitions-dev`) |
| `title` | Yes | Display name of the site/tool |
| `url` | Yes | Absolute `https` URL; Zod-validated |
| `description` | Yes | Utility one-liner; reject empty/whitespace |
| `category` | Yes | Must be in closed enum |
| `tags` | No | Short lowercase tokens; avoid duplicating category labels |
| `addedAt` | Yes | ISO date for sort and “freshness” |
| `featured` | No | At most a few per category over time |

### Example entry

```json
{
  "id": "transitions-dev",
  "title": "Transitions.dev",
  "url": "https://www.transitions.dev",
  "description": "Practical transition patterns for web apps when motion docs stay too abstract.",
  "category": "motion",
  "tags": ["web", "css", "react"],
  "addedAt": "2026-07-01",
  "featured": true
}
```

### Explicitly deferred fields

- `source` (`x` | `web`) — low visitor value
- `stack` / `language` — use tags until they prove insufficient
- Long-form body / MDX — only if real notes emerge
- `favicon` / OG scrape — nice-to-have polish later; not required for utility

## Storage

### Decision (locked)

Use **structured JSON content under `src/content`**, not MDX and not external sync.

```text
src/content/resources/
  catalog.json
```

Zod validates the catalog at load time in `src/features/resources/lib`. Invalid catalog fails tests/build.

`catalog.ts` was considered for IDE authoring comfort and is **not** the v1 choice. Revisit only if JSON editing becomes painful.

### Why not other options

| Approach | Verdict |
|----------|---------|
| MDX per link | Overkill; no prose pipeline needed for v1 |
| TS module only under `features/*/data` | Fine for tiny lists (`featured-repos`); weak as a growing public catalog |
| External API (Raindrop, etc.) | Extra infra, secrets, and failure modes; skip for v1 |
| Browser export pipeline | Couples public quality to private dump habits |

### Content ownership

`src/content/resources` is the editorial source of truth, same spirit as `src/content/blog` and `src/content/work`. Feature code must not hardcode the catalog list beyond category metadata.

## Feature Architecture

### Module layout

```text
src/features/resources/
  types.ts
  lib/
    schema.ts        # Zod: category enum, entry, catalog array
    categories.ts    # id → label, order, short section blurb
    catalog.ts       # load, parse, sort, groupByCategory
  components/
    ResourcesPage.tsx
    resource-item.tsx
    category-section.tsx
    category-nav.tsx   # optional in-page jump links

src/app/(resources)/
  layout.tsx           # reuse SiteLayout pattern from other groups
  resources/
    page.tsx           # metadata + load catalog + render ResourcesPage
```

Content path:

```text
src/content/resources/
  catalog.json
```

Navbar (`src/components/layout/Navbar.tsx`) gains one item: `{ title: "Resources", href: "/resources" }`.

### Layer responsibilities

| Layer | Owns |
|-------|------|
| `src/content/resources` | Catalog entries only |
| `src/features/resources/lib` | Schema, category metadata, load/group/sort |
| `src/features/resources/components` | Page UI |
| `src/app/(resources)` | Route, metadata, composition |
| `src/lib` | Nothing for v1 (no external client) |

Respect existing dependency-cruiser boundaries: features may use components + lib; app may compose features; content is data only.

### Catalog API (lib)

```ts
getResourceCatalog(): ResourceEntry[]
getResourcesByCategory(): Array<{
  category: ResourceCategoryId
  label: string
  description?: string
  items: ResourceEntry[]
}>
getResourceCategoriesInUse(): CategoryMeta[]  // hide empty categories
```

### Sort defaults

1. Category order = fixed order from `categories.ts` (not alphabetical chaos).
2. Within category: `featured === true` first, then `addedAt` descending.
3. Title sort is not the primary axis.

### Validation

- Zod-parse the full catalog on load.
- Fail hard on: invalid URL, unknown category, missing/blank description, duplicate `id`, duplicate `url`.
- Invalid catalog should fail tests and break build the same way invalid blog frontmatter fails.

Suggested unit tests (v1):

- schema accepts valid entry / rejects bad category / rejects non-https URL
- grouping preserves category order
- featured items sort above non-featured within a category
- empty categories omitted from page groups

## Page UX (engineering constraints)

### v1 structure

1. Short intro: what the library is for and how it is curated.
2. Category jump nav (anchor links to section ids).
3. One section per non-empty category.
4. Entry row: title (external link, `rel`/`target` safe defaults), description, optional tags.

### Rendering

- Server Component page; no client fetch.
- Static-friendly; no env secrets required.
- External links open in a new tab with `rel="noreferrer"` (match MDX link behavior).
- Copy should never imply sponsorship or affiliate relationships unless an entry is explicitly marked later (not in v1 schema).

### Explicitly not v1 UI

- Card grids optimized for screenshots
- Client search/filter
- Infinite scroll
- Homepage integration
- Favicon/OG previews

Add client filters only when scroll-through browsing becomes painful.

## Phased Delivery

### Phase 0 — Design lock (complete)

- [x] Positioning = utility library (intent B)
- [x] Nav name: **Resources** (`/resources`)
- [x] Category set: keep all **9** categories
- [x] Storage format: `src/content/resources/catalog.json`
- [x] Seed size: hard-curated **20–40** entries; not full bookmark import
- [x] Homepage: out of scope for v1

### Phase 1 — MVP (complete)

1. [x] Add `src/content/resources/catalog.json` with seed entries (20–40).
2. [x] Implement `src/features/resources` types, schema, categories, catalog loaders.
3. [x] Implement `ResourcesPage` + section/item components.
4. [x] Add `src/app/(resources)/resources/page.tsx` + layout.
5. [x] Add navbar entry: Resources → `/resources`.
6. [x] Add unit tests for schema + grouping/sort.
7. [x] Run `npm run lint`, `typecheck`, `test`, `build`, `deps:check`.

### Phase 2 — only if list grows

- Simple client tag filter or search.
- Stronger “featured” callouts.
- Optional “recently added” subsection on `/resources` only.

### Phase 3 — only if real pain appears

- Split catalog by category files.
- Dead-link check in CI.
- External sync (Raindrop, etc.).

Stay on Phase 1 until maintenance or browse friction forces more.

## Seed Content Guidance (locked policy)

Initial import is **editorial**, not exhaustive. Target **20–40** high-signal entries at launch. Do not import the full browser bookmark set.

Process:

1. Start from the current browser bookmark list (and any X saves worth keeping).
2. Keep only entries that pass: “I would recommend this to another engineer.”
3. Assign one category + one-line description before merge.
4. Land in the **20–40** range for v1.
5. Prefer coverage across categories over filling one category deeply.
6. Categories with zero seed entries simply do not render (schema still includes the full enum).

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Feels like a bookmark dump | Required descriptions; curated seed; closed categories |
| Taxonomy churn | Governance rules; new category only when browsing hurts |
| Dead links | Manual review when adding; CI checker only if it becomes painful |
| Scope creep into “second product” | Phase gates; no sync/import in v1 |
| Brand dilution of portfolio | No homepage placement; clear intro copy on `/resources` |
| Empty categories look sparse | Render only categories with items |
| “Affiliate links” misread | Public name **Resources**; neutral intro; no sponsored fields in v1 |

## Open Decisions

None for Phase 0. All design locks above are confirmed.

Phase 1 implementation may still choose:

- Exact seed entry list (within 20–40, editorial judgment)
- Visual density of rows/sections (within server-rendered category layout)
- Whether page intro copy is inline in the component or a small content constant

## Success Criteria

v1 is successful when:

- A visitor can land on `/resources` from the navbar and find something useful in under a minute via category sections.
- Adding a resource is a small content edit + validation, not a feature change.
- The homepage and Work story remain unchanged and uncluttered.
- The catalog cannot ship with invalid categories, bad URLs, or empty descriptions.
- Public naming does not suggest affiliate or sponsored link lists.

## Implementation Notes (when coding)

- Follow `AGENTS.md` and `docs/standards/architecture.md`.
- Default to server components; `"use client"` only if Phase 2 filters need it.
- Do not leak internal paths like `_WIP/...` into public page copy.
- Prefer small reversible diffs; do not mix unrelated redesign work into the resources PR.
- Use Conventional Commits when committing (only if asked).

## Appendix: Category order (render order)

Stable display order for v1:

1. `ui-components`
2. `motion`
3. `design-systems`
4. `mobile`
5. `icons-assets`
6. `tooling`
7. `ai`
8. `infra`
9. `inspiration`

Order is editorial (utility-first stacks before inspiration). Adjust only intentionally in `categories.ts`, not by sorting labels alphabetically.
