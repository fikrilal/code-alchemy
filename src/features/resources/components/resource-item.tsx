import { ArrowUpRightIcon } from "lucide-react";

import type { ResourceEntry } from "@/features/resources/types";
import { cn } from "@/lib/utils";

type ResourceItemProps = {
  resource: ResourceEntry;
  className?: string;
};

export function ResourceItem({ resource, className }: ResourceItemProps) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-3 px-4 py-4 transition-[background-color] ease-out hover:bg-accent/30",
        className,
      )}
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="leading-snug font-medium text-balance text-foreground">
            <a
              href={resource.url}
              rel="noreferrer"
              target="_blank"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden className="absolute inset-0" />
              {resource.title}
            </a>
          </h3>
          {resource.featured ? (
            <span className="rounded-md border border-line bg-muted px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Featured
            </span>
          ) : null}
        </div>

        <p className="text-sm text-pretty text-muted-foreground">
          {resource.description}
        </p>

        {resource.tags && resource.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5 pt-0.5">
            {resource.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-line px-1.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <ArrowUpRightIcon
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
      />
    </div>
  );
}
