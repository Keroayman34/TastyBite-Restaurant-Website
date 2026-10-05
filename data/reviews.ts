import type { Review } from "@/domain/entities";

export const reviews: Review[] = [
  {
    id: "rev-1",
    customerName: "Sarah M.",
    rating: 5,
    comment:
      "The Classic Cheeseburger is hands down the best in town. Fresh ingredients and the brioche bun is perfect!",
    date: "2026-09-12",
    avatar: "/images/avatars/sarah.jpg",
  },
  {
    id: "rev-2",
    customerName: "James K.",
    rating: 5,
    comment:
      "Ordered the Pizza Night Deal for the family. Great value and the pepperoni pizza was amazing.",
    date: "2026-09-08",
    avatar: "/images/avatars/james.jpg",
  },
  {
    id: "rev-3",
    customerName: "Emily R.",
    rating: 4,
    comment:
      "Love the loaded fries and the buffalo wings. Quick delivery and always hot. Highly recommend!",
    date: "2026-08-30",
    avatar: "/images/avatars/emily.jpg",
  },
  {
    id: "rev-4",
    customerName: "Michael T.",
    rating: 5,
    comment:
      "The chocolate lava cake is a must-try. Service was friendly and the restaurant was spotless.",
    date: "2026-08-22",
    avatar: "/images/avatars/michael.jpg",
  },
];
