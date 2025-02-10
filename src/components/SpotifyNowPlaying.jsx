"use client"; // ✅ Makes this a Client Component

import { useEffect, useState } from "react";

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        console.log("🔄 Fetching Spotify data...");
        const response = await fetch(
          "https://code-alchemy-gamma.vercel.app/api/spotify"
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("✅ Fetched Spotify Data:", result);

        if (!result || !result.item) {
          setError(true);
          return;
        }

        setData(result);
        setError(false);
      } catch (err) {
        console.error("❌ Error fetching Spotify data:", err);
        setError(true);
      }
    }

    fetchSpotify(); // Initial Fetch
    const interval = setInterval(fetchSpotify, 120000); // ⏳ Refresh every 2 minutes

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  if (error || !data) {
    return <div>❌ No song playing or failed to load data.</div>;
  }

  return (
    <div className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
          {data.last_played ? "LAST PLAYED" : "CURRENTLY PLAYING"}
        </p>
        <div className="bg-slate-1100 border border-slate-500 rounded-full flex items-center justify-center w-8 h-8">
          <img
            src="/icons/ic_spotify.svg"
            alt="Spotify Icon"
            className="w-4 h-4"
          />
        </div>
      </div>

      <div className="flex-grow flex items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-none rounded-full border border-slate-800 p-2">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={data.item.album.images[0].url}
                alt="Album Cover"
                className="w-full h-full object-cover rounded-full animate-spin"
                style={{ animationDuration: "10s" }}
              />
            </div>
          </div>

          <div>
            <p className="text-md text-slate-200 font-medium">
              {data.item.name}
            </p>
            <p className="pt-1 text-sm text-slate-400">
              {data.item.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {data.item && (
        <div className="flex justify-end">
          <a
            href={data.item.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center group
              text-xs font-medium text-slate-200 hover:text-slate-900 dark:hover:text-slate-900
              border border-slate-300 dark:border-slate-700 rounded-full bg-transparent
              px-4 py-2 transition transform-gpu duration-500 ease-out hover:scale-105 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 active:scale-95"
          >
            <span
              className="absolute inset-0 bg-slate-100 dark:bg-slate-100 rounded-full
                transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
            ></span>
            <span className="relative z-10 inline-flex items-center">
              Listen along
              <span className="px-2 ml-1 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.64121 9.85889L9.35872 3.14138M9.35872 3.14138L9.35872 8.09113M9.35872 3.14138L4.40898 3.14138"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
