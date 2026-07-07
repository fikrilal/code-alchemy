"use client";

import { useSyncExternalStore } from "react";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { USER } from "@/features/home/data/user";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function Hello() {
  const greeting = useSyncExternalStore(
    () => () => {},
    getGreeting,
    () => "Hello",
  );

  return (
    <Panel id="hello">
      <PanelHeader>
        <PanelTitle suppressHydrationWarning>{greeting}</PanelTitle>
      </PanelHeader>

      <PanelContent className="pt-5 pb-6">
        <div className="space-y-4 text-base leading-7 text-muted-foreground">
          {USER.about.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}