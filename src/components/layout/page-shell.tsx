import { HomeColumn } from "@/components/layout/home-column";
import { cn } from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";

type PageShellProps = ComponentProps<"main"> & {
  children: ReactNode;
};

export function PageShell({ children, className, ...props }: PageShellProps) {
  return (
    <main className={cn("w-full overflow-x-clip", className)} {...props}>
      <HomeColumn>{children}</HomeColumn>
    </main>
  );
}