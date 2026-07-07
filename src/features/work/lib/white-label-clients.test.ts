import { beforeEach, describe, expect, it, vi } from "vitest";

const { getPlayStoreAppPublicInfoMock, getPlayStoreUrlMock } = vi.hoisted(() => ({
  getPlayStoreAppPublicInfoMock: vi.fn(),
  getPlayStoreUrlMock: vi.fn(),
}));

vi.mock("@/lib/playstore", () => ({
  getPlayStoreAppPublicInfo: getPlayStoreAppPublicInfoMock,
  getPlayStoreUrl: getPlayStoreUrlMock,
}));

import { resolveWhiteLabelClients } from "@/features/work/lib/white-label-clients";

beforeEach(() => {
  getPlayStoreAppPublicInfoMock.mockReset();
  getPlayStoreUrlMock.mockReset();
  getPlayStoreUrlMock.mockImplementation(
    (appId: string) =>
      `https://play.google.com/store/apps/details?id=${appId}&hl=en&gl=us`,
  );
});

describe("resolveWhiteLabelClients", () => {
  it("fetches app name and icon from Play Store metadata", async () => {
    getPlayStoreAppPublicInfoMock.mockResolvedValue({
      appId: "id.siesta.app.pesantrenqu.v2",
      title: "PesantrenQu",
      icon: "https://example.com/icon.png",
      storeUrl:
        "https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.v2&hl=en&gl=us",
    });

    await expect(
      resolveWhiteLabelClients([
        {
          appId: "id.siesta.app.pesantrenqu.v2",
        },
      ]),
    ).resolves.toEqual([
      {
        appId: "id.siesta.app.pesantrenqu.v2",
        name: "PesantrenQu",
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.v2&hl=en&gl=us",
        icon: "https://example.com/icon.png",
      },
    ]);
  });

  it("prefers an explicit name override when provided", async () => {
    getPlayStoreAppPublicInfoMock.mockResolvedValue({
      appId: "id.siesta.app.pesantrenqu.kwagean.kediri",
      title: "Pondok Kwagean",
      storeUrl:
        "https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.kwagean.kediri&hl=en&gl=us",
    });

    await expect(
      resolveWhiteLabelClients([
        {
          appId: "id.siesta.app.pesantrenqu.kwagean.kediri",
          name: "Custom Client Name",
        },
      ]),
    ).resolves.toEqual([
      {
        appId: "id.siesta.app.pesantrenqu.kwagean.kediri",
        name: "Custom Client Name",
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.kwagean.kediri&hl=en&gl=us",
      },
    ]);
  });

  it("falls back to app id and generated URL when fetch fails", async () => {
    getPlayStoreAppPublicInfoMock.mockResolvedValue(null);

    await expect(
      resolveWhiteLabelClients([
        {
          appId: "id.siesta.app.pesantrenqu.v2",
          name: "PesantrenQu",
        },
      ]),
    ).resolves.toEqual([
      {
        appId: "id.siesta.app.pesantrenqu.v2",
        name: "PesantrenQu",
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=id.siesta.app.pesantrenqu.v2&hl=en&gl=us",
      },
    ]);
  });

  it("drops entries with blank app ids", async () => {
    await expect(
      resolveWhiteLabelClients([
        {
          appId: "   ",
        },
      ]),
    ).resolves.toEqual([]);

    expect(getPlayStoreAppPublicInfoMock).not.toHaveBeenCalled();
  });
});