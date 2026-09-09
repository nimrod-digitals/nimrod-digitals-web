import type { MetadataRoute } from "next";

import { fallbackInsights } from "@/lib/insights";
import { labs } from "@/lib/labs";
import { siteMetadata } from "@/lib/metadata";
import { getLatestInsights } from "@/lib/wordpress";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    ["/", 1],
    ["/work/", 0.8],
    ["/about/", 0.8],
    ["/ai-insights/", 0.9],
    ["/contact/", 0.7],
  ] as const;

  let posts = fallbackInsights;
  try {
    posts = await getLatestInsights(100);
  } catch {
    // Keep the sitemap exportable if the CMS is temporarily unavailable.
  }

  return [
    ...staticPages.map(([path, priority]) => ({
      url: `${siteMetadata.url}${path}`,
      changeFrequency: path === "/ai-insights/" ? "weekly" as const : "monthly" as const,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${siteMetadata.url}/ai-insights/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...labs.map((lab) => ({
      url: `${siteMetadata.url}/labs/${lab.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
