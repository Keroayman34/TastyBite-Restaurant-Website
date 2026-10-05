import type { Location } from "@/domain/entities";

export const locations: Location[] = [
  {
    id: "loc-downtown",
    name: "TastyBite Downtown",
    address: "123 Flavor Street, Foodville, FV 12345",
    phone: "+1 (555) 123-4567",
    workingHours: "Mon-Fri: 10:00 AM - 11:00 PM",
    mapUrl: "https://maps.google.com/?q=123+Flavor+Street+Foodville",
  },
  {
    id: "loc-riverside",
    name: "TastyBite Riverside",
    address: "456 Riverside Avenue, Foodville, FV 67890",
    phone: "+1 (555) 987-6543",
    workingHours: "Mon-Sun: 11:00 AM - 12:00 AM",
    mapUrl: "https://maps.google.com/?q=456+Riverside+Avenue+Foodville",
  },
];
