import Link from "next/link";
import { FaUndo, FaCheckCircle, FaClock, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

export const metadata = {
  title: "Refund Policy - Navora",
  description: "Refund and cancellation policy for Navora travel bookings",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <FaUndo size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-blue-100 text-lg">Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Quick Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-2xl p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-3">
            <FaCheckCircle className="text-blue-600" />
            Quick Overview
          </h2>
          <ul className="space-y-3 text-base-content/80">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Cancel 14+ days before travel for a full refund (minus $10 processing fee)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Cancel 7-14 days before travel for a 50% refund</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>No refunds for cancellations within 7 days of travel</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Refunds processed within 7-10 business days after approval</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          
          {/* Cancellation Timeline */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300 flex items-center gap-3">
              <FaClock className="text-blue-600" />
              1. Cancellation Timeline
            </h2>
            <p className="text-base-content/70 leading-relaxed mb-6">
              Our cancellation policy is structured to balance flexibility for travelers with fairness to service providers:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 shadow-md">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white font-bold text-2xl mb-4 mx-auto">
                  100%
                </div>
                <h3 className="text-lg font-bold text-center text-green-700 dark:text-green-400 mb-2">14+ Days Before</h3>
                <p className="text-sm text-center text-base-content/70 mb-3">Full refund minus processing fees</p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-xs text-base-content/60">
                  <strong>Deduction:</strong> $10 processing fee
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800 shadow-md">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-white font-bold text-2xl mb-4 mx-auto">
                  50%
                </div>
                <h3 className="text-lg font-bold text-center text-yellow-700 dark:text-yellow-400 mb-2">7-14 Days Before</h3>
                <p className="text-sm text-center text-base-content/70 mb-3">Half of booking amount refunded</p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-xs text-base-content/60">
                  <strong>Example:</strong> $1000 booking = $500 refund
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 rounded-xl p-6 border-2 border-red-200 dark:border-red-800 shadow-md">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white font-bold text-2xl mb-4 mx-auto">
                  0%
                </div>
                <h3 className="text-lg font-bold text-center text-red-700 dark:text-red-400 mb-2">Less Than 7 Days</h3>
                <p className="text-sm text-center text-base-content/70 mb-3">No refund available</p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-xs text-base-content/60">
                  <strong>Note:</strong> Exceptions for emergencies
                </div>
              </div>
            </div>
          </section>

          {/* How to Request */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">2. How to Request a Refund</h2>
            <p className="text-base-content/70 leading-relaxed mb-6">
              Follow these simple steps to request a cancellation and refund:
            </p>
            <div className="space-y-4">
              {[
                { step: 1, title: "Log In", desc: "Access your Navora account using your credentials" },
                { step: 2, title: "Navigate to Bookings", desc: "Go to 'My Bookings' section in your dashboard" },
                { step: 3, title: "Select Booking", desc: "Choose the booking you wish to cancel" },
                { step: 4, title: "Request Cancellation", desc: "Click 'Request Cancellation' and provide a reason" },
                { step: 5, title: "Await Review", desc: "Our team will review within 24-48 hours" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-1">{item.title}</h3>
                    <p className="text-sm text-base-content/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Processing Time */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">3. Refund Processing Timeline</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                  <FaClock className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base-content mb-2">Review & Approval</h3>
                  <p className="text-base-content/70 leading-relaxed mb-2">
                    Our customer service team reviews all refund requests within <strong>24-48 hours</strong> of submission. You&apos;ll receive an email notification once your request is processed.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
                    <strong>Timeline:</strong> 1-2 business days
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center shrink-0">
                  <FaCheckCircle className="text-cyan-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base-content mb-2">Refund Processing</h3>
                  <p className="text-base-content/70 leading-relaxed mb-2">
                    Once approved, refunds are initiated within <strong>7-10 business days</strong> to your original payment method.
                  </p>
                  <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-lg p-3 text-sm">
                    <strong>Timeline:</strong> 7-10 business days
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0">
                  <FaShieldAlt className="text-teal-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base-content mb-2">Bank Processing</h3>
                  <p className="text-base-content/70 leading-relaxed mb-2">
                    Your bank or payment provider may take an additional <strong>3-5 business days</strong> to reflect the refund in your account.
                  </p>
                  <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-3 text-sm">
                    <strong>Timeline:</strong> 3-5 business days (varies by bank)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300 flex items-center gap-3">
              <FaExclamationTriangle className="text-yellow-600" />
              4. Non-Refundable Items
            </h2>
            <p className="text-base-content/70 leading-relaxed mb-6">
              Please note that the following items are non-refundable under any circumstances:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Processing Fees", desc: "$10 administrative fee per booking" },
                { title: "Promotional Bookings", desc: "Special offers and discounted rates" },
                { title: "Third-Party Services", desc: "Visa processing, travel insurance fees" },
                { title: "No-Show Bookings", desc: "Failure to arrive without cancellation" },
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">{item.title}</h3>
                  <p className="text-sm text-base-content/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Special Circumstances */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">5. Special Circumstances & Exceptions</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                  <span className="text-blue-600">🏥</span> Medical Emergencies
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  In case of documented medical emergencies (hospitalization, serious illness), we may offer full or partial refunds regardless of the cancellation timeline. Medical documentation from a licensed physician is required.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                  <span className="text-orange-600">🌪️</span> Natural Disasters
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  If your destination is affected by natural disasters (hurricanes, earthquakes, floods), we will offer full refunds or rebooking options at no additional cost.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                  <span className="text-purple-600">🛂</span> Travel Restrictions
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  Government-imposed travel restrictions, border closures, or mandatory quarantine requirements will qualify for full refunds with proper documentation.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                  <span className="text-green-600">🏢</span> Service Provider Cancellation
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  If the service provider cancels your booking for any reason, you will receive a full refund including all fees, or a rebooking option with equivalent or better accommodations.
                </p>
              </div>
            </div>
          </section>

          {/* Modification Options */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">6. Modification vs. Cancellation</h2>
            <p className="text-base-content/70 leading-relaxed mb-6">
              Consider modifying your booking instead of canceling to avoid cancellation fees:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-3xl">📅</div>
                <div>
                  <h3 className="font-semibold text-base-content mb-2">Date Changes</h3>
                  <p className="text-base-content/70 text-sm mb-2">Change your travel dates up to 7 days before departure at no additional cost (subject to availability)</p>
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full">FREE</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="text-3xl">🗺️</div>
                <div>
                  <h3 className="font-semibold text-base-content mb-2">Destination Changes</h3>
                  <p className="text-base-content/70 text-sm mb-2">Switch to a different destination with a $25 modification fee plus any price difference</p>
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">$25 FEE</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="text-3xl">👤</div>
                <div>
                  <h3 className="font-semibold text-base-content mb-2">Traveler Name Changes</h3>
                  <p className="text-base-content/70 text-sm mb-2">Update traveler names up to 14 days before travel with a $15 administrative fee</p>
                  <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-semibold px-3 py-1 rounded-full">$15 FEE</span>
                </div>
              </div>
            </div>
          </section>

          {/* Travel Insurance */}
          <section className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-2xl p-8 shadow-lg border-2 border-yellow-200 dark:border-yellow-800">
            <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-3">
              <FaShieldAlt className="text-yellow-600" />
              7. Travel Insurance Recommendation
            </h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              We strongly recommend purchasing comprehensive travel insurance to protect your investment against unforeseen circumstances including:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-base-content/70 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-600 shrink-0" />
                <span>Trip cancellations and interruptions</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-600 shrink-0" />
                <span>Medical emergencies abroad</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-600 shrink-0" />
                <span>Lost or delayed luggage</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-600 shrink-0" />
                <span>Emergency evacuations</span>
              </li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">8. Dispute Resolution</h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              If you disagree with a refund decision, you have the right to appeal:
            </p>
            <div className="bg-base-200 rounded-xl p-6">
              <ol className="space-y-3 text-base-content/70">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Contact our customer support team at <a href="mailto:support@navora.com" className="text-blue-600 hover:underline font-semibold">support@navora.com</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Provide your booking reference number and detailed explanation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Include any supporting documentation (medical records, government notices, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Our senior management team will review your case within 5 business days</span>
                </li>
              </ol>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">9. Contact Information</h2>
            <p className="text-base-content/70 leading-relaxed mb-6">
              For refund inquiries, cancellation requests, or assistance, please reach out to us:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-base-content mb-4">Customer Support</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-base-content/70">
                    <strong className="text-base-content">Email:</strong><br />
                    <a href="mailto:support@navora.com" className="text-blue-600 hover:underline">support@navora.com</a>
                  </p>
                  <p className="text-base-content/70">
                    <strong className="text-base-content">Phone:</strong><br />
                    +880 1700-000000
                  </p>
                  <p className="text-base-content/70">
                    <strong className="text-base-content">Live Chat:</strong><br />
                    Available 24/7 on our website
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-base-content mb-4">Business Hours</h3>
                <div className="space-y-3 text-sm text-base-content/70">
                  <p>
                    <strong className="text-base-content">Monday - Friday:</strong><br />
                    9:00 AM - 6:00 PM (GMT+6)
                  </p>
                  <p>
                    <strong className="text-base-content">Saturday:</strong><br />
                    10:00 AM - 4:00 PM (GMT+6)
                  </p>
                  <p>
                    <strong className="text-base-content">Sunday:</strong><br />
                    Closed
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Back Button */}
        <div className="text-center mt-16">
          <Link href="/" className="btn text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-none px-8 shadow-lg">
            <FaShieldAlt className="mr-2" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
