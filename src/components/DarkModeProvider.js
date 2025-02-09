"use client";

import { useEffect } from "react";

export default function DarkModeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <>{children}</>;
}
