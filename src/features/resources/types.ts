export const RESOURCE_CATEGORY_IDS = [
  "ui-components",
  "motion",
  "design-systems",
  "mobile",
  "icons-assets",
  "tooling",
  "ai",
  "infra",
  "inspiration",
] as const;

export type ResourceCategoryId = (typeof RESOURCE_CATEGORY_IDS)[number];

export type ResourceEntry = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: ResourceCategoryId;
  tags?: string[];
  addedAt: string;
  featured?: boolean;
};

export type ResourceCategoryMeta = {
  id: ResourceCategoryId;
  label: string;
  description: string;
};

export type ResourceCategoryGroup = ResourceCategoryMeta & {
  items: ResourceEntry[];
};
