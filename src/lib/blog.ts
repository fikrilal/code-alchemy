import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { BlogSummary } from "@/features/blog/types";

export type { BlogSummary };

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getSortedPostsData(): BlogSummary[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const allPostsData: BlogSummary[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/i, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const gm = matter(fileContents);
    const data = gm.data as Partial<Omit<BlogSummary, "slug">>;

    return {
      slug,
      ...(data as Omit<BlogSummary, "slug">),
    } satisfies BlogSummary;
  });

  const toMillis = (value: BlogSummary) => {
    const time = new Date(value.date).getTime();
    return Number.isNaN(time) ? 0 : time;
  };

  return allPostsData.sort((a, b) => toMillis(b) - toMillis(a));
}

// Note: Content is rendered via MDX. `getPostData` is intentionally removed.
