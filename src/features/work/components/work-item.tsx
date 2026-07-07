"use client";

import { format } from "date-fns";
import { BoxIcon, ChevronsUpDownIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

function formatWorkDate(date: string) {
  const parsed = Date.parse(date);

  if (Number.isNaN(parsed)) {
    return date;
  }

  return format(parsed, "MM.yyyy");
}

function getSkillLabel(skill: string) {
  const [label] = skill.split(/\s*-\s*/);
  return label?.trim() ?? skill;
}

export function WorkItem({ work, className }: WorkItemProps) {
  const brandName = getBrandName(work.title);
  const workHref = `/work/${work.slug}`;
  const formattedDate = work.date ? formatWorkDate(work.date) : undefined;
  const hasMetadata = Boolean(work.company || formattedDate || work.category);

  return (
    <Collapsible className={className}>
      <div className="group/project flex items-center transition-[background-color] ease-out hover:bg-accent/30">
        {work.logo ? (
          <Image
            src={work.logo}
            alt=""
            width={24}
            height={24}
            className="mx-4 size-6 shrink-0 rounded-md object-contain select-none"
            aria-hidden
          />
        ) : (
          <div
            className={cn(
              "mx-4 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md select-none",
              "border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background",
            )}
          >
            <BoxIcon aria-hidden className="size-4" />
          </div>
        )}

        <div className="flex-1 border-l border-dashed border-line">
          <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
            <div className="flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {brandName}
              </h3>

              {hasMetadata ? (
                <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  {work.company ? (
                    <div>
                      <dt className="sr-only">Company</dt>
                      <dd>{work.company}</dd>
                    </div>
                  ) : null}

                  {work.company && formattedDate ? (
                    <Separator
                      className="data-vertical:h-4 data-vertical:self-center"
                      orientation="vertical"
                      aria-hidden
                    />
                  ) : null}

                  {formattedDate ? (
                    <div>
                      <dt className="sr-only">Date</dt>
                      <dd>
                        <time dateTime={work.date}>{formattedDate}</time>
                      </dd>
                    </div>
                  ) : !work.company && work.category ? (
                    <div>
                      <dt className="sr-only">Category</dt>
                      <dd>{work.category}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    aria-label="View case study"
                    className="relative z-1 flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={workHref}
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => event.stopPropagation()}
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                  </Link>
                }
              />
              <TooltipContent>
                <p>View case study</p>
              </TooltipContent>
            </Tooltip>

            <ChevronsUpDownIcon
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground"
            />
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          {work.shortDescription ? (
            <p className="text-sm text-muted-foreground text-pretty">
              {work.shortDescription}
            </p>
          ) : null}

          {work.techStack && work.techStack.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {work.techStack.map((skill) => (
                <li key={skill}>
                  <span className="inline-flex rounded-md border border-line bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {getSkillLabel(skill)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}