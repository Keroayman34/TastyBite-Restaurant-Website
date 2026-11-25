import type { Category } from "@/domain/entities";

export const categories: Category[] = [
  {
    id: "cat-pizza",
    name: { it: "Pizze", en: "Pizza" },
    description: {
      it: "Pizze cotte nel forno a legna con ingredienti freschi",
      en: "Wood-fired pizzas with fresh ingredients",
    },
    image: "/images/products/margherita-pizza.jpg",
    slug: "pizza",
  },
  {
    id: "cat-burgers",
    name: { it: "Burger", en: "Burgers" },
    description: {
      it: "Hamburger artigianali succosi con ingredienti selezionati",
      en: "Juicy handcrafted burgers with premium toppings",
    },
    image: "/images/products/classic-burger.jpg",
    slug: "burgers",
  },
  {
    id: "cat-chicken",
    name: { it: "Pollo", en: "Chicken" },
    description: {
      it: "Specialità di pollo croccante e alla griglia",
      en: "Crispy and grilled chicken favorites",
    },
    image: "/images/products/crispy-chicken.jpg",
    slug: "chicken",
  },
  {
    id: "cat-pasta",
    name: { it: "Pasta", en: "Pasta" },
    description: {
      it: "Pasta fresca con sughi tradizionali fatti in casa",
      en: "Fresh pasta with rich homemade sauces",
    },
    image: "/images/products/pasta-alfredo.jpg",
    slug: "pasta",
  },
  {
    id: "cat-salads",
    name: { it: "Insalate", en: "Salads" },
    description: {
      it: "Insalatone fresche, leggere e bilanciate",
      en: "Fresh and healthy salad bowls",
    },
    image: "/images/products/caesar-salad.jpg",
    slug: "salads",
  },
  {
    id: "cat-drinks",
    name: { it: "Bevande", en: "Drinks" },
    description: {
      it: "Bevande fresche, frullati e cioccolata calda",
      en: "Refreshing beverages, smoothies, and hot drinks",
    },
    image: "/images/products/fresh-lemonade.jpg",
    slug: "drinks",
  },
  {
    id: "cat-desserts",
    name: { it: "Dolci", en: "Desserts" },
    description: {
      it: "Dolci artigianali per concludere il pasto in dolcezza",
      en: "Sweet treats to finish your meal",
    },
    image: "/images/products/chocolate-lava-cake.jpg",
    slug: "desserts",
  },
];
