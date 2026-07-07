import "server-only";

import {
  featuredOpenSourceRepos,
  type FeaturedOpenSourceRepo,
} from "@/features/open-source/data/featured-repos";

export function getFeaturedOpenSourceRepos(): FeaturedOpenSourceRepo[] {
  return featuredOpenSourceRepos;
}