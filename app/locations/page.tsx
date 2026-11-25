import type { Metadata } from "next";
import { LocationsView } from "@/components/pages/LocationsView";
import { getDictionary } from "@/lib/i18n";

const itSeo = getDictionary("it").seo;

export const metadata: Metadata = {
  title: itSeo.locationsTitle,
  description: itSeo.locationsDescription,
};

export default function LocationsPage() {
  return <LocationsView />;
}
