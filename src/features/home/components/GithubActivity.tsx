"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";

import type { Variants } from "framer-motion";

const MOBILE_MEDIA_QUERY = "(max-width: 768px)";

function subscribeToMobileChanges(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobileSnapshot(): boolean {
  return typeof window !== "undefined"
    ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
    : false;
}

function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribeToMobileChanges,
    getMobileSnapshot,
    () => false
  );
}

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[132px] min-w-[720px] rounded-xl border border-slate-700/60 bg-slate-900/60"
      />
    ),
  }
);

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

type Stats = {
  lastCommitDate: string;
  longestStreak: number;
  totalContributions: number;
};

const fetcher = async (url: string): Promise<Stats | null> => {
  const res = await fetch(url);

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub stats");
  }

  return (await res.json()) as Stats;
};

export default function GithubActivity() {
  const isMobile = useIsMobile();
  const { data: stats } = useSWR<Stats | null>("/api/githubStats", fetcher);
  const lastCommitLabel =
    stats === null ? "Unavailable" : stats?.lastCommitDate ?? "Loading...";
  const longestStreakLabel =
    stats === null
      ? "Unavailable"
      : stats
        ? `${stats.longestStreak} days`
        : "Loading...";
  const contributionsLabel =
    stats === null ? "Unavailable" : stats?.totalContributions ?? "Loading...";

  return (
    <motion.div
      className="bg-slate-1100 p-6 rounded-2xl border border-slate-600 shadow-lg flex flex-col h-full"
      variants={childVariants}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs font-mono text-slate-400 tracking-widest uppercase">
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
          showTotalCount={!isMobile}
          showColorLegend
          theme={{
            dark: ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"],
          }}
        />
      </div>

      {/* Additional Stats Section */}
      <div className="mt-6 lg:mt-4 grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 rounded text-center">
          <p className="text-xs text-slate-400 font-mono">Last Commit</p>
          <p className="text-lg text-slate-200 mt-2">{lastCommitLabel}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 rounded text-center">
          <p className="text-xs text-slate-400 font-mono">Longest Streak</p>
          <p className="text-lg  text-slate-200 mt-2">{longestStreakLabel}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 rounded text-center">
          <p className="text-xs text-slate-400 wrap-break-word font-mono">
            Contributions
          </p>
          <p className="text-lg text-slate-200 mt-2">{contributionsLabel}</p>
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
