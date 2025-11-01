"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Variants } from "framer-motion";

type Props = { childVariants?: Variants };

const IconCards = ({ childVariants }: Props) => {
  const v: Variants = childVariants ?? {};
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* X Icon */}
      <motion.a
        href="https://x.com/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="X"
        className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex items-center justify-center aspect-square"
        variants={v}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image src="/icons/icons8-x.svg" alt="X" width={40} height={40} className="w-10 h-10" />
      </motion.a>

      {/* GitHub Icon */}
      <motion.a
        href="https://github.com/fikrilal"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex items-center justify-center aspect-square"
        variants={v}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image src="/icons/github.svg" alt="GitHub" width={40} height={40} className="w-10 h-10" />
      </motion.a>

      {/* LinkedIn Icon */}
      <motion.a
        href="https://www.linkedin.com/in/fikrilal/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex items-center justify-center aspect-square"
        variants={v}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image src="/icons/linkedin.svg" alt="LinkedIn" width={40} height={40} className="w-10 h-10" />
      </motion.a>
    </div>
  );
};

export default IconCards;
