import type { Metadata } from "next";
import "@fontsource-variable/inter";

import { siteMetadata } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  applicationName: siteMetadata.name,
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.name, url: siteMetadata.url }],
  creator: siteMetadata.name,
  publisher: siteMetadata.name,
  category: "technology",
  robots: { index: true, follow: true },
  icons: {
    icon: "/brand/profile-light.png",
    apple: "/brand/profile-light.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteMetadata.name,
    url: "/",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [{ url: siteMetadata.socialImage, width: 1200, height: 630, alt: `${siteMetadata.name} interlocking-N brand mark` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialImage],
  },
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem("nimrod-theme");
      const preferred = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const theme = saved === "dark" || saved === "light" ? saved : preferred;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMetadata.name,
    url: siteMetadata.url,
    logo: `${siteMetadata.url}/brand/profile-light.png`,
    email: "hello@nimroddigitals.com",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
