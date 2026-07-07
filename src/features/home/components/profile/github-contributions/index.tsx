import { Suspense } from "react";

import { Panel } from "@/components/ui/panel";
import { getGitHubContributions } from "@/features/home/data/github-contributions";

import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

export function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <Panel className="screen-line-top-none">
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>
    </Panel>
  );
}