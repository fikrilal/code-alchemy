import { cn } from "@/lib/cn";

import type { ComponentProps } from "react";

function Panel({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "screen-line-top screen-line-bottom border-x border-line",
        className,
      )}
      {...props}
    />
  );
}

function PanelHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn("screen-line-bottom px-4", className)}
      {...props}
    />
  );
}

function PanelTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      data-slot="panel-title"
      className={cn(
        "text-3xl font-medium tracking-tight text-balance text-white",
        className,
      )}
      {...props}
    />
  );
}

function PanelContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="panel-body" className={cn("p-4", className)} {...props} />;
}

export { Panel, PanelContent, PanelHeader, PanelTitle };