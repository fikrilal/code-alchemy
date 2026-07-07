"use client";

import { ChevronDownIcon } from "lucide-react";

import { Experience01 } from "@/components/experience-01";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { EXPERIENCES } from "@/features/home/data/experience";

const VISIBLE_EXPERIENCE_COUNT = 3;

export function ExperienceSection() {
  const visibleExperiences = EXPERIENCES.slice(0, VISIBLE_EXPERIENCE_COUNT);
  const hiddenExperiences = EXPERIENCES.slice(VISIBLE_EXPERIENCE_COUNT);

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="screen-line-top">
        <Experience01 experiences={visibleExperiences} />
      </div>

      {hiddenExperiences.length > 0 ? (
        <Collapsible className="group/collapsible">
          <CollapsibleContent>
            <Experience01 experiences={hiddenExperiences} />
          </CollapsibleContent>

          <div className="screen-line-top -mt-px flex justify-center py-2">
            <CollapsibleTrigger asChild>
              <Button className="gap-2 pr-2.5 pl-3">
                <span className="group-data-[state=closed]/collapsible:block group-data-[state=open]/collapsible:hidden">
                  Show more
                </span>
                <span className="hidden group-data-[state=open]/collapsible:block">
                  Show less
                </span>
                <ChevronDownIcon className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      ) : null}
    </Panel>
  );
}