"use client";

import { Check, Copy, Maximize2, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type MermaidProps = {
  code: string;
  className?: string;
};

export function Mermaid({ code, className }: MermaidProps) {
  const containerRef = useRef<HTMLPreElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

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
          setSvgContent(containerRef.current.innerHTML);
        }
      } catch {
        // Fail silently in production; optionally log in development if needed.
      }
    };

    if (containerRef.current) {
      void renderDiagram();
    }
  }, [code]);

  // Lock background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenModal = () => {
    if (containerRef.current) {
      // Strip hardcoded inline max-width style so the SVG expands to fill the fullscreen viewport
      const raw = containerRef.current.innerHTML;
      const cleaned = raw.replace(/style="[^"]*max-width:[^"]*"/gi, "");
      setSvgContent(cleaned);
    }
    setScale(1);
    setIsOpen(true);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setScale(1);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mermaid Diagram Fullscreen View"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-line bg-card/50 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Diagram Fullscreen
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center rounded-lg border border-line bg-muted/60 p-0.5">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground disabled:opacity-40"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2 py-0.5 font-mono text-xs text-muted-foreground hover:text-foreground"
                    title="Reset Zoom"
                    aria-label="Reset Zoom"
                  >
                    {Math.round(scale * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={scale >= 3}
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground disabled:opacity-40"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
                    title="Reset to 100%"
                    aria-label="Reset to 100%"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void handleCopy();
                  }}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-muted/60 px-2.5 text-xs font-medium text-muted-foreground hover:bg-card hover:text-foreground"
                  title="Copy Mermaid Code"
                  aria-label="Copy Mermaid Code"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="hidden sm:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span className="hidden sm:inline">Copy Code</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-muted/60 text-muted-foreground hover:bg-destructive/20 hover:text-destructive"
                  title="Close (Esc)"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Diagram Viewport */}
            <div
              className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
              }}
            >
              <div
                className="flex items-center justify-center transition-transform duration-150 ease-out origin-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-w-[92vw] [&>svg]:max-h-[84vh] [&>svg]:min-w-[min(1400px,90vw)] [&>svg]:drop-shadow-2xl"
                style={{ transform: `scale(${scale})` }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="group relative my-6 overflow-hidden border border-line bg-card/30 p-4 transition-all hover:border-line-strong">
      {/* Action Buttons on top right */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center gap-1 border border-line bg-background/90 px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur hover:bg-muted hover:text-foreground"
          title="Lihat Fullscreen"
          aria-label="Lihat Fullscreen"
        >
          <Maximize2 className="size-3" />
          <span className="hidden sm:inline">Full</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <pre
          ref={containerRef}
          className={`mermaid flex justify-center ${className ?? ""}`}
          suppressHydrationWarning
        >
          {code}
        </pre>
      </div>

      {modal}
    </div>
  );
}

