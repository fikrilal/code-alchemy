import { Panel, PanelContent } from "@/components/ui/panel";
import {
  GitHubSocialIcon,
  InstagramSocialIcon,
  LinkedInSocialIcon,
  XSocialIcon,
} from "@/features/home/components/profile/social-icons";
import { SOCIAL_LINKS, type SocialIconName } from "@/features/home/data/social-links";

const SOCIAL_ICON_MAP = {
  x: XSocialIcon,
  github: GitHubSocialIcon,
  linkedin: LinkedInSocialIcon,
  instagram: InstagramSocialIcon,
} satisfies Record<SocialIconName, typeof XSocialIcon>;

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((item) => {
            const Icon = SOCIAL_ICON_MAP[item.icon];

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} (${item.handle})`}
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:text-foreground"
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}