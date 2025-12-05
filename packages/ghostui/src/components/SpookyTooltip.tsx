'use client';

import React, { useState, useId, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useThemeOptional, type Theme } from './ThemeProvider';

// Theme color configuration for SpookyTooltip
const themeColors = {
    spectral: {
        border: 'border-purple-500/40',
        arrowColor: 'purple-500',
        glowBg: 'bg-purple-500/10',
    },
    blood: {
        border: 'border-red-500/40',
        arrowColor: 'red-500',
        glowBg: 'bg-red-500/10',
    },
} as const;

// Arrow styles per theme
const getArrowStyles = (theme: Theme) => {
    const color = theme === 'blood' ? 'border-t-red-500' : 'border-t-purple-500';
    const colorBottom = theme === 'blood' ? 'border-b-red-500' : 'border-b-purple-500';
    const colorLeft = theme === 'blood' ? 'border-l-red-500' : 'border-l-purple-500';
    const colorRight = theme === 'blood' ? 'border-r-red-500' : 'border-r-purple-500';
    
    return {
        top: `top-full left-1/2 -translate-x-1/2 ${color} border-l-transparent border-r-transparent border-b-transparent`,
        bottom: `bottom-full left-1/2 -translate-x-1/2 ${colorBottom} border-l-transparent border-r-transparent border-t-transparent`,
        left: `left-full top-1/2 -translate-y-1/2 ${colorLeft} border-t-transparent border-b-transparent border-r-transparent`,
        right: `right-full top-1/2 -translate-y-1/2 ${colorRight} border-t-transparent border-b-transparent border-l-transparent`,
    };
};

export interface SpookyTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export const SpookyTooltip = React.forwardRef<HTMLDivElement, SpookyTooltipProps>(
  ({ content, children, position = 'top', className }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId();
    
    // Connect to ThemeProvider context if available
    const themeContext = useThemeOptional();
    const theme: Theme = themeContext?.theme ?? 'spectral';
    const colors = themeColors[theme];
    const arrowStyles = getArrowStyles(theme);

    const positionStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    // Clone the child element to add aria-describedby attribute
    const childWithAria = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, {
              'aria-describedby': isVisible ? tooltipId : undefined,
              onFocus: (e: React.FocusEvent) => {
                  setIsVisible(true);
                  // Call original onFocus if it exists
                  const originalOnFocus = (children as React.ReactElement<any>).props.onFocus;
                  if (originalOnFocus) {
                      originalOnFocus(e);
                  }
              },
              onBlur: (e: React.FocusEvent) => {
                  setIsVisible(false);
                  // Call original onBlur if it exists
                  const originalOnBlur = (children as React.ReactElement<any>).props.onBlur;
                  if (originalOnBlur) {
                      originalOnBlur(e);
                  }
              },
          })
        : children;

    return (
        <div
            ref={ref}
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {childWithAria}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        id={tooltipId}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            // Ghostly float animation
                            rotate: [0, -2, 2, 0],
                            x: [0, -2, 2, 0]
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 },
                            // Loop the float
                            rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                            x: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                        className={cn(
                            "absolute z-50 px-3 py-2 text-sm text-ghost-white bg-ghost-dark rounded-md shadow-lg border max-w-xs",
                            colors.border,
                            positionStyles[position],
                            className
                        )}
                        role="tooltip"
                    >
                        <div className="relative z-10">{content}</div>

                        {/* Arrow */}
                        <div
                            className={cn(
                                "absolute w-0 h-0 border-[6px]",
                                arrowStyles[position]
                            )}
                        />

                        {/* Theme-aware glow */}
                        <div className={cn("absolute inset-0 rounded-md blur-sm -z-10", colors.glowBg)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
  }
);

SpookyTooltip.displayName = 'SpookyTooltip';
