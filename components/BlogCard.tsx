import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white border border-border rounded-md p-5 hover:border-charcoal transition-colors"
    >
      <div className="flex items-center gap-2 text-xs mb-2">
        <span className="font-mono text-brand-red">{post.category}</span>
        <span className="text-steel">·</span>
        <span className="text-steel">{formatDate(post.date)}</span>
      </div>
      <h3 className="font-display text-lg font-bold text-charcoal mb-2">
        {post.title}
      </h3>
      <p className="text-sm text-steel leading-relaxed">{post.excerpt}</p>
    </Link>
  );
}
