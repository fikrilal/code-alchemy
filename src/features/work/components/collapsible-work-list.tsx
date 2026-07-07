"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { WorkItem } from "@/features/work/components/work-item";
import type { WorkSummary } from "@/features/work/types";

type CollapsibleWorkListProps = {
  items: WorkSummary[];
  max?: number;
};

export function CollapsibleWorkList({
  items,
  max = 4,
}: CollapsibleWorkListProps) {
  if (items.length <= max) {
    return (
      <ul>
        {items.map((work) => (
          <li key={work.slug} className="border-b border-line last:border-b-0">
            <WorkItem work={work} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Collapsible className="group/collapsible">
      <ul>
        {items.slice(0, max).map((work) => (
          <li key={work.slug} className="border-b border-line last:border-b-0">
            <WorkItem work={work} />
          </li>
        ))}
      </ul>

      <CollapsibleContent>
        <ul>
          {items.slice(max).map((work) => (
            <li key={work.slug} className="border-b border-line last:border-b-0">
              <WorkItem work={work} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>

      <div className="screen-line-top -mt-px flex h-12 items-center justify-center">
        <CollapsibleTrigger asChild>
          <Button className="gap-2 pr-2.5 pl-3" size="sm" variant="secondary">
            <span className="group-data-[state=closed]/collapsible:block group-data-[state=open]/collapsible:hidden">
              Show more
            </span>
            <span className="hidden group-data-[state=open]/collapsible:block">
              Show less
            </span>
            <ChevronDownIcon className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
}