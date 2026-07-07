import Image from "next/image";
import Link from "next/link";

import type { WorkSummary } from "@/features/work/types";
import { cn } from "@/lib/utils";


type WorkItemProps = {
  work: WorkSummary;
  className?: string;
};

function getBrandName(title: string) {
  const [brand] = title.split(/\s[–—-]\s/);
  return brand ?? title;
}

export function WorkItem({ work, className }: WorkItemProps) {
  const brandName = getBrandName(work.title);

  return (
    <Link
      href={`/work/${work.slug}`}
      className={cn(
        "flex flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent/30",
        "max-sm:screen-line-top max-sm:screen-line-bottom",
        "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          alt={brandName}
          className="size-full object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 384px"
          src={work.thumbnail}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-foreground/10 ring-inset" />
      </div>

      <div className="p-2">
        <h3 className="text-lg leading-tight font-medium text-balance">
          {brandName}
        </h3>
      </div>
    </Link>
  );
}