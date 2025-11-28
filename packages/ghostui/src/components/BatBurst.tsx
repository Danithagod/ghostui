'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BatBurstProps {
    isActive: boolean;
    onComplete?: () => void;
    batCount?: number;
    duration?: number;
}

interface Bat {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    delay: number;
}

export const BatBurst: React.FC<BatBurstProps> = ({
    isActive,
    onComplete,
    batCount = 20,
    duration = 1.5,
}) => {
    const [bats, setBats] = useState<Bat[]>([]);

    useEffect(() => {
        if (isActive) {
            const centerX = 50;
            const centerY = 50;

            const newBats = Array.from({ length: batCount }, (_, i) => {
                const angle = (i / batCount) * Math.PI * 2;
                const distance = 150;

                return {
                    id: i,
                    startX: centerX,
                    startY: centerY,
                    endX: centerX + Math.cos(angle) * distance,
                    endY: centerY + Math.sin(angle) * distance,
                    delay: Math.random() * 0.3,
                };
            });

            setBats(newBats);

            const timer = setTimeout(() => {
                onComplete?.();
            }, (duration + 0.3) * 1000);

            return () => clearTimeout(timer);
        }
    }, [isActive, batCount, duration, onComplete]);

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
                        {bats.map((bat) => (
                            <motion.g
                                key={bat.id}
                                initial={{
                                    x: bat.startX,
                                    y: bat.startY,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    x: bat.endX,
                                    y: bat.endY,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0.5],
                                }}
                                transition={{
                                    duration,
                                    delay: bat.delay,
                                    ease: 'easeOut',
                                }}
                            >
                                {/* Simple bat shape */}
                                <path
                                    d="M0,-2 Q-3,-1 -4,0 Q-3,1 -2,1 L-1,0 Q-0.5,0.5 0,0.5 Q0.5,0.5 1,0 L2,1 Q3,1 4,0 Q3,-1 0,-2 Z"
                                    fill="currentColor"
                                    className="text-ghost-dark"
                                />
                            </motion.g>
                        ))}
                    </svg>

                    {/* Dark overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 1] }}
                        transition={{ duration, times: [0, 0.5, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
