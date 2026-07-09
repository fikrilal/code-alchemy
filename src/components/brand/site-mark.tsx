import { cn } from "@/lib/utils";

import { SITE_MARK_PATH } from "./site-mark-path";

const SITE_MARK_VIEWBOX = "0 0 500 500";

type SiteMarkProps = {
  className?: string;
};

export function SiteMark({ className }: SiteMarkProps) {
  return (
    <svg
      viewBox={SITE_MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("w-auto text-foreground", className)}
    >
      <path d={SITE_MARK_PATH} fill="currentColor" />
    </svg>
  );
}
