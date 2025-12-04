'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PREVIEW_STYLES, PREVIEW_SIZES, PreviewSize } from '@/lib/styles';
import { CodeBlock } from './CodeBlock/CodeBlock';

interface Tab {
    id: string;
    label: string;
}

interface ComponentPlaygroundProps {
    preview: React.ReactNode;
    code: string;
    api?: React.ReactNode;
    /** Size variant for preview container height (sm: 200px, md: 350px, lg: 500px, xl: 700px) */
    previewSize?: PreviewSize;
    /** Additional className for preview container */
    previewClassName?: string;
}

export function ComponentPlayground({ 
    preview, 
    code, 
    api, 
    previewSize = 'md',
    previewClassName 
}: ComponentPlaygroundProps) {
    const [activeTab, setActiveTab] = useState('preview');

    const tabs: Tab[] = [
        { id: 'preview', label: 'Preview' },
        { id: 'code', label: 'Code' },
        ...(api ? [{ id: 'api', label: 'API' }] : []),
    ];

    // Get the size class, falling back to 'md' for invalid sizes
    const sizeClass = PREVIEW_SIZES[previewSize] || PREVIEW_SIZES.md;

    return (
        <div 
            className="not-prose my-10 overflow-hidden rounded-xl border bg-ghost-dark shadow-2xl" 
            style={{ 
                borderColor: 'rgba(var(--ghost-accent-rgb), 0.3)', 
                boxShadow: '0 0 20px rgba(var(--ghost-accent-rgb), 0.3)' 
            }}
        >
            {/* Tab Navigation */}
            <div 
                className="flex items-center gap-2 border-b bg-black/40 px-4 py-3" 
                style={{ borderBottomColor: 'rgba(var(--ghost-accent-rgb), 0.3)' }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border",
                            activeTab === tab.id
                                ? ""
                                : "text-ghost-white/60 hover:bg-ghost-gray/30 hover:text-ghost-white"
                        )}
                        style={activeTab === tab.id ? { 
                            backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
                            color: 'var(--ghost-accent)',
                            borderColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
                            boxShadow: '0 0 10px rgba(var(--ghost-accent-rgb), 0.2)' 
                        } : {
                            borderColor: 'rgba(126, 34, 206, 0.2)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-ghost-dark/50 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeTab === 'preview' && (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className={cn(PREVIEW_STYLES.container, sizeClass, previewClassName)}
                        >
                            {preview}
                        </motion.div>
                    )}

                    {activeTab === 'code' && (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="p-6 md:p-8"
                        >
                            <CodeBlock code={code} language="tsx" />
                        </motion.div>
                    )}

                    {activeTab === 'api' && api && (
                        <motion.div
                            key="api"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="p-6 md:p-8"
                        >
                            {api}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
