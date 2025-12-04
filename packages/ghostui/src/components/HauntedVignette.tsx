'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    motion,
    AnimatePresence,
    useSpring,
    useMotionValue,
    useMotionTemplate,
} from 'framer-motion';
import { cn } from '../lib/utils';

// --- GLOBAL STYLES (For Ghost Animations) ---
const GhostStyles = () => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
        @keyframes float-y {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
        .ghost-animate-float { animation: float-y 3s ease-in-out infinite; }
        .ghost-animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
    `,
        }}
    />
);

// --- ASSETS: THE GHOSTS ---
const GhostOne = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 101.11 162.77"
        className={cn(className, 'ghost-animate-float')}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#fff"
            d="M12.68,162.77s34.15-40.76,4.88-80.45C-11.71,42.63,7.44-9.47,57.81,1.48,123.66,15.8,118.8,149.97,12.68,162.77Z"
        />
        <path
            fill="#fff"
            d="M15.56,79.47c6.61,14.44-4.43,17.31-11.79,16.37s-2.83,8.49,4.03,9.75c6.86,1.26,20.02-.94,21.62,11.33,1.6,12.27,19.49.31,18.25-19.5-1.24-19.82-35.94-26.3-32.11-17.94Z"
        />
        <g className="ghost-animate-wiggle origin-center">
            <path
                fill="#2b2b28"
                d="M75.84,83.61c-.85,2.18-2.14,4.2-3.76,5.94-1.64,1.7-3.78,3.05-6.19,3.45-.6.11-1.22.14-1.81.15-.57.01-1.15.03-1.72.07-1.14.09-2.28.26-3.4.52-2.2.53-4.45,1.35-6.07,2.81-.8.72-1.25,1.7-.77,2.56.46.87,1.45,1.51,2.44,2.02,2.04.99,4.31,1.57,6.56,2.17,2.26.59,4.56,1.1,6.76,1.97,1.09.45,2.18.97,3.07,1.77.91.77,1.49,1.96,1.41,3.14-.02-1.19-.66-2.26-1.57-2.95-.9-.71-1.98-1.17-3.07-1.54-2.2-.73-4.49-1.18-6.77-1.69-2.28-.51-4.6-1.02-6.79-2.06-1.06-.54-2.19-1.17-2.88-2.38-.34-.6-.41-1.4-.18-2.07.22-.67.64-1.19,1.1-1.64.92-.88,2.02-1.44,3.12-1.92,1.11-.47,2.26-.81,3.43-1.06,1.17-.25,2.35-.42,3.54-.49.59-.04,1.19-.06,1.79-.03.58.01,1.13,0,1.69-.08,2.24-.28,4.31-1.47,5.97-3.05,1.69-1.57,3.04-3.51,4.09-5.6Z"
            />
        </g>
        <path
            fill="#2b2b28"
            d="M36.45,42.91c-1.09,6.11-4.93,10.53-8.58,9.88s-5.73-6.13-4.64-12.24c1.09-6.11,4.93-10.53,8.58-9.88,3.65.65,5.73,6.13,4.64,12.24Z"
        />
        <ellipse fill="#2b2b28" cx="47.1" cy="41.29" rx="5.27" ry="8.8" />
        <path
            fill="#474743"
            d="M50.95,61.53c0,2.52-2.04,4.56-4.56,4.56s-4.56-2.04-4.56-4.56,2.04-4.56,4.56-4.56,4.56,2.04,4.56,4.56Z"
        />
    </svg>
);

const GhostTwo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 130.89 156.25"
        className={cn(className, 'ghost-animate-float')}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#fff"
            d="M130.89,156.25s-34.1-35.33-28.1-80.81c4.93-37.37-3.44-84.83-50.17-72.04C24.87,11,13.93,51.73,26.38,88.15c11.67,34.13,44.31,65.84,104.51,68.1Z"
        />
        <g className="ghost-animate-wiggle origin-center">
            <path
                fill="#2b2b28"
                d="M68.37,63.04c2.71-.21,5.4,2.68,5.12-.98-.28-3.66-2.57-9.03-5.28-8.83-2.71.21-4.81,5.92-4.53,9.58.28,3.66,1.98.44,4.69.23Z"
            />
            <path
                fill="#fff"
                d="M103.48,69.69s-2.18,24.45,13.21,31.54c9.53,4.39-8.8,9.21-16.58,3.28-7.78-5.94,3.38-34.82,3.38-34.82Z"
            />
        </g>
        <path
            fill="#fff"
            d="M31.4,99.83s-7.33-23.43-24.25-24.11c-10.48-.42,4.62-11.88,14.08-9.36,9.46,2.52,10.18,33.47,10.18,33.47Z"
        />
        <path
            fill="#2b2b28"
            d="M65.33,40.47c-1.16,6.54-5.28,11.28-9.19,10.58-3.91-.7-6.14-6.56-4.97-13.1,1.16-6.54,5.28-11.28,9.19-10.58,3.91.7,6.14,6.56,4.97,13.1Z"
        />
        <ellipse fill="#2b2b28" cx="76.74" cy="38.74" rx="5.64" ry="9.43" />
        <path
            fill="#fff"
            d="M127.31,154.98s-34.1-35.33-28.1-80.81c4.93-37.37-3.44-84.83-50.17-72.04C21.28,9.73,10.34,50.46,22.79,86.88c11.67,34.13,44.31,65.84,104.51,68.1Z"
        />
        <path
            fill="#2b2b28"
            d="M64.78,61.78c2.71-.21,5.4,2.68,5.12-.98-.28-3.66-2.57-9.03-5.28-8.83-2.71.21-4.81,5.92-4.53,9.58.28,3.66,1.98.44,4.69.23Z"
        />
        <path
            fill="#fff"
            d="M99.89,68.42s-2.18,24.45,13.21,31.54c9.53,4.39-8.8,9.21-16.58,3.28-7.78-5.94,3.38-34.82,3.38-34.82Z"
        />
        <path
            fill="#fff"
            d="M27.81,98.56s-7.33-23.43-24.25-24.11c-10.48-.42,4.62-11.88,14.08-9.36,9.46,2.52,10.18,33.47,10.18,33.47Z"
        />
        <path
            fill="#2b2b28"
            d="M61.75,39.2c-1.16,6.54-5.28,11.28-9.19,10.58-3.91-.7-6.14-6.56-4.97-13.1,1.16-6.54,5.28-11.28,9.19-10.58,3.91.7,6.14,6.56,4.97,13.1Z"
        />
        <ellipse fill="#2b2b28" cx="73.16" cy="37.47" rx="5.64" ry="9.43" />
    </svg>
);

const GhostThree = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 105.71 147.07"
        className={cn(className, 'ghost-animate-float')}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#fff"
            d="M11.08,131.12C10.48,128.23-1.8,6.76,60.67.2c13.36-1.4,20.2,4.89,23.33,10.16,13.04,21.93-20.69,67.61,20.36,118.3,2.22,2.74,1.65,6.82-1.28,8.79-4.94,3.33-13.26,6.53-23.75,1.49-17.35-8.33-11.66,4.97-25.5,7.86-13.84,2.89-16.09-19.71-25.07-11.01-7.37,7.14-14.84,8.9-17.69-4.68Z"
        />
        <path
            fill="#2b2b28"
            d="M42.88,30.75c-1.58,3.35-4.41,5.33-6.32,4.43-1.91-.9-2.17-4.35-.59-7.69,1.58-3.35,4.41-5.33,6.32-4.43,1.91.9,2.17,4.35.59,7.69Z"
        />
        <path
            fill="#2b2b28"
            d="M56.54,37.79c-2.03,3.09-5.11,4.66-6.87,3.51-1.77-1.16-1.55-4.61.48-7.7s5.11-4.66,6.87-3.51c1.77,1.16,1.55,4.61-.48,7.7Z"
        />
        <path
            fill="#2b2b28"
            d="M39.5,44.48c2.42,1.58,5.61,1.49,4.42,3.31-1.19,1.81-4.65,3.46-7.07,1.88-2.42-1.58-2.88-5.8-1.69-7.61,1.19-1.81,1.92.84,4.34,2.43Z"
        />
        <path
            fill="#fff"
            d="M23.84,34S8.02,14.89,1.94,16.67c-8.15,2.38,11.89,48.76,13.49,52.45,1.61,3.69,8.41-35.12,8.41-35.12Z"
        />
        <path
            fill="#fff"
            d="M79.68,63.17s14.83,14.36,22.17,19.92c9.51,7.2-9.21,20.92-26.24,6.79-17.03-14.13,4.07-26.71,4.07-26.71Z"
        />
    </svg>
);

const GHOSTS = [GhostOne, GhostTwo, GhostThree];
type Edge = 'top' | 'left' | 'right';


// --- HAUNTED CARD PROPS ---
export interface HauntedCardProps {
    /** Content to wrap with the ghost effect */
    children: React.ReactNode;
    /** Additional CSS classes for the wrapper */
    className?: string;
    /** Delay before ghost appears (ms) @default 250 */
    peekDelay?: number;
    /** Whether ghost effect is enabled @default true */
    ghostEnabled?: boolean;
    /** Size of the ghost in pixels @default 112 */
    ghostSize?: number;
    /** Whether to show the "BOO!" text @default true */
    showBoo?: boolean;
    /** Custom content wrapper classes (for the solid background layer) */
    contentClassName?: string;
}

// --- HAUNTED CARD COMPONENT (Wrapper for any content) ---
const HauntedCardComponent: React.FC<HauntedCardProps> = ({
    children,
    className,
    peekDelay = 250,
    ghostEnabled = true,
    ghostSize = 112,
    showBoo = true,
    contentClassName,
}) => {
    const [ghostState, setGhostState] = useState<{
        id: number;
        Component: React.FC<{ className?: string }>;
        edge: Edge;
    } | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (!ghostEnabled) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const RandomGhost = GHOSTS[Math.floor(Math.random() * GHOSTS.length)];
            const edges: Edge[] = ['top', 'left', 'right'];
            const randomEdge = edges[Math.floor(Math.random() * edges.length)];
            setGhostState({ id: Date.now(), Component: RandomGhost, edge: randomEdge });
        }, peekDelay);
    }, [ghostEnabled, peekDelay]);

    const handleMouseLeave = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setGhostState(null);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const ghostVariants = {
        hidden: (edge: Edge) => ({
            y: edge === 'top' ? '20%' : 0,
            x: edge === 'left' ? '20%' : edge === 'right' ? '-20%' : 0,
            opacity: 0,
            rotate: edge === 'left' ? -15 : edge === 'right' ? 15 : 0,
            scale: 0.8,
        }),
        visible: (edge: Edge) => ({
            y: edge === 'top' ? '-55%' : 0,
            x: edge === 'left' ? '-55%' : edge === 'right' ? '55%' : 0,
            opacity: 0.7,
            rotate: 0,
            scale: 1,
            transition: {
                type: 'spring' as const,
                stiffness: 120,
                damping: 15,
                mass: 1,
            },
        }),
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.3, ease: 'backIn' as const },
        },
    };

    const booVariants = {
        hidden: { scale: 0, opacity: 0, y: 0 },
        visible: {
            scale: 1.1,
            opacity: 1,
            y: -30,
            transition: {
                delay: 0.2,
                type: 'spring' as const,
                stiffness: 400,
                damping: 10,
            },
        },
        exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
    };

    const getGhostPositionClass = (edge: Edge) => {
        switch (edge) {
            case 'top':
                return 'top-0';
            case 'left':
                return 'left-0';
            case 'right':
                return 'right-0';
        }
    };

    const getBooPositionClass = (edge: Edge) => {
        switch (edge) {
            case 'top':
                return '-top-24';
            case 'left':
                return '-left-20 top-0';
            case 'right':
                return '-right-20 top-0';
        }
    };

    return (
        <div
            className={cn('relative group', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <GhostStyles />

            {/* Content Layer - z-20: Sits ABOVE the ghost layer */}
            <div className={cn('relative z-20', contentClassName)}>{children}</div>

            {/* The Peek-a-boo Layer (Behind Content) - z-10 */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                    {ghostState && (
                        <>
                            {/* The Ghost */}
                            <motion.div
                                key={`ghost-${ghostState.id}`}
                                custom={ghostState.edge}
                                variants={ghostVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={cn(
                                    'absolute mix-blend-screen',
                                    getGhostPositionClass(ghostState.edge)
                                )}
                                style={{ width: ghostSize, height: ghostSize }}
                            >
                                <ghostState.Component className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] opacity-90" />
                            </motion.div>

                            {/* The "BOO!" Text */}
                            {showBoo && (
                                <motion.div
                                    key={`boo-${ghostState.id}`}
                                    variants={booVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={cn(
                                        'absolute z-50 font-black italic text-4xl text-white tracking-widest pointer-events-none',
                                        getBooPositionClass(ghostState.edge)
                                    )}
                                    style={{
                                        textShadow: '3px 3px 0 #000',
                                        WebkitTextStroke: '1px #A855F7',
                                        filter: 'drop-shadow(0 0 10px #A855F7)',
                                    }}
                                >
                                    BOO!
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

HauntedCardComponent.displayName = 'HauntedCard';

export const HauntedCard = HauntedCardComponent;

// --- HAUNTED VIGNETTE PROPS ---
export interface HauntedVignetteProps {
    /** Size of the flashlight circle in pixels @default 350 */
    radius?: number;
    /** Darkness of the overlay (0-1) @default 0.9 */
    darkness?: number;
    /** Backdrop blur amount in pixels @default 2 */
    blur?: number;
    /** Whether the vignette is enabled @default true */
    enabled?: boolean;
    /** Spring damping for cursor following @default 25 */
    springDamping?: number;
    /** Spring stiffness for cursor following @default 150 */
    springStiffness?: number;
    /** Additional CSS classes */
    className?: string;
}

// --- HAUNTED VIGNETTE COMPONENT (The Flashlight Overlay) ---
export const HauntedVignette: React.FC<HauntedVignetteProps> = ({
    radius = 350,
    darkness = 0.9,
    blur = 2,
    enabled = true,
    springDamping = 25,
    springStiffness = 150,
    className,
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isMounted, setIsMounted] = useState(false);

    const springConfig = { damping: springDamping, stiffness: springStiffness };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsMounted(true);
        if (enabled && typeof window !== 'undefined') {
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
        }
    }, [enabled, mouseX, mouseY]);

    useEffect(() => {
        if (!enabled || !isMounted) return;

        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [enabled, isMounted, mouseX, mouseY]);

    const maskImage = useMotionTemplate`radial-gradient(circle ${radius}px at ${smoothX}px ${smoothY}px, transparent 10%, black 100%)`;

    if (!enabled) {
        return null;
    }

    return (
        <motion.div
            className={cn(
                'fixed inset-0 z-50 pointer-events-none',
                className
            )}
            aria-hidden="true"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${darkness})`,
                backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
                WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
                maskImage: maskImage,
                WebkitMaskImage: maskImage,
            }}
        />
    );
};

