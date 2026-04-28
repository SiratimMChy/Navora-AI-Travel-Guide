"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export default function DashboardTopbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user as { name?: string; email?: string; image?: string; role?: string } | undefined;
  const isAdmin = user?.role === "admin";

  return (
    <header className="hidden md:flex sticky top-0 z-30 h-14 bg-base-100 border-b-2 border-base-300 items-center justify-between px-6 shadow-sm shrink-0">
      {/* Left: greeting */}
      <p className="text-sm text-base-content/40 font-medium">
        Welcome back, <span className="text-base-content font-semibold">{user?.name?.split(" ")[0]}</span> 👋
      </p>

      {/* Right: avatar dropdown */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-200"
        >
          {user?.image ? (
            <div className="w-10 rounded-full ring-2 ring-sky-500 ring-offset-base-100 ring-offset-2 hover:ring-4 transition-all duration-300">
              <Image src={user.image} alt="User Avatar" width={40} height={40} className="rounded-full object-cover w-full h-full" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-sky-500 ring-2 ring-sky-500 ring-offset-base-100 ring-offset-2 flex items-center justify-center text-white">
              <FaUser size={16} />
            </div>
          )}
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-72 p-4 shadow-xl border border-base-300 right-0"
        >
          {/* User info header */}
          <li className="menu-title px-0 py-2 mb-2">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-base font-bold text-sky-600 truncate">{user?.name || "User"}</span>
              <span className="text-xs text-base-content/70 break-all leading-relaxed">{user?.email}</span>
            </div>
          </li>

          <div className="divider my-1" />

          {/* Profile */}
          <li>
            <button
              onClick={() => router.push("/dashboard")}
              className="text-base-content hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors duration-200 py-2.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold">Profile</span>
            </button>
          </li>

          {/* Settings — admin only */}
          {isAdmin && (
            <li>
              <button
                onClick={() => router.push("/dashboard/admin?tab=settings")}
                className="text-base-content hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors duration-200 py-2.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">Settings</span>
              </button>
            </li>
          )}

          <div className="divider my-1" />

          {/* Logout */}
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
    </header>
  );
}
