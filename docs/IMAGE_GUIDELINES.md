# Image Guidelines (Clean Architecture)

## Directory Layout
- Base: `public/images`
- Work: `public/images/work/<slug>/`
  - `hero.(jpg|png|webp)` – primary cover
  - `gallery/01.jpg, 02.jpg, ...` – ordered gallery (zero‑padded)
- Blog: `public/images/blog/<slug>/`
  - `cover.(jpg|png|webp)` – post cover
- Naming: lowercase, kebab‑case; no spaces; prefer `webp` where possible.

## MDX Frontmatter
- Work MDX (`src/content/work/<slug>.mdx`):
  - `thumbnail: "/images/work/<slug>/hero.jpg"`
  - Optional overrides:
    - `images: { hero: "hero.jpg", gallery: ["01.jpg","02.jpg"] }` (relative to `/images/work/<slug>/`)
- Blog MDX: `coverImage: "/images/blog/<slug>/cover.jpg"`

## TypeScript Helpers (proposed)
- `src/lib/images.ts`:
  - `getWorkImages(slug, fm?) => { hero: string; gallery: string[] }`
  - Uses frontmatter overrides; falls back to `/images/work/<slug>/...`.

```ts
export function getWorkImages(slug: string, fm?: { images?: { hero?: string; gallery?: string[] } }) {
  const base = `/images/work/${slug}`;
  const hero = fm?.images?.hero ? `${base}/${fm.images.hero}` : `${base}/hero.jpg`;
  const gallery = (fm?.images?.gallery ?? []).map(n => `${base}/gallery/${n}`);
  return { hero, gallery };
}
```

## Components (proposed)
- `WorkGallery`: server page calls `getWorkImages` and renders responsive `next/image` grid; Lightbox optional.
- `MdxImage`: keeps absolute `/images/...` safe for `next/image`; inline MDX remains simple.

## Authoring Rules
- Use absolute site paths (`/images/...`) in MDX.
- Provide descriptive `alt` text. Cover: 1600×900+ (16:9) recommended.
- Compress before commit (lossy `webp` preferred); avoid oversized animated GIFs.

## Validation & CDN
- Optional script: `npm run verify:images` to check frontmatter paths exist.
- If moving to CDN later, set `next.config.mjs` `images.remotePatterns` and switch base via env (`IMAGE_BASE_URL`).
