export interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  slug: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export interface MediumFeedResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumPost[];
}

const MEDIUM_USERNAME = "daffabercerita";
const RSS2JSON_API = "https://api.rss2json.com/v1/api.json";

export async function getMediumPosts(limit: number = 6): Promise<MediumPost[]> {
  try {
    const response = await fetch(
      `${RSS2JSON_API}?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Medium posts");
    }

    const data: MediumFeedResponse = await response.json();

    if (data.status !== "ok") {
      throw new Error("Medium feed status not ok");
    }

    return data.items.slice(0, limit).map((item) => ({
      ...item,
      slug: generateSlug(item.title),
      // Store full content for blog detail page
      content: item.description,
      // Clean up the description (remove HTML tags for excerpt)
      description: item.description
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
        .slice(0, 200) + "...",
      // Extract first image from content if thumbnail is empty
      thumbnail: item.thumbnail || extractFirstImage(item.description) || "",
    }));
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}

// Get a single post by slug
export async function getMediumPostBySlug(slug: string): Promise<MediumPost | null> {
  const posts = await getMediumPosts(20); // Fetch more to find the post
  return posts.find((post) => post.slug === slug) || null;
}

function extractFirstImage(html: string): string | null {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export const MEDIUM_PROFILE_URL = `https://medium.com/@${MEDIUM_USERNAME}`;
