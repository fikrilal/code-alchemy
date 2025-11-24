"use client";

import { useEffect, useRef } from "react";

type MermaidProps = {
  code: string;
  className?: string;
};

export function Mermaid({ code, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const renderDiagram = async () => {
      const { default: mermaid } = await import("mermaid");

      if (isCancelled || !containerRef.current) return;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "strict",
      });

      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          code
        );
        if (!isCancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        // Fail silently in production; optionally log in the future.
      }
    };

    void renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [code]);

  return (
    <div ref={containerRef} className={className} />
  );
}
