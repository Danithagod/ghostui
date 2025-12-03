'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useThemeOptional, type Theme } from './ThemeProvider';

export interface CoffinCardProps {
    children: React.ReactNode;
    /** Optional title displayed at the top of the card */
    title?: string;
    /** Animation delay index for staggered animations */
    index?: number;
    /** Enable/disable animations */
    animated?: boolean;
    /** Animation intensity level */
    intensity?: 'subtle' | 'medium' | 'intense';
    /** Show the glow shadow effect on hover */
    showGlow?: boolean;
    /** Additional class names */
    className?: string;
}

// Coffin-shaped clip path - narrower at top, wider shoulders, tapers to pointed bottom (elongated)
const coffinClipPath = "polygon(15% 0%, 85% 0%, 100% 10%, 90% 100%, 10% 100%, 0% 10%)";

// Theme color configuration for CoffinCard
const themeColors = {
    spectral: {
        borderHover: 'group-hover:border-purple-500/30',
        gradientOverlay: 'from-purple-900/30 via-purple-900/10 to-transparent',
        titleHover: 'group-hover:text-purple-400',
        glowBg: 'bg-purple-600/30',
    },
    blood: {
        borderHover: 'group-hover:border-red-500/30',
        gradientOverlay: 'from-red-900/30 via-red-900/10 to-transparent',
        titleHover: 'group-hover:text-red-400',
        glowBg: 'bg-red-600/30',
    },
} as const;

export function CoffinCard({ 
    className, 
    children, 
    title,
    index = 0,
    animated = true, 
    intensity = 'medium',
    showGlow = true,
}: CoffinCardProps) {
    // Connect to ThemeProvider context if available
    const themeContext = useThemeOptional();
    const theme: Theme = themeContext?.theme ?? 'spectral';
    const colors = themeColors[theme];

    return (
        <motion.div
            initial={animated ? { opacity: 0, y: 50 } : undefined}
            whileInView={animated ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn("relative group", className)}
        >
            {/* Main card container */}
            <div 
                className={cn(
                    "relative z-10 bg-[#0a0a0a] border border-white/5 p-8 pt-10 pb-12 text-center transition-all duration-500 group-hover:-translate-y-2",
                    colors.borderHover
                )}
                style={{ 
                    clipPath: coffinClipPath,
                    boxShadow: 'none'
                }}
            >
                {/* Gradient overlay on hover */}
                <div 
                    className={cn(
                        "absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                        colors.gradientOverlay
                    )} 
                />

                {/* Title */}
                {title && (
                    <h3 className={cn(
                        "font-creep text-3xl text-gray-200 mb-4 tracking-wider transition-colors duration-300",
                        colors.titleHover
                    )}>
                        {title}
                    </h3>
                )}

                {/* Content */}
                <div className="text-gray-500 text-sm leading-relaxed relative z-20 font-mono group-hover:text-gray-300 transition-colors duration-300">
                    {children}
                </div>
            </div>

            {/* Shadow/Glow effect - Drop shadow below card */}
            {showGlow && (
                <div 
                    className={cn(
                        "absolute inset-0 blur-2xl -z-10 translate-y-4 opacity-0 group-hover:opacity-40 transition-opacity duration-700",
                        colors.glowBg
                    )} 
                    style={{ clipPath: coffinClipPath }}
                />
            )}
        </motion.div>
    );
}

CoffinCard.displayName = 'CoffinCard';
