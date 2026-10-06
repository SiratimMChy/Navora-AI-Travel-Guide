"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileTab from "@/components/dashboard/ProfileTab";
import MyBookingsTab from "@/components/dashboard/MyBookingsTab";
import MyBlogTab from "@/components/dashboard/MyBlogTab";
import MyReviewsTab from "@/components/dashboard/MyReviewsTab";
import { FaPlane, FaUser, FaStar, FaMapMarkerAlt, FaNewspaper, FaPlus, FaTrash, FaCalendar } from "react-icons/fa";
import { Booking, BlogPost } from "@/types";
import { Suspense } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
export type BookingWithDest = Booking & {
  destinationId: { _id?: string, title: string; image: string; location: string; country: string };
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

  const user = session?.user as {
    name?: string; email?: string; image?: string; role?: string;
  } | undefined;

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
    }
  }, [status]);

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success" && status === "authenticated") {
      fetchBookings();
    }
 
  }, [searchParams, status]);

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
    <div className="min-h-screen bg-base-100 p-4 pt-8 md:p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-base-content">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-base-content/50 text-sm mt-0.5">Manage your profile, bookings and reviews</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Trips", value: bookings.length, color: "text-sky-500" },
          { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, color: "text-teal-500" },
          { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, color: "text-sky-400" },
          { label: "Rejected", value: bookings.filter((b) => b.status === "rejected").length, color: "text-base-content/50" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-base-200 rounded-2xl p-4 text-center border border-base-300">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-base-content/50 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>



      {/* Tab content */}
      {tab === "profile" && <ProfileTab />}

      {tab === "bookings" && (
        <MyBookingsTab bookings={bookings} loadingBookings={loadingBookings} />
      )}

      {tab === "blog" && (
        <MyBlogTab user={user} />
      )}

      {tab === "reviews" && (
        <MyReviewsTab 
          bookings={bookings} 
          loadingBookings={loadingBookings} 
          userId={(session?.user as { id?: string })?.id} 
        />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return <Suspense><DashboardContent /></Suspense>;
}
