import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SelectedWork from "@/components/SelectedWork";
import { getWorkSummaries } from "@/lib/work";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Ahmad Fikril Al Muzakki",
  description: "Case studies and shipped projects across mobile engineering and product design.",
};

export default async function WorkIndexPage() {
  const workItems = await getWorkSummaries();

  return (
    <>
      <Navbar />
      <main className="bg-neutral-950">
        <SelectedWork
          workItems={workItems}
          heading="All Work & Case Studies"
          description="A deeper look at the products and case studies I’ve delivered—from mobile apps to full-stack builds."
          ctaHref=""
          ctaLabel=""
        />
      </main>
      <Footer />
    </>
  );
}
