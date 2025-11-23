"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type SideHustle = {
  title: string;
  description: string;
  image: string;
  link?: string;
};

const hustles: SideHustle[] = [
  {
    title: "Quowrld.com",
    description:
      "A platform to write, share, and save quotes — beautifully organized by vibe.",
    image: "/images/side-project-thumbnail.png",
    link: "https://quowrld.com",
  },
  {
    title: "Pixelary Studio",
    description:
      "Micro-agency for brand systems, deck design, and iconography crafted for indie founders.",
    image: "/images/image1.png",
  },
  {
    title: "Mentor Hours",
    description:
      "Weekly sessions helping junior engineers level up Kotlin, Compose, and UX craft.",
    image: "/images/image2.png",
  },
];

const previewOffsets = [
  { x: -18, y: 22, rotate: -6, scale: 0.96 },
  { x: 18, y: 34, rotate: 5, scale: 0.94 },
  { x: 0, y: 46, rotate: -3, scale: 0.92 },
] as const;
type CardSlot = 0 | 1 | 2 | "hidden";

const getSlotForIndex = (index: number, order: number[]): CardSlot => {
  const position = order.indexOf(index);
  if (position === 0) return 0;
  if (position === 1) return 1;
  if (position === 2) return 2;
  return "hidden";
};

export default function SideHustleFlashCard() {
  const [order, setOrder] = useState<number[]>(() =>
    hustles.map((_, index) => index)
  );
  const [isStackVisible, setIsStackVisible] = useState(false);

  const totalItems = hustles.length;
  if (totalItems === 0) {
    return null;
  }

  const activeIndex = order[0] ?? 0;
  const maybeActiveItem = hustles[activeIndex] ?? hustles[0];

  if (!maybeActiveItem) {
    return null;
  }

  const activeItem: SideHustle = maybeActiveItem;

  const rotateNext = (current: number[]): number[] => {
    if (current.length <= 1) return current;
    const [first, ...rest] = current;
    if (first === undefined) return current;
    return [...rest, first];
  };

  const rotatePrevious = (current: number[]): number[] => {
    if (current.length <= 1) return current;
    const lastIndex = current.length - 1;
    const last = current[lastIndex];
    if (last === undefined) return current;
    return [last, ...current.slice(0, lastIndex)];
  };

  const goToPrevious = () => {
    setOrder((prev) => rotatePrevious(prev));
  };

  const goToNext = () => {
    setOrder((prev) => rotateNext(prev));
  };

  const setActiveByIndex = (targetIndex: number) => {
    setOrder((prev) => {
      if (!prev.length) return prev;
      if (prev[0] === targetIndex) return prev;

      const position = prev.indexOf(targetIndex);
      if (position === -1) {
        const baseOrder = hustles.map((_, index) => index);
        const targetPosition = baseOrder.indexOf(targetIndex);
        if (targetPosition <= 0) return baseOrder;
        return [
          ...baseOrder.slice(targetPosition),
          ...baseOrder.slice(0, targetPosition),
        ];
      }

      return [...prev.slice(position), ...prev.slice(0, position)];
    });
  };

  return (
    <div className="relative group">
      <div className="opacity-0 pointer-events-none" aria-hidden="true">
        <div className="bg-slate-1000 p-6 rounded-2xl border border-slate-800">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
              SIDE HUSTLE
            </p>
            <p className="text-xs font-mono text-slate-500 tracking-widest">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(totalItems).padStart(2, "0")}
            </p>
          </div>
          <h3 className="text-xl text-slate-100 font-semibold">
            {activeItem.title}
          </h3>
          <p className="text-sm sm:text-base md:text-base text-slate-300">
            {activeItem.description}
          </p>
          <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl relative">
            <Image
              src={activeItem.image}
              alt={`${activeItem.title} screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {hustles.map((item, index) => {
        const slot = getSlotForIndex(index, order);

        if (slot === "hidden") {
          return null;
        }

        const isFront = slot === 0;

        let animate;
        if (slot === 0) {
          animate = {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
          };
        } else {
          const offsetIndex = slot - 1;
          const offset = previewOffsets[offsetIndex];

          if (!offset) {
            return null;
          }

          animate = {
            x: offset.x,
            y: offset.y,
            rotate: offset.rotate,
            scale: offset.scale,
            opacity: isStackVisible ? 1 : 1,
          };
        }

        return (
          <motion.div
            key={item.title}
            className="absolute inset-0"
            style={{
              pointerEvents: isFront ? "auto" : "none",
              zIndex: slot === 0 ? 30 : slot === 1 ? 20 : 10,
            }}
            initial={false}
            animate={animate}
            drag={isFront ? "x" : false}
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 0 }}
            {...(isFront ? { whileDrag: { y: 32 } } : {})}
            onDragEnd={(_, info) => {
              if (!isFront) return;
              const swipeThreshold = 80;
              if (Math.abs(info.offset.x) > swipeThreshold) {
                goToNext();
              }
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div
              className={
                isFront
                  ? "relative z-10 bg-slate-1000 p-6 rounded-2xl border border-slate-800 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_rgba(3,5,14,0.65)]"
                  : "relative z-10 bg-slate-1000 p-6 rounded-2xl border border-slate-800 shadow-[0_18px_40px_rgba(3,5,14,0.6)]"
              }
            >
              <div className="mb-2 flex items-baseline justify-between">
                <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                  SIDE HUSTLE
                </p>
                <p className="text-xs font-mono text-slate-500 tracking-widest">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(totalItems).padStart(2, "0")}
                </p>
              </div>
              <h3 className="text-xl text-slate-100 font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base md:text-base text-slate-300">
                {item.description}
              </p>
              <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl relative">
                <Image
                  src={item.image}
                  alt={`${item.title} screenshot`}
                  fill
                  priority={isFront}
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
                {isFront && item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/25"
                  >
                    Visit
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
