import { useId } from "react";

import { cn } from "@/lib/utils";

import { SITE_MARK_PATH } from "./site-mark-path";

const SITE_MARK_VIEWBOX = "0 0 302 430";

type SiteMarkProps = {
  className?: string;
};

export function SiteMark({ className }: SiteMarkProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox={SITE_MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn(
        "w-auto text-foreground [--mark-stroke-start:#2563eb] [--mark-stroke-end:#60a5fa] dark:[--mark-stroke-start:#BFE3FE] dark:[--mark-stroke-end:#60B8FA]",
        className,
      )}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="265.897"
          y1="214.546"
          x2="35.1935"
          y2="214.546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--mark-stroke-start)" />
          <stop offset="1" stopColor="var(--mark-stroke-end)" />
        </linearGradient>
      </defs>
      <path
        d={SITE_MARK_PATH}
        fill="currentColor"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.758789"
      />
    </svg>
  );
}