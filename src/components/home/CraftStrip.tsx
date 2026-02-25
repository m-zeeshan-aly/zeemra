'use client';

import './CraftStrip.css';

interface CraftItem {
  icon: string;
  name: string;
  desc: string;
}

const craftItems: CraftItem[] = [
  {
    icon: '🐄',
    name: 'Full-Grain Only',
    desc: 'We use exclusively full-grain and vegetable-tanned hides. The strongest, most beautiful leather that ages like no other.',
  },
  {
    icon: '🧵',
    name: 'Hand-Stitched',
    desc: 'Every seam is stitched by hand using waxed linen thread by craftsmen with decades of experience in Sialkot.',
  },
  {
    icon: '🌍',
    name: 'Direct to Europe',
    desc: 'We ship from our atelier directly to your door. No retail markup. No middlemen. Just craft and fair value.',
  },
  {
    icon: '♻️',
    name: 'Ethically Made',
    desc: 'Fair wages, safe working conditions, and no chrome tanning. We believe luxury should never cost the earth.',
  },
];

export default function CraftStrip() {
  return (
    <section className="craft-strip">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="section-tag">Why ZEEMRA</p>
        <h2 className="section-title">
          The <em>ZEEMRA</em> Promise
        </h2>
      </div>
      <div className="craft-grid">
        {craftItems.map((item, idx) => (
          <div key={idx} className="craft-item reveal">
            <span className="craft-icon">{item.icon}</span>
            <p className="craft-name">{item.name}</p>
            <p className="craft-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}