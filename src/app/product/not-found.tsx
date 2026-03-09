import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404 - Product Not Found</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
        The product you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/shop" style={{ 
        padding: '12px 24px', 
        backgroundColor: '#C9A96E', 
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        Continue Shopping
      </Link>
    </div>
  );
}
