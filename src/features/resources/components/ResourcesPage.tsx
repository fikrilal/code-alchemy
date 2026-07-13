import { PageShell } from "@/components/layout/page-shell";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { CategoryNav } from "@/features/resources/components/category-nav";
import { CategorySection } from "@/features/resources/components/category-section";
import {
  getResourceCategoriesInUse,
  getResourcesByCategory,
} from "@/features/resources/lib/catalog";

export default function ResourcesPage() {
  const groups = getResourcesByCategory();
  const categories = getResourceCategoriesInUse();

  return (
    <PageShell>
      <Panel>
        <PanelHeader>
          <h1 className="text-3xl font-medium tracking-tight text-balance text-foreground">
            Resources
          </h1>
        </PanelHeader>

        <p className="px-4 pb-4 text-base text-balance text-muted-foreground">
          A curated library of tools and references for mobile and design
          engineers — things worth opening when you need a solid starting
          point, not a random tab dump.
        </p>

        <CategoryNav categories={categories} />

        {groups.length === 0 ? (
          <p className="screen-line-top px-4 py-8 text-sm text-muted-foreground">
            No resources published yet.
          </p>
        ) : (
          groups.map((group) => (
            <CategorySection key={group.id} group={group} />
          ))
        )}
      </Panel>
    </PageShell>
  );
}
