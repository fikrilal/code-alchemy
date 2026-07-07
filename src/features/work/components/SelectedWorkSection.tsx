import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WorkItem } from "@/features/work/components/work-item";
import type { WorkSummary } from "@/features/work/types";

type SelectedWorkProps = {
  workItems: WorkSummary[];
  heading?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  limit?: number;
};

export default function SelectedWorkSection({
  workItems,
  heading = "Selected Work",
  description = "A look at the products I've helped ship — real users, real constraints, and the kind of mobile work I like to take end to end.",
  ctaHref = "/work",
  ctaLabel = "View all work",
  limit = 4,
}: SelectedWorkProps) {
  const items = workItems.slice(0, limit);
  const showCta = Boolean(ctaHref && ctaLabel);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-screen overflow-x-clip px-2 md:max-w-3xl">
      <div className="border-x border-line py-8">
        <h2 className="screen-line-top screen-line-bottom ml-4 font-medium text-3xl tracking-tight text-balance">
          {heading}
        </h2>

        <p className="p-4 text-base text-balance text-muted-foreground">
          {description}
        </p>

        <div className="screen-line-top relative py-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-1 grid max-sm:hidden sm:grid-cols-2"
          >
            <div className="border-r border-line" />
            <div className="border-l border-line" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((work) => (
              <WorkItem key={work.slug} work={work} />
            ))}
          </div>
        </div>

        {showCta ? (
          <div className="screen-line-top screen-line-bottom flex justify-center py-2">
            <Button asChild className="gap-2 pr-2.5 pl-3">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}