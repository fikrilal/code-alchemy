import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OpenSourceRepoItem } from "@/features/open-source/components/open-source-repo-item";
import type { FeaturedOpenSourceRepo } from "@/features/open-source/data/featured-repos";

type OpenSourceSectionProps = {
  repos: FeaturedOpenSourceRepo[];
};

export default function OpenSourceSection({ repos }: OpenSourceSectionProps) {
  if (repos.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-screen overflow-x-clip px-2 md:max-w-3xl">
      <div className="border-x border-line py-8">
        <h2 className="screen-line-top screen-line-bottom ml-4 font-medium text-3xl tracking-tight text-balance">
          Open Source
        </h2>

        <p className="p-4 text-base text-balance text-muted-foreground">
          Reusable systems, opinionated guardrails, and tools built to keep
          future me slightly less annoyed.
        </p>

        <ul className="screen-line-top">
          {repos.map((repo) => (
            <li key={repo.name} className="border-b border-line">
              <OpenSourceRepoItem repo={repo} />
            </li>
          ))}
        </ul>

        <div className="screen-line-top screen-line-bottom flex justify-center py-2">
          <Button asChild className="gap-2 pr-2.5 pl-3">
            <a
              href="https://github.com/fikrilal"
              rel="noopener noreferrer"
              target="_blank"
            >
              View GitHub
              <ArrowRightIcon />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}