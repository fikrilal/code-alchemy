import { notFound } from "next/navigation";

import BlogPostPage from "@/features/blog/components/BlogPostPage";
import { loadPostBySlug } from "@/features/blog/lib/mdx";
import { getSortedPostsData } from "@/features/blog/lib/posts";

import type { Metadata } from "next";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = await loadPostBySlug(slug);
    return {
      title: `${frontmatter.title} | Blog`,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        images: [frontmatter.coverImage || "/images/blog-default.jpg"],
      },
    } satisfies Metadata;
  } catch {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    } satisfies Metadata;
  }
}

async function loadBlogPost(slug: string) {
  try {
    return await loadPostBySlug(slug);
  } catch {
    notFound();
  }
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, frontmatter } = await loadBlogPost(slug);

  return (
    <BlogPostPage slug={slug} frontmatter={frontmatter} content={content} />
  );
}