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
        ...(typeof fm.logo === "string" ? { logo: fm.logo } : {}),
        category: deriveCategory(fm as WorkFrontmatter),
        ...(typeof fm.company === "string" ? { company: fm.company } : {}),
        ...(typeof fm.date === "string" ? { date: fm.date } : {}),
        ...(Array.isArray(fm.techStack) ? { techStack: fm.techStack } : {}),
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
      ...(summary.logo ? { logo: summary.logo } : {}),
      category: summary.category ?? "Case Study",
      ...(summary.company ? { company: summary.company } : {}),
      ...(summary.date ? { date: summary.date } : {}),
      ...(summary.techStack ? { techStack: summary.techStack } : {}),
    }));
}

export function findNeighbourWork(summaries: WorkSummary[], slug: string) {
  const index = summaries.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? summaries[index - 1] : null,
    next: index < summaries.length - 1 ? summaries[index + 1] : null,
  };
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
