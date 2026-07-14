import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Domel Safety`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Header />
      <section className="relative bg-offwhite border-b-4 border-brand-orange overflow-hidden">
        <div
          className="absolute top-0 right-0 w-14 h-14"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--color-brand-orange) 0 8px, var(--color-charcoal) 8px 16px)",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 py-14">
          <Link href="/blog" className="text-xs text-steel hover:text-charcoal">
            ← Back to blog
          </Link>
          <div className="flex items-center gap-2 text-xs mt-4 mb-2">
            <span className="font-mono text-brand-red">{post.category}</span>
            <span className="text-steel">·</span>
            <span className="text-steel">{formatDate(post.date)}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-14 space-y-5">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-steel text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </article>

      <CtaBanner />
      <Footer />
    </main>
  );
}
