import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CursorState, CursorEffectConfig } from '../../types/cursor-effects';
import { GlowAura } from './GlowAura';
import { DistortionField } from './DistortionField';
import { WaveGenerator } from './WaveGenerator';
import { ParticleSystem } from './ParticleSystem';
import { calculateAllAttractions } from './attractionUtils';

/**
 * Props for EffectRenderer component
 */
export interface EffectRendererProps {
  cursorState: CursorState;
  config: Required<CursorEffectConfig>;
}

/**
 * Get attraction strength multiplier based on element type
 * Buttons receive stronger attraction
 */
function getAttractionStrengthForType(type?: string): number {
  const typeMultipliers: Record<string, number> = {
    button: 1.5,      // Intensified for buttons
    draggable: 1.3,   // Strong for draggables
    link: 1.0,        // Normal for links
    card: 0.7,        // Subtle for cards
    custom: 1.0,      // Default
  };
  
  return typeMultipliers[type || 'custom'] || 1.0;
}

/**
 * EffectRenderer component
 * 
 * Renders all cursor effects in a React portal to document.body.
 * 
 * Features:
 * - Renders all effects in React portal to document.body
 * - Conditionally renders based on enabled effects configuration
 * - Applies high z-index for proper layering
 * - Sets pointer-events: none to prevent interaction blocking
 * - Composes GlowAura, DistortionField, WaveGenerator
 * - Applies attraction transforms to registered elements
 * - Type-specific attraction strength (intensified for buttons)
 * 
 * Requirements: 7.5, 6.1, 6.2
 */
export function EffectRenderer({ cursorState, config }: EffectRendererProps) {
  const { activeElements, position } = cursorState;
  
  // Apply attraction transforms to elements
  useEffect(() => {
    if (!config.effects.attraction) return;
    
    // Calculate attraction displacements for all elements
    const displacements = calculateAllAttractions(
      activeElements,
      position,
      config.proximityRadius
    );
    
    // Apply transforms to DOM elements
    displacements.forEach((displacement, elementId) => {
      const element = activeElements.get(elementId);
      
      // Handle null refs gracefully - skip if element or ref is null
      if (!element || !element.ref.current) {
        return;
      }
      
      // Validate displacement values to prevent NaN or Infinity
      if (!isFinite(displacement.x) || !isFinite(displacement.y)) {
        console.warn('[CursorEffect] Invalid displacement values for element:', elementId);
        return;
      }
      
      // Get type-specific attraction strength multiplier
      const strengthMultiplier = getAttractionStrengthForType(element.options.type);
      
      // Apply multiplier to displacement
      const adjustedX = displacement.x * strengthMultiplier;
      const adjustedY = displacement.y * strengthMultiplier;
      
      try {
        // Apply transform to element
        element.ref.current.style.transform = `translate(${adjustedX}px, ${adjustedY}px)`;
        element.ref.current.style.transition = 'transform 0.2s ease-out';
        
        // Add grabbing cursor for draggable elements when in proximity
        if (element.options.type === 'draggable' && element.isInProximity) {
          element.ref.current.style.cursor = 'grab';
        } else if (element.options.type === 'draggable' && element.isHovered) {
          element.ref.current.style.cursor = 'grabbing';
        } else if (element.options.type === 'draggable') {
          element.ref.current.style.cursor = '';
        }
      } catch (error) {
        console.warn('[CursorEffect] Error applying transform to element:', elementId, error);
      }
    });
    
    // Cleanup: reset transforms when component unmounts or elements change
    return () => {
      activeElements.forEach((element) => {
        if (element.ref.current) {
          try {
            element.ref.current.style.transform = '';
            element.ref.current.style.transition = '';
            if (element.options.type === 'draggable') {
              element.ref.current.style.cursor = '';
            }
          } catch (error) {
            // Silently ignore cleanup errors for detached elements
          }
        }
      });
    };
  }, [activeElements, position, config.effects.attraction, config.proximityRadius]);
  
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return null;
  }
  
  // Render effects in a portal to document.body
  // Note: z-index is set to 9999 to be above most content, but focus indicators
  // should use z-index 10000 or higher to remain visible above cursor effects
  return ReactDOM.createPortal(
    <div
      className="cursor-effects-layer"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
        // CSS containment for performance optimization
        contain: 'layout style paint',
      }}
      aria-hidden="true"
    >
      {/* Conditionally render glow effect */}
      {config.effects.glow && (
        <GlowAura cursorState={cursorState} config={config} />
      )}
      
      {/* Conditionally render distortion effect */}
      {config.effects.distortion && (
        <DistortionField cursorState={cursorState} config={config} />
      )}
      
      {/* Conditionally render wave effect */}
      {config.effects.waves && (
        <WaveGenerator cursorState={cursorState} config={config} />
      )}
      
      {/* Conditionally render particle effects */}
      {config.effects.particles && (
        <ParticleSystem cursorState={cursorState} config={config} />
      )}
    </div>,
    document.body
  );
}
