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
      className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 text-slate-100"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Project */}
          <motion.div
            className="bg-slate-1100 p-6 rounded-2xl border border-slate-900"
            variants={childVariants}
          >
            <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">
              RECENT PROJECT
            </p>
            <h3 className="text-xl font-semibold mb-2">Tutor App Mobile</h3>
            <p className="text-sm text-slate-400">
              A full-stack application that enables users to save tweets to
              Notion via Telegram bot.
            </p>

            {/* 16:9 Image */}
            <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl">
              <img
                src="/images/dummy-image.jpg"
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
            <h3 className="text-xl font-semibold mb-2">Sila Mobile</h3>
            <p className="text-sm text-slate-400">
              A full-stack application that enables users to save tweets to
              Notion via Telegram bot.
            </p>

            {/* 16:9 Image */}
            <div className="mt-4 w-full aspect-[14/9] overflow-hidden rounded-xl">
              <img
                src="/images/dummy-image.jpg"
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
            className="flex flex-col gap-6 h-full"
            variants={childVariants}
          >
            {/* Currently Playing */}
            <SpotifyNowPlaying />

            {/* 3 icon-cards, each 1:1 aspect ratio */}
            <IconCards />
          </motion.div>
        </div>

        {/* 2) SECOND ROW: Tech Stack (left) + GitHub (right) */}
        <div className="relative w-full overflow-hidden rounded-lg lg:aspect-[15/5]">
          <div className="grid grid-cols-1 lg:absolute lg:inset-0 lg:grid-cols-2 gap-6">
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
