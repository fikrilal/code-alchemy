"use client";

import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import useSWR from "swr";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GithubActivity() {
  // Fetch real GitHub stats from our API route
  const { data: stats, error } = useSWR("/api/githubStats", fetcher);

  return (
    <motion.div
      className="bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col h-full"
      variants={childVariants}
    >
      {/* Header row */}
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

      {/* Calendar container */}
      <div className="overflow-auto custom-scrollbar flex-1">
        <GitHubCalendar
          username="fikrilal"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          hideColorLegend={false} // Ensure the legend is shown
          theme={{
            dark: ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"],
          }}
        />
      </div>

      {/* Additional Stats Section */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-4 rounded text-center">
          <p className="text-xs text-gray-400">Last Commit</p>
          <p className="text-lg text-white">
            {stats ? stats.lastCommitDate : "Loading..."}
          </p>
        </div>
        <div className="bg-zinc-800 p-4 rounded text-center">
          <p className="text-xs text-gray-400">Longest Streak</p>
          <p className="text-lg text-white">
            {stats ? `${stats.longestStreak} days` : "Loading..."}
          </p>
        </div>
        <div className="bg-zinc-800 p-4 rounded text-center">
          <p className="text-xs text-gray-400">Total Contributions</p>
          <p className="text-lg text-white">
            {stats ? stats.totalContributions : "Loading..."}
          </p>
        </div>
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
