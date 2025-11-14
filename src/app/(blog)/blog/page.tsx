import { getSortedPostsData } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import BlogMainSection from "./components/BlogMainSection";

import type { BlogSummary } from "@/features/blog/types";

export default function BlogPage() {
  const blogPosts = getSortedPostsData() as BlogSummary[];

  return (
    <>
      <Navbar />
      <BlogMainSection blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
