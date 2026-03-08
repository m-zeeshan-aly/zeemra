import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/dummy-data';

// Mock the context
const mockAddToWishlist = jest.fn();
const mockRemoveFromWishlist = jest.fn();

jest.mock('@/lib/context', () => ({
  useApp: () => ({
    wishedItems: [],
    addToWishlist: mockAddToWishlist,
    removeFromWishlist: mockRemoveFromWishlist,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={products[0]} />);
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
  });

  it('calls onAddToCart when button clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={products[0]} onAddToCart={mockAddToCart} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(products[0]);
  });

  it('calls addToWishlist when heart is clicked and item is not wished', () => {
    render(<ProductCard product={products[0]} />);
    fireEvent.click(screen.getByText('♡'));
    expect(mockAddToWishlist).toHaveBeenCalledWith(products[0].id);
  });
});
