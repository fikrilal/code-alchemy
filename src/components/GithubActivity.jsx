"use client";

import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import useSWR from "swr";
import { useState, useEffect } from "react";

// Custom hook to detect mobile screens
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Adjust the breakpoint as needed (here it's 768px)
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

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
  const isMobile = useIsMobile();
  // Fetch real GitHub stats from our API route
  const { data: stats, error } = useSWR("/api/githubStats", fetcher);

  return (
    <motion.div
      className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 shadow-lg flex flex-col h-full"
      variants={childVariants}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
          GITHUB ACTIVITY
        </p>
        <a
          href="https://github.com/fikrilal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-500 hover:underline"
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
          hideTotalCount={isMobile}
          hideColorLegend={false}
          theme={{
            dark: ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"],
          }}
        />
      </div>

      {/* Additional Stats Section */}
      <div className="mt-6 lg:mt-4 grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 rounded-lg p-4 rounded text-center">
          <p className="text-xs text-slate-400">Last Commit</p>
          <p className="text-lg text-slate-200 mt-2">
            {stats ? stats.lastCommitDate : "Loading..."}
          </p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-4 rounded text-center">
          <p className="text-xs text-slate-400">Longest Streak</p>
          <p className="text-lg  text-slate-200 mt-2">
            {stats ? `${stats.longestStreak} days` : "Loading..."}
          </p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-4 rounded text-center">
          <p className="text-xs text-slate-400 break-words">
            Total Contributions
          </p>
          <p className="text-lg text-slate-200 mt-2">
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
