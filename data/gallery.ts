export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    src: "/images/gallery/gallery-1.jpg",
    alt: "Signature burger with fresh toppings",
  },
  {
    id: "gal-2",
    src: "/images/gallery/gallery-2.jpg",
    alt: "Wood-fired pizza fresh out of the oven",
  },
  {
    id: "gal-3",
    src: "/images/gallery/gallery-3.jpg",
    alt: "Loaded cheese fries with bacon",
  },
  { id: "gal-4", src: "/images/gallery/gallery-4.jpg", alt: "Crispy chicken sandwich" },
  {
    id: "gal-5",
    src: "/images/gallery/gallery-5.jpg",
    alt: "Chocolate lava cake with ice cream",
  },
  { id: "gal-6", src: "/images/gallery/gallery-6.jpg", alt: "Fresh lemonade with mint" },
  {
    id: "gal-7",
    src: "/images/gallery/gallery-7.jpg",
    alt: "Buffalo wings with ranch dip",
  },
  { id: "gal-8", src: "/images/gallery/gallery-8.jpg", alt: "Strawberry cheesecake" },
];
