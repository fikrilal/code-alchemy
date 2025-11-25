export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  readTime?: string;
  author?: string;
  authorImage?: string;
  tags?: string[];
};

export type BlogSummary = {
  slug: string;
} & Pick<BlogFrontmatter, "title" | "date" | "description" | "coverImage" | "readTime">;
