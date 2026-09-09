import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro, SiteFooter, SiteHeader } from "@/components/site-shell";
import { fallbackInsights, getInsightArtwork, getResponsiveBannerSources, plainText, type InsightCard } from "@/lib/insights";
import { createPageMetadata } from "@/lib/metadata";
import { getLatestInsights } from "@/lib/wordpress";

export const metadata: Metadata = createPageMetadata({
  title: "AI Insights",
  description:
    "Practical notes on AI, product, design, and the choices that turn new technology into useful progress.",
  path: "/ai-insights/",
});

export default async function InsightsPage() {
  let posts: InsightCard[] = fallbackInsights;
  try { posts = await getLatestInsights(); } catch { /* Keep the editorial surface useful until the CMS is configured. */ }
  return <main><SiteHeader /><PageIntro eyebrow="AI Insights" title="Notes from the useful edge."><p>Thinking on AI, product, design, and the choices that turn new technology into better experiences.</p></PageIntro><section className="page-shell pb-20 md:pb-28"><div className="ml-auto max-w-5xl divide-y divide-mist border-y border-mist">{posts.map((post, index) => { const artwork = getInsightArtwork(post.slug); const bannerSources = artwork ? getResponsiveBannerSources(artwork) : null; return <article className="grid gap-6 py-8 md:grid-cols-8 md:items-start" key={post.id}><span className="text-sm font-semibold text-signal">0{index + 1}</span><div className="md:col-span-7">{artwork && bannerSources && <Link aria-label={`Read ${plainText(post.title.rendered)}`} href={`/ai-insights/${post.slug}`}><picture><source media="(max-width: 767px)" srcSet={bannerSources.mobile} /><source media="(min-width: 768px)" srcSet={bannerSources.desktop} /><Image className="mb-7 aspect-video w-full object-cover" src={artwork.banner} alt={artwork.alt} width={1600} height={900} sizes="(min-width: 1024px) 896px, 100vw" /></picture></Link>}<h2 className="brand-subhead text-3xl leading-tight md:text-4xl">{plainText(post.title.rendered)}</h2><p className="mt-3 max-w-2xl leading-relaxed text-quiet-ink">{plainText(post.excerpt.rendered)}</p><Link className="nav-link mt-5 inline-block text-sm font-semibold" href={`/ai-insights/${post.slug}`}>Read note →</Link></div></article>; })}</div></section><SiteFooter /></main>;
}
