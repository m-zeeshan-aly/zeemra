'use client';

import { useState, useMemo } from 'react';
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
}

const CARDS_PER_ROW = 4;
const EXPANDED_ROWS = 2;

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
}: ProductSectionProps) {
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

  const itemsPerPage = CARDS_PER_ROW;
  const expandedItemsLimit = CARDS_PER_ROW * EXPANDED_ROWS;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Clamp current page
  if (currentPage >= totalPages && totalPages > 0) {
    const newPage = Math.max(0, totalPages - 1);
    if (newPage !== currentPage) {
      setTimeout(() => setCurrentPage(newPage), 0);
    }
  }

  const visibleProducts = useMemo(() => {
    if (isExpanded) {
      return filteredProducts; // Show ALL products when expanded
    }
    const start = currentPage * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, isExpanded, itemsPerPage]);

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

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const hasMoreProducts = filteredProducts.length > expandedItemsLimit;

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

      {/* Products Grid / Carousel */}
      <div className={`products-grid-wrapper ${isExpanded ? 'expanded' : 'carousel'}`}>
        {!isExpanded && (
          <button
            className="carousel-nav carousel-nav--prev"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            ←
          </button>
        )}

        <div className="products-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {!isExpanded && (
          <button
            className="carousel-nav carousel-nav--next"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next page"
          >
            →
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {!isExpanded && totalPages > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(index)}
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
              ↑ Show Less
            </button>
          )}
          {!isExpanded && hasMoreProducts && (
            <button
              className="action-btn action-btn--primary"
              onClick={() => {
                setIsExpanded(true);
                setCurrentPage(0);
              }}
            >
              Expand · Show All Products ↓
            </button>
          )}
        </div>
      )}
    </section>
  );
}
