"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { use } from "react";

import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const data = use(contributions);

  return (
    <TooltipProvider>
      <ContributionGraph
        aria-label="GitHub Contributions Graph"
        blockMargin={2}
        blockRadius={0}
        blockSize={12}
        className="mx-auto gap-4 py-4"
        data={data}
      >
        <ContributionGraphCalendar
          aria-hidden
          className="px-4 **:data-[slot=month-labels]:text-muted-foreground"
          title="GitHub Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger
                className="outline-none focus:outline-none focus-visible:outline-none"
                render={
                  <g className="outline-none">
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  </g>
                }
              />
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} contribution
                  {activity.count > 1 ? "s" : null} on{" "}
                  {format(new Date(activity.date), "dd.MM.yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="gap-4 px-4 leading-none">
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <div className="text-muted-foreground">
                {totalCount.toLocaleString("en")} contributions in the past 365
                days.
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend aria-hidden />
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-[180px] w-full items-center justify-center">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
}