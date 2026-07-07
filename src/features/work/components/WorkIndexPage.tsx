import { HomeColumn } from "@/components/layout/home-column";
import SelectedWorkSection from "@/features/work/components/SelectedWorkSection";
import { getWorkSummaries } from "@/features/work/lib/summaries";

export default async function WorkIndexPage() {
  const workItems = await getWorkSummaries();

  return (
    <main className="max-w-screen overflow-x-clip">
      <HomeColumn>
        <SelectedWorkSection
          workItems={workItems}
          heading="All Work & Case Studies"
          description="A deeper look at the products and case studies I've delivered—from mobile apps to full-stack builds."
          ctaHref=""
          ctaLabel=""
        />
      </HomeColumn>
    </main>
  );
}