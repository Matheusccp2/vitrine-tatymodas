import { useState, useEffect } from 'react';
import { Product } from '@/types';

// Item do carrinho com produto + seleções
export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega carrinho do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shopping-cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Salva carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  // Adiciona item ao carrinho
  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      // Verifica se já existe
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex >= 0) {
        // Incrementa quantidade
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      // Adiciona novo
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
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
    0
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