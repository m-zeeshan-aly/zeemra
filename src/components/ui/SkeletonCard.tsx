/**
 * SkeletonCard component displays a skeleton/placeholder loader for product cards.
 * Used during loading states to provide visual feedback with pulsing animation.
 * 
 * @component
 * @example
 * <SkeletonCard />
 * 
 * @returns {JSX.Element} Skeleton loader with pulsing animation
 */
export default function SkeletonCard() {
  return (
    <div className="skeleton-card" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
      <div
        style={{
          width: '100%',
          paddingBottom: '125%',
          backgroundColor: '#E8E8E8',
          borderRadius: '8px 8px 0 0',
          marginBottom: '12px',
        }}
      />
      <div
        style={{
          height: '16px',
          backgroundColor: '#E8E8E8',
          borderRadius: '4px',
          marginBottom: '8px',
          width: '80%',
        }}
      />
      <div
        style={{
          height: '12px',
          backgroundColor: '#E8E8E8',
          borderRadius: '4px',
          marginBottom: '12px',
          width: '60%',
        }}
      />
      <div
        style={{
          height: '14px',
          backgroundColor: '#E8E8E8',
          borderRadius: '4px',
          width: '90%',
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
