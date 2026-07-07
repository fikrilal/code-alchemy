import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import type { BlogSummary } from "@/features/blog/types";
import { cn } from "@/lib/utils";

import type { ImageProps } from "next/image";

type HeadingTypes = "h2" | "h3" | "h4";

type PostItemProps = {
  post: BlogSummary;
  headingAs?: HeadingTypes;
  imageLoading?: ImageProps["loading"];
  className?: string;
};

function getCoverImage(post: BlogSummary) {
  return post.coverImage ?? `/images/blog/${post.slug}.jpg`;
}

export function PostItem({
  post,
  headingAs = "h2",
  imageLoading = "lazy",
  className,
}: PostItemProps) {
  const Heading = headingAs;
  const coverImage = getCoverImage(post);

  return (
    <div
      className={cn(
        "group/post relative flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent/30",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl select-none">
        <Image
          alt={post.title}
          className="size-full object-cover grayscale transition-[filter] duration-300 ease-out group-hover/post:grayscale-0"
          height={630}
          loading={imageLoading}
          src={coverImage}
          width={1200}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-foreground/10 ring-inset" />
      </div>

      <div className="flex flex-col gap-1 p-2">
        <Heading className="text-lg leading-snug font-medium text-balance">
          <Link href={`/blog/${post.slug}`}>
            <span aria-hidden className="absolute inset-0" />
            {post.title}
          </Link>
        </Heading>

        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={new Date(post.date).toISOString()}>
              {format(new Date(post.date), "dd.MM.yyyy")}
            </time>
          </dd>
        </dl>
      </div>
    </div>
  );
}