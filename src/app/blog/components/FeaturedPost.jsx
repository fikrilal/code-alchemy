// components/blog/FeaturedPost.jsx
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default function FeaturedPost({ posts }) {
  const featuredPost = posts.find((post) => post.highlight);

  if (!featuredPost) return null;

  return (
    <article className="mb-16">
      <Link
        href={`/blog/${featuredPost.slug}`}
        className="block hover:opacity-80 transition-opacity"
      >
        <div className="relative h-96 mb-6">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="border-b pb-6">
          <div className="flex items-center text-sm text-slate-600 mb-4">
            <span>{format(new Date(featuredPost.date), "MMM dd yyyy")}</span>
            <span className="mx-2">•</span>
            <span className="font-medium">{featuredPost.author}</span>
            {featuredPost.role && (
              <>
                <span className="mx-2">•</span>
                <span>{featuredPost.role}</span>
              </>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
          <p className="text-slate-600 text-lg">{featuredPost.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
