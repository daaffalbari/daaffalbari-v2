import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";
import { getMediumPosts } from "@/lib/medium";
import { getAllProjects } from "@/lib/projects";
import { getCmsPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [mediumPosts, cmsPosts, projects] = await Promise.all([
    getMediumPosts(20),
    getCmsPosts(),
    getAllProjects(),
  ]);

  const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...cmsPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // CMS posts win on a slug collision (see src/app/blog/[slug]/page.tsx),
    // so skip anything already covered by a CMS post above.
    ...mediumPosts
      .filter((post) => !cmsSlugs.has(post.slug))
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.pubDate),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
