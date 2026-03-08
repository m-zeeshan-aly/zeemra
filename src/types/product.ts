export type Badge = 'Bestseller' | 'New' | 'Sale' | 'Hot' | 'Rated' | 'Limited';

export type SectionType = 'featured' | 'new' | 'selling' | 'rated' | 'exclusive';

export type ColorOption = {
  name: string;
  hex: string;
  code?: string;
};

export type SizeOption = {
  size: string;
  label: string;
  measurements?: string;
  inStock: boolean;
};

export type Review = {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
};

export type ProductFeature = {
  icon: string;
  title: string;
  description: string;
};

export type ProductAccordion = {
  title: string;
  content: string | string[] | { [key: string]: string };
};

export type ProductImage = {
  emoji: string;
  label: string;
  description?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  gender: 'men' | 'women';
  type: 'jacket' | 'wallet' | 'belt' | 'shoe' | 'bag';
  price: number;
  originalPrice?: number;
  origin: string;
  leather: string;
  imageUrl: string;
  emoji: string;
  badge?: Badge;
  rating: number;
  reviewCount: number;
  
  // Section-specific properties
  sections?: SectionType[]; // Which sections this product appears in
  rank?: number; // For top-selling section (1-8)
  ratingNum?: number; // Numeric rating for top-rated section
  colors?: string[]; // Color swatches (backwards compatibility)
  isLimited?: boolean; // For exclusive section
  
  // Detailed product page properties
  slug?: string;
  description?: string;
  shortDescription?: string;
  inStock?: boolean;
  stockCount?: number;
  colorOptions?: ColorOption[];
  sizeOptions?: SizeOption[];
  productImages?: ProductImage[];
  features?: ProductFeature[];
  accordions?: ProductAccordion[];
  reviews?: Review[];
  relatedProducts?: string[]; // Array of product IDs
  averageRating?: number;
  trustBadges?: string[];
  craftStory?: {
    title: string;
    description: string;
    stats?: { label: string; value: string }[];
  };
};
