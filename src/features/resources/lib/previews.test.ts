import { describe, expect, it } from "vitest";

import { ResourcePreviewManifestSchema } from "@/features/resources/lib/preview-schema";
import {
  getResourceHostname,
  resolveResourcePreviewFromParts,
} from "@/features/resources/lib/previews";

describe("getResourceHostname", () => {
  it("strips www and returns hostname", () => {
    expect(getResourceHostname("https://www.example.com/path")).toBe(
      "example.com",
    );
  });
});

describe("ResourcePreviewManifestSchema", () => {
  it("accepts a valid manifest entry", () => {
    const result = ResourcePreviewManifestSchema.safeParse([
      {
        id: "example-tool",
        sourceUrl: "https://example.com/tool",
        file: "example-tool.jpg",
        capturedAt: "2026-07-13T00:00:00.000Z",
        ok: true,
      },
    ]);
    expect(result.success).toBe(true);
  });

  it("rejects invalid entries", () => {
    const result = ResourcePreviewManifestSchema.safeParse([
      {
        id: "example-tool",
        sourceUrl: "not-a-url",
        file: "example-tool.jpg",
        capturedAt: "2026-07-13T00:00:00.000Z",
        ok: true,
      },
    ]);
    expect(result.success).toBe(false);
  });
});

describe("resolveResourcePreviewFromParts", () => {
  const base = {
    id: "magic-ui",
    url: "https://magicui.design/",
  };

  it("returns null src when manifest is missing", () => {
    expect(
      resolveResourcePreviewFromParts({ ...base, fileExists: true }),
    ).toEqual({
      src: null,
      hostname: "magicui.design",
    });
  });

  it("returns null src when capture failed", () => {
    expect(
      resolveResourcePreviewFromParts({
        ...base,
        fileExists: true,
        manifestEntry: {
          id: "magic-ui",
          sourceUrl: "https://magicui.design/",
          file: "magic-ui.jpg",
          capturedAt: "2026-07-13T00:00:00.000Z",
          ok: false,
          error: "timeout",
        },
      }),
    ).toEqual({
      src: null,
      hostname: "magicui.design",
    });
  });

  it("returns public src when ok and file exists", () => {
    expect(
      resolveResourcePreviewFromParts({
        ...base,
        fileExists: true,
        manifestEntry: {
          id: "magic-ui",
          sourceUrl: "https://magicui.design/",
          file: "magic-ui.jpg",
          capturedAt: "2026-07-13T00:00:00.000Z",
          ok: true,
        },
      }),
    ).toEqual({
      src: "/images/resources/magic-ui.jpg",
      hostname: "magicui.design",
    });
  });

  it("returns null src when file is missing even if ok", () => {
    expect(
      resolveResourcePreviewFromParts({
        ...base,
        fileExists: false,
        manifestEntry: {
          id: "magic-ui",
          sourceUrl: "https://magicui.design/",
          file: "magic-ui.jpg",
          capturedAt: "2026-07-13T00:00:00.000Z",
          ok: true,
        },
      }),
    ).toEqual({
      src: null,
      hostname: "magicui.design",
    });
  });
});
