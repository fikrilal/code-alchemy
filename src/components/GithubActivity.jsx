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
      <div className="bg-zinc-800 rounded p-4 overflow-x-auto custom-scrollbar">
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

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
        /* Webkit-based browsers */
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }
      `}</style>
    </motion.div>
  );
}
