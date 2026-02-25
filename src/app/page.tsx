'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
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
      <FeaturedProducts />
      <BrandStory />
      <CraftStrip />
      <Testimonials />
      <Newsletter />
    </>
  );
}
