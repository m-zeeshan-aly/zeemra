'use client';

import { FormEvent, useState } from 'react';
import './Newsletter.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter subscription section with email validation.
 * Validates email format before submission, shows error/success states,
 * and disables the form during submission to prevent duplicate requests.
 *
 * @component
 * @example
 * <Newsletter />
 *
 * @returns {JSX.Element} Newsletter subscription form with ARIA labels and validation
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }, 800);
  };

  return (
    <section className="newsletter reveal" aria-labelledby="newsletter-heading">
      <p className="section-tag" style={{ color: 'var(--brass-lt)', justifyContent: 'center' }}>
        Members Only
      </p>
      <h2 className="newsletter-title" id="newsletter-heading">
        Join the <em>ZEEMRA</em> Circle
      </h2>
      <p className="newsletter-sub">
        Early access to new collections · Exclusive member discounts · Stories from our Sialkot atelier
      </p>
      <form
        className="newsletter-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Newsletter subscription form"
      >
        <div className="newsletter-field">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            className={`newsletter-input${error ? ' newsletter-input--error' : ''}`}
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            aria-required="true"
            aria-describedby={error ? 'newsletter-error' : undefined}
            aria-invalid={!!error}
            disabled={isSubmitting || submitted}
          />
          <button
            type="submit"
            className="newsletter-btn"
            disabled={isSubmitting || submitted}
            aria-label={submitted ? 'Subscribed successfully' : isSubmitting ? 'Subscribing...' : 'Subscribe to newsletter'}
          >
            {submitted ? '✓ Subscribed!' : isSubmitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </div>
        {error && (
          <p id="newsletter-error" className="newsletter-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {submitted && (
          <p className="newsletter-success" role="status" aria-live="polite">
            🎉 Thank you! You&apos;re now part of the ZEEMRA Circle.
          </p>
        )}
      </form>
    </section>
  );
}