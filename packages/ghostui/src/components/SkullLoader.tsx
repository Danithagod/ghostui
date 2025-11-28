'use client';

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface SkullLoaderProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function SkullLoader({ className, size = 'md' }: SkullLoaderProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <motion.div
                className={cn(sizeClasses[size], 'relative')}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Skull Shape */}
                    <motion.path
                        d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4.5 2 6l-1 4c0 1 .5 2 2 2h6c1.5 0 2-1 2-2l-1-4c1-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z"
                        fill="currentColor"
                        className="text-ghost-white"
                    />
                    {/* Eye Sockets */}
                    <ellipse cx="9" cy="9" rx="1.5" ry="2" fill="currentColor" className="text-ghost-purple" />
                    <ellipse cx="15" cy="9" rx="1.5" ry="2" fill="currentColor" className="text-ghost-purple" />
                    {/* Nose */}
                    <path d="M12 11l-1 2h2l-1-2z" fill="currentColor" className="text-ghost-dark" />
                    {/* Teeth */}
                    <rect x="10" y="15" width="1" height="2" fill="currentColor" className="text-ghost-dark" />
                    <rect x="12" y="15" width="1" height="2" fill="currentColor" className="text-ghost-dark" />
                    <rect x="14" y="15" width="1" height="2" fill="currentColor" className="text-ghost-dark" />
                </svg>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-ghost-purple/30 blur-xl" />
            </motion.div>
        </div>
    );
}
