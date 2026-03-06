import SelectedWork from "@/components/SelectedWork";
import { getWorkSummaries } from "@/lib/work";

export default async function WorkIndexPage() {
  const workItems = await getWorkSummaries();

  return (
    <main className="bg-neutral-950">
      <SelectedWork
        workItems={workItems}
        heading="All Work & Case Studies"
        description="A deeper look at the products and case studies I’ve delivered—from mobile apps to full-stack builds."
        ctaHref=""
        ctaLabel=""
      />
    </main>
  );
}
