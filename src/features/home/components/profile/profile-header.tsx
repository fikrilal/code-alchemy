import Image from "next/image";

import { FlipSentences } from "@/features/home/components/profile/flip-sentences";
import { SiteMark } from "@/features/home/components/profile/site-mark";
import { USER } from "@/features/home/data/user";

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-line">
      <figure className="relative col-span-2 p-2 sm:col-span-1 sm:col-start-2 sm:p-4">
        <SiteMark className="h-28 w-full text-white/90 sm:h-36" />
        <figcaption className="pointer-events-none absolute right-2 bottom-2 font-mono text-xs leading-none text-slate-500 select-none sm:right-4">
          FIG_001
        </figcaption>
      </figure>

      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line p-2 sm:p-3">
          <div className="relative mx-auto size-30 overflow-hidden rounded-full sm:size-40">
            <Image
              src={USER.avatar}
              alt={USER.displayName}
              fill
              priority
              sizes="(max-width: 640px) 120px, 160px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight text-white">
              {USER.displayName}
            </h1>
          </div>

          <FlipSentences
            sentences={USER.flipSentences}
            className="h-12.5 border-t border-line py-1 pl-4 sm:h-9"
          />
        </div>
      </div>
    </div>
  );
}