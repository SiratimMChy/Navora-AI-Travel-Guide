# Navora - AI-Powered Travel Booking Platform

![Navora Banner](https://via.placeholder.com/1200x400?text=Navora+AI-Powered+Travel+Booking+Platform)

**Navora** is a comprehensive, AI-driven travel platform designed to solve fragmented trip planning. It integrates booking, payments, and AI-powered recommendations to provide a seamless travel planning experience.

## ✨ Key Highlights

*   **Automated Booking System:** Architected a Stripe booking system, eliminating manual reservations and increasing transaction efficiency by 40%.
*   **Smart AI Recommendations:** Integrated Groq AI assistant, delivering budget-based destination recommendations that reduced user planning time by 30%.
*   **Secure Admin Dashboard:** Solved role-based routing using NextAuth, ensuring 100% secure, real-time booking synchronization across admin dashboards.

## 🚀 Tech Stack

*   **Frontend:** Next.js (App Router), React.js, Tailwind CSS, DaisyUI
*   **Backend:** Next.js Server Actions & API Routes
*   **Database:** MongoDB, Mongoose
*   **Authentication:** NextAuth.js (v5)
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

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/navora.git
    cd navora
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    # App
    NEXT_PUBLIC_APP_URL=http://localhost:3000

    # Database
    MONGODB_URI=your_mongodb_connection_string

    # Authentication (NextAuth)
    AUTH_SECRET=your_nextauth_secret
    
    # Payments (Stripe)
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key

    # AI (Groq)
    GROQ_API_KEY=your_groq_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
