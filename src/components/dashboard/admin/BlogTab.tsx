"use client";
import { useState } from "react";
import { FaPlus, FaTrash, FaNewspaper } from "react-icons/fa";
import { BlogPost } from "@/types";
import Swal from "sweetalert2";

const emptyPost = { title: "", excerpt: "", content: "", image: "", author: "", category: "", readTime: "5 min read" };

type Props = {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  loading: boolean;
};

export default function BlogTab({ blogPosts, setBlogPosts, loading }: Props) {
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState(emptyPost);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPost) });
    if (res.ok) {
      Swal.fire("Added!", "Blog post created.", "success");
      setShowAddPost(false); setNewPost(emptyPost);
      fetch("/api/blog").then((r) => r.json()).then((d) => setBlogPosts(Array.isArray(d) ? d : []));
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({ title: "Delete post?", icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444", confirmButtonText: "Delete" });
    if (!result.isConfirmed) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setBlogPosts(blogPosts.filter((p) => String(p._id) !== id));
    Swal.fire("Deleted!", "Post removed.", "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-base-content">Blog Posts</h2>
        <button onClick={() => setShowAddPost(!showAddPost)} className="btn btn-primary btn-sm text-white gap-2"><FaPlus /> Add Post</button>
      </div>

      {showAddPost && (
        <form onSubmit={handleAdd} className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="input input-bordered w-full col-span-full" required />
          <input placeholder="Author" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} className="input input-bordered w-full" required />
          <input placeholder="Category" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })} className="input input-bordered w-full" required />
          <input placeholder="Image URL" value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} className="input input-bordered w-full" required />
          <input placeholder="Read time (e.g. 5 min read)" value={newPost.readTime} onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })} className="input input-bordered w-full" />
          <textarea placeholder="Excerpt" value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} className="textarea textarea-bordered w-full col-span-full" rows={2} required />
          <textarea placeholder="Full content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} className="textarea textarea-bordered w-full col-span-full" rows={4} />
          <div className="col-span-full flex gap-3">
            <button type="submit" className="btn btn-primary text-white">Save Post</button>
            <button type="button" onClick={() => setShowAddPost(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-sky-500" /></div>
      ) : blogPosts.length === 0 ? (
        <div className="bg-base-200 border border-base-300 rounded-2xl p-12 shadow-md text-center text-base-content/40">
          <FaNewspaper className="text-5xl mx-auto mb-3 opacity-20" />
          <p>No blog posts yet. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-300 text-base-content/70 text-sm">
              <tr><th>Title</th><th>Author</th><th>Category</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {blogPosts.map((p) => (
                <tr key={String(p._id)} className="hover:bg-base-300/50 border-b border-base-300">
                  <td className="font-semibold text-base-content max-w-xs truncate">{p.title}</td>
                  <td className="text-base-content/60 text-sm">{p.author}</td>
                  <td><span className="badge badge-outline capitalize text-xs">{p.category}</span></td>
                  <td className="text-base-content/40 text-xs">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}</td>
                  <td>
                    <button onClick={() => handleDelete(String(p._id))} className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-500/10"><FaTrash size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
