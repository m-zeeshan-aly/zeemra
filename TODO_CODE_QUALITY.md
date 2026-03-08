# 🛠️ ZEEMRA Code Quality & Improvement Roadmap

## 📊 Project Overview

**Project Name**: ZEEMRA  
**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS  
**Type**: E-commerce Platform (Premium Leather Goods)  
**Current Status**: 7.4/10 - Production-Ready with Minor Improvements Needed

---

## 📈 Professional Code Quality Assessment

### ✅ **Strengths** (What's Well Done)

| Aspect | Rating | Notes |
|--------|--------|-------|
| Architecture | 8.5/10 | Excellent Next.js App Router implementation, proper component structure |
| TypeScript | 9/10 | Strict mode enabled, comprehensive type definitions |
| State Management | 7.8/10 | Context API well-implemented with proper cart operations |
| Code Organization | 8/10 | Clear folder structure, good separation of concerns |
| Performance | 7.5/10 | Good optimizations with lazy loading and memoization |
| Accessibility | 7/10 | ARIA labels added, semantic HTML, keyboard navigation support |
| Documentation | 8/10 | JSDoc comments present, clear component intent |
| Testing | 7/10 | Jest configured, test files for critical functions |
| Error Handling | 6.5/10 | ErrorBoundary exists, generateMetadata for 404s |

### ⚠️ **Overall Grade: 7.4/10** — Production-Ready with Polish Needed

---

## 🎯 Critical Issues & TODO List

### **HIGH PRIORITY** 🔴 (Security/Functionality)

