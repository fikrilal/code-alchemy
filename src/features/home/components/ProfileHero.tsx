import { GitHubContributions } from "@/features/home/components/profile/github-contributions";
import { Hello } from "@/features/home/components/profile/hello";
import { Overview } from "@/features/home/components/profile/overview";
import { ProfileHeader } from "@/features/home/components/profile/profile-header";
import { SocialLinks } from "@/features/home/components/profile/social-links";
import { cn } from "@/lib/utils";

function StripeSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x border-line",
        className,
      )}
    />
  );
}

export default function ProfileHero() {
  return (
    <div className="mx-auto px-2 md:max-w-3xl">
      <ProfileHeader />
      <StripeSeparator />

      <Overview />
      <SocialLinks />
      <GitHubContributions />
      <StripeSeparator />

      <Hello />
      <StripeSeparator />
    </div>
  );
}