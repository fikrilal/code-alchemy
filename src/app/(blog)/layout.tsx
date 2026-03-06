import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import type { ReactNode } from "react";

export default function BlogLayout({
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
