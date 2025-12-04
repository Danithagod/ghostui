'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useThemeOptional, type Theme } from './ThemeProvider';

// --- Type Definitions ---

/**
 * Placement options for the drawer
 */
export type Placement = 'right' | 'left' | 'bottom' | 'top';

/**
 * Configuration for individual drip animations
 */
export interface DripConfig {
  id: number;
  width: number;        // Width in pixels (15-45px)
  height: number;       // Initial height in pixels (20-60px)
  left: string;         // Position as percentage (10-90%)
  duration: number;     // Animation duration in seconds (2-4s)
  delay: number;        // Animation delay in seconds (0-2s)
  stretch: number;      // Extension distance in pixels (30-80px)
}

/**
 * Props for the GooeyDrawer component
 */
export interface GooeyDrawerProps {
  /** Controls drawer visibility */
  isOpen: boolean;
  
  /** Callback invoked when drawer should close */
  onClose: () => void;
  
  /** Screen edge placement */
  placement?: Placement;
  
  /** Content to render inside drawer */
  children: React.ReactNode;
  
  /** Additional CSS classes for customization */
  className?: string;
}

// --- Component Implementation ---

// Theme color configuration for GooeyDrawer - matches FloatingCard
const themeColors = {
  spectral: {
    background: '#2e1065', // Deep purple background (--ghost-bg-secondary)
    accent: '#FF6F00', // Orange accent (--ghost-accent)
    accentRgb: '255, 111, 0',
    text: '#e9d5ff', // Light purple text (--ghost-text)
  },
  blood: {
    background: '#450a0a', // Deep red background (--ghost-bg-secondary)
    accent: '#ef4444', // Red accent (--ghost-accent)
    accentRgb: '239, 68, 68',
    text: '#fecaca', // Light red text (--ghost-text)
  },
} as const;

/**
 * Position classes for each placement option
 */
const positionClasses: Record<Placement, string> = {
  right: "fixed top-1/2 right-8 h-[70vh] w-[350px] -translate-y-1/2",
  left: "fixed top-1/2 left-8 h-[70vh] w-[350px] -translate-y-1/2",
  bottom: "fixed bottom-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2",
  top: "fixed top-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2",
};

/**
 * Generate animation variants based on placement
 */
const getAnimationVariants = (placement: Placement) => {
  // Calculate off-screen transforms based on placement
  const transforms = {
    right: { x: '120%', y: '0%' },
    left: { x: '-120%', y: '0%' },
    bottom: { x: '0%', y: '120%' },
    top: { x: '0%', y: '-120%' },
  };

  const offScreen = transforms[placement];

  return {
    hidden: {
      x: offScreen.x,
      y: offScreen.y,
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      x: '0%',
      y: '0%',
      scale: 1.0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 180,
        mass: 0.8,
      },
    },
    exit: {
      x: offScreen.x,
      y: offScreen.y,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'anticipate' as const,
      },
    },
  };
};

/**
 * DrawerStyles - Injects global CSS for fonts and utilities
 */
const DrawerStyles: React.FC = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');

      .font-creep {
        font-family: 'Creepster', cursive;
      }

      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  );
};

/**
 * GooeyMesh - Renders the liquid background with animated drips (matches GooeyCard)
 */