#### 1. ☐ Implement Cart Item Deduplication
**Status**: ❌ NOT STARTED  
**Severity**: HIGH  
**Location**: [src/lib/context.tsx](src/lib/context.tsx#L47)  
**Description**:  
When adding an item that already exists in cart, it's added as a duplicate instead of incrementing quantity. This creates poor UX and confuses users.

**Current Code**:
```typescript
const addToCart = (item: CartItem) => {
  setCartItems([...cartItems, item]);  // ❌ Allows duplicates
};
```

**What needs to be done**:
- Check if item exists in cart before adding
- If exists: increment quantity instead of adding new item
- If new: add to cart with quantity = 1
- Test: Add same item twice, should see quantity increase to 2

**How to verify completion**:
```typescript
// Should work like this:
const addToCart = (item: CartItem) => {
  const exists = cartItems.find(ci => ci.id === item.id);
  if (exists) {
    updateQuantity(item.id, (exists.quantity || 1) + 1);
  } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};
```

---

#### 2. ☐ Add Input Sanitization for Security
**Status**: ❌ NOT STARTED  
**Severity**: HIGH  
**Location**: [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx#L75)  
**Description**:  
Search input accepts any text without sanitization. If connected to backend that renders user input, could be XSS vulnerability.

**What needs to be done**:
- Install `dompurify` package: `npm install dompurify @types/dompurify`
- Sanitize search input before any processing
- Validate email input in Newsletter component
- Prevent script injection in all user inputs

**Code Example**:
```typescript
import DOMPurify from 'dompurify';

const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  const sanitized = DOMPurify.sanitize(e.target.value, { 
    ALLOWED_TAGS: [] 
  });
  setSearchQuery(sanitized);
};
```

**How to verify completion**:
- Try typing `<script>alert('xss')</script>` in search - should be escaped
- Sanitized input still functions for normal searches
- No console warnings about unsafe input

---

#### 3. ☐ Add Remove/Delete Button to Cart Items
**Status**: ❌ NOT STARTED  
**Severity**: HIGH  
**Location**: [src/components/product/CartDrawer.tsx](src/components/product/CartDrawer.tsx#L49)  
**Description**:  
Cart shows quantity controls (+/-) but no way to remove items completely. Users must decrease quantity to 0 which is inconvenient.

**What needs to be done**:
- Add remove/delete button to each cart item
- Place next to or above quantity controls
- Use ✕ or 🗑 emoji for consistency with design
- Call `removeFromCart(item.id)` on click

**Code to Add**:
```typescript
<button 
  className="cart-item-remove"
  onClick={() => removeFromCart(item.id)}
  title="Remove from cart"
  aria-label={`Remove ${item.name} from cart`}
>
  ✕
</button>
```

**CSS to Add**:
```css
.cart-item-remove {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px 8px;
  transition: color var(--transition);
}

.cart-item-remove:hover {
  color: #d32f2f;
}
```

**How to verify completion**:
- Remove button is visible on each cart item
- Clicking removes item from cart
- Cart total updates correctly

---

### **MEDIUM PRIORITY** 🟡 (Code Quality & Best Practices)

#### 4. ☐ Fix Inconsistent Quantity Default Values
**Status**: ❌ NOT STARTED  
**Severity**: MEDIUM  
**Location**: Multiple files - [context.tsx](src/lib/context.tsx), [CartDrawer.tsx](src/components/product/CartDrawer.tsx)  
**Description**:  
Pattern `item.quantity || 1` used repeatedly throughout codebase. Should initialize quantity to 1 by default in CartItem type.

**Current Issue**:
```typescript
// ❌ Repeated in multiple places
const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
<span>{item.quantity || 1}</span>
```

**What needs to be done**:
- Update `CartItem` interface to make quantity non-optional with default
- Remove all `|| 1` fallback patterns
- Ensure all new items are created with `quantity: 1`

**Better Approach**:
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  size?: string;
  color?: string;
  quantity: number;  // ✅ Required, never undefined
}

// When adding to cart:
const newItem: CartItem = { ...item, quantity: 1 };
```

**How to verify completion**:
- No `|| 1` patterns in code
- TypeScript shows error if quantity not provided
- All cart calculations work correctly

---

#### 5. ☐ Add Scroll Event Throttling
**Status**: ❌ NOT STARTED  
**Severity**: MEDIUM  
**Location**: [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx#L25-L36)  
**Description**:  
Scroll event listener fires too frequently (every pixel scrolled), causing unnecessary state updates and re-renders. Should throttle to ~100-200ms intervals.

**Current Code**:
```typescript
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setAnnouncementHidden(true);
    } else {
      setAnnouncementHidden(false);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**What needs to be done**:
- Implement throttle function or use `lodash.throttle`
- Cap scroll event handler to run max once per 200ms
- Consider using `useCallback` with ref-based throttling

**Better Implementation**:
```typescript
useEffect(() => {
  let scrollTimeout: NodeJS.Timeout;
  
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setAnnouncementHidden(window.scrollY > 50);
    }, 100);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(scrollTimeout);
  };
}, []);
```

**How to verify completion**:
- Scroll events in DevTools show max ~10/sec instead of 60+/sec
- Navbar still responds smoothly
- No jank or frame drops

---

#### 6. ☐ Add Product 404 Handling UI
**Status**: 🟡 PARTIAL  
**Severity**: MEDIUM  
**Location**: [src/app/product/[slug]/page.tsx](src/app/product/[slug]/page.tsx)  
**Description**:  
Invalid product slugs return blank/error page. Should show friendly 404 message.

**Current State**:
✅ `generateMetadata()` handles missing products  
❌ Missing: User-facing 404 UI page

**What needs to be done**:
- Create `src/app/product/not-found.tsx` component
- Show helpful 404 message with link back to shop
- Add suggested products from same category

**Code to Create**:
```typescript
// src/app/product/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404 - Product Not Found</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
        The product you're looking for doesn't exist or has been moved.
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
```

**How to verify completion**:
- Navigate to `/product/invalid-slug`
- See friendly 404 message instead of blank page
- "Continue Shopping" link works

---

#### 7. ☐ Replace Hardcoded Magic Numbers with CSS Variables
**Status**: ❌ NOT STARTED  
**Severity**: MEDIUM  
**Location**: Multiple CSS files: Newsletter.css, Navbar.css, ProductCard.css  
**Description**:  
CSS files contain magic numbers instead of using defined variables in `src/styles/variables.css`.

**Examples of Issues**:
```css
/* ❌ CURRENT */
.newsletter { padding: 5rem 4rem; }
.newsletter-title { font-size: 2.5rem; }
.newsletter-form { max-width: 440px; }
.nav { padding: 1.2rem 0; }

/* ✅ SHOULD BE */
.newsletter { padding: var(--spacing-xl) var(--spacing-lg); }
.newsletter-title { font-size: var(--font-size-xl); }
.newsletter-form { max-width: var(--max-width-sm); }
```

**What needs to be done**:
- Add missing CSS variables to [src/styles/variables.css](src/styles/variables.css)
- Replace magic numbers in all component CSS files
- Ensure consistent spacing, sizing, colors across app

**Variables to Add**:
```css
/* Spacing Scale */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;
--spacing-3xl: 4rem;

/* Font Sizes */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.5rem;
--font-size-2xl: 2rem;
--font-size-3xl: 2.5rem;

/* Max Widths */
--max-width-xs: 320px;
--max-width-sm: 440px;
--max-width-md: 640px;
--max-width-lg: 1024px;
--max-width-xl: 1280px;
```

**How to verify completion**:
- No hardcoded numbers > 10px in CSS files
- All spacing uses spacing scale
- Visual appearance unchanged

---

### **LOW PRIORITY** 🟢 (Nice-to-Have Improvements)

#### 8. ☐ Add Image Loading Placeholders/Blur
**Status**: ❌ NOT STARTED  
**Severity**: LOW  
**Location**: [src/components/product/ProductCard.tsx](src/components/product/ProductCard.tsx#L28)  
**Description**:  
Product images load without placeholders, causing layout shift. Next.js `Image` component has built-in placeholder support.

**What needs to be done**:
- Add `placeholder="blur"` prop to Image component
- Add `blurDataURL` with minimal blur image
- Improves Core Web Vitals (CLS score)
- Better perceived performance

**Code to Update**:
```typescript
// ❌ CURRENT
<Image 
  src={product.imageUrl} 
  alt={product.name}
  fill
  onError={() => setImageError(true)}
/>

// ✅ IMPROVED
<Image 
  src={product.imageUrl} 
  alt={product.name}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJ..." // Minimal blur image
  fill
  onError={() => setImageError(true)}
/>
```

**How to verify completion**:
- Lighthouse performance score improves
- No layout shift (CLS = 0) while images load
- Blur visible for ~1s before image loads

---

#### 9. ☐ Add Runtime Type Validation
**Status**: ❌ NOT STARTED  
**Severity**: LOW  
**Location**: All component files  
**Description**:  
TypeScript provides compile-time type safety, but runtime validation helps catch edge cases and API mismatches.

**What needs to be done**:
- Install Zod: `npm install zod`
- Create schema files in `src/lib/schemas.ts`
- Validate product data from dummy-data at runtime
- Optional: Validate API responses once backend is added

**Example Schema**:
```typescript
// src/lib/schemas.ts
import { z } from 'zod';

export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().positive(),
  emoji: z.string(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// Usage in context:
const validatedItem = CartItemSchema.parse(itemFromAPI);
```

**How to verify completion**:
- Wrong type data caught at runtime
- Zod validation in context setup
- Error messages helpful for debugging

---

#### 10. ☐ Complete Unit Test Coverage
**Status**: 🟡 PARTIAL  
**Severity**: LOW  
**Location**: Test files  
**Description**:  
Good test setup exists for context and filters, but missing component tests.

**Current State**:
✅ `src/__tests__/context.test.tsx` - 7 tests, excellent coverage  
✅ `src/__tests__/filterLogic.test.ts` - 7 tests, good coverage  
❌ Missing: ProductCard, Newsletter, Navbar tests  

**What needs to be done**:
- Add `ProductCard.test.tsx` (5-7 tests)
- Add `Newsletter.test.tsx` (4-6 tests)  
- Add `Navbar.test.tsx` (3-4 tests)
- Aim for 80%+ coverage on critical components

**Test Template**:
```typescript
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/dummy-data';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={products[0]} />);
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText(`€${products[0].price}`)).toBeInTheDocument();
  });

  it('calls onAddToCart when button clicked', () => {
    const mockAddToCart = jest.fn();
    render(
      <ProductCard product={products[0]} onAddToCart={mockAddToCart} />
    );
    screen.getByText('Add to Cart').click();
    expect(mockAddToCart).toHaveBeenCalledWith(products[0]);
  });
});
```

**How to verify completion**:
- `npm test` passes all tests
- Coverage report shows > 80% on ProductCard, Newsletter, Navbar
- Test suite runs in < 10 seconds

---

#### 11. ☐ Add Error Recovery with Sentry Integration
**Status**: ❌ NOT STARTED  
**Severity**: LOW  
**Location**: Root layout, error handling  
**Description**:  
Errors are caught by ErrorBoundary but not logged. Should integrate with error tracking service for production monitoring.

**What needs to be done**:
- Install Sentry: `npm install @sentry/nextjs`
- Configure in `next.config.ts`
- Catch errors in ErrorBoundary and log to Sentry
- Set up alerts for critical errors

**Setup Example**:
```typescript
// next.config.ts
import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(nextConfig, {
  org: 'your-org',
  project: 'zeemra',
  authToken: process.env.SENTRY_AUTH_TOKEN,
});

// In ErrorBoundary
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  Sentry.captureException(error, { contexts: { errorInfo } });
}
```

**How to verify completion**:
- Errors logged to Sentry dashboard
- Error details include stack trace and context
- Can set up alerts for critical errors

---

#### 12. ☐ Add Wishlist Functionality
**Status**: ⚠️ STUB EXISTS  
**Severity**: LOW  
**Location**: [src/components/product/ProductCard.tsx](src/components/product/ProductCard.tsx#L51)  
**Description**:  
Wishlist button exists but is non-functional. Currently just shows ♡ emoji.

**What needs to be done**:
- Add wishlist state to AppContext
- Create `useWishlist()` hook
- Toggle wishlist on button click
- Persist to localStorage
- Show filled heart (❤️) when in wishlist

**Implementation**:
```typescript
// Add to context
interface AppContextType {
  // ... existing
  wishedItems: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
}

// In ProductCard
const { wishedItems, addToWishlist, removeFromWishlist } = useApp();
const isWished = wishedItems.includes(product.id);

<button 
  className="product-wish"
  onClick={(e) => {
    e.preventDefault();
    isWished ? removeFromWishlist(product.id) : addToWishlist(product.id);
  }}
>
  {isWished ? '❤️' : '♡'}
</button>
```

**How to verify completion**:
- Click heart button toggles filled/unfilled
- Wishlist persists after page refresh
- Badge shows count of wished items

---

## 📋 Priority Execution Order

### Phase 1: Critical Fixes (1 day) - Security & Core Functionality
1. Task #1: Implement cart deduplication
2. Task #2: Add input sanitization
3. Task #3: Add remove button to cart

### Phase 2: Code Quality (1 day) - Best Practices
4. Task #4: Fix quantity default values
5. Task #5: Add scroll throttling
6. Task #6: Add product 404 UI

### Phase 3: Optimization (1 day) - Performance & Polish
7. Task #7: Replace magic numbers with variables
8. Task #8: Add image placeholders
9. Task #10: Complete unit tests

### Phase 4: Enhancements (Optional) - Nice-to-Have
10. Task #9: Runtime type validation
11. Task #11: Error tracking (Sentry)
12. Task #12: Wishlist functionality

---

## ✨ Code Standards to Follow

### TypeScript
```typescript
// ✅ DO: Use strict typing, avoid optional chaining for defaults
interface CartItem {
  quantity: number;  // Required with default, not optional
}

// ❌ DON'T: Use optional + fallback pattern
interface CartItem {
  quantity?: number;  // Then use `quantity || 1` everywhere
}
```

### Component Props
```typescript
// ✅ DO: Document props with JSDoc
/**
 * @param {ProductCardProps} props
 * @param {Product} props.product - Product data
 * @param {Function} [props.onAddToCart] - Optional callback
 */

// ❌ DON'T: Vague prop names
function ProductCard({ p, fn }: any) {}
```

### State Management
```typescript
// ✅ DO: Validate state before operations
const addToCart = (item: CartItem) => {
  if (!item.id || item.price < 0) return;
  // ... rest of logic
};

// ❌ DON'T: Assume input is valid
const addToCart = (item: CartItem) => {
  setCartItems([...cartItems, item]);
};
```

---

## 🔍 Completion Tracking

| # | Task | Status | Priority | Est. Time |
|---|------|--------|----------|-----------|
| 1 | Cart item deduplication | ❌ TODO | HIGH | 30 min |
| 2 | Input sanitization | ❌ TODO | HIGH | 1 hour |
| 3 | Remove button in cart | ❌ TODO | HIGH | 30 min |
| 4 | Fix quantity defaults | ❌ TODO | MEDIUM | 45 min |
| 5 | Scroll event throttling | ❌ TODO | MEDIUM | 30 min |
| 6 | Product 404 handling | ❌ TODO | MEDIUM | 30 min |
| 7 | Replace magic numbers | ❌ TODO | MEDIUM | 1.5 hours |
| 8 | Image placeholders | ❌ TODO | LOW | 30 min |
| 9 | Runtime validation | ❌ TODO | LOW | 1 hour |
| 10 | Complete test coverage | 🟡 PARTIAL | LOW | 2 hours |
| 11 | Error tracking (Sentry) | ❌ TODO | LOW | 1 hour |
| 12 | Wishlist functionality | ❌ TODO | LOW | 2 hours |

**Total Estimated Time**: 9-10 hours  
**Current Progress**: 0%  

---

**Last Updated**: March 8, 2026  
**Overall Code Quality**: 7.4/10  
**Target After Fixes**: 8.5+/10
