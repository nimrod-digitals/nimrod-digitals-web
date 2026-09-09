import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { fallbackInsights, getFallbackInsight, getInsightArtwork, getResponsiveBannerSources, plainText } from "@/lib/insights";
import { metadataDescription, siteMetadata } from "@/lib/metadata";
import { getInsightBySlug, getLatestInsights, type WordPressPost } from "@/lib/wordpress";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  let posts = fallbackInsights;
  try {
    posts = await getLatestInsights(100);
  } catch {
    // Keep the starter notes exportable if the CMS is temporarily unavailable.
  }

  return posts.map((post) => ({ slug: post.slug }));
}

async function resolveInsight(slug: string): Promise<WordPressPost | null> {
  try {
    const post = await getInsightBySlug(slug);
    if (post) return post;
  } catch {
    // The starter notes keep the reading experience available before CMS setup.
  }
  return getFallbackInsight(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await resolveInsight(slug);
  if (!post) return { title: "Insight not found", robots: { index: false, follow: false } };

  const title = plainText(post.title.rendered);
  const description = metadataDescription(plainText(post.excerpt.rendered));
  const canonicalPath = `/ai-insights/${slug}/`;
  const artwork = getInsightArtwork(slug);
  const socialImage = artwork?.social ?? siteMetadata.socialImage;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: siteMetadata.name,
      url: canonicalPath,
      title: `${title} | ${siteMetadata.name}`,
      description,
      publishedTime: new Date(post.date).toISOString(),
      authors: [siteMetadata.name],
      images: [{ url: socialImage, width: 1200, height: 630, alt: artwork?.alt ?? `${siteMetadata.name} interlocking-N brand mark` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteMetadata.name}`,
      description,
      images: [socialImage],
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const post = await resolveInsight((await params).slug);
  if (!post) notFound();

  const date = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.date));
  const artwork = getInsightArtwork(post.slug);
  const bannerSources = artwork ? getResponsiveBannerSources(artwork) : null;
  return (
    <main>
      <SiteHeader />
      <article className="page-shell py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Link className="nav-link text-sm font-semibold" href="/ai-insights">← All AI Insights</Link>
          <p className="eyebrow mt-14">AI Insights · {date}</p>
          <h1 className="brand-headline mt-6 text-5xl leading-[0.98] md:text-7xl">{plainText(post.title.rendered)}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-quiet-ink">{plainText(post.excerpt.rendered)}</p>
          {artwork && bannerSources && <picture><source media="(max-width: 767px)" srcSet={bannerSources.mobile} /><source media="(min-width: 768px)" srcSet={bannerSources.desktop} /><Image className="mt-12 aspect-video w-full object-cover" src={artwork.banner} alt={artwork.alt} width={1600} height={900} sizes="(min-width: 768px) 768px, 100vw" priority /></picture>}
          <div className="insight-content mt-14" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
