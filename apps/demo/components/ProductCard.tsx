'use client';

import { GooeyCard, GooeyButton } from 'ghostui-react';
import { ProductCardProps } from '../types';
import { rarityColors } from '../utils/rarityColors';

export function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const colors = rarityColors[product.rarity];

  return (
    <div
      className="cursor-pointer transition-transform hover:scale-105 mb-8 pb-6"
      onClick={() => onSelect(product)}
    >
      <GooeyCard className="flex flex-col h-full !min-w-0 !min-h-0 w-full !p-4 !pb-8">
        {/* Image placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-purple-900/20 to-green-900/20 rounded-lg mb-3 flex items-center justify-center">
          <span className="text-4xl opacity-50">🧪</span>
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-semibold text-white">{product.name}</h3>
            <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${colors.text} uppercase`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {product.rarity}
            </span>
          </div>

          <p className="text-xs text-gray-300 mb-3 flex-1 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-green-400">
              ${product.price.toFixed(2)}
            </span>

            <GooeyButton
              variant="slime"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Add to Cart
            </GooeyButton>
          </div>
        </div>
      </GooeyCard>
    </div>
  );
}
