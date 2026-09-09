import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { HeroSignal, SiteFooter, SiteHeader } from "@/components/site-shell";
import { createPageMetadata, siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: siteMetadata.title,
  description: siteMetadata.description,
  path: "/",
});

const capabilities = [
  ["01", "Opportunity", "Make sense of new technology, customer behavior, and the decisions worth making now."],
  ["02", "Experience", "Shape clear services, products, and content systems people can actually use."],
  ["03", "Execution", "Bring strategy into the real world through focused design, build, and momentum."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <SiteHeader />
      <section className="home-hero page-shell relative grid min-h-[calc(100vh-7rem)] items-end gap-10 overflow-hidden py-20 md:grid-cols-12 md:py-28">
        <HeroSignal className="home-hero-signal" />
        <div className="home-hero-copy md:col-span-9">
          <div className="mb-7 flex items-center gap-4">
            <BrandMark compact />
            <p className="eyebrow">AI, design, and digital execution</p>
          </div>
          <h1 className="brand-headline max-w-5xl text-6xl leading-[0.94] md:text-8xl lg:text-9xl">
            Make the next digital move count.
          </h1>
        </div>
        <div className="home-hero-copy md:col-span-3 md:pb-3">
          <p className="mb-8 text-lg leading-relaxed text-quiet-ink">
            Nimrod Digitals turns emerging AI and digital opportunities into clear, useful experiences.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link className="action-link action-link-primary" href="/work">View selected work <span aria-hidden="true">↗</span></Link>
            <Link className="action-link action-link-secondary" href="/ai-insights">Read AI Insights <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <section className="work-method brand-panel border-y border-mist">
        <div className="work-method-visual" aria-hidden="true"><span /><span /><span /></div>
        <div className="page-shell work-method-content grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <p className="eyebrow md:col-span-3">How we work</p>
          <div className="md:col-span-8 md:col-start-5">
            <p className="brand-headline max-w-3xl text-4xl leading-[1.04] md:text-6xl">A small, senior team for moments when the future needs to become useful.</p>
            <div className="mt-14 divide-y divide-mist border-t border-mist">
              {capabilities.map(([number, title, copy]) => (
                <div className="grid gap-4 py-6 md:grid-cols-8" key={number}>
                  <span className="text-sm font-semibold text-signal md:col-span-1">{number}</span>
                  <h2 className="text-xl font-semibold md:col-span-2">{title}</h2>
                  <p className="text-quiet-ink md:col-span-5">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="useful-start page-shell relative grid gap-8 overflow-hidden py-20 md:grid-cols-12 md:py-28">
        <div className="useful-start-visual" aria-hidden="true"><span /><span /><span /></div>
        <p className="eyebrow md:col-span-3">A useful start</p>
        <div className="md:col-span-8 md:col-start-5">
          <h2 className="brand-headline max-w-3xl text-5xl leading-[0.98] md:text-7xl">The right next move is usually smaller and sharper than it first appears.</h2>
          <Link className="mt-10 inline-flex bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--signal-dark)]" href="/contact">Start a conversation</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
