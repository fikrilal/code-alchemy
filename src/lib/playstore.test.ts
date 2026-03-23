import { beforeEach, describe, expect, it, vi } from "vitest";

const { appMock } = vi.hoisted(() => ({
  appMock: vi.fn(),
}));

vi.mock("google-play-scraper", () => ({
  default: {
    app: appMock,
  },
}));

import {
  getPlayStoreAppPublicInfo,
  parsePlayStoreAppIdFromUrl,
  resolvePlayStoreAppId,
} from "@/lib/playstore";

beforeEach(() => {
  appMock.mockReset();
});

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

  it("returns normalized play store metadata", async () => {
    appMock.mockResolvedValue({
      appId: "com.orymu.app",
      title: "Orymu",
      summary: "Memory-first reading companion",
      installs: "10K+",
      minInstalls: 10000,
      maxInstalls: 19999,
      score: 4.8,
      ratings: 1234,
      reviews: 456,
      developer: "Orymu Labs",
      icon: "https://example.com/icon.png",
      url: "https://play.google.com/store/apps/details?id=com.orymu.app&hl=en&gl=us",
    });

    await expect(
      getPlayStoreAppPublicInfo({
        playStoreAppId: "com.orymu.app",
      })
    ).resolves.toEqual({
      appId: "com.orymu.app",
      title: "Orymu",
      summary: "Memory-first reading companion",
      icon: "https://example.com/icon.png",
      installsLabel: "10K+",
      minInstalls: 10000,
      maxInstalls: 19999,
      rating: 4.8,
      ratingsCount: 1234,
      reviewsCount: 456,
      developer: "Orymu Labs",
      storeUrl:
        "https://play.google.com/store/apps/details?id=com.orymu.app&hl=en&gl=us",
    });

    expect(appMock).toHaveBeenCalledWith({
      appId: "com.orymu.app",
      lang: "en",
      country: "us",
    });
  });

  it("returns null without calling the scraper when app id cannot be resolved", async () => {
    await expect(
      getPlayStoreAppPublicInfo({
        playStoreUrl: "https://example.com/store/apps/details?id=com.orymu.app",
      })
    ).resolves.toBeNull();

    expect(appMock).not.toHaveBeenCalled();
  });

  it("returns null when the scraper throws", async () => {
    appMock.mockRejectedValue(new Error("play unavailable"));

    await expect(
      getPlayStoreAppPublicInfo({
        playStoreAppId: "com.orymu.app",
      })
    ).resolves.toBeNull();
  });
});
