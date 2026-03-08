'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import CartDrawer from '../product/CartDrawer';
import './Navbar.css';

/**
 * Navbar is the main fixed navigation bar for the ZEEMRA application.
 * Includes the brand logo, mega-menu navigation, search bar, wishlist, and cart icon.
 * Collapses announcement bar offset on scroll; shows mobile hamburger below 1024px.
 *
 * @component
 * @example
 * <Navbar />
 *
 * @returns {JSX.Element} Sticky navigation bar with CartDrawer and search bar
 */
export default function Navbar() {
  const { cartOpen, setCartOpen, cartItems } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementHidden, setAnnouncementHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When announcement bar is hidden (scrolled down more than 50px), navbar moves up
      if (window.scrollY > 50) {
        setAnnouncementHidden(true);
      } else {
        setAnnouncementHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${announcementHidden ? 'compact' : ''}`} aria-label="Main navigation">
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
          <button 
            className="nav-icon-btn" 
            title="Search"
            aria-label="Open search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            🔍
          </button>
          <button className="nav-icon-btn" aria-label="View wishlist">♡</button>
          <button 
            className="nav-icon-btn" 
            aria-label={`Open cart${cartItems.length > 0 ? `, ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}` : ''}`}
            onClick={() => setCartOpen(!cartOpen)}
          >
            🛍
            {cartItems.length > 0 && (
              <span className="cart-badge" aria-hidden="true">{cartItems.length}</span>
            )}
          </button>
          <button 
            className="hamburger"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div className="search-bar" role="search">
          <label htmlFor="nav-search-input" className="sr-only">Search products</label>
          <input
            id="nav-search-input"
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="search-input"
            aria-label="Search products"
          />
          <button 
            className="search-close"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            ✕
          </button>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
