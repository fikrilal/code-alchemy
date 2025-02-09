"use client";

import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function GithubActivity() {
  return (
    <motion.div
      className="bg-zinc-900 p-6 rounded-lg shadow-lg"
      variants={childVariants}
    >
      {/* Header row: label on the left and View Profile on the right */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
          GITHUB ACTIVITY
        </p>
        <a
          href="https://github.com/fikrilal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-400 hover:underline"
        >
          View Profile
        </a>
      </div>
      <div
        className="bg-zinc-800 rounded p-4 overflow-x-auto 
                   scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800"
      >
        <GitHubCalendar
          username="fikrilal"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          theme={{
            dark: ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"],
          }}
        />
      </div>
    </motion.div>
  );
}
