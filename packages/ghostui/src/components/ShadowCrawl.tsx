'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ShadowCrawlProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

const ShadowCrawlComponent: React.FC<ShadowCrawlProps> = ({
    isActive,
    onComplete,
    duration = 1.2,
}) => {
    // Animation phases:
    // Phase 1 (0-40%): Tendrils crawl up from bottom
    // Phase 2 (40-60%): Full darkness covers screen
    // Phase 3 (60-100%): Everything fades out
    const crawlDuration = duration * 0.4;
    const coverDuration = duration * 0.2;
    const fadeOutDuration = duration * 0.4;

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isActive && (
                <motion.div 
                    className="fixed inset-0 z-50 pointer-events-none overflow-hidden" 
                    aria-hidden="true"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: fadeOutDuration,
                        ease: 'easeInOut'
                    }}
                >
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
                            transition={{
                                duration: crawlDuration,
                                delay: i * 0.05,
                                ease: 'easeOut',
                            }}
                        />
                    ))}

                    {/* Full darkness overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                            duration: coverDuration, 
                            delay: crawlDuration,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

ShadowCrawlComponent.displayName = 'ShadowCrawl';

export const ShadowCrawl = ShadowCrawlComponent;
