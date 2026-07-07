import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

export function HomeColumn({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto px-2 md:max-w-3xl", className)} {...props} />
  );
}