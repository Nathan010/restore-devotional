import { Link } from "@tanstack/react-router";
import { CategoryBadge } from "./CategoryBadge";
import type { Day } from "@/data/days";

export function DayCard({
  day,
  completed,
  onToggle,
}: {
  day: Day;
  completed: boolean;
  onToggle?: (day: number) => void;
}) {
  const comingSoon = !day.body;

  return (
    <div className="card-stone card-stone-hover flex items-start gap-3 p-4">
      {onToggle && (
        <button
          type="button"
          onClick={() => onToggle(day.day)}
          aria-pressed={completed}
          aria-label={`Mark day ${day.day} ${completed ? "not read" : "read"}`}
          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
            completed
              ? "border-olive bg-olive text-background"
              : "border-border bg-background hover:border-sandstone"
          }`}
        >
          {completed && (
            <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
              <path
                d="M4 10.5l4 4 8-9"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}

      <Link
        to="/day/$day"
        params={{ day: String(day.day) }}
        className="min-w-0 flex-1"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow text-muted-foreground">Day {day.day}</span>
          <CategoryBadge category={day.category} />
          {comingSoon && (
            <span className="eyebrow rounded-full border border-border bg-muted px-2 py-0.5 text-muted-foreground">
              Coming soon
            </span>
          )}
        </div>
        <h3
          className={`mt-1.5 font-display text-xl leading-snug ${
            completed ? "text-muted-foreground line-through decoration-olive/70" : "text-foreground"
          }`}
        >
          {day.title}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{day.passage}</p>
      </Link>
    </div>
  );
}