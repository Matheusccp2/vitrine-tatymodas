import { useState, useEffect } from "react";
import { Product } from "@/types";

// Item do carrinho com produto + seleções
export interface CartItem {
  product: Product;
  selectedSizes: string[];
  selectedColors: string[];
  quantity: number;
}

const areSameSelections = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((value) => b.includes(value));
};

const getSelectionQuantity = (sizes: string[], colors: string[]) => {
  return sizes.length * colors.length;
};

type LegacyCartItem = CartItem & {
  selectedSize?: string;
  selectedColor?: string;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega carrinho do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("shopping-cart");
    if (saved) {
      const parsed = JSON.parse(saved) as LegacyCartItem[];

      setCart(
        parsed.map((item) => ({
          ...item,
          selectedSizes: Array.isArray(item.selectedSizes)
            ? item.selectedSizes
            : item.selectedSize
              ? [item.selectedSize]
              : [],
          selectedColors: Array.isArray(item.selectedColors)
            ? item.selectedColors
            : item.selectedColor
              ? [item.selectedColor]
              : [],
        })),
      );
    }
  }, []);

  // Salva carrinho no localStorage
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
  }, [cart]);

  // Adiciona item ao carrinho
  const addToCart = (product: Product, sizes: string[], colors: string[]) => {
    setCart((prev) => {
      const normalizedSizes = [...new Set(sizes)];
      const normalizedColors = [...new Set(colors)];
      const selectionQuantity = getSelectionQuantity(
        normalizedSizes,
        normalizedColors,
      );

      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          areSameSelections(item.selectedSizes, normalizedSizes) &&
          areSameSelections(item.selectedColors, normalizedColors),
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += selectionQuantity;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedSizes: normalizedSizes,
          selectedColors: normalizedColors,
          quantity: selectionQuantity,
        },
      ];
    });
  };

  // Remove item
  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Limpa carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Total de itens
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total em reais
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };
}
