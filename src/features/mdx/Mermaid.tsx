"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

type MermaidProps = {
  code: string;
  className?: string;
};

export function Mermaid({ code, className }: MermaidProps) {
  const containerRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      // Keep Mermaid in strict mode to avoid rendering unsanitized HTML labels.
      securityLevel: "strict",
      flowchart: {
        htmlLabels: false,
      },
    });

    const renderDiagram = async () => {
      try {
        if (containerRef.current) {
          // Reset mermaid processing markers before re-running.
          containerRef.current.removeAttribute("data-processed");
          containerRef.current.textContent = code;
          await mermaid.run({ nodes: [containerRef.current] });
        }
      } catch {
        // Fail silently in production; optionally log in development if needed.
      }
    };

    if (containerRef.current) {
      void renderDiagram();
    }
  }, [code]);

  return (
    <pre ref={containerRef} className={`mermaid ${className ?? ""}`}>
      {code}
    </pre>
  );
}
