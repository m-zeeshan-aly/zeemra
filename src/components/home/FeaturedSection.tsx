'use client';

import { getProductsBySection } from '@/lib/dummy-data';
import ProductSection from './ProductSection';

export default function FeaturedSection() {
  const products = getProductsBySection('featured');

  return (
    <ProductSection
      sectionId="featured"
      sectionTitle="Our <em>Collection</em>"
      sectionSubtitle="Full-grain leather, ethically made in Sialkot — built for a lifetime"
      sectionTag="Handcrafted Leather"
      products={products}
      filters={[
        { label: 'All', value: 'all' },
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Jackets', value: 'jacket' },
        { label: 'Wallets', value: 'wallet' },
        { label: 'Bags', value: 'bag' },
      ]}
      backgroundStyle="light"
      showExpand={true}
    />
  );
}
