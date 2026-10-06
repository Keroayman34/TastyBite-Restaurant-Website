import type { CartRepository } from "@/domain/contracts/cart-repository";
import type { Cart } from "@/domain/entities";
import {
  readStorage,
  writeStorage,
  removeStorage,
} from "@/services/storage/local-storage";
import { getCartStorageKey, serializeCart, deserializeCart } from "@/lib/cart";
import {
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateCartTotal,
} from "@/lib/cart/cart-calculations";
import { restaurant } from "@/config/restaurant";

export function createLocalStorageCartRepository(): CartRepository {
  return {
    load(): Cart | null {
      const key = getCartStorageKey();
      const raw = readStorage<string>(key);
      if (!raw) return null;

      const state = deserializeCart(raw);
      if (!state) return null;

      const subtotal = calculateCartSubtotal(state.items);
      const deliveryFee = calculateDeliveryFee(state.items, restaurant.deliveryFee);
      const total = calculateCartTotal(subtotal, deliveryFee);

      return { items: state.items, subtotal, deliveryFee, total };
    },

    save(cart: Cart): void {
      const key = getCartStorageKey();
      const state = { items: cart.items };
      writeStorage(key, serializeCart(state));
    },

    clear(): void {
      const key = getCartStorageKey();
      removeStorage(key);
    },
  };
}
