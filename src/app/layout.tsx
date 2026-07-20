import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fragment_Mono, Inter_Tight, Geist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

import { ThemeScript } from "@/components/theme/theme-script";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ahmad Fikril Al Muzakki | Mobile Engineer",
  description:
    "I'm Fikril — a Mobile Engineer. I love product engineering when a product is going from 0 → 1, or pushing from 1 → 100 — owning the architecture, the release, and living with the choices.",
  keywords: [
    "Ahmad Fikril Al Muzakki",
    "Fikril",
    "Fikrilal",
    "Mobile Engineer",
    "Flutter Developer",
    "UI/UX Design",
    "Mobile App Development",
    "Front-end Developer",
    "Software Engineer",
    "Portfolio Website",
    "Tech Professional Indonesia",
    "Jakarta Developer",
    "Mobile Application Design",
    "User Experience Expert",
  ],
  authors: [{ name: "Ahmad Fikril Al Muzakki" }],
  creator: "Ahmad Fikril Al Muzakki",
  publisher: "Ahmad Fikril Al Muzakki",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ahmad Fikril Al Muzakki | Mobile Engineer",
    description:
      "I'm Fikril — a Mobile Engineer. I love product engineering when a product is going from 0 → 1, or pushing from 1 → 100 — owning the architecture, the release, and living with the choices.",
    url: "https://www.fikril.dev",
    siteName: "Ahmad Fikril Al Muzakki Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.fikril.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Fikril Al Muzakki Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Fikril Al Muzakki | Mobile Engineer",
    description:
      "Mobile Engineer. Shipping products from 0 → 1 and pushing 1 → 100.",
    creator: "@fikrilal",
  },
  alternates: {
    canonical: "https://www.fikril.dev",
  },
  metadataBase: new URL("https://www.fikril.dev"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "zUCZgB63GISFL-K7CBVwrLJGN1VLnGn-p1lzrwnbqVU",
  },
};

const isVercelDeployment = process.env.VERCEL === "1";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("dark", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className={`${interTight.variable} ${fragmentMono.variable}`}>
        {isVercelDeployment ? (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        ) : null}
        <NextTopLoader
          color="#6A42C2"
          crawlSpeed={150}
          height={3}
          showSpinner={false}
          easing="ease"
          crawl
        />
        {children}
      </body>
    </html>
  );
}
