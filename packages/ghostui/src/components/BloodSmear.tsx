'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// --- Configuration ---
const NUM_DRIPS = 65;

// --- Sub-Component: Blood Drip Column ---
interface BloodDripProps {
  index: number;
  total: number;
}

const BloodDrip: React.FC<BloodDripProps> = ({ index, total }) => {
  // ORGANIC VARIABILITY LOGIC:
  const isGlob = Math.random() > 0.7;
  const widthVal = isGlob 
    ? 4 + Math.random() * 11
    : 0.5 + Math.random() * 2;
  const width = `${widthVal}vw`;
  
  const gridPos = (index / total) * 100;
  const jitter = (Math.random() - 0.5) * (isGlob ? 10 : 18);
  const left = `${Math.max(-15, Math.min(115, gridPos + jitter))}%`;
  
  // More organic timing with smoother easing
  const duration = (isGlob ? 2.8 : 2.2) + Math.random() * 1.6;
  const delay = Math.random() * 1.0; // Increased delay range for more organic staggering

  return (
    <motion.div
      className="absolute top-0"
      style={{
        width: width,
        left: left,
        height: '170vh',
        backgroundColor: '#8B0000',
        transformOrigin: 'top',
        opacity: 0.88,
        borderRadius: isGlob ? '50%' : '45% 55% 45% 55%',
      }}
      initial={{ y: '-170vh' }}
      animate={{ y: '110vh' }}
      transition={{
        duration: duration,
        ease: [0.45, 0.05, 0.55, 0.95], // Smoother, more organic easing
        delay: delay,
      }}
    />
  );
};

// --- Main Component: Blood Smear Transition ---
export interface BloodSmearProps {
  /** Controls whether the transition is active */
  isNavigating: boolean;
  /** Callback invoked when the transition animation completes */
  onComplete?: () => void;
  /** Optional custom classes for the overlay container */
  className?: string;
}

/**
 * BloodSmear - A dramatic full-screen page transition component
 * that creates a viscous blood-dripping animation effect with organic flow
 */
export const BloodSmear: React.FC<BloodSmearProps> = ({ 
  isNavigating, 
  onComplete,
  className 
}) => {
  useEffect(() => {
    if (isNavigating) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        onComplete?.();
        document.body.style.overflow = '';
      }, 3500);
      return () => clearTimeout(timer);
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
          data-testid="blood-smear-overlay"
        >
          {/* SVG Filter Definition - Ultra Smooth Organic Blood Effect */}
          <svg className="absolute w-0 h-0">
            <defs>
              {/* Main blood gooey filter with smooth merging */}
              <filter id="blood-goo" colorInterpolationFilters="sRGB" x="-50%" y="-50%" width="200%" height="200%">
                {/* Step 1: Subtle organic texture (reduced for smoothness) */}
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
                  scale="8"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="organic"
                />
                
                {/* Step 2: Large initial blur for smooth merging */}
                <feGaussianBlur in="organic" stdDeviation="22" result="blur" />
                
                {/* Step 3: Moderate contrast for smooth edges (reduced from 28 -11) */}
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
                  result="goo"
                />
                
                {/* Step 4: Additional smoothing blur */}
                <feGaussianBlur in="goo" stdDeviation="3" result="smoothGoo" />
                
                {/* Step 5: Another pass for ultra-smooth edges */}
                <feGaussianBlur in="smoothGoo" stdDeviation="1" result="ultraSmooth" />
                
                {/* Step 6: Color adjustment for deep blood red */}
                <feColorMatrix
                  in="ultraSmooth"
                  type="matrix"
                  values="0.85 0 0 0 0
                          0 0.08 0 0 0
                          0 0 0.08 0 0
                          0 0 0 1 0"
                  result="bloodColor"
                />
                
                {/* Step 7: Smooth highlight preparation */}
                <feGaussianBlur in="bloodColor" stdDeviation="4" result="highlightBlur" />
                
                {/* Step 8: White highlights for visual pop */}
                <feSpecularLighting
                  in="highlightBlur"
                  surfaceScale="6"
                  specularConstant="1.0"
                  specularExponent="20"
                  lightingColor="#ffffff"
                  result="whiteHighlight"
                >
                  <fePointLight x="200" y="80" z="250" />
                </feSpecularLighting>
                
                {/* Step 9: Composite white highlight smoothly */}
                <feComposite in="whiteHighlight" in2="bloodColor" operator="in" result="highlightInBlood" />
                <feComposite 
                  in="bloodColor" 
                  in2="highlightInBlood" 
                  operator="arithmetic"
                  k1="0"
                  k2="1"
                  k3="0.3"
                  k4="0"
                  result="withHighlight"
                />
                
                {/* Step 10: Subtle red shine for depth */}
                <feSpecularLighting
                  in="highlightBlur"
                  surfaceScale="3"
                  specularConstant="0.5"
                  specularExponent="12"
                  lightingColor="#cc0000"
                  result="redShine"
                >
                  <fePointLight x="100" y="150" z="180" />
                </feSpecularLighting>
                
                {/* Step 11: Final smooth composite */}
                <feComposite in="redShine" in2="withHighlight" operator="in" result="shineInBlood" />
                <feComposite 
                  in="withHighlight" 
                  in2="shineInBlood" 
                  operator="arithmetic"
                  k1="0"
                  k2="1"
                  k3="0.12"
                  k4="0"
                  result="final"
                />
                
                {/* Step 12: Final smoothing pass to eliminate any jaggedness */}
                <feGaussianBlur in="final" stdDeviation="0.5" result="finalSmooth" />
              </filter>
            </defs>
          </svg>

          {/* The Blood Container with Ultra-Smooth Gooey Filter */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ filter: "url(#blood-goo)" }}
          >
            {/* Dynamic blood drips with organic timing */}
            {Array.from({ length: NUM_DRIPS }).map((_, i) => (
              <BloodDrip key={i} index={i} total={NUM_DRIPS} />
            ))}
            
            {/* Main Blood Backing Layer with smooth animation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[200vh]"
              style={{
                backgroundColor: '#8B0000',
              }}
              initial={{ y: '-200%' }}
              animate={{ y: '100%' }}
              transition={{ 
                duration: 3.4, 
                ease: [0.45, 0.05, 0.55, 0.95], // Matching smooth easing
                delay: 0.25 
              }}
            />
          </div>

          {/* Subtle dark overlay for depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3.0, times: [0, 0.5, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
