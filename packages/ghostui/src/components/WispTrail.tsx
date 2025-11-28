'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WispTrailProps {
    color?: string;
    particleCount?: number;
}

interface Particle {
    x: number;
    y: number;
    id: number;
    vx: number;
    vy: number;
}

export const WispTrail: React.FC<WispTrailProps> = ({
    color = '#90FFB5',
    particleCount = 3,
}) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        let idCounter = 0;
        let lastEmit = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastEmit < 50) return; // Throttle particle creation
            lastEmit = now;

            const newParticles: Particle[] = [];
            for (let i = 0; i < particleCount; i++) {
                newParticles.push({
                    x: e.clientX + (Math.random() - 0.5) * 20,
                    y: e.clientY + (Math.random() - 0.5) * 20,
                    id: idCounter++,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2 - 1,
                });
            }

            setParticles((prev) => {
                const updated = [...prev, ...newParticles];
                return updated.slice(-30); // Keep last 30 particles
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [particleCount]);

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: 4 + Math.random() * 4,
                            height: 4 + Math.random() * 4,
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`,
                        }}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{
                            opacity: 0,
                            scale: 0.2,
                            x: particle.vx * 50,
                            y: particle.vy * 50,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        onAnimationComplete={() => {
                            setParticles((prev) => prev.filter((p) => p.id !== particle.id));
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
