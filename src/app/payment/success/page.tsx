"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi2";
import { FaPlane, FaMapMarkerAlt } from "react-icons/fa";

function PaymentSuccessContent() {
  const [visible, setVisible] = useState(false);
  const [marking, setMarking] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Mark booking as paid on page load, then auto-redirect to dashboard
  useEffect(() => {
    if (!bookingId) { setMarking(false); return; }
    fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paid: true }),
    }).finally(() => {
      setMarking(false);
      // Auto redirect after 3 seconds so user sees the success screen
      setTimeout(() => {
        router.push("/dashboard?tab=bookings&payment=success");
      }, 3000);
    });
  }, [bookingId, router]);

  if (marking) {
    return (
      <div className="min-h-screen bg-linear-to-br from-sky-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-sky-500" />
          <p className="text-gray-500 mt-3 text-sm">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className={`max-w-xl w-full transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-linear-to-r from-sky-500 to-teal-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <HiCheckCircle className="w-20 h-20 text-teal-500" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Payment Successful!</h1>
              <p className="text-white/80 text-base">Redirecting to your bookings...</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-gray-600 text-base leading-relaxed">
                Thank you for booking with Navora. Your trip is confirmed!
              </p>
              {bookingId && (
                <p className="text-xs text-gray-400">Booking ID: <span className="font-mono font-semibold text-gray-600">{bookingId}</span></p>
              )}
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><FaPlane className="text-sky-500" /> What happens next?</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="text-teal-500 font-bold mt-0.5">✓</span> Your booking is now marked as paid</li>
                <li className="flex items-start gap-2"><span className="text-teal-500 font-bold mt-0.5">✓</span> Our team will prepare your travel itinerary</li>
                <li className="flex items-start gap-2"><span className="text-teal-500 font-bold mt-0.5">✓</span> You can view your booking details in your dashboard</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-1"><FaMapMarkerAlt className="text-teal-500" /> Explore more destinations</h3>
              <p className="text-gray-600 text-sm">Discover more amazing places for your next adventure.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => router.push("/dashboard?tab=bookings&payment=success")}
                className="flex-1 py-3 rounded-xl font-semibold text-center text-white bg-linear-to-r from-sky-500 to-teal-500 hover:opacity-90 transition-opacity"
              >
                View My Bookings
              </button>
              <Link
                href="/explore"
                className="flex-1 py-3 rounded-xl font-semibold text-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Explore More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-sky-50 to-teal-50 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-sky-500" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
