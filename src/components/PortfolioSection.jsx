"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import GithubActivity from "./GithubActivity";
import TechStack from "./TechStack";

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
  const handleListenAlong = useCallback(() => {
    window.open("https://open.spotify.com/track/xxxxxxxx", "_blank");
  }, []);

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
            className="bg-zinc-900 p-6 rounded-lg"
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
            <div className="mt-4 w-full aspect-video overflow-hidden rounded">
              <img
                src="/images/dummy-image.jpg"
                alt="Recent Project screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Side Hustle */}
          <motion.div
            className="bg-zinc-900 p-6 rounded-lg"
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
            <div className="mt-4 w-full aspect-video overflow-hidden rounded">
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
            <div className="grid grid-cols-3 gap-4">
              {/* X Icon */}
              <motion.div
                className="
                  bg-zinc-900 rounded-lg 
                  flex items-center justify-center
                  aspect-square
                "
                variants={childVariants}
              >
                <a
                  href="https://x.com/yourhandle"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                >
                  <img
                    src="/icons/icons8-x.svg"
                    alt="X"
                    className="w-5 h-5 hover:opacity-80"
                  />
                </a>
              </motion.div>

              {/* GitHub Icon */}
              <motion.div
                className="
                  bg-zinc-900 rounded-lg 
                  flex items-center justify-center
                  aspect-square
                "
                variants={childVariants}
              >
                <a
                  href="https://github.com/yourprofile"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <img
                    src="/icons/github.svg"
                    alt="GitHub"
                    className="w-5 h-5 hover:opacity-80"
                  />
                </a>
              </motion.div>

              {/* LinkedIn Icon */}
              <motion.div
                className="
                  bg-zinc-900 rounded-lg 
                  flex items-center justify-center
                  aspect-square
                "
                variants={childVariants}
              >
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-5 hover:opacity-80"
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 2) SECOND ROW: Tech Stack (left) + GitHub (right) */}
        <div className="relative aspect-[16/5] w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
