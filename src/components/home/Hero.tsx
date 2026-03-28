"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Typewriter = dynamic(
  () => import("react-simple-typewriter").then((mod) => mod.Typewriter),
  { ssr: false }
);

const slides = [
  {
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400",
    tagline: ["Tokyo, Japan — Where Tradition Meets Tomorrow."],
    position: "object-center",
  },
  {
    img: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1400",
    tagline: ["Bali, Indonesia — The Island of the Gods."],
    position: "object-center",
  },
  {
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400",
    tagline: ["Bangkok, Thailand — A City That Never Sleeps."],
    position: "object-center",
  },
  {
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1400",
    tagline: ["Maldives — The Purest Blue on Earth."],
    position: "object-center",
  },
  {
    img: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=1400",
    tagline: ["Cox's Bazar, Bangladesh — Stunning coastal views."],
    position: "object-center",
  },
  {
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400",
    tagline: ["Taj Mahal, India — An Eternal Symbol of Love."],
    position: "object-top",
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
                alt={`Navora hero slide ${index + 1}`}
                className={`w-full h-full object-cover brightness-75 ${slide.position}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              {/* Text at bottom center */}
              <div className="absolute inset-0 flex items-end justify-center pb-6 lg:pb-10 px-4">
                <p className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-bold text-white text-center drop-shadow-lg bg-black/25 backdrop-blur-sm px-4 py-2 lg:px-8 lg:py-4 rounded-2xl border border-white/20">
                  <Typewriter
                    words={slide.tagline}
                    loop
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={3000}
                    cursor
                    cursorStyle="|"
                  />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
