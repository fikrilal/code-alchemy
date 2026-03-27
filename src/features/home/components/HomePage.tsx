import { getSortedPostsData } from "@/features/blog/lib/posts";
import BlogSection from "@/features/home/components/BlogSection";
import HeroSection from "@/features/home/components/HeroSection";
import PortfolioSection from "@/features/home/components/PortfolioSection";
import OpenSourceSection from "@/features/open-source/components/OpenSourceSection";
import { getFeaturedOpenSourceRepoCards } from "@/features/open-source/lib/repos";
import SelectedWorkSection from "@/features/work/components/SelectedWorkSection";
import { getWorkSummaries } from "@/features/work/lib/summaries";

export default async function HomePage() {
  const [blogPosts, workItems, openSourceRepos] = await Promise.all([
    getSortedPostsData(),
    getWorkSummaries(),
    getFeaturedOpenSourceRepoCards(),
  ]);
  const featuredWork = workItems.slice(0, 4);

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <PortfolioSection />
      <SelectedWorkSection workItems={featuredWork} />
      <OpenSourceSection repos={openSourceRepos} />
      <BlogSection blogPosts={blogPosts} />
    </main>
  );
}
