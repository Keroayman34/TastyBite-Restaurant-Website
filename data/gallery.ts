import type { LocalizedField } from "@/domain/entities";

export interface GalleryImage {
  id: string;
  src: string;
  alt: LocalizedField;
  category: "pizza" | "burgers" | "other";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    src: "/images/products/margherita-pizza.jpg",
    alt: {
      it: "Pizza Margherita con basilico fresco e mozzarella",
      en: "Margherita pizza with fresh basil and mozzarella",
    },
    category: "pizza",
  },
  {
    id: "gal-2",
    src: "/images/products/pepperoni-pizza.jpg",
    alt: {
      it: "Pizza Diavola con salame piccante e mozzarella fusa",
      en: "Pepperoni pizza with melted cheese",
    },
    category: "pizza",
  },
  {
    id: "gal-3",
    src: "/images/products/classic-burger.jpg",
    alt: {
      it: "Hamburger classico di manzo con ingredienti freschi",
      en: "Classic beef burger with fresh toppings",
    },
    category: "burgers",
  },
  {
    id: "gal-4",
    src: "/images/products/double-cheeseburger.jpg",
    alt: {
      it: "Doppio cheeseburger con cheddar fuso",
      en: "Double cheeseburger with cheddar",
    },
    category: "burgers",
  },
  {
    id: "gal-5",
    src: "/images/products/crispy-chicken.jpg",
    alt: {
      it: "Pollo fritto croccante e dorato",
      en: "Golden crispy fried chicken",
    },
    category: "other",
  },
  {
    id: "gal-6",
    src: "/images/products/pasta-alfredo.jpg",
    alt: {
      it: "Pasta Alfredo cremosa con parmigiano",
      en: "Creamy Alfredo pasta with parmesan",
    },
    category: "other",
  },
  {
    id: "gal-7",
    src: "/images/products/caesar-salad.jpg",
    alt: {
      it: "Insalata Caesar fresca con pollo alla griglia",
      en: "Fresh Caesar salad with grilled chicken",
    },
    category: "other",
  },
  {
    id: "gal-8",
    src: "/images/products/chocolate-lava-cake.jpg",
    alt: {
      it: "Tortino al cioccolato caldo dal cuore morbido",
      en: "Warm chocolate lava cake with molten center",
    },
    category: "other",
  },
];
