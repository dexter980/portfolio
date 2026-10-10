import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, Post } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post: Post | undefined = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--ink)]/60 hover:text-[var(--ink)] mb-6 transition-colors"
        >
          ← Back to Blog
        </Link>

        <article className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--line)]">
          <div className="flex items-center gap-2 text-sm text-[var(--ink)]/60 mb-4">
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold mb-6 text-[var(--ink)]">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[var(--paper)] rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <article className="prose prose-indigo max-w-none">
            <MarkdownRenderer content={post.content} />
          </article>
        </article>
      </div>
    </main>
  );
}