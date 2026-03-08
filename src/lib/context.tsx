'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  size?: string;
  color?: string;
  quantity?: number;
}

interface AppContextType {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
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

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
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
    <AppContext.Provider value={{ cartOpen, setCartOpen, cartItems, addToCart, removeFromCart, updateQuantity }}>
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
