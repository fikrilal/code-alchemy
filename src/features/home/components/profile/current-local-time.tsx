"use client";

import { Clock3Icon } from "lucide-react";
import { useEffect, useState } from "react";

function formatLocalTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date());
}

export function CurrentLocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState(() => formatLocalTime(timeZone));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatLocalTime(timeZone));
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [timeZone]);

  return (
    <div className="flex items-center gap-4 font-mono text-sm">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-slate-600/40 bg-slate-900 text-slate-400 ring-1 ring-line ring-offset-1 ring-offset-darkbg">
        <Clock3Icon className="size-4" aria-hidden />
      </div>
      <p className="text-balance text-slate-200">
        {time}
        <span className="text-slate-400"> local time</span>
      </p>
    </div>
  );
}