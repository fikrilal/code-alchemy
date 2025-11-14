import HeroSection from "@/components/HeroSection";
import BlogSection from "@/components/BlogSection";
import SelectedWork from "@/components/SelectedWork";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSortedPostsData } from "@/lib/blog";
import { getWorkSummaries } from "@/lib/work";

import type { BlogSummary } from "@/features/blog/types";

export default async function Home() {
  const [blogPosts, workItems] = await Promise.all([
    Promise.resolve(getSortedPostsData() as BlogSummary[]),
    getWorkSummaries(),
  ]);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <PortfolioSection />
        <SelectedWork workItems={workItems} />
        <BlogSection blogPosts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
