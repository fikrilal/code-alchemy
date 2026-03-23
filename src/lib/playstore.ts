import "server-only";

import gplay, { type IAppItemFullDetail } from "google-play-scraper";

const PLAY_STORE_HOST = "play.google.com";
const PLAY_STORE_DETAILS_PATH = "/store/apps/details";
const APP_ID_PATTERN = /^[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)+$/;
const DEFAULT_PLAY_STORE_LANG = "en";
const DEFAULT_PLAY_STORE_COUNTRY = "us";
const DEFAULT_PLAY_STORE_REVALIDATE_SEC = 60 * 60 * 12;

type PlayStoreCacheEntry = {
  value: PlayStoreAppPublicInfo;
  expiresAt: number;
};

const playStoreAppInfoCache =
  (
    globalThis as unknown as {
      __playStoreAppInfoCache?: Map<string, PlayStoreCacheEntry>;
    }
  ).__playStoreAppInfoCache ?? new Map<string, PlayStoreCacheEntry>();

(
  globalThis as unknown as {
    __playStoreAppInfoCache?: Map<string, PlayStoreCacheEntry>;
  }
).__playStoreAppInfoCache = playStoreAppInfoCache;

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

export async function getPlayStoreAppPublicInfo(input: {
  playStoreAppId?: string;
  playStoreUrl?: string;
  lang?: string;
  country?: string;
  revalidateSec?: number;
}): Promise<PlayStoreAppPublicInfo | null> {
  const appId = resolvePlayStoreAppId(input);
  if (!appId) return null;

  const lang = input.lang ?? DEFAULT_PLAY_STORE_LANG;
  const country = input.country ?? DEFAULT_PLAY_STORE_COUNTRY;
  const revalidateSec = input.revalidateSec ?? DEFAULT_PLAY_STORE_REVALIDATE_SEC;
  const cacheKey = getPlayStoreCacheKey(appId, lang, country);
  const freshCache = getFreshPlayStoreAppInfoFromCache(cacheKey, revalidateSec);

  if (freshCache) {
    return freshCache;
  }

  try {
    const detail = await gplay.app({
      appId,
      lang,
      country,
    });

    const result = normalizePlayStoreAppPublicInfo(detail, {
      fallbackAppId: appId,
      lang,
      country,
    });

    rememberPlayStoreAppInfo(cacheKey, result, revalidateSec);

    return result;
  } catch {
    logPlayStoreWarning(`Failed to fetch Play Store metadata for "${appId}"`);

    const staleCache = getStalePlayStoreAppInfoFromCache(cacheKey);
    if (staleCache) {
      return staleCache;
    }

    return null;
  }
}

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

function getPlayStoreCacheKey(appId: string, lang: string, country: string): string {
  return `${appId}:${lang}:${country}`;
}

function getFreshPlayStoreAppInfoFromCache(
  cacheKey: string,
  revalidateSec: number
): PlayStoreAppPublicInfo | null {
  if (revalidateSec <= 0) return null;

  const entry = playStoreAppInfoCache.get(cacheKey);
  if (!entry) return null;

  return entry.expiresAt > Date.now() ? entry.value : null;
}

function getStalePlayStoreAppInfoFromCache(
  cacheKey: string
): PlayStoreAppPublicInfo | null {
  return playStoreAppInfoCache.get(cacheKey)?.value ?? null;
}

function rememberPlayStoreAppInfo(
  cacheKey: string,
  value: PlayStoreAppPublicInfo,
  revalidateSec: number
) {
  if (revalidateSec <= 0) return;

  playStoreAppInfoCache.set(cacheKey, {
    value,
    expiresAt: Date.now() + revalidateSec * 1000,
  });
}

function normalizePlayStoreAppPublicInfo(
  detail: IAppItemFullDetail,
  context: {
    fallbackAppId: string;
    lang: string;
    country: string;
  }
): PlayStoreAppPublicInfo {
  const normalizedAppId =
    normalizePlayStoreAppId(detail.appId) ?? context.fallbackAppId;
  const title = toOptionalString(detail.title) ?? normalizedAppId;
  const summary = toOptionalString(detail.summary);
  const icon = toOptionalString(detail.icon);
  const installsLabel = toOptionalString(detail.installs);
  const minInstalls = toOptionalNumber(detail.minInstalls);
  const maxInstalls = toOptionalNumber(detail.maxInstalls);
  const rating = toOptionalNumber(detail.score);
  const ratingsCount = toOptionalNumber(detail.ratings);
  const reviewsCount = toOptionalNumber(detail.reviews);
  const developer = toOptionalString(detail.developer);
  const storeUrl =
    toOptionalString(detail.url) ??
    buildPlayStoreUrl(normalizedAppId, context.lang, context.country);

  const result: PlayStoreAppPublicInfo = {
    appId: normalizedAppId,
    title,
    storeUrl,
  };

  if (summary !== undefined) result.summary = summary;
  if (icon !== undefined) result.icon = icon;
  if (installsLabel !== undefined) result.installsLabel = installsLabel;
  if (minInstalls !== undefined) result.minInstalls = minInstalls;
  if (maxInstalls !== undefined) result.maxInstalls = maxInstalls;
  if (rating !== undefined) result.rating = rating;
  if (ratingsCount !== undefined) result.ratingsCount = ratingsCount;
  if (reviewsCount !== undefined) result.reviewsCount = reviewsCount;
  if (developer !== undefined) result.developer = developer;

  return result;
}

function buildPlayStoreUrl(appId: string, lang: string, country: string): string {
  const query = new URLSearchParams({
    id: appId,
    hl: lang,
    gl: country,
  });

  return `https://${PLAY_STORE_HOST}${PLAY_STORE_DETAILS_PATH}?${query.toString()}`;
}

function toOptionalString(value?: string | null): string | undefined {
  if (!value) return undefined;

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function toOptionalNumber(value?: number | null): number | undefined {
  if (typeof value !== "number") return undefined;
  return Number.isFinite(value) ? value : undefined;
}

function logPlayStoreWarning(message: string) {
  console.warn(`[playstore] ${message}`);
}
