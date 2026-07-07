import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { PlayStoreAppPublicInfo } from "@/lib/playstore";

type PlayStoreCardProps = {
  app: PlayStoreAppPublicInfo;
};

export default function PlayStoreCard({ app }: PlayStoreCardProps) {
  const formattedRatingsCount =
    typeof app.ratingsCount === "number"
      ? formatCompactNumber(app.ratingsCount)
      : "N/A";
  const formattedReviewsCount =
    typeof app.reviewsCount === "number"
      ? formatCompactNumber(app.reviewsCount)
      : "N/A";
  const ratingValue =
    typeof app.rating === "number"
      ? formattedRatingsCount !== "N/A"
        ? `${app.rating.toFixed(1)} (${formattedRatingsCount})`
        : app.rating.toFixed(1)
      : "N/A";
  const metaItems = [
    app.installsLabel
      ? { label: "Installs", value: app.installsLabel }
      : null,
    { label: "Rating", value: ratingValue },
    { label: "Reviews", value: formattedReviewsCount },
    app.developer
      ? {
          label: "Developer",
          value: app.developer,
          valueClassName: "break-words line-clamp-3 text-pretty",
        }
      : null,
  ].filter(
    (
      item,
    ): item is { label: string; value: string; valueClassName?: string } =>
      item !== null,
  );

  return (
    <section className="rounded-xl border border-line bg-muted/40 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          {app.icon ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-background">
              <Image
                src={app.icon}
                alt={`${app.title} app icon`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="min-w-0">
            <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              {app.title}
            </h2>
            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
              {app.appId}
            </p>

            {app.summary ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {app.summary}
              </p>
            ) : null}
          </div>
        </div>

        <div className="shrink-0">
          <Button asChild className="w-full gap-2 sm:w-auto">
            <a
              href={app.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${app.title} on Play Store`}
            >
              <Image
                src="/icons/google-play-2022.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
                aria-hidden="true"
              />
              Google Play
            </a>
          </Button>
        </div>
      </div>

      <dl
        className={`mt-5 grid grid-cols-2 gap-3 ${getMetaGridClass(
          metaItems.length,
        )}`}
      >
        {metaItems.map((item) => (
          <MetaItem
            key={item.label}
            label={item.label}
            value={item.value}
            {...(item.valueClassName
              ? { valueClassName: item.valueClassName }
              : {})}
          />
        ))}
      </dl>
    </section>
  );
}

function MetaItem({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-background px-4 py-3">
      <dt className="text-[11px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={`mt-2 text-sm leading-relaxed font-medium text-foreground ${
          valueClassName ?? ""
        }`}
        title={value}
      >
        {value}
      </dd>
    </div>
  );
}

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getMetaGridClass(itemCount: number): string {
  if (itemCount <= 2) return "sm:grid-cols-2";
  if (itemCount === 3) return "sm:grid-cols-3";
  return "sm:grid-cols-4";
}