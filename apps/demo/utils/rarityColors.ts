import { Product } from '../types';

// Consistent rarity color system used throughout the app
export const rarityColors: Record<Product['rarity'], {
  text: string;
  textLight: string;
  bg: string;
  bgLight: string;
  border: string;
  dot: string;
}> = {
  common: {
    text: 'text-gray-400',
    textLight: 'text-gray-200',
    bg: 'bg-gray-500/20',
    bgLight: 'bg-gray-500/30',
    border: 'border-gray-500/30',
    dot: 'bg-gray-400',
  },
  uncommon: {
    text: 'text-emerald-400',
    textLight: 'text-emerald-200',
    bg: 'bg-emerald-500/20',
    bgLight: 'bg-emerald-500/30',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  rare: {
    text: 'text-sky-400',
    textLight: 'text-sky-200',
    bg: 'bg-sky-500/20',
    bgLight: 'bg-sky-500/30',
    border: 'border-sky-500/30',
    dot: 'bg-sky-400',
  },
  legendary: {
    text: 'text-amber-400',
    textLight: 'text-amber-200',
    bg: 'bg-amber-500/20',
    bgLight: 'bg-amber-500/30',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
};

// Get rarity badge classes
export function getRarityBadgeClasses(rarity: Product['rarity']): string {
  const colors = rarityColors[rarity];
  return `${colors.textLight} ${colors.bgLight} ${colors.border}`;
}

// Get rarity text class
export function getRarityTextClass(rarity: Product['rarity']): string {
  return rarityColors[rarity].text;
}
