import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorState, CursorEffectConfig } from '../../types/cursor-effects';

/**
 * Props for ParticleSystem component
 */
export interface ParticleSystemProps {
  cursorState: CursorState;
  config: Required<CursorEffectConfig>;
}

/**
 * Particle data model
 */
interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

/**
 * Generate a random particle at the given position
 */
function createParticle(
  x: number,
  y: number,
  color: string,
  velocity: { x: number; y: number }
): Particle {
  // Add some randomness to particle velocity
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 3;
  
  return {
    id: `particle-${Date.now()}-${Math.random()}`,
    x,
    y,
    vx: Math.cos(angle) * speed + velocity.x * 0.1,
    vy: Math.sin(angle) * speed + velocity.y * 0.1,
    life: 1.0,
    maxLife: 0.5 + Math.random() * 0.5, // 0.5-1.0 seconds
    size: 2 + Math.random() * 3, // 2-5 pixels
    color,
  };
}

/**
 * ParticleSystem effect component
 * 
 * Generates particle trails for link elements when hovered.
 * Features:
 * - Generates particles along cursor trail
 * - Particles fade out over time
 * - Particles move with initial velocity
 * - Uses current theme color
 * 
 * Requirements: 6.4
 */
export function ParticleSystem({ cursorState, config }: ParticleSystemProps) {
  const { activeElements, position, velocity, currentTheme } = cursorState;
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastParticleTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  
  // Check if any link elements are hovered
  const hoveredLinks = Array.from(activeElements.values()).filter(
    element => element.isHovered && element.options.type === 'link'
  );
  
  const shouldGenerateParticles = hoveredLinks.length > 0;
  
  // Generate particles when hovering over link elements
  useEffect(() => {
    if (!shouldGenerateParticles) return;
    
    const now = Date.now();
    const timeSinceLastParticle = now - lastParticleTimeRef.current;
    
    // Generate particles at regular intervals (every 50ms)
    if (timeSinceLastParticle > 50) {
      const newParticle = createParticle(
        position.x,
        position.y,
        currentTheme.colors.primary,
        velocity
      );
      
      setParticles(prev => [...prev, newParticle]);
      lastParticleTimeRef.current = now;
    }
  }, [shouldGenerateParticles, position, velocity, currentTheme]);
  
  // Update particle positions and life
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      
      setParticles(prev => {
        return prev
          .map(particle => {
            // Update position based on velocity
            const newX = particle.x + particle.vx;
            const newY = particle.y + particle.vy;
            
            // Decrease life (assuming 60fps, decrease by 1/60 per frame)
            const newLife = particle.life - (1 / 60) / particle.maxLife;
            
            // Apply slight gravity
            const newVy = particle.vy + 0.1;
            
            return {
              ...particle,
              x: newX,
              y: newY,
              vy: newVy,
              life: newLife,
            };
          })
          .filter(particle => particle.life > 0); // Remove dead particles
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Limit particle count to prevent performance issues
  useEffect(() => {
    if (particles.length > 100) {
      setParticles(prev => prev.slice(-100));
    }
  }, [particles.length]);
  
  return (
    <div className="particle-system" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: particle.life }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
