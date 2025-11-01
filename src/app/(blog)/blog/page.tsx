import { getSortedPostsData } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import BlogMainSection from "./components/BlogMainSection";

type BlogPost = {
  slug: string;
  date: string;
  title: string;
  description: string;
  coverImage?: string;
  readTime?: string;
};

export default function BlogPage() {
  const blogPosts = getSortedPostsData() as BlogPost[];

  return (
    <>
      <Navbar />
      <BlogMainSection blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
