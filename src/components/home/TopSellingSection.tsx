'use client';

import { getTopSelling } from '@/lib/dummy-data';
import ProductSection from './ProductSection';

export default function TopSellingSection() {
  const products = getTopSelling();

  return (
    <ProductSection
      sectionId="selling"
      sectionTitle="Top <em>Selling</em>"
      sectionSubtitle="The pieces our customers keep coming back for — proven by thousands of orders"
      sectionTag="Bestsellers"
      products={products}
      filters={[
        { label: 'All', value: 'all' },
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
      ]}
      backgroundStyle="dark"
      showExpand={true}
    />
  );
}
