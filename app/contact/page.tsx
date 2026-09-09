import type { Metadata } from "next";

import { PageIntro, SiteFooter, SiteHeader } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a conversation with Nimrod Digitals about an AI opportunity, digital service, or product decision.",
  path: "/contact/",
});

export default function ContactPage() {
  return <main><SiteHeader /><PageIntro eyebrow="Contact" title="Make the next move count."><p>Tell us what is changing, what feels stuck, or what needs to be made. We’ll come back with a useful point of view.</p></PageIntro><section className="page-shell pb-20 md:pb-28"><div className="ml-auto max-w-4xl border-y border-mist py-8 md:grid md:grid-cols-8"><p className="eyebrow md:col-span-2">Email</p><a className="brand-subhead text-3xl leading-tight underline decoration-signal decoration-2 underline-offset-8 md:col-span-6 md:text-5xl" href="mailto:hello@nimroddigitals.com">hello@nimroddigitals.com</a></div></section><SiteFooter /></main>;
}
