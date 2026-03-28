"use client";
import { useState } from "react";
import { FaPaperPlane, FaMapMarkerAlt, FaCompass, FaStar } from "react-icons/fa";

const perks = [
  { icon: FaMapMarkerAlt, text: "Exclusive destination deals" },
  { icon: FaCompass, text: "Curated travel itineraries" },
  { icon: FaStar, text: "Early access to new tours" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email."); return; }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-base-100">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">

          {/* Left panel */}
          <div className="bg-linear-to-br from-sky-500 to-teal-500 p-10 flex flex-col justify-between text-white">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
                Travel Newsletter
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                Your next adventure<br />starts in your inbox.
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                Get weekly travel inspiration, hidden gems, and exclusive offers delivered to you.
              </p>
              <ul className="space-y-3">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Icon size={13} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right panel */}
          <div className="bg-base-200 p-10 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-sky-500 to-teal-500 flex items-center justify-center mx-auto">
                  <FaPaperPlane className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-base-content">You&apos;re in!</h3>
                <p className="text-base-content/60 text-sm">Welcome aboard. Check your inbox for a special welcome gift.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-base-content mb-1">Get started for free</h3>
                <p className="text-base-content/50 text-sm mb-8">No spam. Unsubscribe anytime.</p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-1.5 block">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-base-100 text-base-content text-sm outline-none border transition focus:ring-2 focus:ring-sky-400 ${error ? "border-red-400" : "border-base-300"}`}
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 bg-linear-to-r from-sky-500 to-teal-500 hover:opacity-90 transition-opacity"
                  >
                    <FaPaperPlane size={13} />
                    Subscribe Now
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-base-300 grid grid-cols-2 gap-4 text-center">
                  {[["Weekly", "Updates"], ["100%", "Free"]].map(([val, label]) => (
                    <div key={label}>
                      <p className="text-base font-bold text-sky-500">{val}</p>
                      <p className="text-xs text-base-content/50">{label}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
