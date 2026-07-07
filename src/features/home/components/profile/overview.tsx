import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  LightbulbIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";

import { Panel, PanelContent } from "@/components/ui/panel";
import { CurrentLocalTime } from "@/features/home/components/profile/current-local-time";
import { USER } from "@/features/home/data/user";
import { cn } from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";

function IntroItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-4 font-mono text-sm", className)}
      {...props}
    />
  );
}

function IntroItemIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background [&_svg]:size-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function getJobIcon(title: string) {
  if (/(developer|engineer)/i.test(title)) {
    return <CodeXmlIcon aria-hidden />;
  }

  if (/(founder|co-founder)/i.test(title)) {
    return <LightbulbIcon aria-hidden />;
  }

  return <BriefcaseBusinessIcon aria-hidden />;
}

export function Overview() {
  return (
    <Panel className="relative screen-line-bottom-none">
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {USER.jobs.map((job) => (
          <IntroItem key={`${job.company}-${job.title}`}>
            <IntroItemIcon>{getJobIcon(job.title)}</IntroItemIcon>
            <p className="text-balance text-foreground">
              {job.title} at{" "}
              {"website" in job ? (
                job.website.startsWith("/") ? (
                  <Link href={job.website} className="link-underline text-foreground">
                    {job.company}
                  </Link>
                ) : (
                  <a
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-foreground"
                  >
                    {job.company}
                  </a>
                )
              ) : (
                job.company
              )}
            </p>
          </IntroItem>
        ))}

        <IntroItem>
          <IntroItemIcon>
            <MapPinIcon aria-hidden />
          </IntroItemIcon>
          <p className="text-balance text-foreground">{USER.address}</p>
        </IntroItem>

        <CurrentLocalTime timeZone={USER.timeZone} />

        <IntroItem>
          <IntroItemIcon>
            <MailIcon aria-hidden />
          </IntroItemIcon>
          <p className="text-balance text-foreground">
            <a href={`mailto:${USER.email}`} className="link-underline">
              {USER.email}
            </a>
          </p>
        </IntroItem>
      </PanelContent>

      <div
        aria-hidden
        className="pointer-events-none absolute top-px bottom-0 left-1/2 -z-1 w-px -translate-x-2.25 bg-[linear-gradient(to_bottom,var(--line)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
      />
    </Panel>
  );
}