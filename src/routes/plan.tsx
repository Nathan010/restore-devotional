import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DayCard } from "@/components/DayCard";
import { ProgressBar } from "@/components/ProgressBar";
import { days, movements, TOTAL_DAYS } from "@/data/days";
import { categories, type CategoryKey } from "@/data/categories";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "The Plan — All 112 Days | RESTORE" },
      {
        name: "description",
        content:
          "The full 112-day RESTORE reading plan, grouped into nineteen movements from ruin and exile to the new Jerusalem.",
      },
      { property: "og:title", content: "The Plan — All 112 Days | RESTORE" },
      {
        property: "og:description",
        content: "Every day of the Ezra–Nehemiah devotional plan, in nineteen movements.",
      },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  const p = useProgress();
  const [filter, setFilter] = useState<CategoryKey | "all">("all");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pt-10">
        <p className="eyebrow text-terracotta">The Plan</p>
        <h1 className="mt-2 font-display text-5xl text-foreground">All 112 days</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Nineteen movements, from the rubble of Jerusalem to the city that needs no temple. Days
          still being written are marked "Coming soon" but remain part of the plan.
        </p>

        <div className="card-stone mt-6 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {p.completedCount} of {TOTAL_DAYS} completed
            </p>
            <p className="text-sm text-muted-foreground">{p.percent}%</p>
          </div>
          <div className="mt-3">
            <ProgressBar percent={p.percent} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            All categories
          </FilterChip>
          {(Object.keys(categories) as CategoryKey[]).map((k) => (
            <FilterChip key={k} active={filter === k} onClick={() => setFilter(k)}>
              {categories[k].label}
            </FilterChip>
          ))}
        </div>

        <div className="mt-10 space-y-12">
          {movements.map((m) => {
            const list = days
              .slice(m.start - 1, m.end)
              .filter((d) => filter === "all" || d.category === filter);
            if (list.length === 0) return null;
            return (
              <section key={m.numeral}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-sandstone">{m.numeral}.</span>
                  <h2 className="font-display text-3xl leading-tight text-foreground">
                    {m.title}
                  </h2>
                </div>
                <p className="mt-1 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Days {m.start}–{m.end}
                </p>
                <div className="stone-divider my-4" aria-hidden />
                <div className="grid gap-3 sm:grid-cols-2">
                  {list.map((d) => (
                    <DayCard
                      key={d.day}
                      day={d}
                      completed={p.isComplete(d.day)}
                      onToggle={p.toggleDay}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-terracotta bg-[color-mix(in_oklab,var(--terracotta)_12%,transparent)] text-terracotta"
          : "border-border text-muted-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}