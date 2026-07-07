import Image from "next/image";

import { cn } from "@/lib/utils";

const SITE_MARK_WIDTH = 302;
const SITE_MARK_HEIGHT = 430;

type SiteMarkProps = {
  className?: string;
  priority?: boolean;
};

export function SiteMark({ className, priority = false }: SiteMarkProps) {
  return (
    <Image
      src="/brand/site-mark.svg"
      alt=""
      aria-hidden
      width={SITE_MARK_WIDTH}
      height={SITE_MARK_HEIGHT}
      className={cn("w-auto", className)}
      priority={priority}
    />
  );
}