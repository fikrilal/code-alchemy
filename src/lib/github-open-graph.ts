import "server-only";

const GITHUB_HOST = "github.com";
const DEFAULT_GITHUB_REPO_PREVIEW_REVALIDATE_SEC = 60 * 60 * 12;

type GithubRepoPreviewCacheEntry = {
  value: GithubRepoOpenGraphPreview;
  expiresAt: number;
};

const githubRepoPreviewCache =
  (
    globalThis as unknown as {
      __githubRepoPreviewCache?: Map<string, GithubRepoPreviewCacheEntry>;
    }
  ).__githubRepoPreviewCache ?? new Map<string, GithubRepoPreviewCacheEntry>();

(
  globalThis as unknown as {
    __githubRepoPreviewCache?: Map<string, GithubRepoPreviewCacheEntry>;
  }
).__githubRepoPreviewCache = githubRepoPreviewCache;

export type GithubRepoOpenGraphPreview = {
  repoUrl: string;
  imageUrl?: string;
  title?: string;
  description?: string;
};

export async function getGithubRepoOpenGraphPreview(input: {
  repoUrl: string;
  revalidateSec?: number;
}): Promise<GithubRepoOpenGraphPreview | null> {
  const repoUrl = normalizeGithubRepoUrl(input.repoUrl);
  if (!repoUrl) return null;

  const revalidateSec =
    input.revalidateSec ?? DEFAULT_GITHUB_REPO_PREVIEW_REVALIDATE_SEC;
  const freshCache = getFreshGithubRepoPreviewFromCache(repoUrl, revalidateSec);

  if (freshCache) {
    return freshCache;
  }

  try {
    const response = await fetch(repoUrl, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: revalidateSec },
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const html = await response.text();
    const preview = parseGithubRepoOpenGraphPreview(html, repoUrl);

    if (!preview) {
      return null;
    }

    rememberGithubRepoPreview(repoUrl, preview, revalidateSec);
    return preview;
  } catch {
    logGithubPreviewWarning(`Failed to fetch GitHub preview metadata for "${repoUrl}"`);

    const staleCache = getStaleGithubRepoPreviewFromCache(repoUrl);
    if (staleCache) {
      return staleCache;
    }

    return null;
  }
}

export function normalizeGithubRepoUrl(url: string): string | null {
  if (url.trim().length === 0) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname !== GITHUB_HOST) return null;
    if (parsed.protocol !== "https:") return null;

    const pathSegments = parsed.pathname.split("/").filter(Boolean);
    if (pathSegments.length !== 2) return null;

    const [owner, repo] = pathSegments;
    if (!owner || !repo) return null;

    return `https://${GITHUB_HOST}/${owner}/${repo}`;
  } catch {
    return null;
  }
}

export function parseGithubRepoOpenGraphPreview(
  html: string,
  repoUrl: string
): GithubRepoOpenGraphPreview | null {
  const imageUrl = extractMetaContent(html, "property", "og:image");
  const title = extractMetaContent(html, "property", "og:title");
  const description = extractMetaContent(html, "property", "og:description");

  if (!imageUrl && !title && !description) {
    return null;
  }

  const preview: GithubRepoOpenGraphPreview = { repoUrl };
  if (imageUrl) preview.imageUrl = imageUrl;
  if (title) preview.title = title;
  if (description) preview.description = description;

  return preview;
}

function extractMetaContent(
  html: string,
  attributeName: string,
  attributeValue: string
): string | undefined {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    if (readAttribute(tag, attributeName) !== attributeValue) continue;

    const content = readAttribute(tag, "content");
    if (content) return decodeHtmlEntity(content.trim());
  }

  return undefined;
}

function readAttribute(tag: string, attributeName: string): string | null {
  const quotedPattern = new RegExp(
    `${attributeName}\\s*=\\s*(["'])(.*?)\\1`,
    "i"
  );
  const quotedMatch = tag.match(quotedPattern);
  if (quotedMatch?.[2]) {
    return quotedMatch[2];
  }

  const unquotedPattern = new RegExp(`${attributeName}\\s*=\\s*([^\\s>]+)`, "i");
  const unquotedMatch = tag.match(unquotedPattern);
  if (unquotedMatch?.[1]) {
    return unquotedMatch[1];
  }

  return null;
}

function decodeHtmlEntity(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getFreshGithubRepoPreviewFromCache(
  repoUrl: string,
  revalidateSec: number
): GithubRepoOpenGraphPreview | null {
  if (revalidateSec <= 0) return null;

  const entry = githubRepoPreviewCache.get(repoUrl);
  if (!entry) return null;

  return entry.expiresAt > Date.now() ? entry.value : null;
}

function getStaleGithubRepoPreviewFromCache(
  repoUrl: string
): GithubRepoOpenGraphPreview | null {
  return githubRepoPreviewCache.get(repoUrl)?.value ?? null;
}

function rememberGithubRepoPreview(
  repoUrl: string,
  value: GithubRepoOpenGraphPreview,
  revalidateSec: number
) {
  if (revalidateSec <= 0) return;

  githubRepoPreviewCache.set(repoUrl, {
    value,
    expiresAt: Date.now() + revalidateSec * 1000,
  });
}

function logGithubPreviewWarning(message: string) {
  console.warn(`[github-open-graph] ${message}`);
}
