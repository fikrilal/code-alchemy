import fs from "fs";
import path from "path";

import matter from "gray-matter";

export type BlogListItem = {
  slug: string;
  date: string;
  title: string;
  description: string;
  coverImage?: string;
  readTime?: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getSortedPostsData(): BlogListItem[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const allPostsData: BlogListItem[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/i, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const gm = matter(fileContents);
    const data = gm.data as Partial<Omit<BlogListItem, "slug">>;

    return {
      slug,
      ...(data as Omit<BlogListItem, "slug">),
    } as BlogListItem;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Note: Content is rendered via MDX. `getPostData` is intentionally removed.
