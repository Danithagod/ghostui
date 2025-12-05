'use client';

import { useState, useEffect } from 'react';
import { GooeyButton, useGhostToast } from 'ghostui-react';
import { Drawer, DrawerPlacement } from './Drawer';
import { ProductDrawerProps } from '../types';
import { rarityColors } from '../utils/rarityColors';

const placements: DrawerPlacement[] = ['right', 'left', 'top', 'bottom'];

export function ProductDrawer({ product, isOpen, onClose, onAddToCart }: ProductDrawerProps) {
  const { addToast } = useGhostToast();
  const [placement, setPlacement] = useState<DrawerPlacement>('right');
  const [drawerKey, setDrawerKey] = useState(0);

  // Randomize placement when drawer opens - set BEFORE opening
  useEffect(() => {
    if (isOpen) {
      const randomPlacement = placements[Math.floor(Math.random() * placements.length)];
      setPlacement(randomPlacement);
      setDrawerKey(prev => prev + 1); // Force remount with new placement
    }
  }, [isOpen]);
  
  if (!product) return null;

  const colors = rarityColors[product.rarity];

  const handleAddToCart = () => {
    onAddToCart(product);
    addToast(`${product.name} added to cart!`, 'success');
    onClose();
  };

  const isHorizontal = placement === 'top' || placement === 'bottom';

  return (
    <Drawer key={drawerKey} isOpen={isOpen} onClose={onClose} placement={placement} title={product.name}>
      <div className={isHorizontal ? 'flex gap-6 h-full' : ''}>
        {/* Product Image */}
        <div className={`bg-gradient-to-br from-purple-500/40 to-green-500/40 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10 ${
          isHorizontal ? 'w-80 h-full' : 'w-full h-48 mb-6'
        }`}>
          <span className={isHorizontal ? 'text-9xl opacity-70' : 'text-7xl opacity-70'}>🧪</span>
        </div>

        {/* Content Section */}
        <div className={isHorizontal ? 'flex-1 overflow-y-auto drawer-no-scrollbar' : ''}>
          {/* Product Price and Rarity */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-3xl font-bold text-green-300">${product.price.toFixed(2)}</p>
            <span className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.textLight} ${colors.bgLight} uppercase px-3 py-1.5 rounded-lg border ${colors.border}`}>
              <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
              {product.rarity}
            </span>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-purple-200 mb-2">Description</h3>
            <p className="text-gray-100 leading-relaxed">{product.fullDescription}</p>
          </div>

          {/* Ingredients */}
          {product.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-purple-200 mb-2">Ingredients</h3>
              <ul className="space-y-1.5">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-100 flex items-center gap-2">
                    <span className="text-purple-300 text-lg">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Effects */}
          {product.effects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-green-200 mb-2">Effects</h3>
              <ul className="space-y-1.5">
                {product.effects.map((effect, index) => (
                  <li key={index} className="text-gray-100 flex items-center gap-2">
                    <span className="text-green-300 text-lg">✦</span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-8">
            <GooeyButton
              variant="slime"
              onClick={handleAddToCart}
              className="w-full"
            >
              Add to Cart
            </GooeyButton>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
