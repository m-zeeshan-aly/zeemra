'use client';

import { useApp } from '@/lib/context';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems } = useApp();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${cartOpen ? 'open' : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3 className="cart-title">Your Cart ({cartItems.length})</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">{item.emoji}</div>
              <div>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-meta">
                  {item.size && `Size: ${item.size} `}
                  {item.size && item.color && `· `}
                  {item.color}
                </p>
                <div className="cart-item-qty">
                  <button className="qty-btn">−</button>
                  <span className="qty-num">1</span>
                  <button className="qty-btn">+</button>
                </div>
              </div>
              <div>
                <p className="cart-item-price">€{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal">
            <span className="cart-subtotal-label">Subtotal</span>
            <span className="cart-subtotal-value">€{subtotal}</span>
          </div>
          <p className="cart-note">Shipping to Europe included · VAT calculated at checkout</p>
          <button className="btn-checkout">Proceed to Checkout</button>
          <button className="btn-continue" onClick={() => setCartOpen(false)}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
