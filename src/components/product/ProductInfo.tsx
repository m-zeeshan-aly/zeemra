'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import styles from './ProductDetail.module.css';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizeOptions?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  const handleAddToCart = () => {
    setCartMessage('Added to Cart ✓');
    setTimeout(() => setCartMessage(''), 2000);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={styles.infoCol}>
      {/* Provenance */}
      <p className={styles.prodProvenance}>{product.category.split(' · ')[0]}</p>

      {/* Product Name */}
      <h1 className={styles.prodName}>
        {product.name.split(' ').slice(0, -1).join(' ')}
        <br />
        <em>{product.name.split(' ').slice(-1).join(' ')}</em>
      </h1>
      <p className={styles.prodSub}>{product.shortDescription}</p>

      {/* Ratings */}
      <div className={styles.ratingsRow}>
        <div className={styles.starsLg}>★★★★★</div>
        <div className={styles.ratingDetail}>
          <strong>{product.rating}</strong> · {product.reviewCount} verified reviews
        </div>
        <div className={styles.ratingEng}></div>
        <button className={styles.writeReview}>Write a Review</button>
      </div>

      {/* Price */}
      <div className={styles.priceBlock}>
        <span className={styles.priceNow}>€{product.price}</span>
        {product.originalPrice && (
          <>
            <span className={styles.priceWas}>€{product.originalPrice}</span>
            <span className={styles.priceSave}>Save {discountPercent}%</span>
          </>
        )}
        <p className={styles.priceNote}>
          Price includes EU import duties. Free shipping on orders above €150.
        </p>
      </div>

      <div className={styles.divider}></div>

      {/* Stock */}
      <div className={styles.stockBar}>
        <div className={styles.stockDot}></div>
        <p className={styles.stockText}>
          <strong>{product.inStock ? 'In Stock' : 'Out of Stock'}</strong>
          {product.stockCount && product.inStock && ` — ${product.stockCount} units remaining in your size`}
        </p>
      </div>

      {/* Color Selection */}
      {product.colorOptions && product.colorOptions.length > 0 && (
        <>
          <p className={styles.optLabel}>
            Colour — <strong>{selectedColor?.name || 'Select Color'}</strong>
          </p>
          <div className={styles.colorGrid}>
            {product.colorOptions.map((color) => (
              <button
                key={color.code}
                className={`${styles.colorOpt} ${
                  selectedColor?.code === color.code ? styles.active : ''
                }`}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color.name}`}
                title={color.name}
              >
                <div
                  className={styles.colorSwatchLg}
                  style={{ backgroundColor: color.hex }}
                ></div>
                <span className={styles.colorTooltip}>{color.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Size Selection */}
      {product.sizeOptions && product.sizeOptions.length > 0 && (
        <>
          <p className={styles.optLabel}>
            Size — <strong>{selectedSize?.size || 'Select Size'}</strong>
          </p>
          <div className={styles.sizeGrid}>
            {product.sizeOptions.map((size) => (
              <button
                key={size.size}
                className={`${styles.sizeBtn} ${
                  selectedSize?.size === size.size ? styles.active : ''
                } ${!size.inStock ? styles.soldOut : ''}`}
                onClick={() => size.inStock && setSelectedSize(size)}
                disabled={!size.inStock}
                aria-label={`Select size ${size.size}`}
              >
                {size.label}
              </button>
            ))}
          </div>
          <button className={styles.sizeGuideLink}>Size Guide</button>
        </>
      )}

      {/* Quantity */}
      <div className={styles.qtyRow}>
        <span className={styles.qtyLabel}>Quantity</span>
        <div className={styles.qtyCtrl}>
          <button
            className={styles.qtyBtn}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div className={styles.qtyNumDisplay}>{quantity}</div>
          <button
            className={styles.qtyBtn}
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={styles.ctaRow}>
        <button className={styles.btnCart} onClick={handleAddToCart}>
          <span>🛍</span> {cartMessage || 'Add to Cart'}
        </button>
        <button
          className={`${styles.btnWish} ${isWishlisted ? styles.active : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <button className={styles.btnBuy}>⚡ Buy It Now</button>

      {/* Trust Badges */}
      <div className={styles.trustRow}>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>🚚</div>
          <div className={styles.trustText}>
            Free EU
            <br />
            Shipping
          </div>
        </div>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>↩️</div>
          <div className={styles.trustText}>
            30-Day
            <br />
            Returns
          </div>
        </div>
        <div className={styles.trustItem}>
          <div className={styles.trustIcon}>🔒</div>
          <div className={styles.trustText}>
            Secure
            <br />
            Payment
          </div>
        </div>
      </div>

      {/* Share */}
      <div className={styles.shareRow}>
        <span className={styles.shareLabel}>Share</span>
        <div className={styles.shareBtns}>
          <button className={styles.shareBtn} aria-label="Share on LinkedIn">
            in
          </button>
          <button className={styles.shareBtn} aria-label="Share on Instagram">
            ig
          </button>
          <button className={styles.shareBtn} aria-label="Share on Facebook">
            fb
          </button>
          <button className={styles.shareBtn} aria-label="Share via Email">
            ✉
          </button>
        </div>
      </div>
    </div>
  );
}
