export type PostSource = "cms" | "medium";

/** Shared shape for the blog index — both CMS posts and Medium posts map to this. */
export interface PostListItem {
  slug: string;
  title: string;
  date: string; // ISO or RFC date string
  readTime: string;
  source: PostSource;
  href: string; // always internal: /blog/<slug>
}

/**
 * Merge CMS posts with Medium posts, newest first. On a slug collision the CMS
 * post wins (self-owned content takes precedence over the mirrored Medium copy).
 * Pure — safe to run on the client.
 */
export function mergeAndSortPosts(
  cms: PostListItem[],
  medium: PostListItem[]
): PostListItem[] {
  const cmsSlugs = new Set(cms.map((p) => p.slug));
  const merged = [...cms, ...medium.filter((p) => !cmsSlugs.has(p.slug))];
  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
