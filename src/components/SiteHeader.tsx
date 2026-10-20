import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/understanding", label: "Understanding Ezra–Nehemiah" },
  { to: "/this-week", label: "This Week" },
  { to: "/plan", label: "The Plan" },
  { to: "/key-verses", label: "Key Verses" },
  { to: "/key-ideas", label: "Key Ideas & Quotes" },
  { to: "/resources", label: "Resources" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl leading-none font-semibold tracking-[0.2em] text-foreground">
            RESTORE
          </span>
          <span className="hidden text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase sm:inline">
            112 Days
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{
                className:
                  "bg-[color-mix(in_oklab,var(--sandstone)_18%,transparent)] text-foreground",
              }}
              className="rounded-md px-2.5 py-1.5 text-[0.78rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="rounded-md border border-border px-3 py-1.5 text-xs tracking-wide text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-card lg:hidden">
          <div className="mx-auto max-w-5xl px-4 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-foreground font-medium" }}
                className="block border-b border-border/50 py-3 text-sm text-muted-foreground last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}