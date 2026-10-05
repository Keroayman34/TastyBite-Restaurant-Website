import type { Cart } from "../entities";

export interface CartRepository {
  load(): Cart | null;
  save(cart: Cart): void;
  clear(): void;
}
