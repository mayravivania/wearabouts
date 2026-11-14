"use client";

import Stars from "@/components/ui/Stars";
import { useItemReviews } from "@/hooks/useItemReviews";
import { formatDate } from "@/lib/date";


export default function ReviewList({ itemId }) {
  const { summary, error, loading } = useItemReviews(itemId);

  if (loading) return <p className="text-fg-2">Loading reviews...</p>;
  if (error) return <p className="text-stamp">{error}</p>;

  return (
    <section className="flex flex-col gap-6 border-t border-line pt-10" aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id="reviews-heading" className="font-display text-3xl">
          Reviews
        </h2>
        {summary.total > 0 && (
          <p className="flex items-center gap-2 text-fg-2">
            <Stars value={Math.round(summary.averageRating)} />
            <span>
              {summary.averageRating} from {summary.total} {summary.total === 1 ? "review" : "reviews"}
            </span>
          </p>
        )}
      </div>

      {summary.total === 0 ? (
        <p className="text-fg-2">No reviews yet. They show up here once a buyer has received the piece.</p>
      ) : (
        <ul className="flex flex-col gap-5 max-w-2xl">
          {summary.reviews.map((review) => (
            <li key={review._id} className="flex flex-col gap-2 border-b border-line pb-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Stars value={review.rating} />
                <span className="text-sm text-fg-2">
                  {review.user?.name || "A shopper"} · {formatDate(review.createdAt)}
                </span>
              </div>
              {review.comment && <p className="leading-relaxed">{review.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
