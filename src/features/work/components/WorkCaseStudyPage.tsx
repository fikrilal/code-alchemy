import { format } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Panel, PanelContent } from "@/components/ui/panel";
import PlayStoreCard from "@/features/work/components/PlayStoreCard";
import WorkGallery from "@/features/work/components/WorkGallery";
import { findNeighbourWork } from "@/features/work/lib/summaries";
import type { WorkFrontmatter, WorkSummary } from "@/features/work/types";
import type { PlayStoreAppPublicInfo } from "@/lib/playstore";

import type { ReactElement } from "react";

type WorkCaseStudyPageProps = {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: ReactElement;
  workSummaries: WorkSummary[];
  playStoreAppInfos: PlayStoreAppPublicInfo[];
};

function CaseStudyNavButton({
  href,
  label,
  direction,
}: {
  href: string;
  label: string;
  direction: "previous" | "next";
}) {
  const Icon = direction === "previous" ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <Button
      className="size-7 border-none"
      variant="secondary"
      size="icon-sm"
      asChild
    >
      <Link href={href} aria-label={label}>
        <Icon />
      </Link>
    </Button>
  );
}

export default function WorkCaseStudyPage({
  slug,
  frontmatter,
  content,
  workSummaries,
  playStoreAppInfos,
}: WorkCaseStudyPageProps) {
  const { previous, next } = findNeighbourWork(workSummaries, slug);
  const publishedAt =
    typeof frontmatter.date === "string"
      ? format(new Date(frontmatter.date), "dd.MM.yyyy")
      : null;

  return (
    <PageShell>
      <Panel>
        <div className="flex items-center justify-between p-2 pl-4">
          <Button
            className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline"
            variant="link"
            size="sm"
            asChild
          >
            <Link href="/work">
              <ArrowLeftIcon />
              Work
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {previous ? (
              <CaseStudyNavButton
                href={`/work/${previous.slug}`}
                label="Previous case study"
                direction="previous"
              />
            ) : null}
            {next ? (
              <CaseStudyNavButton
                href={`/work/${next.slug}`}
                label="Next case study"
                direction="next"
              />
            ) : null}
          </div>
        </div>

        <div className="screen-line-top screen-line-bottom py-px">
          <div className="h-4" />
        </div>

        <header className="screen-line-bottom px-4">
          <h1 className="text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
            {frontmatter.title}
          </h1>
        </header>

        <PanelContent className="space-y-8 pt-8">
          {frontmatter.shortDescription ? (
            <p className="text-base text-balance text-muted-foreground">
              {frontmatter.shortDescription}
            </p>
          ) : null}

          {publishedAt ? (
            <dl className="text-sm text-muted-foreground">
              <dt className="sr-only">Published on</dt>
              <dd>
                <time
                  dateTime={new Date(frontmatter.date as string).toISOString()}
                >
                  {publishedAt}
                </time>
              </dd>
            </dl>
          ) : null}

          {playStoreAppInfos.length > 0 ? (
            <section className="space-y-4">
              {playStoreAppInfos.length > 1 ? (
                <h2 className="text-lg font-medium tracking-tight text-foreground">
                  Live Apps
                </h2>
              ) : null}
              <div className="space-y-4">
                {playStoreAppInfos.map((app) => (
                  <PlayStoreCard key={app.appId} app={app} />
                ))}
              </div>
            </section>
          ) : null}

          <WorkGallery
            slug={slug}
            title={frontmatter.title}
            {...(frontmatter.thumbnail ? { thumbnail: frontmatter.thumbnail } : {})}
            {...(frontmatter.images ? { images: frontmatter.images } : {})}
          />

          <div className="prose prose-site prose-neutral dark:prose-invert max-w-none [&>h1:first-of-type]:hidden">
            {content}
          </div>

          {Array.isArray(frontmatter.techStack) &&
          frontmatter.techStack.length > 0 ? (
            <section>
              <h2 className="mb-3 text-2xl font-medium tracking-tight text-foreground">
                Tech Stack
              </h2>
              <ul className="flex flex-wrap gap-2">
                {frontmatter.techStack.map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex rounded-md border border-line bg-muted px-2 py-0.5 text-sm text-muted-foreground">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </PanelContent>
      </Panel>
    </PageShell>
  );
}