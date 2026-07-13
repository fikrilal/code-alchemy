# Resources Preview Pipeline Engineering Proposal

## Status

- Status: Draft — design lock before implementation
- Scope: Resource card UI (preview grid) + owned screenshot pipeline via GitHub Actions
- Parent: `_WIP/resources-library-engineering-proposal.md` (Phase 1 MVP already shipped)
- Branch context: `redesign` (or follow-up branch)
- Implementation: Not started

### Phase 0 locked decisions (this proposal)

| Decision | Lock |
|----------|------|
| Preview source | **Real page screenshots** (Vercel-deployment-style), not OG-only |
| Capture owner | **Self-hosted in CI** — Playwright on GitHub Actions |
| Third-party screenshot SaaS | **Out of scope for v1** (Microlink, ScreenshotOne, Thum.io, etc.) |
| Capture timing | Build/CI / on-demand — **never** on visitor page request |
| Cache model | Long-lived static files; rare refresh |
| Storage | Local images under `public/images/resources/` |
| Runtime fallback | Placeholder when image missing (no OG scrape in v1) |
| UI | Category sections + **grid cards** with preview media |
| Homepage | Still out of scope |

## Summary

Phase 1 of Resources shipped a utility catalog at `/resources` with category sections and text list rows. The UI feels generic: no visual recognition of each tool, no “this is what the site looks like” signal.

Visitors expect something closer to a **Vercel production deployment preview**: a card that shows a **screenshot of the live site**, not only a title and tags.

This proposal defines a single-option pipeline:

1. **GitHub Actions + Playwright** captures each catalog URL into a static WebP.
2. Images live in the repo under `public/images/resources/{id}.webp`.
3. The Resources page renders a **card grid** that uses those local images.
4. Missing images use a **branded placeholder** so the page never depends on external APIs at request time.

No third-party screenshot free tier. No runtime screenshot fetch. No OG auto-scrape in v1 (can be a later soft-fail enhancement).

## Goals

- Make `/resources` feel curated and scannable via visual previews.
- Produce Vercel-like “live site” thumbnails using real screenshots.
- Keep capture cost at ~$0 for ~30–50 mostly-static links.
- Keep the production site dumb and reliable: static images only.
- Fit existing architecture: content in `src/content`, feature UI in `src/features/resources`, infrastructure scripts outside request path.
- Stay reversible and small: one capture script, one workflow, card UI reuse of existing visual language (blog grid craft).

## Non-Goals

- Third-party screenshot APIs (Microlink, ScreenshotOne, ApiFlash, Thum.io, Urlbox, etc.).
- Runtime screenshot or OG fetch on each `/resources` page load.
- Self-hosted Playwright on Vercel serverless (too heavy for this site).
- Live iframe embeds of external sites.
- Perfect capture of auth-walled, heavily anti-bot, or heavily animated pages.
- Daily recapture of the full catalog.
- Homepage teaser for Resources.
- Manual hand-authored marketing art as the primary image source (optional override can come later).

## Problem

Current Resources UI:

- Text rows + tags + FEATURED pills
- No site recognition without reading
- Feels like a browser bookmark export, not a utility library

Desired UI:

- Grid cards with a large media area
- Media shows an actual screenshot of the destination
- Description remains the editorial “why open this” layer
- Categories and jump nav stay

## Product / UX

### Card layout

Reuse the craft language already used for blog (`PostItem` / `PostList`) and seen on references like chanhdai blog cards — **not** chanhdai’s plain bookmark list.

```text
┌─────────────────────────────┐
│                             │
│   screenshot / placeholder  │  aspect ~16:9 or 1200/630
│                             │
├─────────────────────────────┤
│ Title                    ↗  │
│ One-line description        │
│ tags (optional)             │
└─────────────────────────────┘
```

### Page structure (unchanged IA)

1. Intro copy
2. Category jump chips
3. Per-category section blurb
4. **Grid of cards** (1 col mobile, 2 col `sm+`) instead of full-width rows

### Visual details (v1)

| Element | Approach |
|---------|----------|
| Media | Local WebP; `object-cover`; inset ring; optional slight radius |
| Hover | Background wash; optional grayscale → color (match blog) |
| Click | Whole card is external link (`target="_blank"`, `rel="noreferrer"`) |
| Featured | Subtle badge on card or media corner (not a loud gray pill wall) |
| Missing image | Placeholder panel: hostname + title (intentional, not broken) |
| Browser chrome frame | **Optional v1.1** — nice Vercel cue; not required for pipeline |

