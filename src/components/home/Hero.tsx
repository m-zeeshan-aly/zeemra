import Link from 'next/link';
import './Hero.css';

/**
 * Hero section — the main above-the-fold landing area for the ZEEMRA home page.
 * Displays the brand tagline, decorative SVG geometry, CTA buttons, and a stats bar.
 *
 * @component
 * @example
 * <Hero />
 *
 * @returns {JSX.Element} Full-viewport hero section with brand headline and statistics strip
 */
export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg"></div>

        {/* Decorative SVG geometry */}
        <div className="hero-geo">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="60" width="380" height="380" stroke="#C9A96E" strokeWidth="0.5" opacity="0.12"/>
            <rect x="100" y="100" width="300" height="300" stroke="#C9A96E" strokeWidth="0.5" opacity="0.08"
                  transform="rotate(45 250 250)"/>
            <circle cx="250" cy="250" r="180" stroke="#C9A96E" strokeWidth="0.4" opacity="0.07"/>
            <circle cx="250" cy="250" r="120" stroke="#7C3A2D" strokeWidth="0.5" opacity="0.15"/>
            <text x="250" y="275" fontFamily="Cormorant Garamond, serif" fontSize="120"
                  fill="#7C3A2D" opacity="0.08" textAnchor="middle" fontWeight="300">Z</text>
            <line x1="60" y1="250" x2="440" y2="250" stroke="#C9A96E" strokeWidth="0.3"
                  strokeDasharray="4 8" opacity="0.1"/>
            <line x1="250" y1="60" x2="250" y2="440" stroke="#C9A96E" strokeWidth="0.3"
                  strokeDasharray="4 8" opacity="0.1"/>
          </svg>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">New Collection 2025</p>
          <h1 className="hero-title">
            Born in<br/>Sialkot.
            <em><br/>Worn by<br/>the World.</em>
          </h1>
          <p className="hero-desc">
            Six centuries of leather mastery from Pakistan&apos;s craft capital, reimagined for the modern European wardrobe. Every stitch tells a story.
          </p>
          <div className="hero-ctas">
            <Link href="/men" className="btn-primary">Shop Men</Link>
            <Link href="/women" className="btn-outline">Shop Women</Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item">
          <p className="stat-num">600+</p>
          <p className="stat-label">Years of Craft</p>
        </div>
        <div className="stat-item">
          <p className="stat-num">12</p>
          <p className="stat-label">EU Countries</p>
        </div>
        <div className="stat-item">
          <p className="stat-num">4.9★</p>
          <p className="stat-label">Avg. Rating</p>
        </div>
        <div className="stat-item">
          <p className="stat-num">100%</p>
          <p className="stat-label">Full-Grain Leather</p>
        </div>
      </div>
    </>
  );
}
