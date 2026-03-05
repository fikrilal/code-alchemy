import WorkIndexPage from "@/features/work/components/WorkIndexPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Ahmad Fikril Al Muzakki",
  description: "Case studies and shipped projects across mobile engineering and product design.",
};

export default async function WorkPage() {
  return <WorkIndexPage />;
}
