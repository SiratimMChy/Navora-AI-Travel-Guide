"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUsers, FaMapMarkerAlt, FaPlane, FaChartBar, FaCog, FaNewspaper } from "react-icons/fa";
import { Destination, BlogPost } from "@/types";
import UsersTab from "@/components/dashboard/UsersTab";
import OverviewTab from "@/components/dashboard/admin/OverviewTab";
import DestinationsTab from "@/components/dashboard/admin/DestinationsTab";
import BookingsTab from "@/components/dashboard/admin/BookingsTab";
import BlogTab from "@/components/dashboard/admin/BlogTab";
import SettingsTab from "@/components/dashboard/admin/SettingsTab";

type AdminTab = "overview" | "destinations" | "users" | "bookings" | "blog" | "settings";
type Booking = { _id: string; userId: string; totalPrice: number; status: string; travelDate: string; travelers: number; rejectionReason?: string; destinationId?: { title: string; image: string } };

function AdminDashboardInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as AdminTab) || "overview";

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [users, setUsers] = useState<{ _id: string; name: string; email: string; role: string; status?: string; createdAt?: string }[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({ destinations: 0, bookings: 0, users: 0, avgRating: "4.9" });
  const [bookingChartData, setBookingChartData] = useState<{ month: string; bookings: number; revenue: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const user = session?.user as { role?: string } | undefined;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && user?.role !== "admin") router.push("/dashboard");
  }, [status, user, router]);

  useEffect(() => {
    const load = async () => {
      if (tab === "overview") {
        fetch("/api/stats").then((r) => r.json()).then((d) => setStats(d));
        fetch("/api/admin/bookings").then((r) => r.ok ? r.json() : []).then((data: Booking[]) => {
          if (!Array.isArray(data)) return;
          const monthMap: Record<string, { bookings: number; revenue: number }> = {};
          data.forEach((b) => {
            const m = new Date(b.travelDate).toLocaleString("en-US", { month: "short" });
            if (!monthMap[m]) monthMap[m] = { bookings: 0, revenue: 0 };
            monthMap[m].bookings++;
            monthMap[m].revenue += b.totalPrice || 0;
          });
          setBookingChartData(Object.entries(monthMap).map(([month, v]) => ({ month, ...v })));
          setBookings(data);
        });
        return;
      }
      setLoading(true);
      if (tab === "destinations") fetch("/api/destinations?limit=1000").then((r) => r.json()).then((d) => { setDestinations(d.destinations || []); setLoading(false); });
      else if (tab === "users") fetch("/api/users").then((r) => r.json()).then((d) => { setUsers(Array.isArray(d) ? d : []); setLoading(false); });
      else if (tab === "bookings") fetch("/api/admin/bookings").then((r) => r.ok ? r.json() : []).then((d) => { setBookings(Array.isArray(d) ? d : []); setLoading(false); });
      else if (tab === "blog") fetch("/api/blog").then((r) => r.json()).then((d) => { setBlogPosts(Array.isArray(d) ? d : []); setLoading(false); });
      else setLoading(false);
    };
    load();
  }, [tab]);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center bg-base-100"><span className="loading loading-spinner loading-lg text-sky-500" /></div>;

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
        {/* Mobile tab bar */}
        <div className="flex gap-1 bg-base-200 p-1 rounded-xl border border-base-300 w-full overflow-x-auto md:hidden">
          {tabs.map(({ key, label, icon }) => (
            <button key={key} onClick={() => router.push(`/dashboard/admin${key === "overview" ? "" : `?tab=${key}`}`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === key ? "bg-sky-500 text-white shadow-sm" : "text-base-content/60 hover:text-base-content"}`}>
              <span>{icon}</span><span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {tab === "overview" && <OverviewTab stats={stats} bookingChartData={bookingChartData} bookings={bookings} />}
          {tab === "destinations" && <DestinationsTab destinations={destinations} setDestinations={setDestinations} loading={loading} />}
          {tab === "users" && <UsersTab users={users} setUsers={setUsers} loading={loading} />}
          {tab === "bookings" && <BookingsTab bookings={bookings} setBookings={setBookings} loading={loading} />}
          {tab === "blog" && <BlogTab blogPosts={blogPosts} setBlogPosts={setBlogPosts} loading={loading} />}
          {tab === "settings" && <SettingsTab />}
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
