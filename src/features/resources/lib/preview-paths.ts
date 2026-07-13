/** Shared path helpers for resource preview images (script + runtime). */

export const RESOURCE_PREVIEWS_PUBLIC_DIR = "public/images/resources";
export const RESOURCE_PREVIEWS_PUBLIC_PREFIX = "/images/resources";
export const RESOURCE_PREVIEW_EXTENSION = ".jpg";
export const RESOURCE_PREVIEWS_MANIFEST_PATH =
  "src/content/resources/previews-manifest.json";

export function resourcePreviewFilename(id: string): string {
  return `${id}${RESOURCE_PREVIEW_EXTENSION}`;
}

export function resourcePreviewPublicSrc(id: string): string {
  return `${RESOURCE_PREVIEWS_PUBLIC_PREFIX}/${resourcePreviewFilename(id)}`;
}
