import { getSortedPostsData, type BlogListItem } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import BlogMainSection from "./components/BlogMainSection";

export default function BlogPage() {
  const blogPosts = getSortedPostsData() as BlogListItem[];

  return (
    <>
      <Navbar />
      <BlogMainSection blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
