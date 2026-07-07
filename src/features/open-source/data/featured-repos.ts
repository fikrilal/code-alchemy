export type FeaturedOpenSourceRepo = {
  name: string;
  href: string;
  language: string;
  focus: string;
};

export const featuredOpenSourceRepos: FeaturedOpenSourceRepo[] = [
  {
    name: "burnly",
    href: "https://github.com/fikrilal/burnly",
    language: "Rust",
    focus: "AI coding-tool token tracker",
  },
  {
    name: "gnome-lyricbar",
    href: "https://github.com/fikrilal/gnome-lyricbar",
    language: "JavaScript",
    focus: "GNOME live lyrics extension",
  },
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
];
