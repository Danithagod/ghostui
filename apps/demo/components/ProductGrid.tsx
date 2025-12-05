'use client';

import { SpookySkeleton } from 'ghostui-react';
import { ProductGridProps } from '../types';
import { ProductCard } from './ProductCard';

export function ProductGrid({
  products,
  onProductSelect,
  onAddToCart,
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <SpookySkeleton key={index} variant="sweep">
            <div className="space-y-4 p-6 bg-gray-900 rounded-lg">
              <div className="w-full h-48 bg-gray-800 rounded-lg" />
              <div className="w-4/5 h-6 bg-gray-800 rounded" />
              <div className="w-full h-4 bg-gray-800 rounded" />
              <div className="w-3/5 h-4 bg-gray-800 rounded" />
              <div className="flex justify-between items-center">
                <div className="w-20 h-7 bg-gray-800 rounded" />
                <div className="w-24 h-9 bg-gray-800 rounded" />
              </div>
            </div>
          </SpookySkeleton>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onProductSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
