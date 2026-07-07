import { notFound } from "next/navigation";

import WorkCaseStudyPage from "@/features/work/components/WorkCaseStudyPage";
import { getWorkSlugs, loadWorkBySlug } from "@/features/work/lib/mdx";
import { getWorkSummaries } from "@/features/work/lib/summaries";
import { resolveWhiteLabelClients } from "@/features/work/lib/white-label-clients";

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
    };
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
  const whiteLabelClients = frontmatter.whiteLabelClients
    ? await resolveWhiteLabelClients(frontmatter.whiteLabelClients)
    : [];

  return (
    <WorkCaseStudyPage
      slug={slug}
      frontmatter={frontmatter}
      content={content}
      workSummaries={workSummaries}
      whiteLabelClients={whiteLabelClients}
    />
  );
}