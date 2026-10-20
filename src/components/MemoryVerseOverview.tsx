import { memoryVerses, weekRange, TOTAL_WEEKS } from "@/data/memoryVerses";
import { bibleGatewayUrl } from "@/data/days";

/** Compact 16-week overview of the memory verse journey. */
export function MemoryVerseOverview({ currentWeek }: { currentWeek?: number }) {
  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-3xl text-foreground">The {TOTAL_WEEKS}-week journey</h2>
        <p className="text-sm text-muted-foreground">One verse for every seven days</p>
      </div>
      <div className="stone-divider my-4" aria-hidden />
      <ol className="grid gap-2 sm:grid-cols-2">
        {memoryVerses.map((v) => {
          const { start, end } = weekRange(v.week);
          const isNow = v.week === currentWeek;
          return (
            <li
              key={v.week}
              className={`card-stone card-stone-hover flex items-baseline gap-3 p-3 ${
                isNow ? "border-terracotta" : ""
              }`}
            >
              <span
                className={`eyebrow shrink-0 rounded-full border px-2 py-0.5 ${
                  isNow ? "border-terracotta text-terracotta" : "border-border text-muted-foreground"
                }`}
              >
                Wk {v.week}
              </span>
              <span className="min-w-0">
                <a
                  href={bibleGatewayUrl(v.reference)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {v.reference}
                </a>
                <span className="block text-sm text-muted-foreground">{v.theme}</span>
                <span className="block text-xs text-muted-foreground/80">
                  Days {start}–{end}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground">Preferred translation: NIV.</p>
    </section>
  );
}