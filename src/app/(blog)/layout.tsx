import { SiteLayout } from "@/components/layout/site-layout";

import type { ReactNode } from "react";

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
