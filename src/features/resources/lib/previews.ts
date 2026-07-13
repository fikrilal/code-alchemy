import "server-only";

import fs from "fs";
import path from "path";

import {
  RESOURCE_PREVIEWS_MANIFEST_PATH,
  RESOURCE_PREVIEWS_PUBLIC_DIR,
  resourcePreviewFilename,
  resourcePreviewPublicSrc,
} from "@/features/resources/lib/preview-paths";
import {
  ResourcePreviewManifestSchema,
  type ResourcePreviewManifestEntry,
} from "@/features/resources/lib/preview-schema";
import type { ResourceEntry } from "@/features/resources/types";

export type ResolvedResourcePreview = {
  src: string | null;
  hostname: string;
};

function loadManifestFromDisk(): ResourcePreviewManifestEntry[] {
  const manifestPath = path.join(process.cwd(), RESOURCE_PREVIEWS_MANIFEST_PATH);
  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  const raw = fs.readFileSync(manifestPath, "utf8");
  let data: unknown;
  try {
    data = JSON.parse(raw) as unknown;
  } catch {
    throw new Error(`Invalid JSON in resources preview manifest: ${manifestPath}`);
  }

  const parsed = ResourcePreviewManifestSchema.safeParse(data);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const pathLabel =
          issue.path.length > 0 ? issue.path.join(".") : "manifest";
        return `${pathLabel}: ${issue.message}`;
      })
      .join("; ");
    throw new Error(`Invalid resources preview manifest. ${details}`);
  }

  return parsed.data;
}

function getManifestById(): Map<string, ResourcePreviewManifestEntry> {
  const map = new Map<string, ResourcePreviewManifestEntry>();
  for (const entry of loadManifestFromDisk()) {
    map.set(entry.id, entry);
  }
  return map;
}

function previewFileExists(id: string): boolean {
  const filePath = path.join(
    process.cwd(),
    RESOURCE_PREVIEWS_PUBLIC_DIR,
    resourcePreviewFilename(id),
  );
  return fs.existsSync(filePath);
}

export function getResourceHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Resolve a local preview image for a catalog entry.
 * Only returns a src when the manifest marks the capture ok and the file exists.
 */
export function resolveResourcePreview(
  entry: ResourceEntry,
  manifestById: Map<string, ResourcePreviewManifestEntry> = getManifestById(),
): ResolvedResourcePreview {
  const hostname = getResourceHostname(entry.url);
  const record = manifestById.get(entry.id);

  if (!record || !record.ok) {
    return { src: null, hostname };
  }

  if (!previewFileExists(entry.id)) {
    return { src: null, hostname };
  }

  return {
    src: resourcePreviewPublicSrc(entry.id),
    hostname,
  };
}

export function resolveResourcePreviews(
  entries: ResourceEntry[],
): Map<string, ResolvedResourcePreview> {
  const manifestById = getManifestById();
  const resolved = new Map<string, ResolvedResourcePreview>();

  for (const entry of entries) {
    resolved.set(entry.id, resolveResourcePreview(entry, manifestById));
  }

  return resolved;
}

/** Pure helper for unit tests — no disk I/O. */
export function resolveResourcePreviewFromParts(input: {
  id: string;
  url: string;
  manifestEntry?: ResourcePreviewManifestEntry | undefined;
  fileExists: boolean;
}): ResolvedResourcePreview {
  const hostname = getResourceHostname(input.url);
  const record = input.manifestEntry;

  if (!record || !record.ok || !input.fileExists) {
    return { src: null, hostname };
  }

  return {
    src: resourcePreviewPublicSrc(input.id),
    hostname,
  };
}
