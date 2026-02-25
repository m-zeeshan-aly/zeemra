'use client';

import { FormEvent, useState } from 'react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="newsletter reveal">
      <p className="section-tag" style={{ color: 'var(--brass-lt)', justifyContent: 'center' }}>
        Members Only
      </p>
      <h2 className="newsletter-title">
        Join the <em>ZEEMRA</em> Circle
      </h2>
      <p className="newsletter-sub">
        Early access to new collections · Exclusive member discounts · Stories from our Sialkot atelier
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="newsletter-btn">
          {submitted ? '✓ Subscribed!' : 'Subscribe'}
        </button>
      </form>
    </section>
  );
}