import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import type { ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}