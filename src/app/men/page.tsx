'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { products } from '@/lib/dummy-data';
import './men.css';


/**
 * MenPage displays the Men's Collection with filterable product grid.
 * Filters are memoized with useMemo to avoid unnecessary re-renders.
 * Shows skeleton loaders while filtering for smooth UX.
 *
 * @component
 * @example
 * // Automatically rendered at /men route
 * <MenPage />
 *
 * @returns {JSX.Element} Men's collection page with filter buttons and product grid
 */
export default function MenPage() {
  const { addToCart, setCartOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

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
    // Simulate filtering delay for better UX
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
    <>
      <div className="collection-page">
        <div className="collection-hero">
          <h1 className="collection-title">Men&apos;s Collection</h1>
          <p className="collection-subtitle">
            Premium handcrafted leather goods for the modern gentleman
          </p>
        </div>

        <div className="collection-container">
          {/* Filter Buttons */}
          <div className="collection-filters">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilter('all')}
            >
              All Products ({menProducts.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'jacket' ? 'active' : ''}`}
              onClick={() => handleFilter('jacket')}
            >
              Jackets ({menProducts.filter(p => p.type === 'jacket').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'wallet' ? 'active' : ''}`}
              onClick={() => handleFilter('wallet')}
            >
              Wallets ({menProducts.filter(p => p.type === 'wallet').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'belt' ? 'active' : ''}`}
              onClick={() => handleFilter('belt')}
            >
              Belts ({menProducts.filter(p => p.type === 'belt').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'shoe' ? 'active' : ''}`}
              onClick={() => handleFilter('shoe')}
            >
              Shoes ({menProducts.filter(p => p.type === 'shoe').length})
            </button>
          </div>

          {/* Products Grid */}
          <div className="collection-grid">
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
              <p className="no-products">No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
