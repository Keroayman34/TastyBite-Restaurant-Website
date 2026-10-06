"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/lib/checkout/validation";
import { Input } from "@/components/ui/Input";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <h2 className="text-h3 text-foreground">Customer Information</h2>

      <Input
        label="Full Name"
        {...register("fullName")}
        error={errors.fullName?.message}
        autoComplete="name"
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        {...register("phone")}
        error={errors.phone?.message}
        autoComplete="tel"
        required
      />

      <Input
        label="Address"
        {...register("address")}
        error={errors.address?.message}
        autoComplete="street-address"
        required
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className="text-label text-foreground-muted">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={3}
          maxLength={500}
          className="w-full rounded-input border border-border bg-surface px-4 py-3 text-body text-foreground transition-colors placeholder:text-foreground-subtle hover:border-border-strong focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          placeholder="Any special instructions..."
        />
        {errors.notes ? (
          <p className="text-body-sm text-error-600">{errors.notes.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-button bg-primary-500 px-8 text-body-lg font-semibold text-white shadow-cta transition-colors hover:bg-primary-600 active:bg-primary-700 disabled:pointer-events-none disabled:opacity-50"
      >
        Confirm Order via WhatsApp
      </button>
    </form>
  );
}
