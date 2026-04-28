import Link from "next/link";
import { FaUmbrellaBeach, FaMountain, FaCity, FaHiking, FaShip } from "react-icons/fa";

const categories = [
  { name: "Beach", icon: FaUmbrellaBeach, color: "bg-sky-500/10 text-sky-500", slug: "beach" },
  { name: "Mountain", icon: FaMountain, color: "bg-teal-500/10 text-teal-500", slug: "mountain" },
  { name: "City", icon: FaCity, color: "bg-sky-500/10 text-sky-500", slug: "city" },
  { name: "Adventure", icon: FaHiking, color: "bg-teal-500/10 text-teal-500", slug: "adventure" },
  { name: "Cruise", icon: FaShip, color: "bg-sky-500/10 text-sky-500", slug: "cruise" },
];

export default function Categories() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-2 sm:mb-3">Browse by Category</h2>
          <p className="text-base-content/60 text-sm sm:text-base md:text-lg">Find your perfect travel style</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
          {categories.map(({ name, icon: Icon, color, slug }) => (
            <Link
              key={slug}
              href={`/explore?category=${slug}`}
              className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 md:p-6 rounded-2xl border border-base-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-base-200 group"
            >
              <div className={`p-2 sm:p-3 md:p-4 rounded-full ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>
              <span className="font-semibold text-base-content text-xs sm:text-sm md:text-base text-center">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
