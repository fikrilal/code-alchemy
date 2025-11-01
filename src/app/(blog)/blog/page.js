import { getSortedPostsData } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogMainSection from "./components/BlogMainSection";

export default function BlogPage() {
  const blogPosts = getSortedPostsData();

  return (
    <>
      <Navbar />
      <BlogMainSection blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
