import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMediumPostBySlug, getMediumPosts, calculateReadTime } from "@/lib/medium";
import { BlogPostContent } from "@/components/BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMediumPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Daffa Albari`,
    description: post.description,
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
  const posts = await getMediumPosts(20);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getMediumPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = calculateReadTime(post.content);

  return <BlogPostContent post={post} readTime={readTime} />;
}
