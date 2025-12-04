'use client';

import React, { useState, useEffect, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// --- Types & Themes ---
type FluidVariant = 'blood' | 'goo' | 'ectoplasm';

interface FluidTheme {
  name: string;
  primary: string;   // The main liquid color (dips/background)
  secondary: string; // Darker shade for depth
  highlight: string; // Specular highlight color (light reflection)
  shine: string;     // Secondary sheen color
}

const THEMES: Record<FluidVariant, FluidTheme> = {
  blood: {
    name: 'Coagulated Blood',
    primary: '#7f1d1d', // red-900
    secondary: '#450a0a', // red-950
    highlight: '#ffcccc', // Pinkish white
    shine: '#cc0000', // Deep red shine
  },
  goo: {
    name: 'Radioactive Slime',
    primary: '#4d7c0f', // lime-700
    secondary: '#365314', // lime-950
    highlight: '#ecfccb', // lime-100
    shine: '#84cc16', // lime-500
  },
  ectoplasm: {
    name: 'Spectral Residue',
    primary: '#581c87', // purple-900
    secondary: '#3b0764', // purple-950
    highlight: '#e9d5ff', // purple-200
    shine: '#a855f7', // purple-500
  },
};

interface DripConfig {
  id: number;
  width: string;
  left: string;
  duration: number;
  delay: number;
  isGlob: boolean;
  borderRadius: string;
}

// --- Configuration ---
const NUM_DRIPS = 65;

// --- Sub-Component: Fluid Drip Column ---
const FluidDrip = ({ config, color }: { config: DripConfig; color: string }) => {
  return (
    <motion.div
      className="absolute top-0"
      style={{
        width: config.width,
        left: config.left,
        height: '170vh',
        backgroundColor: color,
        transformOrigin: 'top',
        borderRadius: config.borderRadius,
      }}
      initial={{ y: '-170vh' }}
      animate={{ y: '100vh' }}
      transition={{
        duration: config.duration,
        ease: [0.45, 0.05, 0.55, 0.95],
        delay: config.delay,
      }}
    />
  );
};

// --- Main Component: Viscous Transition ---
interface ViscousTransitionProps {
  isNavigating: boolean;
  variant?: FluidVariant;
  onComplete?: () => void;
  className?: string;
}

const ViscousTransition: React.FC<ViscousTransitionProps> = ({
  isNavigating,
  variant = 'blood',
  onComplete,
  className
}) => {
  const filterId = useId();
  const cleanFilterId = `viscous-goo-${filterId.replace(/:/g, '')}`;
  const theme = THEMES[variant];

  // 1. Memoize Drip Configuration
  const drips = useMemo(() => {
    return Array.from({ length: NUM_DRIPS }).map((_, index) => {
      const isGlob = Math.random() > 0.7;
      const widthVal = isGlob
        ? 4 + Math.random() * 11
        : 0.5 + Math.random() * 2;
      const gridPos = (index / NUM_DRIPS) * 100;
      const jitter = (Math.random() - 0.5) * (isGlob ? 10 : 18);

      return {
        id: index,
        width: `${widthVal}vw`,
        left: `${Math.max(-15, Math.min(115, gridPos + jitter))}%`,
        duration: (isGlob ? 2.8 : 2.2) + Math.random() * 1.6,
        delay: Math.random() * 0.4,
        isGlob,
        borderRadius: isGlob ? '50%' : '45% 55% 45% 55%',
      };
    });
  }, []);

  // 2. Scroll Locking & Timer
  useEffect(() => {
    if (isNavigating) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        onComplete?.();
        document.body.style.overflow = '';
      }, 3800);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isNavigating, onComplete]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center",
            className
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          {/* SVG Filter Definition */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id={cleanFilterId} colorInterpolationFilters="sRGB">
                {/* A. Texture Generation */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.01 0.03"
                  numOctaves="3"
                  seed="1"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="12"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="textured"
                />

                {/* B. Gooey Effect (Blur + Contrast) */}
                <feGaussianBlur in="textured" stdDeviation="12" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  // This matrix boosts alpha contrast while preserving original RGB colors
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />

                {/* C. Primary Specular Lighting (White/Bright Highlight) */}
                <feGaussianBlur in="goo" stdDeviation="4" result="gooBlur" />
                <feSpecularLighting
                  in="gooBlur"
                  surfaceScale="8"
                  specularConstant="1.8"
                  specularExponent="16"
                  lightingColor={theme.highlight}
                  result="specular"
                >
                  <fePointLight x="-500" y="-1000" z="600" />
                </feSpecularLighting>

                {/* D. Secondary Shine (Thematic Color Shine) */}
                <feSpecularLighting
                  in="gooBlur"
                  surfaceScale="4"
                  specularConstant="0.8"
                  specularExponent="10"
                  lightingColor={theme.shine}
                  result="shine"
                >
                  <fePointLight x="500" y="1000" z="400" />
                </feSpecularLighting>

                {/* E. Composition */}
                <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
                <feComposite in="shine" in2="goo" operator="in" result="shineInGoo" />

                {/* Add Highlights to Base */}
                <feComposite in="specularInGoo" in2="goo" operator="over" result="withHighlight" />
                <feComposite in="shineInGoo" in2="withHighlight" operator="over" result="final" />

                {/* F. Anti-aliasing */}
                <feGaussianBlur in="final" stdDeviation="0.5" />
              </filter>
            </defs>
          </svg>

          {/* The Liquid Container */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ filter: `url(#${cleanFilterId})` }}
          >
            {drips.map((drip) => (
              <FluidDrip key={drip.id} config={drip} color={theme.primary} />
            ))}

            {/* Main Backing Layer */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[200vh]"
              style={{ backgroundColor: theme.primary }}
              initial={{ y: '-200%' }}
              animate={{ y: '100%' }}
              transition={{
                duration: 3.5,
                ease: [0.45, 0.05, 0.55, 0.95],
                delay: 0.1
              }}
            />
          </div>

          {/* Vignette Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Demo Component with Default Button ---
export interface BloodSmearProps {
  /** Optional variant for the fluid effect */
  variant?: FluidVariant;
  /** Optional custom classes for the trigger button */
  className?: string;
  /** Optional button text */
  buttonText?: string;
}

/**
 * BloodSmear - A dramatic full-screen page transition component
 * with a default trigger button
 */
export const BloodSmear: React.FC<BloodSmearProps> = ({
  variant = 'blood',
  className,
  buttonText = 'Trigger Blood Smear'
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTrigger = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
  };

  return (
    <>
      <ViscousTransition
        isNavigating={isTransitioning}
        variant={variant}
        onComplete={() => setIsTransitioning(false)}
      />
      
      <button
        onClick={handleTrigger}
        disabled={isTransitioning}
        className={cn(
          "px-6 py-3 rounded-lg font-semibold transition-all",
          "bg-red-900 text-white hover:bg-red-800",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      >
        {buttonText}
      </button>
    </>
  );
};
