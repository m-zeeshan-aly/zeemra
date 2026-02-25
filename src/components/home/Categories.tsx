import Link from 'next/link';
import './Categories.css';

export default function Categories() {
  return (
    <>
      <div className="section-header reveal">
        <p className="section-tag">Browse by Category</p>
        <h2 className="section-title">
          Crafted for <em>Everyone</em>
        </h2>
      </div>

      <div className="gender-grid reveal">
        {/* MEN */}
        <div className="gender-card men">
          <div className="gender-card-bg gc-men-bg">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              style={{ opacity: 0.06 }}
            >
              <pattern
                id="stitchM"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="#C9A96E"
                  strokeWidth="0.5"
                  strokeDasharray="3 5"
                />
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="20"
                  stroke="#C9A96E"
                  strokeWidth="0.5"
                  strokeDasharray="3 5"
                />
              </pattern>
              <rect width="400" height="400" fill="url(#stitchM)" />
            </svg>
          </div>
          <div className="gc-count">
            <p className="gc-count-num">74</p>
            <p className="gc-count-label">Products</p>
          </div>
          <div className="gender-card-content">
            <p className="gc-eyebrow">Men&apos;s Collection</p>
            <h3 className="gc-title">
              For the<br />
              Modern Man
            </h3>
            <div className="gc-items">
              <span className="gc-tag">Jackets</span>
              <span className="gc-tag">Wallets</span>
              <span className="gc-tag">Belts</span>
              <span className="gc-tag">Shoes</span>
            </div>
            <Link href="/men" className="gc-cta">
              Explore Collection
              <span className="gc-arrow"></span>
            </Link>
          </div>
        </div>

        {/* WOMEN */}
        <div className="gender-card women">
          <div className="gender-card-bg gc-women-bg">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              style={{ opacity: 0.06 }}
            >
              <pattern
                id="stitchW"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="15" cy="15" r="8" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
                <circle cx="0" cy="0" r="3" stroke="#C9A96E" strokeWidth="0.4" fill="none" />
                <circle cx="30" cy="30" r="3" stroke="#C9A96E" strokeWidth="0.4" fill="none" />
              </pattern>
              <rect width="400" height="400" fill="url(#stitchW)" />
            </svg>
          </div>
          <div className="gc-count">
            <p className="gc-count-num">85</p>
            <p className="gc-count-label">Products</p>
          </div>
          <div className="gender-card-content">
            <p className="gc-eyebrow">Women&apos;s Collection</p>
            <h3 className="gc-title">
              For the<br />
              Bold Woman
            </h3>
            <div className="gc-items">
              <span className="gc-tag">Bags</span>
              <span className="gc-tag">Jackets</span>
              <span className="gc-tag">Wallets</span>
              <span className="gc-tag">Shoes</span>
            </div>
            <Link href="/women" className="gc-cta">
              Explore Collection
              <span className="gc-arrow"></span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
