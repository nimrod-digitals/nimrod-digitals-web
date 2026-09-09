import type { WordPressPost } from "@/lib/wordpress";

export type InsightCard = Pick<WordPressPost, "id" | "slug" | "title" | "excerpt">;

export type InsightArtwork = { banner: string; social: string; alt: string };

const insightArtwork: Record<string, InsightArtwork> = {
  "enterprise-ai-needs-architecture-not-just-policy": {
    banner: "/insights/enterprise-ai-needs-architecture.jpg",
    social: "/insights/social/enterprise-ai-needs-architecture.jpg",
    alt: "Connected AI systems moving through an architectural network of pathways and decision gates",
  },
  "a-more-capable-model-still-needs-a-better-operating-model": {
    banner: "/insights/better-operating-model.jpg",
    social: "/insights/social/better-operating-model.jpg",
    alt: "A powerful AI core operating within a structured system of controls and handoffs",
  },
  "when-ai-speeds-up-the-work-judgment-becomes-the-bottleneck": {
    banner: "/insights/judgment-bottleneck.jpg",
    social: "/insights/social/judgment-bottleneck.jpg",
    alt: "Many streams of accelerated output converging at a deliberate decision gate",
  },
  "give-your-ai-agent-a-job-description-before-you-give-it-access": {
    banner: "/insights/agent-job-description.jpg",
    social: "/insights/social/agent-job-description.jpg",
    alt: "An AI work unit passing through defined identity, permission, and escalation gates",
  },
};

export function getInsightArtwork(slug: string) {
  return insightArtwork[slug] ?? null;
}

export function getResponsiveBannerSources(artwork: InsightArtwork) {
  const base = artwork.banner.replace("/insights/", "/insights/responsive/").replace(/\.jpg$/, "");

  return {
    mobile: `${base}-768.jpg`,
    desktop: `${base}-1200.jpg`,
  };
}

export const fallbackInsights: WordPressPost[] = [
  {
    id: 1,
    date: "2026-09-04T00:00:00",
    slug: "ai-that-earns-its-place",
    title: { rendered: "AI that earns its place" },
    excerpt: { rendered: "A practical test for deciding where AI belongs in a customer or team experience." },
    content: { rendered: "<p>AI earns its place when it makes a meaningful difference to a real task. That sounds obvious, but it is a useful filter in a landscape full of impressive demonstrations.</p><h2>Start with the moment of friction</h2><p>Look for work that is repetitive, hard to begin, or unnecessarily slow—not simply an area where a model can produce an answer. The opportunity is stronger when a person can clearly describe what better looks like.</p><p>Then make the first version small enough to learn from. A useful prototype has a user, a decision it supports, and a measure of whether it helped.</p>" },
  },
  {
    id: 2,
    date: "2026-09-03T00:00:00",
    slug: "designing-for-judgment",
    title: { rendered: "Designing for judgment" },
    excerpt: { rendered: "The best AI interfaces do not remove people from the loop. They help people make better calls." },
    content: { rendered: "<p>Useful AI systems do not ask people to trust a black box. They make the work visible enough for people to understand, challenge, and improve the result.</p><h2>Keep the human decision legible</h2><p>Show the source, the confidence, and the next available action. A thoughtful interface gives people a way to correct the system without creating another layer of administration.</p><p>The goal is not total automation. It is better judgment at the moment it matters.</p>" },
  },
  {
    id: 3,
    date: "2026-09-02T00:00:00",
    slug: "the-next-useful-prototype",
    title: { rendered: "The next useful prototype" },
    excerpt: { rendered: "What to make when the opportunity is still unclear—and why small, real experiments win." },
    content: { rendered: "<p>When an opportunity is still taking shape, the instinct is often to make a broad roadmap. A better first move is usually a small prototype with a real audience and a real decision behind it.</p><h2>Prototype the uncertainty</h2><p>Choose the assumption that would change the direction of the work if it were wrong. Then design a lightweight way to test it in context.</p><p>This keeps the work grounded, creates evidence early, and turns vague enthusiasm into a sharper next move.</p>" },
  },
];

export function plainText(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

export function getFallbackInsight(slug: string) {
  return fallbackInsights.find((insight) => insight.slug === slug) ?? null;
}
