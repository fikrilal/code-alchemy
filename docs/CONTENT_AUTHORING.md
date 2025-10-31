# Content Authoring (MDX)

MDX is used for blog (and optionally work) content. Files live under `src/content/{blog,work}` and are compiled with `next-mdx-remote/rsc`.

## File & Naming
- Blog: `src/content/blog/<slug>.mdx` (kebab-case slug)
- Work: `src/content/work/<slug>.mdx` (optional)
- Cover images: `public/images/blog/<slug>.jpg|png`

## Frontmatter Schema (example)
```mdx
---
title: "Post title"
date: "2025-05-01"        # ISO string
description: "Short summary for cards and SEO"
coverImage: "/images/blog/my-post.jpg"
tags: ["Next.js", "TypeScript"]
readTime: "5 min read"
author: "Your Name"
authorImage: "/images/avatar.png"
featured: true
---
```

## Allowed Components & Markdown
- Common markdown, GFM tables/lists via `remark-gfm`.
- Headings auto‑slugged and autolinked.
- Syntax highlighting via `rehype-pretty-code`.
- Whitelisted MDX components only; no network fetches from MDX.

## Images
- Use markdown `![]()`; the MDX renderer maps to a wrapper using `next/image` when possible.
- Prefer 1200×675 for covers; store in `public/images/blog/`.

## Styling
- Post body uses Tailwind Typography (`prose prose-invert`).
- Avoid custom inline styles; prefer markdown + components.

## Tips
- Keep titles ≤ 70 chars; descriptions 150–160 chars.
- Use meaningful, stable slugs; changing slugs breaks links.
- For callouts, create a small MDX component and add to the allowed map.
