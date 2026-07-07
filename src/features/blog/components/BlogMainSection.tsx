import { PageShell } from "@/components/layout/page-shell";
import { Panel, PanelHeader } from "@/components/ui/panel";
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
    <PageShell>
      <Panel>
        <PanelHeader>
          <h1 className="text-3xl font-medium tracking-tight text-balance text-foreground">
            {heading}
          </h1>
        </PanelHeader>

        <p className="px-4 pb-4 text-base text-balance text-muted-foreground">
          {description}
        </p>

        <div className="screen-line-top relative py-4">
          <PostList posts={posts} />
        </div>
      </Panel>
    </PageShell>
  );
}