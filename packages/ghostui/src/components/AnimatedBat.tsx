'use client';

import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { BatIcon } from './BatIcon';

export interface AnimatedBatProps {
  id: number;
  size: number;
  homeX: number; // Percentage 0-100
  homeY: number; // Percentage 0-100
  opacity: number;
  blur?: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
  windowSize: { width: number; height: number };
}

/**
 * AnimatedBat component - displays an individual bat with physics-based cursor repulsion
 * 
 * This component uses spring animations to create smooth, realistic bat movements
 * that respond dynamically to cursor position. Bats are repelled when the cursor
 * comes within 300px of their home position.
 */
export const AnimatedBat: React.FC<AnimatedBatProps> = ({
  id,
  size,
  homeX,
  homeY,
  opacity,
  blur,
  isHovered,
  mousePos,
  windowSize,
}) => {
  // Spring animations for smooth physics-based movement
  const x = useSpring(0, { stiffness: 60, damping: 15, mass: 1 });
  const y = useSpring(0, { stiffness: 60, damping: 15, mass: 1 });
  const rotate = useSpring(0, { stiffness: 60, damping: 15, mass: 1 });

  useEffect(() => {
    // Convert home position from percentage to pixels
    const homePixelX = (homeX / 100) * windowSize.width;
    const homePixelY = (homeY / 100) * windowSize.height;

    // Calculate distance vector from bat home position to cursor
    const dx = mousePos.x - homePixelX;
    const dy = mousePos.y - homePixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Repulsion physics constants
    const repulsionRadius = 300;
    const repulsionStrength = 150;

    if (isHovered && distance < repulsionRadius) {
      // Calculate normalized force (0-1 based on proximity)
      const force = (repulsionRadius - distance) / repulsionRadius;

      // Calculate displacement away from cursor
      const angle = Math.atan2(dy, dx);
      const moveX = -Math.cos(angle) * force * repulsionStrength;
      const moveY = -Math.sin(angle) * force * repulsionStrength;

      // Calculate rotation based on direction
      const rotationAngle = (dx > 0 ? 1 : -1) * force * 45;

      // Update spring targets
      x.set(moveX);
      y.set(moveY);
      rotate.set(rotationAngle);
    } else {
      // Return to home position
      x.set(0);
      y.set(0);
      rotate.set(0);
    }
  }, [mousePos, isHovered, homeX, homeY, windowSize, x, y, rotate]);

  // Calculate flapping animation duration based on bat ID
  const flapDuration = 0.1 + (id % 5) * 0.02;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${homeX}%`,
        top: `${homeY}%`,
        x,
        y,
        rotate,
        width: size,
        height: size,
        opacity,
        filter: blur,
        zIndex: isHovered ? 100 : 0,
      }}
    >
      <div
        style={{
          animation: `flap ${flapDuration}s ease-in-out infinite alternate`,
          color: isHovered ? 'currentColor' : 'currentColor',
        }}
      >
        <BatIcon className="w-full h-full" />
      </div>
    </motion.div>
  );
};

AnimatedBat.displayName = 'AnimatedBat';