### Grid

- Prefer the same column-divider / `screen-line` patterns as blog list where they fit.
- Do not introduce drop-shadow “bootstrap cards.” Stay on-system with Panel / line borders.

## Architecture

### Single option: CI-owned screenshots

```text
src/content/resources/catalog.json
        │
        ▼
GitHub Actions (Playwright)
  • workflow_dispatch
  • schedule (weekly)
  • push when catalog.json changes
        │
        ▼
public/images/resources/{id}.webp
        │
        ▼
src/features/resources components
  resolvePreviewPath(id) → local path or null
        │
        ▼
/resources card grid (static, server-rendered)
```

### Layer responsibilities

| Layer | Owns |
|-------|------|
| `src/content/resources/catalog.json` | Editorial entries (unchanged schema for v1) |
| `scripts/capture-resource-previews.ts` (name TBD) | Playwright capture, write WebPs, exit non-zero only on hard script failure |
| `.github/workflows/resource-previews.yml` | Schedule, triggers, install browser, run script, commit or PR |
| `public/images/resources/` | Generated preview assets |
| `src/features/resources` | Card UI, path resolution, placeholders |
| `src/lib` | Nothing required for v1 capture (optional shared helpers later) |
| Runtime Next.js | **Does not** call Playwright or external screenshot APIs |

### Dependency rule

Visitor traffic must never depend on:

- GitHub Actions being green at that moment
- Headless browser availability
- Third-party screenshot quotas

If images are stale or missing, the page still works.

## Data model

### Catalog (v1)

**No schema change required** for the happy path.

Preview path is **derived** from `id`:

```text
/images/resources/{id}.webp
```

Optional later (not v1):

```ts
previewImage?: string; // manual override path or absolute URL
```

### Preview resolution (runtime)

```ts
function getResourcePreviewSrc(entry: ResourceEntry): string | null {
  // 1. if optional override exists and file/url ok → use it (future)
  // 2. if public/images/resources/{id}.webp exists → use it
  // 3. else null → placeholder UI
}
```

Existence check options:

- **A (preferred for static export simplicity):** always point at derived path; use `onError` on image is client-only — avoid if possible.
- **B (server-friendly):** check `fs.existsSync` in server feature lib when building card props.
- **C:** maintain `src/content/resources/previews.json` manifest written by the capture script (`{ id, path, capturedAt, sourceUrl, ok }`).

**Recommendation:** **C (manifest) + B** for honesty:

- Script writes images + updates `previews-manifest.json` (or similar).
- Feature lib reads manifest; missing/failed → placeholder.
- Avoids relying on image `onError` for layout.

