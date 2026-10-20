import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProgressBar } from "@/components/ProgressBar";
import { DayCard } from "@/components/DayCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Timeline } from "@/components/Timeline";
import { GRACE_COPY, useProgress } from "@/lib/progress";
import { days, getDay, historicalMarker, movementForDay, TOTAL_DAYS } from "@/data/days";
import { timeline } from "@/data/timeline";
import { memoryVerseForDay, practiceText } from "@/data/memoryVerses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "RESTORE — 112 Days Through Ezra–Nehemiah" },
      {
        name: "description",
        content:
          "A 112-day devotional journey through Ezra–Nehemiah and the Bible's story of renewal, from Kellyville Anglican Church.",
      },
      { property: "og:title", content: "RESTORE — 112 Days Through Ezra–Nehemiah" },
      {
        property: "og:description",
        content:
          "Ruin, exile, return, rebuilding, reform — and the restoration the whole story is moving toward.",
      },
    ],
  }),
  component: Home,
});

function timelineIndexForDay(day: number): number {
  if (day <= 2) return 2;
  if (day <= 11) return 1;
  if (day === 12) return 3;
  if (day <= 21) return 4;
  if (day <= 36) return 5;
  if (day <= 41) return 6;
  if (day <= 55) return 7;
  return 8;
}

function Home() {
  const p = useProgress();
  const nextDay = getDay(p.nextUnread);
  const weekStart = Math.max(1, Math.floor((p.nextUnread - 1) / 7) * 7 + 1);
  const weekDays = days.slice(weekStart - 1, weekStart + 6);
  const tIndex = timelineIndexForDay(p.nextUnread);
  const marker = timeline[tIndex]!;
  const verse = memoryVerseForDay(p.nextUnread);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 pb-4">
        {/* Hero */}
        <section className="pt-14 pb-10 sm:pt-20">
          <p className="eyebrow text-terracotta">Kellyville Anglican Church</p>
          <h1 className="mt-3 font-display text-6xl leading-[0.95] font-semibold tracking-[0.08em] text-foreground sm:text-8xl">
            RESTORE
          </h1>
          <p className="mt-4 max-w-2xl font-display text-xl text-muted-foreground sm:text-2xl">
            112 Days Through Ezra–Nehemiah and the Bible's Story of Renewal
          </p>
          <div className="stone-divider my-7 max-w-md" aria-hidden />
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
            ruin → exile → prayer → return → temple → opposition → reform → wall → revival →
            covenant → relapse → unfinished restoration → Christ → new covenant → Spirit → new
            Jerusalem
          </p>
        </section>

        {/* Continue reading */}
        <section className="card-stone overflow-hidden">
          <div className="border-b border-border/70 bg-[color-mix(in_oklab,var(--sandstone)_10%,transparent)] px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-muted-foreground">
                  Day {p.nextUnread} of {TOTAL_DAYS}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.completedCount} completed · {p.percent}% through the plan
                </p>
              </div>
              <Link
                to="/day/$day"
                params={{ day: String(p.nextUnread) }}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]"
              >
                Continue Reading
              </Link>
            </div>
            <div className="mt-4">
              <ProgressBar percent={p.percent} />
            </div>
          </div>

          {nextDay && (
            <Link
              to="/day/$day"
              params={{ day: String(nextDay.day) }}
              className="block px-5 py-5 transition-colors hover:bg-secondary/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={nextDay.category} />
                {!nextDay.body && (
                  <span className="eyebrow rounded-full border border-border bg-muted px-2 py-0.5 text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
              <h2 className="mt-2 font-display text-3xl leading-tight text-foreground">
                {nextDay.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{nextDay.passage}</p>
              <p className="mt-3 text-xs tracking-[0.1em] text-sandstone uppercase">
                {historicalMarker(nextDay.day)}
              </p>
            </Link>
          )}
        </section>

        {/* Streaks */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2">
          <StreakCard
            label="Reading streak"
            value={p.readingStreakLive}
            best={p.bestReadingStreak}
            broken={p.readingStreakBroken}
          />
          <StreakCard
            label="Memory verse streak"
            value={p.memoryStreakLive}
            best={p.bestMemoryStreak}
            broken={p.memoryStreakBroken}
          />
        </section>

        {/* Where are we */}
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="card-stone p-5">
            <p className="eyebrow text-muted-foreground">Where are we?</p>
            <p className="mt-2 font-display text-2xl text-foreground">{marker.date}</p>
            <p className="font-display text-lg text-terracotta">{marker.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{marker.detail}</p>
            <div className="rule-arch my-5" aria-hidden />
            <Timeline activeIndex={tIndex} />
          </div>

          <div className="space-y-5">
            <div className="card-stone p-5">
              <p className="eyebrow text-muted-foreground">This week's memory verse</p>
              <p className="mt-2 font-display text-lg leading-relaxed text-foreground">
                "{practiceText(verse).text}"
              </p>
              <p className="mt-2 text-sm text-terracotta">
                {verse.reference}{" "}
                <span className="text-muted-foreground">({verse.translation})</span>
              </p>
              <Link
                to="/this-week"
                className="mt-4 inline-block text-sm font-medium text-foreground underline underline-offset-4 decoration-sandstone hover:decoration-terracotta"
              >
                Practise it →
              </Link>
            </div>

            <div className="card-stone p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="eyebrow text-muted-foreground">
                  Current week · {movementForDay(weekStart).title}
                </p>
                <Link to="/this-week" className="text-xs text-terracotta hover:underline">
                  View week
                </Link>
              </div>
              <ul className="mt-3 space-y-2">
                {weekDays.map((d) => (
                  <li key={d.day}>
                    <Link
                      to="/day/$day"
                      params={{ day: String(d.day) }}
                      className="flex items-baseline gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-secondary/60"
                    >
                      <span className="w-12 shrink-0 text-xs text-muted-foreground">
                        Day {d.day}
                      </span>
                      <span
                        className={`min-w-0 flex-1 truncate text-sm ${
                          p.isComplete(d.day)
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {d.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Next up */}
        <section className="mt-10">
          <h2 className="font-display text-3xl text-foreground">Next up</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {days
              .slice(p.nextUnread - 1, p.nextUnread + 3)
              .map((d) => (
                <DayCard
                  key={d.day}
                  day={d}
                  completed={p.isComplete(d.day)}
                  onToggle={p.toggleDay}
                />
              ))}
          </div>
          <Link
            to="/plan"
            className="mt-5 inline-block rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
          >
            See all 112 days
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function StreakCard({
  label,
  value,
  best,
  broken,
}: {
  label: string;
  value: number;
  best: number;
  broken: boolean;
}) {
  return (
    <div className="card-stone p-5">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-4xl text-foreground">
        {value}
        <span className="ml-1.5 font-sans text-sm text-muted-foreground">
          {value === 1 ? "day" : "days"}
        </span>
      </p>
      {broken ? (
        <p className="mt-2 text-sm leading-relaxed text-terracotta">{GRACE_COPY}</p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Longest so far: {best}</p>
      )}
    </div>
  );
}