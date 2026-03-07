'use client';

import { products } from '@/lib/dummy-data';
import ProductSection from './ProductSection';

export default function ExclusiveSection() {
  // Get high-priced and special products for exclusive section
  const exclusiveProducts = products
    .filter((p) => p.price > 200)
    .sort((a, b) => b.price - a.price)
    .slice(0, 12);

  return (
    <ProductSection
      sectionId="exclusive"
      sectionTitle="Exclusive <em>Pieces</em>"
      sectionSubtitle="Rare materials, limited runs — crafted for the discerning collector"
      sectionTag="Limited Edition"
      products={exclusiveProducts}
      filters={[
        { label: 'All', value: 'all' },
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
      ]}
      backgroundStyle="accent"
      showExpand={true}
      pageUrl="/shop/exclusive"
    />
  );
}
