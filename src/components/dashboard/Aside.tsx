"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home, Users, ChevronLeft, ChevronRight,
  User, Activity, Sun, Moon, Map, BookOpen, Settings, Menu, X,
} from "lucide-react";
import { FaPlane, FaStar } from "react-icons/fa";

type NavItem = { href: string; label: string; icon: React.ReactNode };

function AsideInner() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const user = session?.user as { role?: string; name?: string } | undefined;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setIsDark(saved === "dark");
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleThemeToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      const theme = next ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      return next;
    });
  };

  const adminLinks: NavItem[] = [
    { href: "/dashboard/admin", label: "Analytics", icon: <Activity className="w-5 h-5" /> },
    { href: "/dashboard", label: "My Profile", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/admin?tab=destinations", label: "Destinations", icon: <Map className="w-5 h-5" /> },
    { href: "/dashboard/admin?tab=users", label: "All Users", icon: <Users className="w-5 h-5" /> },
    { href: "/dashboard/admin?tab=bookings", label: "All Bookings", icon: <FaPlane className="w-5 h-5" /> },
    { href: "/dashboard/admin?tab=blog", label: "Blog Posts", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/dashboard/admin?tab=settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const userLinks: NavItem[] = [
    { href: "/dashboard", label: "My Profile", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard?tab=bookings", label: "My Bookings", icon: <FaPlane className="w-5 h-5" /> },
    { href: "/dashboard?tab=reviews", label: "My Reviews", icon: <FaStar className="w-5 h-5" /> },
    { href: "/dashboard?tab=blog", label: "My Blog", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/explore", label: "Explore", icon: <Map className="w-5 h-5" /> },
    { href: "/blog", label: "All Posts", icon: <BookOpen className="w-5 h-5" /> },
  ];

  const links = isAdmin ? adminLinks : userLinks;
  const title = isAdmin ? "Admin Dashboard" : "User Dashboard";

  const navLinkClass = (href: string) => {
    const [hrefPath, hrefQuery] = href.split("?");
    const currentTab = searchParams.get("tab");
    const hrefTab = hrefQuery ? new URLSearchParams(hrefQuery).get("tab") : null;
    const active = pathname === hrefPath && currentTab === hrefTab;
    return `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      active ? "bg-sky-500 text-white shadow-md" : "text-base-content hover:bg-base-200 hover:text-sky-600"
    } ${isCollapsed ? "justify-center" : ""}`;
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-4 pt-6 pb-5 border-b-2 border-base-300 bg-base-100">
        <div className={`flex flex-col ${isCollapsed ? "items-center" : ""}`}>
          {isCollapsed ? (
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          ) : (
            <>
              <Link href="/" className="text-2xl font-lobster font-bold bg-linear-to-r from-sky-500 to-teal-400 bg-clip-text text-transparent leading-tight">
                Navora
              </Link>
              <p className="text-xs text-base-content/40 mt-0.5 truncate">{title}</p>
              <p className="text-xs text-base-content/30 truncate">{user?.name}</p>
            </>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-5 overflow-y-auto">
        {links.map(({ href, label, icon }) => (
          <Link key={href} href={href} className={navLinkClass(href)} title={isCollapsed ? label : ""}>
            {icon}
            {!isCollapsed && <span className="font-medium text-sm">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t-2 border-base-300 bg-base-100 space-y-2">
        <button
          onClick={handleThemeToggle}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-base-content hover:bg-base-200 hover:text-sky-600 border-2 border-base-300 hover:border-sky-200 transition-all ${isCollapsed ? "justify-center" : ""}`}
          title={isCollapsed ? (isDark ? "Light Mode" : "Dark Mode") : ""}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
          {!isCollapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={() => router.push("/")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-base-content hover:bg-sky-50 hover:text-sky-600 border-2 border-base-300 hover:border-sky-200 transition-all ${isCollapsed ? "justify-center" : ""}`}
          title={isCollapsed ? "Go to Home" : ""}
        >
          <Home size={17} />
          {!isCollapsed && <span>Go to Home</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── MOBILE: top header bar ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-base-100 border-b-2 border-base-300 flex items-center justify-between px-4 shadow-sm">
        <Link href="/" className="text-xl font-lobster font-bold bg-linear-to-r from-sky-500 to-teal-400 bg-clip-text text-transparent">
          Navora
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-xl hover:bg-base-200 transition-colors"
        >
          <Menu size={22} className="text-base-content" />
        </button>
      </header>

      {/* ── MOBILE: drawer backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE: slide-in drawer ── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 flex flex-col bg-base-200 border-r-2 border-base-300 shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-base-300 transition-colors z-10"
          aria-label="Close menu"
        >
          <X size={18} className="text-base-content/60" />
        </button>
        {sidebarContent}
      </div>

      {/* ── DESKTOP: sticky sidebar ── */}
      <aside
        className={`hidden md:flex flex-col sticky top-0 h-screen bg-base-200 border-r-2 border-base-300 shadow-lg shrink-0 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-[68px] ${isCollapsed ? "left-1/2 -translate-x-1/2" : "-right-3"} bg-base-100 border-2 border-base-300 rounded-full p-1.5 shadow-md hover:bg-sky-50 hover:border-sky-200 transition-all z-10`}
        >
          {isCollapsed
            ? <ChevronRight size={15} className="text-base-content/60" />
            : <ChevronLeft size={15} className="text-base-content/60" />}
        </button>
        {sidebarContent}
      </aside>

      <div className="md:hidden h-14 shrink-0" />
    </>
  );
}

export default function Aside() {
  return (
    <Suspense fallback={null}>
      <AsideInner />
    </Suspense>
  );
}
