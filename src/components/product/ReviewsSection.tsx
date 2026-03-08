'use client';

import { Product } from '@/types/product';

interface ReviewsSectionProps {
  product: Product;
}

export default function ReviewsSection({ product }: ReviewsSectionProps) {
  // Mock reviews data if not provided
  const reviews = product.reviews || [
    {
      id: '1',
      author: 'Marcus H.',
      location: 'Berlin, Germany',
      date: 'March 2025',
      rating: 5,
      text: '"I\'ve owned many leather jackets, but this is the first one that felt like an heirloom from the day I put it on. The leather is extraordinary — thick, supple, and the cognac colour is even more beautiful in person."',
      verified: true,
    },
    {
      id: '2',
      author: 'Thomas V.',
      location: 'Amsterdam, NL',
      date: 'February 2025',
      rating: 5,
      text: '"Ordered size M as suggested. Fits perfectly — slim but not restrictive. The hardware is solid brass, not that cheap zinc you find elsewhere. Delivery took 9 days to Amsterdam. Absolutely worth the wait."',
      verified: true,
    },
    {
      id: '3',
      author: 'Luca B.',
      location: 'Milan, Italy',
      date: 'January 2025',
      rating: 5,
      text: '"The craftsmanship is simply unmatched at this price point. I had it custom-fitted by a tailor and the leather was so clean and even, he said he\'d never worked with anything of this quality outside of bespoke Florentine pieces."',
      verified: true,
    },
  ];

  // Calculate rating distribution
  const ratingDistribution = {
    5: Math.round((product.reviewCount * 0.87) || 0),
    4: Math.round((product.reviewCount * 0.09) || 0),
    3: Math.round((product.reviewCount * 0.03) || 0),
    2: Math.round((product.reviewCount * 0.01) || 0),
    1: 0,
  };

  return (
    <div style={{
      background: 'var(--white)',
      padding: '5rem 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 4rem',
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
            width: '40px',
            height: '1px',
            background: 'var(--brass)',
            opacity: 0.35,
          }}></span>
          Customer Reviews
          <span style={{
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
          marginBottom: '0.5rem',
        }}>
          What Our <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>Clients Say</em>
        </h2>

        {/* Reviews Summary */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          margin: '2.5rem 0 3rem',
          padding: '2rem',
          border: '1px solid var(--smoke)',
          background: 'var(--cream)',
        }}>
          {/* Rating Big */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--fd)',
              fontSize: '5rem',
              fontWeight: 300,
              color: 'var(--night)',
              lineHeight: 1,
            }}>
              {product.rating || 4.9}
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: 'var(--brass)',
              margin: '0.3rem 0',
            }}>
              ★★★★★
            </div>
            <div style={{
              fontSize: '0.52rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--oak)',
            }}>
              {product.reviewCount || 128} Reviews
            </div>
          </div>

          {/* Rating Bars */}
          <div style={{ flex: 1, maxWidth: '320px' }}>
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{
                  fontSize: '0.52rem',
                  color: 'var(--oak)',
                  width: '40px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}>
                  {star} ★
                </span>
                <div style={{
                  flex: 1,
                  height: '4px',
                  background: 'var(--smoke)',
                }}>
                  <div
                    style={{
                      height: '100%',
                      background: 'var(--brass)',
                      transition: 'width 1s ease',
                      width: `${(ratingDistribution[star as keyof typeof ratingDistribution] / product.reviewCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span style={{
                  fontSize: '0.5rem',
                  color: 'var(--oak)',
                  width: '24px',
                  flexShrink: 0,
                }}>
                  {ratingDistribution[star as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                border: '1px solid var(--smoke)',
                padding: '1.5rem',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(28, 24, 16, 0.07)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--brass)',
                marginBottom: '0.7rem',
              }}>
                {'★'.repeat(review.rating)}
              </div>
              <p style={{
                fontFamily: 'var(--fe)',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--night)',
                marginBottom: '1rem',
              }}>
                {review.text}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontSize: '0.52rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--night)',
                    fontWeight: 500,
                  }}>
                    {review.author}
                  </div>
                  <div style={{
                    fontSize: '0.5rem',
                    color: 'var(--oak)',
                  }}>
                    {review.date} · {review.location}
                  </div>
                  {review.verified && (
                    <div style={{
                      fontSize: '0.45rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--cognac)',
                      marginTop: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}>
                      ✓ Verified Purchase
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
