import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
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
    <Panel>
        <PanelHeader>
          <PanelTitle>{heading}</PanelTitle>
        </PanelHeader>

        <p className="px-4 pb-4 text-base text-balance text-muted-foreground">
          {description}
        </p>

        <div className="screen-line-top relative py-4">
          <PostList posts={posts} />
        </div>

        {showCta ? (
          <div className="screen-line-top flex justify-center py-2">
            <Button asChild className="gap-2 pr-2.5 pl-3" variant="secondary">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        ) : null}
    </Panel>
  );
}