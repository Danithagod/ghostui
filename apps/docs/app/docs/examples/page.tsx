import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ExamplesPage() {
    return (
        <div className="prose prose-invert max-w-none">
            <h1 className="text-5xl font-display text-ghost-white">Examples</h1>

            <p className="lead">
                Explore full-featured applications built with GhostUI components.
            </p>

            <h2 className="text-3xl font-display text-ghost-white mt-12">Template Applications</h2>

            <div className="not-prose mt-8 space-y-6">
                <div className="rounded-lg border border-ghost-gray bg-ghost-dark/50 p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-display text-ghost-white">The Haunted Ledger</h3>
                            <p className="mt-2 text-ghost-white/60">Vite + React + Client-Side Rendering</p>
                        </div>
                        <span className="rounded bg-ghost-purple/20 px-3 py-1 text-sm font-medium text-ghost-purple">
                            CSR
                        </span>
                    </div>

                    <p>
                        A dashboard application demonstrating GhostUI components in a client-side rendered environment.
                        Features interactive forms with SpiritInput, data cards with CoffinCard, and atmospheric backgrounds.
                    </p>

                    <div className="mt-4 flex gap-3">
                        <a
                            href="http://localhost:5173"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-ghost-purple/20 px-4 py-2 text-sm font-medium text-ghost-purple transition-colors hover:bg-ghost-purple/30"
                        >
                            View Demo
                            <ExternalLink className="h-4 w-4" />
                        </a>
                        <Link
                            href="https://github.com/your-repo/ghostui"
                            className="inline-flex items-center gap-2 rounded-md border border-ghost-gray px-4 py-2 text-sm font-medium text-ghost-white transition-colors hover:border-ghost-purple"
                        >
                            View Source
                        </Link>
                    </div>
                </div>

                <div className="rounded-lg border border-ghost-gray bg-ghost-dark/50 p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-display text-ghost-white">The Moonlight Blog</h3>
                            <p className="mt-2 text-ghost-white/60">Next.js App Router + Server-Side Rendering</p>
                        </div>
                        <span className="rounded bg-ghost-green/20 px-3 py-1 text-sm font-medium text-ghost-green">
                            SSR
                        </span>
                    </div>

                    <p>
                        A content-focused blog application showcasing GhostUI's SSR compatibility with Next.js App Router.
                        Demonstrates theme switching with MoonlightSwitch, content sections, and server-safe components.
                    </p>

                    <div className="mt-4 flex gap-3">
                        <a
                            href="http://localhost:3001"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-ghost-green/20 px-4 py-2 text-sm font-medium text-ghost-green transition-colors hover:bg-ghost-green/30"
                        >
                            View Demo
                            <ExternalLink className="h-4 w-4" />
                        </a>
                        <Link
                            href="https://github.com/your-repo/ghostui"
                            className="inline-flex items-center gap-2 rounded-md border border-ghost-gray px-4 py-2 text-sm font-medium text-ghost-white transition-colors hover:border-ghost-green"
                        >
                            View Source
                        </Link>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-display text-ghost-white mt-12">Integration Guides</h2>

            <p>
                GhostUI works seamlessly with popular React frameworks and build tools:
            </p>

            <ul>
                <li><strong>Next.js (App Router)</strong> - Full SSR support with 'use client' directives</li>
                <li><strong>Vite</strong> - Fast development with HMR and optimized builds</li>
                <li><strong>Create React App</strong> - Works out of the box with CRA</li>
                <li><strong>Remix</strong> - Compatible with Remix's server/client model</li>
            </ul>
        </div>
    );
}
