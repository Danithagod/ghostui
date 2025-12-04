import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function GettingStartedPage() {
    return (
        <div className="prose prose-invert max-w-none">
            <h1 className="text-5xl font-display text-ghost-white">Getting Started</h1>

            <p className="lead">
                Install GhostUI and start building atmospheric, Halloween-themed React applications.
            </p>

            <h2 className="text-3xl font-display text-ghost-white mt-12">Installation</h2>

            <p>
                Install the GhostUI React package using npm, yarn, or pnpm:
            </p>

            <CodeBlock
                language="bash"
                code="npm install ghostui-react"
            />

            <h2 className="text-3xl font-display text-ghost-white mt-12">Tailwind CSS Configuration</h2>

            <p>
                GhostUI includes a Tailwind CSS preset that provides the ghostly color palette and custom utilities.
                Add it to your <code>tailwind.config.js</code>:
            </p>

            <CodeBlock
                language="javascript"
                code={`import { ghostuiPreset } from'ghostui-react/tailwind-preset';

export default {
  presets: [ghostuiPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};`}
            />

            <h2 className="text-3xl font-display text-ghost-white mt-12">Import Styles</h2>

            <p>
                Import the GhostUI styles in your root layout or main CSS file:
            </p>

            <CodeBlock
                language="typescript"
                code={`import 'ghostui-react/dist/ghostui-react.css';`}
            />

            <h2 className="text-3xl font-display text-ghost-white mt-12">Basic Usage</h2>

            <p>
                Import and use GhostUI components in your React application:
            </p>

            <CodeBlock
                language="tsx"
                code={`import { GooeyButton, CoffinCard } from 'ghostui-react';

export default function MyApp() {
  return (
    <div>
      <GooeyButton variant="slime" onClick={() => console.log('Spooked!')}>
        Click Me
      </GooeyButton>
      
      <CoffinCard>
        <p>Your spectral content here</p>
      </CoffinCard>
    </div>
  );
}`}
            />

            <h2 className="text-3xl font-display text-ghost-white mt-12">Next Steps</h2>

            <div className="not-prose grid gap-4 mt-6">
                <Link
                    href="/docs/components/gooey-button"
                    className="flex items-center gap-2 rounded-lg border border-ghost-gray bg-ghost-dark/50 p-4 transition-colors hover:border-ghost-purple hover:bg-ghost-purple/10"
                >
                    <div className="flex-1">
                        <div className="font-medium text-ghost-white">Explore Components</div>
                        <div className="text-sm text-ghost-white/60">Browse the full component library</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-ghost-purple" />
                </Link>

                <Link
                    href="/docs/theming"
                    className="flex items-center gap-2 rounded-lg border border-ghost-gray bg-ghost-dark/50 p-4 transition-colors hover:border-ghost-green hover:bg-ghost-green/10"
                >
                    <div className="flex-1">
                        <div className="font-medium text-ghost-white">Customize Theme</div>
                        <div className="text-sm text-ghost-white/60">Learn about theming and customization</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-ghost-green" />
                </Link>
            </div>
        </div>
    );
}
