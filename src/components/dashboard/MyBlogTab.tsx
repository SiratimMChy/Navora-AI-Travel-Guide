import { useState, useEffect } from "react";
import Image from "next/image";
import { FaNewspaper, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { BlogPost } from "@/types";
import { Session } from "next-auth";

interface MyBlogTabProps {
  user: { name?: string; email?: string; image?: string; role?: string; } | undefined;
}

export default function MyBlogTab({ user }: MyBlogTabProps) {
  const [myPosts, setMyPosts] = useState<BlogPost[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", content: "", image: "", category: "", readTime: "5 min read" });

  useEffect(() => {
    fetch("/api/blog").then((r) => r.json()).then((d) => setMyPosts(Array.isArray(d) ? d.filter((p: BlogPost) => p.author === user?.name) : []));
  }, [user?.name]);

  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-base-content">My Blog Posts</h2>
        <button onClick={() => setShowAddPost(!showAddPost)} className="btn btn-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-sky-600 hover:to-teal-600 border-none gap-2">
          <FaPlus /> Add Post
        </button>
      </div>

      {showAddPost && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch("/api/blog", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...newPost, author: user?.name || "Anonymous" }),
            });
            if (res.ok) {
              const created = await res.json();
              setMyPosts((prev) => [created, ...prev]);
              setShowAddPost(false);
              setNewPost({ title: "", excerpt: "", content: "", image: "", category: "", readTime: "5 min read" });
              Swal.fire("Published!", "Your blog post is live.", "success");
            }
          }}
          className="bg-base-100 border border-base-300 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="input input-bordered w-full col-span-full" required />
          <input placeholder="Category (e.g. Tips, Adventure)" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })} className="input input-bordered w-full" required />
          <input placeholder="Read time (e.g. 5 min read)" value={newPost.readTime} onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })} className="input input-bordered w-full" />
          <input placeholder="Cover image URL" value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} className="input input-bordered w-full col-span-full" required />
          <textarea placeholder="Short excerpt / summary" value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} className="textarea textarea-bordered w-full col-span-full" rows={2} required />
          <div className="col-span-full space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-base-content/70">Full Content</label>
              <button
                type="button"
                disabled={!newPost.title}
                onClick={async () => {
                  const res = await fetch("/api/ai/generate-description", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newPost.title, type: "blog" }),
                  });
                  const data = await res.json();
                  if (data.success) setNewPost((prev) => ({ ...prev, content: data.data }));
                }}
                className="btn btn-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-40"
              >
                ✨ Generate with AI
              </button>
            </div>
            <textarea placeholder="Full content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} className="textarea textarea-bordered w-full" rows={5} />
          </div>
          <div className="col-span-full flex gap-3">
            <button type="submit" className="btn text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-sky-600 hover:to-teal-600 border-none">Publish Post</button>
            <button type="button" onClick={() => setShowAddPost(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      {myPosts.length === 0 ? (
        <div className="text-center py-16 text-base-content/40">
          <FaNewspaper className="text-6xl mx-auto mb-4 opacity-20" />
          <p className="text-lg font-semibold mb-1">No posts yet</p>
          <p className="text-sm">Share your travel stories with the world!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myPosts.map((p) => (
            <div key={String(p._id)} className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-2xl p-4">
              <Image src={p.image} alt={p.title} width={64} height={64} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base-content truncate">{p.title}</p>
                <p className="text-base-content/50 text-xs mt-0.5">{p.category} · {p.readTime}</p>
              </div>
              <button
                onClick={async () => {
                  const result = await Swal.fire({ title: "Delete post?", icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444", confirmButtonText: "Delete" });
                  if (!result.isConfirmed) return;
                  await fetch(`/api/blog/${p._id}`, { method: "DELETE" });
                  setMyPosts((prev) => prev.filter((x) => String(x._id) !== String(p._id)));
                }}
                className="btn btn-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shrink-0"
              >
                <FaTrash size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
