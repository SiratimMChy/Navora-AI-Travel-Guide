import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import Swal from "sweetalert2";
import { BookingWithDest } from "@/app/dashboard/page";

interface MyReviewsTabProps {
  bookings: BookingWithDest[];
  loadingBookings: boolean;
  userId: string | undefined;
}

export default function MyReviewsTab({ bookings, loadingBookings, userId }: MyReviewsTabProps) {
  const [myReviews, setMyReviews] = useState<{ destinationId: string }[]>([]);
  const [reviewForms, setReviewForms] = useState<Record<string, { rating: number; comment: string; submitting: boolean }>>({});

  useEffect(() => {
    if (userId) {
      fetch(`/api/reviews?userId=${userId}`)
        .then((r) => r.ok ? r.json() : [])
        .then((d) => setMyReviews(Array.isArray(d) ? d : []));
    }
  }, [userId]);

  const reviewedIds = new Set(myReviews.map((r) => String(r.destinationId)));
  const pendingReview = bookings.filter(
    (b) => b.status === "confirmed" && !reviewedIds.has(String((b.destinationId as unknown as { _id?: string })?._id || b.destinationId))
  );

  const submitReview = async (b: BookingWithDest) => {
    const destId = String((b.destinationId as unknown as { _id?: string })?._id || b.destinationId);
    const form = reviewForms[destId];
    if (!form || form.rating < 1) { Swal.fire("Rating Required", "Please select a star rating before submitting.", "warning"); return; }
    if (!form.comment.trim()) { Swal.fire("Comment Required", "Please write a comment for your review.", "warning"); return; }
    
    setReviewForms((prev) => ({ ...prev, [destId]: { ...prev[destId], submitting: true } }));
    
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId: destId, rating: form.rating, comment: form.comment }),
    });
    
    if (res.ok) {
      Swal.fire("Thanks!", "Your review has been submitted successfully.", "success");
      setMyReviews((prev) => [...prev, { destinationId: destId }]);
    } else {
      Swal.fire("Oops!", "We couldn't submit your review right now. Please try again.", "error");
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
                  <Image src={b.destinationId?.image || ''} alt="" width={64} height={64} className="w-16 h-16 rounded-xl object-cover shrink-0" />
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
                  className="btn btn-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-sky-600 hover:to-teal-600 border-none disabled:opacity-50">
                  {form.submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
