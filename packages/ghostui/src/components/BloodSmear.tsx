'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export interface BloodSmearProps {
  isNavigating: boolean;
  onComplete?: () => void;
  className?: string;
}

interface DripEdgeProps {
  className?: string;
}

const DripEdge: React.FC<DripEdgeProps> = ({ className }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bloodSmearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="50%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
      <path
        fill="url(#bloodSmearGradient)"
        d="M18 18v229.88c22.044 9.644 49.156-17.056 37.773-38.415-9.77-18.333-28.462-64.016 2.426-62.99 28.694.953-6.267 51.97 28.515 57.074 34.492 3.933 27.964-35.193 22.09-56.23-.83-24.395 41.38-26.67 43.338-2.185 8.49 38.33 1.755 77.958-10.797 114.553-6.183 26.524 23.463 53.067 48.754 40.68 21.484-8.98 27.2-37.24 15.63-56.155-9.393-21.09-14.358-46.482-7.056-68.848 15.266-17.564 34.26-2.558 31.67 19.4-2.603 22.057 34.583 31.325 47.707 12.366 12.132-13.536-3.528-44.482 25.866-38.55 24.315 8.45 20.396 42.19 23.975 63.074 1.875 57.63-4.794 115.585-17.48 171.766-6.737 21.168-15.6 49.026 4.77 65.818 20.44 19.52 57 2.728 57.87-24.834.22-41.152-14.95-80.59-16.593-121.685-1.99-51.07-6.23-102.407-1.945-153.452-1.35-22.65 26.44-52.9 47.29-33.247 14.973 22.996-3.973 48.37-2.218 71.568 2.93 38.73 64.42 11.456 42.328-19.217-15.696-21.732 21.673-62.3 29.37-24.413 9.04 28.41 11.366 62.216-2.663 88.127-10.492 19.376-17.404 46.694 5.806 56.666 7.55 3.914 15.26 3.6 19.574-.25V18zm58.988 120.832c21.007 14.74 2.246 37.2 10.23 48.88 1.113 2.357 9.44 7.467 7.966 7.622-27.937-2.57-17.47-21.197-16.758-39.598-1.642-9.125-3.514-16.687-1.438-16.904zm83.46 9.176c15.11 37.11 14.654 71.48.814 107.937-7.613 16.268 12.677 35.28 19.03 39.336-27.713-3.024-36.51-30.838-25.93-52.378 9.564-30.688 12.476-54.2 6.085-94.894zm79.997 28.32c-.87 14.396 8.95 22.896 30.348 29.96-17.49 11.152-43.003-10.59-30.348-29.96zm167.602 13.215c1.624-.008 3.56 2.88 5.043 10.062 3.194 15.478 16.705 9.406 26.406.688.426 17.666-31.39 25.417-34.154 3.49-1.372-8.03.33-14.228 2.705-14.24zm78.185 14.55a.422.422 0 0 1 .147.013c.786 6.186 1.374 13.183 1.243 19.416 3.29 24.09-15.953 44.724-7.834 67.03 4.092 11.247 3.7 18.713-7.085 10.108-13.438-12.492-2.112-35.942 4.592-52.05 6.498-9.613 5.937-44.258 8.935-44.518zm-150.543 59.9c4.252 13.3 1.957 33.317 3.156 48.777-1.066 44.92-10.64 87.364-14.39 131.2-.59 6.89 13.26 28.558-1.274 20.708-17.077-9.554-10.357-31.603-7.137-46.46 13.697-50.267 17.806-102.36 19.644-154.226z"
      />
    </svg>
  );
};

export const BloodSmear: React.FC<BloodSmearProps> = ({
  isNavigating,
  onComplete,
  className,
}) => {
  return (
    <AnimatePresence mode="wait" onExitComplete={onComplete}>
      {isNavigating && (
        <motion.div
          className={cn(
            'fixed inset-0 z-[100] pointer-events-none flex flex-col justify-end',
            className
          )}
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          exit={{ y: '200%' }}
          transition={{
            duration: 2.5,
            ease: [0.45, 0, 0.55, 1],
            times: [0, 1],
          }}
        >
          {/* 1. The Solid Blood Block (Top) with gradient */}
          <div
            className="flex-grow w-full min-h-[100vh]"
            style={{
              background:
                'linear-gradient(180deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)',
            }}
          >
            {/* Highlight streaks on the solid block */}
            <div
              className="absolute top-0 left-[15%] w-8 h-full opacity-20"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, #ef4444 30%, #ef4444 70%, transparent 100%)',
              }}
            />
            <div
              className="absolute top-0 left-[45%] w-12 h-full opacity-15"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, #f87171 20%, #f87171 80%, transparent 100%)',
              }}
            />
            <div
              className="absolute top-0 left-[75%] w-6 h-full opacity-20"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, #ef4444 40%, #ef4444 60%, transparent 100%)',
              }}
            />
          </div>

          {/* 2. The Dripping Edge (Bottom) */}
          <div className="relative w-full h-64 md:h-80 -mt-1">
            <DripEdge className="w-full h-full drop-shadow-lg" />

            {/* 3. Detached Droplets (Particles) - More distributed */}

            {/* Droplet 1 - Fast, left side */}
            <motion.div
              className="absolute top-[40%] left-[8%] w-3 h-5 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #ef4444 0%, #991b1b 60%, #7f1d1d 100%)',
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 350, scaleY: 1.8, opacity: [1, 1, 0.8] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeIn' }}
            />

            {/* Droplet 2 - Medium, left-center */}
            <motion.div
              className="absolute top-[30%] left-[25%] w-4 h-6 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #ef4444 0%, #b91c1c 50%, #991b1b 100%)',
              }}
              initial={{ y: 0 }}
              animate={{ y: 400, scaleY: 1.5 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeIn',
                delay: 0.3,
              }}
            />

            {/* Droplet 3 - Large, center-left */}
            <motion.div
              className="absolute top-[20%] left-[38%] w-5 h-8 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #f87171 0%, #dc2626 40%, #991b1b 100%)',
              }}
              initial={{ y: 0 }}
              animate={{ y: 450, scaleY: 1.6 }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeIn',
                delay: 0.1,
              }}
            />

            {/* Droplet 4 - Small, center */}
            <motion.div
              className="absolute top-[50%] left-[52%] w-3 h-4 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #ef4444 0%, #991b1b 70%)',
              }}
              initial={{ y: 0 }}
              animate={{ y: 300, scaleY: 1.4 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeIn',
                delay: 0.5,
              }}
            />

            {/* Droplet 5 - Medium, center-right */}
            <motion.div
              className="absolute top-[35%] left-[68%] w-4 h-7 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)',
              }}
              initial={{ y: 0 }}
              animate={{ y: 380, scaleY: 1.5 }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: 'easeIn',
                delay: 0.4,
              }}
            />

            {/* Droplet 6 - Tiny, right side */}
            <motion.div
              className="absolute top-[45%] left-[82%] w-2 h-4 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #f87171 0%, #991b1b 80%)',
              }}
              initial={{ y: 0 }}
              animate={{ y: 320, scaleY: 1.6 }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: 'easeIn',
                delay: 0.6,
              }}
            />

            {/* Droplet 7 - Large, far right */}
            <motion.div
              className="absolute top-[25%] left-[92%] w-4 h-6 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 30%, #ef4444 0%, #dc2626 40%, #991b1b 100%)',
              }}
              initial={{ y: 0 }}
              animate={{ y: 420, scaleY: 1.7 }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                ease: 'easeIn',
                delay: 0.2,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
