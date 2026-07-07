import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { Panel, PanelContent, PanelHeader } from "@/components/ui/panel";
import PlayStoreCard from "@/features/work/components/PlayStoreCard";
import WorkGallery from "@/features/work/components/WorkGallery";
import { getWorkSlugs, loadWorkBySlug } from "@/features/work/lib/mdx";
import type { WorkPlayStoreApp } from "@/features/work/types";
import { getPlayStoreAppPublicInfo } from "@/lib/playstore";
import type { PlayStoreAppPublicInfo } from "@/lib/playstore";

import type { Metadata } from "next";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const mdxSlugs = getWorkSlugs();
  return mdxSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await loadWorkBySlug(slug);
    return {
      title: `${frontmatter.title} | Case Study`,
      description: frontmatter.shortDescription,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.shortDescription,
        images: [frontmatter.thumbnail || "/images/og-image.png"],
      },
    } satisfies Metadata;
  } catch {
    return {
      title: "Case Study",
      description: undefined,
    } satisfies Metadata;
  }
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let workEntry: Awaited<ReturnType<typeof loadWorkBySlug>>;

  try {
    workEntry = await loadWorkBySlug(slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = workEntry;
  const playStoreApps = resolvePlayStoreApps(frontmatter);
  const playStoreAppInfos = (
    await Promise.all(
      playStoreApps.map((app) =>
        getPlayStoreAppPublicInfo({
          playStoreUrl: app.playStoreUrl,
          ...(app.playStoreAppId ? { playStoreAppId: app.playStoreAppId } : {}),
        })
      )
    )
  ).filter((app): app is PlayStoreAppPublicInfo => app !== null);

  return (
    <PageShell>
      <Panel>
        <PanelHeader>
          <h1 className="text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
            {frontmatter.title}
          </h1>
        </PanelHeader>

        {frontmatter.shortDescription ? (
          <p className="px-4 pb-4 text-base text-balance text-muted-foreground">
            {frontmatter.shortDescription}
          </p>
        ) : null}

        <PanelContent className="space-y-8">
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
            thumbnail={frontmatter.thumbnail ?? undefined}
          />

          <div className="prose prose-neutral dark:prose-invert max-w-none [&>h1:first-of-type]:hidden">
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

function resolvePlayStoreApps(frontmatter: {
  playStoreApps?: WorkPlayStoreApp[];
  playStoreUrl?: string;
  playStoreAppId?: string;
}): WorkPlayStoreApp[] {
  const apps = frontmatter.playStoreApps ?? [];

  if (!frontmatter.playStoreUrl) {
    return apps;
  }

  const hasLegacyAppAlreadyListed = apps.some(
    (app) =>
      app.playStoreUrl === frontmatter.playStoreUrl ||
      (frontmatter.playStoreAppId !== undefined &&
        app.playStoreAppId === frontmatter.playStoreAppId)
  );

  if (hasLegacyAppAlreadyListed) {
    return apps;
  }

  return [
    {
      playStoreUrl: frontmatter.playStoreUrl,
      ...(frontmatter.playStoreAppId
        ? { playStoreAppId: frontmatter.playStoreAppId }
        : {}),
    },
    ...apps,
  ];
}
