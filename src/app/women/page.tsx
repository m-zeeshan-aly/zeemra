'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { products } from '@/lib/dummy-data';
import './women.css';


/**
 * WomenPage displays the Women's Collection with filterable product grid.
 * Filters are memoized with useMemo to avoid unnecessary re-renders.
 * Shows skeleton loaders while filtering for smooth UX.
 *
 * @component
 * @example
 * // Automatically rendered at /women route
 * <WomenPage />
 *
 * @returns {JSX.Element} Women's collection page with filter buttons and product grid
 */
export default function WomenPage() {
  const { addToCart, setCartOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

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
          <h1 className="collection-title">Women&apos;s Collection</h1>
          <p className="collection-subtitle">
            Elegant leather accessories crafted for the modern woman
          </p>
        </div>

        <div className="collection-container">
          {/* Filter Buttons */}
          <div className="collection-filters">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilter('all')}
            >
              All Products ({womenProducts.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'jacket' ? 'active' : ''}`}
              onClick={() => handleFilter('jacket')}
            >
              Jackets ({womenProducts.filter(p => p.type === 'jacket').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'wallet' ? 'active' : ''}`}
              onClick={() => handleFilter('wallet')}
            >
              Wallets ({womenProducts.filter(p => p.type === 'wallet').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'bag' ? 'active' : ''}`}
              onClick={() => handleFilter('bag')}
            >
              Bags ({womenProducts.filter(p => p.type === 'bag').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'shoe' ? 'active' : ''}`}
              onClick={() => handleFilter('shoe')}
            >
              Shoes ({womenProducts.filter(p => p.type === 'shoe').length})
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
