"use client";

import { useEffect, useState } from "react";
import { TZ, TONE_COLORS, getScheduleStatus, type Tone } from "@/lib/schedule";

type Override = {
  status: string | null;
  tone: Tone | null;
  expiresAt: number | null;
};

export default function StatusClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [override, setOverride] = useState<Override>({
    status: null,
    tone: null,
    expiresAt: null,
  });

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const load = () =>
      fetch("/api/status", { cache: "no-store" })
        .then((r) => r.json())
        .then(setOverride)
        .catch(() => {});
    load();
    const poll = setInterval(load, 30_000);
    return () => clearInterval(poll);
  }, []);

  if (!now) return null;

  const overrideActive =
    override.status &&
    (!override.expiresAt || override.expiresAt > now.getTime());

  const current =
    overrideActive && override.status
      ? { status: override.status, tone: (override.tone ?? "active") as Tone }
      : getScheduleStatus(now);

  const time = now.toLocaleTimeString("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex justify-between gap-2 text-sm text-zinc-400 my-4 mb-8 ">
      
      <p className="flex items-center px-3 py-2 gap-1.5 border-zinc-700 bg-zinc-800 border rounded-full">
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: TONE_COLORS[current.tone],
          }}
        />
        <span className="font-bold text-white">{current.status}</span>{" "}
      </p>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-mono text-right" >Manila time</p>
        <p className="font-mono font-bold text-white">{time}</p>
      </div>
    </div>
  );
}
