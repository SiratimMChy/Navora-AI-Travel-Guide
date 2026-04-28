"use client";
import { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { Destination } from "@/types";
import Swal from "sweetalert2";

const emptyDest = { title: "", location: "", country: "", category: "beach", price: 0, description: "", image: "", duration: "" };
const DEST_PER_PAGE = 5;

type Props = {
  destinations: Destination[];
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  loading: boolean;
};

export default function DestinationsTab({ destinations, setDestinations, loading }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDest, setNewDest] = useState(emptyDest);
  const [destPage, setDestPage] = useState(1);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/destinations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newDest, rating: 4.5, reviewCount: 0 }) });
    if (res.ok) {
      Swal.fire("Added!", "Destination created successfully.", "success");
      setShowAddForm(false); setNewDest(emptyDest);
      fetch("/api/destinations?limit=1000").then((r) => r.json()).then((d) => setDestinations(d.destinations || []));
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({ title: "Delete destination?", text: "This cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444", confirmButtonText: "Delete" });
    if (!result.isConfirmed) return;
    await fetch(`/api/destinations/${id}`, { method: "DELETE" });
    setDestinations(destinations.filter((d) => d._id !== id));
    Swal.fire("Deleted!", "Destination removed.", "success");
  };

  const totalPages = Math.ceil(destinations.length / DEST_PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-base-content">Manage Destinations</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary btn-sm text-white gap-2">
          <FaPlus /> Add Destination
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Title" value={newDest.title} onChange={(e) => setNewDest({ ...newDest, title: e.target.value })} className="input input-bordered w-full" required />
          <input placeholder="Location" value={newDest.location} onChange={(e) => setNewDest({ ...newDest, location: e.target.value })} className="input input-bordered w-full" required />
          <input placeholder="Country" value={newDest.country} onChange={(e) => setNewDest({ ...newDest, country: e.target.value })} className="input input-bordered w-full" required />
          <select value={newDest.category} onChange={(e) => setNewDest({ ...newDest, category: e.target.value })} className="select select-bordered w-full">
            {["beach", "mountain", "city", "adventure", "cruise"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" placeholder="Price ($)" value={newDest.price || ""} onChange={(e) => setNewDest({ ...newDest, price: Number(e.target.value) })} className="input input-bordered w-full" required />
          <input placeholder="Duration (e.g. 7 days)" value={newDest.duration} onChange={(e) => setNewDest({ ...newDest, duration: e.target.value })} className="input input-bordered w-full" />
          <input placeholder="Image URL" value={newDest.image} onChange={(e) => setNewDest({ ...newDest, image: e.target.value })} className="input input-bordered w-full col-span-full" required />
          <div className="col-span-full space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-base-content/70">Description</label>
              <button type="button" disabled={!newDest.title}
                onClick={async () => {
                  const res = await fetch("/api/ai/generate-description", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: newDest.title }) });
                  const data = await res.json();
                  if (data.success) setNewDest({ ...newDest, description: data.data });
                }}
                className="btn btn-xs bg-linear-to-r from-sky-500 to-teal-500 text-white border-0 hover:opacity-90 disabled:opacity-40">
                ✨ Generate with AI
              </button>
            </div>
            <textarea placeholder="Description" value={newDest.description} onChange={(e) => setNewDest({ ...newDest, description: e.target.value })} className="textarea textarea-bordered w-full" rows={3} required />
          </div>
          <div className="col-span-full flex gap-3">
            <button type="submit" className="btn btn-primary text-white">Save Destination</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-sky-500" /></div>
      ) : destinations.length === 0 ? (
        <div className="bg-base-200 border border-base-300 rounded-2xl p-12 shadow-md text-center text-base-content/40">
          <FaMapMarkerAlt className="text-5xl mx-auto mb-3 opacity-20" />
          <p>No destinations yet. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-300 text-base-content/70 text-sm">
              <tr><th>Destination</th><th>Category</th><th>Price</th><th>Rating</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {destinations.slice((destPage - 1) * DEST_PER_PAGE, destPage * DEST_PER_PAGE).map((d) => (
                <tr key={d._id} className="hover:bg-base-300/50 border-b border-base-300">
                  <td>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-base-content">{d.title}</p>
                        <p className="text-xs text-base-content/40">{d.location}, {d.country}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-outline capitalize text-xs">{d.category}</span></td>
                  <td className="font-bold text-sky-600">${d.price}</td>
                  <td className="text-sm">⭐ {d.rating}</td>
                  <td>
                    <div className="flex gap-1">
                      <a href={`/destinations/${d._id}/edit`} className="btn btn-ghost btn-sm text-sky-500 hover:text-sky-700 hover:bg-sky-500/10"><FaEdit size={13} /></a>
                      <button onClick={() => handleDelete(d._id!)} className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-500/10"><FaTrash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-base-300">
              <p className="text-xs text-base-content/50">Showing {(destPage - 1) * DEST_PER_PAGE + 1}–{Math.min(destPage * DEST_PER_PAGE, destinations.length)} of {destinations.length}</p>
              <div className="flex gap-1">
                <button onClick={() => setDestPage((p) => Math.max(1, p - 1))} disabled={destPage === 1} className="btn btn-xs btn-outline disabled:opacity-40">‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setDestPage(p)} className={`btn btn-xs ${destPage === p ? "btn-primary text-white" : "btn-outline"}`}>{p}</button>
                ))}
                <button onClick={() => setDestPage((p) => Math.min(totalPages, p + 1))} disabled={destPage === totalPages} className="btn btn-xs btn-outline disabled:opacity-40">›</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
