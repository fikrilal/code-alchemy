"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import GithubActivity from "./GithubActivity";
import TechStack from "./TechStack";
import IconCards from "./IconCards";

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

export default function PortfolioSection() {
  return (
    <motion.section
      className="w-full px-4 sm:px-6 lg:px-8 pt-20 text-slate-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* ─────────────────────────────────────────────
            1) FIRST ROW (3 columns)
               a) Recent Project
               b) Side Hustle
               c) Column with:
                  - Currently Playing
                  - 3 equally-sized icon cards
            ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Recent Project */}
          <motion.div
            className="bg-slate-1100 p-6 rounded-2xl border border-slate-900"
            variants={childVariants}
          >
            <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">
              RECENT PROJECT
            </p>
            <h3 className="text-xl text-slate-200 font-semibold mb-2">
              Math Tetris Game
            </h3>
            <p className="text-sm sm:text-base md:text-base text-slate-400">
              A fast-paced mobile game combining math puzzles with Tetris
              mechanics.
            </p>

            {/* 16:9 Image */}
            <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl">
              <img
                src="/images/recent-project-thumbnail.png"
                alt="Recent Project screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Side Hustle */}
          <motion.div
            className="bg-slate-1100 p-6 rounded-2xl border border-slate-900"
            variants={childVariants}
          >
            <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">
              SIDE HUSTLE
            </p>
            <h3 className="text-xl text-slate-200 font-semibold mb-2">
              Shebo Mobile
            </h3>
            <p className="text-sm sm:text-base md:text-base text-slate-400">
              An AI-powered digital bookshelf. It’s like social media, but for
              book lovers! :)
            </p>

            {/* 16:9 Image */}
            <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl">
              <img
                src="/images/side-project-thumbnail.png"
                alt="Side Hustle screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Third column (stack):
              1) Currently Playing (flex-1 => fills leftover vertical space)
              2) A row of 3 icon-cards (each aspect-square)
          */}
          <motion.div
            className="flex flex-col gap-4 h-full"
            variants={childVariants}
          >
            {/* Currently Playing */}
            <SpotifyNowPlaying />

            {/* 3 icon-cards, each 1:1 aspect ratio */}
            <IconCards />
          </motion.div>
        </div>

        {/* 2) SECOND ROW: Tech Stack (left) + GitHub (right) */}
        <div className="relative w-full overflow-hidden rounded-lg xl:aspect-[15/5]">
          <div className="grid grid-cols-1 xl:absolute xl:inset-0 xl:grid-cols-2 gap-4">
            {/* Tech Stack */}
            <TechStack />
            {/* GitHub Activity */}
            <GithubActivity />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
