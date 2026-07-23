import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";
import { getMediumPosts } from "@/lib/medium";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getMediumPosts(20);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.pubDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
