import { useMemo, useState } from "react";
import { useProgress, todayKey } from "@/lib/progress";
import { practiceText, type MemoryVerse } from "@/data/memoryVerses";

const STEP = 3;

type Token = { lead: string; core: string; tail: string };

/** Split a raw word into leading punctuation, the lexical core, and trailing punctuation. */
function tokenise(raw: string): Token {
  const m = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u.exec(raw);
  if (!m) return { lead: "", core: raw, tail: "" };
  return { lead: m[1] ?? "", core: m[2] ?? "", tail: m[3] ?? "" };
}

/**
 * Deterministic hide order for the lexical words of a verse.
 * Stable for a given week, so hidden words accumulate and never reshuffle.
 */
function hideOrder(indexes: number[], seed: number): number[] {
  return [...indexes].sort((a, b) => {
    const ka = ((a + 1) * 9301 + seed * 49297) % 233280;
    const kb = ((b + 1) * 9301 + seed * 49297) % 233280;
    return ka - kb || a - b;
  });
}

export function MemoryVerseCard({ verse }: { verse: MemoryVerse }) {
  const p = useProgress();
  const [hiddenCount, setHiddenCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const { text: verseText } = practiceText(verse);
  const tokens = useMemo<Token[]>(
    () => verseText.split(/\s+/).filter(Boolean).map(tokenise),
    [verseText],
  );
  const lexical = useMemo(
    () => tokens.map((t, i) => (t.core ? i : -1)).filter((i) => i >= 0),
    [tokens],
  );
  const order = useMemo(() => hideOrder(lexical, verse.week), [lexical, verse.week]);
  const total = order.length;
  const hidden = useMemo(() => new Set(order.slice(0, hiddenCount)), [order, hiddenCount]);

  const state = p.memory[verse.week];
  const status = state?.status ?? "learning";
  const doneToday = state?.lastPractisedDate === todayKey();
  const allHidden = hiddenCount >= total;

  const gotItRight = () => {
    if (allHidden) {
      p.recordMemorySuccess(verse.week, true);
      return;
    }
    setRevealed(false);
    setHiddenCount((c) => Math.min(c + STEP, total));
  };

  return (
    <div className="card-stone p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow text-muted-foreground">Memory verse · Week {verse.week}</p>
        <StatusPill status={status} />
      </div>

      <p className="mt-3 font-display text-2xl leading-relaxed text-foreground">
        {tokens.map((t, i) => {
          const isHidden = hidden.has(i) && !revealed;
          return (
            <span key={`${t.core}-${i}`}>
              {t.lead}
              {isHidden ? (
                <span
                  aria-label="hidden word"
                  className="inline-block rounded-sm border-b-2 border-sandstone bg-[color-mix(in_oklab,var(--sandstone)_16%,transparent)] align-baseline text-transparent select-none"
                >
                  {t.core}
                </span>
              ) : (
                t.core
              )}
              {t.tail}{" "}
            </span>
          );
        })}
      </p>
      <p className="mt-2 text-sm text-terracotta">
        {verse.reference}{" "}
        <span className="text-muted-foreground">({verse.translation})</span>
      </p>
      <div className="rule-arch my-4" aria-hidden />

      <p className="text-sm text-muted-foreground">
        {hiddenCount === 0
          ? "Read it through, then hide a few words at a time."
          : allHidden
            ? "Whole verse hidden — say it from memory."
            : `${hiddenCount} of ${total} words hidden`}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={gotItRight}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]"
        >
          Got it right
        </button>
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          {revealed ? "Hide again" : "Show verse"}
        </button>
        <button
          type="button"
          onClick={() => {
            setHiddenCount(0);
            setRevealed(false);
          }}
          className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary"
        >
          Start over
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        <p>
          No-clue recall: <strong className="text-foreground">{state?.noClueStreak ?? 0}</strong> / 5
          days to Learned
        </p>
        <p>
          Retention: <strong className="text-foreground">{state?.retentionStreak ?? 0}</strong> / 7
          days to Mastered
        </p>
      </div>
      {doneToday && (
        <p className="mt-3 text-sm text-olive">Practised today. Memory streak counted.</p>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: "learning" | "learned" | "mastered" }) {
  const map = {
    learning: { label: "Learning", cls: "border-border text-muted-foreground" },
    learned: {
      label: "Learned",
      cls: "border-olive text-olive bg-[color-mix(in_oklab,var(--olive)_10%,transparent)]",
    },
    mastered: {
      label: "Mastered",
      cls: "border-terracotta text-terracotta bg-[color-mix(in_oklab,var(--terracotta)_10%,transparent)]",
    },
  } as const;
  const s = map[status];
  return <span className={`eyebrow rounded-full border px-2.5 py-0.5 ${s.cls}`}>{s.label}</span>;
}