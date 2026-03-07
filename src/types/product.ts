export type Badge = 'Bestseller' | 'New' | 'Sale' | 'Hot' | 'Rated' | 'Limited';

export type SectionType = 'featured' | 'new' | 'selling' | 'rated' | 'exclusive';

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
  reviews: number;
  
  // Section-specific properties
  sections?: SectionType[]; // Which sections this product appears in
  rank?: number; // For top-selling section (1-8)
  ratingNum?: number; // Numeric rating for top-rated section
  colors?: string[]; // Color swatches
  isLimited?: boolean; // For exclusive section
};
