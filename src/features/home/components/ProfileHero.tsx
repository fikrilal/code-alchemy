import { StripeSeparator } from "@/components/layout/stripe-separator";
import { GitHubContributions } from "@/features/home/components/profile/github-contributions";
import { Hello } from "@/features/home/components/profile/hello";
import { Overview } from "@/features/home/components/profile/overview";
import { ProfileHeader } from "@/features/home/components/profile/profile-header";
import { SocialLinks } from "@/features/home/components/profile/social-links";

export default function ProfileHero() {
  return (
    <>
      <ProfileHeader />
      <StripeSeparator />

      <Overview />
      <SocialLinks />
      <GitHubContributions />
      <StripeSeparator />

      <Hello />
      <StripeSeparator />
    </>
  );
}