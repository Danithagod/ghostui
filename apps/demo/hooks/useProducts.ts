'use client';

import { useMemo } from 'react';
import { Product } from '../types';

interface UseProductsOptions {
  products: Product[];
  category?: Product['category'] | 'all';
  rarity?: Product['rarity'] | 'all';
  searchQuery?: string;
}

export function useProducts({
  products,
  category = 'all',
  rarity = 'all',
  searchQuery = '',
}: UseProductsOptions): Product[] {
  return useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply rarity filter
    if (rarity && rarity !== 'all') {
      filtered = filtered.filter((product) => product.rarity === rarity);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const descriptionMatch = product.description.toLowerCase().includes(query);
        const fullDescriptionMatch = product.fullDescription.toLowerCase().includes(query);
        
        return nameMatch || descriptionMatch || fullDescriptionMatch;
      });
    }

    return filtered;
  }, [products, category, rarity, searchQuery]);
}
