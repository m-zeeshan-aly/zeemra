'use client';

import { useState, useMemo } from 'react';
import { getProductsBySection } from '@/lib/dummy-data';
import { Product } from '@/types/product';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

export default function FeaturedShopPage() {
  const { addToCart, setCartOpen } = useApp();
  const products = getProductsBySection('featured');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products;
    }
    return products.filter((p: Product) => {
      if (activeFilter === 'men' || activeFilter === 'women') {
        return p.gender === activeFilter;
      }
      return p.type === activeFilter;
    });
  }, [activeFilter, products]);

  const handleAddToCart = (product: Product) => {
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
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <Link href="/" className="shop-back">← Back to Home</Link>
        <h1 className="shop-title">Our Collection</h1>
        <p className="shop-subtitle">Full-grain leather, ethically made in Sialkot — built for a lifetime</p>
        <p className="product-count">{filteredProducts.length} Products</p>
      </div>

      {/* Filters */}
      <div className="shop-filters">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === 'men' ? 'active' : ''}`}
          onClick={() => setActiveFilter('men')}
        >
          Men
        </button>
        <button
          className={`filter-btn ${activeFilter === 'women' ? 'active' : ''}`}
          onClick={() => setActiveFilter('women')}
        >
          Women
        </button>
        <button
          className={`filter-btn ${activeFilter === 'jacket' ? 'active' : ''}`}
          onClick={() => setActiveFilter('jacket')}
        >
          Jackets
        </button>
        <button
          className={`filter-btn ${activeFilter === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveFilter('wallet')}
        >
          Wallets
        </button>
        <button
          className={`filter-btn ${activeFilter === 'bag' ? 'active' : ''}`}
          onClick={() => setActiveFilter('bag')}
        >
          Bags
        </button>
      </div>

      {/* Products Grid */}
      <div className="shop-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="shop-empty">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
