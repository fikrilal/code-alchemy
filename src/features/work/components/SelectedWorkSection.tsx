import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { CollapsibleWorkList } from "@/features/work/components/collapsible-work-list";
import type { WorkSummary } from "@/features/work/types";

type SelectedWorkProps = {
  workItems: WorkSummary[];
  heading?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  maxVisible?: number;
};

export default function SelectedWorkSection({
  workItems,
  heading = "Selected Work",
  description = "A look at the products I've helped ship — real users, real constraints, and the kind of mobile work I like to take end to end.",
  ctaHref = "/work",
  ctaLabel = "View all work",
  maxVisible = 4,
}: SelectedWorkProps) {
  const showCta = Boolean(ctaHref && ctaLabel);

  if (workItems.length === 0) {
    return null;
  }

  return (
    <Panel>
        <PanelHeader>
          <PanelTitle>{heading}</PanelTitle>
        </PanelHeader>

        <p className="px-4 pb-4 text-base text-balance text-muted-foreground">
          {description}
        </p>

        <div className="screen-line-top">
          <CollapsibleWorkList items={workItems} max={maxVisible} />
        </div>

        {showCta ? (
          <div className="screen-line-top -mt-px flex justify-center py-2">
            <Button asChild className="gap-2 pr-2.5 pl-3">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        ) : null}
    </Panel>
  );
}