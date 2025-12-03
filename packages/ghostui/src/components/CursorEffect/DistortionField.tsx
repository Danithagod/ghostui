import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorState, CursorEffectConfig, RegisteredElement } from '../../types/cursor-effects';
import { supportsSVGFilters, supportsCSSFilters } from './browserUtils';

/**
 * Props for DistortionField component
 */
export interface DistortionFieldProps {
  cursorState: CursorState;
  config: Required<CursorEffectConfig>;
}

/**
 * Get distortion intensity based on element type
 * Buttons receive higher intensity, cards receive lower intensity
 */
function getDistortionIntensityForType(
  element: RegisteredElement,
  baseIntensity: number
): number {
  const type = element.options.type || 'custom';
  
  // Type-specific intensity multipliers
  const typeMultipliers: Record<string, number> = {
    button: 1.5,      // Intensified for buttons
    draggable: 1.3,   // Strong for draggables
    link: 1.2,        // Moderate for links
    card: 0.6,        // Subtle for cards
    custom: 1.0,      // Default
  };
  
  const multiplier = typeMultipliers[type] || 1.0;
  
  // Apply element-specific intensity override if provided
  const elementIntensity = element.options.intensity ?? 1.0;
  
  return baseIntensity * multiplier * elementIntensity;
}

/**
 * DistortionField effect component
 * 
 * Renders visual distortion effects on hovered elements using SVG filters.
 * Features:
 * - SVG filters for distortion, wave, and goo effects
 * - Distortion overlays on hovered elements
 * - Distortion follows cursor with delay
 * - Fade-out animation on exit (300-500ms)
 * - Configurable intensity per element type
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */
export function DistortionField({ cursorState, config }: DistortionFieldProps) {
  const { activeElements, position, currentTheme } = cursorState;
  const { intensity } = config;
  
  // Check filter support for graceful degradation
  const hasSVGFilterSupport = useMemo(() => supportsSVGFilters(), []);
  const hasCSSFilterSupport = useMemo(() => supportsCSSFilters(), []);
  const hasAnyFilterSupport = hasSVGFilterSupport || hasCSSFilterSupport;
  
  // Track distortion position with delay for liquid morphing effect
  const [distortionPosition, setDistortionPosition] = useState(position);
  
  // Update distortion position with slight delay to create following effect
  useEffect(() => {
    const delay = setTimeout(() => {
      setDistortionPosition(position);
    }, 50); // 50ms delay for liquid morphing appearance
    
    return () => clearTimeout(delay);
  }, [position]);
  
  // Get base distortion intensity from theme
  const baseDistortionIntensity = currentTheme.distortionIntensity * intensity;
  
  // Filter hovered elements
  const hoveredElements = Array.from(activeElements.values()).filter(
    element => element.isHovered && element.options.distortion !== false
  );
  
  // If no filter support, don't render anything
  if (!hasAnyFilterSupport) {
    return null;
  }
  
  return (
    <>
      {/* SVG filter definitions - only render if SVG filters are supported */}
      {hasSVGFilterSupport && (
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            {/* Distortion filter - creates warping effect */}
            <filter id="cursor-distortion">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="20"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="2" />
            </filter>
            
            {/* Wave filter - creates ripple effect */}
            <filter id="cursor-wave">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="2"
                result="turbulence"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="15"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            
            {/* Goo filter - creates liquid, morphing effect */}
            <filter id="cursor-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}
      
      {/* Render distortion overlays for hovered elements */}
      <AnimatePresence>
        {hoveredElements.map(element => {
          // Calculate distortion intensity for this element type
          const distortionIntensity = getDistortionIntensityForType(
            element,
            baseDistortionIntensity
          );
          
          // Calculate distortion position relative to element
          // This creates the effect of distortion following the cursor across the element
          const relativeX = distortionPosition.x - element.bounds.left;
          const relativeY = distortionPosition.y - element.bounds.top;
          
          // Determine which filter to use based on element type and support
          const filterType = element.options.type === 'card' ? 'cursor-wave' : 'cursor-distortion';
          
          // Build filter style based on support
          // If SVG filters are supported, use them; otherwise fall back to CSS blur
          const filterStyle = hasSVGFilterSupport 
            ? `url(#${filterType})`
            : hasCSSFilterSupport 
              ? 'blur(2px)' 
              : 'none';
          
          return (
            <motion.div
              key={element.id}
              className="distortion-overlay"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: element.bounds.left,
                top: element.bounds.top,
                width: element.bounds.width,
                height: element.bounds.height,
                filter: filterStyle,
                pointerEvents: 'none',
                willChange: 'opacity',
                // Add gradient overlay for visual effect
                background: `radial-gradient(circle at ${relativeX}px ${relativeY}px, ${currentTheme.colors.primary}20, transparent 60%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: distortionIntensity }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: 0.4, // 400ms fade-out (within 300-500ms requirement)
                  ease: 'easeOut',
                },
              }}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
}
