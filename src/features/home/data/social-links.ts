export type SocialIconName = "x" | "github" | "linkedin" | "instagram";

export type SocialLink = {
  title: string;
  handle: string;
  href: string;
  icon: SocialIconName;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: "X",
    handle: "@fikrilal",
    href: "https://x.com/fikrilal",
    icon: "x",
  },
  {
    title: "GitHub",
    handle: "fikrilal",
    href: "https://github.com/fikrilal",
    icon: "github",
  },
  {
    title: "LinkedIn",
    handle: "fikrilal",
    href: "https://www.linkedin.com/in/fikrilal/",
    icon: "linkedin",
  },
  {
    title: "Instagram",
    handle: "@fikril.al",
    href: "https://www.instagram.com/fikril.al/",
    icon: "instagram",
  },
];