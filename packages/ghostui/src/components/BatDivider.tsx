'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface BatDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
}

export function BatDivider({ className, color = '#A855F7', ...props }: BatDividerProps) {
    return (
        <div className={cn("relative w-full h-12 overflow-hidden", className)} {...props}>
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-ghost-purple to-transparent opacity-50" />

            {/* Bat 1 */}
            <motion.div
                className="absolute top-1/2 left-0 w-4 h-4 text-ghost-purple"
                animate={{
                    x: ['0%', '100%'],
                    y: [-5, 5, -5],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <BatIcon />
            </motion.div>

            {/* Bat 2 */}
            <motion.div
                className="absolute top-1/2 left-0 w-3 h-3 text-ghost-purple opacity-70"
                animate={{
                    x: ['0%', '100%'],
                    y: [5, -5, 5],
                    rotate: [0, -10, 10, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
            >
                <BatIcon />
            </motion.div>
        </div>
    );
}

function BatIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M22 6c-2.5 0-4.5 1.5-6 3-1.5-1.5-3.5-3-6-3s-4.5 1.5-6 3c0 3.5 2.5 8 6 8 1.5 0 3-1 3-1s1.5 1 3 1c3.5 0 6-4.5 6-8 0-1.5-2.5-3-6-3z" />
        </svg>
    );
}

BatDivider.displayName = 'BatDivider';
