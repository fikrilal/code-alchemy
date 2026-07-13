/**
 * Capture viewport screenshots for Resources catalog entries.
 *
 * Usage:
 *   npm run resources:previews
 *   npm run resources:previews -- --all
 *   npm run resources:previews -- --id=magic-ui
 *   npm run resources:previews -- --strict
 *
 * Soft-fails per URL by default (exit 0) so CI stays green when one site blocks bots.
 * Writes:
 *   public/images/resources/{id}.jpg
 *   src/content/resources/previews-manifest.json
 */

import fs from "node:fs";
import path from "node:path";

import { chromium } from "playwright";

import {
  RESOURCE_PREVIEWS_MANIFEST_PATH,
  RESOURCE_PREVIEWS_PUBLIC_DIR,
  resourcePreviewFilename,
} from "../src/features/resources/lib/preview-paths";
import { ResourcePreviewManifestSchema } from "../src/features/resources/lib/preview-schema";
import { ResourceCatalogSchema } from "../src/features/resources/lib/schema";

import type { ResourcePreviewManifestEntry } from "../src/features/resources/lib/preview-schema";
import type { ResourceEntry } from "../src/features/resources/types";
import type { Browser, Page } from "playwright";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/content/resources/catalog.json");
const MANIFEST_PATH = path.join(ROOT, RESOURCE_PREVIEWS_MANIFEST_PATH);
const IMAGES_DIR = path.join(ROOT, RESOURCE_PREVIEWS_PUBLIC_DIR);

const VIEWPORT = { width: 1280, height: 800 } as const;
const NAV_TIMEOUT_MS = 45_000;
/** Extra pause after load so CSS, fonts, and client motion can paint. */
const SETTLE_MS = 4_000;
const NETWORK_IDLE_TIMEOUT_MS = 12_000;
const CONTENT_WAIT_MS = 15_000;
const JPEG_QUALITY = 78;

type CliOptions = {
  forceAll: boolean;
  onlyId: string | null;
  strict: boolean;
};

function parseArgs(argv: string[]): CliOptions {
  let forceAll = false;
  let onlyId: string | null = null;
  let strict = false;

  for (const arg of argv) {
    if (arg === "--all" || arg === "--force") {
      forceAll = true;
      continue;
    }
    if (arg === "--strict") {
      strict = true;
      continue;
    }
    if (arg.startsWith("--id=")) {
      onlyId = arg.slice("--id=".length).trim() || null;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      console.log(`Usage: capture-resource-previews [--all|--force] [--id=<id>] [--strict]`);
      process.exit(0);
    }
  }

  return { forceAll, onlyId, strict };
}

