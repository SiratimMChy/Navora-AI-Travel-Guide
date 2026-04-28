import { FaSearch, FaMapMarkerAlt, FaSuitcaseRolling, FaSmile } from "react-icons/fa";

const steps = [
  { icon: FaSearch, step: "01", title: "Search & Discover", desc: "Browse hundreds of destinations or let our AI recommend the perfect trip based on your preferences." },
  { icon: FaMapMarkerAlt, step: "02", title: "Choose Your Journey", desc: "Pick from curated tours, set your dates, and customize your itinerary to match your travel style." },
  { icon: FaSuitcaseRolling, step: "03", title: "Book with Confidence", desc: "Secure your booking instantly with transparent pricing and flexible cancellation options." },
  { icon: FaSmile, step: "04", title: "Explore & Enjoy", desc: "Pack your bags and go. Our team is available around the clock to support you on your adventure." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-sky-500/10 text-sky-600 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">How It Works</h2>
          <p className="text-base-content/60 text-base max-w-xl mx-auto">From dreaming to doing — your perfect trip in four easy steps.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-sky-300 via-teal-300 to-sky-300 z-0" />
          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-white" size={26} />
              </div>
              <span className="absolute top-0 right-[calc(50%-2.5rem)] bg-base-100 text-sky-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-sky-200 shadow-sm">
                {step.replace("0", "")}
              </span>
              <h3 className="text-base font-bold text-base-content mb-2">{title}</h3>
              <p className="text-base-content/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
