'use client';

import React from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility: cn ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Theme Types & Config ---
interface ThemeConfig {
  bg: string;
  glow: string;
  text: string;
  drip: string;
}

const themes: Record<'slime' | 'blood' | 'ectoplasm', ThemeConfig> = {
  slime: {
    bg: 'bg-[#32CD32]',
    glow: 'shadow-[0_0_20px_rgba(50,205,50,0.7)]',
    text: 'text-lime-950',
    drip: 'bg-[#32CD32]',
  },
  blood: {
    bg: 'bg-[#DC143C]',
    glow: 'shadow-[0_0_20px_rgba(220,20,60,0.7)]',
    text: 'text-red-100',
    drip: 'bg-[#DC143C]',
  },
  ectoplasm: {
    bg: 'bg-[#9400D3]',
    glow: 'shadow-[0_0_25px_rgba(148,0,211,0.7)]',
    text: 'text-purple-100',
    drip: 'bg-[#9400D3]',
  },
};

// Fluidity configuration for animation control
interface FluidityConfig {
  duration: number;
  displacement: number;
}

const fluiditySettings: Record<'low' | 'medium' | 'high', FluidityConfig> = {
  low: { duration: 2.5, displacement: 25 },
  medium: { duration: 1.8, displacement: 40 },
  high: { duration: 1.2, displacement: 55 },
};

export interface GooeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slime' | 'blood' | 'ectoplasm';
  fluidity?: 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}
