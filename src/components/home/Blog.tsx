import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";
import { BlogPost } from "@/types";

export default function Blog({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-3">Travel Tips & Blog</h2>
          <p className="text-base-content/60 text-base sm:text-lg">Insights and inspiration for your next adventure</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={String(post._id)} href={`/blog/${post._id}`}
              className="bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-2 group-hover:text-sky-500 transition-colors">{post.title}</h3>
                <p className="text-base-content/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-base-content/40">
                  <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                  <span className="flex items-center gap-1">
                    <FaCalendar />
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="btn btn-outline btn-primary px-8 py-3 text-lg rounded-xl">
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
