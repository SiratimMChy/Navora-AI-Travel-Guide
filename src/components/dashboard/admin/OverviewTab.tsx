"use client";
import { FaUsers, FaMapMarkerAlt, FaPlane, FaChartBar } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

type Booking = { status: string };
type Props = {
  stats: { destinations: number; bookings: number; users: number; avgRating: string };
  bookingChartData: { month: string; bookings: number; revenue: number }[];
  bookings: Booking[];
};

export default function OverviewTab({ stats, bookingChartData, bookings }: Props) {
  const statCards = [
    { icon: FaUsers, label: "Total Users", value: stats.users || "—", color: "text-sky-500 bg-sky-500/10" },
    { icon: FaMapMarkerAlt, label: "Destinations", value: stats.destinations || "—", color: "text-teal-500 bg-teal-500/10" },
    { icon: FaPlane, label: "Bookings", value: stats.bookings || "—", color: "text-sky-500 bg-sky-500/10" },
    { icon: FaChartBar, label: "Avg Rating", value: stats.avgRating, color: "text-teal-500 bg-teal-500/10" },
  ];

  const pieData = [
    { name: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length },
    { name: "Pending", value: bookings.filter(b => b.status === "pending").length },
    { name: "Rejected", value: bookings.filter(b => b.status === "rejected").length },
    { name: "Cancelled", value: bookings.filter(b => b.status === "cancelled").length },
  ].filter(d => d.value > 0);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-base-200 border border-base-300 rounded-2xl p-5 shadow-md flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left sm:gap-4">
            <div className={`p-3 rounded-full shrink-0 ${color}`}><Icon size={22} /></div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-base-content leading-none">{value}</p>
              <p className="text-base-content/50 text-xs mt-1 whitespace-nowrap">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-base-content mb-5">Monthly Bookings & Revenue</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={bookingChartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip /><Legend />
            <Bar yAxisId="left" dataKey="bookings" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Bookings" />
            <Bar yAxisId="right" dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-base-content mb-5">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bookingChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-base-content mb-5">Booking Status Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {["#22c55e", "#f59e0b", "#ef4444", "#6b7280"].map((color, i) => <Cell key={i} fill={color} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
