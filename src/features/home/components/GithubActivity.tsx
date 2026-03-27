"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import useSWR from "swr";

import { fetchInternalApiData } from "@/features/home/lib/fetchInternalApiData";
import {
  GithubStatsApiResponseSchema,
  type GithubStats,
} from "@/lib/github-contract";

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

const fetcher = async (url: string): Promise<GithubStats | null> => {
  return fetchInternalApiData(url, GithubStatsApiResponseSchema);
};

export default function GithubActivity() {
  const isMobile = useIsMobile();
  const { data: stats, error } = useSWR<GithubStats | null>(
    "/api/githubStats",
    fetcher
  );
  const isLoading = typeof stats === "undefined" && !error;
  const isUnavailable = stats === null || Boolean(error);
  const lastContributionLabel =
    isLoading
      ? "Loading..."
      : isUnavailable
      ? "Unavailable"
      : stats?.lastContributionDate ?? "Unavailable";
  const longestStreakLabel =
    isLoading
      ? "Loading..."
      : isUnavailable
      ? "Unavailable"
      : stats
        ? `${stats.longestStreak} days`
        : "Unavailable";
  const contributionsLabel =
    isLoading
      ? "Loading..."
      : isUnavailable
      ? "Unavailable"
      : stats?.lifetimeContributions ?? "Unavailable";

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
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-4">
        <div className="grid min-h-0 grid-rows-[2.4rem_auto] rounded-lg border border-slate-700 bg-slate-900 p-4 text-center sm:grid-rows-[2.6rem_auto]">
          <p className="font-mono text-[11px] leading-5 text-slate-400 sm:text-xs">
            Latest Contribution
          </p>
          <p className="mt-1 text-base text-slate-200 sm:text-lg">
            {lastContributionLabel}
          </p>
        </div>
        <div className="grid min-h-0 grid-rows-[2.4rem_auto] rounded-lg border border-slate-700 bg-slate-900 p-4 text-center sm:grid-rows-[2.6rem_auto]">
          <p className="font-mono text-[11px] leading-5 text-slate-400 sm:text-xs">
            Longest Streak
          </p>
          <p className="mt-1 text-base text-slate-200 sm:text-lg">
            {longestStreakLabel}
          </p>
        </div>
        <div className="grid min-h-0 grid-rows-[2.4rem_auto] rounded-lg border border-slate-700 bg-slate-900 p-4 text-center sm:grid-rows-[2.6rem_auto]">
          <p className="font-mono text-[11px] leading-5 text-slate-400 sm:text-xs">
            Lifetime Contributions
          </p>
          <p className="mt-1 text-base text-slate-200 sm:text-lg">
            {contributionsLabel}
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
