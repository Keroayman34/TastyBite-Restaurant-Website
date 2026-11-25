import type { Metadata } from "next";
import { CheckoutRouteView } from "@/components/checkout/CheckoutRouteView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.checkoutTitle,
  description: itSeo.checkoutDescription,
};

export default function CheckoutRoute() {
  return <CheckoutRouteView />;
}
