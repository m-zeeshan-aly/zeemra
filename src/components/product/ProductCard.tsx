import { Product } from '@/types/product';
import { useState } from 'react';
import Image from 'next/image';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="product-card reveal">
      <div className="product-image">
        {!imageError ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name}
            className="product-img"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="product-image-bg">
            <div className="product-emoji-fallback">{product.emoji}</div>
          </div>
        )}
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="product-wish">♡</button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-origin">{product.origin}</p>
        <div className="product-footer">
          <p className="product-price">
            €{product.price} <span>EUR</span>
          </p>
          <button 
            className="product-add"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
