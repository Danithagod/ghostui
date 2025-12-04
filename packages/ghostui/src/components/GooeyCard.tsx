'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useThemeOptional, type Theme } from './ThemeProvider';

export interface GooeyCardProps {
  children: React.ReactNode;
  className?: string;
  gooColor?: string;
  /** Theme variant - defaults to ThemeProvider context or 'spectral' */
  variant?: Theme;
}

// Theme color configuration for GooeyCard
const themeColors: Record<Theme, string> = {
  spectral: 'bg-[#5b21b6]', // Purple
  blood: 'bg-[#dc2626]',     // Red
};

export const GooeyCard = React.forwardRef<HTMLDivElement, GooeyCardProps>(
  ({ children, className, gooColor, variant }, ref) => {
  // Connect to ThemeProvider context if available
  const themeContext = useThemeOptional();
  const theme: Theme = variant ?? themeContext?.theme ?? 'spectral';
  
  // Use gooColor if provided, otherwise use theme color
  const effectiveGooColor = gooColor ?? themeColors[theme];
  
  const filterId = React.useId();
  
  // Drip configurations - 5 drips positioned on the right side
  const dripConfigs = [
    {
      position: 'right-6',
      width: 'w-5',
      top: 'calc(100% - 35px)',
      heights: ['40px', '90px', '40px'],
      duration: 4.5,
      delay: 0,
    },
    {
      position: 'right-12',
      width: 'w-4',
      top: 'calc(100% - 30px)',
      heights: ['35px', '80px', '35px'],
      duration: 5,
      delay: 0.5,
    },
    {
      position: 'right-20',
      width: 'w-6',
      top: 'calc(100% - 40px)',
      heights: ['45px', '100px', '45px'],
      duration: 4.2,
      delay: 1,
    },
    {
      position: 'right-28',
      width: 'w-4',
      top: 'calc(100% - 32px)',
      heights: ['38px', '85px', '38px'],
      duration: 4.8,
      delay: 1.5,
    },
    {
      position: 'right-36',
      width: 'w-5',
      top: 'calc(100% - 36px)',
      heights: ['42px', '95px', '42px'],
      duration: 4.6,
      delay: 2,
    },
  ];

  // Pool configurations - 3 static pool elements at the bottom
  const poolConfigs = [
    { position: 'right-4', width: 'w-12', height: 'h-6', bottom: '-bottom-2' },
    { position: 'right-16', width: 'w-8', height: 'h-6', bottom: '-bottom-2' },
    { position: 'right-32', width: 'w-5', height: 'h-4', bottom: '-bottom-1' },
  ];

  return (
    <div ref={ref} className="relative inline-block min-w-[320px] min-h-[200px]">
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`card-goo-${filterId}`}>
            {/* Stage 1: Gaussian Blur */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            
            {/* Stage 2: Color Matrix for contrast and liquid edges */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            
            {/* Stage 3: Blur for lighting calculation */}
            <feGaussianBlur in="goo" stdDeviation="2" result="gooBlur" />
            
            {/* Stage 4: Specular Lighting for highlights */}
            <feSpecularLighting
              in="gooBlur"
              surfaceScale="6"
              specularConstant="1.5"
              specularExponent="40"
              lightingColor="#ffffff"
              result="specular"
            >
              <feDistantLight azimuth="225" elevation="45" />
            </feSpecularLighting>
            
            {/* Stage 5: Composite highlights to goo shape */}
            <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
            
            {/* Stage 6: Combine highlights with goo */}
            <feComposite in="specularInGoo" in2="goo" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Layer (filtered) - z-10 */}
      <div
        className="absolute inset-0"
        style={{ filter: `url(#card-goo-${filterId})` }}
      >
        {/* Background Shape */}
        <div className={cn('absolute inset-0 rounded-3xl', effectiveGooColor)} />

        {/* Animated Drips */}
        {dripConfigs.map((drip, index) => (
          <motion.div
            key={`drip-${index}`}
            className={cn(
              'absolute rounded-full motion-reduce:hidden',
              drip.width,
              drip.position,
              effectiveGooColor
            )}
            style={{
              top: drip.top,
              transformOrigin: 'top',
            }}
            animate={{
              height: drip.heights,
            }}
            transition={{
              duration: drip.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: drip.delay,
            }}
          />
        ))}

        {/* Static Pool Elements */}
        {poolConfigs.map((pool, index) => (
          <div
            key={`pool-${index}`}
            className={cn(
              'absolute rounded-full',
              pool.width,
              pool.height,
              pool.position,
              pool.bottom,
              effectiveGooColor
            )}
          />
        ))}
      </div>

      {/* Content Layer (unfiltered) - z-20 */}
      <div className={cn('relative z-20 p-6', className)}>
        {children}
      </div>

      {/* Decorative Border Overlays - z-30 */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-30" />
      <div className="absolute inset-0 rounded-3xl border-2 border-black/5 pointer-events-none z-30" />
    </div>
  );
  }
);

GooeyCard.displayName = 'GooeyCard';
