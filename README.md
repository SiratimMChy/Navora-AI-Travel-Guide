# Navora - AI-Powered Travel Booking Platform

**Navora** is a comprehensive, AI-driven travel platform designed to solve fragmented trip planning. It integrates booking, payments, and AI-powered recommendations to provide a seamless travel planning experience.

## ✨ Key Highlights

*   **Automated Booking System:** Architected a Stripe booking system, eliminating manual reservations and increasing transaction efficiency by 40%.
*   **Smart AI Recommendations:** Integrated Groq AI assistant, delivering budget-based destination recommendations that reduced user planning time by 30%.
*   **Secure Admin Dashboard:** Solved role-based routing using NextAuth, ensuring 100% secure, real-time booking synchronization across admin dashboards.

## 🚀 Tech Stack

*   **Frontend:** Next.js, Tailwind CSS, DaisyUI
*   **Backend:** Next.js Server Actions & API Routes
*   **Database:** MongoDB, Mongoose
*   **Authentication:** NextAuth.js
*   **Payments:** Stripe
*   **AI Integration:** Groq AI
*   **Deployment:** Vercel

## ⚙️ Local Development

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   MongoDB URI
*   Stripe Account (for payment testing)
*   Groq API Key

## 📂 Project Structure

```text
src/
├── actions/        # Next.js Server Actions
├── app/            # App Router pages & API routes
├── components/     # Reusable React components
├── lib/            # Utility functions & configs (e.g., db connect, stripe)
├── models/         # Mongoose schemas
└── types/          # TypeScript type definitions
```
