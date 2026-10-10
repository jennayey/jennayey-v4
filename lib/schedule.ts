export const TZ = "Asia/Manila";

export type Tone = "active" | "busy" | "inactive";

// green = active, red = busy, gray = inactive
export const TONE_COLORS: Record<Tone, string> = {
  active: "#22c55e",
  busy: "#ef4444",
  inactive: "#9ca3af",
};

type Block = {
  days: number[];
  start: string;
  end: string;
  status: string;
  tone: Tone;
};

// days: 0 = Sunday ... 6 = Saturday. End time is exclusive. Blocks must not cross midnight.
const WEEKDAYS = [1, 2, 3, 4, 5];
const WEEKEND = [0, 6];
const ALL = [0, 1, 2, 3, 4, 5, 6];

export const SCHEDULE: Block[] = [
  { days: ALL, start: "00:00", end: "07:00", status: "Sleeping", tone: "inactive" },
  { days: ALL, start: "07:00", end: "09:00", status: "Getting ready", tone: "active" },
  { days: WEEKDAYS, start: "09:00", end: "12:00", status: "At work", tone: "active" },
  { days: WEEKDAYS, start: "12:00", end: "13:00", status: "Lunch break", tone: "active" },
  { days: WEEKDAYS, start: "13:00", end: "18:00", status: "At work", tone: "active" },
  { days: WEEKDAYS, start: "18:00", end: "23:00", status: "Maybe outside?", tone: "active" },
  { days: WEEKEND, start: "09:00", end: "23:00", status: "Weekend mode", tone: "active" },
  { days: ALL, start: "23:00", end: "24:00", status: "Trying to sleep", tone: "inactive" },
];

const FALLBACK: { status: string; tone: Tone } = { status: "Away", tone: "inactive" };

const DAY_MAP: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function getScheduleStatus(now: Date): { status: string; tone: Tone } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  const day = DAY_MAP[get("weekday")];
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  const block = SCHEDULE.find(
    (b) =>
      b.days.includes(day) &&
      minutes >= toMinutes(b.start) &&
      minutes < toMinutes(b.end)
  );
  return block ? { status: block.status, tone: block.tone } : FALLBACK;
}