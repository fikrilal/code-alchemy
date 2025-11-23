"use client";

import { motion } from "framer-motion";

import type { Variants } from "framer-motion";

export default function QuoteSection({
  containerVariants,
  childVariants,
}: {
  containerVariants?: Variants;
  childVariants?: Variants;
}) {
  const v = (containerVariants ?? {}) as Variants;
  const c = (childVariants ?? {}) as Variants;
  return (
    <motion.section
      className="container mx-auto px-6 lg:px-12 py-12 lg:py-20"
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="relative max-w-3xl mx-auto group" variants={c}>
        <div className="absolute -left-6 top-0 h-full w-1 bg-green-400 rounded-full opacity-20 transition-opacity group-hover:opacity-40"></div>

        <div className="pl-8">
          <blockquote className="text-2xl md:text-3xl leading-[1.6] md:leading-[1.5] font-medium text-slate-300 italic relative">
            <span className="absolute -left-8 -top-4 text-7xl text-green-400 opacity-25 select-none">
              “
            </span>
            <p className="relative z-10">
              In code as in life—build with purpose, design with care, and
              always leave room for creativity.
            </p>
            <span className="absolute -right-4 -bottom-8 text-7xl text-green-400 opacity-25 select-none transform rotate-180">
              “
            </span>
          </blockquote>
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-green-500/20 via-green-400/40 to-green-500/20 transition-all group-hover:via-green-500/60"></div>
      </motion.div>
    </motion.section>
  );
}
