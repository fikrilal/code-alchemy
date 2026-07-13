import { getResourceCategorySectionId } from "@/features/resources/lib/categories";
import type { ResourceCategoryMeta } from "@/features/resources/types";

type CategoryNavProps = {
  categories: ResourceCategoryMeta[];
};

export function CategoryNav({ categories }: CategoryNavProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Resource categories"
      className="screen-line-top flex flex-wrap gap-2 px-4 py-3"
    >
      {categories.map((category) => (
        <a
          key={category.id}
          href={`#${getResourceCategorySectionId(category.id)}`}
          className="rounded-md border border-line px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          {category.label}
        </a>
      ))}
    </nav>
  );
}
