import "server-only";

import type {
  WhiteLabelClient,
  WhiteLabelClientInput,
} from "@/features/work/types";
import {
  getPlayStoreAppPublicInfo,
  getPlayStoreUrl,
} from "@/lib/playstore";

export async function resolveWhiteLabelClients(
  clients: WhiteLabelClientInput[],
): Promise<WhiteLabelClient[]> {
  const resolved = await Promise.all(
    clients.map((client) => resolveWhiteLabelClient(client)),
  );

  return resolved.filter((client): client is WhiteLabelClient => client !== null);
}

async function resolveWhiteLabelClient(
  client: WhiteLabelClientInput,
): Promise<WhiteLabelClient | null> {
  const appId = client.appId.trim();
  if (appId.length === 0) {
    return null;
  }

  const info = await getPlayStoreAppPublicInfo({ playStoreAppId: appId });
  const fallbackName = client.name ?? appId;

  if (!info) {
    return {
      appId,
      name: fallbackName,
      playStoreUrl: getPlayStoreUrl(appId),
    };
  }

  return {
    appId: info.appId,
    name: client.name ?? info.title,
    playStoreUrl: info.storeUrl,
    ...(info.icon ? { icon: info.icon } : {}),
  };
}