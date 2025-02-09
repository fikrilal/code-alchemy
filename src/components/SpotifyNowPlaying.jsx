"use client";

import { useEffect, useState } from "react";

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    async function fetchSpotify() {
      console.log("🔄 Fetching currently playing track from API...");

      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();

        if (!res.ok) {
          console.error("❌ API Error:", data);
          return;
        }

        if (data && data.item) {
          console.log("✅ Track Found:", data.item);

          setTrack({
            name: data.item.name,
            artist: data.item.artists.map((artist) => artist.name).join(", "),
            albumImage: data.item.album.images[0].url,
            spotifyUrl: data.item.external_urls.spotify,
          });
        } else {
          console.log("🎵 No track currently playing.");
          setTrack(null);
        }
      } catch (error) {
        console.error("❌ Error fetching Spotify data:", error);
      }
    }

    // Initial fetch
    fetchSpotify();

    // Refresh every 60 seconds
    const interval = setInterval(fetchSpotify, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-1100 p-6 rounded-2xl border border-slate-900 h-full flex flex-col">
      {/* Header row with label and icon */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
          CURRENTLY PLAYING
        </p>
        <div className="bg-slate-1100 border border-slate-500 rounded-full flex items-center justify-center w-8 h-8">
          <img
            src="/icons/ic_spotify.svg"
            alt="Spotify Icon"
            className="w-4 h-4"
          />
        </div>
      </div>

      {/* Main content area with song info */}
      <div className="flex-grow flex items-center">
        {track ? (
          <div className="flex items-center gap-4">
            {/* Outer container with only a rounded border and inner padding */}
            <div className="relative w-16 h-16 rounded-full border border-slate-800 p-2">
              {/* Spinning album image */}
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={track.albumImage}
                  alt="Album Cover"
                  className="w-full h-full object-cover rounded-full animate-spin"
                  style={{ animationDuration: "10s" }}
                />
              </div>
              {/* Fixed center spindle (hole) */}
              {/* <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-zinc-900 rounded-full -translate-x-1/2 -translate-y-1/2"></div> */}
            </div>

            {/* Song details */}
            <div>
              <p className="text-md text-slate-200 font-medium">{track.name}</p>
              <p className="pt-1 text-sm text-slate-400">{track.artist}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Nothing playing right now</p>
        )}
      </div>

      {/* "Listen along" button at the bottom-right */}
      {track && (
        <div className="flex justify-end">
          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative overflow-hidden inline-flex items-center group
              text-xs font-medium text-slate-200 hover:text-slate-900 dark:hover:text-slate-900
              border border-slate-300 dark:border-slate-700 rounded-full bg-transparent
              px-4 py-2 transition transform-gpu duration-500 ease-out hover:scale-105 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 active:scale-95
            "
          >
            {/* Overlay for the hover effect */}
            <span
              className="
                absolute inset-0 bg-slate-100 dark:bg-slate-100 rounded-full
                transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100
              "
            ></span>
            {/* Content wrapper */}
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
