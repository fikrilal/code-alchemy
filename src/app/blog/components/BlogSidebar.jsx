// components/blog/BlogSidebar.jsx
import Link from "next/link";

export default function BlogSidebar({ posts }) {
  const popularPosts = posts.filter((post) => post.popular);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 h-[calc(100vh-28rem)] overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6">Dotfiles Insider</h1>
        <p className="text-slate-600 mb-8">
          Official Daytona blog offering weekly advice, announcements, news,
          developments and productivity tips for improving your coding skills.
        </p>

        <div className="border-t pt-8">
          <h2 className="text-xl font-bold mb-6">MOST POPULAR POSTS</h2>
          <div className="space-y-6">
            {popularPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block hover:opacity-80 transition-opacity"
              >
                <div className="flex items-start">
                  <span className="text-slate-400 mr-4">{index + 1}.</span>
                  <h3 className="font-medium">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
