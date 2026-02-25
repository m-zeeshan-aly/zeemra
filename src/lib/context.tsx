'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  size?: string;
  color?: string;
}

interface AppContextType {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
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
    },
    {
      id: '2',
      name: 'Slim Bifold Wallet',
      price: 65,
      emoji: '👛',
      color: 'Dark Brown',
    },
  ]);

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ cartOpen, setCartOpen, cartItems, addToCart, removeFromCart }}>
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
