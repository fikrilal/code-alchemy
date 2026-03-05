import fs from "node:fs";
import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { compileSource } from "@/features/blog/lib/mdx";
import { compileWork } from "@/features/work/lib/mdx";

function readContentFile(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("mdx compile pipeline", () => {
  it("produces stable sanitized output for a representative blog post", async () => {
    const source = readContentFile("src/content/blog/getx-in-cubit-style-single-state-effects.mdx");
    const { content, frontmatter } = await compileSource(source);
    const html = renderToStaticMarkup(content);

    const snapshot = {
      title: frontmatter.title,
      hasAnchorLinks: html.includes("class=\"anchor\""),
      hasCodeBlock: html.includes("<pre"),
      hasMermaidBlock: html.includes("class=\"mermaid\""),
      hasScriptTag: html.includes("<script"),
    };

    expect(snapshot).toMatchSnapshot();
    expect(snapshot.hasScriptTag).toBe(false);
  });

  it("produces stable sanitized output for a representative work post", async () => {
    const source = readContentFile("src/content/work/orymu.mdx");
    const { content, frontmatter } = await compileWork(source);
    const html = renderToStaticMarkup(content);

    const snapshot = {
      title: frontmatter.title,
      hasAnchorLinks: html.includes("class=\"anchor\""),
      hasCodeBlock: html.includes("<pre"),
      hasScriptTag: html.includes("<script"),
    };

    expect(snapshot).toMatchSnapshot();
    expect(snapshot.hasScriptTag).toBe(false);
  });

  it("strips unsafe HTML during blog compilation", async () => {
    const source = `---
title: "Sanitization Test"
date: "2026-01-01"
description: "Ensures unsafe HTML is stripped"
---
# Unsafe Content
<script>alert("xss")</script>
<div onclick="alert('xss')">hello</div>
`;
    const { content } = await compileSource(source);
    const html = renderToStaticMarkup(content);

    expect(html).not.toContain("<script");
    expect(html).not.toContain("onclick=");
  });
});
