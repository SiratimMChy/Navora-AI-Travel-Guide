import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Review } from "@/types";

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-3">What Travelers Say</h2>
          <p className="text-base-content/60 text-base sm:text-lg">Real stories from real adventurers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={String(review._id)} className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <FaQuoteLeft className="text-sky-500/30 text-4xl mb-4" />
              <p className="text-base-content/70 leading-relaxed mb-6 italic">&ldquo;{review.comment}&rdquo;</p>
              <div className="flex items-center gap-4">
                {review.userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={review.userImage} alt={review.userName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500 font-bold text-lg shrink-0">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold text-base-content">{review.userName}</p>
                  <p className="text-base-content/40 text-sm">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
