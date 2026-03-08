'use client';

import { Product } from '@/types/product';

interface CraftBandProps {
  product: Product;
}

export default function CraftBand({ product }: CraftBandProps) {
  const story = product.craftStory;

  if (!story) {
    return null;
  }

  return (
    <div style={{
      background: 'var(--parchment)',
      padding: '5rem 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Visual */}
        <div style={{
          aspectRatio: '1',
          background: 'linear-gradient(145deg, #2A1810, #4A2018)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 80% at 30% 30%, rgba(201, 169, 110, 0.08) 0%, transparent 60%)',
          }}></div>
          <span style={{
            position: 'relative',
            zIndex: 2,
            filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.6))',
          }}>
            🏭
          </span>
        </div>

        {/* Text */}
        <div>
          <div style={{
            fontSize: '0.52rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--cognac)',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
          }}>
            <span style={{
              content: '',
              width: '24px',
              height: '1px',
              background: 'var(--cognac)',
            }}></span>
            The Atelier
          </div>
          <h2 style={{
            fontFamily: 'var(--fd)',
            fontSize: '2.2rem',
            fontWeight: 300,
            color: 'var(--night)',
            lineHeight: '1.15',
            marginBottom: '1.2rem',
          }}>
            Six Centuries of
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>Sialkot Craft</em>
          </h2>
          <p style={{
            fontFamily: 'var(--fe)',
            fontSize: '1rem',
            lineHeight: 2,
            color: 'var(--oak)',
            marginBottom: '1.5rem',
          }}>
            {story.description}
          </p>

          {/* Stats */}
          {story.stats && story.stats.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '2rem',
            }}>
              {story.stats.map((stat, idx) => (
                <div key={idx}>
                  <div style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: 'var(--night)',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--oak)',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
