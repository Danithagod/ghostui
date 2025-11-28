'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface GhostFloatLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const GhostFloatLoader: React.FC<GhostFloatLoaderProps> = ({
    size = 'md',
    className,
}) => {
    const sizeMap = {
        sm: 40,
        md: 60,
        lg: 80,
    };

    const currentSize = sizeMap[size];

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <motion.div
                className="relative"
                style={{ width: currentSize, height: currentSize }}
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Ghost body */}
                <motion.svg
                    viewBox="0 0 100 120"
                    fill="none"
                    className="w-full h-full"
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {/* Glow effect */}
                    <defs>
                        <filter id="ghost-glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Ghost shape */}
                    <path
                        d="M50 20 C30 20, 20 30, 20 50 L20 100 L30 95 L40 100 L50 95 L60 100 L70 95 L80 100 L80 50 C80 30, 70 20, 50 20 Z"
                        fill="currentColor"
                        className="text-ghost-white"
                        filter="url(#ghost-glow)"
                        opacity="0.9"
                    />

                    {/* Eyes */}
                    <motion.circle
                        cx="38"
                        cy="50"
                        r="4"
                        fill="currentColor"
                        className="text-ghost-dark"
                        animate={{
                            scaleY: [1, 0.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.circle
                        cx="62"
                        cy="50"
                        r="4"
                        fill="currentColor"
                        className="text-ghost-dark"
                        animate={{
                            scaleY: [1, 0.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Mouth */}
                    <path
                        d="M40 65 Q50 70 60 65"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-ghost-dark"
                        opacity="0.7"
                    />
                </motion.svg>

                {/* Floating particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-ghost-purple/60"
                        style={{
                            left: `${30 + i * 20}%`,
                            top: '50%',
                        }}
                        animate={{
                            y: [-20, -40, -20],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* Loading text */}
            <motion.p
                className="absolute -bottom-8 text-xs font-mono text-ghost-white/60 tracking-wider"
                animate={{
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                Loading...
            </motion.p>
        </div>
    );
};
