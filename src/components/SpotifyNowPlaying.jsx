export const revalidate = 120; // ISR - Refresh every 120 seconds

export default async function SpotifyNowPlaying() {
  console.log("🔄 Fetching Spotify data with ISR...");

  const response = await fetch(
    "https://code-alchemy-gamma.vercel.app/api/spotify",
    { next: { revalidate: 120 } } // ✅ Enables ISR
  );

  if (!response.ok) {
    console.error(`❌ API Error: ${response.statusText}`);
    return <div>❌ No song playing or failed to load data.</div>;
  }

  const data = await response.json();
  if (!data || !data.item) {
    console.warn("⚠️ No track playing, showing fallback...");
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
    </div>
  );
}
