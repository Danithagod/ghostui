'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { Ghost, BookOpen, Palette, Code2 } from 'lucide-react';
import { Search } from './Search';
import { MoonlightSwitch } from 'ghostui-react';
import { FloatingCard } from './FloatingCard';

interface NavItem {
    title: string;
    href: string;
    icon?: React.ReactNode;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const navigation: NavSection[] = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Introduction', href: '/docs/getting-started', icon: <BookOpen className="w-4 h-4" /> },
            { title: 'Theming', href: '/docs/theming', icon: <Palette className="w-4 h-4" /> },
            { title: 'Examples', href: '/docs/examples', icon: <Code2 className="w-4 h-4" /> },
        ],
    },
    {
        title: 'Components',
        items: [
            { title: 'GooeyButton', href: '/docs/components/gooey-button' },
            { title: 'GooeyCard', href: '/docs/components/gooey-card' },
            { title: 'GooeyDrawer', href: '/docs/components/gooey-drawer' },
            { title: 'MoonlightSwitch', href: '/docs/components/moonlight-switch' },
            { title: 'CoffinCard', href: '/docs/components/coffin-card' },
            { title: 'SpiritInput', href: '/docs/components/spirit-input' },
            { title: 'GraveModal', href: '/docs/components/grave-modal' },
            { title: 'SpookyTooltip', href: '/docs/components/spooky-tooltip' },
            { title: 'GooeySidebar', href: '/docs/components/gooey-sidebar' },
            { title: 'HauntedVignette', href: '/docs/components/haunted-vignette' },
            { title: 'GhostToast', href: '/docs/components/ghost-toast' },
            { title: 'SpectralTabs', href: '/docs/components/spectral-tabs' },
            { title: 'WhisperBox', href: '/docs/components/whisper-box' },
            { title: 'GooeyProgressBar', href: '/docs/components/gooey-progress-bar' },
            { title: 'SpookyScrollbar', href: '/docs/components/spooky-scrollbar' },
            { title: 'SpookySkeleton', href: '/docs/components/spooky-skeleton' },
        ],
    },
    {
        title: 'Cursor Effects',
        items: [
            { title: 'GhostCursor', href: '/docs/components/ghost-cursor' },
            { title: 'WispTrail', href: '/docs/components/wisp-trail' },
        ],
    },
    {
        title: 'Page Transitions',
        items: [
            { title: 'BloodSmear', href: '/docs/components/blood-smear' },
            { title: 'ShadowCrawl', href: '/docs/components/shadow-crawl' },
            { title: 'SpectralRiver', href: '/docs/components/spectral-river' },
        ],
    },
];


export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-30 h-screen w-80 p-4 pr-8">
            <FloatingCard className="h-full flex flex-col">
                {/* Header Section - Logo, Search, Theme Toggle - BRIGHT WHITE */}
                <div className="flex-shrink-0 p-5">
                    <Link href="/" className="block mb-4 group">
                        <div className="flex items-center gap-2 transition-colors">
                            <Ghost className="h-6 w-6" style={{ color: '#ffffff', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                            <span 
                                className="text-xl font-display tracking-wide"
                                style={{ 
                                    color: '#ffffff',
                                    textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(var(--ghost-accent-rgb), 0.4)'
                                }}
                            >
                                GhostUI
                            </span>
                        </div>
                        <p className="text-xs mt-1 font-mono pl-8" style={{ color: '#e0e0e0' }}>
                            v4.0.0-beta
                        </p>
                    </Link>
                    {/* Search wrapper with brightness boost */}
                    <div style={{ filter: 'brightness(1.2)' }}>
                        <Search />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: '#e0e0e0' }}>
                                Theme Toggle
                            </span>
                            <div style={{ transform: 'scale(0.65)', transformOrigin: 'center', filter: 'brightness(1.3)' }}>
                                <MoonlightSwitch />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Section - Scrollable inside the card, hidden scrollbar */}
                <nav 
                    className="flex-1 overflow-y-auto px-4 pb-8 sidebar-nav"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style jsx>{`
                        .sidebar-nav::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {navigation.map((section) => (
                        <div key={section.title} className="mb-6">
                            {/* Section headings - BRIGHT with glow */}
                            <h3 
                                className="mb-3 px-2 text-base font-bold uppercase tracking-widest"
                                style={{ 
                                    color: '#ffffff',
                                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(var(--ghost-accent-rgb), 0.4)',
                                    letterSpacing: '0.15em'
                                }}
                            >
                                {section.title}
                            </h3>
                            {/* No bullet points - clean list */}
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                'sidebar-nav-item flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200',
                                                isActive ? 'font-semibold active' : ''
                                            )}
                                            style={isActive ? { 
                                                /* Selected: bright white background with dark text */
                                                backgroundColor: '#ffffff',
                                                color: '#1a0b2e',
                                                boxShadow: '0 0 25px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                                            } : {
                                                /* Inactive: bright white text */
                                                color: '#f0f0f0',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                                    e.currentTarget.style.color = '#ffffff';
                                                    e.currentTarget.style.paddingLeft = '16px';
                                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = '#f0f0f0';
                                                    e.currentTarget.style.paddingLeft = '12px';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }
                                            }}
                                        >
                                            {item.icon}
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </FloatingCard>
        </aside>
    );
}
