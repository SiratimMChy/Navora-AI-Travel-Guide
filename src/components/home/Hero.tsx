"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
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
    <div className="w-full px-2 lg:px-0 lg:w-11/12 mx-auto pt-0.5 pb-4">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-lg overflow-hidden shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[480px]">
              <Image
                src={slide.img}
                alt={`${slide.title} - Navora`}
                fill
                priority={index === 0}
                sizes="100vw"
                unoptimized
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/70" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 pb-3 sm:pb-0">
                <p className="text-white/80 text-xs sm:text-sm uppercase tracking-widest font-medium ">
                  {slide.country}
                </p>
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl pb-2">
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
                <div className="flex flex-nowrap justify-center gap-2 sm:gap-3 mt-4 w-full px-1 sm:px-0">
                  <Link
                    href="/explore"
                    className="btn min-h-0 h-auto px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold shadow-lg hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-none hover:from-blue-700 hover:to-cyan-600 whitespace-nowrap"
                  >
                    Explore Destinations
                  </Link>
                  <button
                    onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn min-h-0 h-auto btn-outline px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold text-white border-white hover:bg-white hover:text-black transition-all whitespace-nowrap"
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
