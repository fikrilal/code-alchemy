import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
