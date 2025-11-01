import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize from "rehype-sanitize";
import mdxComponents from "@/features/mdx/components";

const WORK_DIR = path.join(process.cwd(), "src/content/work");

export function getWorkSlugs() {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/i, ""));
}

export async function compileWork(source) {
  const { content, frontmatter } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
          [rehypePrettyCode, { theme: "github-dark" }],
          rehypeSanitize,
        ],
      },
    },
  });
  return { content, frontmatter };
}

export async function loadWorkBySlug(slug) {
  const mdxPath = path.join(WORK_DIR, `${slug}.mdx`);
  const mdPath = path.join(WORK_DIR, `${slug}.md`);
  let filePath = null;
  if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else if (fs.existsSync(mdPath)) filePath = mdPath;
  else throw new Error(`Work not found: ${slug}`);

  const source = fs.readFileSync(filePath, "utf8");
  return compileWork(source);
}
