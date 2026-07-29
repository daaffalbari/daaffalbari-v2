import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/projects";
import { renderMarkdoc } from "@/lib/markdoc";
import { CaseStudy } from "@/components/CaseStudy";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return { title: "Case not found" };

  const { meta } = data;
  const description = meta.description || meta.lede;
  return {
    title: `${meta.title} — Daffa Albari`,
    description,
    openGraph: {
      title: meta.title,
      description,
      type: "article",
      images: meta.coverImage ? [meta.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
      images: meta.coverImage ? [meta.coverImage] : [],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) notFound();

  const { meta, node } = data;
  const body = renderMarkdoc(node);

  // Next case = the following project in the ordered index (wraps around).
  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const nextProject =
    all.length > 1 ? all[(idx + 1) % all.length] : null;
  const next = nextProject
    ? { slug: nextProject.slug, title: nextProject.title }
    : null;

  return (
    <CaseStudy meta={meta} next={next}>
      {body}
    </CaseStudy>
  );
}
