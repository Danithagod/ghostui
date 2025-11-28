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
      <div className="relative mb-8 w-full max-w-md">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block mb-2 text-sm font-medium tracking-wide transition-colors duration-300",
              error ? "text-red-500" : isFocused ? "text-[#A855F7]" : "text-gray-400"
            )}
          >
            {label}
          </label>
        )}

        <motion.div
          className="relative"
          animate={error ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Optional Icon */}
          {ghostIcon && (
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-300",
                error ? "text-red-500" : isFocused ? "text-[#A855F7]" : "text-gray-600"
              )}
            >
              <Ghost size={20} />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-transparent border-none py-2 text-gray-100 outline-none transition-colors placeholder:text-gray-700",
              ghostIcon ? "pl-8" : "px-1",
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
              "absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-300",
              error ? "bg-red-900/50" : "bg-gray-700"
            )}
          />

          {/* Animated Underline (Expands from center) */}
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-[2px] w-full origin-center",
              error
                ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                : "bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.6)]"
            )}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isFocused || error ? 1 : 0,
              opacity: isFocused || error ? 1 : 0
            }}
            transition={{ 
              duration: 0.4, 
              ease: isFocused || error ? "easeOut" : "easeIn"
            }}
          />

          {/* Spectral Smoke Effect (Drifts up on focus) */}
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 w-full h-8 pointer-events-none -z-10",
              error ? "bg-red-500/10" : "bg-[#A855F7]/10"
            )}
            style={{ filter: 'blur(8px)' }}
            initial={{ opacity: 0, y: 10, scaleY: 0 }}
            animate={{
              opacity: isFocused && !error ? 0.6 : 0,
              y: isFocused ? -10 : 10,
              scaleY: isFocused ? 1.5 : 0
            }}
            transition={{ 
              duration: 0.8, 
              ease: isFocused ? "easeOut" : "easeIn"
            }}
          />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute -bottom-6 left-0 text-xs text-red-500 font-mono flex items-center gap-1"
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
