'use client';

import React, { ReactNode, ErrorInfo } from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Optionally reload the page or navigate back
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f8f8',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              We&apos;re sorry for the inconvenience. An unexpected error occurred.
              Please try refreshing the page or click the button below.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details
                style={{
                  marginBottom: '20px',
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: '#666',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              style={{
                padding: '10px 24px',
                backgroundColor: '#C9A96E',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#B8975A';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#C9A96E';
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
