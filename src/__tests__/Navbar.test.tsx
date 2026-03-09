import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';

// Mock the context
jest.mock('@/lib/context', () => ({
  useApp: () => ({
    cartOpen: false,
    setCartOpen: jest.fn(),
    cartItems: [{ id: '1', name: 'Item', price: 10, quantity: 1 }],
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Navbar', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'Women' })).toBeInTheDocument();
  });

  it('shows cart badge with correct item count', () => {
    render(<Navbar />);
    expect(screen.getByText('1', { selector: '.cart-badge' })).toBeInTheDocument();
  });

  it('opens search bar when search icon is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByTitle('Search'));
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });
});
