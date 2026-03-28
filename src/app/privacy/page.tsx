import Link from "next/link";
import { FaShieldAlt } from "react-icons/fa";

const sections = [
  {
    title: "1. Information We Collect",
    items: [
      "Name and email address when you register an account.",
      "Profile photo if you sign in via Google OAuth.",
      "Booking details: destination, travel date, number of travelers, and total price.",
      "Reviews and ratings you submit for destinations.",
      "Basic usage data such as pages visited, collected automatically.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "To create and manage your account.",
      "To process and manage your destination bookings.",
      "To display your reviews on destination pages.",
      "To provide AI-powered travel recommendations based on your preferences.",
      "To send booking confirmation and status update notifications.",
    ],
  },
  {
    title: "3. Data Storage",
    items: [
      "Your data is stored securely in MongoDB Atlas (cloud database).",
      "Passwords are hashed using bcrypt — plain-text passwords are never stored.",
      "Authentication is handled via NextAuth.js with secure session tokens.",
    ],
  },
  {
    title: "4. Information Sharing",
    items: [
      "We do not sell or share your personal data with third parties.",
      "Google OAuth is used only for authentication — we do not access your Google data beyond your name, email, and profile photo.",
      "Booking and review data is only visible to you and platform admins.",
    ],
  },
  {
    title: "5. Your Rights",
    items: [
      "You can update your name and profile photo from your dashboard.",
      "You can contact us to request deletion of your account and associated data.",
      "You can opt out of the platform at any time by stopping use of the service.",
    ],
  },
  {
    title: "6. Contact",
    items: [
      "For any privacy-related questions, contact us via the Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero */}
      <div className="bg-linear-to-br from-sky-700 to-teal-600 text-white py-16 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
          <FaShieldAlt size={24} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sky-100 text-base">Last updated: March 28, 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        {/* Intro */}
        <p className="text-base-content/70 leading-relaxed text-sm">
          This policy explains what personal data Navora collects, how it is used, and how it is protected. We only collect data that is necessary to operate the platform.
        </p>

        {/* Sections */}
        {sections.map(({ title, items }) => (
          <div key={title} className="bg-base-200 border border-base-300 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-base-content mb-3">{title}</h2>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-base-content/70 leading-relaxed">
                  <span className="text-sky-500 mt-1 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center pt-4">
          <Link href="/" className="btn btn-primary btn-sm text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