const GooeyMesh: React.FC<{ backgroundColor: string; placement: Placement }> = ({ backgroundColor, placement }) => {
  // Drip configurations based on placement - 6 drips, 25% bigger and longer, more spaced out
  const getDripConfigs = () => {
    if (placement === 'right') {
      // Drips on the right edge - more spaced out
      return [
        { position: 'right-8', width: 'w-6', top: 'calc(100% - 44px)', heights: ['50px', '113px', '50px'], duration: 5.0, delay: 0 },
        { position: 'right-20', width: 'w-5', top: 'calc(100% - 38px)', heights: ['44px', '100px', '44px'], duration: 5.5, delay: 0.6 },
        { position: 'right-32', width: 'w-7', top: 'calc(100% - 50px)', heights: ['56px', '125px', '56px'], duration: 4.7, delay: 1.2 },
        { position: 'right-44', width: 'w-5', top: 'calc(100% - 40px)', heights: ['48px', '106px', '48px'], duration: 5.3, delay: 1.8 },
        { position: 'right-56', width: 'w-6', top: 'calc(100% - 45px)', heights: ['53px', '119px', '53px'], duration: 5.1, delay: 2.4 },
        { position: 'right-68', width: 'w-5', top: 'calc(100% - 41px)', heights: ['46px', '103px', '46px'], duration: 5.2, delay: 3.0 },
      ];
    } else if (placement === 'left') {
      // Drips on the left edge - more spaced out
      return [
        { position: 'left-8', width: 'w-6', top: 'calc(100% - 44px)', heights: ['50px', '113px', '50px'], duration: 5.0, delay: 0 },
        { position: 'left-20', width: 'w-5', top: 'calc(100% - 38px)', heights: ['44px', '100px', '44px'], duration: 5.5, delay: 0.6 },
        { position: 'left-32', width: 'w-7', top: 'calc(100% - 50px)', heights: ['56px', '125px', '56px'], duration: 4.7, delay: 1.2 },
        { position: 'left-44', width: 'w-5', top: 'calc(100% - 40px)', heights: ['48px', '106px', '48px'], duration: 5.3, delay: 1.8 },
        { position: 'left-56', width: 'w-6', top: 'calc(100% - 45px)', heights: ['53px', '119px', '53px'], duration: 5.1, delay: 2.4 },
        { position: 'left-68', width: 'w-5', top: 'calc(100% - 41px)', heights: ['46px', '103px', '46px'], duration: 5.2, delay: 3.0 },
      ];
    } else {
      // Spread across bottom for top/bottom placement - more spaced out
      return [
        { position: 'left-[10%]', width: 'w-6', top: 'calc(100% - 44px)', heights: ['50px', '113px', '50px'], duration: 5.0, delay: 0 },
        { position: 'left-[25%]', width: 'w-5', top: 'calc(100% - 38px)', heights: ['44px', '100px', '44px'], duration: 5.5, delay: 0.6 },
        { position: 'left-[40%]', width: 'w-7', top: 'calc(100% - 50px)', heights: ['56px', '125px', '56px'], duration: 4.7, delay: 1.2 },
        { position: 'left-[55%]', width: 'w-5', top: 'calc(100% - 40px)', heights: ['48px', '106px', '48px'], duration: 5.3, delay: 1.8 },
        { position: 'left-[70%]', width: 'w-6', top: 'calc(100% - 45px)', heights: ['53px', '119px', '53px'], duration: 5.1, delay: 2.4 },
        { position: 'left-[85%]', width: 'w-5', top: 'calc(100% - 41px)', heights: ['46px', '103px', '46px'], duration: 5.2, delay: 3.0 },
      ];
    }
  };

  // Pool configurations based on placement - 3 static pools, 25% bigger and more spaced out
  const getPoolConfigs = () => {
    if (placement === 'right') {
      return [
        { position: 'right-6', width: 'w-15', height: 'h-8', bottom: '-bottom-3' },
        { position: 'right-24', width: 'w-10', height: 'h-8', bottom: '-bottom-3' },
        { position: 'right-48', width: 'w-6', height: 'h-5', bottom: '-bottom-2' },
      ];
    } else if (placement === 'left') {
      return [
        { position: 'left-6', width: 'w-15', height: 'h-8', bottom: '-bottom-3' },
        { position: 'left-24', width: 'w-10', height: 'h-8', bottom: '-bottom-3' },
        { position: 'left-48', width: 'w-6', height: 'h-5', bottom: '-bottom-2' },
      ];
    } else {
      return [
        { position: 'left-[20%]', width: 'w-15', height: 'h-8', bottom: '-bottom-3' },
        { position: 'left-[50%]', width: 'w-10', height: 'h-8', bottom: '-bottom-3' },
        { position: 'left-[80%]', width: 'w-6', height: 'h-5', bottom: '-bottom-2' },
      ];
    }
  };

  const dripConfigs = getDripConfigs();
  const poolConfigs = getPoolConfigs();

  return (
    <div className="absolute inset-0">
      {/* Background Shape */}
      <div 
        className="absolute inset-0 rounded-[2rem]" 
        style={{ backgroundColor }}
      />

      {/* Animated Drips */}
      {dripConfigs.map((drip, index) => (
        <motion.div
          key={`drip-${index}`}
          className={cn(
            'absolute rounded-full motion-reduce:hidden',
            drip.width,
            drip.position
          )}
          style={{
            top: drip.top,
            transformOrigin: 'top',
            backgroundColor,
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
            pool.bottom
          )}
          style={{ backgroundColor }}
        />
      ))}
    </div>
  );
};

/**
 * GooeyDrawer - An animated overlay component with liquid dripping effects
 * 
 * Features:
 * - Slides in from any screen edge (top, right, bottom, left)
 * - Animated liquid drips with SVG filter effects
 * - Specular lighting for 3D appearance
 * - Backdrop with click-to-close
 * - Keyboard support (Escape to close)
 * - Scrollable content area
 */
