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
  wishedItems: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishedItems, setWishedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Heritage Biker Jacket',
      price: 289,
      emoji: '🧥',
      size: 'M',
      color: 'Cognac Brown',
      quantity: 1,
    },
    {
      id: '2',
      name: 'Slim Bifold Wallet',
      price: 65,
      emoji: '👛',
      color: 'Dark Brown',
      quantity: 1,
    },
  ]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('zeemra_wishlist');
      if (stored) {
        setWishedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

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

    const exists = cartItems.find((ci) => ci.id === item.id);
    if (exists) {
      updateQuantity(item.id, exists.quantity + (item.quantity || 1));
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: quantity } : item
    ));
  };

  return (
    <AppContext.Provider value={{ cartOpen, setCartOpen, cartItems, addToCart, removeFromCart, updateQuantity, wishedItems, addToWishlist, removeFromWishlist }}>
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
