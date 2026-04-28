"use client";

import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Review } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <section className="py-20 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-sky-500 bg-sky-500/10 px-4 py-1.5 rounded-full mb-4">
            Traveler Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            What Our Guests Are Saying
          </h2>
          <p className="text-base-content/50 text-base sm:text-lg max-w-xl mx-auto mb-6">
            Thousands of adventurers have trusted Navora - here&apos;s what they experienced.
          </p>

        </div>

        {/* Coverflow Slider */}
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="pb-14"
        >
          {reviews.map((review) => (
            <SwiperSlide key={String(review._id)} style={{ width: "340px" }}>
              <div className="bg-base-100 rounded-3xl p-7 shadow-md flex flex-col gap-5 h-full border border-base-content/5">

                {/* Top: quote + stars */}
                <div className="flex items-start justify-between">
                  <FaQuoteLeft className="text-sky-500/25 text-4xl" />
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={review.rating >= i + 1 ? "text-yellow-400 text-sm" : "text-base-content/15 text-sm"} />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-base-content/65 leading-relaxed italic text-sm flex-1">
                  &ldquo;{review.comment}&rdquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-base-content/8" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {review.userImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-500/20"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-sky-500 to-teal-400 flex items-center justify-center text-white font-bold text-base shrink-0">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base-content text-sm truncate">{review.userName}</p>
                    <p className="text-base-content/40 text-xs">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                        : "Verified Traveler"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full shrink-0">
                    Verified
                  </span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
