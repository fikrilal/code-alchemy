import type {
  ResourceCategoryId,
  ResourceCategoryMeta,
} from "@/features/resources/types";

/** Stable display order for category sections (utility-first, inspiration last). */
export const RESOURCE_CATEGORY_ORDER: readonly ResourceCategoryId[] = [
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

const CATEGORY_META: Record<ResourceCategoryId, Omit<ResourceCategoryMeta, "id">> =
  {
    "ui-components": {
      label: "UI Components",
      description:
        "Component kits, blocks, and production UI packs you can lift into a project.",
    },
    motion: {
      label: "Motion",
      description:
        "Transitions, animation systems, and motion references for web UI.",
    },
    "design-systems": {
      label: "Design Systems",
      description:
        "System kits, tokens, and foundational patterns for consistent product UI.",
    },
    mobile: {
      label: "Mobile",
      description:
        "Flutter and mobile craft — design detail and engineering references.",
    },
    "icons-assets": {
      label: "Icons & Assets",
      description: "Icon libraries and asset collections for product UI.",
    },
    tooling: {
      label: "Tooling & DX",
      description:
        "Linters, editors, scanners, and developer utilities that improve day-to-day work.",
    },
    ai: {
      label: "AI & Agents",
      description: "Agent tooling, sandboxes, and AI-oriented product kits.",
    },
    infra: {
      label: "Infra",
      description: "Hosting, deploy platforms, and niche infrastructure.",
    },
    inspiration: {
      label: "Inspiration",
      description:
        "Strong personal sites and design-engineer portfolios worth studying.",
    },
  };

export function getResourceCategoryMeta(
  id: ResourceCategoryId,
): ResourceCategoryMeta {
  const meta = CATEGORY_META[id];
  return {
    id,
    label: meta.label,
    description: meta.description,
  };
}

export function getAllResourceCategoryMeta(): ResourceCategoryMeta[] {
  return RESOURCE_CATEGORY_ORDER.map(getResourceCategoryMeta);
}

export function getResourceCategorySectionId(id: ResourceCategoryId): string {
  return id;
}
