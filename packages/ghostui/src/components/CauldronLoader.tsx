'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface CauldronLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const CauldronLoader: React.FC<CauldronLoaderProps> = ({
    size = 'md',
    className,
}) => {
    const sizeMap = {
        sm: 60,
        md: 80,
        lg: 100,
    };

    const currentSize = sizeMap[size];

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg
                width={currentSize}
                height={currentSize}
                viewBox="0 0 100 100"
                fill="none"
                className="relative"
            >
                {/* Cauldron */}
                <path
                    d="M20 35 L15 70 Q15 80, 25 85 L75 85 Q85 80, 85 70 L80 35 Z"
                    fill="currentColor"
                    className="text-ghost-dark"
                    stroke="currentColor"
                    strokeWidth="2"
                />

                {/* Cauldron legs */}
                <line x1="25" y1="85" x2="20" y2="95" stroke="currentColor" strokeWidth="3" className="text-ghost-dark" />
                <line x1="50" y1="85" x2="50" y2="95" stroke="currentColor" strokeWidth="3" className="text-ghost-dark" />
                <line x1="75" y1="85" x2="80" y2="95" stroke="currentColor" strokeWidth="3" className="text-ghost-dark" />

                {/* Bubbling potion */}
                <motion.ellipse
                    cx="50"
                    cy="60"
                    rx="28"
                    ry="20"
                    fill="currentColor"
                    className="text-ghost-green/60"
                    animate={{
                        ry: [20, 22, 20],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Bubbles */}
                {[...Array(5)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={30 + i * 10}
                        cy={65}
                        r="3"
                        fill="currentColor"
                        className="text-ghost-green/80"
                        animate={{
                            cy: [65, 40, 30],
                            opacity: [1, 0.5, 0],
                            r: [3, 4, 2],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut",
                        }}
                    />
                ))}

                {/* Steam/Smoke */}
                <motion.path
                    d="M35 30 Q40 20, 45 25 T55 20 Q60 25, 65 30"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-ghost-white/40"
                    animate={{
                        opacity: [0.4, 0.7, 0.4],
                        y: [-5, -10, -5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.path
                    d="M40 25 Q45 15, 50 20 T60 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    className="text-ghost-white/30"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        y: [-8, -15, -8],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
            </svg>

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
                Brewing...
            </motion.p>
        </div>
    );
};
