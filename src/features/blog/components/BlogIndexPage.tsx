import { getSortedPostsData } from "@/features/blog/lib/posts";

import BlogMainSection from "./BlogMainSection";

export default function BlogIndexPage() {
  const blogPosts = getSortedPostsData();

  return <BlogMainSection blogPosts={blogPosts} />;
}
