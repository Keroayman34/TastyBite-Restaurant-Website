"use client";

import { useState, useMemo, useCallback } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { SizeSelector } from "@/components/product/SizeSelector";
import { CrustSelector } from "@/components/product/CrustSelector";
import { ExtrasSelector } from "@/components/product/ExtrasSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartContext";
import { calculateProductPrice, findOption, MIN_QUANTITY } from "@/lib/menu/pricing";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import type { Product, ProductOptionChoice, CartItem } from "@/domain/entities";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const sizeOption = findOption(product, "opt-size");
  const crustOption = findOption(product, "opt-crust");
  const extrasOption = findOption(product, "opt-extras");

  const [selectedSize, setSelectedSize] = useState<ProductOptionChoice | null>(
    sizeOption?.choices[0] ?? null,
  );
  const [selectedCrust, setSelectedCrust] = useState<ProductOptionChoice | null>(
    crustOption?.choices[0] ?? null,
  );
  const [selectedExtras, setSelectedExtras] = useState<ProductOptionChoice[]>([]);
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [added, setAdded] = useState(false);

  const pricing = useMemo(
    () =>
      calculateProductPrice({
        basePrice: product.basePrice,
        sizeChoice: selectedSize,
        crustChoice: selectedCrust,
        extraChoices: selectedExtras,
        quantity,
      }),
    [product.basePrice, selectedSize, selectedCrust, selectedExtras, quantity],
  );

  const toggleExtra = useCallback((choice: ProductOptionChoice) => {
    setSelectedExtras((prev) =>
      prev.some((c) => c.id === choice.id)
        ? prev.filter((c) => c.id !== choice.id)
        : [...prev, choice],
    );
  }, []);

  const handleAddToCart = useCallback(() => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: pricing.quantity,
      selectedOptions: [
        ...(selectedSize && sizeOption
          ? [
              {
                optionId: sizeOption.id,
                optionName: sizeOption.name,
                choices: [selectedSize],
              },
            ]
          : []),
        ...(selectedCrust && crustOption
          ? [
              {
                optionId: crustOption.id,
                optionName: crustOption.name,
                choices: [selectedCrust],
              },
            ]
          : []),
        ...(selectedExtras.length > 0 && extrasOption
          ? [
              {
                optionId: extrasOption.id,
                optionName: extrasOption.name,
                choices: selectedExtras,
              },
            ]
          : []),
      ],
      unitPrice: pricing.unitPrice,
      subtotal: pricing.subtotal,
    };

    addItem(cartItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [
    product,
    pricing,
    selectedSize,
    selectedCrust,
    selectedExtras,
    sizeOption,
    crustOption,
    extrasOption,
    addItem,
  ]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGallery product={product} />

      <div className="flex flex-col gap-6">
        <ProductInfo product={product} price={pricing.unitPrice} />

        <div className="flex flex-col gap-5 border-t border-border pt-6">
          {sizeOption ? (
            <SizeSelector
              option={sizeOption}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          ) : null}

          {crustOption ? (
            <CrustSelector
              option={crustOption}
              selected={selectedCrust}
              onSelect={setSelectedCrust}
            />
          ) : null}

          {extrasOption ? (
            <ExtrasSelector
              option={extrasOption}
              selected={selectedExtras}
              onToggle={toggleExtra}
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <QuantitySelector quantity={quantity} onChange={setQuantity} />

          <div className="flex flex-col gap-1">
            <span className="text-caption text-foreground-subtle">Subtotal</span>
            <span className="text-h3 font-bold text-foreground">
              {formatPrice(pricing.subtotal, restaurant.currency)}
            </span>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.available}
          className="w-full sm:w-auto"
          variant={added ? "secondary" : "primary"}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart — {formatPrice(pricing.subtotal, restaurant.currency)}
            </>
          )}
        </Button>

        {!product.available ? (
          <p className="text-body-sm text-error-600">
            This product is currently unavailable.
          </p>
        ) : null}
      </div>
    </div>
  );
}
