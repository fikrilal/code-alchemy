import { NextResponse } from "next/server";

import { getWorkSlugs, loadWorkBySlug, type WorkFrontmatter } from "@/features/work/lib/mdx";

export const runtime = "nodejs";

export async function GET() {
  try {
    const slugs = getWorkSlugs();
    const items = await Promise.all(
      slugs.map(async (slug) => {
        const { frontmatter } = await loadWorkBySlug(slug);
        const fm = frontmatter as WorkFrontmatter;
        return {
          slug,
          title: fm.title,
          shortDescription: fm.shortDescription ?? "",
          thumbnail: fm.thumbnail ?? "/images/og-image.png",
        };
      })
    );
    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to list work items" }, { status: 500 });
  }
}

