import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Domel Safety",
  description:
    "Safety, fumigation and compliance guidance from Domel Safety Company Limited.",
};

export default function BlogPage() {
  return (
    <main>
      <Header />
      <PageHero
        eyebrow="BLOG"
        title="Safety notes from the field"
        description="Practical guidance on inspections, fumigation and compliance, written from what we see on site."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
