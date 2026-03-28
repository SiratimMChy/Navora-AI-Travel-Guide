"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { FaPlus, FaTrash } from "react-icons/fa";

const categories = ["beach", "mountain", "city", "adventure", "cruise"];

export default function EditDestinationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dest, setDest] = useState<Record<string, unknown> | null>(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isAdmin = (session?.user as { role?: string })?.role === "admin";

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && !isAdmin)) {
      router.push("/");
    }
  }, [status, isAdmin, router]);

  useEffect(() => {
    fetch(`/api/destinations/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setDest(d);
        setCategory(d.category);
        const all = [d.image, ...(d.images || [])].filter(Boolean) as string[];
        setImages(all.length > 0 ? all : [""]);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const validImages = images.filter((img) => img.trim() !== "");
    const formData = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      category,
      price: parseInt((form.elements.namedItem("price") as HTMLInputElement).value),
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      duration: (form.elements.namedItem("duration") as HTMLInputElement).value,
      rating: parseFloat((form.elements.namedItem("rating") as HTMLInputElement).value) || (dest?.rating as number) || 4.5,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      image: validImages[0] || "",
      images: validImages.slice(1),
    };
    setSaving(true);
    const res = await fetch(`/api/destinations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSaving(false);
    if (res.ok) {
      Swal.fire({ title: "Updated Successfully!", icon: "success", timer: 1500, showConfirmButton: false });
      router.push(`/destinations/${id}`);
    } else {
      Swal.fire("Error", "Failed to update destination.", "error");
    }
  };

  if (loading || !dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-sky-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-base-100 shadow-lg rounded-2xl p-8 border border-base-content/10">
        <h2 className="text-3xl font-bold mb-6 text-center text-base-content">Update Destination</h2>
        <form onSubmit={handleUpdate} className="space-y-4">

          <div>
            <label className="label"><span className="label-text font-semibold">Title</span></label>
            <input defaultValue={dest.title as string} name="title" type="text" className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Category</span></label>
            <select value={category} name="category" onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full">
              {categories.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Price ($ per person)</span></label>
            <input defaultValue={dest.price as number} name="price" type="number" className="input input-bordered w-full" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text font-semibold">Location</span></label>
              <input defaultValue={dest.location as string} name="location" type="text" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label"><span className="label-text font-semibold">Country</span></label>
              <input defaultValue={dest.country as string} name="country" type="text" className="input input-bordered w-full" required />
            </div>
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Duration</span></label>
            <input defaultValue={dest.duration as string} name="duration" type="text" className="input input-bordered w-full" placeholder="e.g. 7 days" />
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Rating (0 – 5)</span></label>
            <input defaultValue={dest.rating as number} name="rating" type="number" step="0.1" min="0" max="5" className="input input-bordered w-full" placeholder="e.g. 4.5" />
          </div>

          {/* Multiple Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="label-text font-semibold">Images</span>
              <button type="button" onClick={() => setImages([...images, ""])}
                className="btn btn-xs bg-linear-to-r from-sky-500 to-teal-500 text-white border-0 gap-1">
                <FaPlus size={10} /> Add Image
              </button>
            </div>
            <div className="space-y-2">
              {images.map((img, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => { const u = [...images]; u[i] = e.target.value; setImages(u); }}
                    placeholder={i === 0 ? "Main image URL (required)" : `Extra image ${i}`}
                    className="input input-bordered w-full text-sm"
                    required={i === 0}
                  />
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0 border border-base-300" />
                  )}
                  {images.length > 1 && (
                    <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 shrink-0">
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-base-content/40 mt-1">First image is the main cover photo</p>
          </div>

          <div>
            <label className="label"><span className="label-text font-semibold">Description</span></label>
            <textarea defaultValue={dest.description as string} name="description"
              className="textarea textarea-bordered w-full" rows={4} required />
          </div>

          <button type="submit" disabled={saving}
            className="btn w-full text-white bg-linear-to-r from-sky-500 to-teal-500 border-0 hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : "Update Destination"}
          </button>
        </form>
      </div>
    </div>
  );
}
