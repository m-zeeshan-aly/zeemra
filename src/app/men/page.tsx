'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { products } from '@/lib/dummy-data';
import '@/styles/category.css';

export default function MenPage() {
  const { addToCart, setCartOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Derive products
  const menProducts = useMemo(() => {
    return products.filter(p => p.gender === 'men');
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return menProducts;
    } else {
      return menProducts.filter(p => p.type === activeFilter);
    }
  }, [activeFilter, menProducts]);

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
    <div className="page active" id="page-category-men">
      <div className="category-page">
        <div className="category-hero">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <span className="current">Men</span>
          </div>
          <div className="cat-hero-content">
            <h1 className="cat-title">Men&apos;s Collection</h1>
            <p className="cat-subtitle">{menProducts.length} Handcrafted Pieces · Sialkot, Pakistan</p>
            <div className="sub-cat-tabs" id="men-tabs">
              <button 
                className={`sub-cat-tab ${activeFilter === 'all' ? 'active' : ''}`} 
                onClick={() => handleFilter('all')}
              >
                All ({menProducts.length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'jacket' ? 'active' : ''}`} 
                onClick={() => handleFilter('jacket')}
              >
                🧥 Jackets ({menProducts.filter(p => p.type === 'jacket').length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'wallet' ? 'active' : ''}`} 
                onClick={() => handleFilter('wallet')}
              >
                👛 Wallets ({menProducts.filter(p => p.type === 'wallet').length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'belt' ? 'active' : ''}`} 
                onClick={() => handleFilter('belt')}
              >
                👔 Belts ({menProducts.filter(p => p.type === 'belt').length})
              </button>
              <button 
                className={`sub-cat-tab ${activeFilter === 'shoe' ? 'active' : ''}`} 
                onClick={() => handleFilter('shoe')}
              >
                👞 Shoes ({menProducts.filter(p => p.type === 'shoe').length})
              </button>
            </div>
          </div>
        </div>

        <div className="cat-controls">
          <p className="results-count">Showing <span>{filteredProducts.length}</span> of <span>{menProducts.length}</span> products</p>
          <select className="sort-select">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
            <option>Best Rated</option>
          </select>
        </div>

        <div className="cat-layout">
          {/* SIDEBAR */}
          <aside className="cat-sidebar">
            <div className="sidebar-section">
              <p className="sidebar-title">Product Type</p>
              <div className="filter-option"><input type="checkbox" id="fg-mj" defaultChecked /><label htmlFor="fg-mj">Jackets (24)</label></div>
              <div className="filter-option"><input type="checkbox" id="fg-mw" /><label htmlFor="fg-mw">Wallets (18)</label></div>
              <div className="filter-option"><input type="checkbox" id="fg-mb" /><label htmlFor="fg-mb">Belts (12)</label></div>
              <div className="filter-option"><input type="checkbox" id="fg-ms" /><label htmlFor="fg-ms">Shoes (20)</label></div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-title">Price Range (€)</p>
              <div className="price-range">
                <input className="price-input" type="number" placeholder="Min" defaultValue="50" />
                <span className="price-sep">—</span>
                <input className="price-input" type="number" placeholder="Max" defaultValue="400" />
              </div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-title">Leather Type</p>
              <div className="filter-option"><input type="checkbox" id="fg" defaultChecked /><label htmlFor="fg">Full-Grain</label></div>
              <div className="filter-option"><input type="checkbox" id="vt" /><label htmlFor="vt">Vegetable Tanned</label></div>
              <div className="filter-option"><input type="checkbox" id="na" /><label htmlFor="na">Nappa</label></div>
              <div className="filter-option"><input type="checkbox" id="pe" /><label htmlFor="pe">Pebbled</label></div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-title">Colour</p>
              <div className="color-dots">
                <div className="color-dot active" style={{background: '#2A1810'}} title="Dark Brown"></div>
                <div className="color-dot" style={{background: '#7C3A2D'}} title="Cognac"></div>
                <div className="color-dot" style={{background: '#C9A96E'}} title="Tan"></div>
                <div className="color-dot" style={{background: '#1C1810'}} title="Black"></div>
                <div className="color-dot" style={{background: '#8A8075'}} title="Grey"></div>
                <div className="color-dot" style={{background: '#5A3020'}} title="Chestnut"></div>
              </div>
            </div>
            
            <div className="sidebar-section">
              <p className="sidebar-title">Rating</p>
              <div className="filter-option"><input type="checkbox" id="r5" /><label htmlFor="r5">★★★★★ (5.0)</label></div>
              <div className="filter-option"><input type="checkbox" id="r4" /><label htmlFor="r4">★★★★☆ (4.0+)</label></div>
              <div className="filter-option"><input type="checkbox" id="r3" /><label htmlFor="r3">★★★☆☆ (3.0+)</label></div>
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
