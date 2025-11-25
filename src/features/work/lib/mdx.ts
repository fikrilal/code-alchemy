import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { remarkMermaid } from "@/features/mdx/remark-mermaid";
import mdxComponents from "@/features/mdx/components";

import type { WorkFrontmatter } from "@/features/work/types";
import type { ReactElement } from "react";

const WORK_DIR = path.join(process.cwd(), "src/content/work");

export function getWorkSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/i, ""));
}

export async function compileWork(source: string): Promise<{ content: ReactElement; frontmatter: WorkFrontmatter }> {
  const { content, frontmatter } = await compileMDX<WorkFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMermaid],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
          [rehypePrettyCode, { theme: "github-dark" }],
        ],
      },
    },
  });
  return { content, frontmatter };
}

export async function loadWorkBySlug(slug: string): Promise<{ content: ReactElement; frontmatter: WorkFrontmatter }> {
  const mdxPath = path.join(WORK_DIR, `${slug}.mdx`);
  const mdPath = path.join(WORK_DIR, `${slug}.md`);
  let filePath = null;
  if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else if (fs.existsSync(mdPath)) filePath = mdPath;
  else throw new Error(`Work not found: ${slug}`);

  const source = fs.readFileSync(filePath, "utf8");
  return compileWork(source);
}
