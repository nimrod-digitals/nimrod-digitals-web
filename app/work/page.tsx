import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageIntro, SiteFooter, SiteHeader } from "@/components/site-shell";
import { labs } from "@/lib/labs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore how Nimrod Digitals helps teams shape AI opportunities, redesign services, and accelerate digital products.",
  path: "/work/",
});

const engagementPatterns = [
  {
    number: "01",
    label: "AI opportunity",
    title: "From broad AI ambition to one responsible pilot",
    context:
      "A leadership team sees clear potential in AI, but too many possible use cases and unresolved risk make it difficult to choose a credible starting point.",
    approach:
      "Map the decisions, data, users, and failure modes around a high-value workflow. Prototype the human and AI interaction before committing to a large platform build.",
    progress:
      "A prioritised use case, testable service concept, guardrail map, and practical path from pilot to adoption.",
  },
  {
    number: "02",
    label: "Service transformation",
    title: "From fragmented journey to a service people can navigate",
    context:
      "Customers and employees work around disconnected channels, repeated hand-offs, and information that arrives too late to support a good decision.",
    approach:
      "Make the end-to-end service visible, identify the moments creating the most friction, and redesign the experience together with the operating model behind it.",
    progress:
      "A clearer journey, aligned service principles, prioritised improvements, and prototypes ready for operational testing.",
  },
  {
    number: "03",
    label: "Product acceleration",
    title: "From promising concept to a focused first release",
    context:
      "A digital product has momentum but lacks a shared definition of the user problem, the smallest valuable release, or the evidence needed for the next investment.",
    approach:
      "Bring product strategy, experience design, and delivery planning into one short cycle. Test the riskiest assumptions while defining what the team should build now—and defer.",
    progress:
      "A validated product direction, coherent experience, release scope, and decision-ready delivery roadmap.",
  },
];

export default function WorkPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro eyebrow="Work" title="Move from possibility to proof.">
        <p>
          We help teams make consequential digital decisions and turn them into
          experiences, workflows, and releases that can be tested in the real
          world.
        </p>
      </PageIntro>

      <section className="page-shell pb-20 md:pb-28">
        <div className="ml-auto max-w-5xl border-y border-mist">
          <div className="grid gap-4 border-b border-mist py-5 text-sm text-quiet-ink md:grid-cols-12">
            <p className="eyebrow md:col-span-3">Engagement patterns</p>
            <p className="md:col-span-8 md:col-start-5">
              Representative situations we are equipped to solve. Named client
              stories will only be published with permission.
            </p>
          </div>

          {engagementPatterns.map((engagement) => (
            <article
              className="grid gap-7 border-b border-mist py-10 last:border-b-0 md:grid-cols-12 md:py-14"
              key={engagement.number}
            >
              <div className="md:col-span-3">
                <span className="text-sm font-semibold text-signal">
                  {engagement.number}
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-quiet-ink">
                  {engagement.label}
                </p>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <h2 className="brand-subhead max-w-3xl text-4xl leading-[1.02] md:text-5xl">
                  {engagement.title}
                </h2>
                <dl className="mt-10 grid gap-7 md:grid-cols-3">
                  <div>
                    <dt className="eyebrow">The situation</dt>
                    <dd className="mt-3 leading-relaxed text-quiet-ink">
                      {engagement.context}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Our approach</dt>
                    <dd className="mt-3 leading-relaxed text-quiet-ink">
                      {engagement.approach}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">What moves forward</dt>
                    <dd className="mt-3 leading-relaxed text-quiet-ink">
                      {engagement.progress}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-panel border-y border-mist">
        <div className="page-shell py-16 md:py-24">
          <div className="ml-auto grid max-w-5xl gap-8 md:grid-cols-12">
            <p className="eyebrow md:col-span-3">Nimrod Labs</p>
            <div className="md:col-span-8 md:col-start-5">
              <h2 className="brand-headline max-w-3xl text-4xl leading-[1.03] md:text-6xl">Eight original products, built to make a business conversation concrete.</h2>
              <p className="mt-7 max-w-2xl leading-relaxed text-quiet-ink">These are interactive concept demonstrations for real business needs—not client case studies or claims about client outcomes.</p>
            </div>
          </div>
          <div className="labs-grid ml-auto mt-12 grid max-w-5xl gap-px bg-mist md:grid-cols-2">
            {labs.map((lab) => (
              <Link className="lab-card group bg-paper p-6 md:p-8" href={`/labs/${lab.slug}`} key={lab.slug}>
                <Image alt={lab.imageAlt} className="lab-card-image" height={900} priority={lab.number === "01"} src={`/labs/${lab.slug}-20260909.jpg`} width={1600} />
                <div className="flex items-start justify-between gap-5"><span className="text-sm font-semibold text-signal">{lab.number}</span><span className="text-xs font-semibold uppercase tracking-[.14em] text-quiet-ink">{lab.category}</span></div>
                <h3 className="brand-subhead mt-12 text-4xl leading-none">{lab.title}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[.14em] text-signal">{lab.eyebrow}</p>
                <p className="mt-6 max-w-md leading-relaxed text-quiet-ink">{lab.summary}</p>
                <span className="lab-card-link mt-8 inline-flex text-sm font-semibold">Explore concept <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-panel border-y border-mist">
        <div className="page-shell grid gap-8 py-16 md:grid-cols-12 md:py-24">
          <p className="eyebrow md:col-span-3">Start with the decision</p>
          <div className="md:col-span-8 md:col-start-5">
            <h2 className="brand-headline max-w-3xl text-4xl leading-[1.03] md:text-6xl">
              If the next move is unclear, that is a useful place to begin.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-quiet-ink">
              Bring the opportunity, the constraint, and the people it affects.
              We will help frame a focused piece of work that creates evidence
              before unnecessary scale.
            </p>
            <Link
              className="mt-10 inline-flex bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--ink-black)]"
              href="/contact"
            >
              Discuss your next move
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
