import ResourcesPage from "@/features/resources/components/ResourcesPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Ahmad Fikril Al Muzakki",
  description:
    "Curated tools and references for developers and design engineers — UI kits, motion, tooling, and craft.",
};

export default function ResourcesRoute() {
  return <ResourcesPage />;
}
