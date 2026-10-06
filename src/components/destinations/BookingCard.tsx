import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { countriesList } from "@/lib/countries";
import { Destination } from "@/types";
import { Session } from "next-auth";

interface BookingCardProps {
  destination: Destination;
  session: Session | null;
}

export default function BookingCard({ destination, session }: BookingCardProps) {
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [booking, setBooking] = useState(false);
  const [includeFlight, setIncludeFlight] = useState(false);
  const [origin, setOrigin] = useState("Bangladesh");
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  useEffect(() => {
    if (includeFlight && travelDate && destination?.location) {
      setLoadingFlights(true);
      fetch(`/api/flights/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination.location)}`)
        .then((r) => r.json())
        .then((d) => {
          setFlights(d.data || []);
          if (d.data?.length > 0) setSelectedFlight(d.data[0]);
          setLoadingFlights(false);
        });
    } else {
      setSelectedFlight(null);
    }
  }, [includeFlight, travelDate, destination, origin]);

  const basePrice = (destination?.price || 0) * travelers;
  const flightPrice = selectedFlight ? selectedFlight.price * travelers : 0;
  const finalPrice = basePrice + flightPrice;

  const handleBook = async () => {
    if (!session) { Swal.fire("Login Required", "You need to log in to book this amazing trip. Please log in first!", "info"); return; }
    if (!travelDate) { Swal.fire("Select Date", "Please select a travel date.", "warning"); return; }
    setBooking(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationId: destination._id,
        travelers,
        totalPrice: finalPrice,
        flightDetails: selectedFlight,
        travelDate,
      }),
    });
    setBooking(false);
    if (res.ok) {
      Swal.fire("Booked!", "Your trip has been booked successfully. Have a great time!", "success");
    } else {
      Swal.fire("Oops!", "We couldn't process your booking right now. Please try again later.", "error");
    }
  };

  const handleDetectLocation = async () => {
    setDetectingLocation(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_GEO_API_URL;
      if (!apiUrl) {
        toast.error("Live location is temporarily unavailable. Please select your origin from the list.");
        return;
      }
      
      const res = await fetch(apiUrl);
      const data = await res.json();
      
      if (data.country && countriesList.includes(data.country)) {
        setOrigin(data.country);
        toast.success(`We found you! Your location is set to ${data.country}.`);
      } else if (data.country) {
        toast.info(`We detected ${data.country}, but we don't have flights from there yet. Please choose from the list.`);
      } else {
        toast.error("We couldn't automatically find your location. Please select it manually.");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong while finding your location. Please select it from the list.");
    } finally {
      setDetectingLocation(false);
    }
  };

  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl shadow-xl p-6">
      <div className="text-center mb-6">
        <p className="text-base-content/50 text-sm mb-1">Price per person</p>
        <span className="text-4xl font-bold text-sky-600">${destination.price}</span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3">
            <label className="block text-sm font-semibold text-base-content mb-1">Travel Date</label>
            <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-2 sm:px-3 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content text-sm sm:text-base" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-base-content mb-1">Travelers</label>
            <input type="number" value={travelers}
              onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
              min={1} max={20}
              className="w-full px-3 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
          </div>
        </div>

        <label className="flex items-center justify-between cursor-pointer mt-5 mb-4 bg-base-100 border border-base-300 p-3.5 rounded-xl hover:border-sky-300 transition-all shadow-sm">
          <span className="text-sm font-bold flex items-center gap-2"><FaPlane className="text-sky-500 text-lg"/> Need a Flight Ticket?</span>
          <input type="checkbox" className="toggle toggle-info" checked={includeFlight} onChange={(e) => setIncludeFlight(e.target.checked)} />
        </label>

        {includeFlight && (
          <div className="mb-4 bg-base-100 p-4 rounded-xl border border-base-300">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-base-content/70 uppercase tracking-wide">Departing From</label>
              <button 
                type="button" 
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="text-xs text-sky-500 hover:text-sky-600 font-semibold flex items-center gap-1 transition-colors"
              >
                {detectingLocation ? <span className="loading loading-spinner loading-xs"></span> : <FaMapMarkerAlt />}
                {detectingLocation ? "Detecting..." : "Live Location"}
              </button>
            </div>
            <select 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)}
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-sky-500 bg-base-200 text-base-content"
            >
              {countriesList.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        )}

        {includeFlight && !travelDate && (
          <p className="text-xs text-rose-500 mb-2">Please select a travel date to view available flights.</p>
        )}

        {includeFlight && travelDate && (
          <div className="bg-base-100 p-3 rounded-xl border border-base-300 mb-4">
            {loadingFlights ? (
              <div className="flex justify-center py-4"><span className="loading loading-dots loading-sm text-sky-500"></span></div>
            ) : flights.length > 0 ? (
              <div className="flex flex-col gap-2">
                {flights.map((fl) => (
                  <label key={fl.id} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-all ${selectedFlight?.id === fl.id ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-900/20' : 'border-base-200 hover:border-sky-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="flight" className="radio radio-info radio-sm" checked={selectedFlight?.id === fl.id} onChange={() => setSelectedFlight(fl)} />
                      <div className="text-xs">
                        <p className="font-bold text-base-content">{fl.airline}</p>
                        <p className="text-base-content/70">{fl.departureTime} - {fl.arrivalTime} ({fl.duration})</p>
                      </div>
                    </div>
                    <span className="font-bold text-sky-600">${fl.price}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-xs text-base-content/60 text-center">No flights found for this date.</p>
            )}
          </div>
        )}

        <div className="bg-base-100 border border-base-300 rounded-xl p-4 text-sm">
          <div className="flex justify-between text-base-content/60 mb-1">
            <span>Destination (${destination.price} × {travelers})</span>
            <span>${basePrice}</span>
          </div>
          {selectedFlight && (
            <div className="flex justify-between text-base-content/60 mb-1">
              <span>Flight (${selectedFlight.price} × {travelers})</span>
              <span>${flightPrice}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base-content border-t border-base-300 pt-2 mt-2">
            <span>Total</span>
            <span className="text-sky-600">${finalPrice}</span>
          </div>
        </div>

        <button onClick={handleBook} disabled={booking}
            className="w-full btn text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-none py-3 text-lg rounded-xl disabled:opacity-50">
            {booking ? "Booking..." : "🛒 Book Now"}
          </button>

        {!session && (
          <p className="text-center text-sm text-base-content/50">
            <Link href="/login" className="text-sky-600 font-semibold hover:underline">Login</Link> to book this trip
          </p>
        )}
      </div>
    </div>
  );
}
