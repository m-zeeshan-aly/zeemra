import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  style,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
