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
      <h3 className="text-xl text-slate-200 font-semibold mb-2">
        Technologies I’m Proficient In
      </h3>
      <p className="text-sm sm:text-base md:text-base text-slate-400">
        Flutter powers most of my projects—occasionally spiced up with a bit of
        Kotlin or Compose for fun.
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
        {/* GetX */}
        <motion.div
          className="bg-zinc-900 rounded-lg flex items-center justify-center p-4 relative group"
          variants={childVariants}
        >
          <img src="/icons/ic_getx.svg" alt="GetX" className="h-8 w-auto" />
          {/* Tooltip: appears above the icon */}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 bg-black/60 rounded px-2 py-1 pointer-events-none">
            GetX
          </span>
        </motion.div>

        {/* BLOC */}
        <motion.div
          className="bg-zinc-900 rounded-lg flex items-center justify-center p-2 relative group"
          variants={childVariants}
        >
          <img src="/icons/ic_bloc.svg" alt="BLOC" className="h-10 w-auto" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 bg-black/60 rounded px-2 py-1 pointer-events-none">
            BLOC
          </span>
        </motion.div>

        {/* Riverpod */}
        <motion.div
          className="bg-zinc-900 rounded-lg flex items-center justify-center p-4 relative group"
          variants={childVariants}
        >
          <img
            src="/icons/ic_riverpod.svg"
            alt="Riverpod"
            className="h-8 w-auto"
          />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 bg-black/60 rounded px-2 py-1 pointer-events-none">
            Riverpod
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
