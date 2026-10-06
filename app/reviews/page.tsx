import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "See what our customers are saying about TastyBite.",
};

export default function ReviewsPage() {
  return (
    <section className="section-spacing bg-surface-muted">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          description="Real reviews from real customers who love TastyBite."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.id} padding="lg" className="flex flex-col gap-4">
              <div
                className="flex items-center gap-1"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "h-4 w-4 fill-accent-400 text-accent-400"
                        : "h-4 w-4 text-charcoal-200"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-body text-foreground-muted">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-body-sm font-medium text-foreground">
                  {review.customerName}
                </span>
                <span className="text-caption text-foreground-muted">{review.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
