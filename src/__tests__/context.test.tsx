/**
 * Task 13 — Unit Tests: Cart Context Logic
 *
 * Tests for addToCart, removeFromCart, updateQuantity in AppContext.
 * Verifies that cart state is correctly updated for all operations.
 */

import React from 'react';
import { render, act} from '@testing-library/react';
import { AppProvider, useApp } from '@/lib/context';

// Helper test component that exposes context for testing
function TestHarness({ onMount }: { onMount: (ctx: ReturnType<typeof useApp>) => void }) {
  const ctx = useApp();
  React.useEffect(() => {
    onMount(ctx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div data-testid="harness">{ctx.cartItems.length}</div>;
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('AppContext — Cart Logic', () => {
  it('initialises with 2 default cart items', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);
    expect(ctx.cartItems).toHaveLength(2);
  });

  it('addToCart adds a new item to the cart', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);

    act(() => {
      ctx.addToCart({
        id: 'test-1',
        name: 'Test Belt',
        price: 45,
        emoji: '👔',
        size: 'L',
        color: 'Black',
        quantity: 1,
      });
    });

    expect(ctx.cartItems).toHaveLength(3);
    expect(ctx.cartItems.find((i) => i.id === 'test-1')).toBeTruthy();
  });

  it('removeFromCart removes the correct item', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);

    act(() => {
      ctx.removeFromCart('1');
    });

    expect(ctx.cartItems.find((i) => i.id === '1')).toBeUndefined();
    expect(ctx.cartItems).toHaveLength(1);
  });

  it('updateQuantity increases the quantity of an item', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);

    act(() => {
      ctx.updateQuantity('1', 5);
    });

    expect(ctx.cartItems.find((i) => i.id === '1')?.quantity).toBe(5);
  });

  it('updateQuantity does nothing when quantity < 1', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);

    act(() => {
      ctx.updateQuantity('1', 0); // Should be rejected
    });

    // Quantity should remain 1 (original default)
    expect(ctx.cartItems.find((i) => i.id === '1')?.quantity).toBe(1);
  });

  it('cartOpen starts as false', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);
    expect(ctx.cartOpen).toBe(false);
  });

  it('setCartOpen toggles cart open state', () => {
    let ctx!: ReturnType<typeof useApp>;
    renderWithProvider(<TestHarness onMount={(c) => { ctx = c; }} />);

    act(() => {
      ctx.setCartOpen(true);
    });

    expect(ctx.cartOpen).toBe(true);
  });
});
