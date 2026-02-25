'use client';

import { useState, useEffect } from 'react';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide announcement when user scrolls down more than 50px
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`announce-bar ${isVisible ? 'visible' : 'hidden'}`}>
      🌍 &nbsp; Free Shipping to Europe on orders above €150 &nbsp;·&nbsp; Handcrafted in Sialkot, Pakistan &nbsp;·&nbsp; 30-Day Returns
    </div>
  );
}
