"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, useSyncExternalStore } from "react";

import { SiteMark } from "@/components/brand/site-mark";
import { HomeColumn } from "@/components/layout/home-column";
import { Drawer } from "@/components/ui/drawer";
import { toggleTheme } from "@/lib/theme";

const NAV_ITEMS = [
  { title: "Work", href: "/work" },
  { title: "Blog", href: "/blog" },
  { title: "Resources", href: "/resources" },
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

function MobileMenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground sm:hidden"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 transition-transform duration-200"
        aria-hidden
      >
        {open ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        )}
      </svg>
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip bg-background">
      <HomeColumn>
        <div className="screen-line-top screen-line-bottom relative flex h-14 items-center gap-2 border-x border-line sm:gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0 text-foreground"
            onClick={handleLinkClick}
          >
            <SiteMark className="h-8" />
          </Link>

          <div className="flex-1" />

          <NavLinks activePath={pathname} />

          <div className="flex items-center gap-1">
            <NavSeparator />
            <ThemeToggle />
            <MobileMenuButton open={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </HomeColumn>

      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        side="right"
        ariaLabel="Navigation menu"
        className="p-6 bg-background"
      >
        <div className="flex flex-col h-full justify-between py-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                aria-label="Home"
                className="text-foreground"
                onClick={handleLinkClick}
              >
                <SiteMark className="h-8" />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-6">
              {NAV_ITEMS.map(({ title, href }) => {
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={handleLinkClick}
                    className="text-base font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
                  >
                    {title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </Drawer>
    </header>
  );
}