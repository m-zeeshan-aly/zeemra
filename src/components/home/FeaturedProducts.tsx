'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/dummy-data';
import './FeaturedProducts.css';

/**
 * FeaturedProducts component displays a filterable grid of featured/bestselling products.
 * Supports filtering by gender (men/women) and product type (jacket, wallet, etc).
 * Uses memoization to optimize performance for expensive filter operations.
 * 
 * @component
 * @example
 * <FeaturedProducts />
 * 
 * @returns {JSX.Element} Featured products section with filter buttons and product grid
 */
export default function FeaturedProducts() {
  const { addToCart, setCartOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  // Compute filtered products based on activeFilter
  // This ensures single source of truth
  const filteredProducts = useMemo(() => {
    let result = [];
    if (activeFilter === 'all') {
      result = products;
    } else if (activeFilter === 'men' || activeFilter === 'women') {
      result = products.filter((p) => p.gender === activeFilter);
    } else {
      // Filter by type (jacket, wallet, shoe, belt, bag)
      result = products.filter((p) => p.type === activeFilter);
    }
    
    return result;
  }, [activeFilter]);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
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
    <section className="products-section">
      <div className="section-header reveal">
        <p className="section-tag">Bestsellers</p>
        <h2 className="section-title">
          Most <em>Loved</em> Pieces
        </h2>
      </div>

      <div className="products-filter">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === 'men' ? 'active' : ''}`}
          onClick={() => handleFilter('men')}
        >
          Men
        </button>
        <button
          className={`filter-btn ${activeFilter === 'women' ? 'active' : ''}`}
          onClick={() => handleFilter('women')}
        >
          Women
        </button>
        <button
          className={`filter-btn ${activeFilter === 'jacket' ? 'active' : ''}`}
          onClick={() => handleFilter('jacket')}
        >
          Jackets
        </button>
        <button
          className={`filter-btn ${activeFilter === 'wallet' ? 'active' : ''}`}
          onClick={() => handleFilter('wallet')}
        >
          Wallets
        </button>
        <button
          className={`filter-btn ${activeFilter === 'shoe' ? 'active' : ''}`}
          onClick={() => handleFilter('shoe')}
        >
          Shoes
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
