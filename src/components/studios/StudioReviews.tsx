import { Star } from 'lucide-react';

export interface Review {
  _id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface StudioReviewsProps {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

export default function StudioReviews({
  reviews,
  rating,
  totalReviews,
}: StudioReviewsProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-sm text-muted-foreground">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          No reviews available yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map(review => (
            <article key={review._id} className="rounded-xl border p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{review.userName}</h3>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{review.rating}</span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {review.comment}
              </p>

              <p className="mt-3 text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
