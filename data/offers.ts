import type { Offer } from "@/domain/entities";

export const offers: Offer[] = [
  {
    id: "offer-family-burger-bundle",
    title: "Family Burger Bundle",
    description:
      "Four classic cheeseburgers, two loaded fries, and a 2-liter drink. The perfect feast for the whole family.",
    originalPrice: 59.99,
    discountedPrice: 44.99,
    image: "/images/products/classic-burger.jpg",
    items: ["4x Classic Cheeseburger", "2x Loaded Cheese Fries", "1x 2L Drink of Choice"],
  },
  {
    id: "offer-pizza-night",
    title: "Pizza Night Deal",
    description:
      "Two large pizzas of your choice plus a dessert. Pizza night just got better.",
    originalPrice: 38.99,
    discountedPrice: 29.99,
    image: "/images/products/pepperoni-pizza.jpg",
    items: ["2x Large Pizza", "1x Chocolate Lava Cake"],
  },
  {
    id: "offer-lunch-combo",
    title: "Lunch Combo",
    description:
      "Any sandwich, a side, and a drink. Available weekdays from 11 AM to 3 PM.",
    originalPrice: 18.99,
    discountedPrice: 13.99,
    image: "/images/products/chicken-tenders.jpg",
    items: ["1x Sandwich of Choice", "1x Side", "1x Drink"],
  },
];
