'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ShadowCrawlProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

export const ShadowCrawl: React.FC<ShadowCrawlProps> = ({
    isActive,
    onComplete,
    duration = 1.2,
}) => {
    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isActive && (
                <motion.div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
                    {/* Shadow tendrils */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bottom-0 w-full"
                            style={{
                                height: '100%',
                                background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)`,
                                transformOrigin: 'bottom',
                            }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{
                                duration: duration * 0.6,
                                delay: i * 0.1,
                                ease: 'easeOut',
                            }}
                        />
                    ))}

                    {/* Full darkness overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: duration * 0.4, delay: duration * 0.6 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
