'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import './Navbar.css';
import CartDrawer from '../product/CartDrawer';

export default function Navbar() {
  const { cartOpen, setCartOpen, cartItems } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo">
          ZEEM<span>R</span>A
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/men">Men</Link>
            <div className="mega-menu">
              <span className="mega-col-title">Shop Men&apos;s Collection</span>
              <Link href="/men?cat=jackets" className="mega-item">
                <div className="mega-item-icon">🧥</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Leather Jackets</span>
                  <span className="mega-item-count">24 products</span>
                </div>
              </Link>
              <Link href="/men?cat=wallets" className="mega-item">
                <div className="mega-item-icon">👛</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Wallets</span>
                  <span className="mega-item-count">18 products</span>
                </div>
              </Link>
              <Link href="/men?cat=belts" className="mega-item">
                <div className="mega-item-icon">👔</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Belts</span>
                  <span className="mega-item-count">12 products</span>
                </div>
              </Link>
              <Link href="/men?cat=shoes" className="mega-item">
                <div className="mega-item-icon">👞</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Shoes</span>
                  <span className="mega-item-count">20 products</span>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <Link href="/women">Women</Link>
            <div className="mega-menu">
              <span className="mega-col-title">Shop Women&apos;s Collection</span>
              <Link href="/women?cat=bags" className="mega-item">
                <div className="mega-item-icon">👜</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Leather Bags</span>
                  <span className="mega-item-count">28 products</span>
                </div>
              </Link>
              <Link href="/women?cat=jackets" className="mega-item">
                <div className="mega-item-icon">🧥</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Leather Jackets</span>
                  <span className="mega-item-count">16 products</span>
                </div>
              </Link>
              <Link href="/women?cat=wallets" className="mega-item">
                <div className="mega-item-icon">💼</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Wallets & Purses</span>
                  <span className="mega-item-count">22 products</span>
                </div>
              </Link>
              <Link href="/women?cat=shoes" className="mega-item">
                <div className="mega-item-icon">👠</div>
                <div className="mega-item-text">
                  <span className="mega-item-name">Shoes</span>
                  <span className="mega-item-count">19 products</span>
                </div>
              </Link>
            </div>
          </li>

          <li><Link href="/">Collections</Link></li>
          <li><Link href="/">Our Story</Link></li>
          <li><Link href="/">Sialkot Craft</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="nav-icon-btn" title="Search">🔍</button>
          <button className="nav-icon-btn">♡</button>
          <button className="nav-icon-btn" onClick={() => setCartOpen(!cartOpen)}>
            🛍
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </button>
          <button 
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <CartDrawer />
    </>
  );
}
