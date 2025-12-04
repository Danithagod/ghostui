'use client';

import { motion } from 'framer-motion';
import { 
    MoonlightSwitch, 
    useTheme, 
    GooeyCard,
    CoffinCard,
} from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import { cn } from '@/lib/utils';
import { Ghost, Droplet, Palette, Moon, Sparkles, Layers, Code2, Zap } from 'lucide-react';

// Theme display helper component
function ThemeIndicator() {
    const { theme } = useTheme();
    return (
        <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono transition-all duration-500",
            theme === 'spectral' 
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                : "bg-red-500/20 text-red-300 border border-red-500/30"
        )}>
            {theme === 'spectral' ? <Ghost className="w-4 h-4" /> : <Droplet className="w-4 h-4" />}
            {theme}
        </div>
    );
}

// CSS Variable display component
function CSSVariableCard({ variable, spectralValue, bloodValue, description }: {
    variable: string;
    spectralValue: string;
    bloodValue: string;
    description: string;
}) {
    const { theme } = useTheme();
    const currentValue = theme === 'spectral' ? spectralValue : bloodValue;
    const isColor = currentValue.startsWith('#') || currentValue.startsWith('rgb');
    
    return (
        <motion.div 
            className={cn(
                "p-4 rounded-xl border transition-all duration-500",
                theme === 'spectral' 
                    ? "bg-purple-950/30 border-purple-500/20" 
                    : "bg-red-950/30 border-red-500/20"
            )}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-start gap-3">
                {isColor && (
                    <div 
                        className="w-10 h-10 rounded-lg border border-white/20 flex-shrink-0 transition-colors duration-500"
                        style={{ backgroundColor: currentValue }}
                    />
                )}
                <div className="flex-1 min-w-0">
                    <code className="text-sm font-mono text-ghost-white block truncate">{variable}</code>
                    <p className="text-xs text-ghost-white/50 mt-1">{description}</p>
                    <div className="flex gap-4 mt-2 text-xs font-mono">
                        <span className={cn(
                            "transition-opacity duration-300",
                            theme === 'spectral' ? "text-purple-400" : "text-ghost-white/30"
                        )}>
                            spectral: {spectralValue}
                        </span>
                        <span className={cn(
                            "transition-opacity duration-300",
                            theme === 'blood' ? "text-red-400" : "text-ghost-white/30"
                        )}>
                            blood: {bloodValue}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Theme-aware component showcase
function ThemeShowcase() {
    const { theme } = useTheme();
    
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border transition-all duration-700",
            theme === 'spectral'
                ? "bg-gradient-to-br from-purple-950/50 to-purple-900/30 border-purple-500/20"
                : "bg-gradient-to-br from-red-950/50 to-red-900/30 border-red-500/20"
        )}>
            <GooeyCard className="text-center">
                <h4 className="text-lg font-bold text-ghost-white mb-2">GooeyCard</h4>
                <p className="text-sm text-ghost-white/70">Liquid drip effect adapts to theme</p>
            </GooeyCard>
            
            <CoffinCard title="CoffinCard" className="h-full">
                <p>Hover glow and borders change with theme</p>
            </CoffinCard>
        </div>
    );
}

