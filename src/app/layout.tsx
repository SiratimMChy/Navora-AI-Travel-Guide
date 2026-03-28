import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Providers from "@/components/Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Navora – AI Travel Guide",
  description: "Explore the world with AI-powered travel recommendations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
