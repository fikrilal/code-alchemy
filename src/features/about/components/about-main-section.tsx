import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";

import { StripeSeparator } from "@/components/layout/stripe-separator";
import { Button } from "@/components/ui/button";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { AboutExperienceSection } from "@/features/about/components/about-experience-section";
import achievements from "@/features/about/data/achievements";
import { EXPERIENCES } from "@/features/about/data/experience";
import { CurrentLocalTime } from "@/features/home/components/profile/current-local-time";
import { USER } from "@/features/home/data/user";

import type { ReactNode } from "react";

const VISIBLE_EXPERIENCE_COUNT = 3;

export function AboutMainSection() {
  const visibleExperiences = EXPERIENCES.slice(0, VISIBLE_EXPERIENCE_COUNT);
  const hiddenExperiences = EXPERIENCES.slice(VISIBLE_EXPERIENCE_COUNT);

  return (
    <>
      <Panel id="about">
        <PanelHeader>
          <PanelTitle>About</PanelTitle>
        </PanelHeader>

        <PanelContent className="pt-5 pb-6">
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            {USER.aboutExtended.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </PanelContent>
      </Panel>

      <StripeSeparator />

      <AboutExperienceSection
        experiences={visibleExperiences}
        hiddenExperiences={hiddenExperiences}
      />

      <StripeSeparator />

      <Panel id="achievements">
        <PanelHeader>
          <PanelTitle>Achievements</PanelTitle>
        </PanelHeader>

        <ul className="screen-line-top">
          {achievements.map((achievement) => (
            <li
              key={`${achievement.title}-${achievement.date}`}
              className="border-b border-line px-4 py-4 last:border-b-0"
            >
              <article className="space-y-2">
                <h3 className="font-medium text-balance text-foreground">
                  {achievement.title}
                </h3>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <p>{achievement.organization}</p>
                  <time>{achievement.date}</time>
                </div>

                <Button
                  asChild
                  className="h-7 gap-1.5 px-0 text-sm"
                  variant="link"
                >
                  <a
                    href={achievement.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View credential
                    <ArrowUpRightIcon className="size-3.5" aria-hidden />
                  </a>
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </Panel>

      <StripeSeparator />

      <Panel id="contact">
        <PanelHeader>
          <PanelTitle>Contact</PanelTitle>
        </PanelHeader>

        <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon aria-hidden />
            </IntroItemIcon>
            <p className="text-balance text-foreground">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {USER.address}
              </a>
            </p>
          </IntroItem>

          <CurrentLocalTime timeZone={USER.timeZone} />

          <IntroItem>
            <IntroItemIcon>
              <MailIcon aria-hidden />
            </IntroItemIcon>
            <p className="text-balance text-foreground">
              <a href={`mailto:${USER.email}`} className="link-underline">
                {USER.email}
              </a>
            </p>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              <BriefcaseBusinessIcon aria-hidden />
            </IntroItemIcon>
            <p className="text-balance text-foreground">
              <Link href="/work" className="link-underline">
                See selected work
              </Link>
            </p>
          </IntroItem>
        </PanelContent>
      </Panel>
    </>
  );
}

function IntroItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 font-mono text-sm">{children}</div>
  );
}

function IntroItemIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background [&_svg]:size-4">
      {children}
    </div>
  );
}