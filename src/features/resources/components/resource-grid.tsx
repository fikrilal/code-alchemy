import { ResourceCard } from "@/features/resources/components/resource-card";
import type { ResolvedResourcePreview } from "@/features/resources/lib/previews";
import type { ResourceEntry } from "@/features/resources/types";
import { cn } from "@/lib/utils";

type ResourceGridProps = {
  resources: ResourceEntry[];
  previews: Map<string, ResolvedResourcePreview>;
};

export function ResourceGrid({ resources, previews }: ResourceGridProps) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2"
      >
        <div className="border-r border-line" />
        <div className="border-l border-line" />
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {resources.map((resource, index) => {
          const preview = previews.get(resource.id) ?? {
            src: null,
            hostname: resource.url,
          };

          return (
            <li
              key={resource.id}
              className={cn(
                "max-sm:screen-line-top max-sm:screen-line-bottom",
                "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
              )}
            >
              <ResourceCard
                resource={resource}
                preview={preview}
                imageLoading={index <= 3 ? "eager" : "lazy"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
