'use client';

import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  BookOpen, 
  Ghost, 
  Skull, 
  Scroll, 
  Moon, 
  Eye,
  Settings,
  LogOut
} from 'lucide-react';

// --- Utility: cn ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TypeScript Interfaces ---
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface HauntedSidebarProps {
  menuItems?: MenuItem[];
  activeId?: string;
  onActiveChange?: (id: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

// --- Default Menu Items ---
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'The Dashboard', icon: <BookOpen size={20} /> },
  { id: 'spirits', label: 'Restless Spirits', icon: <Ghost size={20} /> },
  { id: 'graveyard', label: 'Graveyard', icon: <Skull size={20} /> },
  { id: 'rituals', label: 'Dark Rituals', icon: <Scroll size={20} /> },
  { id: 'midnight', label: 'Midnight Zone', icon: <Moon size={20} /> },
  { id: 'scrying', label: 'Scrying Pool', icon: <Eye size={20} /> },
];

// --- GooFilter Component ---
const GooFilter: React.FC = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      <filter id="sidebar-goo-3d" colorInterpolationFilters="sRGB">
        {/* Step 1: Initial blur to create soft blob edges */}
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
        
        {/* Step 2: Color matrix to harden edges and create threshold effect */}
        <feColorMatrix
          in="blur1"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        
        {/* Step 3: Smooth blur for lighting preparation */}
        <feGaussianBlur in="goo" stdDeviation="2" result="smoothGoo" />
        
        {/* Step 4: Specular lighting for 3D shine effect */}
        <feSpecularLighting
          in="smoothGoo"
          surfaceScale="5"
          specularConstant="1.2"
          specularExponent="20"
          lightingColor="#ffffff"
          result="specular"
        >
          {/* Point light source positioned for dramatic effect */}
          <fePointLight x="-100" y="-200" z="300" />
        </feSpecularLighting>
        
        {/* Step 5: Composite specular highlights with original goo */}
        <feComposite
          in="specular"
          in2="goo"
          operator="in"
          result="specularGoo"
        />
        
        {/* Step 6: Layer highlights over goo */}
        <feComposite
          in="goo"
          in2="specularGoo"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="final"
        />
      </filter>
    </defs>
  </svg>
);

// --- WanderingGhost Component ---
const WanderingGhost: React.FC = () => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ x: "-100%", y: "20%", scale: 0.5, rotate: 10 }}
    animate={{
      x: "400%",
      y: ["20%", "40%", "10%"],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <Ghost size={120} className="text-white opacity-5" />
  </motion.div>
);

// --- HauntedSidebar Component ---
export const HauntedSidebar: React.FC<HauntedSidebarProps> = ({
  menuItems = DEFAULT_MENU_ITEMS,
  activeId: controlledActiveId,
  onActiveChange,
  className,
  title = 'MANOR',
  subtitle = 'Navigation',
}) => {
  // Internal state for uncontrolled mode
  const [internalActiveId, setInternalActiveId] = useState<string>(
    menuItems[0]?.id || ''
  );

  // Hover state for interaction feedback
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Derived active ID (controlled or uncontrolled)
  const activeId = controlledActiveId ?? internalActiveId;

  // Calculate blob position based on menu item index
  const calculateBlobPosition = (itemId: string): number | null => {
    const index = menuItems.findIndex(item => item.id === itemId);
    if (index === -1) return null; // Handle invalid activeId gracefully
    return index * 52; // 48px height + 4px gap
  };

  // Get blob positions for Head, Tail, and Drip
  const blobTopPosition = calculateBlobPosition(activeId);
  const headBlobTop = blobTopPosition;
  const tailBlobTop = blobTopPosition;
  const dripBlobTop = blobTopPosition !== null ? blobTopPosition + 8 : null;

  return (
    <div className={cn('relative', className)}>
      {/* GooFilter SVG definition */}
      <GooFilter />
      
      {/* Main sidebar container with layered architecture */}
      <div className="relative w-72 h-[650px] bg-[#0c0a0f] rounded-r-2xl border-r border-white/5 shadow-2xl overflow-hidden">
        {/* Background Layer (z-index: 0) */}
        <div className="absolute inset-0">
          {/* WanderingGhost animation */}
          <WanderingGhost />
          
          {/* Wood texture overlay with 10% opacity */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Gradient overlay from black/80 via transparent to black/80 */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 50%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />
        </div>
        
        {/* Filter Layer (z-index: 1) - Blob system with SVG filter */}
        {headBlobTop !== null && (
          <LayoutGroup>
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ filter: 'url(#sidebar-goo-3d)' }}
            >
              {/* Head Blob - Fast, high stiffness */}
              <motion.div
                layoutId="active-blob-head"
                className="absolute h-12 bg-gray-700 rounded-lg"
                style={{
                  top: headBlobTop,
                  left: 0,
                  width: '100%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                }}
              />
              
              {/* Tail Blob - Medium speed, high mass */}
              <motion.div
                layoutId="active-blob-tail"
                className="absolute h-12 bg-gray-700 rounded-lg"
                style={{
                  top: headBlobTop,
                  left: 16,
                  width: '75%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 18,
                  mass: 3,
                }}
              />
              
              {/* Drip Blob - Slow, extreme mass */}
              <motion.div
                layoutId="active-blob-drip"
                className="absolute h-12 bg-gray-700 rounded-lg"
                style={{
                  top: headBlobTop + 8,
                  left: 40,
                  width: 40,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 20,
                  mass: 5,
                  delay: 0.05,
                }}
              />
            </div>
          </LayoutGroup>
        )}
        
        {/* Content Layer (z-index: 10) - Interactive buttons and content */}
        <nav className="p-6 relative z-10 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-2">
            <Skull size={24} className="text-gray-200" />
            <h1 className="font-serif text-2xl tracking-widest text-gray-200">
              {title}
            </h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-600 mb-8">
            {subtitle}
          </p>
          
          {/* Navigation Section - Interactive Menu Items */}
          <div className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = item.id === activeId;
              const isHovered = item.id === hoveredId;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setInternalActiveId(item.id);
                    onActiveChange?.(item.id);
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    'relative w-full h-12 flex items-center gap-3 px-4 rounded-lg',
                    'transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#0c0a0f]',
                    isActive && 'text-white',
                    !isActive && isHovered && 'text-gray-300',
                    !isActive && !isHovered && 'text-gray-500'
                  )}
                >
                  {/* Icon with animation */}
                  {item.icon && (
                    <motion.div
                      className="flex-shrink-0"
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        x: isActive ? 4 : isHovered ? 2 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  )}
                  
                  {/* Label */}
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                  
                  {/* Hover indicator */}
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-gray-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Footer Section */}
          <div className="pt-6 border-t border-white/5 space-y-1">
            {/* Configuration Button */}
            <button
              className={cn(
                'w-full h-10 flex items-center gap-3 px-4 rounded-lg',
                'text-sm font-medium text-gray-500',
                'transition-colors duration-200',
                'hover:text-gray-300 hover:bg-white/5',
                'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#0c0a0f]'
              )}
            >
              <Settings size={18} />
              <span>Configuration</span>
            </button>
            
            {/* Abandon Button */}
            <button
              className={cn(
                'w-full h-10 flex items-center gap-3 px-4 rounded-lg',
                'text-sm font-medium text-red-900',
                'transition-colors duration-200',
                'hover:text-red-700 hover:bg-red-950/20',
                'focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-[#0c0a0f]'
              )}
            >
              <LogOut size={18} />
              <span>Abandon</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

HauntedSidebar.displayName = 'HauntedSidebar';
