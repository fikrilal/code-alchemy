// components/blog/BlogMainSection.jsx
import BlogSidebar from "./BlogSidebar";
import FeaturedPost from "./FeaturedPost";

export default function BlogMainSection({ posts }) {
  return (
    <div className="grid lg:grid-cols-3 gap-12">
      <BlogSidebar posts={posts} />
      <div className="lg:col-span-2">
        <FeaturedPost posts={posts} />
      </div>
    </div>
  );
}
