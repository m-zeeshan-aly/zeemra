'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.id = 'cursor';
    document.body.appendChild(cursor);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.id = 'cursorRing';
    document.body.appendChild(ring);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      }, 80);
    };

    const handleMouseEnter = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = '#C9A96E';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = '#C9A96E';
    };

    const handleMouseLeave = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.background = '#7C3A2D';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = '#C9A96E';
    };

    document.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      'a, button, .product-card, .gender-card, .craft-item, .payment-method, .search-tag'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      cursor.remove();
      ring.remove();
    };
  }, []);

  return null;
}
