import React from 'react';
import { cn } from '../lib/utils';

export interface HauntedVignetteProps {
    intensity?: 'light' | 'medium' | 'heavy';
    className?: string;
}

export const HauntedVignette: React.FC<HauntedVignetteProps> = ({
    intensity = 'medium',
    className,
}) => {
    const intensityMap = {
        light: 'opacity-30',
        medium: 'opacity-50',
        heavy: 'opacity-70',
    };

    return (
        <div
            className={cn(
                "pointer-events-none fixed inset-0 z-0",
                intensityMap[intensity],
                className
            )}
            aria-hidden="true"
        >
            {/* Radial gradient vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%)',
                }}
            />

            {/* Corner shadows */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%),
            linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%),
            linear-gradient(225deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%),
            linear-gradient(315deg, rgba(0, 0, 0, 0.6) 0%, transparent 15%)
          `,
                }}
            />

            {/* Purple tint */}
            <div
                className="absolute inset-0 bg-ghost-purple/5 mix-blend-overlay"
            />
        </div>
    );
};
