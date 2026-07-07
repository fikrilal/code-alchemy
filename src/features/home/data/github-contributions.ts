import "server-only";

import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/contribution-graph";

const PUBLIC_CONTRIBUTIONS_API =
  process.env.GITHUB_CONTRIBUTIONS_API_URL ??
  "https://github-contributions-api.jogruber.de";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
  async (username = "fikrilal") => {
    const res = await fetch(
      `${PUBLIC_CONTRIBUTIONS_API}/v4/${username}?y=last`,
      { next: { revalidate: 86400 } },
    );

    if (!res.ok) {
      throw new Error(`GitHub contributions API error (${res.status})`);
    }

    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions;
  },
  ["github-contributions"],
  { revalidate: 86400 },
);