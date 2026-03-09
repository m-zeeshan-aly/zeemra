'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useApp } from '@/lib/context';
import styles from './page.module.css';

function formatMoneyEUR(value: number) {
  const safe = Number.isFinite(value) ? value : 0;
  return `€${safe.toFixed(0)}`;
}

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, setCartOpen } = useApp();

  const { subtotal, totalQuantity } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, totalQuantity };
  }, [cartItems]);

  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 14;
  const total = subtotal + shipping;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.current}>Cart</span>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Your Cart</h1>
          <p className={styles.count}>{totalQuantity} item{totalQuantity === 1 ? '' : 's'}</p>
        </div>
        <p className={styles.subtitle}>
          Crafted pieces, held for you — adjust quantities, then proceed when ready.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.itemsCol}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛍</div>
              <h2 className={styles.emptyTitle}>Your cart is empty</h2>
              <p className={styles.emptyText}>
                Explore our collections and add something you’ll keep for years.
              </p>
              <div className={styles.emptyActions}>
                <Link className={styles.primaryBtn} href="/shop">Shop Collections</Link>
                <Link className={styles.secondaryBtn} href="/women">Shop Women</Link>
                <Link className={styles.secondaryBtn} href="/men">Shop Men</Link>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.listHeader}>
                <span className={styles.listTitle}>Items</span>
                <button className={styles.linkBtn} type="button" onClick={clearCart}>
                  Clear cart
                </button>
              </div>

              <div className={styles.list}>
                {cartItems.map((item) => (
                  <article key={item.id} className={styles.item}>
                    <div className={styles.thumb} aria-hidden="true">{item.emoji}</div>

                    <div className={styles.itemMain}>
                      <div className={styles.itemTopRow}>
                        <div>
                          <p className={styles.itemName}>{item.name}</p>
                          <p className={styles.itemMeta}>
                            {item.size ? `Size: ${item.size}` : null}
                            {item.size && item.color ? <span className={styles.dot}>·</span> : null}
                            {item.color || null}
                          </p>
                        </div>
                        <div className={styles.itemPrice}>{formatMoneyEUR(item.price * item.quantity)}</div>
                      </div>

                      <div className={styles.itemBottomRow}>
                        <div className={styles.qty}>
                          <button
                            className={styles.qtyBtn}
                            type="button"
                            aria-label={`Decrease quantity for ${item.name}`}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className={styles.qtyNum} aria-label={`Quantity ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.qtyBtn}
                            type="button"
                            aria-label={`Increase quantity for ${item.name}`}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className={styles.removeBtn}
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className={styles.summaryCol} aria-label="Order summary">
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.row}>
                <span className={styles.label}>Subtotal</span>
                <span className={styles.value}>{formatMoneyEUR(subtotal)}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>
                  Shipping <span className={styles.muted}>(free over {formatMoneyEUR(freeShippingThreshold)})</span>
                </span>
                <span className={styles.value}>{shipping === 0 ? 'Free' : formatMoneyEUR(shipping)}</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.row} ${styles.totalRow}`}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{formatMoneyEUR(total)}</span>
              </div>
            </div>

            <p className={styles.note}>
              VAT calculated at checkout · Secure payment · Ships from Sialkot to Europe
            </p>

            <button
              className={styles.checkoutBtn}
              type="button"
              disabled={cartItems.length === 0}
              aria-disabled={cartItems.length === 0}
              title={cartItems.length === 0 ? 'Add items to proceed' : 'Proceed to checkout'}
              onClick={() => {
                // Placeholder for checkout flow
                setCartOpen(false);
              }}
            >
              Proceed to Checkout
            </button>

            <Link className={styles.continueBtn} href="/shop">
              Continue Shopping
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

