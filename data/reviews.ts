import type { Review } from "@/domain/entities";

export const reviews: Review[] = [
  {
    id: "rev-1",
    customerName: "Giulia R.",
    rating: 5,
    comment: {
      it: "Il Doppio Cheeseburger è senza dubbio il migliore della zona. Ingredienti freschissimi e pane brioche perfetto!",
      en: "The Double Cheeseburger is hands down the best in town. Fresh ingredients and the brioche bun is perfect!",
    },
    date: "2026-09-12",
    avatar: "/images/avatars/sarah.jpg",
  },
  {
    id: "rev-2",
    customerName: "Marco B.",
    rating: 5,
    comment: {
      it: "Abbiamo ordinato lo Speciale Serata Pizza per tutta la famiglia. Ottimo rapporto qualità-prezzo e la Diavola era strepitosa.",
      en: "Ordered the Pizza Night Deal for the family. Great value and the pepperoni pizza was amazing.",
    },
    date: "2026-09-08",
    avatar: "/images/avatars/james.jpg",
  },
  {
    id: "rev-3",
    customerName: "Elena V.",
    rating: 4,
    comment: {
      it: "Adoro le alette di pollo piccanti e l'insalata Caesar. Consegna veloce e piatti sempre caldi. Consigliatissimo!",
      en: "Love the buffalo wings and Caesar salad. Quick delivery and always hot. Highly recommend!",
    },
    date: "2026-08-30",
    avatar: "/images/avatars/emily.jpg",
  },
  {
    id: "rev-4",
    customerName: "Luca T.",
    rating: 5,
    comment: {
      it: "Il tortino al cioccolato dal cuore caldo è imperdibile. Servizio cordiale e locale impeccabile.",
      en: "The chocolate lava cake is a must-try. Service was friendly and the restaurant was spotless.",
    },
    date: "2026-08-22",
    avatar: "/images/avatars/michael.jpg",
  },
];
