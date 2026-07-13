import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import type { ResolvedResourcePreview } from "@/features/resources/lib/previews";
import type { ResourceEntry } from "@/features/resources/types";
import { cn } from "@/lib/utils";

import type { ImageProps } from "next/image";

type ResourceCardProps = {
  resource: ResourceEntry;
  preview: ResolvedResourcePreview;
  imageLoading?: ImageProps["loading"];
  className?: string;
};

export function ResourceCard({
  resource,
  preview,
  imageLoading = "lazy",
  className,
}: ResourceCardProps) {
  return (
    <article
      className={cn(
        "group/resource relative flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent/30",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-muted select-none">
        {preview.src ? (
          <Image
            alt={`Preview of ${resource.title}`}
            className="size-full object-cover object-top grayscale transition-[filter] duration-300 ease-out group-hover/resource:grayscale-0"
            height={800}
            loading={imageLoading}
            src={preview.src}
            width={1280}
          />
        ) : (
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-muted to-background p-4">
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Preview pending
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {resource.title}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {preview.hostname}
              </p>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 ring-inset" />

        {resource.featured ? (
          <span className="absolute top-2 left-2 rounded-md border border-line bg-background/90 px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase backdrop-blur-sm">
            Featured
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg leading-snug font-medium text-balance text-foreground">
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
          <ArrowUpRightIcon
            aria-hidden
            className="mt-1 size-4 shrink-0 text-muted-foreground"
          />
        </div>

        <p className="text-sm text-pretty text-muted-foreground">
          {resource.description}
        </p>

        {resource.tags && resource.tags.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
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

        <p className="font-mono text-xs text-muted-foreground/80">
          {preview.hostname}
        </p>
      </div>
    </article>
  );
}
