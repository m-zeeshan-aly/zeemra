import { render, screen, fireEvent, act } from '@testing-library/react';
import Newsletter from '@/components/home/Newsletter';

jest.useFakeTimers();

describe('Newsletter', () => {
  it('renders correctly', () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
  });

  it('shows error on empty submit', () => {
    render(<Newsletter />);
    fireEvent.click(screen.getByText('Subscribe'));
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
  });

  it('shows error on invalid email', () => {
    render(<Newsletter />);
    const input = screen.getByPlaceholderText('Your email address');
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Subscribe'));
    expect(screen.getByText('Please enter a valid email address (e.g. name@example.com).')).toBeInTheDocument();
  });

  it('simulates successful subscription', async () => {
    render(<Newsletter />);
    const input = screen.getByPlaceholderText('Your email address');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Subscribe'));
    
    expect(screen.getByText('Subscribing…')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('✓ Subscribed!')).toBeInTheDocument();
  });
});
