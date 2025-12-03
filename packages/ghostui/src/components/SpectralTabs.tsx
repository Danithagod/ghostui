'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { WithTooltipProps } from '../types/tooltip';
import { SpookyTooltip } from './SpookyTooltip';
import { useThemeOptional, type Theme } from './ThemeProvider';

export interface TabItem extends WithTooltipProps {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

export interface SpectralTabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    /** Theme variant - defaults to ThemeProvider context or 'spectral' */
    variant?: Theme;
}

// Theme color configurations
const themeColors = {
    spectral: {
        accent: 'rgb(168, 85, 247)', // ghost-purple
        accentRgb: '168, 85, 247',
        glow: 'rgba(168, 85, 247, 0.4)',
        glowStrong: 'rgba(168, 85, 247, 0.6)',
        border: 'rgba(168, 85, 247, 0.3)',
        bg: 'rgba(168, 85, 247, 0.1)',
        bgHover: 'rgba(168, 85, 247, 0.15)',
    },
    blood: {
        accent: 'rgb(239, 68, 68)', // blood-red
        accentRgb: '239, 68, 68',
        glow: 'rgba(239, 68, 68, 0.4)',
        glowStrong: 'rgba(239, 68, 68, 0.6)',
        border: 'rgba(239, 68, 68, 0.3)',
        bg: 'rgba(239, 68, 68, 0.1)',
        bgHover: 'rgba(239, 68, 68, 0.15)',
    },
};

export const SpectralTabs: React.FC<SpectralTabsProps> = ({
    tabs,
    defaultTab,
    onTabChange,
    className,
    variant,
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
    const [previousTab, setPreviousTab] = useState<string | null>(null);
    const [tabDimensions, setTabDimensions] = useState<{ left: number; width: number } | null>(null);
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const containerRef = useRef<HTMLDivElement>(null);

    // Get theme from context or prop
    const themeContext = useThemeOptional();
    const theme: Theme = variant ?? themeContext?.theme ?? 'spectral';
    const colors = themeColors[theme];

    const handleTabChange = (tabId: string) => {
        if (tabId !== activeTab) {
            setPreviousTab(activeTab);
            setActiveTab(tabId);
            onTabChange?.(tabId);
        }
    };

    // Calculate tab indicator position
    useLayoutEffect(() => {
        const activeButton = tabRefs.current.get(activeTab);
        const container = containerRef.current;
        if (activeButton && container) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            setTabDimensions({
                left: buttonRect.left - containerRect.left,
                width: buttonRect.width,
            });
        }
    }, [activeTab, tabs]);

    const direction = (() => {
        if (!previousTab) return 0;
        const prevIndex = tabs.findIndex((t) => t.id === previousTab);
        const currIndex = tabs.findIndex((t) => t.id === activeTab);
        return currIndex > prevIndex ? 1 : -1;
    })();

    return (
        <div className={cn("w-full", className)}>
            {/* Tab Headers */}
            <div 
                ref={containerRef}
                className="relative"
                style={{
                    borderBottom: `1px solid ${colors.border}`,
                }}
            >
                <div className="flex gap-1 relative" role="tablist">
                    {/* Animated background indicator */}
                    {tabDimensions && (
                        <motion.div
                            className="absolute top-0 bottom-0 rounded-t-lg -z-10"
                            style={{
                                background: `linear-gradient(180deg, ${colors.bg} 0%, transparent 100%)`,
                                borderTop: `2px solid ${colors.accent}`,
                                borderLeft: `1px solid ${colors.border}`,
                                borderRight: `1px solid ${colors.border}`,
                            }}
                            animate={{
                                left: tabDimensions.left,
                                width: tabDimensions.width,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                mass: 0.8,
                            }}
                        />
                    )}

                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTab;

                        const tabButton = (
                            <button
                                key={tab.id}
                                ref={(el) => {
                                    if (el) tabRefs.current.set(tab.id, el);
                                }}
                                onClick={() => handleTabChange(tab.id)}
                                className={cn(
                                    "relative px-5 py-3.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 rounded-t-lg",
                                    isActive
                                        ? "text-ghost-white"
                                        : "text-ghost-white/50 hover:text-ghost-white/80"
                                )}
                                style={{
                                    ...(isActive && {
                                        textShadow: `0 0 20px ${colors.glow}`,
                                    }),
                                }}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${tab.id}`}
                                id={`tab-${tab.id}`}
                            >
                                <div className="flex items-center gap-2.5 relative z-10">
                                    {tab.icon && (
                                        <motion.span
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                color: isActive ? colors.accent : undefined,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {tab.icon}
                                        </motion.span>
                                    )}
                                    <span>{tab.label}</span>
                                </div>

                                {/* Spectral glow effect */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-t-lg -z-10 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            background: `radial-gradient(ellipse at center bottom, ${colors.glow} 0%, transparent 70%)`,
                                            filter: 'blur(8px)',
                                        }}
                                    />
                                )}
                            </button>
                        );

                        // Conditionally wrap with tooltip if tooltip prop is provided
                        if (!tab.tooltip) {
                            return tabButton;
                        }

                        return (
                            <SpookyTooltip
                                key={tab.id}
                                content={tab.tooltip}
                                position={tab.tooltipPosition}
                                className={tab.tooltipClassName}
                            >
                                {tabButton}
                            </SpookyTooltip>
                        );
                    })}
                </div>

                {/* Active indicator bar with glow */}
                {tabDimensions && (
                    <motion.div
                        className="absolute bottom-0 h-0.5"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                            boxShadow: `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}`,
                        }}
                        animate={{
                            left: tabDimensions.left,
                            width: tabDimensions.width,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 0.8,
                        }}
                    />
                )}
            </div>

            {/* Tab Content with smooth freeze-frame transition */}
            <div className="relative overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTab;
                        if (!isActive) return null;

                        return (
                            <motion.div
                                key={tab.id}
                                role="tabpanel"
                                id={`panel-${tab.id}`}
                                aria-labelledby={`tab-${tab.id}`}
                                initial={{ 
                                    opacity: 0,
                                    x: direction * 30,
                                    scale: 0.98,
                                    filter: 'blur(4px)',
                                }}
                                animate={{ 
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                }}
                                exit={{ 
                                    opacity: 0,
                                    x: direction * -30,
                                    scale: 0.98,
                                    filter: 'blur(4px)',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.4, 0, 0.2, 1],
                                    opacity: { duration: 0.25 },
                                    filter: { duration: 0.3 },
                                }}
                                className="pt-6"
                            >
                                {tab.content}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
