'use client';

import { Product } from '@/types/product';
import Link from 'next/link';

interface RelatedProductsSectionProps {
  products: Product[];
}

export default function RelatedProductsSection({
  products,
}: RelatedProductsSectionProps) {
  return (
    <div style={{
      background: 'var(--cream)',
      padding: '5rem 0 6rem',
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 3rem',
      }}>
        {/* Section Header */}
        <div style={{
          fontSize: '0.52rem',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'var(--cognac)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '0.8rem',
        }}>
          <span style={{
            content: '',
            width: '40px',
            height: '1px',
            background: 'var(--brass)',
            opacity: 0.35,
          }}></span>
          You May Also Like
          <span style={{
            content: '',
            width: '40px',
            height: '1px',
            background: 'var(--brass)',
            opacity: 0.35,
          }}></span>
        </div>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontSize: '2.5rem',
          fontWeight: 300,
          textAlign: 'center',
          color: 'var(--night)',
          marginBottom: '3rem',
        }}>
          Complete the <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>Look</em>
        </h2>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.2rem',
        }}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug || product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'var(--white)',
                border: '1px solid var(--smoke)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 28px 70px rgba(28, 24, 16, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Product Image */}
                <div style={{
                  height: '260px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(145deg, #2a1810, #4a2018)',
                }}>
                  <div style={{
                    fontSize: '5rem',
                    position: 'relative',
                    zIndex: 2,
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                  }}>
                    {product.emoji}
                  </div>
                  {product.badge && (
                    <div style={{
                      position: 'absolute',
                      top: '0.8rem',
                      left: '0.8rem',
                      zIndex: 3,
                      fontSize: '0.45rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.6rem',
                      fontWeight: 500,
                      background: product.badge === 'Sale' ? 'var(--cognac)' : 'var(--night)',
                      color: product.badge === 'Sale' ? 'var(--parchment)' : 'var(--brass)',
                      border: product.badge === 'Sale' ? 'none' : '1px solid rgba(201, 169, 110, 0.3)',
                    }}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{
                  padding: '0.9rem 1rem 1.1rem',
                  borderTop: 'none',
                }}>
                  <p style={{
                    fontSize: '0.46rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--oak)',
                    marginBottom: '0.3rem',
                  }}>
                    {product.category}
                  </p>
                  <p style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '1.05rem',
                    color: 'var(--night)',
                    marginBottom: '0.4rem',
                  }}>
                    {product.name}
                  </p>
                  <div style={{
                    fontSize: '0.65rem',
                    color: 'var(--brass)',
                    marginBottom: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}>
                    ★★★★★ <span style={{ fontSize: '0.47rem', color: 'var(--oak)', fontFamily: 'var(--fb)' }}>{product.reviewCount} reviews</span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '1.1rem',
                    color: 'var(--night)',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.4rem',
                  }}>
                    €{product.price}
                    {product.originalPrice && (
                      <span style={{
                        fontSize: '0.8rem',
                        color: 'var(--oak)',
                        textDecoration: 'line-through',
                      }}>
                        €{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Color Swatches */}
                  {product.colors && product.colors.length > 0 && (
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      marginTop: '0.5rem',
                    }}>
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            cursor: 'pointer',
                            transition: 'transform 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.35)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