Exact filename to lock at implement time: e.g. `src/content/resources/previews-manifest.json` or `public/images/resources/manifest.json`. Prefer **content/** for metadata and **public/** for binary images.

### Manifest entry (proposed)

```ts
type ResourcePreviewManifestEntry = {
  id: string;
  sourceUrl: string;
  file: string; // e.g. "magic-ui.webp" relative to public/images/resources/
  capturedAt: string; // ISO timestamp
  ok: boolean;
  error?: string;
};
```

## Capture pipeline (Playwright)

### Script responsibilities

1. Load and Zod-validate `catalog.json` (reuse feature schema or a shared parse).
2. Determine work set:
   - default: missing previews + entries whose `sourceUrl` changed vs manifest
   - `--all` / `--force`: recapture everything
   - `--id=<id>`: single entry
3. Launch Chromium (Playwright).
4. Per entry:
   - navigate with timeout
   - wait strategy: fixed settle delay + `domcontentloaded` (avoid fragile `networkidle` as sole signal)
   - viewport e.g. **1280×800** (desktop marketing view)
   - optional: `colorScheme: 'dark'` for consistency with site default
   - screenshot to WebP/JPEG buffer; write `public/images/resources/{id}.webp`
   - update manifest (`ok: true` or `ok: false` + error)
5. Soft-fail per URL: one blocked site must not fail the whole job unless `--strict`.
6. Exit `0` if script completed; use annotations/summary for failures. (Policy: default soft-fail so cron stays green when one site blocks bots.)

### Capture parameters (defaults to lock at implement)

| Param | Default proposal |
|-------|------------------|
| Viewport | 1280×800 |
| Device scale | 1 |
| Timeout | 30–45s navigation |
| Settle wait | 1–2s after load |
| Format | WebP (quality ~70–80) or JPEG if WebP toolchain is annoying |
| Full page | **No** — viewport screenshot only |
| Auth / cookies | None |

### Failure modes

| Failure | Handling |
|---------|----------|
| Timeout / DNS / TLS | `ok: false`, keep previous image if any, else placeholder |
| Bot challenge / blank | `ok: false`; manual re-run later or accept placeholder |
| Cookie banner clutter | Accept in v1; optional CSS hide list in v1.1 |
| Playwright install fail | Workflow fails hard (infra issue) |

## GitHub Actions

### Workflow: `.github/workflows/resource-previews.yml`

**Triggers:**

```yaml
on:
  workflow_dispatch:
    inputs:
      force_all:
        description: "Recapture all resources"
        type: boolean
        default: false
      only_id:
        description: "Capture a single resource id"
        type: string
        required: false
  schedule:
    # Weekly — content is mostly static
    - cron: "0 3 * * 0"
  push:
    branches: [main, redesign] # lock to actual default + active branch at implement time
    paths:
      - "src/content/resources/catalog.json"
      - "scripts/capture-resource-previews.*"
      - ".github/workflows/resource-previews.yml"
```

**Job sketch:**

1. Checkout (token with contents write if committing)
2. Setup Node 22 (match `package.json` engines)
3. `npm ci`
4. Install Playwright Chromium + deps
5. Run capture script with flags from inputs
6. Persist results:
   - **Preferred v1:** commit images + manifest back to the same branch, or open a PR
   - Document choice below

### Persist strategy (choose one at implement; recommendation below)

| Strategy | Pros | Cons |
|----------|------|------|
| **Commit to branch** | Simple; deploy picks up files | Noisy git history; needs write token |
| **Open PR** | Reviewable; safer on main | Manual merge unless automerge |
| **Artifact only** | Clean git | Deploy must fetch artifacts — awkward on Vercel |

**Recommendation for this repo:**  

- On `workflow_dispatch` / schedule: **open a PR** titled `chore(resources): refresh preview screenshots`  
- On catalog push on a feature branch: **commit on same branch** so PR already includes previews  

If write permissions are painful initially, v1 can be **manual local script** + committed images, with GHA added immediately after — but the locked *architecture* remains GHA-owned capture.

### Permissions

```yaml
permissions:
  contents: write
  pull-requests: write
```

Use `GITHUB_TOKEN` or a fine-scoped bot token if branch protection blocks default token.

### CI interaction

- Existing `ci.yml` must **not** require Playwright browsers for normal PRs.
- Capture workflow is separate; keep default PR CI fast.
- Optionally add a lightweight check: “manifest ids ⊆ catalog ids” in unit tests without browsers.

## Site feature changes

### UI components

```text
src/features/resources/components/
  ResourcesPage.tsx          # compose sections
  category-nav.tsx           # keep
  category-section.tsx       # host grid, not row list
  resource-grid.tsx          # new — 1/2 col grid
  resource-card.tsx          # new — media + title + description
  resource-item.tsx          # deprecate or replace
```

### Preview helper

```text
src/features/resources/lib/
  previews.ts                # read manifest, resolve src, list missing
```

### `next/image`

- Local public files: no `remotePatterns` change required for happy path.
- Use explicit `width`/`height` or fill + aspect box; `sizes` for 1/2 col grid.

### Server-only

- Manifest read with `fs` stays server-side (`server-only` if needed).
- Page remains a Server Component.

## Caching / freshness policy

| Event | Behavior |
|-------|----------|
| New catalog entry | Capture that id (path-filter workflow or `--id`) |
| URL change for existing id | Recapture (manifest `sourceUrl` mismatch) |
| Weekly cron | Recapture stale or all soft-fail; prefer “missing + url changed” unless `force_all` |
| Visitor request | Serve static file only |
| Failed capture | Keep last good image if present; else placeholder |

Target freshness: **days to weeks**, not minutes. Editorial links rarely redesign.

## Security & compliance

- Only screenshot **HTTPS URLs already in the editorial catalog** (no open redirect / user-submitted URLs).
- Do not execute capture against arbitrary query params from the public internet.
- No secrets required for basic Playwright capture.
- If committing images, review PRs for accidental capture of sensitive authenticated pages (catalog should stay public sites only).
- Respect that some sites dislike bots; soft-fail and placeholders are acceptable.

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Bot walls / blank shots | Soft-fail; placeholder; optional later manual `previewImage` |
| Cookie banners in frame | Accept v1; CSS injection list later |
| Repo size growth | WebP/JPEG compression; only viewport shots; don’t full-page |
| Noisy git history | PR-based refresh; don’t force-all weekly unless needed |
| GHA minutes | Weekly + catalog-change only; ~minutes per run at current scale |
| Playwright flaky CI | Soft-fail per URL; pin Playwright version |
| Scope creep into SaaS | Explicit non-goal; revisit only if self-capture becomes unmaintainable |

## Phased delivery

### Phase P0 — Design lock (this doc)

- [x] Single capture option = GHA + Playwright  
- [x] No third-party screenshot SaaS in v1  
- [x] Static local images + placeholder fallback  
- [x] Grid card UI direction  
- [ ] Confirm persist strategy: PR vs direct commit  
- [ ] Confirm branches for workflow (`main` / `redesign`)  
- [ ] Confirm image format WebP vs JPEG  

### Phase P1 — Card UI without new captures (optional parallel)

1. Replace list rows with grid cards.
2. Use placeholder media (or existing files if any).
3. Keep categories + nav.
4. Ship visual improvement even before first green capture run.

### Phase P2 — Capture script (local-first)

1. Add Playwright as a **devDependency** (or isolated script package if cleaner).
2. Implement `scripts/capture-resource-previews.ts`.
3. Document: `npm run resources:previews` (and `-- --id=`, `-- --all`).
4. Generate initial previews locally; commit images + manifest.
5. Unit tests for path resolution / manifest parse (no browser in default `npm test`).

### Phase P3 — GitHub Actions

1. Add `resource-previews.yml`.
2. Wire schedule + dispatch + catalog path filter.
3. Persist via locked strategy (PR recommended).
4. Document maintainer flow in README (short) or script header comments.

### Phase P4 — Polish (only if needed)

- Browser chrome frame around preview  
- Dark-scheme capture tuning  
- Optional OG fallback if screenshot `ok: false`  
- Optional `previewImage` override in catalog  
- Hide common cookie banners via CSS  

**Do not start P4 until P2/P3 are useful in production.**

## Validation

When implementing, follow `AGENTS.md`:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run deps:check` if import boundaries change

Additional:

- Local: run capture for 1–2 ids and confirm files + cards.
- CI: manual `workflow_dispatch` on a branch before enabling schedule on default branch.

Do not claim validation passed unless run.

## Success criteria

v1 of this proposal is successful when:

1. `/resources` shows a **grid of cards** with preview media areas.
2. Most catalog entries show a **real screenshot** from the owned pipeline.
3. A missing/failed capture never breaks the page (placeholder).
4. Visitor requests never call Playwright or a screenshot SaaS.
5. Maintainers can refresh via **local script** and/or **GHA dispatch**.
6. Weekly automation exists or is ready, without daily rebuild spam.

## Open decisions (lock before / during implement)

1. **Persist strategy:** open PR (recommended) vs commit to branch.  
2. **Workflow branches:** which branches run schedule vs path filters.  
3. **Image format:** WebP vs JPEG.  
4. **Whether P1 (UI-only) ships before first capture batch.**  
5. **Playwright dependency location:** root `devDependency` vs optional script install in CI only.

## Recommendation summary

| Topic | Decision |
|-------|----------|
| Capture | Own Playwright on GitHub Actions |
| SaaS free tier | Not for v1 |
| Cache | Long-lived files in `public/images/resources/` |
| Runtime | Local image or placeholder only |
| UI | Blog-like grid cards under existing categories |
| Fallback | Placeholder (OG later, optional) |

This is the minimum complete design for “Vercel-like live previews” without rushing into multi-provider complexity.

## Related documents

- `_WIP/resources-library-engineering-proposal.md` — catalog, taxonomy, route, Phase 1 MVP  
- `docs/standards/architecture.md` — layer boundaries  
- `AGENTS.md` — engineering workflow and validation  

## Appendix: Why not free-tier SaaS (record of decision)

Free tiers (Microlink ~25–50/day, ScreenshotOne ~100/mo, Thum.io ~1k impressions, etc.) work for prototypes, but for this site:

- Catalog is small and static → CI minutes beat API quotas.
- Want zero production dependency on vendor uptime/watermarks/plan changes.
- Already want static files for reliability → SaaS would still end as “download in CI,” i.e. GHA with extra middleman.

Revisit SaaS only if self-capture maintenance cost exceeds vendor cost.
