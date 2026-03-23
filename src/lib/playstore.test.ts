import { describe, expect, it } from "vitest";

import {
  parsePlayStoreAppIdFromUrl,
  resolvePlayStoreAppId,
} from "@/lib/playstore";

describe("play store utilities", () => {
  it("parses app id from a standard Play Store URL", () => {
    expect(
      parsePlayStoreAppIdFromUrl(
        "https://play.google.com/store/apps/details?id=com.orymu.app"
      )
    ).toBe("com.orymu.app");
  });

  it("parses app id when the Play Store URL includes extra query params", () => {
    expect(
      parsePlayStoreAppIdFromUrl(
        "https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.v2&hl=en&gl=US"
      )
    ).toBe("id.siesta.app.pesantrenqu.v2");
  });

  it("returns null for non-Play Store URLs", () => {
    expect(
      parsePlayStoreAppIdFromUrl(
        "https://example.com/store/apps/details?id=com.orymu.app"
      )
    ).toBeNull();
  });

  it("returns null when the id query param is missing", () => {
    expect(
      parsePlayStoreAppIdFromUrl("https://play.google.com/store/apps/details")
    ).toBeNull();
  });

  it("prefers explicit app id over URL-derived app id", () => {
    expect(
      resolvePlayStoreAppId({
        playStoreAppId: "com.orymu.app",
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=com.some.other.app",
      })
    ).toBe("com.orymu.app");
  });

  it("falls back to parsing the Play Store URL when app id is missing", () => {
    expect(
      resolvePlayStoreAppId({
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=id.siesta.app.cooperativequ.jabar.bandungkab.mp",
      })
    ).toBe("id.siesta.app.cooperativequ.jabar.bandungkab.mp");
  });

  it("returns null when both explicit and URL-derived app ids are invalid", () => {
    expect(
      resolvePlayStoreAppId({
        playStoreAppId: "not-valid",
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=still-not-valid",
      })
    ).toBeNull();
  });
});
