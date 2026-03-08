'use client';

import dynamic from 'next/dynamic';
import { useScrollReveal } from '@/lib/useScrollReveal';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedSection from '@/components/home/FeaturedSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import TopSellingSection from '@/components/home/TopSellingSection';
import TopRatedSection from '@/components/home/TopRatedSection';
import ExclusiveSection from '@/components/home/ExclusiveSection';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Task 14: Lazy-load below-the-fold sections for better performance
const BrandStory = dynamic(() => import('@/components/home/BrandStory'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
const CraftStrip = dynamic(() => import('@/components/home/CraftStrip'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
const Newsletter = dynamic(() => import('@/components/home/Newsletter'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

/**
 * HomePage is the root page of the ZEEMRA application.
 * Renders all home page sections with scroll reveal animations.
 * Below-the-fold sections are lazy-loaded for improved performance.
 *
 * @returns {JSX.Element} The complete home page layout
 */
export default function HomePage() {
  useScrollReveal();

  return (
    // Task 8: Use CSS variable instead of hardcoded inline style
    <div className="home-page">
      <Hero />
      <Categories />
      <FeaturedSection />
      <NewArrivalsSection />
      <TopSellingSection />
      <TopRatedSection />
      <ExclusiveSection />
      <BrandStory />
      <CraftStrip />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
