import type { LocalizedField } from "./i18n";

export interface Location {
  id: string;
  name: LocalizedField;
  address: LocalizedField;
  phone: string;
  workingHours: LocalizedField;
  mapUrl: string;
}
