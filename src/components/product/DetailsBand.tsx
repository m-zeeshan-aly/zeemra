'use client';

import { Product, ProductFeature } from '@/types/product';

interface DetailsBandProps {
  product: Product;
}

export default function DetailsBand({ product }: DetailsBandProps) {
  const features = product.features || [];

  if (features.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: 'var(--night)',
      padding: '5rem 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'start',
      }}>
        {/* Left Section */}
        <div>
          <div style={{
            fontSize: '0.52rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--brass)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
          }}>
            <span style={{
              content: '',
              width: '24px',
              height: '1px',
              background: 'var(--brass)',
            }}></span>
            Why ZEEMRA
          </div>
          <h2 style={{
            fontFamily: 'var(--fd)',
            fontSize: '2.5rem',
            fontWeight: 300,
            color: 'var(--parchment)',
            lineHeight: '1.15',
            marginBottom: '1.5rem',
          }}>
            Crafted to Last
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--brass)' }}>a Lifetime</em>
          </h2>
          <p style={{
            fontFamily: 'var(--fe)',
            fontSize: '1.05rem',
            lineHeight: 2.1,
            color: 'rgba(245, 236, 215, 0.65)',
            fontWeight: 400,
          }}>
            {product.craftStory?.description || 
              'Every piece is handcrafted by our master artisans using the finest materials and traditional techniques passed down through generations.'}
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem',
        }}>
          {features.map((feature: ProductFeature, idx: number) => (
            <div
              key={idx}
              style={{
                border: '1px solid #2A231A',
                padding: '1.2rem',
                transition: 'border-color 0.25s, background 0.25s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.25)';
                e.currentTarget.style.background = 'rgba(201, 169, 110, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A231A';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: '0.7rem' }}>
                {feature.icon}
              </div>
              <p style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--brass)',
                marginBottom: '0.4rem',
                fontWeight: 500,
              }}>
                {feature.title}
              </p>
              <p style={{
                fontSize: '0.6rem',
                lineHeight: 1.7,
                color: 'var(--oak)',
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
