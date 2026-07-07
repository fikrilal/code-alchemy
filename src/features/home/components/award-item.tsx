import { format } from "date-fns";
import { ArrowUpRightIcon, CrownIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import type { Award } from "@/features/home/data/awards";
import { cn } from "@/lib/utils";

type AwardItemProps = {
  award: Award;
  className?: string;
};

function formatAwardDate(date: string) {
  const parsed = Date.parse(date);

  if (Number.isNaN(parsed)) {
    return date;
  }

  return format(parsed, "MM.yyyy");
}

export function AwardItem({ award, className }: AwardItemProps) {
  const formattedDate = formatAwardDate(award.date);
  return (
    <div
      className={cn(
        "relative flex items-center pr-2 transition-[background-color] ease-out hover:bg-accent/30",
        className,
      )}
    >
      <div
        className={cn(
          "mx-4 flex size-6 shrink-0 items-center justify-center rounded-md select-none",
          "border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background",
          "[&_svg]:size-4",
        )}
      >
        <CrownIcon aria-hidden />
      </div>

      <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
        <h3 className="leading-snug font-medium text-balance">
          <a
            href={award.credentialLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span aria-hidden className="absolute inset-0" />
            {award.title}
          </a>
        </h3>

        <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <div>
            <dt className="sr-only">Organization</dt>
            <dd>{award.organization}</dd>
          </div>

          <Separator
            className="data-vertical:h-4 data-vertical:self-center"
            orientation="vertical"
            aria-hidden
          />

          <div>
            <dt className="sr-only">Date</dt>
            <dd>
              <time dateTime={award.date}>{formattedDate}</time>
            </dd>
          </div>
        </dl>
      </div>

      <ArrowUpRightIcon
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground"
      />
    </div>
  );
}