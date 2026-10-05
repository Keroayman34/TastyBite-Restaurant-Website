import type { Category } from "@/domain/entities";

export const categories: Category[] = [
  {
    id: "cat-pizza",
    name: "Pizza",
    description: "Wood-fired pizzas with fresh ingredients",
    image: "/images/categories/pizza.jpg",
    slug: "pizza",
  },
  {
    id: "cat-burgers",
    name: "Burgers",
    description: "Juicy handcrafted burgers with premium toppings",
    image: "/images/categories/burgers.jpg",
    slug: "burgers",
  },
  {
    id: "cat-chicken",
    name: "Chicken",
    description: "Crispy and grilled chicken favorites",
    image: "/images/categories/chicken.jpg",
    slug: "chicken",
  },
  {
    id: "cat-pasta",
    name: "Pasta",
    description: "Fresh pasta with rich homemade sauces",
    image: "/images/categories/pasta.jpg",
    slug: "pasta",
  },
  {
    id: "cat-salads",
    name: "Salads",
    description: "Fresh and healthy salad bowls",
    image: "/images/categories/salads.jpg",
    slug: "salads",
  },
  {
    id: "cat-drinks",
    name: "Drinks",
    description: "Refreshing beverages and shakes",
    image: "/images/categories/drinks.jpg",
    slug: "drinks",
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    description: "Sweet treats to finish your meal",
    image: "/images/categories/desserts.jpg",
    slug: "desserts",
  },
];
