"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileTab from "@/components/dashboard/ProfileTab";
import { FaPlane, FaUser, FaStar, FaCalendar, FaMapMarkerAlt, FaNewspaper, FaPlus, FaTrash } from "react-icons/fa";
import { Booking, BlogPost } from "@/types";
import { Suspense } from "react";
import Swal from "sweetalert2";

type BookingWithDest = Booking & {
  destinationId: { title: string; image: string; location: string; country: string };
  rejectionReason?: string;
  paid?: boolean;
};

type Tab = "profile" | "bookings" | "reviews" | "blog";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = (searchParams.get("tab") as Tab) || "profile";
  const [tab, setTab] = useState<Tab>(tabParam);
  const [bookings, setBookings] = useState<BookingWithDest[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [myReviews, setMyReviews] = useState<{ destinationId: string }[]>([]);
  const [reviewForms, setReviewForms] = useState<Record<string, { rating: number; comment: string; submitting: boolean }>>({});
  const [myPosts, setMyPosts] = useState<BlogPost[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", content: "", image: "", category: "", readTime: "5 min read" });

  const [payingId, setPayingId] = useState<string | null>(null);

  const user = session?.user as {
    name?: string; email?: string; image?: string; role?: string;
  } | undefined;

  const handlePay = async (b: BookingWithDest) => {
    setPayingId(String(b._id));
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: String(b._id),
          destinationTitle: b.destinationId?.title,
          totalPrice: b.totalPrice,
          travelers: b.travelers,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else Swal.fire("Payment Error", data.error || "Could not initiate payment.", "error");
    } catch {
      Swal.fire("Error", "Payment failed. Try again.", "error");
    }
    setPayingId(null);
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    setTab(tabParam);
  }, [tabParam]);

  const fetchBookings = () => {
    fetch("/api/bookings")
      .then((r) => r.ok ? r.json() : [])
      .then((d) => { setBookings(Array.isArray(d) ? d : []); setLoadingBookings(false); });
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings();
      const uid = (session?.user as { id?: string })?.id;
      if (uid) {
        fetch(`/api/reviews?userId=${uid}`)
          .then((r) => r.ok ? r.json() : [])
          .then((d) => setMyReviews(Array.isArray(d) ? d : []));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Refetch bookings when returning from successful payment
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success" && status === "authenticated") {
      fetchBookings();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, status]);

  useEffect(() => {
    if (tab === "blog") {
      fetch("/api/blog").then((r) => r.json()).then((d) => setMyPosts(Array.isArray(d) ? d.filter((p: BlogPost) => p.author === user?.name) : []));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-sky-500" />
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "My Profile", icon: <FaUser /> },
    { key: "bookings", label: "My Bookings", icon: <FaPlane /> },
    { key: "reviews", label: "My Reviews", icon: <FaStar /> },
    { key: "blog", label: "My Blog", icon: <FaNewspaper /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-base-content/50 text-sm mt-0.5">Manage your profile, bookings and reviews</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Trips", value: bookings.length, color: "text-sky-500" },
          { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, color: "text-green-500" },
          { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, color: "text-yellow-500" },
          { label: "Rejected", value: bookings.filter((b) => b.status === "rejected").length, color: "text-red-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-base-200 rounded-2xl p-4 text-center border border-base-300">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-base-content/50 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tab bar — mobile only, desktop uses Aside */}
      <div className="flex gap-1 mb-6 bg-base-200 p-1 rounded-xl border border-base-300 w-full sm:w-fit overflow-x-auto md:hidden">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === key
                ? "bg-sky-500 text-white shadow-sm"
                : "text-base-content/60 hover:text-base-content"
            }`}
          >
            <span>{icon}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "profile" && <ProfileTab />}

      {tab === "bookings" && (
        <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
          <h2 className="text-xl font-bold text-base-content mb-5">My Bookings</h2>
          {loadingBookings ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-sky-500" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 text-base-content/40">
              <FaPlane className="text-6xl mx-auto mb-4 opacity-20" />
              <p className="text-lg font-semibold mb-1">No bookings yet</p>
              <p className="text-sm mb-5">Start exploring and book your first trip!</p>
              <a href="/explore" className="btn btn-primary btn-sm text-white">Explore Now</a>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={String(b._id)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-base-100 border border-base-300 rounded-2xl hover:shadow-md transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.destinationId?.image} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base-content text-lg truncate">{b.destinationId?.title}</p>
                    <p className="text-base-content/50 text-sm flex items-center gap-1 mt-0.5">
                      <FaMapMarkerAlt className="text-sky-500 shrink-0" />
                      {b.destinationId?.location}, {b.destinationId?.country}
                    </p>
                    <p className="text-base-content/40 text-xs mt-1 flex items-center gap-1">
                      <FaCalendar className="shrink-0" />
                      {new Date(b.travelDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      &nbsp;·&nbsp;{b.travelers} traveler(s)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-sky-500">${b.totalPrice}</p>
                    <span className={`badge mt-1 text-white capitalize ${
                      b.status === "confirmed" ? "badge-success" :
                      b.status === "rejected" ? "badge-error" :
                      b.status === "cancelled" ? "badge-error" : "badge-warning"
                    }`}>{b.status}</span>
                    {b.status === "confirmed" && (
                      <div className="mt-3">
                        {b.paid === true ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/10 text-teal-600 border border-teal-200">
                            ✅ Payment Completed
                          </span>
                        ) : (
                          <div className="flex flex-col gap-1.5 items-end">
                            <button
                              onClick={() => handlePay(b)}
                              disabled={payingId === String(b._id)}
                              className="btn btn-sm text-white bg-linear-to-r from-sky-500 to-teal-500 hover:opacity-90 border-0 disabled:opacity-50"
                            >
                              {payingId === String(b._id) ? <span className="loading loading-spinner loading-xs" /> : "💳 Pay Now"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {b.status === "rejected" && b.rejectionReason && (
                      <div className="mt-2 max-w-[180px] text-left bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                        <p className="text-xs font-semibold text-red-500 mb-0.5">Rejection Reason:</p>
                        <p className="text-xs text-red-400">{b.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "blog" && (
        <div className="bg-base-200 rounded-2xl border border-base-300 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-base-content">My Blog Posts</h2>
            <button onClick={() => setShowAddPost(!showAddPost)} className="btn btn-primary btn-sm text-white gap-2">
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
                    className="btn btn-xs bg-linear-to-r from-sky-500 to-teal-500 text-white border-0 hover:opacity-90 disabled:opacity-40"
                  >
                    ✨ Generate with AI
                  </button>
                </div>
                <textarea placeholder="Full content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} className="textarea textarea-bordered w-full" rows={5} />
              </div>
              <div className="col-span-full flex gap-3">
                <button type="submit" className="btn btn-primary text-white">Publish Post</button>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
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
                    className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "reviews" && (() => {        const reviewedIds = new Set(myReviews.map((r) => String(r.destinationId)));
        const pendingReview = bookings.filter(
          (b) => b.status === "confirmed" && !reviewedIds.has(String((b.destinationId as unknown as { _id?: string })?._id || b.destinationId))
        );

        const submitReview = async (b: BookingWithDest) => {
          const destId = String((b.destinationId as unknown as { _id?: string })?._id || b.destinationId);
          const form = reviewForms[destId];
          if (!form || form.rating < 1) { Swal.fire("Rating required", "Please select a star rating.", "warning"); return; }
          if (!form.comment.trim()) { Swal.fire("Comment required", "Please write a comment.", "warning"); return; }
          setReviewForms((prev) => ({ ...prev, [destId]: { ...prev[destId], submitting: true } }));
          const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destinationId: destId, rating: form.rating, comment: form.comment }),
          });
          if (res.ok) {
            Swal.fire("Thanks!", "Your review has been submitted.", "success");
            setMyReviews((prev) => [...prev, { destinationId: destId }]);
          } else {
            Swal.fire("Error", "Failed to submit review.", "error");
          }
          setReviewForms((prev) => ({ ...prev, [destId]: { rating: 0, comment: "", submitting: false } }));
        };

        return (
          <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
            <h2 className="text-xl font-bold text-base-content mb-2">My Reviews</h2>
            <p className="text-base-content/50 text-sm mb-5">Trips you&apos;ve completed but haven&apos;t reviewed yet</p>
            {loadingBookings ? (
              <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-sky-500" /></div>
            ) : pendingReview.length === 0 ? (
              <div className="text-center py-16 text-base-content/40">
                <FaStar className="text-6xl mx-auto mb-4 opacity-20" />
                <p className="text-lg font-semibold mb-1">All caught up!</p>
                <p className="text-sm">You&apos;ve reviewed all your completed trips.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReview.map((b) => {
                  const destId = String((b.destinationId as unknown as { _id?: string })?._id || b.destinationId);
                  const form = reviewForms[destId] || { rating: 0, comment: "", submitting: false };
                  return (
                    <div key={String(b._id)} className="bg-base-100 border border-base-300 rounded-2xl p-5 space-y-4">
                      {/* Destination info */}
                      <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.destinationId?.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-base-content">{b.destinationId?.title}</p>
                          <p className="text-base-content/50 text-sm flex items-center gap-1">
                            <FaMapMarkerAlt className="text-sky-500" size={11} />
                            {b.destinationId?.location}, {b.destinationId?.country}
                          </p>
                          <p className="text-base-content/40 text-xs mt-0.5 flex items-center gap-1">
                            <FaCalendar size={10} />
                            Travelled {new Date(b.travelDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      {/* Star picker */}
                      <div>
                        <p className="text-sm font-semibold text-base-content mb-1">Your Rating</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button"
                              onClick={() => setReviewForms((prev) => ({ ...prev, [destId]: { ...form, rating: star } }))}
                              className={`text-2xl transition-colors ${star <= form.rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}>
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Comment */}
                      <textarea
                        value={form.comment}
                        onChange={(e) => setReviewForms((prev) => ({ ...prev, [destId]: { ...form, comment: e.target.value } }))}
                        placeholder="Share your experience..."
                        rows={3}
                        className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-sm resize-none"
                      />
                      <button
                        onClick={() => submitReview(b)}
                        disabled={form.submitting}
                        className="btn btn-primary btn-sm text-white disabled:opacity-50">
                        {form.submitting ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default function DashboardPage() {
  return <Suspense><DashboardContent /></Suspense>;
}
