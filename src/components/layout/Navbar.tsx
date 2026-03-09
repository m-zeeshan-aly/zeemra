'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';
import { useApp } from '@/lib/context';
import CartDrawer from '../product/CartDrawer';
import './Navbar.css';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

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
  const { setCartOpen, cartItems } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementHidden, setAnnouncementHidden] = useState(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

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
            <SearchIcon />
          </button>
          <button className="nav-icon-btn" aria-label="View wishlist">
            <HeartIcon />
          </button>
          <Link
            className="nav-icon-btn nav-cart-btn"
            href="/cart"
            aria-label={`Go to cart${cartCount > 0 ? `, ${cartCount} item${cartCount > 1 ? 's' : ''}` : ''}`}
            onClick={() => setCartOpen(false)}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="cart-badge" aria-hidden="true">{cartCount}</span>
            )}
          </Link>
          <button 
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-line" aria-hidden="true" />
            <span className="hamburger-line" aria-hidden="true" />
            <span className="hamburger-line" aria-hidden="true" />
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
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
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
          id="mobile-menu"
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
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="mob-search">
            <div className="mob-search-wrap">
              <SearchIcon className="mob-search-icon" />
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
          <button className="mob-flat-link" type="button" onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}>
            <SearchIcon className="mob-flat-icon" /> &nbsp; Search
          </button>
          <Link className="mob-flat-link" href="/cart" onClick={() => { setCartOpen(false); setMobileMenuOpen(false); }}>
            <CartIcon className="mob-flat-icon" /> &nbsp; Cart ({cartCount})
          </Link>
          <button className="mob-flat-link" type="button">
            <HeartIcon className="mob-flat-icon" /> &nbsp; Wishlist
          </button>
          <button className="mob-flat-link">📦 &nbsp; Track My Order</button>

          <div className="mob-footer">
            <p className="mob-footer-tagline">Where Heritage Meets Refinement</p>
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
