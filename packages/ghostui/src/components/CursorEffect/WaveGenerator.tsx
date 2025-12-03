import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wave, CursorState, CursorEffectConfig, RegisteredElement } from '../../types/cursor-effects';
import { 
  checkWaveElementIntersection, 
  WaveCollisionTracker 
} from './waveCollisionUtils';

/**
 * Props for WaveGenerator component
 */
export interface WaveGeneratorProps {
  cursorState: CursorState;
  config: Required<CursorEffectConfig>;
}

/**
 * Element animation state for wave collisions
 */
interface ElementAnimationState {
  elementId: string;
  intensity: number;
  timestamp: number;
}

/**
 * WaveGenerator component
 * 
 * Generates and animates wave effects that emanate from cursor position.
 * 
 * Features:
 * - Generates waves on click events
 * - Implements wave expansion animation using RAF
 * - Automatic wave cleanup when faded or max radius reached
 * - Limits simultaneous waves to configured maximum (default 5)
 * - Renders wave rings with current theme color
 * 
 * Requirements: 5.1, 5.2, 5.4, 11.5
 */
export const WaveGenerator: React.FC<WaveGeneratorProps> = ({ cursorState, config }) => {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [elementAnimations, setElementAnimations] = useState<Map<string, ElementAnimationState>>(new Map());
  const lastWaveTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const collisionTrackerRef = useRef<WaveCollisionTracker>(new WaveCollisionTracker());
  
  // Generate wave on click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newWave: Wave = {
        id: `wave-${Date.now()}-${Math.random()}`,
        origin: { x: e.clientX, y: e.clientY },
        radius: 0,
        maxRadius: 500,
        opacity: 0.6,
        timestamp: Date.now(),
        color: cursorState.currentTheme.colors.primary,
      };
      
      setWaves(prev => {
        // Add new wave and limit to maxWaves
        const updated = [...prev, newWave];
        // Keep only the most recent waves up to maxWaves limit
        return updated.slice(-config.maxWaves);
      });
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [cursorState.currentTheme.colors.primary, config.maxWaves]);
  
  // Animation loop for wave expansion using RAF
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      
      setWaves(prev => {
        const updatedWaves = prev
          .map(wave => {
            // Expand wave by 5 pixels per frame (approximately 300px/second at 60fps)
            const newRadius = wave.radius + 5;
            // Fade out wave as it expands
            const newOpacity = wave.opacity * 0.98;
            
            return {
              ...wave,
              radius: newRadius,
              opacity: newOpacity,
            };
          })
          // Remove waves that have faded or reached max radius
          .filter(wave => {
            const shouldKeep = wave.radius < wave.maxRadius && wave.opacity > 0.01;
            
            // Clean up collision tracking for removed waves
            if (!shouldKeep) {
              collisionTrackerRef.current.cleanupWave(wave.id);
            }
            
            return shouldKeep;
          });
        
        // Detect collisions between waves and elements
        const newAnimations = new Map<string, ElementAnimationState>();
        
        for (const wave of updatedWaves) {
          for (const [elementId, element] of cursorState.activeElements) {
            // Check if wave intersects with element
            if (checkWaveElementIntersection(wave, element)) {
              // Only trigger animation once per wave-element pair
              if (!collisionTrackerRef.current.hasCollided(wave.id, elementId)) {
                collisionTrackerRef.current.recordCollision(wave.id, elementId);
                
                // Record animation state for this element
                // Multiple waves can affect the same element (additive blending)
                const existingAnimation = newAnimations.get(elementId);
                const waveIntensity = wave.opacity; // Use wave opacity as intensity
                
                if (existingAnimation) {
                  // Additive blending: combine intensities from multiple waves
                  newAnimations.set(elementId, {
                    elementId,
                    intensity: Math.min(1.0, existingAnimation.intensity + waveIntensity),
                    timestamp: now,
                  });
                } else {
                  newAnimations.set(elementId, {
                    elementId,
                    intensity: waveIntensity,
                    timestamp: now,
                  });
                }
              }
            }
          }
        }
        
        // Update element animations
        setElementAnimations(newAnimations);
        
        return updatedWaves;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorState.activeElements]);
  
  return (
    <>
      {/* Render wave rings */}
      {waves.map(wave => (
        <div
          key={wave.id}
          className="wave-ring"
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: wave.origin.x - wave.radius,
            top: wave.origin.y - wave.radius,
            width: wave.radius * 2,
            height: wave.radius * 2,
            borderRadius: '50%',
            border: `2px solid ${wave.color}`,
            opacity: wave.opacity,
            pointerEvents: 'none',
            boxSizing: 'border-box',
          }}
        />
      ))}
      
      {/* Render collision animations on affected elements */}
      {Array.from(elementAnimations.values()).map(animation => {
        const element = cursorState.activeElements.get(animation.elementId);
        if (!element || !element.bounds) return null;
        
        return (
          <motion.div
            key={`collision-${animation.elementId}-${animation.timestamp}`}
            className="wave-collision-effect"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: element.bounds.left,
              top: element.bounds.top,
              width: element.bounds.width,
              height: element.bounds.height,
              pointerEvents: 'none',
              borderRadius: '4px',
              border: `2px solid ${cursorState.currentTheme.colors.primary}`,
              boxShadow: `0 0 ${20 * animation.intensity}px ${cursorState.currentTheme.colors.primary}`,
            }}
            initial={{ 
              opacity: animation.intensity * 0.8,
              scale: 0.95,
            }}
            animate={{ 
              opacity: 0,
              scale: 1.05,
            }}
            transition={{ 
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </>
  );
};
