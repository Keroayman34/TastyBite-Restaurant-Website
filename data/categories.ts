import type { Category } from "@/domain/entities";

export const categories: Category[] = [
  {
    id: "cat-burgers",
    name: "Burgers",
    description: "Juicy handcrafted burgers with premium toppings",
    image: "/images/categories/burgers.jpg",
    slug: "burgers",
  },
  {
    id: "cat-pizza",
    name: "Pizza",
    description: "Wood-fired pizzas with fresh ingredients",
    image: "/images/categories/pizza.jpg",
    slug: "pizza",
  },
  {
    id: "cat-sandwiches",
    name: "Sandwiches",
    description: "Toasted sandwiches made to order",
    image: "/images/categories/sandwiches.jpg",
    slug: "sandwiches",
  },
  {
    id: "cat-appetizers",
    name: "Appetizers",
    description: "Perfect starters to share or enjoy solo",
    image: "/images/categories/appetizers.jpg",
    slug: "appetizers",
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    description: "Sweet treats to finish your meal",
    image: "/images/categories/desserts.jpg",
    slug: "desserts",
  },
  {
    id: "cat-beverages",
    name: "Beverages",
    description: "Refreshing drinks and shakes",
    image: "/images/categories/beverages.jpg",
    slug: "beverages",
  },
];
