export type FeaturedOpenSourceRepo = {
  name: string;
  href: string;
  description: string;
  language: string;
  focus: string;
};

export type FeaturedOpenSourceRepoCard = FeaturedOpenSourceRepo & {
  imageSrc?: string;
};

export const featuredOpenSourceRepos: FeaturedOpenSourceRepo[] = [
  {
    name: "mobile-core-kit",
    href: "https://github.com/fikrilal/mobile-core-kit",
    description:
      "A reusable Flutter starter with config generation, architecture guardrails, analytics wiring, and a production-oriented app foundation.",
    language: "Dart",
    focus: "Mobile architecture kit",
  },
  {
    name: "backend-core-kit",
    href: "https://github.com/fikrilal/backend-core-kit",
    description:
      "A backend baseline with auth, database, workers, observability, and API contract discipline designed to help teams ship APIs faster.",
    language: "TypeScript",
    focus: "Backend platform kit",
  },
  {
    name: "gitlab-activity-mirror",
    href: "https://github.com/fikrilal/gitlab-activity-mirror",
    description:
      "A GitHub Actions-friendly tool that mirrors GitLab commit activity into GitHub with idempotent commit mapping and audit-friendly metadata.",
    language: "Python",
    focus: "Developer tooling",
  },
  {
    name: "android-core-kit",
    href: "https://github.com/fikrilal/android-core-kit",
    description:
      "A native Android starter kit built around Jetpack Compose, MVVM/UDF, and modular boundaries for fast but maintainable delivery.",
    language: "Kotlin",
    focus: "Android architecture kit",
  },
];
