'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Flame, Ghost } from 'lucide-react';
import { cn } from '../lib/utils';

// --- TypeScript Interface ---
export interface GooeyProgressBarProps {
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
    container: 'bg-red-950/30 border-red-900/50',
    fill: 'bg-[#8a1c1c]',
    glow: 'shadow-[0_0_15px_rgba(220,38,38,0.4)]',
    filterId: 'goo-3d-blood',
    dripColor: 'bg-[#8a1c1c]',
    icon: <Skull size={16} className="text-red-400" />,
  },
  candle: {
    container: 'bg-orange-950/30 border-orange-900/30',
    fill: 'bg-[#ffedd5]',
    glow: 'shadow-[0_0_15px_rgba(251,146,60,0.4)]',
    filterId: 'goo-3d-candle',
    dripColor: 'bg-[#ffedd5]',
    icon: <Flame size={16} className="text-orange-400" />,
  },
  soul: {
    container: 'bg-indigo-950/40 border-indigo-500/30',
    fill: 'bg-indigo-600',
    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.6)]',
    filterId: 'none',
    dripColor: 'bg-transparent',
    icon: <Ghost size={16} className="text-indigo-300" />,
  },
};

// Memoized SVG Filter component to prevent re-renders
const GooFilter = React.memo(({ filterId }: { filterId: string }) => (
  <svg className="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id={filterId} colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feGaussianBlur in="goo" stdDeviation="2" result="smoothGoo" />
        <feSpecularLighting
          in="smoothGoo"
          surfaceScale="5"
          specularConstant="1.2"
          specularExponent="20"
          lightingColor="#ffffff"
          result="specular"
        >
          <fePointLight x="-100" y="-200" z="200" />
        </feSpecularLighting>
        <feComposite in="specular" in2="goo" operator="in" result="specularClean" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" result="solidGoo" />
        <feComposite in="specularClean" in2="solidGoo" operator="over" />
      </filter>
    </defs>
  </svg>
));
GooFilter.displayName = 'GooFilter';

// Memoized drip component
const Drips = React.memo(({ dripColor }: { dripColor: string }) => (
  <>
    <motion.div
      className={cn('absolute right-0 top-full w-4 h-4 -mt-2 rounded-full', dripColor)}
      animate={{ height: [10, 25, 10] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className={cn('absolute right-4 top-full w-3 h-3 -mt-2 rounded-full', dripColor)}
      animate={{ height: [8, 20, 8] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
  </>
));
Drips.displayName = 'Drips';

// Memoized soul effects - simplified for performance
const SoulEffects = React.memo(() => (
  <>
    <div className="absolute inset-0 overflow-hidden rounded-full">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          animation: 'shimmer 2s linear infinite',
        }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"
          initial={{ left: '0%', opacity: 0 }}
          animate={{
            left: ['0%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5 + i * 0.5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-sm" />
  </>
));
SoulEffects.displayName = 'SoulEffects';

export const GooeyProgressBar: React.FC<GooeyProgressBarProps> = ({
  value,
  variant = 'blood',
  className,
}) => {
  // Value clamping logic
  const progress = Math.min(100, Math.max(0, value));
  const isComplete = progress === 100;
  const theme = variantConfigs[variant];
  const useGoo = variant !== 'soul';

  // Memoize filter style to prevent object recreation
  const filterStyle = useMemo(
    () => (useGoo ? { filter: `url(#${theme.filterId})` } : undefined),
    [useGoo, theme.filterId]
  );

  // Memoize spring transition config
  const springTransition = useMemo(
    () => ({ type: 'spring' as const, stiffness: 50, damping: 15 }),
    []
  );

  return (
    <div className={cn('w-full max-w-md', className)}>
      {/* Label / Icon Header */}
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-gray-500">
          {theme.icon}
          <span>{variant} Gauge</span>
        </div>
        <span className="font-mono text-xs text-gray-400">{Math.round(progress)}%</span>
      </div>

      {/* SVG Filter - only render once per variant */}
      {useGoo && <GooFilter filterId={theme.filterId} />}

      {/* The Bar Container */}
      <div className="relative h-6 w-full">
        {/* Background Track */}
        <div className={cn('absolute inset-0 rounded-full border', theme.container)} />

        {/* Fill Layer */}
        <div className="absolute inset-0 w-full h-full overflow-visible" style={filterStyle}>
          <motion.div
            className={cn('h-full rounded-full relative', theme.fill)}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={springTransition}
          >
            {/* Variant-specific effects */}
            {variant === 'soul' && progress > 0 && <SoulEffects />}
            {useGoo && progress > 0 && <Drips dripColor={theme.dripColor} />}
          </motion.div>
        </div>

        {/* Completion Burst Effect */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 1, 0], scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className={cn(
                'absolute inset-0 rounded-full border-2 border-white/50 pointer-events-none',
                theme.glow
              )}
            />
          )}
        </AnimatePresence>
      </div>

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

GooeyProgressBar.displayName = 'GooeyProgressBar';
