import { connectDB } from "@/lib/mongoose";
import BlogPostModel from "@/models/BlogPost";
import { notFound } from "next/navigation";
import { FaCalendar, FaUser, FaClock, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const post = await BlogPostModel.findById(id).lean() as {
    _id: string; title: string; excerpt: string; content: string;
    image: string; author: string; category: string; readTime?: string; createdAt?: Date;
  } | null;

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={post.title} className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-4 max-w-3xl mx-auto">
          <span className="inline-block bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 capitalize">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/50 mb-8 pb-6 border-b border-base-300">
          <span className="flex items-center gap-1.5"><FaUser size={12} /> {post.author}</span>
          {post.createdAt && (
            <span className="flex items-center gap-1.5">
              <FaCalendar size={12} />
              {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1.5"><FaClock size={12} /> {post.readTime}</span>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-base-content/70 text-lg leading-relaxed mb-6 font-medium">{post.excerpt}</p>

        {/* Body content */}
        {post.content ? (
          <div className="prose prose-base max-w-none text-base-content/80 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        ) : (
          <p className="text-base-content/50 italic">Full article content coming soon.</p>
        )}

        {/* Back link */}
        <div className="mt-12 pt-6 border-t border-base-300">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold text-sm transition-colors">
            <FaArrowLeft size={12} /> Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
