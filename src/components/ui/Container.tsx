import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Container({
  children,
  maxWidth = '1200px',
  className = '',
  style,
}: ContainerProps) {
  return (
    <div
      className={`container ${className}`}
      style={{
        maxWidth,
        margin: '0 auto',
        padding: '0 2rem',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
