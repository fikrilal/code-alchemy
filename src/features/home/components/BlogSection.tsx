import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PostList } from "@/features/blog/components/post-list";
import type { BlogSummary } from "@/features/blog/types";

type BlogSectionProps = {
  blogPosts?: BlogSummary[];
  heading?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  limit?: number;
};

export default function BlogSection({
  blogPosts = [],
  heading = "Blog",
  description = "A place to dump notes from the journey — what worked, what broke, and the small realizations I don't want to forget.",
  ctaHref = "/blog",
  ctaLabel = "All posts",
  limit = 6,
}: BlogSectionProps) {
  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
  const showCta = Boolean(ctaHref && ctaLabel);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-screen overflow-x-clip px-2 md:max-w-3xl">
      <div className="border-x border-line py-8">
        <h2 className="screen-line-top screen-line-bottom ml-4 font-medium text-3xl tracking-tight text-balance">
          {heading}
        </h2>

        <p className="p-4 text-base text-balance text-muted-foreground">
          {description}
        </p>

        <div className="screen-line-top relative py-4">
          <PostList posts={posts} />
        </div>

        {showCta ? (
          <div className="screen-line-top screen-line-bottom flex justify-center py-2">
            <Button asChild className="gap-2 pr-2.5 pl-3" variant="secondary">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}