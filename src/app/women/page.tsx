'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { products } from '@/lib/dummy-data';
import '@/styles/category.css';

export default function WomenPage() {
  const { addToCart, setCartOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Derive products
  const womenProducts = useMemo(() => {
    return products.filter(p => p.gender === 'women');
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return womenProducts;
    } else {
      return womenProducts.filter(p => p.type === activeFilter);
    }
  }, [activeFilter, womenProducts]);

  const handleFilter = (filter: string) => {
    setIsLoading(true);
    setActiveFilter(filter);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      size: 'M',
      color: 'Default',
    });
    setCartOpen(true);
  };

  return (
    <div className="page active" id="page-category-women">
      <div className="category-page">
        <div className="category-hero" style={{ background: 'linear-gradient(135deg, #4A2018, #1C1810)' }}>
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="sep">›</span>
            <span className="current">Women</span>
          </div>
          <div className="cat-hero-content">
            <h1 className="cat-title">Women's Collection</h1>
            <p className="cat-subtitle">{womenProducts.length} Handcrafted Pieces · Sialkot, Pakistan</p>
            <div className="sub-cat-tabs" id="women-tabs">
              <button 
                className={`sub-cat-tab ${activeFilter === 'all' ? 'active' : ''}`} 
                onClick={() => handleFilter('all')}
              >
                All ({womenProducts.length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'bag' ? 'active' : ''}`} 
                onClick={() => handleFilter('bag')}
              >
                👜 Bags ({womenProducts.filter(p => p.type === 'bag').length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'jacket' ? 'active' : ''}`} 
                onClick={() => handleFilter('jacket')}
              >
                🧥 Jackets ({womenProducts.filter(p => p.type === 'jacket').length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'wallet' ? 'active' : ''}`} 
                onClick={() => handleFilter('wallet')}
              >
                💼 Wallets ({womenProducts.filter(p => p.type === 'wallet').length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'shoe' ? 'active' : ''}`} 
                onClick={() => handleFilter('shoe')}
              >
                👠 Shoes ({womenProducts.filter(p => p.type === 'shoe').length})
              </button>
            </div>
          </div>
        </div>

        <div className="cat-controls">
          <p className="results-count">Showing <span>{filteredProducts.length}</span> of <span>{womenProducts.length}</span> products</p>
          <select className="sort-select">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        <div className="cat-layout">
          {/* SIDEBAR */}
          <aside className="cat-sidebar">
            <div className="sidebar-section">
              <p className="sidebar-title">Product Type</p>
              <div className="filter-option"><input type="checkbox" id="wb" defaultChecked /><label htmlFor="wb">Bags (28)</label></div>
              <div className="filter-option"><input type="checkbox" id="wj" /><label htmlFor="wj">Jackets (16)</label></div>
              <div className="filter-option"><input type="checkbox" id="ww" /><label htmlFor="ww">Wallets (22)</label></div>
              <div className="filter-option"><input type="checkbox" id="ws" /><label htmlFor="ws">Shoes (19)</label></div>
            </div>
            
            <div className="sidebar-section">
              <p className="sidebar-title">Price Range (€)</p>
              <div className="price-range">
                <input className="price-input" type="number" placeholder="Min" defaultValue="40" />
                <span className="price-sep">—</span>
                <input className="price-input" type="number" placeholder="Max" defaultValue="500" />
              </div>
            </div>
            
            <div className="sidebar-section">
              <p className="sidebar-title">Leather Type</p>
              <div className="filter-option"><input type="checkbox" id="wfg" defaultChecked /><label htmlFor="wfg">Full-Grain</label></div>
              <div className="filter-option"><input type="checkbox" id="wna" /><label htmlFor="wna">Nappa</label></div>
              <div className="filter-option"><input type="checkbox" id="wpe" /><label htmlFor="wpe">Pebbled</label></div>
              <div className="filter-option"><input type="checkbox" id="wsm" /><label htmlFor="wsm">Smooth</label></div>
            </div>
            
            <div className="sidebar-section">
              <p className="sidebar-title">Colour</p>
              <div className="color-dots">
                <div className="color-dot active" style={{background: '#7C3A2D'}} title="Cognac"></div>
                <div className="color-dot" style={{background: '#2A1810'}} title="Dark Brown"></div>
                <div className="color-dot" style={{background: '#C9A96E'}} title="Tan"></div>
                <div className="color-dot" style={{background: '#1C1810'}} title="Black"></div>
                <div className="color-dot" style={{background: '#C87A6A'}} title="Blush"></div>
                <div className="color-dot" style={{background: '#8A6050'}} title="Caramel"></div>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="cat-products">
            <div className="cat-products-grid">
              {isLoading ? (
                <>
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <p className="no-products" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'var(--oak)' }}>
                  No products found in this category.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
