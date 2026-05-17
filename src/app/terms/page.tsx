import Link from "next/link";
import { FaShieldAlt, FaFileContract, FaCheckCircle } from "react-icons/fa";

export const metadata = {
  title: "Terms of Service - Navora",
  description: "Terms and conditions for using Navora travel booking platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <FaFileContract size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-blue-100 text-lg">Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Quick Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-2xl p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-3">
            <FaCheckCircle className="text-blue-600" />
            Quick Summary
          </h2>
          <ul className="space-y-3 text-base-content/80">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>By using Navora, you agree to these terms and our booking policies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>All bookings are subject to availability and confirmation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Cancellation policies vary by booking - review before confirming</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>You&apos;re responsible for travel documents and accurate booking information</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          
          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">1. Acceptance of Terms</h2>
            <p className="text-base-content/70 leading-relaxed">
              Welcome to Navora. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our services immediately.
            </p>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">2. Booking and Payments</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-base-content mb-2">2.1 Booking Process</h3>
                <p className="text-base-content/70 leading-relaxed">
                  All bookings made through Navora are subject to availability and confirmation from our service providers. We reserve the right to refuse or cancel any booking at our discretion, including cases of suspected fraud or violation of our terms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content mb-2">2.2 Payment Terms</h3>
                <p className="text-base-content/70 leading-relaxed">
                  Payment must be made in full at the time of booking using our secure Stripe payment gateway. All prices are displayed in USD unless otherwise stated. We do not store your payment card information.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content mb-2">2.3 Price Accuracy</h3>
                <p className="text-base-content/70 leading-relaxed">
                  While we strive to ensure pricing accuracy, errors may occur. If we discover a pricing error after you&apos;ve placed an order, we&apos;ll notify you and give you the option to proceed at the correct price or cancel your booking for a full refund.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">3. Cancellation and Refunds</h2>
            <div className="space-y-4">
              <p className="text-base-content/70 leading-relaxed">
                Our cancellation policy is designed to be fair to both travelers and service providers:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-green-600 font-bold text-lg mb-2">14+ Days</div>
                  <div className="text-sm text-base-content/70">Full refund minus $10 processing fee</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="text-yellow-600 font-bold text-lg mb-2">7-14 Days</div>
                  <div className="text-sm text-base-content/70">50% refund of booking amount</div>
                </div>
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="text-red-600 font-bold text-lg mb-2">&lt; 7 Days</div>
                  <div className="text-sm text-base-content/70">No refund available</div>
                </div>
              </div>
              <p className="text-sm text-base-content/60 italic">
                For detailed refund information, please visit our <Link href="/refund" className="text-blue-600 hover:underline">Refund Policy</Link> page.
              </p>
            </div>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">4. User Responsibilities</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base-content mb-2">Account Security</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized access.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base-content mb-2">Accurate Information</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    You must provide accurate, current, and complete information during registration and booking. Inaccurate information may result in booking cancellation without refund.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base-content mb-2">Travel Documents</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    You are solely responsible for obtaining all necessary travel documents, including passports, visas, and health certificates required for your destination.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">5. AI-Powered Recommendations</h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              Our AI-powered recommendation system provides personalized travel suggestions based on your preferences, budget, and travel history. While we strive for accuracy and relevance:
            </p>
            <ul className="space-y-2 text-base-content/70">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Recommendations are for informational purposes only and should not be considered professional travel advice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Final booking decisions and travel arrangements remain your responsibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>We do not guarantee the accuracy or suitability of AI-generated suggestions</span>
              </li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">6. Limitation of Liability</h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              Navora acts as an intermediary platform connecting travelers with service providers. To the maximum extent permitted by law:
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <p className="text-base-content/70 leading-relaxed">
                We are not liable for any injuries, damages, losses, delays, or expenses caused by third-party service providers, natural disasters, political unrest, or circumstances beyond our reasonable control. Our total liability shall not exceed the amount paid for your booking.
              </p>
            </div>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">7. Intellectual Property</h2>
            <p className="text-base-content/70 leading-relaxed">
              All content on Navora, including but not limited to text, graphics, logos, images, software, and design elements, is the property of Navora or its licensors and is protected by international copyright, trademark, and intellectual property laws. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">8. Privacy and Data Protection</h2>
            <p className="text-base-content/70 leading-relaxed">
              Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our <Link href="/privacy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</Link>. By using Navora, you consent to our data practices as described in that policy.
            </p>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">9. Modifications to Terms</h2>
            <p className="text-base-content/70 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of Navora after changes are posted constitutes your acceptance of the modified terms. We encourage you to review these terms periodically.
            </p>
          </section>

          <section className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300">
            <h2 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">10. Contact Information</h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              If you have questions or concerns about these Terms of Service, please contact us:
            </p>
            <div className="bg-base-200 rounded-xl p-6 space-y-2">
              <p className="text-base-content"><strong>Email:</strong> <a href="mailto:support@navora.com" className="text-blue-600 hover:underline">support@navora.com</a></p>
              <p className="text-base-content"><strong>Phone:</strong> +880 1700-000000</p>
              <p className="text-base-content"><strong>Address:</strong> Dhaka, Bangladesh</p>
              <p className="text-base-content"><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (GMT+6)</p>
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
