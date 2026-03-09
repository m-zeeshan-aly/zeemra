import { Product } from '@/types/product';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import Image from 'next/image';
import Link from 'next/link';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

/**
 * ProductCard component displays a single product with image, details, and add-to-cart button.
 * Features image error fallback with emoji, product badge, and wishlist stub button.
 * 
 * @component
 * @example
 * <ProductCard product={productData} onAddToCart={handleAddToCart} />
 * 
 * @param {ProductCardProps} props - Component props
 * @param {Product} props.product - Product data object containing name, price, image URL, etc.
 * @param {Function} [props.onAddToCart] - Callback function triggered when add to cart button is clicked
 * @returns {JSX.Element} Product card UI with image, details, and action buttons
 */
export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const { wishedItems, addToWishlist, removeFromWishlist } = useApp();
  const productLink = `/product/${product.slug || product.id}`;
  const isWished = wishedItems?.includes(product.id) || false;

  return (
    <Link href={productLink}>
      <div className="product-card reveal">
        <div className="product-image">
          {!imageError ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              className="product-img"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="product-image-bg">
              <div className="product-emoji-fallback">{product.emoji}</div>
            </div>
          )}
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <button 
            className="product-wish" 
            onClick={(e) => {
              e.preventDefault();
              if (isWished) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product.id);
              }
            }}
          >
            {isWished ? '❤️' : '♡'}
          </button>
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
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
