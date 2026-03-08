'use client';

import './Testimonials.css';

interface Testimonial {
  text: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    text: 'The jacket is absolutely incredible. The leather quality rivals brands that charge three times the price. You can feel the craftsmanship in every stitch.',
    author: 'Marco B.',
    location: 'Milan, Italy · Verified Purchase',
    avatar: 'M',
    rating: 5,
  },
  {
    text: 'I&apos;ve bought luxury leather bags for years. My ZEEMRA tote stands up to all of them — and knowing it came directly from the artisan makes it so much more special.',
    author: 'Sophie K.',
    location: 'Amsterdam, Netherlands · Verified Purchase',
    avatar: 'S',
    rating: 5,
  },
  {
    text: 'Fast shipping, beautiful packaging, and the wallet is even better in person. Already ordered two more as gifts. ZEEMRA will be my go-to leather brand.',
    author: 'Lukas H.',
    location: 'Berlin, Germany · Verified Purchase',
    avatar: 'L',
    rating: 5,
  },
];

/**
 * Testimonials section displays customer reviews from verified European purchasers.
 * Renders a responsive grid of review cards with star ratings and author details.
 *
 * @component
 * @example
 * <Testimonials />
 *
 * @returns {JSX.Element} Customer testimonials grid section
 */
export default function Testimonials() {
  return (
    <section className="testimonials">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="section-tag">Customer Reviews</p>
        <h2 className="section-title">
          Loved Across <em>Europe</em>
        </h2>
      </div>
      <div className="testimonial-grid reveal">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-stars">{'★'.repeat(testimonial.rating)}</div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">{testimonial.avatar}</div>
              <div>
                <p className="author-name">{testimonial.author}</p>
                <p className="author-location">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}