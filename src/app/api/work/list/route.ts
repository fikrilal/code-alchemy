import { NextResponse } from "next/server";

import { getWorkSlugs, loadWorkBySlug, type WorkFrontmatter } from "@/features/work/lib/mdx";

export const runtime = "nodejs";

export async function GET() {
  const slugs = getWorkSlugs();
  const items: Array<{ slug: string; title: string; shortDescription: string; thumbnail: string }> = [];
  const errors: Array<{ slug: string; error: string }> = [];
  for (const slug of slugs) {
    try {
      const { frontmatter } = await loadWorkBySlug(slug);
      const fm = frontmatter as WorkFrontmatter;
      items.push({
        slug,
        title: fm.title,
        shortDescription: fm.shortDescription ?? "",
        thumbnail: fm.thumbnail ?? "/images/og-image.png",
      });
    } catch (e) {
      errors.push({ slug, error: e instanceof Error ? e.message : String(e) });
    }
  }
  const res = NextResponse.json(items, { status: 200 });
  if (errors.length) {
    res.headers.set("x-work-errors", String(errors.length));
    // Optionally log for dev visibility
    // console.warn("/api/work/list errors:", errors);
  }
  return res;
}
