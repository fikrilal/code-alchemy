export type FeaturedOpenSourceRepo = {
  name: string;
  href: string;
  language: string;
  focus: string;
};

export const featuredOpenSourceRepos: FeaturedOpenSourceRepo[] = [
  {
    name: "mobile-core-kit",
    href: "https://github.com/fikrilal/mobile-core-kit",
    language: "Dart",
    focus: "Mobile architecture kit",
  },
  {
    name: "backend-core-kit",
    href: "https://github.com/fikrilal/backend-core-kit",
    language: "TypeScript",
    focus: "Backend platform kit",
  },
  {
    name: "gitlab-activity-mirror",
    href: "https://github.com/fikrilal/gitlab-activity-mirror",
    language: "Python",
    focus: "Developer tooling",
  },
  {
    name: "android-core-kit",
    href: "https://github.com/fikrilal/android-core-kit",
    language: "Kotlin",
    focus: "Android architecture kit",
  },
];
