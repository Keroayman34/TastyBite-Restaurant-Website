import type { Location } from "@/domain/entities";

export const locations: Location[] = [
  {
    id: "loc-downtown",
    name: {
      it: "TastyBite Roma Centro",
      en: "TastyBite Rome Center",
    },
    address: {
      it: "Via del Corso 123, 00186 Roma RM, Italia",
      en: "Via del Corso 123, 00186 Rome, Italy",
    },
    phone: "+39 06 1234 5678",
    workingHours: {
      it: "Lun-Ven: 11:00 - 23:00 | Sab-Dom: 11:30 - 24:00",
      en: "Mon-Fri: 11:00 AM - 11:00 PM | Sat-Sun: 11:30 AM - 12:00 AM",
    },
    mapUrl: "https://maps.google.com/?q=Via+del+Corso+123+Roma+Italia",
  },
  {
    id: "loc-riverside",
    name: {
      it: "TastyBite Milano Navigli",
      en: "TastyBite Milan Navigli",
    },
    address: {
      it: "Alzaia Naviglio Grande 48, 20144 Milano MI, Italia",
      en: "Alzaia Naviglio Grande 48, 20144 Milan, Italy",
    },
    phone: "+39 02 9876 5432",
    workingHours: {
      it: "Lun-Dom: 11:30 - 24:00",
      en: "Mon-Sun: 11:30 AM - 12:00 AM",
    },
    mapUrl: "https://maps.google.com/?q=Alzaia+Naviglio+Grande+48+Milano+Italia",
  },
];
