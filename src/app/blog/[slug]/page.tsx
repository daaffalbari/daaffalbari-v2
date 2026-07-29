import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMediumPostBySlug, getMediumPosts, calculateReadTime } from "@/lib/medium";
import { getCmsPost, getCmsPosts } from "@/lib/posts";
import { renderMarkdoc } from "@/lib/markdoc";
import { BlogPostContent } from "@/components/BlogPostContent";
import { CmsPostContent } from "@/components/CmsPostContent";
import { SITE_URL } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const cms = await getCmsPost(slug);
  if (cms) {
    const { meta } = cms;
    return {
      title: `${meta.title} | Daffa Albari`,
      description: meta.excerpt,
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
      },
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        type: "article",
        publishedTime: meta.date || undefined,
        authors: ["Daffa Albari"],
        images: meta.coverImage ? [meta.coverImage] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.excerpt,
        images: meta.coverImage ? [meta.coverImage] : [],
      },
    };
  }

  const post = await getMediumPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Daffa Albari`,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.pubDate,
      authors: [post.author],
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  const [cmsPosts, mediumPosts] = await Promise.all([
    getCmsPosts(),
    getMediumPosts(20),
  ]);
  const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));
  const slugs = [
    ...cmsPosts.map((p) => p.slug),
    ...mediumPosts.map((p) => p.slug).filter((s) => !cmsSlugs.has(s)),
  ];
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // CMS posts win over Medium on a slug collision.
  const cms = await getCmsPost(slug);
  if (cms) {
    const body = renderMarkdoc(cms.node);
    return <CmsPostContent meta={cms.meta}>{body}</CmsPostContent>;
  }

  const post = await getMediumPostBySlug(slug);
  if (!post) notFound();

  const readTime = calculateReadTime(post.content);
  return <BlogPostContent post={post} readTime={readTime} />;
}
