import type { Node } from "@markdoc/markdoc";
import { reader } from "./content";
import { calculateReadTime } from "./medium";
import type { PostListItem } from "./blog";

const BLOG_IMAGE_PATH = "/images/blog/";

function imageUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("/") || value.startsWith("http")) return value;
  return BLOG_IMAGE_PATH + value;
}

/** Collect visible text from a Markdoc AST node, for read-time estimation. */
function collectText(node: Node | null | undefined): string {
  if (!node) return "";
  let out = "";
  const content = (node.attributes as { content?: unknown } | undefined)?.content;
  if (node.type === "text" && typeof content === "string") {
    out += content + " ";
  }
  for (const child of node.children ?? []) {
    out += collectText(child as Node);
  }
  return out;
}

export interface CmsPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string | null;
  coverAlt: string;
  tags: string[];
  readTime: string;
}

type PostEntry = Awaited<ReturnType<typeof reader.collections.posts.read>>;

async function resolveBody(entry: NonNullable<PostEntry>): Promise<Node> {
  const bodyField = entry.body as
    | { node: Node }
    | (() => Promise<{ node: Node }>);
  const resolved =
    typeof bodyField === "function" ? await bodyField() : bodyField;
  return resolved.node;
}

function toMeta(slug: string, entry: NonNullable<PostEntry>, node: Node): CmsPostMeta {
  return {
    slug,
    title: entry.title,
    excerpt: entry.excerpt,
    date: entry.publishedAt ?? "",
    coverImage: imageUrl(entry.coverImage),
    coverAlt: entry.coverAlt,
    tags: [...entry.tags],
    readTime: calculateReadTime(collectText(node)),
  };
}

/** All published (non-draft) CMS posts, newest first. */
export async function getCmsPosts(): Promise<CmsPostMeta[]> {
  const entries = await reader.collections.posts.all();
  const posts = await Promise.all(
    entries.map(async ({ slug, entry }) => {
      if (entry.draft) return null;
      const node = await resolveBody(entry);
      return toMeta(slug, entry, node);
    })
  );
  return posts
    .filter((p): p is CmsPostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** CMS posts mapped to the shared index shape used by the Blog section. */
export async function getCmsPostListItems(): Promise<PostListItem[]> {
  const posts = await getCmsPosts();
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    readTime: p.readTime,
    source: "cms" as const,
    href: `/blog/${p.slug}`,
  }));
}

/** Full CMS post for the detail page. Returns null for missing or draft posts. */
export async function getCmsPost(
  slug: string
): Promise<{ meta: CmsPostMeta; node: Node } | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.draft) return null;
  const node = await resolveBody(entry);
  return { meta: toMeta(slug, entry, node), node };
}
