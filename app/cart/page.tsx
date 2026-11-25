import type { Metadata } from "next";
import { CartRouteView } from "@/components/cart/CartRouteView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.cartTitle,
  description: itSeo.cartDescription,
};

export default function CartRoute() {
  return <CartRouteView />;
}
