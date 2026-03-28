"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaSearch, FaStar, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { Destination } from "@/types";
import Link from "next/link";
import { Suspense } from "react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ search, category, sort, page: String(page) });
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/destinations?${params}`, { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        setDestinations(data.destinations || []);
        setTotal(data.total || 0);
        setPages(data.pages || 1);
      } catch (err) {
        if (!cancelled) { console.error(err); setDestinations([]); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [search, category, sort, page]);

  const categories = ["", "beach", "mountain", "city", "adventure", "cruise"];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-sky-800 dark:bg-sky-950 text-white py-10 sm:py-16 px-4 text-center">        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Explore Destinations</h1>
        <p className="text-sky-100 text-base sm:text-lg">Discover {total}+ amazing places around the world</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md p-5 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search destinations..."
              className="w-full pl-11 pr-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-base-content/40" />
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content capitalize">
              {categories.map((c) => <option key={c} value={c}>{c || "All Categories"}</option>)}
            </select>
          </div>
          <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content">
            <option value="">Sort: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-base-200 rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-52 bg-base-300" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-base-300 rounded w-3/4" />
                  <div className="h-4 bg-base-300 rounded w-1/2" />
                  <div className="h-4 bg-base-300 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🗺️</p>
            <h3 className="text-2xl font-bold text-base-content mb-2">No destinations found</h3>
            <p className="text-base-content/50">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div key={dest._id} className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <Image src={dest.image} alt={dest.title} fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 badge badge-primary text-white capitalize">{dest.category}</span>
                  {dest.duration && <span className="absolute top-3 right-3 bg-base-100/90 text-base-content text-xs font-bold px-3 py-1 rounded-full">{dest.duration}</span>}
                </div>
                {/* Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-base-content line-clamp-1">{dest.title}</h3>
                  {/* Row 1: Price + Location */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-base-content/40 uppercase tracking-wide">Price</span>
                      <p className="text-xl font-bold text-sky-600">${dest.price}<span className="text-base-content/40 text-xs font-normal">/person</span></p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-base-content/40 uppercase tracking-wide">Location</span>
                      <p className="text-sm font-semibold text-base-content flex items-center gap-1 justify-end">
                        <FaMapMarkerAlt className="text-sky-500" size={12} />
                        {dest.location}
                      </p>
                    </div>
                  </div>
                  {/* Row 2: Rating + See Details */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-xs text-base-content/40 uppercase tracking-wide">Rating</span>
                      <p className="flex items-center gap-1 text-sm font-semibold text-base-content">
                        <FaStar className="text-yellow-400" size={13} />
                        {dest.rating}
                        <span className="text-base-content/40 font-normal">({dest.reviewCount})</span>
                      </p>
                    </div>
                    <Link href={`/destinations/${dest._id}`}
                      className="bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity">
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`btn btn-sm ${page === p ? "btn-primary text-white" : "btn-outline"}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return <Suspense><ExploreContent /></Suspense>;
}
