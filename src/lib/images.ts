import fs from "fs";
import path from "path";

type ImageOverrides = {
  images?: { hero?: string; gallery?: string[] } | undefined;
  thumbnail?: string | undefined;
};

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function ensureWebPath(...parts: string[]) {
  return "/" + parts.filter(Boolean).join("/").replace(/\\+/g, "/");
}

function fileExists(p: string): boolean {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

export function getWorkImages(
  slug: string,
  fm?: ImageOverrides
): { hero: string; gallery: string[] } {
  const publicDir = path.join(process.cwd(), "public");
  const baseFs = path.join(publicDir, "images", "work", slug);
  const baseWeb = "images/work/" + slug;

  // Hero resolution priority: fm.images.hero -> fm.thumbnail -> hero.* fallback
  let heroWeb = fm?.images?.hero
    ? ensureWebPath(baseWeb, fm.images.hero)
    : fm?.thumbnail && fm.thumbnail.startsWith("/images/")
    ? fm.thumbnail
    : "";

  if (!heroWeb) {
    for (const ext of ALLOWED_EXT) {
      const candidate = path.join(baseFs, `hero${ext}`);
      if (fileExists(candidate)) {
        heroWeb = ensureWebPath(baseWeb, `hero${ext}`);
        break;
      }
    }
  }

  // Gallery from fm override
  let galleryWeb: string[] = (fm?.images?.gallery ?? []).map((name) =>
    ensureWebPath(baseWeb, "gallery", name)
  );

  // If no fm override, try reading gallery directory
  if (galleryWeb.length === 0) {
    const galleryDir = path.join(baseFs, "gallery");
    if (fileExists(galleryDir)) {
      try {
        const files = fs
          .readdirSync(galleryDir)
          .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
          .sort();
        galleryWeb = files.map((f) => ensureWebPath(baseWeb, "gallery", f));
      } catch {
        // ignore
      }
    }
  }

  // Final fallback for hero if still missing
  if (!heroWeb) {
    heroWeb = ensureWebPath(baseWeb, "hero.jpg");
  }

  return { hero: heroWeb, gallery: galleryWeb };
}
