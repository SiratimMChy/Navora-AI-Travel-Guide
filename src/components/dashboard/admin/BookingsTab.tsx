"use client";
import { FaPlane } from "react-icons/fa";
import Swal from "sweetalert2";

type Booking = { _id: string; userId: string; totalPrice: number; status: string; travelDate: string; travelers: number; rejectionReason?: string; destinationId?: { title: string; image: string } };

type Props = {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  loading: boolean;
};

export default function BookingsTab({ bookings, setBookings, loading }: Props) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md overflow-hidden">
      <div className="p-5 border-b border-base-300 flex items-center justify-between">
        <h2 className="text-xl font-bold text-base-content">Manage Bookings</h2>
        <span className="badge badge-outline">{bookings.length} total</span>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-sky-500" /></div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 text-base-content/40">
          <FaPlane className="text-5xl mx-auto mb-3 opacity-20" />
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-300 text-base-content/70 text-sm">
              <tr><th>Destination</th><th>Travelers</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-base-300/50 border-b border-base-300">
                  <td className="font-semibold text-base-content text-sm">{b.destinationId?.title || "—"}</td>
                  <td className="text-base-content/60 text-sm">{b.travelers}</td>
                  <td className="text-base-content/40 text-xs">{new Date(b.travelDate).toLocaleDateString()}</td>
                  <td className="font-bold text-sky-600">${b.totalPrice}</td>
                  <td>
                    <span className={`badge text-xs capitalize text-white ${b.status === "confirmed" ? "badge-success" : b.status === "rejected" ? "badge-error" : b.status === "cancelled" ? "badge-error" : "badge-warning"}`}>{b.status}</span>
                  </td>
                  <td>
                    {b.status === "pending" ? (
                      <div className="flex gap-2">
                        <button onClick={async () => {
                          const res = await fetch("/api/admin/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: b._id, action: "confirm" }) });
                          if (res.ok) { setBookings(bookings.map((x) => x._id === b._id ? { ...x, status: "confirmed" } : x)); Swal.fire("Approved!", "Booking confirmed.", "success"); }
                        }} className="btn btn-xs btn-success text-white">Approve</button>
                        <button onClick={async () => {
                          const { value: reason, isConfirmed } = await Swal.fire({ title: "Reject Booking", input: "textarea", inputLabel: "Reason for rejection", inputPlaceholder: "Enter reason...", inputAttributes: { "aria-label": "Rejection reason" }, showCancelButton: true, confirmButtonText: "Reject", confirmButtonColor: "#ef4444", inputValidator: (v) => !v.trim() ? "Please provide a reason." : undefined });
                          if (!isConfirmed) return;
                          const res = await fetch("/api/admin/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: b._id, action: "reject", reason }) });
                          if (res.ok) { setBookings(bookings.map((x) => x._id === b._id ? { ...x, status: "rejected", rejectionReason: reason } : x)); Swal.fire("Rejected", "Booking has been rejected.", "info"); }
                        }} className="btn btn-xs btn-error text-white">Reject</button>
                      </div>
                    ) : <span className="text-xs text-base-content/30 italic">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
