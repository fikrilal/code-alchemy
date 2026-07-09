import { PageShell } from "@/components/layout/page-shell";
import { StripeSeparator } from "@/components/layout/stripe-separator";
import { getSortedPostsData } from "@/features/blog/lib/posts";
import BlogSection from "@/features/home/components/BlogSection";
import { ExperienceSection } from "@/features/home/components/ExperienceSection";
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
    <PageShell leadingSeparator={false}>
      <ProfileHero />
      <ExperienceSection />
      <StripeSeparator />
      <SelectedWorkSection
        workItems={workItems.slice(0, 4)}
        maxVisible={4}
      />
      <StripeSeparator />
      <OpenSourceSection repos={openSourceRepos} />
      <StripeSeparator />
      <BlogSection blogPosts={blogPosts} limit={4} />
    </PageShell>
  );
}