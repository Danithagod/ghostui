'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CrackTransitionProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

export const CrackTransition: React.FC<CrackTransitionProps> = ({
    isActive,
    onComplete,
    duration = 1,
}) => {
    const [cracks, setCracks] = useState<Array<{ x1: number; y1: number; x2: number; y2: number; id: number }>>([]);

    useEffect(() => {
        if (isActive) {
            // Generate random crack lines
            const newCracks = Array.from({ length: 15 }, (_, i) => ({
                x1: Math.random() * 100,
                y1: Math.random() * 100,
                x2: Math.random() * 100,
                y2: Math.random() * 100,
                id: i,
            }));
            setCracks(newCracks);

            const timer = setTimeout(() => {
                onComplete?.();
            }, duration * 1000);

            return () => clearTimeout(timer);
        }
    }, [isActive, duration, onComplete]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="fixed inset-0 z-50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {cracks.map((crack) => (
                            <motion.line
                                key={crack.id}
                                x1={crack.x1}
                                y1={crack.y1}
                                x2={crack.x2}
                                y2={crack.y2}
                                stroke="white"
                                strokeWidth="0.2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.8 }}
                                transition={{ duration: duration * 0.5, delay: crack.id * 0.05 }}
                            />
                        ))}
                    </svg>

                    {/* Shatter overlay */}
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 1] }}
                        transition={{ duration, times: [0, 0.7, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
