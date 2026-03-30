"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import dynamic from "next/dynamic";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Typewriter = dynamic(
  () => import("react-simple-typewriter").then((mod) => mod.Typewriter),
  { ssr: false }
);

const slides = [
  {
    title: "Cox's Bazar",
    country: "Bangladesh",
    img: "https://i.ibb.co.com/cXvQPvJr/coxs-bazar-1400x480.png",
    tagline: "The longest natural sea beach in the world with golden sands and stunning sunsets.",
  },
  {
    title: "Bali",
    country: "Indonesia",
    img: "https://i.ibb.co.com/gbt0cNSW/bali-resized-1400x480.png",
    tagline: "A tropical paradise of lush rice terraces, temples, and breathtaking beaches.",
  },
  {
    title: "Tokyo",
    country: "Japan",
    img: "https://i.ibb.co.com/vxRD9w7g/tokyo-cinematic-resized-1400x480.png",
    tagline: "A dynamic city where tradition blends seamlessly with futuristic innovation.",
  },
  {
    title: "Maldives",
    country: "Maldives",
    img: "https://i.ibb.co.com/2LJWQNv/maldives-1400x480.png",
    tagline: "Crystal-clear waters, white sandy beaches, and luxurious island escapes.",
  },
  {
    title: "Bangkok",
    country: "Thailand",
    img: "https://i.ibb.co.com/gbQvKDFM/bangkok-resized-1400x480.png",
    tagline: "A vibrant city filled with golden temples, street markets, and nightlife.",
  },
  {
    title: "Taj Mahal",
    country: "India",
    img: "https://i.ibb.co.com/v6gFF3r6/tajmahal-resized-1400x480.png",
    tagline: "An iconic symbol of love and one of the most beautiful monuments in the world.",
  },
];

export default function Hero() {
  return (
    <div className="w-full px-2 lg:px-6 pt-4 pb-4">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-56 sm:h-72 md:h-96 lg:h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.img}
                alt={`${slide.title} - Navora`}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/70" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2">
                <p className="text-white/80 text-xs sm:text-sm uppercase tracking-widest font-medium">
                  {slide.country}
                </p>
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl drop-shadow bg-black/25 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                  <Typewriter
                    words={[slide.tagline]}
                    loop
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={3000}
                    cursor
                    cursorStyle="|"
                  />
                </p>
                <div className="flex gap-3 mt-3">
                  <Link
                    href="/explore"
                    className="btn btn-primary px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform"
                  >
                    Explore Destinations
                  </Link>
                  <button
                    onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn btn-outline px-6 py-2 rounded-full text-sm font-semibold text-white border-white hover:bg-white hover:text-black transition-all"
                  >
                    View Tours
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
