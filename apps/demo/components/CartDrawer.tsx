'use client';

import { useState, useEffect } from 'react';
import { GooeyButton } from 'ghostui-react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Drawer, DrawerPlacement } from './Drawer';
import { CartDrawerProps } from '../types';

const placements: DrawerPlacement[] = ['right', 'left', 'top', 'bottom'];

export function CartDrawer({
  cart,
  isOpen,
  onClose,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
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

  const handleCheckout = () => {
    if (cart.items.length > 0) {
      onCheckout();
      onClose();
    }
  };

  const isHorizontal = placement === 'top' || placement === 'bottom';

  return (
    <Drawer key={drawerKey} isOpen={isOpen} onClose={onClose} placement={placement} title="Shopping Cart">
      {/* Cart Summary */}
      <p className="text-gray-200 mb-6 text-base">
        {cart.items.length === 0
          ? 'Your cart is empty'
          : `${cart.items.length} ${cart.items.length === 1 ? 'item' : 'items'} in cart`}
      </p>

      {/* Cart Items */}
      {cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4 opacity-40">🛒</div>
          <p className="text-gray-200 text-lg">No potions in your cart yet</p>
          <p className="text-sm text-gray-300 mt-2">Browse our collection to get started</p>
        </div>
      ) : (
        <>
          <div className={`mb-6 ${isHorizontal ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors"
              >
                {/* Product Info */}
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/40 to-green-500/40 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate text-base">{item.product.name}</h3>
                    <p className="text-green-300 font-bold text-base">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls and Remove Button */}
                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-gray-100" />
                    </button>
                    <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-gray-100" />
                    </button>
                  </div>

                  {/* Item Total and Remove Button */}
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/30 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 text-red-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total and Checkout - Side by side for horizontal, stacked for vertical */}
          <div className={`border-t border-white/20 pt-4 ${isHorizontal ? 'flex items-center justify-between gap-6' : 'mb-6'}`}>
            <div className={isHorizontal ? 'flex-1' : 'mb-6'}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-200 text-base">Subtotal</span>
                <span className="text-white font-semibold text-base">${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="text-white font-bold">Total</span>
                <span className="text-green-300 font-bold text-2xl">${cart.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className={isHorizontal ? 'flex-shrink-0' : ''}>
              <GooeyButton
                variant="slime"
                onClick={handleCheckout}
                className={isHorizontal ? 'min-w-[200px]' : 'w-full'}
              >
                Proceed to Checkout
              </GooeyButton>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}
