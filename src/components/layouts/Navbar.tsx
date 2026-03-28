"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function ThemeToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label className="toggle text-base-content cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="theme-controller" />
      <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" /><path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </g>
      </svg>
      <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </g>
      </svg>
    </label>
  );
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    Promise.resolve().then(() => {
      setIsChecked(saved === "dark");
      setMounted(true);
    });
  }, []);

  const handleThemeChange = () => {
    const next = !isChecked;
    const theme = next ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setIsChecked(next);
  };

  const user = session?.user as { name?: string; email?: string; image?: string; role?: string } | undefined;
  const isAdmin = user?.role === "admin";

  const linkClass = (href: string) =>
    "font-bold text-base leading-none transition-colors duration-200 " +
    (pathname === href
      ? "bg-linear-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent"
      : "text-base-content hover:text-sky-500");

  const nav = (
    <>
      <li><Link href="/" className={linkClass("/")}>Home</Link></li>
      <li><Link href="/explore" className={linkClass("/explore")}>Explore</Link></li>
      {status === "authenticated" && isAdmin ? (
        <>
          <li><Link href="/dashboard/admin" className={linkClass("/dashboard/admin")}>Dashboard</Link></li>
          <li><Link href="/dashboard/admin?tab=destinations" className={linkClass("/add-destination")}>Add Destination</Link></li>
        </>
      ) : status === "authenticated" ? (
        <li><Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link></li>
      ) : null}
      <li><Link href="/about" className={linkClass("/about")}>About</Link></li>
      <li><Link href="/contact" className={linkClass("/contact")}>Contact</Link></li>
      <li><Link href="/blog" className={linkClass("/blog")}>Blog</Link></li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/95 backdrop-blur shadow-sm">
      <div className="navbar py-0 max-h-16 md:w-11/12 mx-auto">

        {/* Navbar Start — mobile dropdown + logo */}
        <div className="navbar-start">
          <div className="dropdown relative">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              {nav}
              <li className="block pt-2 border-t border-base-content/10 mt-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-semibold text-sm">Theme</span>
                  <ThemeToggle checked={isChecked} onChange={handleThemeChange} />
                </div>
              </li>
            </ul>
          </div>
          <Link href="/" className="text-2xl font-lobster font-bold ml-1 bg-linear-to-r from-sky-500 to-teal-400 bg-clip-text text-transparent">
            Navora
          </Link>
        </div>

        {/* Navbar Center — desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-0 gap-1">
            {nav}
          </ul>
        </div>

        {/* Navbar End — auth */}
        <div className="navbar-end gap-2">
          {/* Desktop theme toggle */}
          <div className="hidden lg:flex">
            {mounted && <ThemeToggle checked={isChecked} onChange={handleThemeChange} />}
          </div>
          {status === "loading" ? (
            <span className="loading loading-spinner loading-sm text-sky-500" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-200">
                {user?.image ? (
                  <div className="w-10 rounded-full ring-2 ring-sky-500 ring-offset-base-100 ring-offset-2 hover:ring-4 transition-all duration-300">
                    <Image src={user.image} alt="avatar" width={40} height={40} className="rounded-full object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-sky-500 ring-2 ring-sky-500 ring-offset-base-100 ring-offset-2 flex items-center justify-center text-white">
                    <FaUser size={16} />
                  </div>
                )}
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-4 shadow-xl border border-base-300 right-0">
                {/* User info header */}
                <li className="menu-title px-0 py-2 mb-2">
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-base font-bold text-sky-600 truncate">{user?.name || "User"}</span>
                    <span className="text-xs text-base-content/70 break-all leading-relaxed">{user?.email}</span>
                  </div>
                </li>
                <div className="divider my-1" />
                <li>
                  <Link
                    href={isAdmin ? "/dashboard/admin" : "/dashboard"}
                    className="text-base-content hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors duration-200 py-2.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold">Dashboard</span>
                  </Link>
                </li>
                <div className="divider my-1" />
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-base-content hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors duration-200 py-2.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-semibold">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary btn-sm text-white">Login</Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
