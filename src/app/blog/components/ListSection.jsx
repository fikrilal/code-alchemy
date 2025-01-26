// components/blog/BlogListSection.jsx
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default function BlogListSection({ posts }) {
  const newestPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="mb-16">
      <div className="grid gap-12">
        {newestPosts.map((post) => (
          <div key={post.slug} className="border-b pb-10">
            <Link
              href={`/blog/${post.slug}`}
              className="group hover:opacity-90 transition-opacity"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Image Section - 16:9 ratio */}
                <div className="relative w-full h-0 pb-[56.25%] col-span-1 sm:col-span-1 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Text Content */}
                <div className="sm:col-span-2">
                  <h3 className="text-2xl font-semibold leading-snug mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-base text-slate-600 mb-4">
                    {format(new Date(post.date), "MMM dd yyyy")} · {post.author}
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <span className="text-green-600 font-medium text-sm tracking-wide uppercase">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
