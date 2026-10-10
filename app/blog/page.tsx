import Link from "next/link";
import { posts } from "@/lib/posts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Technical Blog</h1>
          <p className="text-lg text-[var(--ink)]/70">
            Deep dives into full-stack development, quantum machine learning, and the projects that shaped my journey.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[var(--line)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-sm text-[var(--ink)]/60 mb-3">
                <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-[var(--ink)]/70 mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                   <span key={tag} className="px-3 py-1 bg-[var(--paper)] rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}