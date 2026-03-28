"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { HiXCircle } from "react-icons/hi2";
import { FiHelpCircle } from "react-icons/fi";
import { FaPlane } from "react-icons/fa";

function PaymentCancelledContent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className={`max-w-xl w-full transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-linear-to-r from-red-500 via-rose-500 to-pink-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <HiXCircle className="w-20 h-20 text-red-500" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Payment Cancelled</h1>
              <p className="text-white/80 text-base">Your booking was not completed</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-gray-600 text-base leading-relaxed">
                No charges have been made to your account. Your booking is still pending — you can try paying again anytime.
              </p>
            </div>

            {/* Why cancelled */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                  <FiHelpCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Why was my payment cancelled?</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• You clicked back during checkout</li>
                    <li>• Payment window was closed before completion</li>
                    <li>• Session timed out</li>
                    <li>• You chose to cancel the transaction</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking safe */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-sky-500 rounded-full flex items-center justify-center shrink-0">
                  <FaPlane className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Your booking is still saved!</h3>
                  <p className="text-gray-600 text-sm">Go to your dashboard to retry the payment for your confirmed booking.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/dashboard?tab=bookings"
                className="flex-1 py-3 rounded-xl font-semibold text-center text-white bg-linear-to-r from-sky-500 to-teal-500 hover:opacity-90 transition-opacity"
              >
                Go to My Bookings
              </Link>
              <Link
                href="/explore"
                className="flex-1 py-3 rounded-xl font-semibold text-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Explore Destinations
              </Link>
            </div>

            <div className="text-center text-sm text-gray-400 pt-2 border-t border-gray-100">
              Having trouble? <a href="mailto:support@navora.com" className="text-sky-500 hover:underline">support@navora.com</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-400" />
      </div>
    }>
      <PaymentCancelledContent />
    </Suspense>
  );
}
