'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { WithTooltipProps } from '../types/tooltip';
import { SpookyTooltip } from './SpookyTooltip';

export interface MoonlightSwitchProps extends WithTooltipProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    variant?: 'spectral-blood' | 'day-night';
}

export function MoonlightSwitch({
    checked,
    onChange,
    disabled = false,
    className,
    variant = 'spectral-blood',
    tooltip,
    tooltipPosition,
    tooltipClassName,
}: MoonlightSwitchProps) {
    const spectralBloodSwitch = variant === 'spectral-blood' ? (
            <motion.button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={cn(
                    "relative w-24 h-12 rounded-full cursor-pointer p-1 transition-all duration-700 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    checked
                        ? "bg-[#2e0202] focus-visible:ring-purple-500"
                        : "bg-[#1a0505] focus-visible:ring-red-600",
                    disabled && "opacity-50 cursor-not-allowed grayscale",
                    className
                )}
                animate={{
                    backgroundColor: checked ? "#3b0764" : "#450a0a",
                    borderColor: checked ? "#7e22ce" : "#991b1b"
                }}
                style={{ borderWidth: '1px', borderStyle: 'solid' }}
            >
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={false}
                    animate={{ opacity: 1 }}
                >
                    <motion.span
                        className="absolute top-2 left-8 w-[2px] h-[2px] rounded-full opacity-80"
                        animate={{ backgroundColor: checked ? "#e9d5ff" : "#fca5a5" }}
                    />
                    <motion.span
                        className="absolute top-6 left-12 w-[1px] h-[1px] rounded-full opacity-60"
                        animate={{ backgroundColor: checked ? "#e9d5ff" : "#fca5a5" }}
                    />
                    <motion.span
                        className="absolute bottom-3 left-5 w-[2px] h-[2px] rounded-full opacity-90"
                        animate={{ backgroundColor: checked ? "#e9d5ff" : "#fca5a5" }}
                    />
                    <motion.span
                        className="absolute top-4 right-8 w-[1px] h-[1px] bg-white rounded-full"
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                            backgroundColor: checked ? "#d8b4fe" : "#ef4444"
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.div>

                <div
                    className={cn(
                        "w-full h-full flex items-center",
                        checked ? "justify-end" : "justify-start"
                    )}
                >
                    <motion.div
                        layout
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        }}
                        className="w-10 h-10 rounded-full shadow-md relative z-10 flex items-center justify-center"
                        animate={{
                            backgroundColor: checked ? "#f3e8ff" : "#b91c1c",
                            boxShadow: checked
                                ? "0 0 20px 2px rgba(168, 85, 247, 0.6)"
                                : "0 0 20px 2px rgba(220, 38, 38, 0.5)"
                        }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 absolute inset-0 pointer-events-none">
                            <circle cx="30" cy="30" r="10" fill="currentColor" className={checked ? "text-purple-300" : "text-red-900"} />
                            <circle cx="70" cy="60" r="8" fill="currentColor" className={checked ? "text-purple-300" : "text-red-900"} />
                            <circle cx="40" cy="80" r="5" fill="currentColor" className={checked ? "text-purple-300" : "text-red-900"} />
                        </svg>
                    </motion.div>
                </div>
            </motion.button>
    ) : null;

    const dayNightTheme = {
        on: {
            bg: 'bg-slate-900',
            border: 'border-indigo-500',
            thumb: 'bg-slate-100',
            icon: Moon,
            iconColor: 'text-slate-800',
            glow: 'shadow-[0_0_20px_rgba(99,102,241,0.6)]',
        },
        off: {
            bg: 'bg-sky-300',
            border: 'border-yellow-400',
            thumb: 'bg-yellow-100',
            icon: Sun,
            iconColor: 'text-orange-500',
            glow: 'shadow-[0_0_20px_rgba(250,204,21,0.6)]',
        }
    } as const;

    const state = checked ? dayNightTheme.on : dayNightTheme.off;
    const Icon = state.icon;

    const dayNightSwitch = (
        <motion.button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={cn(
                "relative w-20 h-10 rounded-full cursor-pointer p-1 transition-colors duration-500 border-2",
                state.bg,
                state.border,
                disabled && "opacity-50 cursor-not-allowed grayscale",
                className
            )}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                {checked && (
                    <>
                        <motion.div
                            className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-50"
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-30"
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                    </>
                )}
            </div>

            <motion.div
                className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center relative z-10",
                    state.thumb,
                    state.glow
                )}
                animate={{
                    x: checked ? 40 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={checked ? 'on' : 'off'}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon size={14} className={state.iconColor} />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </motion.button>
    );

    // Select the appropriate switch variant
    const switchComponent = variant === 'spectral-blood' ? spectralBloodSwitch : dayNightSwitch;

    // Conditionally wrap with tooltip if tooltip prop is provided
    if (!tooltip) {
        return switchComponent;
    }

    return (
        <SpookyTooltip
            content={tooltip}
            position={tooltipPosition}
            className={tooltipClassName}
        >
            {switchComponent}
        </SpookyTooltip>
    );
}

MoonlightSwitch.displayName = "MoonlightSwitch";
