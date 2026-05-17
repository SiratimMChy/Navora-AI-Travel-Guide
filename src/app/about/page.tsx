import { FaRobot, FaGlobe, FaUsers, FaAward, FaChartLine, FaShieldAlt, FaHeart, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "About Navora - AI-Powered Travel Platform",
  description: "Learn about Navora's mission to revolutionize travel planning with AI technology",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <FaGlobe size={36} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Navora</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing travel planning through AI-powered personalization, making dream destinations accessible to everyone.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-3xl p-10 md:p-16 shadow-xl border border-blue-200 dark:border-blue-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl text-base-content/80 leading-relaxed">
              To democratize travel by leveraging artificial intelligence to deliver personalized, affordable, and seamless booking experiences that inspire exploration and create lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-base-100 rounded-3xl p-10 md:p-12 shadow-lg border border-base-300">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-base-content/70 text-lg leading-relaxed">
              <p>
                Navora is an AI-powered travel booking platform designed to simplify the way people discover and book their next adventure. We recognized that travelers often spend countless hours researching destinations, comparing prices, and piecing together itineraries across multiple platforms.
              </p>
              <p>
                By combining artificial intelligence with modern web technologies, we created a platform that understands your unique preferences, budget constraints, and travel aspirations. Our AI-powered recommendation engine helps you discover destinations that match your interests in seconds, not hours.
              </p>
              <p>
                Navora offers a seamless booking experience with secure payment processing, real-time availability, and comprehensive destination information to help you make informed travel decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "AI Recommendations", icon: FaRobot },
              { label: "Secure Payments", icon: FaShieldAlt },
              { label: "Global Destinations", icon: FaGlobe },
              { label: "User Reviews", icon: FaAward },
            ].map((feature) => (
              <div key={feature.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <feature.icon className="text-white mx-auto mb-3" size={32} />
                <div className="text-white font-semibold">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content text-center mb-4">Our Core Values</h2>
          <p className="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
            These principles guide every decision we make and shape the experience we deliver to our travelers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: FaRobot, 
                title: "AI Innovation", 
                desc: "Leveraging cutting-edge artificial intelligence to personalize every aspect of your travel journey.",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: FaGlobe, 
                title: "Global Reach", 
                desc: "Curating authentic experiences across 500+ destinations spanning every continent and culture.",
                gradient: "from-cyan-500 to-teal-500"
              },
              { 
                icon: FaHeart, 
                title: "Customer First", 
                desc: "Building every feature around real traveler needs, feedback, and success stories.",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                icon: FaAward, 
                title: "Quality Assured", 
                desc: "Every destination undergoes rigorous verification to ensure safety, authenticity, and value.",
                gradient: "from-orange-500 to-red-500"
              },
            ].map(({ icon: Icon, title, desc, gradient }) => (
              <div key={title} className="bg-base-100 border border-base-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl text-base-content mb-3">{title}</h3>
                <p className="text-base-content/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content text-center mb-12">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: FaLightbulb,
                title: "AI-Powered Personalization",
                desc: "Our proprietary AI engine analyzes your preferences, budget, and travel style to recommend destinations perfectly matched to your needs. No more endless scrolling through irrelevant options.",
                color: "blue"
              },
              {
                icon: FaShieldAlt,
                title: "Secure & Transparent",
                desc: "Industry-leading payment security with Stripe integration, transparent pricing with no hidden fees, and comprehensive refund policies that protect your investment.",
                color: "cyan"
              },
              {
                icon: FaChartLine,
                title: "Data-Driven Insights",
                desc: "Real-time pricing updates, authentic user reviews, and destination analytics help you make informed decisions backed by data, not just marketing.",
                color: "teal"
              },
              {
                icon: FaUsers,
                title: "Community-Driven",
                desc: "Built on authentic traveler experiences and reviews. Our 4.9/5 rating reflects genuine satisfaction from thousands of real customers, not paid endorsements.",
                color: "purple"
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
                <div className={`inline-flex p-4 rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900 mb-4`}>
                  <feature.icon className={`text-${feature.color}-600`} size={32} />
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-3xl p-10 md:p-12 shadow-xl border border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6 text-center">Built with Modern Technology</h2>
            <p className="text-base-content/70 text-center mb-8 text-lg">
              Navora is powered by industry-leading technologies to ensure speed, security, and reliability.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Next.js 16", desc: "React Framework" },
                { name: "MongoDB", desc: "Database" },
                { name: "Stripe", desc: "Payments" },
                { name: "Groq AI", desc: "AI Engine" },
                { name: "NextAuth", desc: "Authentication" },
                { name: "Vercel", desc: "Hosting" },
                { name: "Tailwind CSS", desc: "Styling" },
                { name: "TypeScript", desc: "Type Safety" },
              ].map((tech) => (
                <div key={tech.name} className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
                  <div className="font-bold text-base-content mb-1">{tech.name}</div>
                  <div className="text-xs text-base-content/60">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered their dream destinations with Navora&apos;s AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore" className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50 border-none shadow-lg px-8">
              Explore Destinations
            </Link>
            <Link href="/contact" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-blue-600 px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
