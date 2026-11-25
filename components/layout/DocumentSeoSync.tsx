"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePreferences } from "@/components/preferences/PreferencesContext";
import { restaurant } from "@/config/restaurant";

export function DocumentSeoSync() {
  const pathname = usePathname();
  const { t, language } = usePreferences();

  useEffect(() => {
    document.documentElement.lang = language;

    let pageTitle = t.seo.homeTitle;
    let pageDescription = t.seo.homeDescription;

    if (pathname === "/menu") {
      pageTitle = `${t.seo.menuTitle} | ${restaurant.name}`;
      pageDescription = t.seo.menuDescription;
    } else if (pathname === "/cart") {
      pageTitle = `${t.seo.cartTitle} | ${restaurant.name}`;
      pageDescription = t.seo.cartDescription;
    } else if (pathname === "/checkout") {
      pageTitle = `${t.seo.checkoutTitle} | ${restaurant.name}`;
      pageDescription = t.seo.checkoutDescription;
    } else if (pathname === "/about") {
      pageTitle = `${t.seo.aboutTitle} | ${restaurant.name}`;
      pageDescription = t.seo.aboutDescription;
    } else if (pathname === "/offers") {
      pageTitle = `${t.seo.offersTitle} | ${restaurant.name}`;
      pageDescription = t.seo.offersDescription;
    } else if (pathname === "/contact") {
      pageTitle = `${t.seo.contactTitle} | ${restaurant.name}`;
      pageDescription = t.seo.contactDescription;
    } else if (pathname === "/locations") {
      pageTitle = `${t.seo.locationsTitle} | ${restaurant.name}`;
      pageDescription = t.seo.locationsDescription;
    } else if (pathname === "/reviews") {
      pageTitle = `${t.seo.reviewsTitle} | ${restaurant.name}`;
      pageDescription = t.seo.reviewsDescription;
    } else if (pathname === "/gallery") {
      pageTitle = `${t.seo.galleryTitle} | ${restaurant.name}`;
      pageDescription = t.seo.galleryDescription;
    }

    if (!pathname.startsWith("/menu/")) {
      document.title = pageTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", pageDescription);
      }
    }
  }, [pathname, t, language]);

  return null;
}
