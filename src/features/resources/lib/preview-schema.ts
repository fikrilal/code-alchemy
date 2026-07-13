import { z } from "zod";

export const ResourcePreviewManifestEntrySchema = z.object({
  id: z.string().min(1),
  sourceUrl: z.string().url(),
  file: z.string().min(1),
  capturedAt: z.string().min(1),
  ok: z.boolean(),
  error: z.string().optional(),
});

export const ResourcePreviewManifestSchema = z.array(
  ResourcePreviewManifestEntrySchema,
);

export type ResourcePreviewManifestEntry = z.infer<
  typeof ResourcePreviewManifestEntrySchema
>;
