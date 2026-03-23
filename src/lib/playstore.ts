const PLAY_STORE_HOST = "play.google.com";
const PLAY_STORE_DETAILS_PATH = "/store/apps/details";
const APP_ID_PATTERN = /^[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)+$/;

export type PlayStoreAppPublicInfo = {
  appId: string;
  title: string;
  summary?: string;
  icon?: string;
  installsLabel?: string;
  minInstalls?: number;
  maxInstalls?: number;
  rating?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  developer?: string;
  storeUrl: string;
};

export function parsePlayStoreAppIdFromUrl(url: string): string | null {
  if (url.trim().length === 0) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname !== PLAY_STORE_HOST) return null;
    if (parsed.pathname !== PLAY_STORE_DETAILS_PATH) return null;

    const appId = parsed.searchParams.get("id");
    return normalizePlayStoreAppId(appId);
  } catch {
    return null;
  }
}

export function resolvePlayStoreAppId(input: {
  playStoreAppId?: string;
  playStoreUrl?: string;
}): string | null {
  const explicitAppId = normalizePlayStoreAppId(input.playStoreAppId);
  if (explicitAppId) return explicitAppId;

  if (!input.playStoreUrl) return null;
  return parsePlayStoreAppIdFromUrl(input.playStoreUrl);
}

function normalizePlayStoreAppId(appId?: string | null): string | null {
  if (!appId) return null;

  const normalized = appId.trim();
  if (normalized.length === 0) return null;
  if (!APP_ID_PATTERN.test(normalized)) return null;

  return normalized;
}
