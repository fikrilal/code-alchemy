import { PageShell } from "@/components/layout/page-shell";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { ResourcesCatalog } from "@/features/resources/components/resources-catalog";
import {
  getResourceCatalog,
  getResourceCategoriesInUse,
} from "@/features/resources/lib/catalog";
import { resolveResourcePreviews } from "@/features/resources/lib/previews";

export default function ResourcesPage() {
  const catalog = getResourceCatalog();
  const categories = getResourceCategoriesInUse(catalog);
  const previews = resolveResourcePreviews(catalog);
  const previewsRecord = Object.fromEntries(previews.entries());

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

        {catalog.length === 0 ? (
          <p className="screen-line-top px-4 py-8 text-sm text-muted-foreground">
            No resources published yet.
          </p>
        ) : (
          <ResourcesCatalog
            resources={catalog}
            categories={categories}
            previews={previewsRecord}
          />
        )}
      </Panel>
    </PageShell>
  );
}
