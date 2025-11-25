"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

type MermaidProps = {
  code: string;
  className?: string;
};

export function Mermaid({ code, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      // Allow client-side rendering without DOMPurify hooks failing in SSR/test.
      securityLevel: "loose",
      flowchart: {
        htmlLabels: false,
      },
    });

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          code
        );
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        // Fail silently in production; optionally log in development if needed.
      }
    };

    if (containerRef.current) {
      void renderDiagram();
    }
  }, [code]);

  return (
    <div ref={containerRef} className={className}>
      <pre className="text-sm text-slate-500">Mermaid diagram loading…</pre>
    </div>
  );
}
