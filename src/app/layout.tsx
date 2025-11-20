import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fragment_Mono, Inter_Tight } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import DarkModeProvider from "@/components/DarkModeProvider";
import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

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
  title: "Ahmad Fikril Al Muzakki | Mobile Engineer & UX Designer",
  description:
    "Hey there! I'm Fikril, a mobile engineering wizard turning wild ideas into sleek apps that people actually love to use. Coffee-powered code and pixel-perfect designs are my superpowers!",
  keywords: [
    "Ahmad Fikril Al Muzakki",
    "Fikril",
    "Fikrilal",
    "Mobile Engineer",
    "UX Designer",
    "Flutter Developer",
    "UI/UX Design",
    "Mobile App Development",
    "Front-end Developer",
    "Software Engineer",
    "Portfolio Website",
    "Tech Professional Indonesia",
    "Bandung Developer",
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
    title: "Ahmad Fikril Al Muzakki | Mobile Engineer & UX Designer",
    description:
      "Hey there! I'm Fikril, a mobile engineering wizard turning wild ideas into sleek apps that people actually love to use. Coffee-powered code and pixel-perfect designs are my superpowers!",
    url: "https://www.fikril.dev",
    siteName: "Ahmad Fikril Al Muzakki Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.fikril.dev/og-image.png",
        width: 710,
        height: 426,
        alt: "Ahmad Fikril Al Muzakki Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Fikril Al Muzakki | Mobile Engineer",
    description: "Mobile Engineer & UX Designer based in Bandung, Indonesia",
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="zUCZgB63GISFL-K7CBVwrLJGN1VLnGn-p1lzrwnbqVU"
        />
      </head>
      <body
        className={`${interTight.variable} ${fragmentMono.variable} font-sans antialiased dark:bg-darkbg dark:text-white`}
      >
        <SpeedInsights />
        <Analytics />
        <NextTopLoader
          color="#6A42C2"
          crawlSpeed={150}
          height={3}
          showSpinner={false}
          easing="ease"
          crawl
        />
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
