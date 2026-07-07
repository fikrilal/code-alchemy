import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { AwardItem } from "@/features/home/components/award-item";
import awards from "@/features/home/data/awards";

export function AchievementsSection() {
  if (awards.length === 0) {
    return null;
  }

  return (
    <Panel id="awards">
      <PanelHeader>
        <PanelTitle>Awards</PanelTitle>
      </PanelHeader>

      <ul className="screen-line-top">
        {awards.map((award) => (
          <li
            key={`${award.title}-${award.date}`}
            className="border-b border-line last:border-b-0"
          >
            <AwardItem award={award} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}