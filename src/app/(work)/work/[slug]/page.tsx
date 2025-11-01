import Image from "next/image";

import { getWorkSlugs, loadWorkBySlug, type WorkFrontmatter } from "@/features/work/lib/mdx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import WorkCaseStudyClient from "./components/WorkCaseStudyClient";

import type { Metadata } from "next";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const mdxSlugs = getWorkSlugs();
  return mdxSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function WorkCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Try MDX first
  try {
    const { content, frontmatter } = await loadWorkBySlug(slug);
    return (
      <>
        <Navbar />
        <main className="bg-neutral-950 min-h-screen pt-10">
          <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-100">{frontmatter.title}</h1>
              {frontmatter.shortDescription && (
                <p className="text-slate-400 mt-3">{frontmatter.shortDescription}</p>
              )}
            </header>
            {frontmatter.thumbnail && (
              <div className="relative w-full mb-10 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image src={frontmatter.thumbnail} alt={frontmatter.title} fill className="object-cover" />
              </div>
            )}
            <div className="prose prose-invert max-w-3xl">{content}</div>
          </article>
        </main>
        <Footer />
      </>
    );
  } catch {
    // If MDX not found, let Next.js render 404
    return (
      <>
        <Navbar />
        <main className="bg-neutral-950 min-h-screen pt-10">
          <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-slate-300">
            <h1 className="text-3xl font-semibold mb-2">Case Study Not Found</h1>
            <p className="text-slate-400">This case study is not available yet.</p>
          </article>
        </main>
        <Footer />
      </>
    );
  }
}
