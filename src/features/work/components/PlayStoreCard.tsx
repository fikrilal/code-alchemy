import Image from "next/image";

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
      item
    ): item is { label: string; value: string; valueClassName?: string } =>
      item !== null
  );

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          {app.icon && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
              <Image
                src={app.icon}
                alt={`${app.title} app icon`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          )}

          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              {app.title}
            </h2>
            <p className="mt-1 break-all font-mono text-xs text-slate-400">
              {app.appId}
            </p>

            {app.summary && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {app.summary}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <a
            href={app.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${app.title} on Play Store`}
            title={`Open ${app.title} on Play Store`}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto"
          >
            <Image
              src="/icons/google-play-2022.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden="true"
            />
            <span>Google Play</span>
          </a>
        </div>
      </div>

      <dl
        className={`mt-5 grid grid-cols-2 gap-3 ${getMetaGridClass(
          metaItems.length
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
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </dt>
      <dd
        className={`mt-2 text-sm font-medium leading-relaxed text-slate-100 ${
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
