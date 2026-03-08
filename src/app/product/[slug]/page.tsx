import { Metadata } from 'next';
import { getProductBySlug } from '@/lib/dummy-data';
import ProductDetailPage from '@/components/product/ProductDetailsPage';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Task 12: generateMetadata produces product-specific SEO meta tags server-side.
 * Each product page gets unique title, description, and Open Graph tags for social sharing.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | ZEEMRA',
      description: 'The product you are looking for could not be found.',
    };
  }

  const title = `${product.name} | ZEEMRA`;
  const description = `${product.name} — ${product.category}. ${product.origin || 'Premium handcrafted leather goods from Sialkot.'}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.imageUrl
        ? [{ url: product.imageUrl, alt: product.name }]
        : [],
      type: 'website',
      siteName: 'ZEEMRA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  return <ProductDetailPage slug={slug} />;
}
