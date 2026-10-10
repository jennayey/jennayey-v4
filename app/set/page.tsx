"use client";

import { useEffect, useState } from "react";
import { TONE_COLORS, type Tone } from "@/lib/schedule";
import Link from "next/link";

const PRESETS: { label: string; tone: Tone }[] = [
  { label: "At work", tone: "active" },
  { label: "Out for lunch", tone: "active" },
  { label: "In a meeting", tone: "busy" },
  { label: "Deep work, replying later", tone: "busy" },
  { label: "On leave", tone: "active" },
  { label: "Sleeping", tone: "inactive" },
  { label: "Offline", tone: "inactive" },
];

const TONES: { value: Tone; label: string }[] = [
  { value: "active", label: "Active (green)" },
  { value: "busy", label: "Busy (red)" },
  { value: "inactive", label: "Inactive (gray)" },
];

type Override = {
  status: string | null;
  tone: Tone | null;
  expiresAt: number | null;
};

type Mode = "duration" | "until" | "today" | "never";

function Dot({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: TONE_COLORS[tone],
        marginRight: 6,
      }}
    />
  );
}

export default function AdminPanel() {
  const [status, setStatus] = useState("");
  const [tone, setTone] = useState<Tone>("active");
  const [mode, setMode] = useState<Mode>("duration");
  const [amount, setAmount] = useState("1");
  const [unit, setUnit] = useState<"minutes" | "hours">("hours");
  const [time, setTime] = useState("13:00");
  const [password, setPassword] = useState("");
  const [current, setCurrent] = useState<Override>({
    status: null,
    tone: null,
    expiresAt: null,
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadCurrent() {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      setCurrent(await res.json());
    } catch {}
  }

  useEffect(() => {
    loadCurrent();
    try {
      const saved = localStorage.getItem("admin-pw");
      if (saved) setPassword(saved);
    } catch {}
  }, []);

  function buildExpiry() {
    if (mode === "duration") {
      const n = Number(amount);
      return { type: "minutes", value: unit === "hours" ? n * 60 : n };
    }
    if (mode === "until") return { type: "until", time };
    if (mode === "today") return { type: "today" };
    return { type: "never" };
  }

  const durationInvalid = mode === "duration" && !(Number(amount) > 0);
  const untilInvalid = mode === "until" && !time;

  async function save(value: string) {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: value,
          tone,
          password,
          expiry: buildExpiry(),
        }),
      });
      if (res.ok) {
        try {
          localStorage.setItem("admin-pw", password);
        } catch {}
        setMessage(value.trim() ? "Override saved" : "Back to automatic schedule");
        loadCurrent();
      } else {
        setMessage("Wrong password or error");
      }
    } finally {
      setSaving(false);
    }
  }

  const until = current.expiresAt
    ? new Date(current.expiresAt).toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <main
    className="max-w-xl grid gap-3 p-6 text-white" >
      <Link href="/" className="p-3 text-sm mb-8 text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800 w-fit">
        ← Back to main page
      </Link>
      <p>
        Live override:{" "}
        {current.status ? (
          <strong>
            <Dot tone={current.tone ?? "active"} />
            {current.status}
            {until ? ` (until ${until})` : " (no expiry)"}
          </strong>
        ) : (
          <strong>None, following schedule</strong>
        )}
      </p>

      <input
             className="p-3 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800"

        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStatus(p.label);
              setTone(p.tone);
            }}
          >
            <Dot tone={p.tone} />
            {p.label}
          </button>
        ))}
      </div>

      <input
       className="p-3 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800"
        placeholder="Type a custom status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <label>
        Dot color:{" "}
        <select  className="p-3 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800 " value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
          {TONES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <Dot tone={tone} />
      </label>

      <label>
        Expires:{" "}
        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}  className="p-3 text-sm mb-8 text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800 ">
          <option value="duration">After a duration</option>
          <option value="until">At a specific time (Manila)</option>
          <option value="today">End of today</option>
          <option value="never">Never, until I clear it</option>
        </select>
      </label>

      {mode === "duration" && (
        <div style={{ display: "flex", gap: 8 }}>
          <input
           className="p-3 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800 "
            type="number"
            min="1"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
           className="p-3 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800 "
            value={unit}
            onChange={(e) => setUnit(e.target.value as "minutes" | "hours")}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
        </div>
      )}

      {mode === "until" && (
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <button
         className="bg-yellow-500 text-zinc-900 px-3 border-1 border-dashed border-zinc-600 shadow-xs hover:border-yellow-500 hover:bg-yellow-500 hover:text-zinc-800 dark:hover:bg-yellow-500/20"
          onClick={() => save(status)}
          disabled={saving || !status.trim() || durationInvalid || untilInvalid}
        >
          Set override
        </button>
        <button
         className="p-3 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded-full hover:bg-zinc-800 "
          onClick={() => {
            setStatus("");
            save("");
          }}
          disabled={saving}
        >
          Clear override
        </button>
      </div>

      <p>{message}</p>
    </main>
  );
}