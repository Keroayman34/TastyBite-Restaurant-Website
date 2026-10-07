import type { Category } from "@/domain/entities";

export const categories: Category[] = [
  {
    id: "cat-pizza",
    name: "Pizza",
    description: "Wood-fired pizzas with fresh ingredients",
    image: "/images/products/margherita-pizza.jpg",
    slug: "pizza",
  },
  {
    id: "cat-burgers",
    name: "Burgers",
    description: "Juicy handcrafted burgers with premium toppings",
    image: "/images/products/classic-burger.jpg",
    slug: "burgers",
  },
  {
    id: "cat-chicken",
    name: "Chicken",
    description: "Crispy and grilled chicken favorites",
    image: "/images/products/crispy-chicken.jpg",
    slug: "chicken",
  },
  {
    id: "cat-pasta",
    name: "Pasta",
    description: "Fresh pasta with rich homemade sauces",
    image: "/images/products/pasta-alfredo.jpg",
    slug: "pasta",
  },
  {
    id: "cat-salads",
    name: "Salads",
    description: "Fresh and healthy salad bowls",
    image: "/images/products/caesar-salad.jpg",
    slug: "salads",
  },
  {
    id: "cat-drinks",
    name: "Drinks",
    description: "Refreshing beverages and shakes",
    image: "/images/products/fresh-lemonade.jpg",
    slug: "drinks",
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    description: "Sweet treats to finish your meal",
    image: "/images/products/chocolate-lava-cake.jpg",
    slug: "desserts",
  },
];
