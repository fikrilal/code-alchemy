import { notFound } from "next/navigation";

import PlayStoreCard from "@/features/work/components/PlayStoreCard";
import WorkGallery from "@/features/work/components/WorkGallery";
import { getWorkSlugs, loadWorkBySlug } from "@/features/work/lib/mdx";
import { getPlayStoreAppPublicInfo } from "@/lib/playstore";

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
  const playStoreAppInfo = frontmatter.playStoreUrl
    ? await getPlayStoreAppPublicInfo({
        playStoreUrl: frontmatter.playStoreUrl,
        ...(frontmatter.playStoreAppId
          ? { playStoreAppId: frontmatter.playStoreAppId }
          : {}),
      })
    : null;

  return (
    <main className="bg-neutral-950 min-h-screen pt-10">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-50">
            {frontmatter.title}
          </h1>
          {frontmatter.shortDescription && (
            <p className="text-slate-300 mt-3">{frontmatter.shortDescription}</p>
          )}
        </header>
        <div className="space-y-8">
          {playStoreAppInfo && <PlayStoreCard app={playStoreAppInfo} />}
          <WorkGallery
            slug={slug}
            title={frontmatter.title}
            thumbnail={frontmatter.thumbnail ?? undefined}
          />
        </div>
        <div className="prose prose-invert max-w-none [&>h1:first-of-type]:hidden">
          {content}
        </div>
        {Array.isArray(frontmatter.techStack) &&
          frontmatter.techStack.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Tech Stack
              </h2>
              <ul className="flex flex-wrap gap-2">
                {frontmatter.techStack.map((tech, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}
      </article>
    </main>
  );
}
