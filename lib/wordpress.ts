export type WordPressPost = {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
};

const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

function getApiUrl(path: string) {
  if (!wordpressUrl) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_URL is not configured.");
  }

  return `${wordpressUrl.replace(/\/$/, "")}/wp-json/wp/v2${path}`;
}

async function fetchWordPress(path: string) {
  return fetch(getApiUrl(path), {
    cache: "force-cache",
    signal: AbortSignal.timeout(8_000),
  });
}

export async function getLatestInsights(limit = 3): Promise<WordPressPost[]> {
  const response = await fetchWordPress(`/posts?per_page=${limit}&_embed`);

  if (!response.ok) {
    throw new Error(`Unable to load WordPress posts: ${response.status}`);
  }

  return response.json() as Promise<WordPressPost[]>;
}

export async function getInsightBySlug(slug: string): Promise<WordPressPost | null> {
  const response = await fetchWordPress(`/posts?slug=${encodeURIComponent(slug)}&_embed`);

  if (!response.ok) {
    throw new Error(`Unable to load WordPress post: ${response.status}`);
  }

  const posts = await response.json() as WordPressPost[];
  return posts[0] ?? null;
}
