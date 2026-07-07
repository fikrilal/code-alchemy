import { PageShell } from "@/components/layout/page-shell";
import SelectedWorkSection from "@/features/work/components/SelectedWorkSection";
import { getWorkSummaries } from "@/features/work/lib/summaries";

export default async function WorkIndexPage() {
  const workItems = await getWorkSummaries();

  return (
    <PageShell>
      <SelectedWorkSection
        workItems={workItems}
        heading="All Work & Case Studies"
        description="A deeper look at the products and case studies I've delivered—from mobile apps to full-stack builds."
        ctaHref=""
        ctaLabel=""
      />
    </PageShell>
  );
}