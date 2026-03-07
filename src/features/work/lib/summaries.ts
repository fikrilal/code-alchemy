import "server-only";

import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { getWorkSlugs } from "@/features/work/lib/mdx";

import type { WorkFrontmatter, WorkSummary } from "@/features/work/types";

type SummaryInternal = WorkSummary & {
  hidden?: boolean;
  sortDate?: number;
  sortOrder: number;
};

export async function getWorkSummaries(): Promise<WorkSummary[]> {
  const slugs = getWorkSlugs();
  const contentDir = path.join(process.cwd(), "src/content/work");

  const summaryResults = await Promise.allSettled(
    slugs.map<Promise<SummaryInternal>>(async (slug, index) => {
      const mdxPath = path.join(contentDir, `${slug}.mdx`);
      const mdPath = path.join(contentDir, `${slug}.md`);
      const filePath = fs.existsSync(mdxPath)
        ? mdxPath
        : fs.existsSync(mdPath)
          ? mdPath
          : null;

      if (!filePath) {
        throw new Error(`Work file missing for slug ${slug}`);
      }

      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const fm = data as Partial<WorkFrontmatter>;

      if (!fm.title) {
        throw new Error(`Missing title for slug ${slug}`);
      }

      const parsedDate =
        typeof fm.date === "string" && !Number.isNaN(Date.parse(fm.date))
          ? Date.parse(fm.date)
          : undefined;

      return {
        slug,
        title: fm.title,
        shortDescription: fm.shortDescription ?? "",
        thumbnail: fm.thumbnail ?? "/images/og-image.png",
        category: deriveCategory(fm as WorkFrontmatter),
        hidden: fm.hidden === true,
        ...(typeof parsedDate === "number" ? { sortDate: parsedDate } : {}),
        sortOrder: index,
      };
    })
  );

  return summaryResults
    .filter(
      (result): result is PromiseFulfilledResult<SummaryInternal> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value)
    .sort((a, b) => {
      if (a.sortDate && b.sortDate) return b.sortDate - a.sortDate;
      if (a.sortDate && !b.sortDate) return -1;
      if (!a.sortDate && b.sortDate) return 1;
      return a.sortOrder - b.sortOrder;
    })
    .filter((summary) => !summary.hidden)
    .map((summary) => ({
      slug: summary.slug,
      title: summary.title,
      shortDescription: summary.shortDescription,
      thumbnail: summary.thumbnail,
      category: summary.category ?? "Case Study",
    }));
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
