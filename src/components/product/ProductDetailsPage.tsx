'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts } from '@/lib/dummy-data';
import styles from './ProductDetail.module.css';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductAccordions from '@/components/product/ProductAccordions';
import DetailsBand from '@/components/product/DetailsBand';
import CraftBand from '@/components/product/CraftBand';
import ReviewsSection from '@/components/product/ReviewsSection';
import RelatedProductsSection from '@/components/product/RelatedProductsSection';

interface ProductDetailPageProps {
  slug: string;
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  // Compute product data based on slug prop — no effect needed for sync data
  const { product, relatedProducts } = useMemo(() => {
    const fetchedProduct = getProductBySlug(slug);
    if (fetchedProduct) {
      return {
        product: fetchedProduct,
        relatedProducts: getRelatedProducts(fetchedProduct.id),
      };
    }
    return { product: null, relatedProducts: [] };
  }, [slug]);

  if (!product) {
    return (
      <div style={{ padding: '5rem 4rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ color: 'var(--night)', fontSize: '1.5rem', marginBottom: '1rem' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--oak)', fontSize: '1rem' }}>
          The product you are looking for could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb - positioned below sticky nav */}
      <div style={{
        padding: '1rem 4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontSize: '0.52rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--oak)',
        borderBottom: '1px solid #EDE5D4',
        background: 'var(--white)',
        position: 'relative',
        zIndex: 100,
      }}>
        <Link href="/" style={{ color: 'var(--oak)', cursor: 'pointer', transition: 'color 0.25s' }}>
          Home
        </Link>
        <span style={{ color: '#C8BCA8', fontSize: '0.45rem' }}>›</span>
        <Link href={`/${product.gender}`} style={{ color: 'var(--oak)', cursor: 'pointer', transition: 'color 0.25s' }}>
          {product.gender === 'men' ? 'Men' : 'Women'}
        </Link>
        <span style={{ color: '#C8BCA8', fontSize: '0.45rem' }}>›</span>
        <span style={{ color: 'var(--oak)' }}>
          {product.category.split(' · ')[1] || 'Products'}
        </span>
        <span style={{ color: '#C8BCA8', fontSize: '0.45rem' }}>›</span>
        <span style={{ color: 'var(--night)' }}>{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className={styles.productLayout}>
        {/* Gallery Column */}
        <ProductGallery product={product} />

        {/* Info Column */}
        <ProductInfo product={product} />
      </div>

      {/* Details Band - Why ZEEMRA */}
      <DetailsBand product={product} />

      {/* Craft Band - Sialkot Story */}
      <CraftBand product={product} />

      {/* Reviews Section */}
      <ReviewsSection product={product} />

      {/* Product Accordions - Full Width */}
      {product.accordions && product.accordions.length > 0 && (
        <div style={{
          background: 'var(--white)',
          padding: '3rem 4rem',
          borderTop: '1px solid var(--smoke)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <ProductAccordions accordions={product.accordions} />
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <RelatedProductsSection products={relatedProducts} />
      )}
    </div>
  );
}
