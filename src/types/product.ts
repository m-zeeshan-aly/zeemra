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
  emoji: string;
  badge?: 'Bestseller' | 'New' | 'Sale';
  rating: number;
  reviews: number;
};
