import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { USER } from "@/features/home/data/user";

export function Hello() {
  return (
    <Panel id="hello">
      <PanelHeader>
        <PanelTitle>Hi!</PanelTitle>
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