import { notFound } from "next/navigation";

import WorkCaseStudyPage from "@/features/work/components/WorkCaseStudyPage";
import { getWorkSlugs, loadWorkBySlug } from "@/features/work/lib/mdx";
import { getWorkSummaries } from "@/features/work/lib/summaries";
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

async function loadWorkCaseStudy(slug: string) {
  try {
    return await loadWorkBySlug(slug);
  } catch {
    notFound();
  }
}

export default async function WorkCaseStudyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ content, frontmatter }, workSummaries] = await Promise.all([
    loadWorkCaseStudy(slug),
    getWorkSummaries(),
  ]);

  const playStoreApps = resolvePlayStoreApps(frontmatter);
  const playStoreAppInfos = (
    await Promise.all(
      playStoreApps.map((app) =>
        getPlayStoreAppPublicInfo({
          playStoreUrl: app.playStoreUrl,
          ...(app.playStoreAppId ? { playStoreAppId: app.playStoreAppId } : {}),
        }),
      ),
    )
  ).filter((app): app is PlayStoreAppPublicInfo => app !== null);

  return (
    <WorkCaseStudyPage
      slug={slug}
      frontmatter={frontmatter}
      content={content}
      workSummaries={workSummaries}
      playStoreAppInfos={playStoreAppInfos}
    />
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
        app.playStoreAppId === frontmatter.playStoreAppId),
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