export default function ThemingPage() {
    const { theme } = useTheme();

    const themeProviderProps = [
        {
            name: 'children',
            type: 'React.ReactNode',
            required: true,
            description: 'The application content to wrap with theme context',
        },
        {
            name: 'defaultTheme',
            type: "'spectral' | 'blood'",
            default: "'spectral'",
            description: 'Initial theme on first load (before localStorage check)',
        },
        {
            name: 'storageKey',
            type: 'string',
            default: "'ghostui-theme'",
            description: 'LocalStorage key for persisting theme preference',
        },
    ];

    const useThemeReturn = [
        {
            name: 'theme',
            type: "'spectral' | 'blood'",
            description: 'Current active theme',
        },
        {
            name: 'setTheme',
            type: '(theme: Theme) => void',
            description: 'Set theme to a specific value',
        },
        {
            name: 'toggleTheme',
            type: '() => void',
            description: 'Toggle between spectral and blood themes',
        },
    ];

    const cssVariables = [
        { variable: '--ghost-bg', spectralValue: '#1a0b2e', bloodValue: '#1f0a0a', description: 'Primary background color' },
        { variable: '--ghost-bg-secondary', spectralValue: '#2e1065', bloodValue: '#450a0a', description: 'Secondary/elevated background' },
        { variable: '--ghost-text', spectralValue: '#e9d5ff', bloodValue: '#fecaca', description: 'Primary text color' },
        { variable: '--ghost-text-secondary', spectralValue: '#c4b5fd', bloodValue: '#fca5a5', description: 'Secondary/muted text' },
        { variable: '--ghost-border', spectralValue: '#FF6F00', bloodValue: '#991b1b', description: 'Border and divider color' },
        { variable: '--ghost-accent', spectralValue: '#FF6F00', bloodValue: '#ef4444', description: 'Accent color for highlights' },
        { variable: '--ghost-accent-rgb', spectralValue: '255, 111, 0', bloodValue: '239, 68, 68', description: 'RGB values for rgba() usage' },
    ];

    const themeAwareComponents = [
        'GooeyCard', 'GooeyDrawer', 'GooeySidebar', 'CoffinCard', 'SpectralTabs',
        'SpookySkeleton', 'SpookyTooltip', 'WhisperBox', 'WispTrail', 'GhostCursor',
        'SpiritInput', 'GraveModal', 'SpookyScrollbar', 'MoonlightSwitch'
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative">
                <div className="prose prose-invert max-w-none">
                    <h1 className="text-5xl font-display text-ghost-white flex items-center gap-4">
                        <Palette className="w-12 h-12" style={{ color: 'var(--ghost-accent)' }} />
                        Theming
                    </h1>
                    <p className="lead text-xl text-ghost-white/80">
                        GhostUI features a powerful dual-theme system with <span className="text-purple-400">Spectral</span> and <span className="text-red-400">Blood</span> themes. 
                        Every component automatically adapts to the current theme through React Context and CSS variables.
                    </p>
                </div>

                {/* Live Theme Demo */}
                <div className={cn(
                    "mt-8 p-8 rounded-2xl border-2 transition-all duration-700",
                    theme === 'spectral'
                        ? "bg-gradient-to-r from-purple-950/50 via-purple-900/30 to-purple-950/50 border-purple-500/30"
                        : "bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50 border-red-500/30"
                )}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-display text-ghost-white mb-2">Try it now!</h3>
                            <p className="text-ghost-white/60 text-sm">Toggle the switch to see the entire page transform</p>
                            <div className="mt-3">
                                <ThemeIndicator />
                            </div>
                        </div>
                        <MoonlightSwitch />
                    </div>
                </div>
            </div>

            {/* Theme Provider Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Layers className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">ThemeProvider</h2>
                </div>

                <p className="text-ghost-white/70 mb-6">
                    The <code className="text-ghost-accent">ThemeProvider</code> is the foundation of GhostUI's theming system. 
                    Wrap your application with it to enable theme switching across all components.
                </p>

                <ComponentPlayground
                    previewSize="sm"
                    preview={
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-ghost-white/70 text-sm">Your app is wrapped with ThemeProvider</p>
                            <ThemeIndicator />
                        </div>
                    }
                    code={`// app/layout.tsx or _app.tsx
import { ThemeProvider } from 'ghostui-react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="spectral">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
                    api={<PropsTable props={themeProviderProps} />}
                />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FeatureCard
                        icon={<Zap className="w-5 h-5" />}
                        title="SSR Safe"
                        description="Handles hydration correctly with no flash of wrong theme"
                    />
                    <FeatureCard
                        icon={<Moon className="w-5 h-5" />}
                        title="Persistent"
                        description="Saves preference to localStorage automatically"
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-5 h-5" />}
                        title="Cross-Tab Sync"
                        description="Theme changes sync across browser tabs instantly"
                    />
                </div>
            </section>

            {/* useTheme Hook Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Code2 className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">Theme Hooks</h2>
                </div>

                <p className="text-ghost-white/70 mb-6">
                    Access and control the theme from any component using the provided hooks.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className={cn(
                        "p-6 rounded-xl border",
                        theme === 'spectral' ? "bg-purple-950/30 border-purple-500/20" : "bg-red-950/30 border-red-500/20"
                    )}>
                        <h4 className="text-lg font-bold text-ghost-white mb-2 flex items-center gap-2">
                            <code className="text-sm font-mono" style={{ color: 'var(--ghost-accent)' }}>useTheme()</code>
                        </h4>
                        <p className="text-ghost-white/60 text-sm mb-4">
                            Required hook - throws error if used outside ThemeProvider. Use this in components that must have theme access.
                        </p>
                        <CodeBlock
                            code={`import { useTheme } from 'ghostui-react';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  );
}`}
                            language="tsx"
                        />
                    </div>

                    <div className={cn(
                        "p-6 rounded-xl border",
                        theme === 'spectral' ? "bg-purple-950/30 border-purple-500/20" : "bg-red-950/30 border-red-500/20"
                    )}>
                        <h4 className="text-lg font-bold text-ghost-white mb-2 flex items-center gap-2">
                            <code className="text-sm font-mono" style={{ color: 'var(--ghost-accent)' }}>useThemeOptional()</code>
                        </h4>
                        <p className="text-ghost-white/60 text-sm mb-4">
                            Optional hook - returns undefined if outside ThemeProvider. Perfect for library components that should work with or without theming.
                        </p>
                        <CodeBlock
                            code={`import { useThemeOptional } from 'ghostui-react';

function MyComponent() {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  
  // Works even without ThemeProvider!
  return <div data-theme={theme}>...</div>;
}`}
                            language="tsx"
                        />
                    </div>
                </div>

                <h4 className="text-xl font-display text-ghost-white mb-4">Return Values</h4>
                <PropsTable props={useThemeReturn} />
            </section>

            {/* MoonlightSwitch Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Moon className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">MoonlightSwitch</h2>
                </div>

                <p className="text-ghost-white/70 mb-6">
                    A beautiful, animated toggle switch designed specifically for theme switching. 
                    It can work in <strong>uncontrolled mode</strong> (automatically connected to ThemeProvider) 
                    or <strong>controlled mode</strong> (you manage the state).
                </p>

                <ComponentPlayground
                    previewSize="lg"
                    previewClassName={cn(
                        "transition-colors duration-700",
                        theme === 'spectral' ? "!bg-[#1a0b2e]" : "!bg-[#1f0a0a]"
                    )}
                    preview={
                        <div className="flex flex-col items-center gap-8">
                            <div className="text-center">
                                <h3 className={cn(
                                    "text-3xl font-display mb-2 transition-colors duration-500",
                                    theme === 'spectral' ? "text-purple-300" : "text-red-300"
                                )}>
                                    {theme === 'spectral' ? 'Spectral Realm' : 'Blood Realm'}
                                </h3>
                                <p className="text-ghost-white/50 text-sm">Uncontrolled mode - connected to ThemeProvider</p>
                            </div>
                            
                            <div className="flex items-center gap-8">
                                <span className={cn(
                                    "flex flex-col items-center gap-2 transition-all duration-300",
                                    theme === 'blood' ? "text-red-400 scale-110" : "text-ghost-white/30"
                                )}>
                                    <Droplet className="w-6 h-6" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Blood</span>
                                </span>
                                
                                <div className="scale-125">
                                    <MoonlightSwitch />
                                </div>
                                
                                <span className={cn(
                                    "flex flex-col items-center gap-2 transition-all duration-300",
                                    theme === 'spectral' ? "text-purple-400 scale-110" : "text-ghost-white/30"
                                )}>
                                    <Ghost className="w-6 h-6" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Spectral</span>
                                </span>
                            </div>
                        </div>
                    }
                    code={`// Uncontrolled mode - automatically syncs with ThemeProvider
import { MoonlightSwitch } from 'ghostui-react';

function ThemeToggle() {
  // No props needed! It connects to ThemeProvider automatically
  return <MoonlightSwitch />;
}

// Controlled mode - you manage the state
function ControlledToggle() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <MoonlightSwitch
      checked={isDark}
      onChange={setIsDark}
    />
  );
}`}
                />

                <h4 className="text-xl font-display text-ghost-white mt-8 mb-4">Variants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={cn(
                        "p-6 rounded-xl border text-center",
                        theme === 'spectral' ? "bg-purple-950/30 border-purple-500/20" : "bg-red-950/30 border-red-500/20"
                    )}>
                        <p className="text-ghost-white/70 text-sm mb-4">spectral-blood (default)</p>
                        <div className="flex justify-center">
                            <MoonlightSwitch variant="spectral-blood" />
                        </div>
                        <p className="text-xs text-ghost-white/40 mt-3 font-mono">variant="spectral-blood"</p>
                    </div>
                    
                    <div className={cn(
                        "p-6 rounded-xl border text-center",
                        theme === 'spectral' ? "bg-purple-950/30 border-purple-500/20" : "bg-red-950/30 border-red-500/20"
                    )}>
                        <p className="text-ghost-white/70 text-sm mb-4">day-night</p>
                        <div className="flex justify-center">
                            <MoonlightSwitch variant="day-night" />
                        </div>
                        <p className="text-xs text-ghost-white/40 mt-3 font-mono">variant="day-night"</p>
                    </div>
                </div>
            </section>

            {/* CSS Variables Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Palette className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">CSS Variables</h2>
                </div>

                <p className="text-ghost-white/70 mb-6">
                    When the theme changes, GhostUI automatically updates CSS custom properties on the <code>:root</code> element. 
                    Use these variables in your own components to stay in sync with the theme.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {cssVariables.map((v) => (
                        <CSSVariableCard key={v.variable} {...v} />
                    ))}
                </div>

                <h4 className="text-xl font-display text-ghost-white mb-4">Using CSS Variables</h4>
                <CodeBlock
                    code={`/* In your CSS or styled-components */
.my-custom-component {
  background-color: var(--ghost-bg);
  color: var(--ghost-text);
  border: 1px solid var(--ghost-border);
}

.my-glow-effect {
  box-shadow: 0 0 20px rgba(var(--ghost-accent-rgb), 0.4);
}

/* Tailwind with arbitrary values */
<div className="bg-[var(--ghost-bg)] text-[var(--ghost-text)]">
  Theme-aware content
</div>`}
                    language="css"
                />
            </section>

            {/* Theme-Aware Components Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Sparkles className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">Theme-Aware Components</h2>
                </div>

                <p className="text-ghost-white/70 mb-6">
                    All GhostUI components automatically adapt to the current theme. Toggle the theme above to see them transform!
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {themeAwareComponents.map((name) => (
                        <span 
                            key={name}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-sm font-mono transition-all duration-300",
                                theme === 'spectral' 
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                            )}
                        >
                            {name}
                        </span>
                    ))}
                </div>

                <ThemeShowcase />
            </section>

            {/* Creating Theme-Aware Components Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Code2 className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">Creating Theme-Aware Components</h2>
                </div>

                <p className="text-ghost-white/70 mb-6">
                    Follow this pattern to create your own components that respond to theme changes:
                </p>

                <CodeBlock
                    code={`import { useThemeOptional, type Theme } from 'ghostui-react';

// Define theme-specific styles
const themeColors = {
  spectral: {
    background: 'bg-purple-950/50',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  },
  blood: {
    background: 'bg-red-950/50',
    border: 'border-red-500/30',
    text: 'text-red-300',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
  },
} as const;

interface MyComponentProps {
  children: React.ReactNode;
  variant?: Theme; // Allow override via prop
}

export function MyComponent({ children, variant }: MyComponentProps) {
  // Get theme from context (works without ThemeProvider too!)
  const themeContext = useThemeOptional();
  const theme: Theme = variant ?? themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];

  return (
    <div className={\`\${colors.background} \${colors.border} \${colors.glow} 
                    rounded-xl border p-6 transition-all duration-500\`}>
      <p className={colors.text}>{children}</p>
    </div>
  );
}`}
                    language="tsx"
                />

                <div className="mt-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                    <p className="text-yellow-200 text-sm">
                        <strong>💡 Pro Tip:</strong> Use <code>useThemeOptional()</code> instead of <code>useTheme()</code> 
                        in reusable components. This allows them to work both inside and outside of a ThemeProvider, 
                        falling back to a default theme when no provider is present.
                    </p>
                </div>
            </section>

            {/* Advanced Usage Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)' }}>
                        <Zap className="w-6 h-6" style={{ color: 'var(--ghost-accent)' }} />
                    </div>
                    <h2 className="text-3xl font-display text-ghost-white">Advanced Usage</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className={cn(
                        "p-6 rounded-xl border",
                        theme === 'spectral' ? "bg-purple-950/30 border-purple-500/20" : "bg-red-950/30 border-red-500/20"
                    )}>
                        <h4 className="text-lg font-bold text-ghost-white mb-3">Custom Storage Key</h4>
                        <p className="text-ghost-white/60 text-sm mb-4">
                            Use a custom localStorage key to avoid conflicts with other apps:
                        </p>
                        <CodeBlock
                            code={`<ThemeProvider 
  defaultTheme="spectral"
  storageKey="my-app-theme"
>
  {children}
</ThemeProvider>`}
                            language="tsx"
                        />
                    </div>

                    <div className={cn(
                        "p-6 rounded-xl border",
                        theme === 'spectral' ? "bg-purple-950/30 border-purple-500/20" : "bg-red-950/30 border-red-500/20"
                    )}>
                        <h4 className="text-lg font-bold text-ghost-white mb-3">Programmatic Theme Control</h4>
                        <p className="text-ghost-white/60 text-sm mb-4">
                            Control the theme from anywhere in your app:
                        </p>
                        <CodeBlock
                            code={`function ThemeButtons() {
  const { setTheme, toggleTheme } = useTheme();
  
  return (
    <>
      <button onClick={() => setTheme('spectral')}>
        Spectral
      </button>
      <button onClick={() => setTheme('blood')}>
        Blood
      </button>
      <button onClick={toggleTheme}>
        Toggle
      </button>
    </>
  );
}`}
                            language="tsx"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

// Feature card component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    const { theme } = useTheme();
    
    return (
        <div className={cn(
            "p-4 rounded-xl border transition-all duration-500",
            theme === 'spectral' 
                ? "bg-purple-950/30 border-purple-500/20 hover:border-purple-500/40" 
                : "bg-red-950/30 border-red-500/20 hover:border-red-500/40"
        )}>
            <div className="flex items-center gap-3 mb-2">
                <div style={{ color: 'var(--ghost-accent)' }}>{icon}</div>
                <h4 className="font-bold text-ghost-white">{title}</h4>
            </div>
            <p className="text-ghost-white/60 text-sm">{description}</p>
        </div>
    );
}
