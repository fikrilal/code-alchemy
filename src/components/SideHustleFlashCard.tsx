"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SideHustle = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  link?: string;
};

const hustles: SideHustle[] = [
  {
    title: "Quowrld.com",
    tagline: "Quote Studio",
    description: "A platform to write, share, and save quotes — beautifully organized by vibe.",
    image: "/images/side-project-thumbnail.png",
    link: "https://quowrld.com",
  },
  {
    title: "Pixelary Studio",
    tagline: "Design Lab",
    description: "Micro-agency for brand systems, deck design, and iconography crafted for indie founders.",
    image: "/images/image1.png",
  },
  {
    title: "Mentor Hours",
    tagline: "1:1 Mentorship",
    description: "Weekly sessions helping junior engineers level up Kotlin, Compose, and UX craft.",
    image: "/images/image2.png",
  },
];

const previewOffsets = [
  { x: -18, y: 22, rotate: -6, scale: 0.96 },
  { x: 18, y: 34, rotate: 5, scale: 0.94 },
  { x: 0, y: 46, rotate: -3, scale: 0.92 },
] as const;

export default function SideHustleFlashCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isStackVisible, setIsStackVisible] = useState(false);

  const active = hustles[activeIndex] ?? hustles[0];
  if (!active) return null;

  const totalItems = hustles.length;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const stackItems = hustles
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item.index !== activeIndex)
    .slice(0, previewOffsets.length);

  return (
    <div
      className="relative group"
      onPointerEnter={() => setIsStackVisible(true)}
      onPointerLeave={() => setIsStackVisible(false)}
    >
      {stackItems.map((item, idx) => {
        const offset = previewOffsets[idx];

        if (!offset) {
          return null;
        }

        return (
          <motion.div
            key={`${item.title}-${item.index}`}
            className="absolute inset-0 hidden sm:block"
            style={{ pointerEvents: "none", zIndex: idx }}
            initial={false}
            animate={
              isStackVisible
                ? {
                    opacity: 1,
                    x: offset.x,
                    y: offset.y,
                    rotate: offset.rotate,
                    scale: offset.scale,
                  }
                : {
                    opacity: 0,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 0.9,
                  }
            }
            transition={{ duration: 0.28, ease: "easeOut", delay: idx * 0.04 }}
          >
            <div className="h-full rounded-2xl border border-slate-900 bg-slate-1100 p-6 text-slate-200 shadow-[0_20px_45px_rgba(3,5,14,0.65)]">
              <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">SIDE HUSTLE</p>
              <div className="flex items-baseline gap-3 justify-between">
                <div>
                  <h3 className="text-xl text-slate-200 font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.tagline}</p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-800 text-slate-400">
                  {String(item.index + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-3 line-clamp-3">{item.description}</p>
              <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl relative">
                <Image
                  src={item.image}
                  alt={`${item.title} screenshot`}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        className="relative z-10 bg-slate-1100 p-6 rounded-2xl border border-slate-900 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_rgba(3,5,14,0.65)]"
        layout
      >
        <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">SIDE HUSTLE</p>
        <div className="flex items-baseline gap-3 justify-between">
          <div>
            <h3 className="text-xl text-slate-200 font-semibold mb-1">{active.title}</h3>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{active.tagline}</p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous side hustle"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors"
            >
              <span className="sr-only">Previous</span>
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path
                  d="M6.5 2L3.5 5L6.5 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-800 text-slate-400">
              {String(activeIndex + 1).padStart(2, "0")} / {String(hustles.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next side hustle"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors"
            >
              <span className="sr-only">Next</span>
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path
                  d="M3.5 2L6.5 5L3.5 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm sm:text-base md:text-base text-slate-400 mt-3">{active.description}</p>
            <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl relative">
              <Image
                src={active.image}
                alt={`${active.title} screenshot`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
              {active.link ? (
                <a
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/25"
                >
                  Visit
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.64121 9.85889L9.35872 3.14138M9.35872 3.14138L9.35872 8.09113M9.35872 3.14138L4.40898 3.14138"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
        {hustles.map((item, idx) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-pressed={idx === activeIndex}
            className={`text-[11px] px-2 py-1 rounded-full border ${
              idx === activeIndex ? "border-white/40 text-white" : "border-slate-700 text-slate-400"
            }`}
          >
            {item.tagline}
          </button>
        ))}
      </div>
    </div>
  );
}
