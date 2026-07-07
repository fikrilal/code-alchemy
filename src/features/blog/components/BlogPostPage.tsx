import { format } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Panel, PanelContent } from "@/components/ui/panel";
import { findNeighbourPosts } from "@/features/blog/lib/posts";
import type { BlogFrontmatter } from "@/features/blog/types";

import type { ReactElement } from "react";

type BlogPostPageProps = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: ReactElement;
};

function PostNavButton({
  href,
  label,
  direction,
}: {
  href: string;
  label: string;
  direction: "previous" | "next";
}) {
  const Icon = direction === "previous" ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <Button
      className="size-7 border-none"
      variant="secondary"
      size="icon-sm"
      asChild
    >
      <Link href={href} aria-label={label}>
        <Icon />
      </Link>
    </Button>
  );
}

function getCoverImage(slug: string, coverImage?: string) {
  return coverImage ?? `/images/blog/${slug}.jpg`;
}

export default function BlogPostPage({
  slug,
  frontmatter,
  content,
}: BlogPostPageProps) {
  const { previous, next } = findNeighbourPosts(slug);
  const coverImage = getCoverImage(slug, frontmatter.coverImage);
  const publishedAt = format(new Date(frontmatter.date), "dd.MM.yyyy");

  return (
    <PageShell>
      <Panel>
        <div className="flex items-center justify-between p-2 pl-4">
          <Button
            className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline"
            variant="link"
            size="sm"
            asChild
          >
            <Link href="/blog">
              <ArrowLeftIcon />
              Blog
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {previous ? (
              <PostNavButton
                href={`/blog/${previous.slug}`}
                label="Previous post"
                direction="previous"
              />
            ) : null}
            {next ? (
              <PostNavButton
                href={`/blog/${next.slug}`}
                label="Next post"
                direction="next"
              />
            ) : null}
          </div>
        </div>

        <div className="screen-line-top screen-line-bottom py-px">
          <div className="h-4" />
        </div>

        <header className="screen-line-bottom px-4">
          <h1 className="text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
            {frontmatter.title}
          </h1>
        </header>

        <PanelContent className="space-y-8 pt-8">
          {frontmatter.description ? (
            <p className="text-base text-balance text-muted-foreground">
              {frontmatter.description}
            </p>
          ) : null}

          <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd>
                <time dateTime={new Date(frontmatter.date).toISOString()}>
                  {publishedAt}
                </time>
              </dd>
            </div>
            {frontmatter.readTime ? (
              <>
                <dd aria-hidden className="text-muted-foreground/50">
                  •
                </dd>
                <div>
                  <dt className="sr-only">Reading time</dt>
                  <dd>{frontmatter.readTime}</dd>
                </div>
              </>
            ) : null}
          </dl>

          <div className="relative aspect-video overflow-hidden">
            <Image
              src={coverImage}
              alt={frontmatter.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 ring-inset" />
          </div>

          <div className="prose prose-site prose-neutral dark:prose-invert max-w-none [&>h1:first-of-type]:hidden">
            {content}
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 ? (
            <section>
              <h2 className="sr-only">Tags</h2>
              <ul className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex rounded-md border border-line bg-muted px-2 py-0.5 text-sm text-muted-foreground">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </PanelContent>
      </Panel>
    </PageShell>
  );
}