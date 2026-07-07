"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";

import { SiteMark } from "@/components/brand/site-mark";
import { HomeColumn } from "@/components/layout/home-column";
import { toggleTheme } from "@/lib/theme";

const NAV_ITEMS = [
  { title: "Work", href: "/work" },
  { title: "Blog", href: "/blog" },
] as const;

function NavSeparator() {
  return (
    <div
      aria-hidden
      className="mx-2 h-5 w-px shrink-0 self-center bg-line max-sm:hidden"
    />
  );
}

function NavLinks({ activePath }: { activePath: string }) {
  return (
    <nav className="flex items-center gap-4 max-sm:hidden">
      {NAV_ITEMS.map(({ title, href }) => {
        const isActive =
          activePath === href || activePath.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
          >
            {title}
          </Link>
        );
      })}
    </nav>
  );
}

function subscribeToThemeChanges(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getIsDarkSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribeToThemeChanges,
    getIsDarkSnapshot,
    () => true,
  );

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, []);

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-4"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-4"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip bg-background">
      <HomeColumn>
        <div className="screen-line-top screen-line-bottom relative flex h-14 items-center gap-2 border-x border-line sm:gap-4">
          <Link href="/" aria-label="Home" className="shrink-0 text-foreground">
            <SiteMark className="h-8" />
          </Link>

          <div className="flex-1" />

          <NavLinks activePath={pathname} />

          <div className="flex items-center">
            <NavSeparator />
            <ThemeToggle />
          </div>
        </div>
      </HomeColumn>
    </header>
  );
}