import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = Redis.fromEnv();
const KEY = "status-override";
const TONES = ["active", "busy", "inactive"];
const MAX_SECONDS = 7 * 24 * 3600;

type Override = {
  status: string;
  tone: "active" | "busy" | "inactive";
  expiresAt: number | null;
};

const noStore = { "Cache-Control": "no-store" };
const EMPTY = { status: null, tone: null, expiresAt: null };

// Manila has no daylight saving, so a fixed +8 offset is safe.
function manilaSecondsOfDay() {
  const m = new Date(Date.now() + 8 * 3600 * 1000);
  return m.getUTCHours() * 3600 + m.getUTCMinutes() * 60 + m.getUTCSeconds();
}

function secondsFromExpiry(expiry: any): number | null {
  if (!expiry || typeof expiry !== "object") return null;

  if (expiry.type === "minutes") {
    const v = Number(expiry.value);
    if (!Number.isFinite(v) || v <= 0) return null;
    return Math.min(Math.round(v * 60), MAX_SECONDS);
  }

  if (expiry.type === "today") {
    return 86400 - manilaSecondsOfDay();
  }

  if (expiry.type === "until" && /^\d{2}:\d{2}$/.test(expiry.time)) {
    const [h, m] = expiry.time.split(":").map(Number);
    if (h > 23 || m > 59) return null;
    let diff = h * 3600 + m * 60 - manilaSecondsOfDay();
    if (diff <= 0) diff += 86400; // time already passed today, so use tomorrow
    return diff;
  }

  return null; // "never" or anything else
}

export async function GET() {
  const data = await redis.get<Override>(KEY);
  if (!data || (data.expiresAt && data.expiresAt <= Date.now())) {
    return Response.json(EMPTY, { headers: noStore });
  }
  return Response.json(data, { headers: noStore });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  const text = typeof body.status === "string" ? body.status.trim().slice(0, 100) : "";
  if (!text) {
    await redis.del(KEY);
    return Response.json({ ok: true, cleared: true });
  }

  const tone = TONES.includes(body.tone) ? body.tone : "active";
  const seconds = secondsFromExpiry(body.expiry);

  const value: Override = {
    status: text,
    tone,
    expiresAt: seconds ? Date.now() + seconds * 1000 : null,
  };

  if (seconds) {
    await redis.set(KEY, value, { ex: seconds });
  } else {
    await redis.set(KEY, value);
  }
  return Response.json({ ok: true, ...value });
}