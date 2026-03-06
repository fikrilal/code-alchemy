import { getSortedPostsData } from "@/features/blog/lib/posts";

import BlogMainSection from "./BlogMainSection";

import type { BlogSummary } from "@/features/blog/types";

export default function BlogIndexPage() {
  const blogPosts = getSortedPostsData() as BlogSummary[];

  return <BlogMainSection blogPosts={blogPosts} />;
}
