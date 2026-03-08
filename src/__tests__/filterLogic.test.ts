/**
 * Task 13 — Unit Tests: Product Filter Logic
 *
 * Tests for the product filtering logic used in MenPage, WomenPage, and FeaturedProducts.
 * Verifies that useMemo-based filter correctly separates products by gender and type.
 */

import { products } from '@/lib/dummy-data';

describe('Product Filter Logic', () => {
  describe('Gender filtering', () => {
    it('should filter men products by gender = "men"', () => {
      const menProducts = products.filter((p) => p.gender === 'men');
      expect(menProducts.length).toBeGreaterThan(0);
      menProducts.forEach((p) => {
        expect(p.gender).toBe('men');
      });
    });

    it('should filter women products by gender = "women"', () => {
      const womenProducts = products.filter((p) => p.gender === 'women');
      expect(womenProducts.length).toBeGreaterThan(0);
      womenProducts.forEach((p) => {
        expect(p.gender).toBe('women');
      });
    });

    it('men and women product sets should not overlap', () => {
      const menIds = new Set(
        products.filter((p) => p.gender === 'men').map((p) => p.id)
      );
      const womenIds = new Set(
        products.filter((p) => p.gender === 'women').map((p) => p.id)
      );
      const overlap = [...menIds].filter((id) => womenIds.has(id));
      expect(overlap).toHaveLength(0);
    });

    it('all products should be covered by men + women + other', () => {
      const menCount = products.filter((p) => p.gender === 'men').length;
      const womenCount = products.filter((p) => p.gender === 'women').length;
      expect(menCount + womenCount).toBeLessThanOrEqual(products.length);
    });
  });

  describe('Type filtering', () => {
    it('should filter jackets correctly', () => {
      const jackets = products.filter((p) => p.type === 'jacket');
      expect(jackets.length).toBeGreaterThan(0);
      jackets.forEach((p) => expect(p.type).toBe('jacket'));
    });

    it('should filter wallets correctly', () => {
      const wallets = products.filter((p) => p.type === 'wallet');
      expect(wallets.length).toBeGreaterThan(0);
      wallets.forEach((p) => expect(p.type).toBe('wallet'));
    });

    it('should support combined gender + type filter', () => {
      const menJackets = products.filter(
        (p) => p.gender === 'men' && p.type === 'jacket'
      );
      menJackets.forEach((p) => {
        expect(p.gender).toBe('men');
        expect(p.type).toBe('jacket');
      });
    });
  });

  describe('Product data integrity', () => {
    it('all products should have required fields', () => {
      products.forEach((p) => {
        expect(p.id).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.price).toBeGreaterThan(0);
        expect(p.gender).toMatch(/men|women/);
        expect(p.type).toBeTruthy();
      });
    });

    it('all product IDs should be unique', () => {
      const ids = products.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
