'use client';

import { cn } from '../lib/utils';

export interface FogBackgroundProps {
    className?: string;
    intensity?: 'low' | 'medium' | 'high' | 'block';
}

const intensityOpacityMap = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-80',
    block: 'opacity-100',
};

export function FogBackground({ className, intensity = 'medium' }: FogBackgroundProps) {
    const opacityClass = intensityOpacityMap[intensity];

    return (
        <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', opacityClass, className)}>
            {/* SVG Filter Definitions */}
            <svg className="absolute h-0 w-0">
                <defs>
                    <filter id="fog-noise-1">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008"
                            numOctaves={4}
                            result="noise"
                        />
                        <feColorMatrix
                            in="noise"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 0.5 0"
                        />
                    </filter>
                    <filter id="fog-noise-2">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.015"
                            numOctaves={3}
                            result="noise"
                        />
                        <feColorMatrix
                            in="noise"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 0.3 0"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Fog Layer 1 - Heavy, slow-rolling base */}
            <div
                className="absolute inset-0 animate-fog-drift-1"
                style={{
                    background: 'rgba(168, 85, 247, 0.4)',
                    filter: 'url(#fog-noise-1) blur(40px)',
                    mixBlendMode: 'screen',
                }}
            />

            {/* Fog Layer 2 - Lighter, faster-moving mist */}
            <div
                className="absolute inset-0 animate-fog-drift-2"
                style={{
                    background: 'rgba(168, 85, 247, 0.3)',
                    filter: 'url(#fog-noise-2) blur(30px)',
                    mixBlendMode: 'screen',
                }}
            />

            {/* Radial gradient vignette for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
                }}
            />
        </div>
    );
}
