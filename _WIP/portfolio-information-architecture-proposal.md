# Portfolio Information Architecture Proposal

## Status

- Status: Draft
- Scope: Homepage + portfolio navigation + future portfolio pages
- Implementation: Not started

## Summary

The current site already has a stronger `Work` section than before, but it still mixes different
types of proof under one mental bucket.

Today, the strongest material on the site is case-study driven product work:

- shipped client products
- real deployment context
- clear ownership and engineering decisions

At the same time, the GitHub profile also contains a different kind of proof:

- reusable engineering kits
- public tooling
- exploratory repos and experiments

These should not all live under the same label. A product case study, an open-source starter kit,
and an experiment are not competing artifacts. They answer different questions.

This proposal introduces a clearer portfolio structure:

- `Selected Work` for real case studies
- `Open Source` for public engineering artifacts
- `Labs` for exploratory or less-proven work

The recommendation is to implement this in two phases:

1. a minimal version on the homepage now
2. a fuller version with dedicated pages later

## Goals

- Make the difference between shipped work and public repos immediately understandable.
- Keep the homepage focused and selective.
- Create room for public engineering artifacts without diluting the case-study section.
- Avoid turning the site into a flat GitHub dump.
- Preserve editorial control instead of auto-generating the portfolio from repository metadata.

## Non-Goals

- Automatically syncing all GitHub repositories into the portfolio.
- Reclassifying every repo on the GitHub profile.
- Turning the site into a generic “projects” grid.
- Rewriting all existing content pages as part of this proposal.

## Problem

The site currently treats portfolio content mostly as `Work`, which is correct for case studies but
insufficient for the broader body of public engineering output.

This creates a few issues:

- Shipped case studies and open-source kits compete for the same conceptual space.
- Exploratory repos either get over-promoted or ignored entirely.
- The homepage does not yet show the public engineering side of the profile clearly.
- The site risks flattening different kinds of proof into one undifferentiated portfolio list.

This is primarily an information architecture problem, not a styling problem.

## Guiding Principle

The site should separate artifacts by **type of proof**, not by vague prestige labels like
`professional` versus `experimental`.

Each section should answer a different question:

- `Work`: what real products have you shipped or materially owned?
- `Open Source`: what reusable public systems or tools have you designed?
- `Labs`: what are you exploring, testing, or incubating?

That separation is clearer, more honest, and easier to defend in conversation.

## Proposed Taxonomy

### 1. Work

Definition:

- real client work
- real product delivery
- shipped or materially deployed systems
- case-study style narrative with ownership, challenges, and impact

Examples from the current site:

- Orymu
- PesantrenQu
- KoperasiQu
- Mobile ERP

### 2. Open Source

Definition:

- public repositories
- reusable kits, starter projects, or tools
- systems that show architecture, guardrails, documentation, and engineering judgment

Good candidates from the current GitHub profile:

- `mobile-core-kit`
- `backend-core-kit`
- `gitlab-activity-mirror`
- `android-core-kit` (optional, depending on emphasis)

These are not “side projects” in the weak sense. They are public engineering artifacts.

### 3. Labs

Definition:

- exploratory builds
- researchy tools
- experiments
- prototypes
- archived or less-proven work

Good candidates:

- `factweaver`
- `discord-voice-ai-bot`
- archived/pitch/prototype material if it is ever reintroduced honestly

This section should exist only if it is curated. It should not be used as a catch-all dump.

## Phase 1: Minimal Version

### Recommendation

Add `Open Source` to the homepage while keeping the rest of the site simple.

Resulting homepage structure:

1. Hero
2. Portfolio / positioning section
3. `Selected Work`
4. `Open Source`
5. Blog

### Why This First

- Low implementation cost
- Immediate improvement in clarity
- No need to reorganize navigation yet
- Keeps the strongest proof above the fold while still surfacing public engineering work

### Homepage Rules

`Selected Work`:

- keep curated
- keep small
- 3 to 4 strongest case studies

`Open Source`:

- also curated
- feature 3 to 4 repos max
- show short descriptions that explain why they matter

### Recommended Repos for Homepage Open Source

Primary set:

- `mobile-core-kit`
- `backend-core-kit`
- `gitlab-activity-mirror`

Optional fourth:

- `android-core-kit`

I would leave `factweaver` out of the homepage in phase 1. It is interesting, but it fits better as
`Labs` than `Open Source`.

### Data Strategy

Use a local curated source of truth in the repo.

Recommended approach:

- define a small local data file for featured open-source entries
- store title, short description, GitHub URL, language, and optional badge/highlight
- optionally enrich with GitHub metadata later, but do not make GitHub the source of curation

This keeps the portfolio intentional rather than turning it into a live repo list.

## Phase 2: Fuller Version

### Recommendation

Expand the portfolio structure into dedicated pages:

- `/work`
- `/open-source`
- `/labs`

### Page Roles

`/work`

- case studies only
- product delivery
- client work
- shipped systems

`/open-source`

- public kits
- public tools
- reusable engineering systems
- deeper technical artifacts with GitHub links

`/labs`

- experiments
- exploration
- prototypes
- archived or less-proven public work

### Navigation Implication

Current top-level navigation uses `Work`.

Future options:

- keep `Work` in the navbar and add `Open Source`
- keep navbar lean and link to `Open Source` from the homepage first
- add `Labs` to navbar only if it becomes strong enough to deserve primary navigation

Recommended sequence:

1. add `Open Source` page
2. decide later whether `Labs` deserves top-level nav or just a lower-priority link

## Content Placement Recommendation

### Keep in Work

- Orymu
- PesantrenQu
- KoperasiQu
- Mobile ERP

### Hide from Work

Already hidden or recommended to stay out of main work:

- Tutor App
- CeritaKita

### Put in Open Source

- mobile-core-kit
- backend-core-kit
- gitlab-activity-mirror
- android-core-kit (optional)

### Put in Labs

- factweaver
- discord-voice-ai-bot
- other exploratory repos that are technically interesting but not core portfolio proof

## UX Notes

### What to Avoid

- A flat `Projects` page that mixes everything together
- A GitHub-driven repo grid with no curation
- Overloading the homepage with too many portfolio sections
- Featuring weak or unfinished experiments beside mature shipped work

### What to Optimize For

- fast understanding of what is real delivered work
- visible proof that public engineering systems also exist
- strong curation
- low ambiguity about what each section means

## Proposed Rollout

### Step 1

Implement homepage `Open Source` section.

Deliverables:

- local curated data source for featured repos
- homepage section component
- 3 to 4 featured entries

### Step 2

Create `/open-source`.

Deliverables:

- dedicated index page
- reusable card/list component
- room for more than homepage highlights

### Step 3

Decide whether `/labs` is worth shipping.

This should only happen if the curated content is strong enough. `Labs` should be an intentional
section, not a holding area for leftovers.

## Tradeoffs

### Why not just keep everything under Work?

Because a shipped product case study and a reusable public kit are different forms of evidence. A
single label hides that difference.

### Why not call it Professional vs Experimental?

Because those labels are fuzzy and defensive. They create status hierarchy but do not explain what
the section is for. `Work`, `Open Source`, and `Labs` are clearer and more durable.

### Why not auto-pull GitHub repos?

Because portfolio quality depends on curation. GitHub is useful as metadata, but not as the source
of editorial judgment.

## Recommendation

Implement the minimal version first.

That means:

- homepage gets `Selected Work`
- homepage gets `Open Source`
- `/work` stays focused on case studies

Then expand into:

- `/open-source`
- `/labs` only if it earns its place

This gives the site a clearer structure without overbuilding too early.
