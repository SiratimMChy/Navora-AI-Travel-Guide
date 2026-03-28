"use client";
import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaComments, FaStar, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { Destination } from "@/types";
import Link from "next/link";

type Message = {
  role: "bot" | "user";
  text?: string;
  recommendations?: Destination[];
};

const CATEGORIES = ["beach", "mountain", "city", "adventure", "cruise"];
const BUDGETS = [500, 1000, 2000, 5000];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({ category: "", budget: 0, travelers: 1 });
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm your AI travel guide. I'll help you find the perfect destination. What type of trip are you looking for?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  const handleCategory = (cat: string) => {
    setPrefs((p) => ({ ...p, category: cat }));
    addMessage({ role: "user", text: cat ? `🏖️ ${cat.charAt(0).toUpperCase() + cat.slice(1)}` : "Any destination" });
    setTimeout(() => {
      addMessage({ role: "bot", text: "Great choice! What's your budget per person?" });
      setStep(2);
    }, 300);
  };

  const handleBudget = (b: number) => {
    setPrefs((p) => ({ ...p, budget: b }));
    addMessage({ role: "user", text: `💰 $${b}` });
    setTimeout(() => {
      addMessage({ role: "bot", text: "Perfect! Let me find the best destinations for you..." });
      setStep(3);
      fetchRecommendations({ ...prefs, budget: b });
    }, 300);
  };

  const fetchRecommendations = async (finalPrefs: typeof prefs) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: finalPrefs }),
      });
      if (!res.ok) throw new Error("Failed to get recommendations");
      const data = await res.json();
      addMessage({ role: "bot", text: data.message });
      if (data.recommendations?.length) {
        addMessage({ role: "bot", recommendations: data.recommendations });
      }
      setStep(4);
    } catch {
      setError("Something went wrong. Please try again.");
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setPrefs({ category: "", budget: 0, travelers: 1 });
    setError("");
    setMessages([{ role: "bot", text: "Hi! 👋 I'm your AI travel guide. I'll help you find the perfect destination. What type of trip are you looking for?" }]);
    setTimeout(() => setStep(1), 100);
  };

  const handleOpen = () => {
    setOpen(true);
    if (step === 0) setTimeout(() => setStep(1), 400);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-sky-500 to-teal-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        <FaComments size={22} />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col bg-base-100 border border-base-300 rounded-2xl shadow-2xl overflow-hidden max-h-[520px]">

          {/* Header */}
          <div className="bg-linear-to-r from-sky-600 to-teal-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FaRobot size={16} />
              </div>
              <div>
                <p className="font-bold text-sm leading-none">Navora AI</p>
                <p className="text-xs text-white/70">Travel Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/20 rounded-full p-1.5 transition-colors">
              <FaTimes size={14} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.text && (
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-2 mt-1 shrink-0">
                        <FaRobot size={11} className="text-sky-500" />
                      </div>
                    )}
                    <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sky-500 text-white rounded-br-sm"
                        : "bg-base-200 text-base-content rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                )}
                {msg.recommendations && (
                  <div className="space-y-2 mt-1">
                    {msg.recommendations.map((dest) => (
                      <Link key={dest._id} href={`/destinations/${dest._id}`} onClick={() => setOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-base-200 hover:bg-base-300 transition-colors border border-base-300 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={dest.image} alt={dest.title} className="w-14 h-12 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-base-content text-sm truncate group-hover:text-sky-500 transition-colors">{dest.title}</p>
                          <p className="text-base-content/50 text-xs flex items-center gap-1">
                            <FaMapMarkerAlt size={9} className="text-sky-500" />{dest.location}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sky-500 text-xs font-bold">${dest.price}/person</span>
                            <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                              <FaStar size={9} />{dest.rating}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                  <FaRobot size={11} className="text-sky-500" />
                </div>
                <div className="bg-base-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-400 text-center bg-red-50 rounded-xl px-3 py-2">{error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick reply buttons */}
          {!loading && (
            <div className="px-4 pb-4 shrink-0 space-y-2">
              {step === 1 && (
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => handleCategory(cat)}
                      className="btn btn-xs btn-outline capitalize hover:btn-primary hover:text-white transition-all">
                      {cat}
                    </button>
                  ))}
                  <button onClick={() => handleCategory("")} className="btn btn-xs btn-ghost col-span-3 text-base-content/50">
                    Any destination
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-1.5">
                  {BUDGETS.map((b) => (
                    <button key={b} onClick={() => handleBudget(b)}
                      className={`btn btn-xs ${prefs.budget === b ? "btn-primary text-white" : "btn-outline"}`}>
                      ${b}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <button onClick={reset}
                  className="w-full btn btn-sm btn-outline gap-2">
                  <FaPaperPlane size={12} /> Start New Search
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
