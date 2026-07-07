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
      <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background">
        <Clock3Icon className="size-4" aria-hidden />
      </div>
      <p className="text-balance text-foreground">
        {time}
        <span className="text-muted-foreground"> local time</span>
      </p>
    </div>
  );
}