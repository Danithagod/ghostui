'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// --- Configuration ---
const NUM_DRIPS = 40;
const COLORS = ['bg-[#A855F7]'];

// --- Sub-Component: Slime Drip Column ---
interface SlimeDripProps {
  index: number;
  total: number;
}

const SlimeDrip: React.FC<SlimeDripProps> = ({ index, total }) => {
  // ORGANIC VARIABILITY LOGIC:
  const isGlob = Math.random() > 0.7;
  const widthVal = isGlob 
    ? 10 + Math.random() * 15 // Glob: 10vw to 25vw
    : 2 + Math.random() * 6;  // String: 2vw to 8vw
  const width = `${widthVal}vw`;
  
  const gridPos = (index / total) * 100;
  const jitter = (Math.random() - 0.5) * (isGlob ? 5 : 10);
  const left = `${Math.max(-20, Math.min(120, gridPos + jitter))}%`;
  
  const color = COLORS[0];
  const duration = (isGlob ? 3 : 2) + Math.random() * 1.5;
  const delay = Math.random() * 0.5;

  return (
    <motion.div
      className={cn(
        "absolute top-0 rounded-full opacity-100",
        color
      )}
      style={{
        width: width,
        left: left,
        height: '150vh',
        transformOrigin: 'top',
        zIndex: isGlob ? 10 : 20,
      }}
      initial={{ y: '-150vh' }}
      animate={{ y: '120vh' }}
      transition={{
        duration: duration,
        ease: isGlob ? [0.45, 0, 0.55, 1] : [0.32, 0, 0.67, 0],
        delay: delay,
      }}
    />
  );
};

// --- Main Component: Spectral River Transition ---
export interface SpectralRiverProps {
  /** Controls whether the transition is active */
  isActive: boolean;
  /** Callback invoked when the transition animation completes */
  onComplete?: () => void;
}

/**
 * SpectralRiver - A dramatic full-screen page transition component
 * that creates a liquid slime/goo animation effect with animated purple drips
 */
const SpectralRiverComponent: React.FC<SpectralRiverProps> = ({ isActive, onComplete }) => {
  const filterId = React.useId();
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        onComplete?.();
        document.body.style.overflow = '';
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-center items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="spectral-river-overlay"
          aria-hidden="true"
        >
          {/* 1. SVG Filter Definition */}
          {/* colorInterpolationFilters="sRGB" prevents dark fringing on the blur */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id={`spectral-goo-${filterId}`} colorInterpolationFilters="sRGB">
                {/* 1. Blur: Reduced deviation slightly for sharper, less messy edges */}
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                {/* 2. Contrast: Smoother Alpha Threshold (18 -7 instead of 21 -9) */}
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                {/* 3. Specular Lighting: Smoothed the height map input */}
                <feGaussianBlur in="goo" stdDeviation="5" result="gooBlur" />
                <feSpecularLighting
                  in="gooBlur"
                  surfaceScale="8"
                  specularConstant="1.2"
                  specularExponent="25"
                  lightingColor="#ffffff"
                  result="specular"
                >
                  <feDistantLight azimuth="225" elevation="60" />
                </feSpecularLighting>
                {/* 4. Composite */}
                <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
                <feComposite in="specularInGoo" in2="goo" operator="over" />
              </filter>
            </defs>
          </svg>

          {/* 2. The Liquid Container */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ filter: `url(#spectral-goo-${filterId})` }}
          >
            {/* The drips falling down */}
            {Array.from({ length: NUM_DRIPS }).map((_, i) => (
              <SlimeDrip key={i} index={i} total={NUM_DRIPS} />
            ))}
            {/* A Main Backing Layer to ensure total coverage */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[200vh] bg-[#A855F7]"
              initial={{ y: '-200%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 3.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          {/* 3. Ambient Fog/Haze Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, times: [0, 0.5, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

SpectralRiverComponent.displayName = 'SpectralRiver';

export const SpectralRiver = SpectralRiverComponent;
