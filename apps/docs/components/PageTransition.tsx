'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Fluid transition types and themes
type FluidVariant = 'blood' | 'slime' | 'ectoplasm';

interface FluidTheme {
  primary: string;
  highlight: string;
  shine: string;
}

const FLUID_THEMES: Record<FluidVariant, FluidTheme> = {
  blood: {
    primary: '#7f1d1d',
    highlight: '#ffcccc',
    shine: '#cc0000',
  },
  slime: {
    primary: '#4d7c0f',
    highlight: '#ecfccb',
    shine: '#84cc16',
  },
  ectoplasm: {
    primary: '#581c87',
    highlight: '#e9d5ff',
    shine: '#a855f7',
  },
};

const NUM_DRIPS = 65;

interface DripConfig {
  id: number;
  width: string;
  left: string;
  duration: number;
  delay: number;
  isGlob: boolean;
  borderRadius: string;
}

const FluidDrip = ({ config, color }: { config: DripConfig; color: string }) => (
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


// Context for triggering transitions from any page
interface PageTransitionContextValue {
  triggerTransition: (variant: FluidVariant, destination: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
};

// The actual transition overlay component
interface FluidTransitionOverlayProps {
  isActive: boolean;
  variant: FluidVariant;
}

const FluidTransitionOverlay: React.FC<FluidTransitionOverlayProps> = ({ isActive, variant }) => {
  const filterId = React.useId();
  const cleanFilterId = `fluid-transition-${filterId.replace(/:/g, '')}`;
  const theme = FLUID_THEMES[variant];

  const drips = React.useMemo(() => {
    return Array.from({ length: NUM_DRIPS }).map((_, index) => {
      const isGlob = Math.random() > 0.7;
      const widthVal = isGlob ? 4 + Math.random() * 11 : 0.5 + Math.random() * 2;
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

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id={cleanFilterId} colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="3" seed="1" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="textured" />
                <feGaussianBlur in="textured" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feGaussianBlur in="goo" stdDeviation="4" result="gooBlur" />
                <feSpecularLighting in="gooBlur" surfaceScale="8" specularConstant="1.8" specularExponent="16" lightingColor={theme.highlight} result="specular">
                  <fePointLight x="-500" y="-1000" z="600" />
                </feSpecularLighting>
                <feSpecularLighting in="gooBlur" surfaceScale="4" specularConstant="0.8" specularExponent="10" lightingColor={theme.shine} result="shine">
                  <fePointLight x="500" y="1000" z="400" />
                </feSpecularLighting>
                <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
                <feComposite in="shine" in2="goo" operator="in" result="shineInGoo" />
                <feComposite in="specularInGoo" in2="goo" operator="over" result="withHighlight" />
                <feComposite in="shineInGoo" in2="withHighlight" operator="over" result="final" />
                <feGaussianBlur in="final" stdDeviation="0.5" />
              </filter>
            </defs>
          </svg>

          <div className="absolute inset-0 w-full h-full" style={{ filter: `url(#${cleanFilterId})` }}>
            {drips.map((drip) => (
              <FluidDrip key={drip.id} config={drip} color={theme.primary} />
            ))}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[200vh]"
              style={{ backgroundColor: theme.primary }}
              initial={{ y: '-200%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 3.5, ease: [0.45, 0.05, 0.55, 0.95], delay: 0.1 }}
            />
          </div>

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


// Provider component that wraps the app
export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [variant, setVariant] = useState<FluidVariant>('blood');

  const triggerTransition = useCallback((newVariant: FluidVariant, destination: string) => {
    if (isActive) return;
    
    setVariant(newVariant);
    setIsActive(true);
    document.body.style.overflow = 'hidden';

    // Navigate when drips have covered past halfway
    setTimeout(() => {
      router.push(destination);
    }, 1100);

    // Clear the transition after animation completes
    setTimeout(() => {
      setIsActive(false);
      document.body.style.overflow = '';
    }, 4000);
  }, [isActive, router]);

  return (
    <PageTransitionContext.Provider value={{ triggerTransition }}>
      <FluidTransitionOverlay isActive={isActive} variant={variant} />
      {children}
    </PageTransitionContext.Provider>
  );
};

export type { FluidVariant };
