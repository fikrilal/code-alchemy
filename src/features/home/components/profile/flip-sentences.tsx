"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FlipSentences({
  sentences,
  className,
}: {
  sentences: readonly string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sentences.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % sentences.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [sentences]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={sentences[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="font-mono text-sm text-balance text-slate-300"
        >
          {sentences[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}