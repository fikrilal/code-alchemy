import AboutPage from "@/features/about/components/AboutPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mobile engineer based in Bandung, Indonesia. Background, experience, achievements, and ways to get in touch.",
};

export default function AboutRoute() {
  return <AboutPage />;
}