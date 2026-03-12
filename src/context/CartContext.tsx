// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Cake, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addItem: (cake: Cake) => void;
  removeItem: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add a cake (or increase quantity if it's already in the cart)
  const addItem = (cake: Cake) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.cake.id === cake.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.cake.id === cake.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { cake, quantity: 1 }];
    });
    setIsCartOpen(true); // Automatically slide open the cart when they add something!
  };

  const removeItem = (cakeId: string) => {
    setItems(currentItems => currentItems.filter(item => item.cake.id !== cakeId));
  };

  const updateQuantity = (cakeId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(cakeId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.cake.id === cakeId ? { ...item, quantity } : item
      )
    );
  };

  // Automatically calculate totals whenever the items array changes
  const cartCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const cartTotal = useMemo(() => items.reduce((total, item) => total + (item.cake.price * item.quantity), 0), [items]);

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      setIsCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};