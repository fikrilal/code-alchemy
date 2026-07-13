import "server-only";

import fs from "fs";
import path from "path";

import {
  getAllResourceCategoryMeta,
  getResourceCategoryMeta,
  RESOURCE_CATEGORY_ORDER,
} from "@/features/resources/lib/categories";
import { ResourceCatalogSchema } from "@/features/resources/lib/schema";
import type {
  ResourceCategoryGroup,
  ResourceCategoryMeta,
  ResourceEntry,
} from "@/features/resources/types";

const CATALOG_PATH = path.join(
  process.cwd(),
  "src/content/resources/catalog.json",
);

function sortEntries(a: ResourceEntry, b: ResourceEntry): number {
  const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  if (featuredDelta !== 0) return featuredDelta;

  const dateDelta = b.addedAt.localeCompare(a.addedAt);
  if (dateDelta !== 0) return dateDelta;

  return a.title.localeCompare(b.title);
}

function loadCatalogFromDisk(): unknown {
  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error(`Resources catalog missing at ${CATALOG_PATH}`);
  }

  const raw = fs.readFileSync(CATALOG_PATH, "utf8");
  return JSON.parse(raw) as unknown;
}

function toResourceEntry(entry: {
  id: string;
  title: string;
  url: string;
  description: string;
  category: ResourceEntry["category"];
  addedAt: string;
  tags?: string[] | undefined;
  featured?: boolean | undefined;
}): ResourceEntry {
  return {
    id: entry.id,
    title: entry.title,
    url: entry.url,
    description: entry.description,
    category: entry.category,
    addedAt: entry.addedAt,
    ...(entry.tags !== undefined ? { tags: entry.tags } : {}),
    ...(entry.featured !== undefined ? { featured: entry.featured } : {}),
  };
}

export function parseResourceCatalog(data: unknown): ResourceEntry[] {
  const parsed = ResourceCatalogSchema.safeParse(data);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const pathLabel = issue.path.length > 0 ? issue.path.join(".") : "catalog";
        return `${pathLabel}: ${issue.message}`;
      })
      .join("; ");
    throw new Error(`Invalid resources catalog. ${details}`);
  }

  return parsed.data.map(toResourceEntry).sort(sortEntries);
}

export function getResourceCatalog(): ResourceEntry[] {
  return parseResourceCatalog(loadCatalogFromDisk());
}

export function getResourcesByCategory(
  catalog: ResourceEntry[] = getResourceCatalog(),
): ResourceCategoryGroup[] {
  const byCategory = new Map<ResourceEntry["category"], ResourceEntry[]>();

  for (const entry of catalog) {
    const bucket = byCategory.get(entry.category);
    if (bucket) {
      bucket.push(entry);
    } else {
      byCategory.set(entry.category, [entry]);
    }
  }

  return RESOURCE_CATEGORY_ORDER.flatMap((categoryId) => {
    const items = byCategory.get(categoryId);
    if (!items || items.length === 0) return [];

    const meta = getResourceCategoryMeta(categoryId);
    return [
      {
        ...meta,
        items: [...items].sort(sortEntries),
      },
    ];
  });
}

export function getResourceCategoriesInUse(
  catalog: ResourceEntry[] = getResourceCatalog(),
): ResourceCategoryMeta[] {
  const used = new Set(catalog.map((entry) => entry.category));
  return getAllResourceCategoryMeta().filter((meta) => used.has(meta.id));
}

