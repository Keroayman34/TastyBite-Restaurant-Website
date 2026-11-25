import type { Metadata } from "next";
import { ReviewsView } from "@/components/pages/ReviewsView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.reviewsTitle,
  description: itSeo.reviewsDescription,
};

export default function ReviewsPage() {
  return <ReviewsView />;
}
