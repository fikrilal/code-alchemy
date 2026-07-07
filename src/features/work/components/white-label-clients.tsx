import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import type { WhiteLabelClient } from "@/features/work/types";
import { cn } from "@/lib/utils";

type WhiteLabelClientsProps = {
  clients: WhiteLabelClient[];
  heading?: string;
  description?: string;
  className?: string;
};

const DEFAULT_WHITE_LABEL_DESCRIPTION =
  "White-label apps live on Google Play, each branded for a school client.";

function getClientGridLayout(clientCount: number) {
  if (clientCount === 2) {
    return {
      gridClassName: "grid grid-cols-2 gap-2",
      dividerClassName:
        "pointer-events-none absolute inset-0 -z-1 grid grid-cols-2 gap-2",
      itemClassName: "nth-[2n+1]:screen-line-top nth-[2n+1]:screen-line-bottom",
      dividers: (
        <>
          <div className="border-r border-line" />
          <div className="border-l border-line" />
        </>
      ),
    };
  }

  if (clientCount === 1) {
    return {
      gridClassName: "grid grid-cols-1 gap-2",
      dividerClassName: "pointer-events-none absolute inset-0 -z-1 hidden",
      itemClassName: "screen-line-top screen-line-bottom",
      dividers: null,
    };
  }

  return {
    gridClassName: "grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3",
    dividerClassName:
      "pointer-events-none absolute inset-0 -z-1 hidden gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3",
    itemClassName: cn(
      "max-sm:screen-line-top max-sm:screen-line-bottom",
      "sm:max-md:nth-[2n+1]:screen-line-top sm:max-md:nth-[2n+1]:screen-line-bottom",
      "md:nth-[3n+1]:screen-line-top md:nth-[3n+1]:screen-line-bottom",
    ),
    dividers: (
      <>
        <div className="border-r border-line" />
        <div className="border-l border-line md:border-x" />
        <div className="border-l border-line max-md:hidden" />
      </>
    ),
  };
}

export function WhiteLabelClients({
  clients,
  heading = "Client Deployments",
  description = DEFAULT_WHITE_LABEL_DESCRIPTION,
  className,
}: WhiteLabelClientsProps) {
  if (clients.length === 0) {
    return null;
  }

  const layout = getClientGridLayout(clients.length);

  return (
    <section className={cn("min-w-0 overflow-x-clip", className)}>
      <div className="screen-line-top border-line px-4 py-3">
        <h2 className="text-lg font-medium tracking-tight text-foreground">
          {heading}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="relative border-t border-line">
        <div className={layout.dividerClassName}>{layout.dividers}</div>

        <ul className={layout.gridClassName}>
          {clients.map((client) => (
            <li key={client.appId} className={layout.itemClassName}>
              <WhiteLabelClientItem client={client} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhiteLabelClientItem({ client }: { client: WhiteLabelClient }) {
  return (
    <div className="relative flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out hover:bg-accent/30">
      <ClientIcon
        name={client.name}
        {...(client.icon ? { icon: client.icon } : {})}
      />

      <h3 className="min-w-0 flex-1 truncate font-medium leading-snug">
        <a
          href={client.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-foreground"
        >
          <span aria-hidden className="absolute inset-0" />
          {client.name}
        </a>
      </h3>

      <ArrowUpRightIcon
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground"
      />
    </div>
  );
}

function ClientIcon({
  name,
  icon,
}: {
  name: string;
  icon?: string;
}) {
  if (icon) {
    return (
      <div className="relative size-8 shrink-0 overflow-hidden">
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          sizes="32px"
          loading="lazy"
          className="size-full object-cover"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 ring-inset" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="flex size-8 shrink-0 items-center justify-center border border-line bg-muted text-xs font-medium text-muted-foreground"
    >
      {name.charAt(0)}
    </div>
  );
}