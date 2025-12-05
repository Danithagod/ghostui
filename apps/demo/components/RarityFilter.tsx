'use client';

import { GooeyButton } from 'ghostui-react';
import { Product } from '../types';
import { rarityColors } from '../utils/rarityColors';

const rarities: Array<{ id: Product['rarity'] | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'common', label: 'Common' },
  { id: 'uncommon', label: 'Uncommon' },
  { id: 'rare', label: 'Rare' },
  { id: 'legendary', label: 'Legendary' },
];

interface RarityFilterProps {
  activeRarity: Product['rarity'] | 'all';
  onRarityChange: (rarity: Product['rarity'] | 'all') => void;
}

export function RarityFilter({ activeRarity, onRarityChange }: RarityFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {rarities.map((rarity) => {
        const isActive = activeRarity === rarity.id;
        const colors = rarity.id !== 'all' ? rarityColors[rarity.id] : null;

        return (
          <GooeyButton
            key={rarity.id}
            variant={isActive ? 'slime' : 'ectoplasm'}
            onClick={() => onRarityChange(rarity.id)}
            className="!text-xs !px-3 !py-1.5"
          >
            {colors && (
              <span className={`w-2 h-2 rounded-full ${colors.dot} mr-1.5`} />
            )}
            {rarity.label}
          </GooeyButton>
        );
      })}
    </div>
  );
}
