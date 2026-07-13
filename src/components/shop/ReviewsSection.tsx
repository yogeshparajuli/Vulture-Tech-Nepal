import Image from "next/image";
import ReviewStars from "./ReviewStars";
import type { ClientReview } from "@/lib/products";

export default function ReviewsSection({
  reviews,
  averageRating,
}: {
  reviews: ClientReview[];
  averageRating: number | null;
}) {
  if (reviews.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-cream">Customer Reviews</h2>
        {averageRating !== null && (
          <div className="flex items-center gap-2">
            <ReviewStars rating={averageRating} iconClassName="h-4 w-4" />
            <span className="text-sm text-slate">
              {averageRating.toFixed(1)} · {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-sm card-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-2">
                <Image
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-cream">{review.reviewerName}</p>
                <ReviewStars rating={review.rating} />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
