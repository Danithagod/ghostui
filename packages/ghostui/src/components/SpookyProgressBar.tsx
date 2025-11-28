'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Flame, Ghost } from 'lucide-react';
import { cn } from '../lib/utils';

// --- TypeScript Interface ---
export interface SpookyProgressBarProps {
  value: number;
  variant?: 'blood' | 'candle' | 'soul';
  className?: string;
}

// --- Variant Configuration ---
interface VariantConfig {
  container: string;
  fill: string;
  glow: string;
  filterId: string;
  dripColor: string;
  icon: React.ReactNode;
}

const variantConfigs: Record<'blood' | 'candle' | 'soul', VariantConfig> = {
  blood: {
    container: 'bg-gray-900 border-2 border-red-900',
    fill: 'bg-red-900',
    glow: 'shadow-[0_0_15px_rgba(138,28,28,0.8)]',
    filterId: 'goo-3d-blood',
    dripColor: 'bg-red-900',
    icon: <Skull className="w-4 h-4" />,
  },
  candle: {
    container: 'bg-gray-900 border-2 border-orange-200',
    fill: 'bg-orange-100',
    glow: 'shadow-[0_0_15px_rgba(255,237,213,0.6)]',
    filterId: 'goo-3d-candle',
    dripColor: 'bg-orange-100',
    icon: <Flame className="w-4 h-4" />,
  },
  soul: {
    container: 'bg-gray-900 border-2 border-indigo-600',
    fill: 'bg-indigo-600',
    glow: 'shadow-[0_0_20px_rgba(79,70,229,0.8)]',
    filterId: 'none',
    dripColor: '',
    icon: <Ghost className="w-4 h-4" />,
  },
};

export const SpookyProgressBar: React.FC<SpookyProgressBarProps> = ({
  value,
  variant = 'blood',
  className,
}) => {
  // Value clamping logic
  const progress = Math.min(100, Math.max(0, value));
  const isComplete = progress === 100;
  const theme = variantConfigs[variant];
  const useGoo = variant !== 'soul';

  return (
    <div className={cn('w-full', className)}>
      {/* Label Header */}
      <div className="flex items-center justify-between mb-2 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          {theme.icon}
          <span className="uppercase font-semibold tracking-wide">{variant}</span>
        </div>
        <span className="text-gray-400 font-mono">{Math.round(progress)}%</span>
      </div>

      {/* SVG Filter Definitions (only for blood and candle) */}
      {useGoo && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id={theme.filterId}>
              {/* Blur for goo shape */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              {/* Increase contrast to create blob shapes */}
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              {/* Blur for height map */}
              <feGaussianBlur in="goo" stdDeviation="2" result="gooBlur" />
              {/* Add 3D highlights with specular lighting */}
              <feSpecularLighting
                in="gooBlur"
                surfaceScale="2"
                specularConstant="1"
                specularExponent="15"
                lightingColor="#ffffff"
                result="specular"
              >
                <fePointLight x="50" y="50" z="100" />
              </feSpecularLighting>
              {/* Mask highlight to goo shape */}
              <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
              {/* Layer highlight over solid color */}
              <feComposite in="specularInGoo" in2="goo" operator="over" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Progress Bar Container */}
      <div className={cn('relative h-6 rounded-full overflow-hidden', theme.container)}>
        {/* Animated Progress Fill */}
        <motion.div
          className={cn('absolute inset-y-0 left-0 rounded-full', theme.fill, theme.glow)}
          style={{
            filter: useGoo ? `url(#${theme.filterId})` : 'none',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 15,
          }}
        >
          {/* Soul Variant Particle Effects */}
          {variant === 'soul' && progress > 0 && (
            <>
              {/* Noise Texture Overlay */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Floating Particles */}
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${20 + index * 15}%`,
                  }}
                  animate={{
                    left: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + index,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}

              {/* Leading Edge Glow */}
              <div
                className="absolute right-0 inset-y-0 w-4 rounded-r-full"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.8), transparent)',
                  filter: 'blur(4px)',
                }}
              />
            </>
          )}

          {/* Drip Effects for Blood and Candle Variants */}
          {(variant === 'blood' || variant === 'candle') && progress > 0 && (
            <>
              {/* Drip 1 */}
              <motion.div
                className={cn('absolute right-0 w-1 rounded-b-full', theme.dripColor)}
                style={{
                  top: '100%',
                  zIndex: -1,
                }}
                animate={{
                  height: [10, 25, 10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Drip 2 */}
              <motion.div
                className={cn('absolute w-1 rounded-b-full', theme.dripColor)}
                style={{
                  right: '8px',
                  top: '100%',
                  zIndex: -1,
                }}
                animate={{
                  height: [8, 20, 8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </>
          )}
        </motion.div>

        {/* Completion Burst Effect */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className={cn('absolute inset-0 rounded-full pointer-events-none', theme.glow)}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: 1.2,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

SpookyProgressBar.displayName = 'SpookyProgressBar';
