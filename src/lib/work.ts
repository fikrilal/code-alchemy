import { getWorkSlugs, loadWorkBySlug, type WorkFrontmatter } from "@/features/work/lib/mdx";

export type WorkSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
};

export async function getWorkSummaries(): Promise<WorkSummary[]> {
  const slugs = getWorkSlugs();
  const summaries: WorkSummary[] = [];

  for (const slug of slugs) {
    try {
      const { frontmatter } = await loadWorkBySlug(slug);
      const fm = frontmatter as WorkFrontmatter & { shortDescription?: string; thumbnail?: string };
      summaries.push({
        slug,
        title: fm.title,
        shortDescription: fm.shortDescription ?? "",
        thumbnail: fm.thumbnail ?? "/images/og-image.png",
      });
    } catch {
      // Skip entries that fail to load; api route retains separate logging
    }
  }

  return summaries;
}
