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
  title: "Fikril's Digital Playground",
  description:
    "A collection of my experiments, projects, and thoughts on mobile development, full-stack engineering, and everything in between.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
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
