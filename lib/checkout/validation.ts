import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[\d\s+\-()]+$/, "Please enter a valid phone number"),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address must be less than 300 characters"),
  notes: z.string().trim().max(500, "Notes must be less than 500 characters").optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
