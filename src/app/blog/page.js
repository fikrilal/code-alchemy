import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogMainSection from "./components/BlogMainSection";
import { getSortedPostsData } from "@/lib/blog";

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
