'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface VeilFadeProps {
    isVisible: boolean;
    children: React.ReactNode;
    duration?: number;
}

export const VeilFade: React.FC<VeilFadeProps> = ({
    isVisible,
    children,
    duration = 0.5,
}) => {
    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
