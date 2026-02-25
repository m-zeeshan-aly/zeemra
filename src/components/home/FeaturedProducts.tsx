'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/dummy-data';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const { addToCart, setCartOpen } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.gender === filter ||
            p.type === filter ||
            p.category.toLowerCase().includes(filter)
        )
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
