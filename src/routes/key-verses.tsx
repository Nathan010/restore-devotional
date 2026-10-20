import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { keyVerses } from "@/data/keyVerses";
import { bibleGatewayUrl } from "@/data/days";

export const Route = createFileRoute("/key-verses")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Key Verses | RESTORE" },
      {
        name: "description",
        content:
          "Ten verses that carry the RESTORE story, from Cyrus's decree to the promise of all things made new.",
      },
      { property: "og:title", content: "Key Verses | RESTORE" },
      {
        property: "og:description",
        content: "The verses that hold the Ezra–Nehemiah story of renewal together.",
      },
    ],
  }),
  component: KeyVersesPage,
});

function KeyVersesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pt-10">
        <p className="eyebrow text-terracotta">Key Verses</p>
        <h1 className="mt-2 font-display text-5xl text-foreground">Verses to carry with you</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A curated starting set. These will be expanded and edited as the devotional days are
          written.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {keyVerses.map((v) => (
            <article key={v.reference} className="card-stone card-stone-hover p-5">
              <p className="eyebrow text-sandstone">{v.theme}</p>
              <h2 className="mt-1.5 font-display text-2xl text-foreground">{v.reference}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.note}</p>
              <a
                href={bibleGatewayUrl(v.reference)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-medium text-terracotta underline-offset-4 hover:underline"
              >
                Read passage →
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 rounded-md border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          Work in progress: this list is a placeholder set and will be curated further. Preferred
          translation: NIV.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}