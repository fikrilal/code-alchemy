import BlogSection from "@/features/home/components/BlogSection";
import HeroSection from "@/features/home/components/HeroSection";
import PortfolioSection from "@/features/home/components/PortfolioSection";
import { getSortedPostsData } from "@/features/blog/lib/posts";
import SelectedWorkSection from "@/features/work/components/SelectedWorkSection";
import { getWorkSummaries } from "@/features/work/lib/summaries";

export default async function HomePage() {
  const [blogPosts, workItems] = await Promise.all([
    getSortedPostsData(),
    getWorkSummaries(),
  ]);
  const featuredWork = workItems.slice(0, 4);

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <PortfolioSection />
      <SelectedWorkSection workItems={featuredWork} />
      <BlogSection blogPosts={blogPosts} />
    </main>
  );
}
