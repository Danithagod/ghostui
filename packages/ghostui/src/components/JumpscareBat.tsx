'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BatIcon } from './BatIcon';

/**
 * JumpscareBat component - displays a dramatic jumpscare effect with a large bat
 * that scales up rapidly and then exits upward.
 * 
 * This component is used as part of the BatBurst effect during the initial
 * activation phase (first 1.5 seconds).
 */
export const JumpscareBat: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0, scale: 0.2, y: 300 }}
      animate={{ opacity: 1, scale: 5, y: 0 }}
      exit={{ opacity: 0, scale: 8, y: -200 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        style={{
          filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) blur(0.5px)',
        }}
      >
        <BatIcon className="w-24 h-24 text-ghost-dark" />
      </div>
    </motion.div>
  );
};

JumpscareBat.displayName = 'JumpscareBat';
