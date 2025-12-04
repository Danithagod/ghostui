'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../lib/utils';
import { useThemeOptional, type Theme } from './ThemeProvider';

// Theme color configuration for GhostCursor
const themeColors = {
    spectral: {
        glowBg: 'bg-purple-500/30',
        textShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
    },
    blood: {
        glowBg: 'bg-red-500/30',
        textShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
    },
} as const;

// --- Styles ---
const styles = `
/* Hide default cursor everywhere when this component is active */
body.ghost-cursor-active, body.ghost-cursor-active * {
  cursor: none !important;
}

/* Keyframes for the SVG internals (Blinking) */
@keyframes ghost-blink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

.animate-blink {
  animation: ghost-blink 4s infinite;
  transform-origin: center;
}
`;

// --- The Ghost SVG (Extracted & Cleaned) ---
const SpookyGhostIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 174.57 164.28" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`.cls-1{fill:#fff;}.cls-2{fill:#2b2b28;}`}</style>
    </defs>
    <g id="Objects">
      {/* Body */}
      <path 
        className="cls-1" 
        d="M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
      />
      
      {/* Eyes Group (Blinking Animation) */}
      <g className="animate-blink">
        <path 
          className="cls-2" 
          d="M42.43,23.31c-.36,2.1-1.5,3.78-2.53,3.74s-1.59-1.78-1.23-3.88c.36-2.1,1.5-3.78,2.53-3.74,1.04.04,1.59,1.78,1.23,3.88Z"
        />
        <path 
          className="cls-2" 
          d="M54.14,22.78c.36,2.1-1.5,4.06-1.14,4.32-0.99,0.25-2.08-1.27-2.44-3.4-0.36-2.13,0.15-4.06,1.14-4.32,0.99-0.25,2.08,1.27,2.44,3.4Z"
        />
      </g>
      
      {/* Mouth */}
      <path 
        className="cls-2" 
        d="M55.18,40.26c1.67,5.63-0.17,11.28-4.12,12.63-3.95,1.34-8.5-2.13-10.17-7.76-1.67-5.63,0.17-11.28,4.12-12.63,3.95-1.34,8.5,2.13,10.17,7.76Z"
      />
      
      {/* Hand */}
      <path 
        className="cls-1" 
        d="M91.39,40.23s20.26,8.26,34.47,3.98,11.53,19.96-12.92,20.27c-24.44,0.31-21.56-24.24-21.56-24.24Z"
      />
      
      {/* Tail */}
      <path 
        className="cls-1" 
        d="M31.75,71.66c-5.18-16.45-12.67-23.61-26.6-28.73-13.94-5.11,2.77-22.88,22.5-8.45,19.73,14.44,6.91,46.09,4.11,37.17Z"
      />
    </g>
  </svg>
);

// --- Types ---
type ClickEffect = {
  id: number;
  x: number;
  y: number;
  text: string;
};

// --- Main Ghost Cursor Component ---
const GhostCursorComponent = () => {
  // Connect to ThemeProvider context if available
  const themeContext = useThemeOptional();
  const theme: Theme = themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];

  // Motion values for smooth mouse tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add spring physics for that "floaty" ghost feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [effects, setEffects] = useState<ClickEffect[]>([]);
  const effectIdRef = useRef(0);

  useEffect(() => {
    // 1. Hide System Cursor
    document.body.classList.add('ghost-cursor-active');

    // 2. Mouse Move Handler
    const moveHandler = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Detect if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    // 3. Click Handler for Effects
    const clickHandler = (e: MouseEvent) => {
      setIsClicking(true);

      // Create a "POOF" or "BOO" effect at click coords
      const text = Math.random() > 0.5 ? "BOO!" : "POOF!";
      const newEffect = {
        id: effectIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        text
      };

      setEffects(prev => [...prev, newEffect]);

      // Cleanup effect after animation
      setTimeout(() => {
        setEffects(prev => prev.filter(eff => eff.id !== newEffect.id));
      }, 1000);

      setTimeout(() => setIsClicking(false), 150); // Reset click state quickly
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mousedown', clickHandler);

    return () => {
      document.body.classList.remove('ghost-cursor-active');
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mousedown', clickHandler);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{styles}</style>

      {/* 1. The Cursor Container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ 
          x, 
          y,
          translateX: '-20%', // Center offset slightly so the "head" is the pointer
          translateY: '-20%'
        }}
      >
        <motion.div
          // Animate scale/rotate based on state
          animate={{
            scale: isClicking ? 0.8 : (isHovering ? 1.2 : 1),
            rotate: isClicking ? -15 : (isHovering ? 10 : 0),
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative w-12 h-12"
        >
          {/* Glow behind ghost */}
          <div className={cn("absolute inset-0 blur-xl rounded-full scale-150 animate-pulse", colors.glowBg)} />
          
          {/* The Ghost SVG */}
          <SpookyGhostIcon className="w-full h-full drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* 2. Click Effects Layer (Poof/Boo particles) */}
      <AnimatePresence>
        {effects.map((effect) => (
          <motion.div
            key={effect.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9998] font-black text-lg text-white tracking-widest"
            style={{ 
              left: effect.x, 
              top: effect.y,
              textShadow: colors.textShadow,
              // Random rotation for variety
              rotate: Math.random() * 30 - 15
            }}
          >
            {effect.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

GhostCursorComponent.displayName = 'GhostCursor';

export const GhostCursor = GhostCursorComponent;
