import { describe, expect, it } from "vitest";

import {
  getResourcesByCategory,
  parseResourceCatalog,
} from "@/features/resources/lib/catalog";
import { ResourceCatalogSchema, ResourceEntrySchema } from "@/features/resources/lib/schema";
import type { ResourceEntry } from "@/features/resources/types";

const validEntry: ResourceEntry = {
  id: "example-tool",
  title: "Example Tool",
  url: "https://example.com/tool",
  description: "A useful tool for engineers.",
  category: "tooling",
  tags: ["dx"],
  addedAt: "2026-07-01",
};

describe("ResourceEntrySchema", () => {
  it("accepts a valid entry", () => {
    expect(ResourceEntrySchema.safeParse(validEntry).success).toBe(true);
  });

  it("rejects an unknown category", () => {
    const result = ResourceEntrySchema.safeParse({
      ...validEntry,
      category: "bookmarks",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-https URL", () => {
    const result = ResourceEntrySchema.safeParse({
      ...validEntry,
      url: "http://example.com/tool",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a blank description", () => {
    const result = ResourceEntrySchema.safeParse({
      ...validEntry,
      description: "   ",
    });
    expect(result.success).toBe(false);
  });
});

describe("ResourceCatalogSchema", () => {
  it("rejects duplicate ids", () => {
    const result = ResourceCatalogSchema.safeParse([
      validEntry,
      { ...validEntry, url: "https://example.com/other" },
    ]);
    expect(result.success).toBe(false);
  });

  it("rejects duplicate urls ignoring trailing slash", () => {
    const result = ResourceCatalogSchema.safeParse([
      validEntry,
      {
        ...validEntry,
        id: "example-tool-2",
        url: "https://example.com/tool/",
      },
    ]);
    expect(result.success).toBe(false);
  });
});

describe("parseResourceCatalog + grouping", () => {
  const catalogInput = [
    {
      id: "alpha",
      title: "Alpha",
      url: "https://example.com/alpha",
      description: "Later tooling item.",
      category: "tooling",
      addedAt: "2026-07-02",
    },
    {
      id: "beta",
      title: "Beta",
      url: "https://example.com/beta",
      description: "Featured tooling item.",
      category: "tooling",
      addedAt: "2026-07-01",
      featured: true,
    },
    {
      id: "gamma",
      title: "Gamma",
      url: "https://example.com/gamma",
      description: "Motion item.",
      category: "motion",
      addedAt: "2026-07-03",
    },
  ] satisfies ResourceEntry[];

  it("sorts featured entries above non-featured within a category", () => {
    const catalog = parseResourceCatalog(catalogInput);
    const tooling = getResourcesByCategory(catalog).find(
      (group) => group.id === "tooling",
    );

    expect(tooling?.items.map((item) => item.id)).toEqual(["beta", "alpha"]);
  });

  it("preserves fixed category order and omits empty categories", () => {
    const catalog = parseResourceCatalog(catalogInput);
    const groups = getResourcesByCategory(catalog);

    expect(groups.map((group) => group.id)).toEqual(["motion", "tooling"]);
  });
});
