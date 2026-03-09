/**
 * Task 13 — Unit Tests: Cart Context Logic
 *
 * Tests for addToCart, removeFromCart, updateQuantity in AppContext.
 * Verifies that cart state is correctly updated for all operations.
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '@/lib/context';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('AppContext — Cart Logic', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('initialises with an empty cart', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.cartItems).toHaveLength(0);
  });

  it('addToCart adds a new item to the cart', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: 'test-1',
        name: 'Test Belt',
        price: 45,
        emoji: '👔',
        size: 'L',
        color: 'Black',
        quantity: 1,
      });
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems.find((i) => i.id === 'test-1')).toBeTruthy();
  });

  it('removeFromCart removes the correct item', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Test Jacket',
        price: 100,
        emoji: '🧥',
        size: 'M',
        color: 'Brown',
        quantity: 1,
      });
    });

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(result.current.cartItems.find((i) => i.id === '1')).toBeUndefined();
    expect(result.current.cartItems).toHaveLength(0);
  });

  it('updateQuantity increases the quantity of an item', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Test Jacket',
        price: 100,
        emoji: '🧥',
        size: 'M',
        color: 'Brown',
        quantity: 1,
      });
    });

    act(() => {
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.cartItems.find((i) => i.id === '1')?.quantity).toBe(5);
  });

  it('updateQuantity removes the item when quantity < 1', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Test Jacket',
        price: 100,
        emoji: '🧥',
        size: 'M',
        color: 'Brown',
        quantity: 1,
      });
    });

    act(() => {
      result.current.updateQuantity('1', 0);
    });

    expect(result.current.cartItems.find((i) => i.id === '1')).toBeUndefined();
  });

  it('cartOpen starts as false', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.cartOpen).toBe(false);
  });

  it('setCartOpen toggles cart open state', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.setCartOpen(true);
    });

    expect(result.current.cartOpen).toBe(true);
  });
});

