import Image from "next/image";
import { FaPlane, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { Booking } from "@/types";

type BookingWithDest = Booking & {
  destinationId: { title: string; image: string; location: string; country: string };
  rejectionReason?: string;
  paid?: boolean;
};

interface MyBookingsTabProps {
  bookings: BookingWithDest[];
  loadingBookings: boolean;
}

export default function MyBookingsTab({ bookings, loadingBookings }: MyBookingsTabProps) {
  const [payingId, setPayingId] = useState<string | null>(null);

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
      else Swal.fire("Payment Error", "We couldn't start the payment process. Please try again.", "error");
    } catch {
      Swal.fire("Payment Failed", "Something went wrong with the payment. Please give it another try.", "error");
    }
    setPayingId(null);
  };

  return (
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
          <a href="/explore" className="btn btn-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-sky-600 hover:to-teal-600 border-none">Explore Now</a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={String(b._id)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-base-100 border border-base-300 rounded-2xl hover:shadow-md transition-shadow">
              <Image src={b.destinationId?.image || ''} alt="" width={80} height={80} className="w-20 h-20 rounded-xl object-cover shrink-0" />
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
                          className="btn btn-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0 disabled:opacity-50"
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
  );
}