function loadCatalog(): ResourceEntry[] {
  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error(`Catalog missing: ${CATALOG_PATH}`);
  }
  const raw = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8")) as unknown;
  const parsed = ResourceCatalogSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Invalid catalog: ${parsed.error.message}`);
  }
  return parsed.data.map((entry) => ({
    id: entry.id,
    title: entry.title,
    url: entry.url,
    description: entry.description,
    category: entry.category,
    addedAt: entry.addedAt,
    ...(entry.tags !== undefined ? { tags: entry.tags } : {}),
    ...(entry.featured !== undefined ? { featured: entry.featured } : {}),
  }));
}

function loadManifest(): ResourcePreviewManifestEntry[] {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return [];
  }
  const raw = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as unknown;
  const parsed = ResourcePreviewManifestSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("Existing manifest invalid; starting fresh.");
    return [];
  }
  return parsed.data;
}

function writeManifest(entries: ResourcePreviewManifestEntry[]): void {
  const sorted = [...entries].sort((a, b) => a.id.localeCompare(b.id));
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

function shouldCapture(
  entry: ResourceEntry,
  existing: ResourcePreviewManifestEntry | undefined,
  forceAll: boolean,
): boolean {
  if (forceAll) return true;
  if (!existing) return true;
  if (!existing.ok) return true;
  if (existing.sourceUrl.replace(/\/$/, "") !== entry.url.replace(/\/$/, "")) {
    return true;
  }
  const filePath = path.join(IMAGES_DIR, resourcePreviewFilename(entry.id));
  if (!fs.existsSync(filePath)) return true;
  return false;
}

async function waitForPageReady(page: Page): Promise<void> {
  // Prefer network quiet, but don't fail the capture if a site keeps polling.
  try {
    await page.waitForLoadState("networkidle", {
      timeout: NETWORK_IDLE_TIMEOUT_MS,
    });
  } catch {
    // continue — still settle with content + delay below
  }

  try {
    await page.evaluate(async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    });
  } catch {
    // ignore font readiness failures
  }

  // Wait until the document has real text (avoids pure blank shells / pre-hydrate frames).
  try {
    await page.waitForFunction(
      () => {
        const body = document.body;
        if (!body) return false;
        const text = (body.innerText || "").replace(/\s+/g, " ").trim();
        if (text.length >= 40) return true;
        // Some marketing pages paint via canvas/svg before text hydrates.
        const visual = body.querySelector(
          "main, h1, header, canvas, svg, img, video, [data-animate], [class*='hero']",
        );
        return Boolean(visual);
      },
      { timeout: CONTENT_WAIT_MS },
    );
  } catch {
    // Soft-continue — better a partial shot than a hard fail.
  }

  // Two animation frames + fixed settle for client motion / staggered reveals.
  try {
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
          });
        }),
    );
  } catch {
    // ignore
  }

  await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));
}

async function captureOne(
  browser: Browser,
  entry: ResourceEntry,
): Promise<ResourcePreviewManifestEntry> {
  const file = resourcePreviewFilename(entry.id);
  const outPath = path.join(IMAGES_DIR, file);
  const capturedAt = new Date().toISOString();

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    colorScheme: "dark",
    // Real browser UA — some sites delay or thin content for bot UAs.
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  try {
    await page.goto(entry.url, {
      waitUntil: "load",
      timeout: NAV_TIMEOUT_MS,
    });
    await waitForPageReady(page);
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    await page.screenshot({
      path: outPath,
      type: "jpeg",
      quality: JPEG_QUALITY,
      fullPage: false,
      animations: "disabled",
    });

    return {
      id: entry.id,
      sourceUrl: entry.url,
      file,
      capturedAt,
      ok: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      id: entry.id,
      sourceUrl: entry.url,
      file,
      capturedAt,
      ok: false,
      error: message.slice(0, 500),
    };
  } finally {
    await context.close();
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const catalog = loadCatalog();
  const previous = loadManifest();
  const previousById = new Map(previous.map((entry) => [entry.id, entry]));

  let targets = catalog;
  if (options.onlyId) {
    targets = catalog.filter((entry) => entry.id === options.onlyId);
    if (targets.length === 0) {
      throw new Error(`No catalog entry with id "${options.onlyId}"`);
    }
  }

  const toCapture = targets.filter((entry) =>
    shouldCapture(entry, previousById.get(entry.id), options.forceAll),
  );

  console.log(
    `Catalog: ${catalog.length} · Targets: ${targets.length} · Capture: ${toCapture.length}`,
  );

  const nextById = new Map(previousById);

  // Drop manifest rows for ids no longer in catalog
  const catalogIds = new Set(catalog.map((entry) => entry.id));
  for (const id of [...nextById.keys()]) {
    if (!catalogIds.has(id)) {
      nextById.delete(id);
    }
  }

  if (toCapture.length > 0) {
    const browser = await chromium.launch({ headless: true });
    try {
      for (const entry of toCapture) {
        process.stdout.write(`Capturing ${entry.id} … `);
        const result = await captureOne(browser, entry);
        if (result.ok) {
          console.log("ok");
        } else {
          console.log(`fail: ${result.error ?? "unknown"}`);
          // Keep previous good image on failure when file still exists
          const prev = previousById.get(entry.id);
          const filePath = path.join(IMAGES_DIR, resourcePreviewFilename(entry.id));
          if (prev?.ok && fs.existsSync(filePath)) {
            nextById.set(entry.id, {
              ...prev,
              sourceUrl: entry.url,
              capturedAt: result.capturedAt,
              ok: true,
              error: `refresh failed, kept previous: ${result.error ?? "unknown"}`,
            });
            continue;
          }
        }
        nextById.set(entry.id, result);
      }
    } finally {
      await browser.close();
    }
  } else {
    console.log("Nothing to capture.");
  }

  // Ensure every catalog id has a manifest row (missing → ok false)
  for (const entry of catalog) {
    if (!nextById.has(entry.id)) {
      nextById.set(entry.id, {
        id: entry.id,
        sourceUrl: entry.url,
        file: resourcePreviewFilename(entry.id),
        capturedAt: new Date().toISOString(),
        ok: false,
        error: "not captured",
      });
    }
  }

  const manifest = [...nextById.values()];
  writeManifest(manifest);

  const failed = manifest.filter((entry) => catalogIds.has(entry.id) && !entry.ok);
  console.log(
    `Done. Manifest entries: ${manifest.length}. Failed/missing: ${failed.length}.`,
  );

  if (options.strict && failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