HauntedVignette.displayName = 'HauntedVignette';

// --- HAUNTED VIGNETTE DEMO PROPS ---
export interface HauntedVignetteDemoProps {
    /** Initial flashlight state @default true */
    initialFlashlightOn?: boolean;
    /** Show toggle button @default true */
    showToggle?: boolean;
    /** Additional CSS classes for the container */
    className?: string;
}

// --- HAUNTED VIGNETTE DEMO COMPONENT ---
export const HauntedVignetteDemo: React.FC<HauntedVignetteDemoProps> = ({
    initialFlashlightOn = true,
    showToggle = true,
    className,
}) => {
    const [flashlightOn, setFlashlightOn] = useState(initialFlashlightOn);

    return (
        <div
            className={cn(
                'min-h-screen bg-[#050505] text-gray-200 font-sans p-8 md:p-20 relative overflow-hidden',
                className
            )}
        >
            <GhostStyles />

            {/* Toggle Control */}
            {showToggle && (
                <div className="fixed top-8 right-8 z-[60]">
                    <button
                        onClick={() => setFlashlightOn(!flashlightOn)}
                        className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20"
                    >
                        {flashlightOn ? 'Disable Flashlight' : 'Enable Flashlight'}
                    </button>
                </div>
            )}

            {/* The Vignette Overlay */}
            {flashlightOn && <HauntedVignette />}

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto space-y-16 pt-20">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 tracking-tighter">
                        THE DARK ROOM
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Move your cursor to explore. <br />
                        <span className="text-purple-400">Wait for the spirits...</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8">
                    <HauntedCard>
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">The Attic</h3>
                            <p className="text-gray-400 text-sm">
                                Dust motes dance in the sliver of moonlight. Something scuttles in the corner.
                            </p>
                        </div>
                    </HauntedCard>

                    <HauntedCard>
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">Cellar Door</h3>
                            <p className="text-gray-400 text-sm">
                                Locked from the inside. Scratch marks mar the heavy oak surface.
                            </p>
                        </div>
                    </HauntedCard>

                    <HauntedCard>
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">Dusty Mirror</h3>
                            <p className="text-gray-400 text-sm">
                                Your reflection seems to lag just a second behind your movements.
                            </p>
                        </div>
                    </HauntedCard>

                    <HauntedCard>
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">Ancient Grimoire</h3>
                            <p className="text-gray-400 text-sm">
                                The pages turn by themselves when the wind isn&apos;t blowing.
                            </p>
                        </div>
                    </HauntedCard>

                    <HauntedCard>
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">Music Box</h3>
                            <p className="text-gray-400 text-sm">
                                It plays a lullaby you haven&apos;t heard since... since then.
                            </p>
                        </div>
                    </HauntedCard>

                    <HauntedCard>
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">Cold Spot</h3>
                            <p className="text-gray-400 text-sm">
                                The temperature drops 20 degrees in this exact spot.
                            </p>
                        </div>
                    </HauntedCard>
                </div>
            </div>

            {/* Background Noise Texture */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")',
                }}
            />
        </div>
    );
};

export default HauntedVignetteDemo;
