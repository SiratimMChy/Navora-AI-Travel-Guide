import { FaUsers, FaMapMarkerAlt, FaStar, FaPlane } from "react-icons/fa";

interface StatsProps {
  destCount: number;
  bookingCount: number;
  userCount: number;
  avgRating: string;
}

export default function Stats({ destCount, bookingCount, userCount, avgRating }: StatsProps) {
  const stats = [
    { icon: FaUsers, value: userCount > 0 ? `${userCount.toLocaleString()}+` : "0", label: "Happy Travelers", iconBg: "bg-sky-500/10", iconColor: "text-sky-500" },
    { icon: FaMapMarkerAlt, value: destCount > 0 ? `${destCount}+` : "0", label: "Destinations", iconBg: "bg-teal-500/10", iconColor: "text-teal-500" },
    { icon: FaStar, value: avgRating, label: "Average Rating", iconBg: "bg-sky-500/10", iconColor: "text-sky-500" },
    { icon: FaPlane, value: bookingCount > 0 ? `${bookingCount.toLocaleString()}+` : "0", label: "Trips Booked", iconBg: "bg-teal-500/10", iconColor: "text-teal-500" },
  ];

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-sky-500/10 text-sky-600 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Navora by the Numbers
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map(({ icon: Icon, value, label, iconBg, iconColor }) => (
            <div key={label} className="bg-base-100 border border-base-300 rounded-2xl p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
                <Icon size={22} className={iconColor} />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-base-content">{value}</div>
              <div className="text-base-content/60 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
