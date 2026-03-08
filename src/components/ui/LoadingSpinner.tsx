/**
 * LoadingSpinner component displays an animated loading indicator.
 * Used during data fetching or filtering operations to indicate loading state.
 * 
 * @component
 * @example
 * <LoadingSpinner />
 * 
 * @returns {JSX.Element} Spinning loader animation
 */
export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid #E8E8E8',
          borderTop: '3px solid #C9A96E',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      >
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
