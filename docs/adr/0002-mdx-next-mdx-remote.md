# ADR 0002: MDX via next-mdx-remote/rsc

## Context
We need rich, component-driven posts without HTML injection risk.

## Decision
Use `next-mdx-remote/rsc` to compile MDX at request time in App Router with: `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`, and `rehype-sanitize`.

## Consequences
- Posts render as React elements (no `dangerouslySetInnerHTML`).
- Can whitelist components and map `img` → `next/image`.
