import HeroSection from "@/components/HeroSection";
import BlogSection from "@/components/BlogSection";
import SelectedWork from "@/components/SelectedWork";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSortedPostsData, type BlogListItem } from "@/lib/blog";

export default function Home() {
  const blogPosts = getSortedPostsData() as BlogListItem[];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <PortfolioSection />
        <SelectedWork />
        <BlogSection blogPosts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
