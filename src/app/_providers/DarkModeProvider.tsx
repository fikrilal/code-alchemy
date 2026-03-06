"use client";

import { useEffect, type ReactNode } from "react";

type DarkModeProviderProps = {
  children: ReactNode;
};

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <>{children}</>;
}
