import { FaCalendar, FaUser, FaTag } from "react-icons/fa";
import { connectDB } from "@/lib/mongoose";
import BlogPostModel from "@/models/BlogPost";
import { BlogPost } from "@/types";
import Link from "next/link";
import AddBlogPostButton from "./AddBlogPostButton";

async function getPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const posts = await BlogPostModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-sky-800 dark:bg-sky-950 text-white py-10 sm:py-16 px-4 text-center relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Travel Blog</h1>
        <p className="text-sky-100 text-base sm:text-lg">Inspiration, tips, and guides for every kind of traveler</p>
        <div className="mt-5">
          <AddBlogPostButton />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-base-content/40">
            <p className="text-6xl mb-4">📝</p>
            <h3 className="text-2xl font-bold text-base-content mb-2">No posts yet</h3>
            <p>Check back soon for travel tips and guides.</p>
          </div>
        ) : (
          <>
            {featured && (
              <Link href={`/blog/${featured._id}`} className="bg-base-200 border border-base-300 rounded-2xl overflow-hidden shadow-lg mb-10 group hover:shadow-2xl transition-all duration-300 block">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-sky-500 text-white text-sm font-bold px-3 py-1 rounded-full">Featured</span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <span className="badge badge-outline badge-primary mb-3">{featured.category}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-3 group-hover:text-sky-600 transition-colors">{featured.title}</h2>
                    <p className="text-base-content/60 mb-5 leading-relaxed text-sm sm:text-base">{featured.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-base-content/40">
                      <span className="flex items-center gap-1"><FaUser /> {featured.author}</span>
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {featured.createdAt ? new Date(featured.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </span>
                      {(featured as BlogPost & { readTime?: string }).readTime && (
                        <span className="flex items-center gap-1"><FaTag /> {(featured as BlogPost & { readTime?: string }).readTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link key={String(post._id)} href={`/blog/${post._id}`} className="bg-base-200 border border-base-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block">
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">{post.title}</h3>
                      <p className="text-base-content/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-base-content/40">
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
