import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Timeline } from "@/components/Timeline";

export const Route = createFileRoute("/understanding")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Understanding Ezra–Nehemiah | RESTORE" },
      {
        name: "description",
        content:
          "Where Ezra–Nehemiah sits in history, the tension at its heart, and why this plan also reads Isaiah, Ezekiel, Haggai, Esther and the New Testament.",
      },
      { property: "og:title", content: "Understanding Ezra–Nehemiah | RESTORE" },
      {
        property: "og:description",
        content:
          "The walls can be rebuilt while the heart stays unchanged. An orientation to the post-exilic story.",
      },
    ],
  }),
  component: UnderstandingPage,
});

function UnderstandingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pt-10">
        <p className="eyebrow text-terracotta">Understanding Ezra–Nehemiah</p>
        <h1 className="mt-2 font-display text-5xl leading-tight text-foreground">
          A people came home, and were still in exile
        </h1>

        <div className="mt-8 space-y-10">
          <Section title="Where we are in history">
            <p>
              Ezra–Nehemiah belongs to the post-exilic Persian period. Judah has been defeated by
              Babylon, the temple burned, the walls broken and the people deported. Then Persia
              defeats Babylon, and in 538 BC Cyrus issues a decree permitting exiled peoples to
              return home and rebuild their sanctuaries.
            </p>
            <p>
              In Hebrew Scripture, Ezra and Nehemiah are a single book. They tell one story in three
              waves of return: Zerubbabel and the temple, Ezra and the law, Nehemiah and the wall.
            </p>
          </Section>

          <Section title="The tension at the centre">
            <p>
              Everything external gets restored. The altar is rebuilt. The temple is finished and
              dedicated. The law is read and understood. The wall goes up in fifty-two days. The
              covenant is signed by name.
            </p>
            <p>
              And then Nehemiah 13 happens. Tobiah has a room in the temple. The Levites are unpaid.
              The Sabbath is treated as a market day. The old marriage compromises return. The book
              ends abruptly, with a prayer and no resolution.
            </p>
            <p className="font-display text-xl leading-relaxed text-foreground">
              The city, the temple, the worship and the walls can all be restored while the human
              heart remains unchanged.
            </p>
            <p>
              That is not a failure of the book. It is its argument. Ezra–Nehemiah is designed to
              leave you wanting something it cannot give you.
            </p>
          </Section>

          <Section title="Why we read beyond Ezra and Nehemiah">
            <p>
              This plan reads widely because the restoration story does. We read{" "}
              <strong>Jeremiah and Ezekiel</strong> for the promises of a new covenant, a new heart
              and a new Spirit that define what real restoration must involve.{" "}
              <strong>Isaiah</strong> gives us comfort, good news and the Servant who carries what
              reform cannot fix. <strong>Daniel</strong> shows us the praying man behind the decree.
            </p>
            <p>
              <strong>Haggai and Zechariah</strong> are the prophets who got the building started
              again, and <strong>Malachi</strong> is the prophet of the unfinished business that
              remains. <strong>Esther</strong> shows God at work in Persia even when his name is
              never spoken. The <strong>Psalms</strong> give us the prayers of a waiting people.
            </p>
            <p>
              And the <strong>New Testament</strong> passages are not decoration. John 2, Luke 4,
              Ephesians 2, Hebrews, Acts 2 and Revelation 21–22 are where the restoration project
              actually lands.
            </p>
          </Section>

          <Section title="The arc of the plan">
            <p className="font-display text-lg leading-relaxed text-foreground">
              ruin → exile → return → rebuilding → reform → relapse → the need for a deeper
              restoration → Christ → new covenant → Spirit → new creation
            </p>
            <p>
              Hold that shape in mind and no single day will feel random. Each is a step along one
              long line.
            </p>
          </Section>

          <Section title="The timeline">
            <div className="card-stone p-5">
              <Timeline />
            </div>
          </Section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-3xl text-foreground">{title}</h2>
      <div className="rule-arch my-4" aria-hidden />
      <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}