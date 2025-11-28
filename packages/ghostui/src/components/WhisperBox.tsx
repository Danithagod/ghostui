'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

// --- Constants ---
const RUNES: string[] = [
  "᚛", "᚜", "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚩ", "ᚳ", "ᚷ", "ᚹ", 
  "ᚻ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", 
  "ᛖ", "ᛗ", "ᛚ", "ᛝ", "ᛟ", "ᛞ"
];

// --- Component: WhisperBox ---
export interface WhisperBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export const WhisperBox = React.forwardRef<HTMLTextAreaElement, WhisperBoxProps>(
  ({ className, label = "Invoke the Spirits", value, defaultValue, onChange, onFocus, onBlur, ...props }, ref) => {
    // Internal state for uncontrolled mode
    const [internalText, setInternalText] = useState<string>((defaultValue as string) || "");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [energy, setEnergy] = useState<number>(0); // 0-100
    const lastTypeTime = useRef<number>(Date.now());

    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const text = isControlled ? (value as string) : internalText;

    // Calculate visual effects from energy
    const glowOpacity = Math.min(energy / 100, 0.8);
    const distortionScale = 20 + (energy / 2);

    // Energy decay system
    useEffect(() => {
      const interval = setInterval(() => {
        setEnergy((prev) => Math.max(0, prev - 5));
      }, 100);
      return () => clearInterval(interval);
    }, []);

    // Handle text changes and energy increase
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Update internal state only if uncontrolled
      if (!isControlled) {
        setInternalText(e.target.value);
      }
      setEnergy((prev) => Math.min(100, prev + 15));
      lastTypeTime.current = Date.now();
      // Call user's onChange handler
      onChange?.(e);
    };

    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      // Call user's onFocus handler
      onFocus?.(e);
    };

    // Handle blur events
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      // Call user's onBlur handler
      onBlur?.(e);
    };

    return (
      <div className="relative w-full max-w-xl">
        {/* SVG Filter Definition */}
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <filter id="ectoplasm-distortion">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.01 0.04" 
                numOctaves={3} 
                result="noise"
              >
                <animate 
                  attributeName="baseFrequency" 
                  dur="15s" 
                  values="0.01 0.04; 0.02 0.06; 0.01 0.04" 
                  repeatCount="indefinite" 
                />
              </feTurbulence>
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale={distortionScale}
              />
            </filter>
          </defs>
        </svg>

        {/* Ectoplasm Border */}
        <div
          className="absolute -inset-1 bg-purple-900/30 rounded transition-opacity duration-300 pointer-events-none"
          style={{
            filter: "url(#ectoplasm-distortion)",
            opacity: isFocused ? 0.6 + (glowOpacity / 2) : 0
          }}
        />

        {/* Whisper Glow */}
        <div
          className="absolute inset-0 bg-purple-500/10 blur-xl rounded pointer-events-none transition-opacity duration-100"
          style={{
            opacity: glowOpacity
          }}
        />

        {/* Floating Runic Symbols */}
        <AnimatePresence>
          {energy > 10 && (
            <>
              {Array.from({ length: 6 }).map((_, i) => {
                const randomRune = RUNES[Math.floor(Math.random() * RUNES.length)];
                const randomX = 10 + Math.random() * 80; // 10-90%
                const randomY = 10 + Math.random() * 80; // 10-90%
                const randomRotation = Math.random() * 360; // 0-360 degrees
                
                return (
                  <motion.div
                    key={`rune-${i}`}
                    className="absolute text-4xl text-purple-300/20 font-rune pointer-events-none"
                    style={{
                      left: `${randomX}%`,
                      top: `${randomY}%`,
                      transform: `rotate(${randomRotation}deg)`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: (Math.random() * 0.5) + (energy / 200),
                      scale: 1,
                      x: Math.random() * 20 - 10,
                      y: Math.random() * 20 - 10
                    }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    {randomRune}
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Label */}
        <label
          className={cn(
            "absolute left-4 top-4 font-rune uppercase tracking-widest transition-all duration-300 pointer-events-none z-10",
            isFocused || text
              ? "text-[10px] -translate-y-7 text-purple-400"
              : "text-xs text-purple-200/50"
          )}
        >
          {label}
        </label>

        {/* Textarea */}
        <textarea
          ref={ref}
          className={cn(
            "w-full min-h-[160px] resize-y relative z-10",
            "bg-[#0a0510]/80 backdrop-blur-sm",
            "border border-purple-500/20",
            "text-purple-100 text-lg leading-relaxed font-serif",
            "px-4 pt-8 pb-4",
            "outline-none",
            "placeholder:text-purple-900/50",
            "selection:bg-purple-500/30 selection:text-white",
            "ghost-text",
            isFocused && "border-purple-500/50",
            className
          )}
          style={isFocused ? {
            boxShadow: `0 0 ${20 + energy}px rgba(168, 85, 247, ${0.1 + (energy / 500)})`
          } : undefined}
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-purple-500/40 pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-purple-500/40 pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-purple-500/40 pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-purple-500/40 pointer-events-none z-20" />

        {/* Status Indicator */}
        <div className="absolute bottom-4 right-4 z-20 transition-colors duration-500">
          {energy > 50 ? (
            <Sparkles className={cn("w-5 h-5 text-purple-400 animate-spin")} />
          ) : (
            <Ghost className={cn(
              "w-5 h-5 transition-colors duration-500",
              isFocused ? "text-purple-700" : "text-purple-900/40"
            )} />
          )}
        </div>

        {/* Embedded Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap');
          
          .ghost-text {
            text-shadow: 0 0 8px rgba(168, 85, 247, 0.4), 2px 2px 0px rgba(0,0,0,0.5);
            caret-color: #d8b4fe;
          }
          
          .font-rune {
            font-family: 'Cinzel', serif;
            user-select: none;
          }
        `}</style>
      </div>
    );
  }
);

WhisperBox.displayName = "WhisperBox";
