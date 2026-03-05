import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSortedPostsData } from "@/lib/blog";

import BlogMainSection from "./BlogMainSection";

import type { BlogSummary } from "@/features/blog/types";

export default function BlogIndexPage() {
  const blogPosts = getSortedPostsData() as BlogSummary[];

  return (
    <>
      <Navbar />
      <BlogMainSection blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
