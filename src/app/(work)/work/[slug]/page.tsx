import { notFound } from "next/navigation";

import { getWorkSlugs, loadWorkBySlug } from "@/features/work/lib/mdx";
import WorkGallery from "@/features/work/components/WorkGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import WorkCaseStudyClient from "./components/WorkCaseStudyClient";

import type { Metadata } from "next";
import type { WorkFrontmatter } from "@/features/work/types";

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
  // Try MDX first
  try {
    const { content, frontmatter } = await loadWorkBySlug(slug);
    return (
      <>
        <Navbar />
        <main className="bg-neutral-950 min-h-screen pt-10">
          <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-100">
                {frontmatter.title}
              </h1>
              {frontmatter.shortDescription && (
                <p className="text-slate-300 mt-3">
                  {frontmatter.shortDescription}
                </p>
              )}
            </header>
            <WorkGallery
              slug={slug}
              title={frontmatter.title}
              thumbnail={frontmatter.thumbnail ?? undefined}
            />
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
                    {frontmatter.techStack.map((t, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
          </article>
        </main>
        <Footer />
      </>
    );
  } catch {
    return notFound();
  }
}
