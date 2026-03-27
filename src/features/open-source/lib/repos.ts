import "server-only";

import {
  featuredOpenSourceRepos,
  type FeaturedOpenSourceRepoCard,
} from "@/features/open-source/data/featured-repos";
import { getGithubRepoOpenGraphPreview } from "@/lib/github-open-graph";

export async function getFeaturedOpenSourceRepoCards(): Promise<
  FeaturedOpenSourceRepoCard[]
> {
  return Promise.all(
    featuredOpenSourceRepos.map(async (repo) => {
      const preview = await getGithubRepoOpenGraphPreview({
        repoUrl: repo.href,
      });

      return preview?.imageUrl
        ? {
            ...repo,
            imageSrc: preview.imageUrl,
          }
        : repo;
    })
  );
}
