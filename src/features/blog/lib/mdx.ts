import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize from "rehype-sanitize";

import mdxComponents from "@/features/mdx/components";

import type { ReactElement } from "react";

export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  readTime?: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function compileSource(source: string): Promise<{ content: ReactElement; frontmatter: BlogFrontmatter }> {
  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: { className: ["anchor"] },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
            },
          ],
          rehypeSanitize,
        ],
      },
    },
  });
  return { content, frontmatter };
}

export async function loadPostBySlug(slug: string): Promise<{ content: ReactElement; frontmatter: BlogFrontmatter }> {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  let filePath = null;
  if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else if (fs.existsSync(mdPath)) filePath = mdPath;
  else throw new Error(`Post not found: ${slug}`);

  const source = fs.readFileSync(filePath, "utf8");
  return compileSource(source);
}
