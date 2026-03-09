import './about.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        {/* Decorative geo */}
        <div className="about-hero-geo" style={{ position: 'absolute', right: '8%', top: '15%', opacity: 0.06 }}>
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" stroke="#C9A96E" strokeWidth="1" />
            <circle cx="200" cy="200" r="120" stroke="#C9A96E" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="60" stroke="#7C3A2D" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#C9A96E" strokeWidth="0.5" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#C9A96E" strokeWidth="0.5" />
            <rect x="70" y="70" width="260" height="260" stroke="#C9A96E" strokeWidth="0.5" transform="rotate(45 200 200)" />
          </svg>
        </div>
        <div className="about-hero-content">
          <p className="about-eyebrow">Our Story</p>
          <h1 className="about-hero-title">
            Craft Has<br />
            <em>Always Been</em><br />
            Our Language
          </h1>
        </div>
      </section>

      {/* Opening statement */}
      <div style={{ background: 'var(--parchment)', padding: '5rem 6rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--sienna)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          &ldquo;We didn&apos;t set out to start a leather brand. We set out to give Sialkot — and its six hundred years of mastery — the name it always deserved.&rdquo;
        </p>
        <div style={{ width: '40px', height: '1px', background: 'var(--brass)', margin: '2rem auto' }}></div>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--oak)' }}>Zeeshan, Founder</p>
      </div>

      {/* Timeline */}
      <div className="about-timeline">
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--cognac)', marginBottom: '0.5rem' }}>How We Got Here</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--night)', marginBottom: '4rem' }}>The <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>ZEEMRA</em> Journey</h2>

        <div className="timeline-item reveal visible">
          <div className="timeline-year">1400s</div>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <p className="timeline-tag">The Beginning</p>
            <h3 className="timeline-heading">Sialkot Begins Its Leather Legacy</h3>
            <p className="timeline-body">The city of Sialkot in present-day Pakistan establishes itself as a centre of artisanal leather craft under the Mughal empire. Craftsmen pass down techniques across generations — techniques that survive to this day in our atelier&apos;s work.</p>
          </div>
        </div>

        <div className="timeline-item reveal visible">
          <div className="timeline-year">1980s</div>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <p className="timeline-tag">Global Reach</p>
            <h3 className="timeline-heading">Sialkot Supplies the World&apos;s Biggest Brands</h3>
            <p className="timeline-body">Sialkot becomes the quiet manufacturer behind many of Europe&apos;s most recognisable leather labels. The craft is extraordinary, but the city&apos;s own name stays hidden on the label. Our founders&apos; families are part of this ecosystem — and this frustration plants a seed.</p>
          </div>
        </div>

        <div className="timeline-item reveal visible">
          <div className="timeline-year">2020</div>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <p className="timeline-tag">The Idea</p>
            <h3 className="timeline-heading">Zeeshan Asks: Why Not Our Name?</h3>
            <p className="timeline-body">Growing up in Sialkot — Zeeshan, whose family has run a tannery for three generations, begins sketching a brand that would put Sialkot on the label proudly. ZEEMRA becomes the working title. It sticks.</p>
          </div>
        </div>

        <div className="timeline-item reveal visible">
          <div className="timeline-year">2023</div>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <p className="timeline-tag">Building the Atelier</p>
            <h3 className="timeline-heading">The Workshop Opens Its Doors</h3>
            <p className="timeline-body">ZEEMRA&apos;s dedicated atelier opens in Sialkot with a team of 12 master craftsmen, each with over 15 years of experience. We establish strict quality protocols: only full-grain hides, only hand-stitching with waxed linen thread, zero chrome tanning. Every piece must be approved before it ships.</p>
          </div>
        </div>

        <div className="timeline-item reveal visible">
          <div className="timeline-year">2024</div>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <p className="timeline-tag">ZEEMRA Launches</p>
            <h3 className="timeline-heading">Born in Sialkot. Worn by the World.</h3>
            <p className="timeline-body">ZEEMRA officially launches with its first collection of 40 pieces across jackets, wallets, belts and shoes. Within three months, orders arrive from Germany, Italy, the Netherlands, France and Poland. The city of Sialkot finally has its own luxury name — and it belongs to the world.</p>
          </div>
        </div>

      </div>

      {/* Values */}
      <section className="about-values">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '0.5rem', textAlign: 'center' }}>What Drives Us</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 300, color: 'var(--parchment)', textAlign: 'center' }}>Our <em style={{ fontStyle: 'italic', color: 'var(--brass)' }}>Core Values</em></h2>
          <div className="values-grid">
            <div className="value-item">
              <p className="value-num">01</p>
              <span className="value-icon">🐄</span>
              <p className="value-name">Uncompromising Quality</p>
              <p className="value-desc">We use only the top layer of the hide — full-grain leather that shows its natural character, develops a beautiful patina, and lasts a lifetime. We will never use bonded or corrected-grain leather.</p>
            </div>
            <div className="value-item">
              <p className="value-num">02</p>
              <span className="value-icon">🧵</span>
              <p className="value-name">Master Craftsmanship</p>
              <p className="value-desc">Every piece is crafted by artisans with decades of experience. From hand-stitching to meticulous edge finishing, we preserve traditional techniques that machines simply cannot replicate.</p>
            </div>
            <div className="value-item">
              <p className="value-num">03</p>
              <span className="value-icon">♻️</span>
              <p className="value-name">Ethical Production</p>
              <p className="value-desc">We own our atelier, ensuring fair wages, safe conditions, and sustainable practices. We favor vegetable tanning and avoid harsh chemicals to protect both our workers and the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier */}
      <section className="about-atelier reveal visible">
        <div className="atelier-inner">
          <div className="atelier-visual">
            <div className="atelier-visual-icon">🏛️</div>
            <p className="atelier-visual-caption">The ZEEMRA Atelier</p>
          </div>
          <div className="atelier-content">
            <p className="atelier-text-tag">Our Workshop</p>
            <h2 className="atelier-heading">The Heart of <em>ZEEMRA</em></h2>
            <p className="atelier-body">
              Unlike brands that outsource to anonymous factories, we built our own atelier in Sialkot. This gives us complete control over quality and allows us to provide an exceptional working environment for our artisans. It’s a place where six centuries of leatherworking history inform every modern creation. We invite you to experience the difference.
            </p>
            <div className="atelier-stats">
              <div>
                <p className="atelier-stat-num">12</p>
                <p className="atelier-stat-label">Master Artisans</p>
              </div>
              <div>
                <p className="atelier-stat-num">100%</p>
                <p className="atelier-stat-label">In-House Production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
