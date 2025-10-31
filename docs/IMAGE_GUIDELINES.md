# Image Guidelines

## Asset Locations
- Public assets: `public/images/**`
- Blog covers: `public/images/blog/<slug>.(jpg|png)`
- Prefer optimized JPG/PNG; compress before commit.

## next/image Usage
- Always use `next/image` for page content where possible.
- Provide `sizes` for responsive images:

```tsx
<Image
  src="/images/blog/my-post.jpg"
  alt="Post cover"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
  className="object-cover rounded-lg"
/>
```

## Recommendations
- Hero/cover: 1200×675 (16:9) minimum.
- Avoid massive SVGs and animated GIFs; prefer video or static PNG/JPG where feasible.
- Provide meaningful `alt` text; avoid decorative-only images unless marked appropriately.
