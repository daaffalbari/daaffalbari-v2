import type { Node } from "@markdoc/markdoc";
import { reader } from "./content";

export type ProjectKind = "product" | "research";

export interface ProjectMetric {
  figure: string;
  label: string;
  accent: boolean;
}

export interface ProjectGalleryItem {
  image: string | null;
  alt: string;
  caption: string;
}

export interface ProjectLinks {
  live: string | null;
  github: string | null;
  video: string | null;
  paper: string | null;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  kind: ProjectKind;
  year: string;
  company: string;
  category: string;
  featured: boolean;
  order: number;
  description: string;
  lede: string;
  role: string;
  timeline: string;
  team: string;
  stack: string[];
  coverImage: string | null;
  coverAlt: string;
  coverCaption: string;
  gallery: ProjectGalleryItem[];
  metrics: ProjectMetric[];
  achievements: string[];
  links: ProjectLinks;
}

type ProjectEntry = Awaited<
  ReturnType<typeof reader.collections.projects.read>
>;

const PROJECT_IMAGE_PATH = "/images/projects/";

/**
 * Keystatic's image reader returns whatever is stored in frontmatter. Hand-seeded
 * entries store a bare filename; UI uploads may store a full public path. Prepend
 * the public path only for bare filenames so both forms resolve to a valid URL.
 */
function imageUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("/") || value.startsWith("http")) return value;
  return PROJECT_IMAGE_PATH + value;
}

function normalize(slug: string, entry: NonNullable<ProjectEntry>): ProjectMeta {
  return {
    slug,
    title: entry.title,
    kind: entry.kind,
    year: entry.year,
    company: entry.company,
    category: entry.category,
    featured: entry.featured,
    order: entry.order ?? 0,
    description: entry.description,
    lede: entry.lede,
    role: entry.role,
    timeline: entry.timeline,
    team: entry.team,
    stack: [...entry.stack],
    coverImage: imageUrl(entry.coverImage),
    coverAlt: entry.coverAlt,
    coverCaption: entry.coverCaption,
    gallery: entry.gallery.map((g) => ({
      image: imageUrl(g.image),
      alt: g.alt,
      caption: g.caption,
    })),
    metrics: entry.metrics.map((m) => ({
      figure: m.figure,
      label: m.label,
      accent: m.accent,
    })),
    achievements: [...entry.achievements],
    links: {
      live: entry.links.live,
      github: entry.links.github,
      video: entry.links.video,
      paper: entry.links.paper,
    },
  };
}

/** Ordered list for the Selected work index: featured first, then sort order. */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .map(({ slug, entry }) => normalize(slug, entry))
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        a.order - b.order ||
        a.title.localeCompare(b.title)
    );
}

export async function getProjectSlugs(): Promise<string[]> {
  return [...(await reader.collections.projects.list())];
}

/** Full case study: metadata plus the Markdoc body node for rendering. */
export async function getProject(
  slug: string
): Promise<{ meta: ProjectMeta; node: Node } | null> {
  const entry = await reader.collections.projects.read(slug);
  if (!entry) return null;
  // `body` is either the resolved `{ node }` or an async function returning it,
  // depending on Keystatic's linked-file resolution — handle both.
  const bodyField = entry.body as
    | { node: Node }
    | (() => Promise<{ node: Node }>);
  const resolved =
    typeof bodyField === "function" ? await bodyField() : bodyField;
  return { meta: normalize(slug, entry), node: resolved.node };
}
