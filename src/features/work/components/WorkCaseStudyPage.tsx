import { format } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Panel, PanelContent } from "@/components/ui/panel";
import { WhiteLabelClients } from "@/features/work/components/white-label-clients";
import WorkGallery from "@/features/work/components/WorkGallery";
import { findNeighbourWork } from "@/features/work/lib/summaries";
import type {
  WhiteLabelClient,
  WorkFrontmatter,
  WorkSummary,
} from "@/features/work/types";

import type { ReactElement } from "react";

type WorkCaseStudyPageProps = {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: ReactElement;
  workSummaries: WorkSummary[];
  whiteLabelClients?: WhiteLabelClient[];
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
  whiteLabelClients = [],
}: WorkCaseStudyPageProps) {
  const { previous, next } = findNeighbourWork(workSummaries, slug);
  const publishedAt =
    typeof frontmatter.date === "string"
      ? format(new Date(frontmatter.date), "dd.MM.yyyy")
      : null;
  const playStoreLinks = getPlayStoreLinks(frontmatter);

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

          {publishedAt || playStoreLinks.length > 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              {publishedAt ? (
                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Published on</dt>
                  <dd>
                    <time
                      dateTime={new Date(
                        frontmatter.date as string,
                      ).toISOString()}
                    >
                      {publishedAt}
                    </time>
                  </dd>
                </dl>
              ) : (
                <span />
              )}

              {playStoreLinks.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {playStoreLinks.map((url) => (
                    <Button
                      key={url}
                      asChild
                      className="gap-2 pr-2.5 pl-3"
                      size="sm"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/icons/google-play-2022.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="size-4"
                          aria-hidden
                        />
                        Google Play
                        <ArrowRightIcon />
                      </a>
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <WorkGallery
            slug={slug}
            title={frontmatter.title}
            {...(frontmatter.thumbnail ? { thumbnail: frontmatter.thumbnail } : {})}
            {...(frontmatter.images ? { images: frontmatter.images } : {})}
          />
        </PanelContent>

        {whiteLabelClients.length > 0 ? (
          <WhiteLabelClients
            clients={whiteLabelClients}
            {...(frontmatter.whiteLabelClientsHeading
              ? { heading: frontmatter.whiteLabelClientsHeading }
              : {})}
            {...(frontmatter.whiteLabelClientsDescription
              ? { description: frontmatter.whiteLabelClientsDescription }
              : {})}
          />
        ) : null}

        <PanelContent className="space-y-8">
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

function getPlayStoreLinks(frontmatter: WorkFrontmatter): string[] {
  if (Array.isArray(frontmatter.playStoreUrls)) {
    return frontmatter.playStoreUrls.filter(
      (url): url is string => typeof url === "string" && url.length > 0,
    );
  }

  if (frontmatter.playStoreUrl) {
    return [frontmatter.playStoreUrl];
  }

  return [];
}