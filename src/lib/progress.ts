import { useCallback, useEffect, useState } from "react";
import { TOTAL_DAYS } from "@/data/days";

const STORAGE_KEY = "restore.progress.v1";

export type MemoryState = {
  /** consecutive days of successful no-clue recall */
  noClueStreak: number;
  /** consecutive successful days after Learned */
  retentionStreak: number;
  status: "learning" | "learned" | "mastered";
  lastPractisedDate: string | null;
};

export type ProgressState = {
  completed: number[];
  lastReadDate: string | null;
  readingStreak: number;
  bestReadingStreak: number;
  memoryStreak: number;
  bestMemoryStreak: number;
  lastMemoryDate: string | null;
  memory: Record<number, MemoryState>;
};

const empty: ProgressState = {
  completed: [],
  lastReadDate: null,
  readingStreak: 0,
  bestReadingStreak: 0,
  memoryStreak: 0,
  bestMemoryStreak: 0,
  lastMemoryDate: null,
  memory: {},
};

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

function nextStreak(last: string | null, current: number): number {
  const today = todayKey();
  if (last === today) return current;
  if (last === yesterdayKey()) return current + 1;
  return 1;
}

/** A streak is broken when the last activity was before yesterday. */
export function isStreakBroken(last: string | null, streak: number): boolean {
  if (!last || streak === 0) return false;
  return last !== todayKey() && last !== yesterdayKey();
}

export function liveStreak(last: string | null, streak: number): number {
  if (!last) return 0;
  if (last === todayKey() || last === yesterdayKey()) return streak;
  return 0;
}

// ---- tiny store so every component stays in sync ----

let state: ProgressState = empty;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...empty, ...(JSON.parse(raw) as ProgressState) };
  } catch {
    /* ignore corrupt storage */
  }
  emit();
}

function save(next: ProgressState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage may be unavailable */
  }
  emit();
}

export function useProgress() {
  const [snapshot, setSnapshot] = useState<ProgressState>(state);
  const [ready, setReady] = useState(hydrated);

  useEffect(() => {
    const sync = () => setSnapshot({ ...state });
    listeners.add(sync);
    load();
    setSnapshot({ ...state });
    setReady(true);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  const toggleDay = useCallback((day: number) => {
    const isDone = state.completed.includes(day);
    if (isDone) {
      save({ ...state, completed: state.completed.filter((d) => d !== day) });
      return;
    }
    const streak = nextStreak(state.lastReadDate, liveStreak(state.lastReadDate, state.readingStreak));
    save({
      ...state,
      completed: [...state.completed, day].sort((a, b) => a - b),
      lastReadDate: todayKey(),
      readingStreak: streak,
      bestReadingStreak: Math.max(state.bestReadingStreak, streak),
    });
  }, []);

  const recordMemorySuccess = useCallback((week: number, noClue: boolean) => {
    const prev: MemoryState =
      state.memory[week] ??
      ({
        noClueStreak: 0,
        retentionStreak: 0,
        status: "learning",
        lastPractisedDate: null,
      } satisfies MemoryState);

    const alreadyToday = prev.lastPractisedDate === todayKey();
    const continuing =
      prev.lastPractisedDate === yesterdayKey() || prev.lastPractisedDate === todayKey();

    const next: MemoryState = { ...prev, lastPractisedDate: todayKey() };

    if (!alreadyToday && noClue) {
      if (prev.status === "learning") {
        next.noClueStreak = continuing ? prev.noClueStreak + 1 : 1;
        if (next.noClueStreak >= 5) next.status = "learned";
      } else if (prev.status === "learned") {
        next.retentionStreak = continuing ? prev.retentionStreak + 1 : 1;
        if (next.retentionStreak >= 7) next.status = "mastered";
      } else {
        next.retentionStreak = continuing ? prev.retentionStreak + 1 : 1;
      }
    }

    const mStreak = nextStreak(
      state.lastMemoryDate,
      liveStreak(state.lastMemoryDate, state.memoryStreak),
    );

    save({
      ...state,
      memory: { ...state.memory, [week]: next },
      lastMemoryDate: todayKey(),
      memoryStreak: mStreak,
      bestMemoryStreak: Math.max(state.bestMemoryStreak, mStreak),
    });
  }, []);

  const resetAll = useCallback(() => save({ ...empty }), []);

  const completedCount = snapshot.completed.length;
  const nextUnread =
    Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).find(
      (d) => !snapshot.completed.includes(d),
    ) ?? TOTAL_DAYS;

  return {
    ready,
    ...snapshot,
    completedCount,
    percent: Math.round((completedCount / TOTAL_DAYS) * 100),
    nextUnread,
    isComplete: (day: number) => snapshot.completed.includes(day),
    readingStreakLive: liveStreak(snapshot.lastReadDate, snapshot.readingStreak),
    readingStreakBroken: isStreakBroken(snapshot.lastReadDate, snapshot.readingStreak),
    memoryStreakLive: liveStreak(snapshot.lastMemoryDate, snapshot.memoryStreak),
    memoryStreakBroken: isStreakBroken(snapshot.lastMemoryDate, snapshot.memoryStreak),
    toggleDay,
    recordMemorySuccess,
    resetAll,
  };
}

export const GRACE_COPY =
  "The streak has broken. God's grace hasn't. Today is a good day to begin again.";