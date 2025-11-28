import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface SpiderWebProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
}

export const SpiderWeb: React.FC<SpiderWebProps> = ({
    position = 'top-right',
    size = 'md',
    color = 'currentColor',
    className,
}) => {
    const sizeMap = {
        sm: 100,
        md: 200,
        lg: 300,
    };

    const positionStyles = {
        'top-left': { top: 0, left: 0, transform: 'rotate(0deg)' },
        'top-right': { top: 0, right: 0, transform: 'rotate(90deg)' },
        'bottom-right': { bottom: 0, right: 0, transform: 'rotate(180deg)' },
        'bottom-left': { bottom: 0, left: 0, transform: 'rotate(270deg)' },
    };

    const currentSize = sizeMap[size];

    return (
        <motion.div
            className={cn("absolute pointer-events-none z-0 opacity-50", className)}
            style={{
                ...positionStyles[position],
                width: currentSize,
                height: currentSize,
            }}
            animate={{
                rotate: [
                    positionStyles[position].transform.replace('deg', '') + 'deg',
                    (parseInt(positionStyles[position].transform.replace('deg', '').replace('rotate(', '')) + 2) + 'deg',
                    positionStyles[position].transform.replace('deg', '') + 'deg'
                ],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                className="w-full h-full"
            >
                {/* Radial threads */}
                <path d="M0 0 L100 100" />
                <path d="M0 0 L80 100" />
                <path d="M0 0 L100 80" />
                <path d="M0 0 L50 100" />
                <path d="M0 0 L100 50" />
                <path d="M0 0 L20 100" />
                <path d="M0 0 L100 20" />

                {/* Spiral threads */}
                <path d="M10 0 Q 5 5 0 10" />
                <path d="M20 0 Q 10 10 0 20" />
                <path d="M30 0 Q 15 15 0 30" />
                <path d="M40 0 Q 20 20 0 40" />
                <path d="M50 0 Q 25 25 0 50" />
                <path d="M60 0 Q 30 30 0 60" />
                <path d="M70 0 Q 35 35 0 70" />
                <path d="M80 0 Q 40 40 0 80" />
                <path d="M90 0 Q 45 45 0 90" />

                {/* Irregular connections for realism */}
                <path d="M20 10 L 10 20" strokeOpacity="0.5" />
                <path d="M40 20 L 20 40" strokeOpacity="0.5" />
                <path d="M60 30 L 30 60" strokeOpacity="0.5" />
            </svg>
        </motion.div>
    );
};
