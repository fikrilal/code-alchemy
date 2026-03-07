import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import type { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
