import type { Metadata } from "next";
import { OffersView } from "@/components/pages/OffersView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.offersTitle,
  description: itSeo.offersDescription,
};

export default function OffersPage() {
  return <OffersView />;
}
