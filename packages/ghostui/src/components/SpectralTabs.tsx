'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { WithTooltipProps } from '../types/tooltip';
import { SpookyTooltip } from './SpookyTooltip';

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
}

export const SpectralTabs: React.FC<SpectralTabsProps> = ({
    tabs,
    defaultTab,
    onTabChange,
    className,
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

    return (
        <div className={cn("w-full", className)}>
            {/* Tab Headers */}
            <div className="relative border-b border-ghost-gray/30">
                <div className="flex gap-1 relative">
                    {tabs.map((tab, index) => {
                        const isActive = tab.id === activeTab;

                        const tabButton = (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={cn(
                                    "relative px-4 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 rounded-t-md",
                                    isActive
                                        ? "text-ghost-purple"
                                        : "text-ghost-white/60 hover:text-ghost-white/80"
                                )}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${tab.id}`}
                                id={`tab-${tab.id}`}
                            >
                                <div className="flex items-center gap-2 relative z-10">
                                    {tab.icon && <span>{tab.icon}</span>}
                                    <span>{tab.label}</span>
                                </div>

                                {/* Active tab background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-ghost-purple/10 border-t-2 border-l-2 border-r-2 border-ghost-purple/40 rounded-t-md"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}

                                {/* Spectral glow */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-ghost-purple/20 blur-md rounded-t-md -z-10" />
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

                {/* Active indicator bar */}
                <motion.div
                    className="absolute bottom-0 h-0.5 bg-gradient-to-r from-transparent via-ghost-purple to-transparent"
                    animate={{
                        left: `${(activeIndex / tabs.length) * 100}%`,
                        width: `${100 / tabs.length}%`,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>

            {/* Tab Content */}
            <div className="relative mt-4">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;

                    return (
                        <div
                            key={tab.id}
                            role="tabpanel"
                            id={`panel-${tab.id}`}
                            aria-labelledby={`tab-${tab.id}`}
                            hidden={!isActive}
                            className={cn(
                                "transition-opacity duration-200",
                                isActive ? "opacity-100" : "opacity-0"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {tab.content}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
