import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { keyIdeas, quotes } from "@/data/keyIdeas";

export const Route = createFileRoute("/key-ideas")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Key Ideas & Quotes | RESTORE" },
      {
        name: "description",
        content:
          "The seven big ideas running through RESTORE, plus placeholder quote cards awaiting source verification.",
      },
      { property: "og:title", content: "Key Ideas & Quotes | RESTORE" },
      {
        property: "og:description",
        content: "Rebuilding structures cannot rebuild the heart — the ideas behind the plan.",
      },
    ],
  }),
  component: KeyIdeasPage,
});

function KeyIdeasPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pt-10">
        <p className="eyebrow text-terracotta">Key Ideas & Quotes</p>
        <h1 className="mt-2 font-display text-5xl text-foreground">
          What this story keeps saying
        </h1>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {keyIdeas.map((idea, i) => (
            <article key={idea.title} className="card-stone card-stone-hover p-5">
              <p className="font-display text-3xl text-sandstone">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-display text-2xl leading-snug text-foreground">
                {idea.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{idea.body}</p>
            </article>
          ))}
        </div>

        <div className="stone-divider mt-14 mb-6" aria-hidden />
        <h2 className="font-display text-3xl text-foreground">Quotes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Placeholder cards. Every quote below still needs source verification before publication.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {quotes.map((q) => (
            <figure
              key={q.text}
              className="card-stone border-l-2 border-l-terracotta p-5"
            >
              <blockquote className="font-display text-xl leading-relaxed text-foreground">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                {q.attributed}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}