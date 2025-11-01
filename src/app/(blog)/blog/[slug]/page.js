import { notFound } from "next/navigation";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSortedPostsData } from "@/lib/blog";
import { loadPostBySlug } from "@/features/blog/lib/mdx";

function getOrdinal(n) {
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

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${getOrdinal(day)} ${year}`;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  try {
    const { frontmatter } = await loadPostBySlug(resolvedParams.slug);
    return {
      title: `${frontmatter.title} | Code Alchemy Blog`,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        images: [frontmatter.coverImage || "/images/blog-default.jpg"],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found | Code Alchemy Blog",
      description: "The requested blog post could not be found",
    };
  }
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  let compiled;
  try {
    compiled = await loadPostBySlug(resolvedParams.slug);
  } catch (error) {
    return notFound();
  }
  const { content, frontmatter } = compiled;
  const formattedDate = formatDate(frontmatter.date);

  return (
    <>
      <Navbar />
      <main className="bg-neutral-950 min-h-screen pt-10">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-16 sm:pt-24">
          {/* Header */}
          <header className="mb-8">
            <div className="text-sm text-slate-400 mb-2 ">{formattedDate} • {frontmatter.readTime || "5 min read"}</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-4 mt-4 leading-[1.2]">{frontmatter.title}</h1>
            {frontmatter.description && (
              <p className="text-base sm:text-base md:text-lg lg:text-lg text-slate-300 mb-6">{frontmatter.description}</p>
            )}
            {frontmatter.author && (
              <div className="flex items-center">
                {frontmatter.authorImage && (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image src={frontmatter.authorImage} alt={frontmatter.author} width={40} height={40} className="object-cover" />
                  </div>
                )}
                <div className="text-slate-300">{frontmatter.author}</div>
              </div>
            )}
          </header>

          {frontmatter.coverImage && (
            <div className="relative w-full mb-10 rounded-lg overflow-hidden">
              <Image src={frontmatter.coverImage} alt={frontmatter.title} width={1200} height={675} className="object-cover w-full h-auto rounded-lg" priority />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg md:prose-xl prose-invert prose-code:text-cyan-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-pre:p-4 prose-pre:rounded-lg prose-code:before:content-none prose-code:after:content-none mx-auto">
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
