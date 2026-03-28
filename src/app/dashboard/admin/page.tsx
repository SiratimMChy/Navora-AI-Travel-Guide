"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaUsers, FaMapMarkerAlt, FaPlane, FaChartBar,
  FaPlus, FaTrash, FaCog, FaSave, FaNewspaper, FaEdit,
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Destination, BlogPost } from "@/types";
import Swal from "sweetalert2";
import UsersTab from "@/components/dashboard/UsersTab";

type AdminTab = "overview" | "destinations" | "users" | "bookings" | "blog" | "settings";

const PIE_COLORS = ["#0ea5e9", "#14b8a6", "#8b5cf6", "#f97316", "#ec4899"];

const emptyDest = { title: "", location: "", country: "", category: "beach", price: 0, description: "", image: "", duration: "" };
const emptyPost = { title: "", excerpt: "", content: "", image: "", author: "", category: "", readTime: "5 min read" };

function AdminDashboardInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<AdminTab>((searchParams.get("tab") as AdminTab) || "overview");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [users, setUsers] = useState<{ _id: string; name: string; email: string; role: string; status?: string; createdAt?: string }[]>([]);
  const [bookings, setBookings] = useState<{ _id: string; userId: string; totalPrice: number; status: string; travelDate: string; travelers: number; rejectionReason?: string; destinationId?: { title: string; image: string } }[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({ destinations: 0, bookings: 0, users: 0, avgRating: "4.9" });
  const [bookingChartData, setBookingChartData] = useState<{ month: string; bookings: number; revenue: number }[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newDest, setNewDest] = useState(emptyDest);
  const [newPost, setNewPost] = useState(emptyPost);
  const [settings, setSettings] = useState({ siteName: "Navora", supportEmail: "support@navora.travel", maxBookingsPerUser: 10, maintenanceMode: false });
  const [destPage, setDestPage] = useState(1);
  const DEST_PER_PAGE = 5;

  const user = session?.user as { role?: string } | undefined;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && user?.role !== "admin") router.push("/dashboard");
  }, [status, user, router]);

  useEffect(() => {
    const urlTab = (searchParams.get("tab") as AdminTab) || "overview";
    setTab(urlTab);
  }, [searchParams]);

  useEffect(() => {
    if (tab === "overview") {
      fetch("/api/stats").then((r) => r.json()).then((d) => setStats(d));
      fetch("/api/admin/bookings")
        .then((r) => r.ok ? r.json() : [])
        .then((data: { travelDate: string; totalPrice: number; destinationId?: { category?: string } }[]) => {
          if (!Array.isArray(data)) return;
          const monthMap: Record<string, { bookings: number; revenue: number }> = {};
          data.forEach((b) => {
            const m = new Date(b.travelDate).toLocaleString("en-US", { month: "short" });
            if (!monthMap[m]) monthMap[m] = { bookings: 0, revenue: 0 };
            monthMap[m].bookings++;
            monthMap[m].revenue += b.totalPrice || 0;
          });
          setBookingChartData(Object.entries(monthMap).map(([month, v]) => ({ month, ...v })));
          const catMap: Record<string, number> = {};
          data.forEach((b) => {
            const cat = b.destinationId?.category || "Other";
            catMap[cat] = (catMap[cat] || 0) + 1;
          });
          setCategoryData(Object.entries(catMap).map(([name, value]) => ({ name, value })));
        });
    }
    if (tab === "destinations") {
      setLoading(true);
      fetch("/api/destinations?limit=1000").then((r) => r.json()).then((d) => { setDestinations(d.destinations || []); setLoading(false); });
    }
    if (tab === "users") {
      setLoading(true);
      fetch("/api/users").then((r) => r.json()).then((d) => { setUsers(Array.isArray(d) ? d : []); setLoading(false); });
    }
    if (tab === "bookings") {
      setLoading(true);
      fetch("/api/admin/bookings").then((r) => r.ok ? r.json() : []).then((d) => { setBookings(Array.isArray(d) ? d : []); setLoading(false); });
    }
    if (tab === "blog") {
      setLoading(true);
      fetch("/api/blog").then((r) => r.json()).then((d) => { setBlogPosts(Array.isArray(d) ? d : []); setLoading(false); });
    }
  }, [tab]);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPost) });
    if (res.ok) {
      Swal.fire("Added!", "Blog post created.", "success");
      setShowAddPost(false); setNewPost(emptyPost);
      fetch("/api/blog").then((r) => r.json()).then((d) => setBlogPosts(Array.isArray(d) ? d : []));
    }
  };

  const handleDeletePost = async (id: string) => {
    const result = await Swal.fire({ title: "Delete post?", icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444", confirmButtonText: "Delete" });
    if (!result.isConfirmed) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setBlogPosts(blogPosts.filter((p) => String(p._id) !== id));
    Swal.fire("Deleted!", "Post removed.", "success");
  };

  const handleAddDestination = async (e: React.FormEvent) => {
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

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-base-100"><span className="loading loading-spinner loading-lg text-sky-500" /></div>;
  }

  const statCards = [
    { icon: FaUsers, label: "Total Users", value: stats.users || "—", color: "text-sky-500 bg-sky-500/10" },
    { icon: FaMapMarkerAlt, label: "Destinations", value: stats.destinations || "—", color: "text-teal-500 bg-teal-500/10" },
    { icon: FaPlane, label: "Bookings", value: stats.bookings || "—", color: "text-purple-500 bg-purple-500/10" },
    { icon: FaChartBar, label: "Avg Rating", value: stats.avgRating, color: "text-green-500 bg-green-500/10" },
  ];

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Analytics", icon: <FaChartBar /> },
    { key: "destinations", label: "Destinations", icon: <FaMapMarkerAlt /> },
    { key: "users", label: "Manage Users", icon: <FaUsers /> },
    { key: "bookings", label: "Manage Bookings", icon: <FaPlane /> },
    { key: "blog", label: "Blog Posts", icon: <FaNewspaper /> },
    { key: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Tab bar — mobile */}
        <div className="flex gap-1 bg-base-200 p-1 rounded-xl border border-base-300 w-full overflow-x-auto md:hidden">
          {tabs.map(({ key, label, icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === key ? "bg-sky-500 text-white shadow-sm" : "text-base-content/60 hover:text-base-content"}`}>
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">

          {/* ── ANALYTICS ── */}
          {tab === "overview" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-base-200 border border-base-300 rounded-2xl p-5 shadow-md flex items-center gap-4">
                    <div className={`p-3 rounded-full ${color}`}><Icon size={22} /></div>
                    <div><p className="text-2xl font-bold text-base-content">{value}</p><p className="text-base-content/50 text-xs">{label}</p></div>
                  </div>
                ))}
              </div>

              <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md">
                <h2 className="text-lg font-bold text-base-content mb-5">Monthly Bookings & Revenue</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={bookingChartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bookings" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Bookings" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-base-content mb-5">Revenue Trend</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={bookingChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} name="Revenue ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-base-content mb-5">Bookings by Category</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                        {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* ── DESTINATIONS ── */}
          {tab === "destinations" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Manage Destinations</h2>
                <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary btn-sm text-white gap-2">
                  <FaPlus /> Add Destination
                </button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddDestination} className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <button
                        type="button"
                        disabled={!newDest.title}
                        onClick={async () => {
                          const res = await fetch("/api/ai/generate-description", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ title: newDest.title }),
                          });
                          const data = await res.json();
                          if (data.success) setNewDest({ ...newDest, description: data.data });
                        }}
                        className="btn btn-xs bg-linear-to-r from-sky-500 to-teal-500 text-white border-0 hover:opacity-90 disabled:opacity-40"
                      >
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
                              <a href={`/destinations/${d._id}/edit`} className="btn btn-ghost btn-sm text-sky-500 hover:text-sky-700 hover:bg-sky-500/10">
                                <FaEdit size={13} />
                              </a>
                              <button onClick={() => handleDelete(d._id!)} className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-500/10">
                                <FaTrash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Destinations Pagination */}
                  {Math.ceil(destinations.length / DEST_PER_PAGE) > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-base-300">
                      <p className="text-xs text-base-content/50">
                        Showing {(destPage - 1) * DEST_PER_PAGE + 1}–{Math.min(destPage * DEST_PER_PAGE, destinations.length)} of {destinations.length}
                      </p>
                      <div className="flex gap-1">
                        <button onClick={() => setDestPage((p) => Math.max(1, p - 1))} disabled={destPage === 1}
                          className="btn btn-xs btn-outline disabled:opacity-40">‹</button>
                        {Array.from({ length: Math.ceil(destinations.length / DEST_PER_PAGE) }, (_, i) => i + 1).map((p) => (
                          <button key={p} onClick={() => setDestPage(p)}
                            className={`btn btn-xs ${destPage === p ? "btn-primary text-white" : "btn-outline"}`}>{p}</button>
                        ))}
                        <button onClick={() => setDestPage((p) => Math.min(Math.ceil(destinations.length / DEST_PER_PAGE), p + 1))}
                          disabled={destPage === Math.ceil(destinations.length / DEST_PER_PAGE)}
                          className="btn btn-xs btn-outline disabled:opacity-40">›</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── USERS ── */}
          {tab === "users" && <UsersTab users={users} setUsers={setUsers} loading={loading} />}

          {/* ── BOOKINGS ── */}
          {tab === "bookings" && (
            <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md overflow-hidden">
              <div className="p-5 border-b border-base-300 flex items-center justify-between">
                <h2 className="text-xl font-bold text-base-content">Manage Bookings</h2>
                <span className="badge badge-outline">{bookings.length} total</span>
              </div>
              {loading ? (
                <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-sky-500" /></div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 text-base-content/40">
                  <FaPlane className="text-5xl mx-auto mb-3 opacity-20" />
                  <p>No bookings found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-300 text-base-content/70 text-sm">
                      <tr><th>Destination</th><th>Travelers</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b._id} className="hover:bg-base-300/50 border-b border-base-300">
                          <td className="font-semibold text-base-content text-sm">{b.destinationId?.title || "—"}</td>
                          <td className="text-base-content/60 text-sm">{b.travelers}</td>
                          <td className="text-base-content/40 text-xs">{new Date(b.travelDate).toLocaleDateString()}</td>
                          <td className="font-bold text-sky-600">${b.totalPrice}</td>
                          <td>
                            <span className={`badge text-xs capitalize text-white ${
                              b.status === "confirmed" ? "badge-success" :
                              b.status === "rejected" ? "badge-error" :
                              b.status === "cancelled" ? "badge-error" : "badge-warning"
                            }`}>{b.status}</span>
                          </td>
                          <td>
                            {b.status === "pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={async () => {
                                    const res = await fetch("/api/admin/bookings", {
                                      method: "PATCH",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ id: b._id, action: "confirm" }),
                                    });
                                    if (res.ok) {
                                      setBookings(bookings.map((x) => x._id === b._id ? { ...x, status: "confirmed" } : x));
                                      Swal.fire("Approved!", "Booking confirmed.", "success");
                                    }
                                  }}
                                  className="btn btn-xs btn-success text-white">Approve</button>
                                <button
                                  onClick={async () => {
                                    const { value: reason, isConfirmed } = await Swal.fire({
                                      title: "Reject Booking",
                                      input: "textarea",
                                      inputLabel: "Reason for rejection",
                                      inputPlaceholder: "Enter reason...",
                                      inputAttributes: { "aria-label": "Rejection reason" },
                                      showCancelButton: true,
                                      confirmButtonText: "Reject",
                                      confirmButtonColor: "#ef4444",
                                      inputValidator: (v) => !v.trim() ? "Please provide a reason." : undefined,
                                    });
                                    if (!isConfirmed) return;
                                    const res = await fetch("/api/admin/bookings", {
                                      method: "PATCH",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ id: b._id, action: "reject", reason }),
                                    });
                                    if (res.ok) {
                                      setBookings(bookings.map((x) => x._id === b._id ? { ...x, status: "rejected", rejectionReason: reason } : x));
                                      Swal.fire("Rejected", "Booking has been rejected.", "info");
                                    }
                                  }}
                                  className="btn btn-xs btn-error text-white">Reject</button>
                              </div>
                            )}
                            {b.status !== "pending" && <span className="text-xs text-base-content/30 italic">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── BLOG ── */}
          {tab === "blog" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Blog Posts</h2>
                <button onClick={() => setShowAddPost(!showAddPost)} className="btn btn-primary btn-sm text-white gap-2">
                  <FaPlus /> Add Post
                </button>
              </div>

              {showAddPost && (
                <form onSubmit={handleAddPost} className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="input input-bordered w-full col-span-full" required />
                  <input placeholder="Author" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} className="input input-bordered w-full" required />
                  <input placeholder="Category (e.g. Tips, Budget)" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })} className="input input-bordered w-full" required />
                  <input placeholder="Image URL" value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} className="input input-bordered w-full" required />
                  <input placeholder="Read time (e.g. 5 min read)" value={newPost.readTime} onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })} className="input input-bordered w-full" />
                  <textarea placeholder="Excerpt (short summary)" value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} className="textarea textarea-bordered w-full col-span-full" rows={2} required />
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
                            <button onClick={() => handleDeletePost(String(p._id))} className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-500/10">
                              <FaTrash size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === "settings" && (
            <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md p-6 space-y-6">
              <h2 className="text-xl font-bold text-base-content">Platform Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-base-content/70 mb-1">Site Name</label>
                  <input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-base-content/70 mb-1">Support Email</label>
                  <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-base-content/70 mb-1">Max Bookings per User</label>
                  <input type="number" value={settings.maxBookingsPerUser} onChange={(e) => setSettings({ ...settings, maxBookingsPerUser: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="text-sm font-semibold text-base-content/70">Maintenance Mode</label>
                  <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="toggle toggle-warning" />
                  <span className={`text-xs font-semibold ${settings.maintenanceMode ? "text-orange-500" : "text-base-content/40"}`}>
                    {settings.maintenanceMode ? "ON" : "OFF"}
                  </span>
                </div>
              </div>
              <div className="border-t border-base-300 pt-5">
                <h3 className="text-base font-bold text-base-content mb-4">Danger Zone</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => Swal.fire("Info", "Cache cleared successfully.", "success")} className="btn btn-outline btn-sm">Clear Cache</button>
                  <button onClick={() => Swal.fire("Warning", "This would reset all analytics data.", "warning")} className="btn btn-outline btn-error btn-sm">Reset Analytics</button>
                </div>
              </div>
              <button onClick={() => Swal.fire("Saved!", "Settings updated successfully.", "success")} className="btn btn-primary text-white gap-2">
                <FaSave /> Save Settings
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100"><span className="loading loading-spinner loading-lg text-sky-500" /></div>}>
      <AdminDashboardInner />
    </Suspense>
  );
}
