import { PostItem } from "@/features/blog/components/post-item";
import type { BlogSummary } from "@/features/blog/types";
import { cn } from "@/lib/utils";

type PostListProps = {
  posts: BlogSummary[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2"
      >
        <div className="border-r border-line" />
        <div className="border-l border-line" />
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className={cn(
              "max-sm:screen-line-top max-sm:screen-line-bottom",
              "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
            )}
          >
            <PostItem
              headingAs="h3"
              imageLoading={index <= 3 ? "eager" : "lazy"}
              post={post}
            />
          </li>
        ))}

        {posts.length === 0 ? (
          <li className="screen-line-top screen-line-bottom p-4">
            <p className="font-mono text-sm text-muted-foreground">
              No posts published yet. Check back soon.
            </p>
          </li>
        ) : null}
      </ul>
    </div>
  );
}