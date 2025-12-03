import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CursorState, CursorEffectConfig } from '../../types/cursor-effects';
import { supportsBlendModes } from './browserUtils';

/**
 * Props for GlowAura component
 */
export interface GlowAuraProps {
  cursorState: CursorState;
  config: Required<CursorEffectConfig>;
}

/**
 * Get glow intensity multiplier based on hovered element type
 * Buttons receive intensified glow, cards receive subtle glow
 */
function getGlowIntensityForHoveredElement(
  activeElements: Map<string, import('../../types/cursor-effects').RegisteredElement>
): { sizeMultiplier: number; opacityMultiplier: number } {
  // Find hovered elements
  const hoveredElements = Array.from(activeElements.values()).filter(el => el.isHovered);
  
  if (hoveredElements.length === 0) {
    return { sizeMultiplier: 1.0, opacityMultiplier: 1.0 };
  }
  
  // Get the highest priority element type
  // Priority: button > draggable > link > card > custom
  const typePriority: Record<string, number> = {
    button: 5,
    draggable: 4,
    link: 3,
    card: 1,
    custom: 2,
  };
  
  const highestPriorityElement = hoveredElements.reduce((highest, current) => {
    const currentType = current.options.type || 'custom';
    const highestType = highest.options.type || 'custom';
    const currentPriority = typePriority[currentType] || 0;
    const highestPriority = typePriority[highestType] || 0;
    return currentPriority > highestPriority ? current : highest;
  });
  
  const type = highestPriorityElement.options.type || 'custom';
  
  // Type-specific intensity multipliers
  const typeMultipliers: Record<string, { sizeMultiplier: number; opacityMultiplier: number }> = {
    button: { sizeMultiplier: 1.3, opacityMultiplier: 1.5 },      // Intensified for buttons
    draggable: { sizeMultiplier: 1.2, opacityMultiplier: 1.3 },   // Strong for draggables
    link: { sizeMultiplier: 1.1, opacityMultiplier: 1.2 },        // Moderate for links
    card: { sizeMultiplier: 0.9, opacityMultiplier: 0.8 },        // Subtle for cards
    custom: { sizeMultiplier: 1.0, opacityMultiplier: 1.0 },      // Default
  };
  
  return typeMultipliers[type] || { sizeMultiplier: 1.0, opacityMultiplier: 1.0 };
}

/**
 * GlowAura effect component
 * 
 * Renders a circular glow element that follows the cursor with smooth spring physics.
 * Features:
 * - Follows cursor position with spring animation
 * - Uses current theme colors based on vertical position
 * - Pulsing animation when cursor is stationary
 * - Trailing effect for high velocity movement
 * - Ethereal appearance using mix-blend-mode: screen
 * - Intensified glow for button elements
 * - Subtle glow for card elements
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.3
 */
export function GlowAura({ cursorState, config }: GlowAuraProps) {
  const { currentTheme, position, velocity, isMoving, activeElements } = cursorState;
  const { intensity } = config;
  
  // Check if blend modes are supported for graceful degradation
  const hasBlendModeSupport = useMemo(() => supportsBlendModes(), []);
  
  // Get type-specific intensity multipliers based on hovered elements
  const { sizeMultiplier, opacityMultiplier } = getGlowIntensityForHoveredElement(activeElements);
  
  // Calculate glow size adjusted by global intensity and type-specific multiplier
  const glowSize = currentTheme.glowSize * intensity * sizeMultiplier;
  
  // Calculate glow opacity adjusted by global intensity and type-specific multiplier
  // If blend modes aren't supported, reduce opacity to prevent overwhelming effect
  const baseOpacity = currentTheme.glowOpacity * intensity * opacityMultiplier * (hasBlendModeSupport ? 1 : 0.5);
  
  // Determine if cursor is stationary (not moving for pulsing effect)
  const isStationary = !isMoving;
  
  // Determine if cursor has high velocity for trail effect
  // Calculate magnitude from x and y components
  const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const hasHighVelocity = velocityMagnitude > 10; // threshold: 10 pixels/frame
  
  // Calculate trail effect parameters
  const trailScale = hasHighVelocity ? 1.2 : 1.0;
  const trailOpacity = hasHighVelocity ? baseOpacity * 1.3 : baseOpacity;
  
  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: glowSize,
        height: glowSize,
        borderRadius: '50%',
        backgroundColor: currentTheme.colors.primary,
        filter: 'blur(60px)',
        // Use blend mode if supported, otherwise fall back to normal
        mixBlendMode: hasBlendModeSupport ? 'screen' : 'normal',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
      animate={{
        // Position the glow centered on cursor
        x: position.x - glowSize / 2,
        y: position.y - glowSize / 2,
        // Apply current theme color
        backgroundColor: currentTheme.colors.primary,
        // Scale effect: pulse when stationary, trail when high velocity
        scale: isStationary 
          ? [1, 1.1, 1] // Pulsing animation
          : hasHighVelocity 
            ? trailScale // Enlarged for trail effect
            : 1, // Normal size when moving normally
        // Opacity effect: pulse when stationary, intensify for trail
        opacity: isStationary
          ? [baseOpacity, baseOpacity * 1.5, baseOpacity] // Pulsing opacity
          : hasHighVelocity
            ? trailOpacity // Higher opacity for trail
            : baseOpacity, // Normal opacity
      }}
      transition={{
        // Smooth spring physics for position
        x: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
        y: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
        // Smooth color transitions
        backgroundColor: { duration: 0.8 },
        // Pulsing animation when stationary (infinite loop)
        scale: { 
          duration: isStationary ? 2 : 0.3, 
          repeat: isStationary ? Infinity : 0,
          ease: 'easeInOut',
        },
        opacity: { 
          duration: isStationary ? 2 : 0.3, 
          repeat: isStationary ? Infinity : 0,
          ease: 'easeInOut',
        },
      }}
    />
  );
}
