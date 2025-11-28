'use client';

import React, { useState, useId, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export interface SpookyTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export const SpookyTooltip: React.FC<SpookyTooltipProps> = ({
    content,
    children,
    position = 'top',
    className,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId();

    const positionStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowStyles = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-ghost-purple border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-ghost-purple border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-ghost-purple border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-ghost-purple border-t-transparent border-b-transparent border-l-transparent',
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
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {childWithAria}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        id={tooltipId}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ 
                            opacity: 1, 
                            y: -5, 
                            scale: 1,
                            // Ghostly float animation
                            rotate: [0, -2, 2, 0],
                            x: [0, -2, 2, 0]
                        }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                            // Loop the float
                            rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                            x: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                        className={cn(
                            "absolute z-50 px-3 py-2 text-sm text-ghost-white bg-ghost-dark border border-ghost-purple/40 rounded-md shadow-lg whitespace-nowrap",
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

                        {/* Spectral glow */}
                        <div className="absolute inset-0 bg-ghost-purple/10 rounded-md blur-sm -z-10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
