'use client';

import { use } from 'react';
import ProductDetailPage from '@/components/product/ProductDetailsPage';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  return <ProductDetailPage slug={slug} />;
}
