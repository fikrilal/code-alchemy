import { getWorkSlugs, loadWorkBySlug } from "@/features/work/lib/mdx";

import type { WorkFrontmatter, WorkSummary } from "@/features/work/types";

export type { WorkSummary };

export async function getWorkSummaries(): Promise<WorkSummary[]> {
  const slugs = getWorkSlugs();
  const summaries: WorkSummary[] = [];

  for (const slug of slugs) {
    try {
      const { frontmatter } = await loadWorkBySlug(slug);
      const fm = frontmatter as WorkFrontmatter;
      summaries.push({
        slug,
        title: fm.title,
        shortDescription: fm.shortDescription ?? "",
        thumbnail: fm.thumbnail ?? "/images/og-image.png",
        category: deriveCategory(fm),
      });
    } catch {
      // Skip entries that fail to load; api route retains separate logging
    }
  }

  return summaries;
}

function deriveCategory(fm: WorkFrontmatter): string {
  if (fm.category && fm.category.trim().length > 0) return fm.category;
  const firstStack = Array.isArray(fm.techStack) ? fm.techStack[0] : undefined;
  if (firstStack) {
    const label = firstStack.split("-")[0]?.trim();
    if (label) return label;
  }
  return "Case Study";
}
