"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  { q: "How does the AI recommendation work?", a: "Our AI analyzes your travel preferences — budget, destination type, travel dates, and group size — to suggest the most suitable destinations and tours from our database." },
  { q: "Can I cancel or modify my booking?", a: "Yes, you can cancel or modify bookings up to 48 hours before your travel date from your dashboard. Cancellations within 48 hours may incur a fee." },
  { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard SSL encryption and never store your full card details. All transactions are processed through secure payment gateways." },
  { q: "Do I need an account to explore destinations?", a: "You can browse all destinations without an account. However, you'll need to register to save favorites, make bookings, and access AI recommendations." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, and various local payment methods depending on your region." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-3">Frequently Asked Questions</h2>
          <p className="text-base-content/60 text-base sm:text-lg">Everything you need to know about Navora</p>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="bg-base-200 border border-base-300 rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-base-300 transition-colors"
              >
                <span className="font-semibold text-base-content text-sm sm:text-base pr-4">{q}</span>
                <FaChevronDown className={`text-sky-500 transition-transform duration-300 shrink-0 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-base-content/70 leading-relaxed border-t border-base-300 pt-3 text-sm sm:text-base">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
