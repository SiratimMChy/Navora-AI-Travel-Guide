"use client";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPlus, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddBlogPostButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", image: "", category: "", readTime: "5 min read" });
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!session?.user) return null;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.success) {
      setForm((prev) => ({ ...prev, image: data.data.url }));
    } else {
      Swal.fire("Upload failed", "Could not upload image.", "error");
      setPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) { Swal.fire("Image required", "Please upload a cover image.", "warning"); return; }
    setSubmitting(true);
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, author: session.user?.name || "Anonymous" }),
    });
    setSubmitting(false);
    if (res.ok) {
      setOpen(false);
      setForm({ title: "", excerpt: "", content: "", image: "", category: "", readTime: "5 min read" });
      setPreview("");
      Swal.fire("Published!", "Your blog post is live.", "success").then(() => router.refresh());
    } else {
      Swal.fire("Error", "Failed to publish post.", "error");
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm";
  const labelCls = "block text-sm font-semibold text-gray-600 mb-1";

  const modal = open && createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">New Blog Post</h2>
          <button type="button" onClick={() => { setOpen(false); setPreview(""); }} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input required placeholder="e.g. Top 10 Places in Bali" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Category</label>
              <input required placeholder="e.g. Adventure" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Read Time</label>
              <input placeholder="e.g. 5 min read" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} className={inputCls} />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className={labelCls}>Cover Image</label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full h-36 rounded-xl border-2 border-dashed border-gray-300 hover:border-sky-400 cursor-pointer flex items-center justify-center overflow-hidden transition"
            >
              {uploading ? (
                <span className="text-sm text-gray-400 animate-pulse">Uploading...</span>
              ) : preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="text-center text-gray-400">
                  <FaImage size={28} className="mx-auto mb-1" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea required placeholder="Short summary of your post..." value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={`${inputCls} resize-none`} rows={2} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className={labelCls}>Content</label>
              <button type="button" disabled={!form.title}
                onClick={async () => {
                  const res = await fetch("/api/ai/generate-description", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: form.title, type: "blog" }),
                  });
                  const data = await res.json();
                  if (data.success) setForm((prev) => ({ ...prev, content: data.data }));
                }}
                className="text-xs px-3 py-1 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-40 transition">
                ✨ Generate with AI
              </button>
            </div>
            <textarea placeholder="Write your full blog content here..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={`${inputCls} resize-none`} rows={5} />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={submitting || uploading} className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition disabled:opacity-50">
              {submitting ? "Publishing..." : "Publish"}
            </button>
            <button type="button" onClick={() => { setOpen(false); setPreview(""); }} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-sky-700 hover:bg-sky-50 font-semibold text-sm shadow transition">
        <FaPlus size={12} /> Add Post
      </button>
      {modal}
    </>
  );
}
