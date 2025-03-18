import { Inter_Tight, Fragment_Mono } from "next/font/google";
import "./globals.css";
import DarkModeProvider from "@/components/DarkModeProvider";

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

export const metadata = {
  title: "Ahmad Fikril Al Muzakki | Mobile Engineer & UX Designer",
  description:
    "Portfolio of Ahmad Fikril Al Muzakki (Fikril), a Mobile Engineer and UX Designer based in Bandung, Indonesia. Specializing in mobile app development and user experience design.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Person Schema.org structured data for better search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmad Fikril Al Muzakki",
              givenName: "Ahmad Fikril",
              familyName: "Al Muzakki",
              alternateName: "Fikril",
              jobTitle: "Mobile Engineer",
              description:
                "Mobile Engineer and UX Designer based in Bandung, Indonesia",
              url: "https://www.fikril.dev",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bandung",
                addressRegion: "West Java",
                addressCountry: "Indonesia",
              },
              sameAs: [
                "https://linkedin.com/in/fikrilal",
                "https://github.com/fikrilal",
                "https://twitter.com/fikrilal",
                "https://instagram.com/fikrilal",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${interTight.variable} ${fragmentMono.variable} font-sans antialiased dark:bg-darkbg dark:text-white`}
      >
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
