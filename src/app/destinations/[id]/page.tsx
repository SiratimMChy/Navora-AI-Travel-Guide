"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaTag, FaGlobe, FaEdit } from "react-icons/fa";
import { Destination } from "@/types";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function DestinationDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string })?.role === "admin";
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetch(`/api/destinations/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setDestination(d);
        setActiveImage(d.image);
        setLoading(false);
      });
  }, [id]);

  const handleBook = async () => {
    if (!session) { Swal.fire("Login Required", "Please login to book a trip.", "info"); return; }
    if (!travelDate) { Swal.fire("Select Date", "Please select a travel date.", "warning"); return; }
    setBooking(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationId: id,
        travelers,
        totalPrice: (destination?.price || 0) * travelers,
        travelDate,
      }),
    });
    setBooking(false);
    if (res.ok) {
      Swal.fire("Booked!", "Your trip has been booked successfully.", "success");
    } else {
      Swal.fire("Error", "Booking failed. Please try again.", "error");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <span className="loading loading-spinner loading-lg text-sky-500" />
    </div>
  );

  if (!destination) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100">
      <p className="text-6xl">🗺️</p>
      <h2 className="text-2xl font-bold text-base-content">Destination not found</h2>
      <Link href="/explore" className="btn btn-primary text-white">Back to Explore</Link>
    </div>
  );

  const allImages = [destination.image, ...(destination.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero — image left, description right */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left: Image */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-base-200">
              <Image src={activeImage} alt={destination.title} fill className="object-cover transition-all duration-500" priority />
            </div>
            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(img)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? "border-sky-400 scale-105 shadow-lg" : "border-base-300 hover:border-sky-300"}`}>
                    <Image src={img} alt={`view-${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Description */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="badge badge-primary text-white capitalize">{destination.category}</span>
              {isAdmin && (
                <Link href={`/destinations/${id}/edit`}
                  className="flex items-center gap-1.5 btn btn-sm bg-linear-to-r from-sky-500 to-teal-500 text-white border-0 hover:opacity-90">
                  <FaEdit size={12} /> Edit Destination
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content leading-tight">{destination.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-base-content/60 text-sm">
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-sky-500" /> {destination.location}, {destination.country}</span>
              <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {destination.rating} ({destination.reviewCount?.toLocaleString()} reviews)</span>
              {destination.duration && <span className="flex items-center gap-1"><FaClock className="text-teal-500" /> {destination.duration}</span>}
            </div>
            <p className="text-base-content/70 leading-relaxed text-[15px]">{destination.description}</p>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Details — full width for admin */}
        <div className={`${isAdmin ? "lg:col-span-3" : "lg:col-span-2"} space-y-6`}>

          {/* Info Grid */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-base-content mb-5">Trip Details</h2>
            <div className={`grid gap-4 ${isAdmin ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-2 sm:grid-cols-3"}`}>
              {destination.duration && (
                <div className="flex items-center gap-3 p-4 bg-sky-500/10 rounded-2xl">
                  <FaClock className="text-sky-500 text-xl shrink-0" />
                  <div><p className="text-xs text-base-content/50 mb-0.5">Duration</p><p className="font-bold text-base-content text-sm">{destination.duration}</p></div>
                </div>
              )}
              <div className="flex items-center gap-3 p-4 bg-teal-500/10 rounded-2xl">
                <FaUsers className="text-teal-500 text-xl shrink-0" />
                <div><p className="text-xs text-base-content/50 mb-0.5">Group Size</p><p className="font-bold text-base-content text-sm">Any size</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-2xl">
                <FaStar className="text-yellow-500 text-xl shrink-0" />
                <div><p className="text-xs text-base-content/50 mb-0.5">Rating</p><p className="font-bold text-base-content text-sm">{destination.rating} / 5</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-2xl">
                <FaGlobe className="text-purple-500 text-xl shrink-0" />
                <div><p className="text-xs text-base-content/50 mb-0.5">Country</p><p className="font-bold text-base-content text-sm">{destination.country}</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-rose-500/10 rounded-2xl">
                <FaMapMarkerAlt className="text-rose-500 text-xl shrink-0" />
                <div><p className="text-xs text-base-content/50 mb-0.5">Location</p><p className="font-bold text-base-content text-sm">{destination.location}</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-2xl">
                <FaUsers className="text-green-500 text-xl shrink-0" />
                <div><p className="text-xs text-base-content/50 mb-0.5">Reviews</p><p className="font-bold text-base-content text-sm">{destination.reviewCount?.toLocaleString()}</p></div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {destination.tags && destination.tags.length > 0 && (
            <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <FaTag className="text-sky-500" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span key={tag} className="badge badge-outline badge-primary px-4 py-2 capitalize text-sm">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking Card — only for non-admin users */}
        {!isAdmin && (
        <div className="lg:col-span-1">
          <div className="bg-base-200 border border-base-300 rounded-2xl shadow-xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <p className="text-base-content/50 text-sm mb-1">Price per person</p>
              <span className="text-4xl font-bold text-sky-600">${destination.price}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-base-content mb-1">Travel Date</label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-base-content mb-1">Travelers</label>
                <input type="number" value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1} max={20}
                  className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
              </div>

              <div className="bg-base-100 border border-base-300 rounded-xl p-4 text-sm">
                <div className="flex justify-between text-base-content/60 mb-1">
                  <span>${destination.price} × {travelers} person(s)</span>
                  <span>${destination.price * travelers}</span>
                </div>
                <div className="flex justify-between font-bold text-base-content border-t border-base-300 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-sky-600">${destination.price * travelers}</span>
                </div>
              </div>

              <button onClick={handleBook} disabled={booking}
                  className="w-full btn btn-primary text-white py-3 text-lg rounded-xl disabled:opacity-50 border-0">
                  {booking ? "Booking..." : "🛒 Book Now"}
                </button>

              {!session && (
                <p className="text-center text-sm text-base-content/50">
                  <Link href="/login" className="text-sky-600 font-semibold hover:underline">Login</Link> to book this trip
                </p>
              )}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
