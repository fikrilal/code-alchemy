import { getPostData, getSortedPostsData } from "@/lib/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostClient from "./components/BlogPostClient";

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
  // Need to await params before using it
  const resolvedParams = await params;

  try {
    const post = await getPostData(resolvedParams.slug);

    return {
      title: `${post.title} | Code Alchemy Blog`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: [post.coverImage || "/images/blog-default.jpg"],
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
  // Need to await params before using it
  const resolvedParams = await params;

  let post;
  try {
    post = await getPostData(resolvedParams.slug);
  } catch (error) {
    return notFound();
  }

  const formattedDate = formatDate(post.date);

  return (
    <>
      <Navbar />
      <BlogPostClient post={post} formattedDate={formattedDate} />
      <Footer />
    </>
  );
}
