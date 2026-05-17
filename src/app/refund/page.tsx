import Link from "next/link";

export const metadata = {
  title: "Refund Policy - Navora",
  description: "Refund and cancellation policy for Navora travel bookings",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">Refund Policy</h1>
          <p className="text-base-content/60">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">1. Cancellation Timeline</h2>
            <div className="bg-base-200 rounded-xl p-6 mb-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="badge badge-success badge-lg shrink-0">100%</div>
                  <div>
                    <p className="font-semibold text-base-content">14+ Days Before Travel</p>
                    <p className="text-base-content/60 text-sm">Full refund minus processing fees ($10)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="badge badge-warning badge-lg shrink-0">50%</div>
                  <div>
                    <p className="font-semibold text-base-content">7-14 Days Before Travel</p>
                    <p className="text-base-content/60 text-sm">50% refund of total booking amount</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="badge badge-error badge-lg shrink-0">0%</div>
                  <div>
                    <p className="font-semibold text-base-content">Less Than 7 Days Before Travel</p>
                    <p className="text-base-content/60 text-sm">No refund available</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">2. How to Request a Refund</h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              To request a refund, please follow these steps:
            </p>
            <ol className="list-decimal list-inside text-base-content/70 space-y-2">
              <li>Log in to your Navora account</li>
              <li>Navigate to &quot;My Bookings&quot; in your dashboard</li>
              <li>Select the booking you wish to cancel</li>
              <li>Click &quot;Request Cancellation&quot; and provide a reason</li>
              <li>Our team will review and process your request within 24-48 hours</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">3. Refund Processing Time</h2>
            <p className="text-base-content/70 leading-relaxed mb-3">
              <strong>3.1 Approval:</strong> Refund requests are typically reviewed and approved within 24-48 hours.
            </p>
            <p className="text-base-content/70 leading-relaxed mb-3">
              <strong>3.2 Processing:</strong> Once approved, refunds are processed within 7-10 business days.
            </p>
            <p className="text-base-content/70 leading-relaxed">
              <strong>3.3 Bank Processing:</strong> Depending on your bank or payment provider, it may take an additional 3-5 business days for the refund to appear in your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">4. Non-Refundable Items</h2>
            <p className="text-base-content/70 leading-relaxed mb-3">
              The following items are non-refundable:
            </p>
            <ul className="list-disc list-inside text-base-content/70 space-y-2">
              <li>Processing fees ($10 per booking)</li>
              <li>Special promotional or discounted bookings (unless otherwise stated)</li>
              <li>Third-party service fees (visa processing, travel insurance, etc.)</li>
              <li>No-show bookings (failure to arrive without prior cancellation)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">5. Special Circumstances</h2>
            <p className="text-base-content/70 leading-relaxed mb-3">
              <strong>5.1 Medical Emergencies:</strong> In case of medical emergencies with proper documentation, we may offer full or partial refunds regardless of the cancellation timeline.
            </p>
            <p className="text-base-content/70 leading-relaxed mb-3">
              <strong>5.2 Natural Disasters:</strong> If your destination is affected by natural disasters, we will offer full refunds or rebooking options.
            </p>
            <p className="text-base-content/70 leading-relaxed mb-3">
              <strong>5.3 Travel Restrictions:</strong> Government-imposed travel restrictions or border closures will qualify for full refunds.
            </p>
            <p className="text-base-content/70 leading-relaxed">
              <strong>5.4 Service Provider Cancellation:</strong> If the service provider cancels your booking, you will receive a full refund including all fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">6. Modification vs. Cancellation</h2>
            <p className="text-base-content/70 leading-relaxed mb-3">
              Instead of canceling, you may modify your booking:
            </p>
            <ul className="list-disc list-inside text-base-content/70 space-y-2">
              <li><strong>Date Changes:</strong> Free date changes up to 7 days before travel (subject to availability)</li>
              <li><strong>Destination Changes:</strong> $25 modification fee + any price difference</li>
              <li><strong>Traveler Changes:</strong> Name changes allowed up to 14 days before travel ($15 fee)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">7. Travel Insurance</h2>
            <p className="text-base-content/70 leading-relaxed">
              We strongly recommend purchasing travel insurance to protect against unforeseen circumstances. Travel insurance can cover cancellations, medical emergencies, lost luggage, and more.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">8. Dispute Resolution</h2>
            <p className="text-base-content/70 leading-relaxed">
              If you disagree with a refund decision, you may appeal by contacting our customer support team at support@navora.com with your booking reference and detailed explanation. We will review your case within 5 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">9. Contact Information</h2>
            <p className="text-base-content/70 leading-relaxed mb-3">
              For refund inquiries or assistance, please contact us:
            </p>
            <ul className="list-disc list-inside text-base-content/70 space-y-1">
              <li>Email: support@navora.com</li>
              <li>Phone: +880 1700-000000</li>
              <li>Live Chat: Available on our website 24/7</li>
            </ul>
          </section>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="btn text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-sky-600 hover:to-teal-600 border-none">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
