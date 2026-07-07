import { SiteLayout } from "@/components/layout/site-layout";

import type { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
