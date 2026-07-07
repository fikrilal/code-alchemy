import { HomeColumn } from "@/components/layout/home-column";
import { StripeSeparator } from "@/components/layout/stripe-separator";
import { cn } from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";

type PageShellProps = ComponentProps<"main"> & {
  children: ReactNode;
  leadingSeparator?: boolean;
};

export function PageShell({
  children,
  className,
  leadingSeparator = true,
  ...props
}: PageShellProps) {
  return (
    <main className={cn("w-full overflow-x-clip", className)} {...props}>
      <HomeColumn>
        {leadingSeparator ? <StripeSeparator /> : null}
        {children}
      </HomeColumn>
    </main>
  );
}