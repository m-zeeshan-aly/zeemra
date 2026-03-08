'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';
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
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementHidden, setAnnouncementHidden] = useState(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        if (window.scrollY > 50) {
          setAnnouncementHidden(true);
        } else {
          setAnnouncementHidden(false);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
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

          <li><Link href="/shop">Collections</Link></li>
          <li><Link href="/about">Our Story</Link></li>
          <li><Link href="/sialkot">Sialkot Craft</Link></li>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const sanitized = DOMPurify.sanitize(e.target.value, { ALLOWED_TAGS: [] });
              setSearchQuery(sanitized);
            }}
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

      {/* Mobile Menu Drawer */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div 
          className="mobile-drawer" 
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mob-header">
            <span className="mob-logo">ZEEM<span>R</span>A</span>
            <button 
              className="mob-close" 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              ✕
            </button>
          </div>

          <div className="mob-search">
            <div className="mob-search-wrap">
              <span style={{color:'var(--oak)', fontSize:'0.85rem'}}>🔍</span>
              <input 
                type="text" 
                placeholder="Search leather jackets, wallets…" 
                value={searchQuery}
                onChange={(e) => {
                  const sanitized = DOMPurify.sanitize(e.target.value, { ALLOWED_TAGS: [] });
                  setSearchQuery(sanitized);
                }}
              />
            </div>
          </div>

          <p className="mob-section-title">Shop</p>

          {/* Men accordion */}
          <div className={`mob-category ${mobileMenOpen ? 'open' : ''}`}>
            <button 
              className="mob-cat-header" 
              onClick={() => setMobileMenOpen(!mobileMenOpen)}
              aria-expanded={mobileMenOpen}
            >
              <span className="mob-cat-label"><span aria-hidden="true">👔</span> Men</span>
              <span className="mob-cat-arrow">›</span>
            </button>
            <div className="mob-cat-body">
              <Link href="/men?cat=jackets" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                🧥 &nbsp; Leather Jackets
              </Link>
              <Link href="/men?cat=wallets" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                👛 &nbsp; Wallets
              </Link>
              <Link href="/men?cat=belts" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                👔 &nbsp; Belts
              </Link>
              <Link href="/men?cat=shoes" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                👞 &nbsp; Shoes
              </Link>
              <Link href="/men" className="mob-sub-link" style={{color:'var(--brass)'}} onClick={() => setMobileMenuOpen(false)}>
                View All Men →
              </Link>
            </div>
          </div>

          {/* Women accordion */}
          <div className={`mob-category ${mobileWomenOpen ? 'open' : ''}`}>
            <button 
              className="mob-cat-header" 
              onClick={() => setMobileWomenOpen(!mobileWomenOpen)}
              aria-expanded={mobileWomenOpen}
            >
              <span className="mob-cat-label"><span aria-hidden="true">👜</span> Women</span>
              <span className="mob-cat-arrow">›</span>
            </button>
            <div className="mob-cat-body">
              <Link href="/women?cat=bags" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                👜 &nbsp; Leather Bags
              </Link>
              <Link href="/women?cat=jackets" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                🧥 &nbsp; Jackets
              </Link>
              <Link href="/women?cat=wallets" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                💼 &nbsp; Wallets & Purses
              </Link>
              <Link href="/women?cat=shoes" className="mob-sub-link" onClick={() => setMobileMenuOpen(false)}>
                👠 &nbsp; Shoes
              </Link>
              <Link href="/women" className="mob-sub-link" style={{color:'var(--brass)'}} onClick={() => setMobileMenuOpen(false)}>
                View All Women →
              </Link>
            </div>
          </div>

          <p className="mob-section-title" style={{marginTop:'0.5rem'}}>Explore</p>
          <Link href="/about" className="mob-flat-link" onClick={() => setMobileMenuOpen(false)}>
            📖 &nbsp; Our Story
          </Link>
          <button className="mob-flat-link" onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}>
            🔍 &nbsp; Search
          </button>
          <button className="mob-flat-link" onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}>
            🛍 &nbsp; Cart ({cartItems.length})
          </button>
          <button className="mob-flat-link">♡ &nbsp; Wishlist</button>
          <button className="mob-flat-link">📦 &nbsp; Track My Order</button>

          <div className="mob-footer">
            <p className="mob-footer-tagline">"Where Heritage Meets Refinement"</p>
            <div className="mob-socials">
              <span className="mob-social">in</span>
              <span className="mob-social">ig</span>
              <span className="mob-social">fb</span>
              <span className="mob-social">pin</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
