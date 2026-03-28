import { FaRobot, FaShieldAlt, FaHeadset, FaGlobe } from "react-icons/fa";

export default function WhyChooseUs({ destCount }: { destCount: number }) {
  const features = [
    { icon: FaRobot, title: "AI-Powered Recommendations", desc: "Our smart AI analyzes your preferences to suggest the perfect destinations tailored just for you.", color: "text-sky-500 bg-sky-500/10" },
    { icon: FaShieldAlt, title: "Safe & Secure Booking", desc: "Your payments and personal data are protected with industry-leading security standards.", color: "text-green-500 bg-green-500/10" },
    { icon: FaHeadset, title: "24/7 Customer Support", desc: "Our dedicated team is always available to assist you before, during, and after your trip.", color: "text-purple-500 bg-purple-500/10" },
    { icon: FaGlobe, title: `${destCount > 0 ? `${destCount}+` : "Curated"} Destinations`, desc: "Explore our handpicked collection of destinations across Asia and beyond.", color: "text-orange-500 bg-orange-500/10" },
  ];
  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-3">Why Choose Navora?</h2>
          <p className="text-base-content/60 text-base sm:text-lg">We make travel planning effortless and unforgettable</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className={`inline-flex p-4 rounded-full ${color} mb-4`}>
                <Icon size={32} />
              </div>
              <h3 className="text-lg font-bold text-base-content mb-2">{title}</h3>
              <p className="text-base-content/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
