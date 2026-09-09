import type { Metadata } from "next";

export const siteMetadata = {
  name: "Nimrod Digitals",
  title: "Nimrod Digitals | AI, Design, and Digital Execution",
  description:
    "Nimrod Digitals turns emerging AI and digital opportunities into clear, useful experiences.",
  url: "https://nimroddigitals.com",
  socialImage: "/brand/social-card.png",
};

export function metadataDescription(value: string, limit = 160): string {
  if (value.length <= limit) return value;
  const shortened = value.slice(0, limit + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 110 ? lastSpace : limit).trimEnd()}…`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const isHome = path === "/";
  const fullTitle = isHome ? siteMetadata.title : `${title} | ${siteMetadata.name}`;

  return {
    title: isHome ? { absolute: siteMetadata.title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteMetadata.name,
      url: path,
      title: fullTitle,
      description,
      images: [
        {
          url: siteMetadata.socialImage,
          width: 1200,
          height: 630,
          alt: `${siteMetadata.name} interlocking-N brand mark`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteMetadata.socialImage],
    },
  };
}
