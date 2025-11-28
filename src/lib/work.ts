import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { getWorkSlugs } from "@/features/work/lib/mdx";

import type { WorkFrontmatter, WorkSummary } from "@/features/work/types";

export type { WorkSummary };

type SummaryInternal = WorkSummary & { hidden?: boolean; sortDate?: number; index: number };

export async function getWorkSummaries(): Promise<WorkSummary[]> {
  const slugs = getWorkSlugs();
  const contentDir = path.join(process.cwd(), "src/content/work");

  const summaryResults = await Promise.allSettled(
    slugs.map<Promise<SummaryInternal>>(async (slug, index) => {
      const mdxPath = path.join(contentDir, `${slug}.mdx`);
      const mdPath = path.join(contentDir, `${slug}.md`);
      const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
      if (!filePath) throw new Error(`Work file missing for slug ${slug}`);

      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const fm = data as Partial<WorkFrontmatter>;
      if (!fm.title) throw new Error(`Missing title for slug ${slug}`);

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
        index,
      };
    })
  );

  return summaryResults
    .filter((r): r is PromiseFulfilledResult<SummaryInternal> => r.status === "fulfilled")
    .map((r) => r.value)
    .sort((a, b) => {
      if (a.sortDate && b.sortDate) return b.sortDate - a.sortDate;
      if (a.sortDate && !b.sortDate) return -1;
      if (!a.sortDate && b.sortDate) return 1;
      return a.index - b.index;
    })
    .filter((summary) => !(summary as { hidden?: boolean }).hidden)
    .map(({ hidden, sortDate, index, ...rest }) => rest);
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
