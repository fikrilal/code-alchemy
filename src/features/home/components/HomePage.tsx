import { getSortedPostsData } from "@/features/blog/lib/posts";
import BlogSection from "@/features/home/components/BlogSection";
import ProfileHero from "@/features/home/components/ProfileHero";
import OpenSourceSection from "@/features/open-source/components/OpenSourceSection";
import { getFeaturedOpenSourceRepos } from "@/features/open-source/lib/repos";
import SelectedWorkSection from "@/features/work/components/SelectedWorkSection";
import { getWorkSummaries } from "@/features/work/lib/summaries";

export default async function HomePage() {
  const [blogPosts, workItems, openSourceRepos] = await Promise.all([
    getSortedPostsData(),
    getWorkSummaries(),
    getFeaturedOpenSourceRepos(),
  ]);
  return (
    <main className="overflow-hidden">
      <ProfileHero />
      <SelectedWorkSection
        workItems={workItems.slice(0, 4)}
        maxVisible={4}
      />
      <OpenSourceSection repos={openSourceRepos} />
      <BlogSection blogPosts={blogPosts} />
    </main>
  );
}
