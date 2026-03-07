'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import styles from './ProductDetail.module.css';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const images = product.productImages || [
    { emoji: product.emoji, label: product.shortDescription || 'Product Image' },
  ];

  const currentImage = images[currentImageIdx];

  const handleThumbnailClick = (idx: number) => {
    setCurrentImageIdx(idx);
  };

  const handleZoomNav = (direction: number) => {
    const nextIdx = (currentImageIdx + direction + images.length) % images.length;
    setCurrentImageIdx(nextIdx);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(1, Math.min(3, zoomScale - e.deltaY * 0.002));
    setZoomScale(newScale);
  };

  return (
    <div className={styles.galleryCol}>
      {/* Thumbnail Strip */}
      <div className={styles.thumbStrip}>
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`${styles.thumb} ${idx === currentImageIdx ? styles.active : ''}`}
            onClick={() => handleThumbnailClick(idx)}
            aria-label={`View image ${idx + 1}`}
          >
            {img.emoji}
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        className={styles.mainImageWrap}
        onClick={() => setIsZoomOpen(true)}
        role="button"
        tabIndex={0}
      >
        <div className={styles.mainImageInner}>
          <div
            className={styles.mainEmoji}
            style={{
              fontSize: '13rem',
            }}
          >
            {currentImage.emoji}
          </div>
        </div>
        <div className={styles.imgLabel}>{currentImage.label}</div>
        <div className={styles.imgCounter}>
          {currentImageIdx + 1} / {images.length}
        </div>
        <div className={styles.zoomIcon} title="Click to zoom">
          ⊕
        </div>
      </div>

      {/* Zoom Modal */}
      <div
        className={`${styles.zoomOverlay} ${isZoomOpen ? styles.open : ''}`}
        onClick={() => isZoomOpen && setIsZoomOpen(false)}
      >
        <div className={styles.zoomContent} onWheel={handleWheel}>
          <div
            className={styles.zoomEmoji}
            style={{
              transform: `scale(${zoomScale})`,
            }}
          >
            {currentImage.emoji}
          </div>
        </div>
        <button
          className={styles.zoomClose}
          onClick={() => setIsZoomOpen(false)}
          aria-label="Close zoom"
        >
          ✕
        </button>
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.52rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(201, 169, 110, 0.5)',
        }}>
          Scroll or pinch to zoom · Click outside to close
        </div>
        <div style={{
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 2rem',
          pointerEvents: 'none',
        }}>
          <button
            className={styles.zoomClose}
            onClick={() => handleZoomNav(-1)}
            style={{ pointerEvents: 'all' }}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            className={styles.zoomClose}
            onClick={() => handleZoomNav(1)}
            style={{ pointerEvents: 'all' }}
            aria-label="Next image"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
