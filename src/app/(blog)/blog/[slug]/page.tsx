import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { loadPostBySlug } from "@/features/blog/lib/mdx";
import { getSortedPostsData } from "@/lib/blog";

import type { BlogSummary } from "@/features/blog/types";
import type { Metadata } from "next";

function getOrdinal(n: number) {
  if (n > 3 && n < 21) return n + "th";
  switch (n % 10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
    default:
      return n + "th";
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${getOrdinal(day)} ${year}`;
}

// Generate static params for all blog posts
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getSortedPostsData() as BlogSummary[];
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await loadPostBySlug(slug);
    return {
      title: `${frontmatter.title} | Code Alchemy Blog`,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        images: [frontmatter.coverImage || "/images/blog-default.jpg"],
      },
    } satisfies Metadata;
  } catch (error) {
    return {
      title: "Blog Post Not Found | Code Alchemy Blog",
      description: "The requested blog post could not be found",
    } satisfies Metadata;
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let compiled;
  try {
    compiled = await loadPostBySlug(slug);
  } catch (error) {
    return notFound();
  }
  const { content, frontmatter } = compiled;
  const formattedDate = formatDate(frontmatter.date);

  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 min-h-screen pt-10">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-16 sm:pt-24">
          {/* Header */}
          <header className="mb-8">
            <div className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
              <span>{formattedDate}</span>
              <span className="opacity-50">•</span>
              <span>{frontmatter.readTime || "5 min read"}</span>
            </div>
            <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight text-slate-100 leading-tight">
              {frontmatter.title}
            </h1>
            {frontmatter.description && (
              <p className="text-base md:text-lg text-slate-300 leading-relaxed mt-3">{frontmatter.description}</p>
            )}
            {frontmatter.author && (
              <div className="flex items-center mt-6 gap-3">
                {frontmatter.authorImage && (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-800">
                    <Image
                      src={frontmatter.authorImage}
                      alt={frontmatter.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-sm text-slate-300">
                  <p className="font-medium tracking-tight">{frontmatter.author}</p>
                  <p className="text-slate-400">{formattedDate}</p>
                </div>
              </div>
            )}
          </header>

          {frontmatter.coverImage && (
            <div className="w-full mb-10 rounded-2xl overflow-hidden border border-slate-900/40 bg-black/20">
              {/* Use native img for natural aspect ratio; next/image was forcing 16:9 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-headings:text-slate-100 prose-headings:tracking-tight prose-headings:font-semibold prose-p:text-slate-200 prose-li:text-slate-200 prose-p:leading-relaxed prose-strong:text-slate-100 prose-em:text-slate-200 prose-blockquote:border-l-slate-700 prose-blockquote:text-slate-300 prose-code:text-cyan-300 prose-pre:bg-slate-900/70 prose-pre:border prose-pre:border-slate-800 prose-pre:p-4 prose-pre:rounded-xl prose-code:before:content-none prose-code:after:content-none max-w-none [&>h1:first-of-type]:hidden">
            {content}
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
