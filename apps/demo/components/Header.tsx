'use client';

import { ShoppingCart } from 'lucide-react';
import { MoonlightSwitch, GooeyButton, useThemeOptional } from 'ghostui-react';
import { SearchBar } from './SearchBar';
import { HeaderProps } from '../types';

export function Header({ onSearch, onCartClick, cartItemCount }: HeaderProps) {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const borderColor = theme === 'blood' ? 'border-red-500/20' : 'border-purple-500/20';

  return (
    <header className={`w-full rounded-2xl border bg-[var(--ghost-bg-primary)] shadow-2xl ${borderColor}`}>
      <div className="flex h-14 items-center justify-between px-4 gap-4">
        {/* Logo/Title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-xl">🧪</div>
          <div>
            <h1 className="text-base font-bold text-[var(--ghost-accent)] leading-tight">
              The Cauldron Emporium
            </h1>
            <p className="text-[9px] text-[var(--ghost-text-secondary)] leading-tight">
              Mystical Potions & Elixirs
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <SearchBar onSearch={onSearch} placeholder="Search potions, elixirs, ingredients..." />

          {/* Theme Toggle */}
          <div className="scale-[0.6] origin-center">
            <MoonlightSwitch />
          </div>

          {/* Cart Button */}
          <div className="relative">
            <GooeyButton
              variant="slime"
              onClick={onCartClick}
              className="!px-3 !py-2"
            >
              <ShoppingCart className="w-4 h-4" />
            </GooeyButton>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg ring-2 ring-[var(--ghost-bg-primary)] pointer-events-none">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
