'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedSection from "@/components/home/FeaturedSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import TopSellingSection from "@/components/home/TopSellingSection";
import TopRatedSection from "@/components/home/TopRatedSection";
import ExclusiveSection from "@/components/home/ExclusiveSection";
import BrandStory from "@/components/home/BrandStory";
import CraftStrip from "@/components/home/CraftStrip";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  useScrollReveal();

  return (
    <>
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
    </>
  );
}
