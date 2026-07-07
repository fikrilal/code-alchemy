import { PostList } from "@/features/blog/components/post-list";
import type { BlogSummary } from "@/features/blog/types";

type BlogMainSectionProps = {
  blogPosts: BlogSummary[];
  heading?: string;
  description?: string;
};

export default function BlogMainSection({
  blogPosts,
  heading = "Blog",
  description = "A place to dump notes from the journey — what worked, what broke, and the small realizations I don't want to forget.",
}: BlogMainSectionProps) {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="mx-auto max-w-screen overflow-x-clip px-2 md:max-w-3xl">
      <div className="border-x border-line py-8">
        <h1 className="screen-line-top screen-line-bottom ml-4 font-medium text-3xl tracking-tight text-balance">
          {heading}
        </h1>

        <p className="p-4 text-base text-balance text-muted-foreground">
          {description}
        </p>

        <div className="screen-line-top relative py-4">
          <PostList posts={posts} />
        </div>
      </div>
    </main>
  );
}