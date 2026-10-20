import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Timeline } from "@/components/Timeline";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Resources | RESTORE" },
      {
        name: "description",
        content:
          "Timeline, book overview, recommended commentaries and sermon links for the RESTORE journey through Ezra–Nehemiah.",
      },
      { property: "og:title", content: "Resources | RESTORE" },
      {
        property: "og:description",
        content: "Background, commentaries and links to go deeper into Ezra–Nehemiah.",
      },
    ],
  }),
  component: ResourcesPage,
});

const commentaries = [
  {
    author: "Derek Kidner",
    title: "Ezra and Nehemiah (Tyndale Old Testament Commentaries)",
    note: "Short, elegant and pastorally shrewd. A good first commentary.",
  },
  {
    author: "Raymond Brown",
    title: "The Message of Nehemiah (The Bible Speaks Today)",
    note: "Warmly applied exposition, strong on leadership and prayer.",
  },
  {
    author: "Mervin Breneman",
    title: "Ezra, Nehemiah, Esther (New American Commentary)",
    note: "Fuller treatment of historical background and theology.",
  },
  {
    author: "H.G.M. Williamson",
    title: "Ezra, Nehemiah (Word Biblical Commentary)",
    note: "The technical standard. For those wanting the detail.",
  },
];

export function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pt-10">
        <p className="eyebrow text-terracotta">Resources</p>
        <h1 className="mt-2 font-display text-5xl text-foreground">Go deeper</h1>

        <div className="mt-6 rounded-md border border-dashed border-border bg-[color-mix(in_oklab,var(--sandstone)_9%,transparent)] p-4">
          <p className="eyebrow text-terracotta">Work in progress</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            RESTORE is live while it is still being written. The full 112-day framework is here
            from day one, and new devotional days are added progressively. Days not yet written are
            marked "Coming soon" — you can still see them, plan ahead, and read the passage.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Preferred translation: NIV.</p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-foreground">Timeline</h2>
          <div className="stone-divider my-4" aria-hidden />
          <div className="card-stone p-5">
            <Timeline />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-foreground">Book overview</h2>
          <div className="stone-divider my-4" aria-hidden />
          <div className="card-stone space-y-4 p-5 leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Ezra 1–6</strong> — the first return under
              Zerubbabel, the altar, the foundation, sixteen years of opposition, and the temple
              finally finished and dedicated in 516 BC.
            </p>
            <p>
              <strong className="text-foreground">Ezra 7–10</strong> — Ezra the scribe arrives in
              458 BC with royal backing, discovers widespread compromise, and leads a painful
              reform.
            </p>
            <p>
              <strong className="text-foreground">Nehemiah 1–7</strong> — Nehemiah leaves the
              Persian court in 445 BC, rebuilds the wall in fifty-two days under ridicule, threat
              and internal injustice.
            </p>
            <p>
              <strong className="text-foreground">Nehemiah 8–12</strong> — the law read aloud,
              corporate confession, a signed covenant, a repopulated city and the joy of dedication
              heard far away.
            </p>
            <p>
              <strong className="text-foreground">Nehemiah 13</strong> — the relapse, and an ending
              that refuses to tie itself up.
            </p>
            <Link
              to="/understanding"
              className="inline-block text-sm font-medium text-terracotta underline-offset-4 hover:underline"
            >
              Read the fuller orientation →
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-foreground">Recommended commentaries</h2>
          <div className="stone-divider my-4" aria-hidden />
          <div className="grid gap-3 sm:grid-cols-2">
            {commentaries.map((c) => (
              <article key={c.author} className="card-stone card-stone-hover p-5">
                <p className="eyebrow text-sandstone">{c.author}</p>
                <h3 className="mt-1 font-display text-xl leading-snug text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-foreground">Sermons & audio</h2>
          <div className="stone-divider my-4" aria-hidden />
          <div className="grid gap-3 sm:grid-cols-2">
            {["Sunday sermon series", "Midweek Bible study notes", "Audio devotionals", "Small group guide"].map(
              (label) => (
                <div key={label} className="card-stone p-5">
                  <h3 className="font-display text-xl text-foreground">{label}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Link coming soon — this resource is being prepared.
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}