export const GooeyButton = React.forwardRef<HTMLButtonElement, GooeyButtonProps>(
  (
    {
      className,
      variant = 'ectoplasm',
      fluidity = 'medium',
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    // Sanitize ID for selector usage
    const filterId = `goo-filter-${id.replace(/:/g, '')}`;

    const [isHovered, setIsHovered] = React.useState(false);
    const [clickKey, setClickKey] = React.useState(0);

    const theme = themes[variant] || themes.ectoplasm;
    const fluidityConfig = fluiditySettings[fluidity] || fluiditySettings.medium;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Trigger splash animation by updating key
      setClickKey(prev => prev + 1);
      onClick?.(e);
    };

    // Drip stem animation variants (the connecting part)
    const createDripStemVariants = (delay: number): Variants => ({
      initial: { y: 0, scaleY: 1 },
      hover: {
        y: [0, fluidityConfig.displacement * 0.3, 0],
        scaleY: [1, 2, 1], // Stretch vertically to connect to leading circle
        transition: {
          duration: fluidityConfig.duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay,
        },
      },
    });

    // Leading circle animation variants (the droplet head)
    const createDripLeadVariants = (delay: number): Variants => ({
      initial: { y: 0, scale: 1 },
      hover: {
        y: [0, fluidityConfig.displacement, 0],
        scale: [1, 1.2, 1], // Grow slightly as it drops
        transition: {
          duration: fluidityConfig.duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay,
        },
      },
    });

    // Body wobble variants for "gooey itself" hover state
    const bodyVariants: Variants = {
      initial: { scale: 1, borderRadius: "9999px" },
      hover: {
        scale: [1, 1.02, 0.98, 1.01, 1],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror", // Makes it breathe in/out organically
          ease: "easeInOut"
        }
      },
      tap: { scale: 0.95 }
    };

    return (
      <div 
        className="relative inline-block z-10 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. SVG Filter Definition (Includes Specular Lighting) */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id={filterId}>
              {/* Blur & Contrast for Goo Shape */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              {/* Specular Lighting for Shine/Glare */}
              <feGaussianBlur in="goo" stdDeviation="3" result="gooBlur" />
              <feSpecularLighting 
                in="gooBlur" 
                surfaceScale="3" 
                specularConstant="1.2" 
                specularExponent="20" 
                lightingColor="#ffffff"  
                result="specular"
              >
                <feDistantLight azimuth="225" elevation="45" />
              </feSpecularLighting>
              {/* Composite Shine onto Goo */}
              <feComposite in="specular" in2="goo" operator="in" result="specularInGoo" />
              <feComposite in="specularInGoo" in2="goo" operator="over" />
            </filter>
          </defs>
        </svg>

        {/* 2. Outer Glow Ring (Static, behind everything) */}
        <div
          className={cn(
            'absolute inset-0 rounded-full pointer-events-none transition-all duration-300',
            theme.glow,
            isHovered ? 'opacity-100 scale-105' : 'opacity-60 scale-100'
          )}
          style={{ zIndex: -1 }}
        />

        {/* 3. Liquid Layer (Background + Drips + Splash) -> GETS THE FILTER */}
        {/* We separate this so text stays crisp outside the filter */}
        <div
          className="absolute inset-0"
          style={{ filter: `url(#${filterId})` }}
        >
          {/* Main Button Body - Now Animated */}
          <motion.div 
            className={cn(
              "w-full h-full rounded-full",
              theme.bg,
              disabled && 'opacity-50'
            )}
            variants={bodyVariants}
            initial="initial"
            animate={isHovered && !disabled ? "hover" : "initial"}
            whileTap={!disabled ? "tap" : undefined}
          />

          {/* Drip Elements (Attached to body) - Each drip has a stem + leading circle */}
          <motion.div
            initial="initial"
            animate={isHovered && !disabled ? 'hover' : 'initial'}
            className="absolute inset-0"
          >
            {/* Drip 1 - Left */}
            <motion.div
              className={cn('absolute w-3 h-4 rounded-full motion-reduce:hidden', theme.drip)}
              style={{ left: '25%', bottom: '50%', transformOrigin: 'top' } as React.CSSProperties}
              variants={createDripStemVariants(0)}
            />
            <motion.div
              className={cn('absolute w-5 h-5 rounded-full motion-reduce:hidden', theme.drip)}
              style={{ left: '25%', bottom: '45%', transform: 'translateX(-15%)', transformOrigin: 'top' } as React.CSSProperties}
              variants={createDripLeadVariants(0)}
            />

            {/* Drip 2 - Center (larger) */}
            <motion.div
              className={cn('absolute w-4 h-5 rounded-full motion-reduce:hidden', theme.drip)}
              style={{ left: '50%', bottom: '50%', transformOrigin: 'top' } as React.CSSProperties}
              variants={createDripStemVariants(0.2)}
            />
            <motion.div
              className={cn('absolute w-7 h-7 rounded-full motion-reduce:hidden', theme.drip)}
              style={{ left: '50%', bottom: '42%', transform: 'translateX(-20%)', transformOrigin: 'top' } as React.CSSProperties}
              variants={createDripLeadVariants(0.2)}
            />

            {/* Drip 3 - Right */}
            <motion.div
              className={cn('absolute w-3 h-4 rounded-full motion-reduce:hidden', theme.drip)}
              style={{ left: '75%', bottom: '50%', transformOrigin: 'top' } as React.CSSProperties}
              variants={createDripStemVariants(0.4)}
            />
            <motion.div
              className={cn('absolute w-5 h-5 rounded-full motion-reduce:hidden', theme.drip)}
              style={{ left: '75%', bottom: '45%', transform: 'translateX(-15%)', transformOrigin: 'top' } as React.CSSProperties}
              variants={createDripLeadVariants(0.4)}
            />
          </motion.div>

          {/* Splash/Ripple Effect on Click */}
          <AnimatePresence>
            {clickKey > 0 && (
              <motion.div
                key={clickKey}
                className={cn("absolute inset-0 rounded-full", theme.bg)}
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* 4. Content Layer (Text/Interaction) -> NO FILTER */}
        <button
          ref={ref}
          onClick={handleClick}
          className={cn(
            'relative block w-full h-full px-8 py-3 rounded-full font-bold text-lg',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500',
            theme.text,
            disabled && 'cursor-not-allowed',
            className
          )}
          disabled={disabled}
          {...props}
        >
          <span className="relative z-10 drop-shadow-sm">{children}</span>

          {/* Subtle inner highlight on top of text layer for extra depth */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-40"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%)',
            }}
          />
        </button>
      </div>
    );
  }
);

GooeyButton.displayName = 'GooeyButton';
