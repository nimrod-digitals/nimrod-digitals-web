import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, SiteFooter, SiteHeader } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Nimrod Digitals is an independent digital strategy and execution practice for leaders turning AI and digital opportunity into useful progress.",
  path: "/about/",
});

const principles = [
  [
    "Clarify the decision",
    "We begin by defining what must change, who it matters to, and what evidence would make the next investment worthwhile.",
  ],
  [
    "Design with the real work",
    "We look beyond the interface to the people, processes, information, and constraints that determine whether an idea will work.",
  ],
  [
    "Make evidence early",
    "Prototypes, workflow trials, and focused releases turn assumptions into something a team can assess and improve.",
  ],
  [
    "Leave capability behind",
    "The work should create momentum inside the organisation—not dependence on a long external engagement.",
  ],
];

const bestFit = [
  "Leaders deciding where AI can create meaningful value",
  "Teams redesigning a service, workflow, or digital experience",
  "Organisations that need senior clarity before committing to a large build",
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro eyebrow="About" title="Useful futures are built around people.">
        <p>
          Nimrod Digitals is an independent strategy and execution practice for
          leaders turning AI and digital opportunity into focused, useful
          progress.
        </p>
      </PageIntro>

      <section className="brand-panel border-y border-mist">
        <div className="page-shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <p className="eyebrow md:col-span-3">Our point of view</p>
          <div className="space-y-8 md:col-span-8 md:col-start-5">
            <p className="brand-headline max-w-4xl text-4xl leading-[1.03] md:text-6xl">
              Technology matters when it helps people make better decisions,
              do better work, or experience less friction.
            </p>
            <div className="grid gap-6 text-lg leading-relaxed text-quiet-ink md:grid-cols-2">
              <p>
                New technology creates pressure to move quickly. The harder
                task is deciding where it belongs, how it should work, and what
                must be true for people to trust it.
              </p>
              <p>
                We connect strategy, experience design, and delivery so those
                decisions do not remain trapped in a presentation. The goal is
                a clear move a team can make—and learn from—now.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <p className="eyebrow md:col-span-3">How we approach the work</p>
        <div className="divide-y divide-mist border-y border-mist md:col-span-8 md:col-start-5">
          {principles.map(([title, copy], index) => (
            <article className="grid gap-4 py-7 md:grid-cols-8" key={title}>
              <span className="text-sm font-semibold text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="brand-subhead text-2xl leading-tight md:col-span-3 md:text-3xl">
                {title}
              </h2>
              <p className="leading-relaxed text-quiet-ink md:col-span-4">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell grid gap-10 pb-20 md:grid-cols-12 md:pb-28">
        <p className="eyebrow md:col-span-3">A strong fit</p>
        <div className="md:col-span-8 md:col-start-5">
          <h2 className="brand-headline max-w-3xl text-4xl leading-[1.03] md:text-6xl">
            Bring us the consequential question—not a pre-written solution.
          </h2>
          <ul className="mt-10 divide-y divide-mist border-y border-mist">
            {bestFit.map((item) => (
              <li className="flex gap-4 py-5 text-lg" key={item}>
                <span aria-hidden="true" className="text-signal">↗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            className="mt-10 inline-flex bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--signal-dark)]"
            href="/contact"
          >
            Start a conversation
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
