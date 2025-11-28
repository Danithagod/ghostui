'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { WithTooltipProps } from '../types/tooltip';
import { SpookyTooltip } from './SpookyTooltip';

export interface BatToggleProps extends WithTooltipProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export const BatToggle: React.FC<BatToggleProps> = ({
    checked = false,
    onChange,
    disabled = false,
    className,
    tooltip,
    tooltipPosition,
    tooltipClassName,
}) => {
    const handleToggle = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    const toggleComponent = (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={handleToggle}
            className={cn(
                "relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 focus:ring-offset-2 focus:ring-offset-ghost-dark",
                checked ? "bg-ghost-purple/30" : "bg-ghost-gray/30",
                disabled && "opacity-50 cursor-not-allowed",
                !disabled && "cursor-pointer",
                className
            )}
        >
            {/* Track border glow */}
            <div className={cn(
                "absolute inset-0 rounded-full border-2 transition-colors",
                checked ? "border-ghost-purple/50" : "border-ghost-gray/30"
            )} />

            {/* Bat slider */}
            <motion.div
                className={cn(
                    "relative h-8 w-8 rounded-full flex items-center justify-center",
                    checked ? "bg-ghost-purple" : "bg-ghost-gray",
                )}
                animate={{
                    x: checked ? 40 : 4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {/* Bat SVG */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-ghost-dark"
                >
                    {/* Bat wings */}
                    <motion.path
                        d="M2 12 Q6 8, 8 12 L12 12"
                        animate={{
                            d: checked
                                ? "M2 12 Q4 8, 8 12 L12 12"
                                : "M2 12 Q6 10, 8 12 L12 12",
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.path
                        d="M12 12 L16 12 Q18 8, 22 12"
                        animate={{
                            d: checked
                                ? "M12 12 L16 12 Q20 8, 22 12"
                                : "M12 12 L16 12 Q18 10, 22 12",
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    {/* Bat body */}
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    {/* Bat ears */}
                    <path d="M11 10 L11 8" />
                    <path d="M13 10 L13 8" />
                </svg>

                {/* Spectral glow when checked */}
                {checked && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-ghost-purple/30 blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </motion.div>
        </button>
    );

    // Conditionally wrap with tooltip if tooltip prop is provided
    if (!tooltip) {
        return toggleComponent;
    }

    return (
        <SpookyTooltip
            content={tooltip}
            position={tooltipPosition}
            className={tooltipClassName}
        >
            {toggleComponent}
        </SpookyTooltip>
    );
};
