'use client';

import { GooeySidebar } from 'ghostui-react';
import { 
  Sparkles, 
  Droplet, 
  Leaf, 
  Skull, 
  Package,
  Home
} from 'lucide-react';
import { Product } from '../types';

interface SidebarProps {
  selectedCategory: Product['category'] | 'all' | 'orders';
  onCategorySelect: (category: Product['category'] | 'all' | 'orders') => void;
}

const categories = [
  { id: 'all' as const, label: 'All Products', icon: <Home className="w-5 h-5" /> },
  { id: 'potions' as const, label: 'Potions', icon: <Droplet className="w-5 h-5" /> },
  { id: 'elixirs' as const, label: 'Elixirs', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'ingredients' as const, label: 'Ingredients', icon: <Leaf className="w-5 h-5" /> },
  { id: 'cursed' as const, label: 'Cursed Items', icon: <Skull className="w-5 h-5" /> },
  { id: 'orders' as const, label: 'Orders', icon: <Package className="w-5 h-5" /> },
];

export function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  return (
    <aside className="w-80 h-[95vh] flex flex-col">
      <GooeySidebar
        menuItems={categories}
        activeId={selectedCategory}
        onActiveChange={(id) => onCategorySelect(id as Product['category'] | 'all' | 'orders')}
        className="flex-1 !bg-none !bg-[var(--ghost-bg-primary)]"
      />
    </aside>
  );
}
