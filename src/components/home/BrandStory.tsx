'use client';

import Link from 'next/link';
import './BrandStory.css';

export default function BrandStory() {
  return (
    <section className="story-section">
      <div className="story-visual">
        <div className="story-visual-inner">
          <div className="story-visual-icon">🏭</div>
          <p className="story-visual-text">Est. 2024<br/>Sialkot, Pakistan</p>
        </div>
      </div>
      <div className="story-content">
        <p className="story-tag">Our Heritage</p>
        <h2 className="story-heading">
          Where <em>Six Centuries</em><br/>
          of Craft Meet<br/>
          Modern Europe
        </h2>
        <p className="story-body">
          ZEEMRA was born from one unwavering belief: that the finest leather goods in the world deserve to be known everywhere. Sialkot has supplied leather to the world&apos;s greatest brands for over six hundred years, yet the city&apos;s own names rarely graced the labels.
          <br/><br/>
          We changed that. Every ZEEMRA piece is hand-cut, hand-stitched, and finished by master artisans in our Sialkot atelier, then shipped directly to your door in Europe. No middlemen. No markups. Just honest craft at an honest price.
        </p>
        <Link href="/about" className="btn-outline" style={{color: 'var(--brass)', borderColor: 'var(--brass)'}}>
          Read Our Story
        </Link>
        <div className="story-founders">
          <div className="founder-item">
            <p className="founder-name">Zeeshan</p>
            <p className="founder-role">Co-founder &amp; Craft Director</p>
          </div>
        </div>
      </div>
    </section>
  );
}