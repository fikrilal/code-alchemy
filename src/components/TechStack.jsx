"use client";
import { motion } from "framer-motion";

// Parent fade/sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Child fade+slide
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function TechStack() {
  return (
    <motion.div
      className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 flex flex-col h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header / Intro */}
      <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">
        MOBILE TECH STACK
      </p>
      <h3 className="text-xl font-semibold mb-2">
        Tech stacks I’m familiar with
      </h3>
      <p className="text-sm text-slate-400">
        Primarily focused on the JavaScript ecosystem, but always eager to
        explore and learn new technologies.
      </p>

      {/* 
        TOP ROW: 
        Fill the remaining vertical space (flex-1), 
        3 columns across, each item automatically stretches to fill height.
      */}
      <div className="flex-1 mt-6">
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Flutter */}
          <motion.div
            className="bg-zinc-900 rounded-lg flex flex-col items-center justify-center p-4"
            variants={childVariants}
          >
            <img
              src="/icons/ic_flutter.svg"
              alt="Flutter"
              className="h-8 w-auto"
            />
            <p className="mt-6 text-sm text-slate-100">Flutter</p>
          </motion.div>

          {/* Kotlin */}
          <motion.div
            className="bg-zinc-900 rounded-lg rounded flex flex-col items-center justify-center p-4"
            variants={childVariants}
          >
            <img
              src="/icons/ic_kotlin.svg"
              alt="Kotlin"
              className="h-8 w-auto"
            />
            <p className="mt-6 text-sm text-slate-100">Kotlin</p>
          </motion.div>

          {/* Compose */}
          <motion.div
            className="bg-zinc-900 rounded-lg rounded flex flex-col items-center justify-center p-4"
            variants={childVariants}
          >
            <img
              src="/icons/ic_compose.svg"
              alt="Compose"
              className="h-8 w-auto"
            />
            <p className="mt-6 text-sm text-slate-100">Compose</p>
          </motion.div>
        </div>
      </div>

      {/* 
        BOTTOM ROW: 
        Just 3 “icon-only” cards, no flex-1. 
        They expand horizontally but only as tall as their content. 
      */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Next.js */}
        <motion.div
          className="bg-zinc-900 rounded-lg rounded flex items-center justify-center p-4"
          variants={childVariants}
        >
          <img src="/icons/ic_getx.svg" alt="Next.js" className="h-8 w-auto" />
        </motion.div>

        {/* Node.js */}
        <motion.div
          className="bg-zinc-900 rounded-lg rounded flex items-center justify-center p-2"
          variants={childVariants}
        >
          <img src="/icons/ic_bloc.svg" alt="Node.js" className="h-10 w-auto" />
        </motion.div>

        {/* React */}
        <motion.div
          className="bg-zinc-900 rounded-lg rounded flex items-center justify-center p-4"
          variants={childVariants}
        >
          <img
            src="/icons/ic_riverpod.svg"
            alt="React"
            className="h-8 w-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
