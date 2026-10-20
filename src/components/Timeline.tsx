import { timeline } from "@/data/timeline";

export function Timeline({ activeIndex }: { activeIndex?: number }) {
  return (
    <ol className="relative ml-2 border-l border-[color-mix(in_oklab,var(--sandstone)_45%,transparent)] pl-6">
      {timeline.map((e, i) => {
        const active = activeIndex === i;
        return (
          <li key={e.date} className="relative pb-6 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 -left-[1.79rem] size-3 rotate-45 border ${
                active
                  ? "border-terracotta bg-terracotta"
                  : "border-[color-mix(in_oklab,var(--sandstone)_60%,transparent)] bg-background"
              }`}
            />
            <p
              className={`eyebrow ${active ? "text-terracotta" : "text-muted-foreground"}`}
            >
              {e.date}
            </p>
            <p className="font-display text-lg leading-snug text-foreground">{e.label}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{e.detail}</p>
          </li>
        );
      })}
    </ol>
  );
}