export const GooeyDrawer: React.FC<GooeyDrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  children,
  className,
}) => {
  // Connect to ThemeProvider context if available
  const themeContext = useThemeOptional();
  const theme: Theme = themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];

  // Generate unique filter ID and sanitize it (replace colons)
  const rawFilterId = React.useId();
  const filterId = rawFilterId.replace(/:/g, '');

  // Keyboard event handling - Escape key to close drawer
  React.useEffect(() => {
    // Only attach listener when drawer is open
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Attach event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <DrawerStyles />
      
      {/* SVG Filter Definition - Hidden but defines the goo effect */}
      <svg
        className="absolute w-0 h-0"
        aria-hidden="true"
      >
        <defs>
          <filter id={`goo-drawer-${filterId}`}>
            {/* Stage 1: Initial blur to create soft edges */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            
            {/* Stage 2: Color matrix to increase contrast and create goo effect */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            
            {/* Stage 3: Smooth the goo effect */}
            <feGaussianBlur
              in="goo"
              stdDeviation="2"
              result="smoothGoo"
            />
            
            {/* Stage 4: Add specular lighting for 3D effect */}
            <feSpecularLighting
              in="smoothGoo"
              surfaceScale="8"
              specularConstant="2.5"
              specularExponent="30"
              lightingColor={colors.accent}
              result="specular"
            >
              {/* Light source positioned at azimuth 235°, elevation 50° */}
              <feDistantLight azimuth="235" elevation="50" />
            </feSpecularLighting>
            
            {/* Stage 5: Composite the specular lighting with the goo */}
            <feComposite
              in="specular"
              in2="smoothGoo"
              operator="in"
              result="specularGoo"
            />
            
            {/* Stage 6: Composite Lighting + Goo */}
            <feComposite
              in="specular"
              in2="goo"
              operator="in"
              result="specularClean"
            />
            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"
              result="solidGoo"
            />
            <feComposite
              in="specularClean"
              in2="solidGoo"
              operator="over"
            />
          </filter>
        </defs>
      </svg>

      {/* AnimatePresence wrapper for enter/exit animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - semi-transparent overlay with click-to-close */}
            <motion.div
              className="fixed inset-0 z-40 bg-[#05020a]/60 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Drawer Container */}
            <motion.div
              className={cn(
                positionClasses[placement],
                "z-50 pointer-events-none",
                className
              )}
              variants={getAnimationVariants(placement)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Wrapper needs visible overflow for drips to hang down */}
              <div className="relative w-full h-full pointer-events-auto">
                {/* Liquid layer with filter - z-10 */}
                <div
                  className="absolute inset-0 z-10 h-[120%]"
                  style={{
                    filter: `url(#goo-drawer-${filterId})`,
                    top: 0,
                  }}
                >
                  <div className="w-full h-[83.3%] relative">
                    <GooeyMesh backgroundColor={colors.background} placement={placement} />
                  </div>
                </div>

                {/* Content layer (unfiltered) - Requirements 6.3, 6.4, 6.5 */}
                <div className="relative z-10 w-full h-full flex flex-col p-1">
                  {/* Inner Container with Clipping for Content */}
                  <div 
                    className="flex-1 rounded-[2rem] border overflow-hidden flex flex-col shadow-inner"
                    style={{ borderColor: `rgba(${colors.accentRgb}, 0.1)` }}
                  >
                    {/* Header section - Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6 */}
                    <div 
                      className="p-5 border-b flex items-center justify-between"
                      style={{ 
                        borderColor: `rgba(${colors.accentRgb}, 0.1)`,
                        backgroundColor: `rgba(${colors.accentRgb}, 0.05)`
                      }}
                    >
                      {/* Left side: icon + title */}
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg shadow-sm"
                          style={{ backgroundColor: colors.background }}
                        >
                          <Ghost className="w-5 h-5" style={{ color: colors.accent }} />
                        </div>
                        <h2 
                          className="font-creep text-2xl tracking-wider drop-shadow-sm"
                          style={{ color: colors.text }}
                        >
                          Possession
                        </h2>
                      </div>
                      
                      {/* Right side: close button */}
                      <button
                        onClick={onClose}
                        className="p-2 rounded-full"
                        style={{ 
                          color: colors.text,
                          opacity: 0.6,
                        }}
                        aria-label="Close drawer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Scrollable body area - Requirements 9.1, 9.2, 9.3, 9.4, 9.5 */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-3">
                      {children}
                    </div>
                  </div>
                </div>

                {/* Decorative Border Overlay - z-30 */}
                <div 
                  className="absolute inset-0 rounded-[2rem] pointer-events-none z-30" 
                  style={{ 
                    border: `1px solid rgba(${colors.accentRgb}, 0.25)`,
                    boxShadow: `inset 0 0 30px rgba(${colors.accentRgb}, 0.08)`
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

GooeyDrawer.displayName = 'GooeyDrawer';
