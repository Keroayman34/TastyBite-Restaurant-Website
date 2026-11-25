import type { Offer } from "@/domain/entities";

export const offers: Offer[] = [
  {
    id: "offer-family-burger-bundle",
    title: {
      it: "Menu Famiglia Burger",
      en: "Family Burger Bundle",
    },
    description: {
      it: "Quattro cheeseburger classici, due porzioni di patatine speciali e una bibita da 2 litri. Il pasto perfetto per tutta la famiglia.",
      en: "Four classic cheeseburgers, two loaded fries, and a 2-liter drink. The perfect feast for the whole family.",
    },
    originalPrice: 49.0,
    discountedPrice: 38.0,
    image: "/images/products/classic-burger.jpg",
    items: [
      { it: "4x Cheeseburger Classico", en: "4x Classic Cheeseburger" },
      { it: "2x Patatine Fritte Speciali", en: "2x Loaded Cheese Fries" },
      { it: "1x Bibita da 2L a scelta", en: "1x 2L Drink of Choice" },
    ],
  },
  {
    id: "offer-pizza-night",
    title: {
      it: "Speciale Serata Pizza",
      en: "Pizza Night Deal",
    },
    description: {
      it: "Due pizze grandi a tua scelta più un dolce. La tua serata pizza non è mai stata così buona.",
      en: "Two large pizzas of your choice plus a dessert. Pizza night just got better.",
    },
    originalPrice: 32.5,
    discountedPrice: 26.0,
    image: "/images/products/pepperoni-pizza.jpg",
    items: [
      { it: "2x Pizza Grande a scelta", en: "2x Large Pizza" },
      { it: "1x Tortino al Cioccolato Caldo", en: "1x Chocolate Lava Cake" },
    ],
  },
  {
    id: "offer-lunch-combo",
    title: {
      it: "Menu Pranzo Express",
      en: "Lunch Combo",
    },
    description: {
      it: "Un piatto a scelta tra pollo o burger, un contorno e una bibita. Disponibile dal lunedì al venerdì dalle 11:00 alle 15:00.",
      en: "Any chicken or burger main, a side, and a drink. Available weekdays from 11 AM to 3 PM.",
    },
    originalPrice: 16.0,
    discountedPrice: 12.5,
    image: "/images/products/chicken-tenders.jpg",
    items: [
      { it: "1x Piatto a scelta", en: "1x Main of Choice" },
      { it: "1x Contorno", en: "1x Side" },
      { it: "1x Bibita", en: "1x Drink" },
    ],
  },
];
