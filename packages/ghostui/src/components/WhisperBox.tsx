'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useThemeOptional, type Theme } from './ThemeProvider';

// Theme color configuration for WhisperBox
const themeColors = {
    spectral: {
        ectoplasmBorder: 'bg-purple-900/30',
        whisperGlow: 'bg-purple-500/10',
        runeText: 'text-purple-300/20',
        labelFocused: 'text-purple-400',
        labelDefault: 'text-purple-200/50',
        border: 'border-purple-500/20',
        borderFocused: 'border-purple-500/50',
        cornerBorder: 'border-purple-500/40',
        iconActive: 'text-purple-400',
        iconFocused: 'text-purple-700',
        iconDefault: 'text-purple-900/40',
        textColor: 'text-purple-100',
        placeholder: 'placeholder:text-purple-900/50',
        selection: 'selection:bg-purple-500/30',
        glowRgba: 'rgba(168, 85, 247,',
        textShadowRgba: 'rgba(168, 85, 247, 0.4)',
        caretColor: '#d8b4fe',
    },
    blood: {
        ectoplasmBorder: 'bg-red-900/30',
        whisperGlow: 'bg-red-500/10',
        runeText: 'text-red-300/20',
        labelFocused: 'text-red-400',
        labelDefault: 'text-red-200/50',
        border: 'border-red-500/20',
        borderFocused: 'border-red-500/50',
        cornerBorder: 'border-red-500/40',
        iconActive: 'text-red-400',
        iconFocused: 'text-red-700',
        iconDefault: 'text-red-900/40',
        textColor: 'text-red-100',
        placeholder: 'placeholder:text-red-900/50',
        selection: 'selection:bg-red-500/30',
        glowRgba: 'rgba(239, 68, 68,',
        textShadowRgba: 'rgba(239, 68, 68, 0.4)',
        caretColor: '#fca5a5',
    },
} as const;

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
  ({ className, value, defaultValue, onChange, onFocus, onBlur, ...props }, ref) => {
    const filterId = React.useId();
    // Internal state for uncontrolled mode
    const [internalText, setInternalText] = useState<string>((defaultValue as string) || "");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [energy, setEnergy] = useState<number>(0); // 0-100
    const lastTypeTime = useRef<number>(Date.now());

    // Connect to ThemeProvider context if available
    const themeContext = useThemeOptional();
    const theme: Theme = themeContext?.theme ?? 'spectral';
    const colors = themeColors[theme];

    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;

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
      <div className="relative w-full">
        {/* SVG Filter Definition */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id={`ectoplasm-distortion-${filterId}`}>
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
          className={cn("absolute -inset-1 rounded transition-opacity duration-300 pointer-events-none", colors.ectoplasmBorder)}
          style={{
            filter: `url(#ectoplasm-distortion-${filterId})`,
            opacity: isFocused ? 0.6 + (glowOpacity / 2) : 0
          }}
        />

        {/* Whisper Glow */}
        <div
          className={cn("absolute inset-0 blur-xl rounded pointer-events-none transition-opacity duration-100", colors.whisperGlow)}
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
                    className={cn("absolute text-4xl font-rune pointer-events-none", colors.runeText)}
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

        {/* Textarea */}
        <textarea
          ref={ref}
          className={cn(
            "w-full min-h-[240px] resize-y relative z-10",
            "bg-[#0a0510]/80 backdrop-blur-sm",
            "border",
            colors.border,
            colors.textColor,
            "text-lg leading-relaxed font-serif",
            "px-6 py-6",
            "outline-none",
            colors.placeholder,
            colors.selection,
            "selection:text-white",
            `ghost-text-${theme}`,
            isFocused && colors.borderFocused,
            className
          )}
          style={{
            ...(isFocused && {
              boxShadow: `0 0 ${20 + energy}px ${colors.glowRgba} ${0.1 + (energy / 500)})`
            }),
            textShadow: `0 0 8px ${colors.textShadowRgba}, 2px 2px 0px rgba(0,0,0,0.5)`,
            caretColor: colors.caretColor,
          }}
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Corner Accents */}
        <div className={cn("absolute top-0 left-0 w-1 h-1 border-t border-l pointer-events-none z-20", colors.cornerBorder)} />
        <div className={cn("absolute top-0 right-0 w-1 h-1 border-t border-r pointer-events-none z-20", colors.cornerBorder)} />
        <div className={cn("absolute bottom-0 left-0 w-1 h-1 border-b border-l pointer-events-none z-20", colors.cornerBorder)} />
        <div className={cn("absolute bottom-0 right-0 w-1 h-1 border-b border-r pointer-events-none z-20", colors.cornerBorder)} />

        {/* Embedded Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap');
          
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
