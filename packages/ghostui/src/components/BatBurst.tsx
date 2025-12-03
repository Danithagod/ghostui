'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JumpscareBat } from './JumpscareBat';
import { AnimatedBat } from './AnimatedBat';

export interface BatBurstProps {
  className?: string;
  onComplete?: () => void;
}

interface BatConfig {
  id: number;
  size: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  op: number; // Opacity 0-1
}

export const BatBurst: React.FC<BatBurstProps> = ({
  className,
  onComplete,
}) => {
  // State management (Subtask 4.1)
  const [triggerScare, setTriggerScare] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
  });

  // Bat swarm configuration (Subtask 4.8)
  const bats: BatConfig[] = [
    { id: 0, size: 150, x: 10, y: 20, op: 0.8 },
    { id: 1, size: 200, x: 25, y: 60, op: 0.9 },
    { id: 2, size: 120, x: 40, y: 15, op: 0.7 },
    { id: 3, size: 180, x: 55, y: 70, op: 0.85 },
    { id: 4, size: 250, x: 70, y: 30, op: 1.0 },
    { id: 5, size: 140, x: 15, y: 80, op: 0.75 },
    { id: 6, size: 220, x: 85, y: 50, op: 0.95 },
    { id: 7, size: 160, x: 45, y: 85, op: 0.8 },
    { id: 8, size: 190, x: 90, y: 15, op: 0.9 },
    { id: 9, size: 130, x: 60, y: 45, op: 0.6 },
  ];

  // Mouse tracking (Subtask 4.3)
  useEffect(() => {
    if (!isHovered) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  // Window resize handling (Subtask 4.4)
  useEffect(() => {
    if (!isHovered) return;

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  // Jumpscare timing control (Subtask 4.6)
  useEffect(() => {
    if (isHovered) {
      setTriggerScare(true);
      
      const timer = setTimeout(() => {
        setTriggerScare(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isHovered]);

  // Handle activation/deactivation
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onComplete?.();
  }, [onComplete]);

  return (
    <>
      {/* CSS Keyframes injection (Subtask 4.2) */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flap {
            0% { transform: scaleY(1) scaleX(1); }
            100% { transform: scaleY(0.4) scaleX(0.8); }
          }
        `
      }} />

      {/* Trigger area */}
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* AnimatePresence wrapper (Subtask 4.1) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="fixed inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop overlay (Subtask 4.9) */}
              <motion.div
                className="fixed inset-0 bg-red-950/30 backdrop-blur-[2px] pointer-events-none"
                style={{ zIndex: 9990 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Jumpscare effect (conditional, first 1.5s) */}
              {triggerScare && <JumpscareBat />}

              {/* Animated bat swarm (Subtask 4.8, 4.10) */}
              {bats.map((bat) => (
                <AnimatedBat
                  key={bat.id}
                  id={bat.id}
                  size={bat.size}
                  homeX={bat.x}
                  homeY={bat.y}
                  opacity={bat.op}
                  isHovered={isHovered}
                  mousePos={mousePos}
                  windowSize={windowSize}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
