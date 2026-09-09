import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { LabDemo } from "@/components/lab-demo";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getLab, labs } from "@/lib/labs";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return labs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return {};
  return createPageMetadata({ title: `${lab.title} concept demo`, description: lab.summary, path: `/labs/${lab.slug}/` });
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="lab-hero">
        <Image
          alt=""
          aria-hidden="true"
          className="lab-hero-image"
          fill
          priority
          sizes="100vw"
          src={`/labs/${lab.slug}-20260909.jpg`}
        />
        <div className="lab-hero-content page-shell grid gap-8 py-20 md:grid-cols-12 md:py-28">
          <p className="eyebrow md:col-span-3">Nimrod Lab · {lab.category}</p>
          <div className="md:col-span-8 md:col-start-5">
            <h1 className="brand-headline text-6xl leading-[0.94] md:text-8xl">{lab.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed">{lab.summary}</p>
          </div>
        </div>
      </section>
      <section className="page-shell pb-20 pt-4 md:pb-28">
        <div className="ml-auto max-w-5xl">
          <p className="lab-disclaimer"><strong>Original concept demonstration.</strong> This is not client work, a live service, or a claim about a real business outcome.</p>
          <LabDemo lab={lab} />
          <div className="mt-16 grid gap-10 border-y border-mist py-10 md:grid-cols-12 md:py-14">
            <div className="md:col-span-3"><p className="eyebrow">The business need</p></div>
            <p className="text-xl leading-relaxed md:col-span-8 md:col-start-5">{lab.problem}</p>
            <div className="md:col-span-3"><p className="eyebrow">Designed to move forward</p></div>
            <p className="text-xl leading-relaxed text-quiet-ink md:col-span-8 md:col-start-5">{lab.outcome}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {lab.capabilities.map((capability, index) => <div className="border border-mist p-5" key={capability}><span className="text-sm font-semibold text-signal">0{index + 1}</span><p className="mt-8 font-semibold">{capability}</p></div>)}
          </div>
          <Link className="action-link action-link-primary mt-12" href="/contact">Build a version for your business <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
