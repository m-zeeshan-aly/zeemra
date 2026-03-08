'use client';

import { getTopRated } from '@/lib/dummy-data';
import ProductSection from './ProductSection';

export default function TopRatedSection() {
  const products = getTopRated();

  return (
    <ProductSection
      sectionId="rated"
      sectionTitle="Top <em>Rated</em>"
      sectionSubtitle="Rated 4.8 stars and above — handpicked by the ZEEMRA community"
      sectionTag="Customer Favorites"
      products={products}
      filters={[
        { label: 'All', value: 'all' },
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
      ]}
      backgroundStyle="light"
      showExpand={true}
      pageUrl="/shop/top-rated"
    />
  );
}
