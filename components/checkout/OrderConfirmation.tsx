"use client";

import { CheckCircle2, MessageCircle, UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePreferences } from "@/components/preferences/PreferencesContext";

export interface OrderConfirmationData {
  customerName: string;
  itemCount: number;
  total: number;
  whatsappUrl: string;
}

export interface OrderConfirmationProps {
  order: OrderConfirmationData;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  const { t, formatPrice } = usePreferences();

  return (
    <div
      className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center"
      data-testid="order-confirmation"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600 ring-8 ring-success-50/50">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h2 className="text-h2 font-bold text-foreground">{t.confirmation.title}</h2>
        <p className="text-body text-foreground-muted">
          {t.confirmation.thankYouPrefix}{" "}
          <span className="font-semibold text-foreground">{order.customerName}</span>.{" "}
          {t.confirmation.thankYouSuffix}
        </p>
      </div>

      <Card padding="lg" className="w-full text-left">
        <h3 className="mb-4 text-h4 font-semibold text-foreground">
          {t.confirmation.summaryTitle}
        </h3>
        <dl className="flex flex-col divide-y divide-border text-body-sm">
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-foreground-muted">{t.confirmation.customerName}</dt>
            <dd className="font-medium text-foreground">{order.customerName}</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-foreground-muted">{t.confirmation.totalItems}</dt>
            <dd className="font-medium text-foreground">
              {order.itemCount}{" "}
              {order.itemCount === 1
                ? t.confirmation.itemSingular
                : t.confirmation.itemPlural}
            </dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-foreground-muted">{t.confirmation.orderTotal}</dt>
            <dd className="text-body font-bold text-primary-600">
              {formatPrice(order.total)}
            </dd>
          </div>
        </dl>
      </Card>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={order.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-button bg-primary-500 px-6 text-button font-semibold text-white shadow-cta transition-colors hover:bg-primary-600 active:bg-primary-700"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {t.confirmation.openWhatsAppAgain}
        </a>
        <Button href="/menu" variant="outline">
          <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
          {t.confirmation.backToMenu}
        </Button>
      </div>

      <p className="text-caption text-foreground-subtle">{t.confirmation.fallbackNote}</p>
    </div>
  );
}
