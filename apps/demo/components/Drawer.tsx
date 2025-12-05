'use client';

import React, { useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useThemeOptional } from 'ghostui-react';

export type DrawerPlacement = 'right' | 'left' | 'bottom' | 'top';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  width?: string;
  height?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Theme colors
const themeColors = {
  spectral: {
    background: '#2e1065',
    accent: '#FF6F00',
    accentRgb: '255, 111, 0',
    text: '#e9d5ff',
  },
  blood: {
    background: '#450a0a',
    accent: '#ef4444',
    accentRgb: '239, 68, 68',
    text: '#fecaca',
  },
} as const;

// Get position classes based on placement and dimensions
const getPositionClasses = (
  placement: DrawerPlacement,
  width: string,
  height: string
): string => {
  switch (placement) {
    case 'right':
      return `fixed top-1/2 right-8 -translate-y-1/2 ${height} ${width}`;
    case 'left':
      return `fixed top-1/2 left-8 -translate-y-1/2 ${height} ${width}`;
    case 'bottom':
      return `fixed bottom-8 left-1/2 -translate-x-1/2 ${width} ${height}`;
    case 'top':
      return `fixed top-8 left-1/2 -translate-x-1/2 ${width} ${height}`;
  }
};

// Animation variants based on placement
const getAnimationVariants = (placement: DrawerPlacement) => {
  // Use viewport-relative transforms that work with fixed positioning
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

// Drip configurations based on placement
const getDripConfigs = (placement: DrawerPlacement) => {
  if (placement === 'right' || placement === 'left') {
    return [
      { position: placement === 'right' ? 'right-8' : 'left-8', width: 'w-5', heights: ['40px', '90px', '40px'], duration: 4.5, delay: 0 },
      { position: placement === 'right' ? 'right-20' : 'left-20', width: 'w-4', heights: ['35px', '80px', '35px'], duration: 5.0, delay: 0.5 },
      { position: placement === 'right' ? 'right-32' : 'left-32', width: 'w-6', heights: ['45px', '100px', '45px'], duration: 4.2, delay: 1.0 },
      { position: placement === 'right' ? 'right-44' : 'left-44', width: 'w-4', heights: ['38px', '85px', '38px'], duration: 4.8, delay: 1.5 },
    ];
  }
  return [
    { position: 'left-[15%]', width: 'w-5', heights: ['40px', '90px', '40px'], duration: 4.5, delay: 0 },
    { position: 'left-[35%]', width: 'w-4', heights: ['35px', '80px', '35px'], duration: 5.0, delay: 0.5 },
    { position: 'left-[55%]', width: 'w-6', heights: ['45px', '100px', '45px'], duration: 4.2, delay: 1.0 },
    { position: 'left-[75%]', width: 'w-4', heights: ['38px', '85px', '38px'], duration: 4.8, delay: 1.5 },
  ];
};

export function Drawer({
  isOpen,
  onClose,
  placement = 'right',
  width,
  height,
  title,
  children,
  className,
}: DrawerProps) {
  // Set default dimensions based on placement
  const isHorizontal = placement === 'top' || placement === 'bottom';
  const defaultWidth = isHorizontal ? 'w-[85vw] max-w-4xl' : 'w-[400px]';
  const defaultHeight = isHorizontal ? 'h-[60vh]' : 'h-[75vh]';
  const finalWidth = width || defaultWidth;
  const finalHeight = height || defaultHeight;
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];
  const rawFilterId = useId();
  const filterId = rawFilterId.replace(/:/g, '');

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const dripConfigs = getDripConfigs(placement);

  return (
    <>
      {/* Drawer styles */}
      <style>{`
        .drawer-no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .drawer-no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* SVG Filter for goo effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`drawer-goo-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="2" result="smoothGoo" />
            <feSpecularLighting
              in="smoothGoo"
              surfaceScale="6"
              specularConstant="2"
              specularExponent="25"
              lightingColor={colors.accent}
              result="specular"
            >
              <feDistantLight azimuth="225" elevation="45" />
            </feSpecularLighting>
            <feComposite in="specular" in2="goo" operator="in" result="specularClean" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" result="solidGoo" />
            <feComposite in="specularClean" in2="solidGoo" operator="over" />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.div
              className={`${getPositionClasses(placement, finalWidth, finalHeight)} z-[101] ${className || ''}`}
              variants={getAnimationVariants(placement)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="relative w-full h-full">
                {/* Goo layer */}
                <div
                  className="absolute inset-0 overflow-visible"
                  style={{ filter: `url(#drawer-goo-${filterId})` }}
                >
                  {/* Main background */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: colors.background }}
                  />

                  {/* Animated drips */}
                  {dripConfigs.map((drip, index) => (
                    <motion.div
                      key={`drip-${index}`}
                      className={`absolute rounded-full ${drip.width} ${drip.position}`}
                      style={{
                        [placement === 'top' || placement === 'bottom' ? 'bottom' : 'top']: 
                          placement === 'top' ? 'auto' : placement === 'bottom' ? '100%' : 'calc(100% - 40px)',
                        [placement === 'top' ? 'top' : 'bottom']: 
                          placement === 'top' ? '100%' : 'auto',
                        transformOrigin: placement === 'top' ? 'bottom' : 'top',
                        backgroundColor: colors.background,
                      }}
                      animate={{ height: drip.heights }}
                      transition={{
                        duration: drip.duration,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                        delay: drip.delay,
                      }}
                    />
                  ))}
                </div>

                {/* Content layer */}
                <div className="relative z-10 w-full h-full flex flex-col rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div
                    className="flex items-center justify-between p-4 border-b flex-shrink-0"
                    style={{
                      borderColor: `rgba(${colors.accentRgb}, 0.15)`,
                      backgroundColor: `rgba(${colors.accentRgb}, 0.05)`,
                    }}
                  >
                    {title && (
                      <h2
                        className="text-xl font-bold truncate"
                        style={{ color: colors.text }}
                      >
                        {title}
                      </h2>
                    )}
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg transition-colors hover:bg-white/10 flex-shrink-0 ml-2"
                      style={{ color: colors.text }}
                      aria-label="Close drawer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto drawer-no-scrollbar p-6">
                    {children}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
