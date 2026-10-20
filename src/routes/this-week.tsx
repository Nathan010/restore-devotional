import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DayCard } from "@/components/DayCard";
import { ProgressBar } from "@/components/ProgressBar";
import { MemoryVerseCard } from "@/components/MemoryVerseCard";
import { GRACE_COPY, useProgress } from "@/lib/progress";
import { days, movementForDay } from "@/data/days";
import {
  memoryVerseForWeek,
  weekForDay,
  weekRange,
  TOTAL_WEEKS,
} from "@/data/memoryVerses";
import { MemoryVerseOverview } from "@/components/MemoryVerseOverview";

export const Route = createFileRoute("/this-week")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "This Week | RESTORE" },
      {
        name: "description",
        content:
          "Your current seven days of the RESTORE plan, with the weekly memory verse and practice mode.",
      },
      { property: "og:title", content: "This Week | RESTORE" },
      {
        property: "og:description",
        content: "Seven days, one memory verse, one step further into the story of renewal.",
      },
    ],
  }),
  component: ThisWeekPage,
});

function ThisWeekPage() {
  const p = useProgress();
  const weekNumber = weekForDay(p.nextUnread);
  const { start, end } = weekRange(weekNumber);
  const weekDays = days.slice(start - 1, end);
  const verse = memoryVerseForWeek(weekNumber);
  const doneThisWeek = weekDays.filter((d) => p.isComplete(d.day)).length;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pt-10">
        <p className="eyebrow text-terracotta">This Week</p>
        <h1 className="mt-2 font-display text-5xl text-foreground">
          Week {weekNumber} of {TOTAL_WEEKS}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Days {start}–{end} · {movementForDay(start).title}
        </p>

        <div className="card-stone mt-6 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {doneThisWeek} of {weekDays.length} days completed this week
            </p>
            <p className="text-sm text-muted-foreground">
              Day {p.nextUnread} of 112 overall · {p.percent}%
            </p>
          </div>
          <div className="mt-3">
            <ProgressBar percent={Math.round((doneThisWeek / weekDays.length) * 100)} label="Week progress" />
          </div>
          {p.readingStreakBroken && (
            <p className="mt-4 text-sm leading-relaxed text-terracotta">{GRACE_COPY}</p>
          )}
        </div>

        <section className="mt-8 grid gap-3">
          {weekDays.map((d) => (
            <DayCard key={d.day} day={d} completed={p.isComplete(d.day)} onToggle={p.toggleDay} />
          ))}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl text-foreground">Memory verse for this week</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Week {weekNumber} of {TOTAL_WEEKS} · {verse.theme}
          </p>
          <div className="stone-divider my-4" aria-hidden />
          <MemoryVerseCard verse={verse} />
        </section>

        <div className="mt-10">
          <MemoryVerseOverview currentWeek={weekNumber} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/day/$day"
            params={{ day: String(p.nextUnread) }}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]"
          >
            Continue Reading
          </Link>
          <Link
            to="/plan"
            className="rounded-md border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
          >
            See the whole plan
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}