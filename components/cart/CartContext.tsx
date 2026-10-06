"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { cartReducer } from "@/lib/cart/cart-reducer";
import { initialCartState } from "@/lib/cart/types";
import type { CartItem } from "@/domain/entities";
import { createLocalStorageCartRepository } from "@/services/cart/local-storage-cart-repository";
import {
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateCartTotal,
  calculateItemCount,
} from "@/lib/cart/cart-calculations";
import { restaurant } from "@/config/restaurant";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const repository = createLocalStorageCartRepository();

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    const cart = repository.load();
    if (cart) {
      dispatch({ type: "HYDRATE", state: { items: cart.items } });
    }
  }, []);

  useEffect(() => {
    const subtotal = calculateCartSubtotal(state.items);
    const deliveryFee = calculateDeliveryFee(state.items, restaurant.deliveryFee);
    const total = calculateCartTotal(subtotal, deliveryFee);
    repository.save({ items: state.items, subtotal, deliveryFee, total });
  }, [state.items]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", item });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", itemId });
  }, []);

  const incrementItem = useCallback((itemId: string) => {
    dispatch({ type: "INCREMENT_ITEM", itemId });
  }, []);

  const decrementItem = useCallback((itemId: string) => {
    dispatch({ type: "DECREMENT_ITEM", itemId });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", itemId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    repository.clear();
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = calculateCartSubtotal(state.items);
    const deliveryFee = calculateDeliveryFee(state.items, restaurant.deliveryFee);
    const total = calculateCartTotal(subtotal, deliveryFee);
    const itemCount = calculateItemCount(state.items);

    return {
      items: state.items,
      itemCount,
      subtotal,
      deliveryFee,
      total,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      updateQuantity,
      clearCart,
    };
  }, [
    state.items,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    updateQuantity,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
