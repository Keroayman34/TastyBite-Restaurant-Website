import { z } from "zod";
import { getDictionary, type TranslationDictionary } from "@/lib/i18n";

export function createCheckoutSchema(t: TranslationDictionary) {
  const v = t.checkout.validation;
  return z.object({
    fullName: z.string().trim().min(2, v.fullNameMin).max(100, v.fullNameMax),
    phone: z
      .string()
      .trim()
      .min(7, v.phoneMin)
      .max(20, v.phoneMax)
      .regex(/^[\d\s+\-()]+$/, v.phoneInvalid),
    address: z.string().trim().min(5, v.addressMin).max(300, v.addressMax),
    notes: z.string().trim().max(500, v.notesMax).optional(),
  });
}

export const checkoutSchema = createCheckoutSchema(getDictionary("en"));

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
