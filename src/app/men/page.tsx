'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import CartDrawer from '@/components/product/CartDrawer';
import { products } from '@/lib/dummy-data';
import './men.css';

export default function MenPage() {
  const { addToCart, setCartOpen } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(
    products.filter(p => p.gender === 'men')
  );
  const [activeFilter, setActiveFilter] = useState('all');

  const menProducts = products.filter(p => p.gender === 'men');

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProducts(menProducts);
    } else {
      setFilteredProducts(
        menProducts.filter(p => p.type === filter)
      );
    }
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
            {filteredProducts.length > 0 ? (
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

      <CartDrawer />
    </>
  );
}
