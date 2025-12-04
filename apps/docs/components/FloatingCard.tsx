'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FloatingCard - A custom floating GUI card component for the GhostUI docs app.
 * Based on the GooeyCard component with intense gooey SVG filter and drip effects.
 * Uses theme-aware CSS variables for colors.
 */
export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
}) => {
  const filterId = useId().replace(/:/g, '');

  // Drip configurations - dripping to the RIGHT with more intensity
  const dripConfigs = [
    {
      position: 'top-16',
      height: 'h-6',
      left: 'calc(100% - 40px)',
      widths: ['50px', '110px', '50px'],
      duration: 4.2,
      delay: 0,
    },
    {
      position: 'top-32',
      height: 'h-7',
      left: 'calc(100% - 45px)',
      widths: ['55px', '120px', '55px'],
      duration: 4.8,
      delay: 0.6,
    },
    {
      position: 'top-52',
      height: 'h-5',
      left: 'calc(100% - 35px)',
      widths: ['45px', '100px', '45px'],
      duration: 4.0,
      delay: 1.2,
    },
    {
      position: 'bottom-40',
      height: 'h-6',
      left: 'calc(100% - 42px)',
      widths: ['52px', '115px', '52px'],
      duration: 4.5,
      delay: 0.3,
    },
    {
      position: 'bottom-24',
      height: 'h-7',
      left: 'calc(100% - 48px)',
      widths: ['58px', '125px', '58px'],
      duration: 4.3,
      delay: 0.9,
    },
    {
      position: 'bottom-56',
      height: 'h-5',
      left: 'calc(100% - 38px)',
      widths: ['48px', '105px', '48px'],
      duration: 4.6,
      delay: 1.5,
    },
  ];

  // Pool configurations on the right side
  const poolConfigs = [
    { position: 'top-12', height: 'h-14', width: 'w-7', right: '-right-3' },
    { position: 'top-40', height: 'h-10', width: 'w-6', right: '-right-2' },
    { position: 'bottom-32', height: 'h-12', width: 'w-7', right: '-right-3' },
    { position: 'bottom-16', height: 'h-8', width: 'w-5', right: '-right-2' },
  ];

  // Check if className contains height-related classes
  const hasHeightClass = className?.includes('h-') || className?.includes('flex');

  return (
    <div className={cn('relative', hasHeightClass && 'h-full')}>
      {/* SVG Filter Definition - INTENSE Gooey effect with stronger highlights */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`floating-goo-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="gooBlur" />
            <feSpecularLighting
              in="gooBlur"
              surfaceScale="8"
              specularConstant="2.5"
              specularExponent="30"
              lightingColor="var(--ghost-accent)"
              result="specular"
            >
              <feDistantLight azimuth="235" elevation="50" />
            </feSpecularLighting>
            <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
            <feComposite in="specularInGoo" in2="goo" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Layer (filtered) - uses theme background with more saturation */}
      <div
        className="absolute inset-0"
        style={{ filter: `url(#floating-goo-${filterId})` }}
      >
        {/* Background Shape - deeper, more saturated */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: 'var(--ghost-bg-secondary)' }}
        />

        {/* Animated Drips - dripping to the RIGHT with intensity */}
        {dripConfigs.map((drip, index) => (
          <motion.div
            key={`drip-${index}`}
            className={cn(
              'absolute rounded-full motion-reduce:hidden',
              drip.height,
              drip.position
            )}
            style={{ 
              left: drip.left, 
              transformOrigin: 'left',
              backgroundColor: 'var(--ghost-bg-secondary)'
            }}
            animate={{ width: drip.widths }}
            transition={{
              duration: drip.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: drip.delay,
            }}
          />
        ))}

        {/* Static Pool Elements on the right */}
        {poolConfigs.map((pool, index) => (
          <div
            key={`pool-${index}`}
            className={cn(
              'absolute rounded-full',
              pool.width,
              pool.height,
              pool.position,
              pool.right
            )}
            style={{ backgroundColor: 'var(--ghost-bg-secondary)' }}
          />
        ))}
      </div>

      {/* Content Layer (unfiltered) - scrollbar contained inside */}
      <div className={cn('relative z-20 h-full overflow-hidden rounded-2xl', className)}>
        {children}
      </div>

      {/* Decorative Border Overlay - more visible accent glow */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        style={{ 
          border: '1px solid rgba(var(--ghost-accent-rgb), 0.25)',
          boxShadow: 'inset 0 0 30px rgba(var(--ghost-accent-rgb), 0.08)'
        }}
      />
    </div>
  );
};

FloatingCard.displayName = 'FloatingCard';
