import { Product } from '@/types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card reveal">
      <div className="product-image">
        <div className="product-image-bg"></div>
        <div className="product-emoji">{product.emoji}</div>
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
