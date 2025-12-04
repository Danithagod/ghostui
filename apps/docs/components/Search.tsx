'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search as SearchIcon, X, FileText, Component } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';

type SearchResult = {
    title: string;
    href: string;
    category: 'component' | 'guide';
};

const SEARCH_INDEX: SearchResult[] = [
    // Guides
    { title: 'Getting Started', href: '/docs/getting-started', category: 'guide' },
    { title: 'Theming', href: '/docs/theming', category: 'guide' },
    { title: 'Examples', href: '/docs/examples', category: 'guide' },
    // Components
    { title: 'GooeyButton', href: '/docs/components/gooey-button', category: 'component' },
    { title: 'GooeyDrawer', href: '/docs/components/gooey-drawer', category: 'component' },
    { title: 'MoonlightSwitch', href: '/docs/components/moonlight-switch', category: 'component' },
    { title: 'CoffinCard', href: '/docs/components/coffin-card', category: 'component' },
    { title: 'SpiritInput', href: '/docs/components/spirit-input', category: 'component' },
    { title: 'GraveModal', href: '/docs/components/grave-modal', category: 'component' },
    { title: 'SpookyTooltip', href: '/docs/components/spooky-tooltip', category: 'component' },
    { title: 'HauntedVignette', href: '/docs/components/haunted-vignette', category: 'component' },
    { title: 'GhostToast', href: '/docs/components/ghost-toast', category: 'component' },
    { title: 'SpectralTabs', href: '/docs/components/spectral-tabs', category: 'component' },
    { title: 'GhostCursor', href: '/docs/components/ghost-cursor', category: 'component' },
    { title: 'WispTrail', href: '/docs/components/wisp-trail', category: 'component' },
    { title: 'BloodSmear', href: '/docs/components/blood-smear', category: 'component' },
    { title: 'ShadowCrawl', href: '/docs/components/shadow-crawl', category: 'component' },
];

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Track mount state for portal (SSR compatibility)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Add dynamic styles for placeholder
    useEffect(() => {
        const styleId = 'search-placeholder-styles';
        let styleEl = document.getElementById(styleId) as HTMLStyleElement;
        
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = `
            .search-input::placeholder {
                color: var(--ghost-text-secondary);
                opacity: 0.5;
            }
        `;
        
        return () => {
            const el = document.getElementById(styleId);
            if (el) el.remove();
        };
    }, []);

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [router]);

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const filteredResults = SEARCH_INDEX.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    const searchModal = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transition-colors duration-300"
                        style={{ 
                            backgroundColor: 'var(--ghost-bg)',
                            borderColor: 'rgba(var(--ghost-accent-rgb), 0.3)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            boxShadow: `0 0 40px rgba(var(--ghost-accent-rgb), 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.5)`,
                        }}
                    >
                        <div 
                            className="flex items-center border-b px-4 py-3 transition-colors duration-300"
                            style={{ borderColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}
                        >
                            <SearchIcon 
                                className="w-5 h-5 mr-3 transition-colors duration-300" 
                                style={{ color: 'var(--ghost-accent)' }} 
                            />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search documentation..."
                                className="search-input flex-1 bg-transparent border-none outline-none transition-colors duration-300"
                                style={{
                                    color: 'var(--ghost-text)',
                                }}
                            />
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="p-1 rounded transition-colors duration-300"
                                style={{ color: 'var(--ghost-text-secondary)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(var(--ghost-accent-rgb), 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredResults.length === 0 ? (
                                <div 
                                    className="p-8 text-center transition-colors duration-300"
                                    style={{ color: 'var(--ghost-text-secondary)' }}
                                >
                                    No results found for "{query}"
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filteredResults.map((result) => (
                                        <Link
                                            key={result.href}
                                            href={result.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg group transition-all duration-300"
                                            style={{
                                                color: 'var(--ghost-text)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgba(var(--ghost-accent-rgb), 0.1)`;
                                                e.currentTarget.style.color = 'var(--ghost-accent)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = 'var(--ghost-text)';
                                            }}
                                        >
                                            {result.category === 'component' ? (
                                                <Component 
                                                    className="w-4 h-4 transition-colors duration-300" 
                                                    style={{ color: 'rgba(var(--ghost-accent-rgb), 0.6)' }} 
                                                />
                                            ) : (
                                                <FileText 
                                                    className="w-4 h-4 transition-colors duration-300" 
                                                    style={{ color: 'rgba(16, 185, 129, 0.6)' }} 
                                                />
                                            )}
                                            <span className="transition-colors duration-300">
                                                {result.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div 
                            className="px-4 py-2 border-t text-xs flex justify-between transition-colors duration-300"
                            style={{
                                borderColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                color: 'var(--ghost-text-secondary)',
                            }}
                        >
                            <span>Select to navigate</span>
                            <span>ESC to close</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 w-full px-3 py-2 text-sm bg-black/20 border rounded-md transition-all duration-300"
                style={{
                    color: 'var(--ghost-text-secondary)',
                    borderColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(var(--ghost-accent-rgb), 0.5)';
                    e.currentTarget.style.color = 'var(--ghost-accent)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(var(--ghost-accent-rgb), 0.2)';
                    e.currentTarget.style.color = 'var(--ghost-text-secondary)';
                }}
            >
                <SearchIcon className="w-4 h-4" />
                <span>Search docs...</span>
                <kbd 
                    className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
                    style={{
                        borderColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
                        backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.1)',
                        color: 'var(--ghost-text-secondary)',
                    }}
                >
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {/* Portal the modal to document.body to escape overflow:hidden containers */}
            {mounted && createPortal(searchModal, document.body)}
        </>
    );
}
