import { ResourceItem } from "@/features/resources/components/resource-item";
import { getResourceCategorySectionId } from "@/features/resources/lib/categories";
import type { ResourceCategoryGroup } from "@/features/resources/types";

type CategorySectionProps = {
  group: ResourceCategoryGroup;
};

export function CategorySection({ group }: CategorySectionProps) {
  const sectionId = getResourceCategorySectionId(group.id);

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className="scroll-mt-20"
    >
      <div className="screen-line-top space-y-1 px-4 py-4">
        <h2
          id={`${sectionId}-heading`}
          className="text-xl font-medium tracking-tight text-foreground"
        >
          {group.label}
        </h2>
        <p className="text-sm text-pretty text-muted-foreground">
          {group.description}
        </p>
      </div>

      <ul className="screen-line-top">
        {group.items.map((resource) => (
          <li key={resource.id} className="border-b border-line last:border-b-0">
            <ResourceItem resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
}
