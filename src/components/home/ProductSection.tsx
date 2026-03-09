'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product, SectionType } from '@/types/product';
import { useApp } from '@/lib/context';
import ProductCard from '@/components/product/ProductCard';
import './ProductSection.css';

interface ProductSectionProps {
  sectionId: SectionType;
  sectionTitle: string;
  sectionSubtitle: string;
  sectionTag: string;
  products: Product[];
  filters: Array<{ label: string; value: string }>;
  backgroundStyle?: 'light' | 'dark' | 'accent';
  showExpand?: boolean;
  pageUrl: string; // URL for View All
}

const ITEMS_PER_ROW = 4;
const EXPANDED_ROWS = 2;
const EXPANDED_ITEMS = ITEMS_PER_ROW * EXPANDED_ROWS; // 8

// Helper function to parse title with <em> tags
function parseTitleWithEmphasis(title: string) {
  const parts = title.split('<em>');
  if (parts.length === 1) return title;
  
  return (
    <>
      {parts[0]}
      {parts.slice(1).map((part, index) => {
        const [em, rest] = part.split('</em>');
        return (
          <span key={index}>
            <em>{em}</em>
            {rest}
          </span>
        );
      })}
    </>
  );
}

export default function ProductSection({
  sectionId,
  sectionTitle,
  sectionSubtitle,
  sectionTag,
  products,
  filters,
  backgroundStyle = 'light',
  showExpand = true,
  pageUrl,
}: ProductSectionProps) {
  const router = useRouter();
  const { addToCart, setCartOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products;
    }
    return products.filter((p) => {
      if (activeFilter === 'men' || activeFilter === 'women') {
        return p.gender === activeFilter;
      }
      return p.type === activeFilter;
    });
  }, [activeFilter, products]);

  // Calculate pagination
  const itemsPerPage = ITEMS_PER_ROW;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Get visible products
  const visibleProducts = useMemo(() => {
    if (isExpanded) {
      // Show 8 products (2 rows of 4)
      return filteredProducts.slice(0, EXPANDED_ITEMS);
    }
    // Show 4 products (1 row) for current page
    const safePage = Math.min(currentPage, totalPages - 1);
    const start = safePage * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, isExpanded, totalPages]);

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

  const handleFilter = (filterValue: string) => {
    setActiveFilter(filterValue);
    setCurrentPage(0);
    setIsExpanded(false);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const hasMoreProducts = filteredProducts.length > EXPANDED_ITEMS;

  return (
    <section className={`product-section product-section--${sectionId} product-section--${backgroundStyle}`}>
      <div className="section-header reveal">
        <p className="section-tag">{sectionTag}</p>
        <h2 className="section-title">
          {parseTitleWithEmphasis(sectionTitle)}
        </h2>
        <p className="section-subtitle">{sectionSubtitle}</p>
      </div>

      {/* Filters */}
      <div className="products-filter">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
            onClick={() => handleFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Products Grid with Carousel */}
      <div className={`products-grid-wrapper ${isExpanded ? 'expanded' : 'carousel'}`}>
        {/* Previous Arrow - Hide when expanded */}
        {!isExpanded && (
          <button
            className="carousel-nav carousel-nav--prev"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
            title="Previous products"
          >
            ←
          </button>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Next Arrow - Hide when expanded */}
        {!isExpanded && (
          <button
            className="carousel-nav carousel-nav--next"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next page"
            title="Next products"
          >
            →
          </button>
        )}
      </div>

      {/* Pagination Dots - Hide when expanded */}
      {!isExpanded && totalPages > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {showExpand && (
        <div className="section-actions">
          {isExpanded && (
            <button
              className="action-btn action-btn--secondary"
              onClick={() => {
                setIsExpanded(false);
                setCurrentPage(0);
              }}
            >
              ↑ Collapse
            </button>
          )}
          
          {!isExpanded && hasMoreProducts && (
            <button
              className="action-btn action-btn--primary"
              onClick={() => setIsExpanded(true)}
            >
              Expand · Show 2 Rows ↓
            </button>
          )}
          
          {/* View All Button */}
          <button
            className="action-btn action-btn--tertiary"
            onClick={() => router.push(pageUrl)}
            title={`View all ${sectionTag} products`}
          >
            View All Products →
          </button>
        </div>
      )}
    </section>
  );
}
