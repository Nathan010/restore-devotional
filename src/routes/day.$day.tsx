import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CategoryBadge } from "@/components/CategoryBadge";
import { useProgress } from "@/lib/progress";
import {
  bibleGatewayUrl,
  getDay,
  historicalMarker,
  movementForDay,
  TOTAL_DAYS,
} from "@/data/days";

export const Route = createFileRoute("/day/$day")({
  loader: ({ params }) => {
    const n = Number(params.day);
    const day = Number.isFinite(n) ? getDay(n) : undefined;
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Day not found | RESTORE" },
          { name: "description", content: "This devotional day is not part of the RESTORE 112-day plan." },
          { property: "og:title", content: "Day not found | RESTORE" },
          { property: "og:description", content: "Return to the RESTORE devotional plan through Ezra–Nehemiah." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const d = loaderData.day;
    const title = `Day ${d.day}: ${d.title} | RESTORE`;
    const description = `${d.passage} — day ${d.day} of the RESTORE journey through Ezra–Nehemiah.`;
    return {
      meta: [
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DayPage,
});

function DayPage() {
  const { day } = Route.useLoaderData();
  const p = useProgress();
  const done = p.isComplete(day.day);
  const movement = movementForDay(day.day);
  const prev = day.day > 1 ? day.day - 1 : null;
  const next = day.day < TOTAL_DAYS ? day.day + 1 : null;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 pt-10">
        <Link
          to="/plan"
          className="text-xs tracking-[0.12em] text-muted-foreground uppercase hover:text-foreground"
        >
          ← {movement.numeral}. {movement.title}
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="eyebrow text-muted-foreground">
            Day {day.day} of {TOTAL_DAYS}
          </span>
          <CategoryBadge category={day.category} size="md" />
        </div>

        <h1
          className={`mt-3 font-display text-4xl leading-tight sm:text-5xl ${
            done ? "text-muted-foreground line-through decoration-olive/60" : "text-foreground"
          }`}
        >
          {day.title}
        </h1>
        <p className="mt-2 font-display text-xl text-terracotta">{day.passage}</p>

        <p className="mt-4 inline-block rounded-full border border-border bg-[color-mix(in_oklab,var(--sandstone)_10%,transparent)] px-3 py-1 text-xs tracking-[0.1em] text-muted-foreground uppercase">
          {historicalMarker(day.day)}
        </p>

        <div className="mt-6">
          <a
            href={bibleGatewayUrl(day.passage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Read passage (NIV, BibleGateway) ↗
          </a>
        </div>

        <div className="stone-divider my-8" aria-hidden />

        {day.body ? (
          <article className="space-y-5 text-[1.02rem] leading-[1.75] text-foreground/90">
            {day.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-[color-mix(in_oklab,var(--sandstone)_8%,transparent)] p-8 text-center">
            <p className="eyebrow text-terracotta">Coming soon</p>
            <h2 className="mt-2 font-display text-2xl text-foreground">
              This day is still being written
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              The passage and its place in the story are set. The written devotional is on its way.
              You can still read {day.passage} today, mark the day complete, and carry on.
            </p>
          </div>
        )}

        {day.reflection && (
          <section className="card-stone mt-10 border-l-2 border-l-sandstone p-5">
            <p className="eyebrow text-sandstone">Reflection</p>
            <ul className="mt-3 space-y-3">
              {day.reflection.map((q, i) => (
                <li key={i} className="flex gap-3 text-[0.98rem] leading-relaxed text-foreground/90">
                  <span className="text-sandstone">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10">
          <button
            type="button"
            onClick={() => p.toggleDay(day.day)}
            aria-pressed={done}
            className={`w-full rounded-md px-5 py-3.5 text-sm font-medium transition-colors ${
              done
                ? "border border-olive bg-[color-mix(in_oklab,var(--olive)_12%,transparent)] text-olive"
                : "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]"
            }`}
          >
            {done ? "✓ Day complete — tap to undo" : "Complete Day"}
          </button>
        </div>

        <nav className="mt-8 flex items-stretch justify-between gap-3 border-t border-border pt-6">
          {prev ? (
            <Link
              to="/day/$day"
              params={{ day: String(prev) }}
              className="card-stone card-stone-hover flex-1 p-4 text-left"
            >
              <span className="eyebrow text-muted-foreground">← Previous</span>
              <span className="mt-1 block truncate font-display text-lg text-foreground">
                Day {prev}
              </span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              to="/day/$day"
              params={{ day: String(next) }}
              className="card-stone card-stone-hover flex-1 p-4 text-right"
            >
              <span className="eyebrow text-muted-foreground">Next →</span>
              <span className="mt-1 block truncate font-display text-lg text-foreground">
                Day {next}
              </span>
            </Link>
          ) : (
            <Link to="/plan" className="card-stone card-stone-hover flex-1 p-4 text-right">
              <span className="eyebrow text-muted-foreground">The end →</span>
              <span className="mt-1 block font-display text-lg text-foreground">Back to plan</span>
            </Link>
          )}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}