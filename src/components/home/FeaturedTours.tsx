import Link from "next/link";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Destination } from "@/types";

export default function FeaturedTours({ destinations }: { destinations: Destination[] }) {
  if (!destinations.length) return null;

  return (
    <section id="featured" className="py-16 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-3">Featured Tours</h2>
          <p className="text-base-content/60 text-base sm:text-lg">Curated experiences for the modern explorer</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div key={String(dest._id)} className="bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">{dest.category}</span>
                {dest.duration && (
                  <span className="absolute top-3 right-3 bg-base-100/90 text-base-content text-xs font-bold px-3 py-1 rounded-full">{dest.duration}</span>
                )}
              </div>
              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-base-content line-clamp-1">{dest.title}</h3>
                {/* Row 1: Price + Location */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-base-content/40 uppercase tracking-wide">Price</span>
                    <p className="text-xl font-bold text-sky-500">${dest.price}<span className="text-base-content/40 text-xs font-normal">/person</span></p>
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
      </div>
    </section>
  );
}
