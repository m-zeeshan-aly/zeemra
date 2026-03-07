'use client';

import { getNewArrivals } from '@/lib/dummy-data';
import ProductSection from './ProductSection';

export default function NewArrivalsSection() {
  const products = getNewArrivals();

  return (
    <ProductSection
      sectionId="new"
      sectionTitle="Fresh From the <em>Atelier</em>"
      sectionSubtitle="The latest pieces from our craftsmen — arriving every two weeks"
      sectionTag="New Arrivals"
      products={products}
      filters={[
        { label: 'All New', value: 'all' },
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
      ]}
      backgroundStyle="light"
      showExpand={true}
    />
  );
}
