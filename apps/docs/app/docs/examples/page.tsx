import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export default function ExamplesPage() {
    return (
        <div className="prose prose-invert max-w-none pb-16">
            <h1 className="text-5xl font-display text-ghost-white">Examples</h1>

            <p className="lead mb-16">
                Explore full-featured applications built with GhostUI components.
            </p>

            <section className="mb-16">
                <h2 className="text-3xl font-display text-ghost-white mt-0 mb-8">The Cauldron Emporium</h2>

                <div className="not-prose space-y-6">
                    <div className="rounded-2xl border border-[var(--ghost-accent)]/30 bg-[var(--ghost-bg-secondary)]/50 p-8 shadow-lg">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h3 className="text-2xl font-display text-[var(--ghost-accent)]">Potion Shop Demo</h3>
                                <p className="mt-2 text-[var(--ghost-text-secondary)]">Next.js App Router + GhostUI Components</p>
                            </div>
                            <span className="rounded-full bg-[var(--ghost-accent)]/20 px-4 py-1.5 text-sm font-medium text-[var(--ghost-accent)]">
                                Interactive
                            </span>
                        </div>

                        <p className="text-[var(--ghost-text)]/80 mb-4 leading-relaxed">
                            A complete e-commerce demo showcasing GhostUI&apos;s component library in action. Browse mystical potions, 
                            elixirs, and cursed items in this spooky shop experience. Features include product filtering by category 
                            and rarity, cart management, multi-step checkout flow, and animated order tracking.
                        </p>

                        <p className="text-[var(--ghost-text)]/80 mb-6 leading-relaxed">
                            This demo highlights key components including GooeySidebar, GooeyCard, GooeyButton, GraveModal, 
                            SpiritInput, MoonlightSwitch, GooeyProgressBar, SpookySkeleton, and ShadowCrawl transitions.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <a
                                href="http://localhost:3001"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-[var(--ghost-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[var(--ghost-accent)]/25"
                            >
                                View Demo
                                <ExternalLink className="h-4 w-4" />
                            </a>
                            <Link
                                href="https://github.com/your-repo/ghostui/tree/main/apps/demo"
                                className="inline-flex items-center gap-2 rounded-lg border border-[var(--ghost-border)]/50 px-5 py-2.5 text-sm font-medium text-[var(--ghost-text)] transition-all hover:border-[var(--ghost-accent)] hover:text-[var(--ghost-accent)]"
                            >
                                View Source
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-display text-ghost-white mt-0 mb-8">Components Featured</h2>

                <ul className="space-y-3">
                    <li><strong>GooeySidebar</strong> - Navigation with gooey hover effects and dripping animations</li>
                    <li><strong>GooeyCard</strong> - Product cards with atmospheric styling</li>
                    <li><strong>GooeyButton</strong> - Interactive buttons with slime, blood, and ectoplasm variants</li>
                    <li><strong>GraveModal</strong> - Modal dialogs for checkout flow</li>
                    <li><strong>SpiritInput</strong> - Form inputs with ghostly focus states</li>
                    <li><strong>MoonlightSwitch</strong> - Theme toggle between spectral and blood moon themes</li>
                    <li><strong>GooeyProgressBar</strong> - Order progress visualization</li>
                    <li><strong>SpookySkeleton</strong> - Loading states with sweep animation</li>
                    <li><strong>ShadowCrawl</strong> - Page transition overlay effect</li>
                </ul>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-display text-ghost-white mt-0 mb-8">Running the Demo</h2>

                <p className="mb-6">
                    To run the Potion Shop demo locally:
                </p>

                <div className="not-prose">
                    <CodeBlock 
                        code={`cd apps/demo
npm run dev`}
                        language="bash"
                    />
                </div>
            </section>
        </div>
    );
}
