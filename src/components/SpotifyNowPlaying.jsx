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

    // Initial Fetch
    fetchSpotify();

    // Refresh every 60 seconds
    const interval = setInterval(fetchSpotify, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <p className="text-xs font-mono text-slate-500 tracking-widest mb-2 uppercase">
        CURRENTLY PLAYING
      </p>
      {track ? (
        <div className="flex items-center gap-4">
          <img
            src={track.albumImage}
            alt="Album Cover"
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="text-sm font-medium">{track.name}</p>
            <p className="text-xs text-slate-400">{track.artist}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400">Nothing playing right now</p>
      )}
      {track && (
        <a
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-400 hover:underline mt-auto"
        >
          Listen along &rarr;
        </a>
      )}
    </div>
  );
}
