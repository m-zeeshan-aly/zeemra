'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItemSchema } from './schemas';

interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface AppContextType {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  wishedItems: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishedItems, setWishedItems] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('zeemra_wishlist');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('zeemra_cart');
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];

      const valid: CartItem[] = [];
      for (const maybeItem of parsed) {
        const res = CartItemSchema.safeParse(maybeItem);
        if (!res.success) continue;
        const quantity = typeof maybeItem?.quantity === 'number' ? maybeItem.quantity : 1;
        if (!Number.isFinite(quantity) || quantity < 1) continue;
        valid.push({ ...res.data, quantity });
      }
      return valid;
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('zeemra_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToWishlist = (id: string) => {
    setWishedItems((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      window.localStorage.setItem('zeemra_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishedItems((prev) => {
      const updated = prev.filter(item => item !== id);
      window.localStorage.setItem('zeemra_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    try {
      CartItemSchema.parse(item);
    } catch (e) {
      console.error('Invalid cart item structure', e);
      return;
    }

    setCartItems((prev) => {
      const exists = prev.find((ci) => ci.id === item.id);
      const addQty = item.quantity && item.quantity > 0 ? item.quantity : 1;
      if (exists) {
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + addQty } : ci
        );
      }
      return [...prev, { ...item, quantity: addQty }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider value={{ cartOpen, setCartOpen, cartItems, addToCart, removeFromCart, updateQuantity, clearCart, wishedItems, addToWishlist, removeFromWishlist }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
