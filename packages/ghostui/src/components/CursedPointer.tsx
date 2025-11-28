'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface CursedPointerProps {
    variant?: 'claw' | 'orb' | 'finger';
    color?: string;
}

export const CursedPointer: React.FC<CursedPointerProps> = ({
    variant = 'orb',
    color = '#FF4D4D',
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const renderCursor = () => {
        switch (variant) {
            case 'claw':
                return (
                    <svg viewBox="0 0 40 40" className="w-10 h-10">
                        <g transform="translate(20, 20)">
                            {/* Claw fingers */}
                            {[0, 1, 2].map((i) => (
                                <motion.line
                                    key={i}
                                    x1="0"
                                    y1="0"
                                    x2={Math.cos((i * Math.PI) / 3) * 15}
                                    y2={Math.sin((i * Math.PI) / 3) * 15}
                                    stroke={color}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    animate={isClicking ? { x2: Math.cos((i * Math.PI) / 3) * 10, y2: Math.sin((i * Math.PI) / 3) * 10 } : {}}
                                />
                            ))}
                            <circle cx="0" cy="0" r="3" fill={color} />
                        </g>
                    </svg>
                );

            case 'finger':
                return (
                    <svg viewBox="0 0 30 40" className="w-8 h-10">
                        <motion.path
                            d="M15 5 L15 30 Q15 35, 12 35 L12 30 L15 30 L15 5 Q15 2, 18 5 L18 30 L15 30"
                            fill={color}
                            opacity="0.8"
                            animate={isClicking ? { scaleY: 0.9 } : { scaleY: 1 }}
                            style={{ transformOrigin: 'center' }}
                        />
                    </svg>
                );

            case 'orb':
            default:
                return (
                    <motion.div
                        className="relative"
                        animate={isClicking ? { scale: 0.8 } : { scale: 1 }}
                    >
                        <div
                            className="w-6 h-6 rounded-full"
                            style={{
                                backgroundColor: color,
                                boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-2"
                            style={{ borderColor: color }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        />
                    </motion.div>
                );
        }
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            <motion.div
                className="absolute"
                style={{
                    left: position.x,
                    top: position.y,
                }}
                animate={{
                    x: -20,
                    y: -20,
                }}
            >
                {renderCursor()}
            </motion.div>
        </div>
    );
};
