'use client';

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface MoonBackdropProps {
    className?: string;
    phase?: 'full' | 'waning' | 'new' | 'waxing';
}

export function MoonBackdrop({ className, phase = 'full' }: MoonBackdropProps) {
    const phaseStyles = {
        full: 'scale-100',
        waning: 'scale-x-75',
        waxing: 'scale-x-75',
        new: 'scale-0',
    };

    return (
        <div className={cn('pointer-events-none fixed inset-0 flex items-center justify-center', className)}>
            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
            >
                {/* Moon Glow */}
                <div className="absolute inset-0 rounded-full bg-ghost-purple/20 blur-3xl" style={{ width: '400px', height: '400px' }} />

                {/* Moon Body */}
                <motion.div
                    className={cn(
                        "relative h-60 w-60 rounded-full bg-gradient-to-br from-ghost-white to-ghost-white/60",
                        "shadow-[0_0_60px_rgba(230,230,230,0.3),inset_-20px_-20px_40px_rgba(0,0,0,0.2)]",
                        phaseStyles[phase]
                    )}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {/* Moon Craters */}
                    <div className="absolute top-8 left-12 h-8 w-8 rounded-full bg-black/10" />
                    <div className="absolute top-20 right-16 h-6 w-6 rounded-full bg-black/10" />
                    <div className="absolute bottom-12 left-20 h-10 w-10 rounded-full bg-black/10" />
                </motion.div>
            </motion.div>
        </div>
    );
}
