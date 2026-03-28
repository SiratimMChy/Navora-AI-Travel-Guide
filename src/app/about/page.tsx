import { FaRobot, FaGlobe, FaUsers, FaAward } from "react-icons/fa";

export default function AboutPage() {
  const team = [
    { name: "Alex Morgan", role: "CEO & Founder", image: "https://i.pravatar.cc/120?img=11" },
    { name: "Priya Sharma", role: "Head of AI", image: "https://i.pravatar.cc/120?img=5" },
    { name: "James Carter", role: "Lead Designer", image: "https://i.pravatar.cc/120?img=3" },
    { name: "Emma Wilson", role: "Travel Curator", image: "https://i.pravatar.cc/120?img=9" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero */}
      <div className="bg-linear-to-br from-sky-700 to-teal-600 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">About Navora</h1>
        <p className="text-xl text-sky-100 max-w-2xl mx-auto">We&apos;re on a mission to make travel planning smarter, easier, and more personal through the power of AI.</p>
      </div>

      {/* Story */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-base-content mb-6">Our Story</h2>
        <p className="text-base-content/70 text-lg leading-relaxed mb-4">
          Navora was born from a simple frustration — planning the perfect trip takes too long. We built an AI-powered platform that understands your travel style and delivers personalized recommendations in seconds.
        </p>
        <p className="text-base-content/70 text-lg leading-relaxed">
          Since 2024, we&apos;ve helped over 50,000 travelers discover their dream destinations across 500+ locations worldwide.
        </p>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-base-content text-center mb-12">What Drives Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaRobot, title: "AI Innovation", desc: "Cutting-edge AI to personalize every travel experience.", color: "text-sky-500 bg-sky-500/10" },
              { icon: FaGlobe, title: "Global Reach", desc: "Destinations across every continent, curated with care.", color: "text-teal-500 bg-teal-500/10" },
              { icon: FaUsers, title: "Community First", desc: "Built around real traveler stories and reviews.", color: "text-purple-500 bg-purple-500/10" },
              { icon: FaAward, title: "Quality Assured", desc: "Every destination is verified and quality-checked.", color: "text-orange-500 bg-orange-500/10" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-md text-center">
                <div className={`inline-flex p-4 rounded-full ${color} mb-4`}><Icon size={28} /></div>
                <h3 className="font-bold text-base-content mb-2">{title}</h3>
                <p className="text-base-content/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-base-content mb-12">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, image }) => (
              <div key={name} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover shadow-md" />
                <p className="font-bold text-base-content">{name}</p>
                <p className="text-base-content/60 text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
