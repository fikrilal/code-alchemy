import { z } from "zod";

import { RESOURCE_CATEGORY_IDS } from "@/features/resources/types";

const isoDateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "addedAt must be an ISO date (YYYY-MM-DD)");

const httpsUrl = z
  .string()
  .url("url must be a valid URL")
  .refine((value) => value.startsWith("https://"), {
    message: "url must use https",
  });

export const ResourceCategoryIdSchema = z.enum(RESOURCE_CATEGORY_IDS);

export const ResourceEntrySchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be kebab-case"),
  title: z.string().trim().min(1, "title is required"),
  url: httpsUrl,
  description: z.string().trim().min(1, "description is required"),
  category: ResourceCategoryIdSchema,
  tags: z.array(z.string().trim().min(1)).optional(),
  addedAt: isoDateString,
  featured: z.boolean().optional(),
});

export const ResourceCatalogSchema = z
  .array(ResourceEntrySchema)
  .superRefine((entries, ctx) => {
    const seenIds = new Set<string>();
    const seenUrls = new Set<string>();

    for (const [index, entry] of entries.entries()) {
      if (seenIds.has(entry.id)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate resource id: ${entry.id}`,
          path: [index, "id"],
        });
      } else {
        seenIds.add(entry.id);
      }

      const normalizedUrl = entry.url.replace(/\/$/, "");
      if (seenUrls.has(normalizedUrl)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate resource url: ${entry.url}`,
          path: [index, "url"],
        });
      } else {
        seenUrls.add(normalizedUrl);
      }
    }
  });

export type ResourceEntryInput = z.input<typeof ResourceEntrySchema>;
