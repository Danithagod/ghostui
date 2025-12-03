'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost } from 'lucide-react';
import { cn } from '../lib/utils';

// --- Component: SpiritInput ---
export interface SpiritInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  ghostIcon?: boolean;
}

export const SpiritInput = React.forwardRef<HTMLInputElement, SpiritInputProps>(
  ({ className, label, error, ghostIcon, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || React.useId();

    return (
      <div className={cn("relative w-full max-w-md", error ? "mb-10" : "mb-6")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block mb-1.5 text-sm font-medium tracking-wide transition-colors duration-500",
              error ? "text-red-500" : isFocused ? "text-[var(--ghost-accent)]" : "text-gray-400"
            )}
          >
            {label}
          </label>
        )}

        <motion.div
          className="relative flex items-center"
          animate={error ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Optional Icon */}
          {ghostIcon && (
            <div
              className={cn(
                "absolute left-0 flex items-center justify-center w-8 h-full transition-all duration-500",
                error ? "text-red-500" : isFocused ? "text-[var(--ghost-accent)]" : "text-gray-600"
              )}
              style={isFocused && !error ? {
                filter: 'drop-shadow(0 0 8px var(--ghost-accent))'
              } : undefined}
            >
              <Ghost size={18} />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-transparent border-none h-9 text-gray-100 outline-none transition-colors duration-500 placeholder:text-gray-700",
              ghostIcon ? "pl-8" : "pl-0.5",
              "pr-0.5",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Base Border (Static) */}
          <div
            className={cn(
              "absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-500",
              error ? "bg-red-900/50" : "bg-gray-700"
            )}
          />

          {/* Animated Underline (Expands from center) - Theme-aware with enhanced glow */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-full origin-center"
            style={{
              backgroundColor: error ? '#ef4444' : 'var(--ghost-accent)',
              boxShadow: error 
                ? '0 0 20px rgba(239,68,68,0.9), 0 0 40px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.3)'
                : '0 0 20px rgba(var(--ghost-accent-rgb),0.9), 0 0 40px rgba(var(--ghost-accent-rgb),0.6), 0 0 60px rgba(var(--ghost-accent-rgb),0.3)'
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isFocused || error ? 1 : 0,
              opacity: isFocused || error ? 1 : 0
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.4, 0, 0.2, 1]
            }}
          />

          {/* Spectral Smoke Effect (Drifts up on focus) - Theme-aware with enhanced glow */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-12 pointer-events-none -z-10"
            style={{ 
              filter: 'blur(12px)',
              backgroundColor: error ? 'rgba(239,68,68,0.15)' : 'rgba(var(--ghost-accent-rgb),0.15)'
            }}
            initial={{ opacity: 0, y: 10, scaleY: 0 }}
            animate={{
              opacity: isFocused && !error ? 0.8 : 0,
              y: isFocused ? -15 : 10,
              scaleY: isFocused ? 2 : 0
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.4, 0, 0.2, 1]
            }}
          />

          {/* Additional ambient glow layer */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none -z-20 rounded-full"
            style={{ 
              filter: 'blur(20px)',
              backgroundColor: error ? 'rgba(239,68,68,0.2)' : 'rgba(var(--ghost-accent-rgb),0.2)'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isFocused && !error ? 0.6 : 0,
              scale: isFocused ? 1.2 : 0.5
            }}
            transition={{ 
              duration: 1, 
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        </motion.div>

        {/* Error Message - positioned outside the motion container */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "mt-2 text-xs text-red-500 font-mono flex items-center gap-1",
                ghostIcon ? "pl-8" : "pl-0.5"
              )}
            >
              <span>†</span> {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

SpiritInput.displayName = "SpiritInput";
