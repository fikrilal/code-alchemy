import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";
import { cn } from "@/lib/utils";

type Experience01Props = {
  experiences: ExperienceItemType[];
  className?: string;
};

export function Experience01({ experiences, className }: Experience01Props) {
  return (
    <WorkExperience
      className={cn("bg-transparent *:screen-line-bottom", className)}
      experiences={experiences}
    />
  );
}