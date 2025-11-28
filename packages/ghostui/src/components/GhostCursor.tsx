'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GhostCursorProps {
    color?: string;
    size?: number;
    trailLength?: number;
}

interface TrailPoint {
    x: number;
    y: number;
    id: number;
}

export const GhostCursor: React.FC<GhostCursorProps> = ({
    color = '#A855F7',
    size = 20,
    trailLength = 8,
}) => {
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let idCounter = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const newPoint = {
                x: e.clientX,
                y: e.clientY,
                id: idCounter++,
            };

            setMousePosition({ x: e.clientX, y: e.clientY });

            setTrail((prev) => {
                const newTrail = [newPoint, ...prev];
                return newTrail.slice(0, trailLength);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [trailLength]);

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            {/* Main ghost cursor */}
            <motion.div
                className="absolute"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    width: size,
                    height: size,
                }}
                animate={{
                    x: -size / 2,
                    y: -size / 2,
                }}
            >
                <svg viewBox="0 0 24 32" fill="none" className="w-full h-full">
                    <path
                        d="M12 2 C7 2, 4 5, 4 10 L4 24 L7 22 L10 24 L12 22 L14 24 L17 22 L20 24 L20 10 C20 5, 17 2, 12 2 Z"
                        fill={color}
                        opacity="0.6"
                        filter="url(#ghost-glow)"
                    />
                    <circle cx="9" cy="12" r="1.5" fill="white" opacity="0.9" />
                    <circle cx="15" cy="12" r="1.5" fill="white" opacity="0.9" />
                    <defs>
                        <filter id="ghost-glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            </motion.div>

            {/* Ghost trail */}
            <AnimatePresence>
                {trail.map((point, index) => (
                    <motion.div
                        key={point.id}
                        className="absolute rounded-full"
                        style={{
                            left: point.x,
                            top: point.y,
                            width: size * 0.6,
                            height: size * 0.6,
                            backgroundColor: color,
                        }}
                        initial={{ opacity: 0.4, scale: 1 }}
                        animate={{
                            opacity: 0.4 - (index / trailLength) * 0.4,
                            scale: 1 - (index / trailLength) * 0.5,
                            x: -size * 0.3,
                            y: -size * 0.3,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
