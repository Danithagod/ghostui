'use client';

import { GooeyCard } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function GooeyCardPage() {
 const props = [{
  name: 'children',
  type: 'React.ReactNode',
  default: '-',
  description: 'Content to display within the card (required)'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes to apply to the content container'
 }, {
  name: 'gooColor',
  type: 'string',
  default: '-',
  description: 'Tailwind color class for liquid elements. Overrides theme colors when provided.'
 }, {
  name: 'variant',
  type: "'spectral' | 'blood'",
  default: '-',
  description: 'Theme variant - defaults to ThemeProvider context or "spectral"'
 }];
 const basicUsageCode = `import { GooeyCard } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <GooeyCard>
   <h2 className="text-2xl font-bold text-white">Quest Complete!</h2>
   <p className="text-white/80 mt-2">You've mastered the liquid drip effect</p>
   </GooeyCard>
  );
 }`;
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">GooeyCard</h1>

 <p className="lead">
 A visually striking card component featuring animated liquid drip effects with SVG-based specular lighting highlights, creating a melting appearance. Automatically adapts to your theme.
 </p>

 {/* Hero Section - Quest Complete Demo */}
 <ComponentPlayground preview={<GooeyCard>
 <div className="text-center space-y-3">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Quest Complete!</h2>
 <p className="text-white/80">You've discovered the liquid drip effect</p>
 <div className="flex gap-2 justify-center mt-4">
 <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90">+500 XP</span>
 <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90">Achievement Unlocked</span>
 </div>
 </div>
 </GooeyCard>} code={basicUsageCode} api={<PropsTable props={props} />} previewClassName="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">How It Works</h2>

 <p className="mb-6 text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 The GooeyCard uses a sophisticated SVG filter pipeline to create realistic liquid effects:
 </p>

 <ul className="text-ghost-white/70 space-y-2">
 <li><strong className="text-ghost-purple">Gaussian Blur</strong> - Creates the initial goo effect by blurring the liquid elements</li>
 <li><strong className="text-ghost-purple">Color Matrix</strong> - Increases contrast to create sharp liquid edges</li>
 <li><strong className="text-ghost-purple">Specular Lighting</strong> - Adds realistic highlights and glare effects to simulate light reflecting off liquid surfaces</li>
 <li><strong className="text-ghost-purple">Layer Separation</strong> - Content remains sharp and unfiltered while the liquid layer gets the full effect</li>
 </ul>

 <p>
 Five animated drips are positioned on the right side of the card, each with unique timing and height variations to create a natural melting appearance. Static pool elements at the bottom connect the drips to complete the liquid effect.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Theme-Aware</h2>

 <p className="mb-6">
 GooeyCard automatically adapts to your ThemeProvider. Toggle the theme in the sidebar to see the liquid color change between <span className="text-purple-400">spectral</span> (purple) and <span className="text-red-400">blood</span> (red) themes:
 </p>

 <ComponentPlayground preview={<GooeyCard>
 <div className="space-y-2">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Theme-Aware Card</h3>
 <p className="text-white/70 text-sm">
 This card automatically changes color based on the active theme. Try toggling the theme switch in the sidebar!
 </p>
 </div>
 </GooeyCard>} code={`import { GooeyCard } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <GooeyCard>
   <h3 className="text-xl font-semibold text-white">Theme-Aware Card</h3>
   <p className="text-white/70 text-sm">
   This card automatically changes color based on the active theme.
   </p>
   </GooeyCard>
  );
 }`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>

 <p className="mb-6">
 The simplest way to use GooeyCard is to wrap your content with it. The component will automatically use the theme from your ThemeProvider:
 </p>

 <ComponentPlayground preview={<GooeyCard>
 <div className="space-y-2">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Basic Card</h3>
 <p className="text-white/70 text-sm">
 This card uses the default purple liquid color.
 </p>
 </div>
 </GooeyCard>} code={basicUsageCode} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Manual Theme Override</h2>

 <p className="mb-6">
 You can override the theme context by using the <code className="text-ghost-purple">variant</code> prop to force a specific theme:
 </p>

 <ComponentPlayground preview={<div className="grid gap-6 md:grid-cols-2">
 <GooeyCard variant="spectral">
 <div className="space-y-2">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Spectral Theme</h3>
 <p className="text-white/70 text-xs">Always purple, regardless of global theme</p>
 </div>
 </GooeyCard>
 <GooeyCard variant="blood">
 <div className="space-y-2">
 <h3 className="text-lg text-xl md:text-2xl font-semibold text-ghost-white">Blood Theme</h3>
 <p className="text-white/70 text-xs">Always red, regardless of global theme</p>
 </div>
 </GooeyCard>
 </div>} code={`<GooeyCard variant="spectral">
 <h3 className="text-lg font-semibold text-white">Spectral Theme</h3>
 <p className="text-white/70 text-xs">Always purple</p>
 </GooeyCard>

 <GooeyCard variant="blood">
 <h3 className="text-lg font-semibold text-white">Blood Theme</h3>
 <p className="text-white/70 text-xs">Always red</p>
 </GooeyCard>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Custom Colors</h2>

 <p>
 For complete control, use the <code className="text-ghost-purple">gooColor</code> prop with any Tailwind background color class. This overrides both theme and variant:
 </p>

 <ComponentPlayground preview={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 <GooeyCard gooColor="bg-emerald-600" className="text-xl md:text-2xl font-semibold text-ghost-white">
 <div className="space-y-2">
 <div className="text-2xl">🌿</div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Emerald</h3>
 <p className="text-white/70 text-xs">bg-emerald-600</p>
 </div>
 </GooeyCard>
 <GooeyCard gooColor="bg-rose-600">
 <div className="space-y-2">
 <div className="text-2xl">🌹</div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Rose</h3>
 <p className="text-white/70 text-xs">bg-rose-600</p>
 </div>
 </GooeyCard>
 <GooeyCard gooColor="bg-amber-600">
 <div className="space-y-2">
 <div className="text-2xl">🔥</div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Amber</h3>
 <p className="text-white/70 text-xs">bg-amber-600</p>
 </div>
 </GooeyCard>
 </div>} code={`<GooeyCard gooColor="bg-emerald-600">
 <div className="space-y-2">
 <div className="text-2xl">🌿</div>
 <h3 className="text-lg font-semibold text-white">Emerald</h3>
 <p className="text-white/70 text-xs">bg-emerald-600</p>
 </div>
 </GooeyCard>

 <GooeyCard gooColor="bg-rose-600">
 <div className="space-y-2">
 <div className="text-2xl">🌹</div>
 <h3 className="text-lg font-semibold text-white">Rose</h3>
 <p className="text-white/70 text-xs">bg-rose-600</p>
 </div>
 </GooeyCard>

 <GooeyCard gooColor="bg-amber-600">
 <div className="space-y-2">
 <div className="text-2xl">🔥</div>
 <h3 className="text-lg font-semibold text-white">Amber</h3>
 <p className="text-white/70 text-xs">bg-amber-600</p>
 </div>
 </GooeyCard>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Content Layouts</h2>

 <p>
 The GooeyCard works with any content layout. Use the <code className="text-ghost-purple">className</code> prop to customize the content container styling:
 </p>

 <ComponentPlayground preview={<div className="grid gap-6 md:grid-cols-2">
 <GooeyCard className="text-center">
 <div className="space-y-3">
 <div className="text-4xl">🎃</div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Centered Layout</h3>
 <p className="text-white/70 text-sm">
 Perfect for icons and badges
 </p>
 </div>
 </GooeyCard>
 <GooeyCard className="flex items-center gap-4">
 <div className="text-5xl">👻</div>
 <div className="flex-1">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Horizontal Layout</h3>
 <p className="text-white/70 text-sm">
 Great for list items
 </p>
 </div>
 </GooeyCard>
 </div>} code={`// Centered layout
 <GooeyCard className="text-center">
 <div className="space-y-3">
 <div className="text-4xl">🎃</div>
 <h3 className="text-xl font-semibold text-white">Centered Layout</h3>
 <p className="text-white/70 text-sm">Perfect for icons and badges</p>
 </div>
 </GooeyCard>

 // Horizontal layout
 <GooeyCard className="flex items-center gap-4">
 <div className="text-5xl">👻</div>
 <div className="flex-1">
 <h3 className="text-xl font-semibold text-white">Horizontal Layout</h3>
 <p className="text-white/70 text-sm">Great for list items</p>
 </div>
 </GooeyCard>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Multiple Cards</h2>

 <p>
 You can use multiple GooeyCards on the same page. Each card shares the same SVG filter definition for optimal performance. Perfect for stat displays, feature grids, or card collections:
 </p>

 <ComponentPlayground preview={<div className="grid gap-6 md:grid-cols-3">
 <GooeyCard gooColor="bg-violet-600">
 <div className="text-center space-y-2">
 <div className="text-3xl">⚡</div>
 <h4 className="text-lg font-semibold text-white">Power</h4>
 <p className="text-white/60 text-xs">+25 Strength</p>
 </div>
 </GooeyCard>
 <GooeyCard gooColor="bg-cyan-600">
 <div className="text-center space-y-2">
 <div className="text-3xl">🔮</div>
 <h4 className="text-lg font-semibold text-white">Magic</h4>
 <p className="text-white/60 text-xs">+30 Intelligence</p>
 </div>
 </GooeyCard>
 <GooeyCard gooColor="bg-amber-600">
 <div className="text-center space-y-2">
 <div className="text-3xl">🛡️</div>
 <h4 className="text-lg font-semibold text-white">Defense</h4>
 <p className="text-white/60 text-xs">+20 Armor</p>
 </div>
 </GooeyCard>
 </div>} code={`<div className="grid gap-6 md:grid-cols-3">
 <GooeyCard gooColor="bg-violet-600">
 <div className="text-center space-y-2">
 <div className="text-3xl">⚡</div>
 <h4 className="text-lg font-semibold text-white">Power</h4>
 <p className="text-white/60 text-xs">+25 Strength</p>
 </div>
 </GooeyCard>

 <GooeyCard gooColor="bg-cyan-600">
 <div className="text-center space-y-2">
 <div className="text-3xl">🔮</div>
 <h4 className="text-lg font-semibold text-white">Magic</h4>
 <p className="text-white/60 text-xs">+30 Intelligence</p>
 </div>
 </GooeyCard>

 <GooeyCard gooColor="bg-amber-600">
 <div className="text-center space-y-2">
 <div className="text-3xl">🛡️</div>
 <h4 className="text-lg font-semibold text-white">Defense</h4>
 <p className="text-white/60 text-xs">+20 Armor</p>
 </div>
 </GooeyCard>
 </div>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p>
 GooeyCard follows accessibility best practices:
 </p>

 <ul className="text-ghost-white/70 space-y-2">
 <li>Supports reduced motion preferences (disables drip animations when <code className="text-ghost-purple">prefers-reduced-motion</code> is enabled)</li>
 <li>Content remains fully readable with proper contrast ratios</li>
 <li>SVG filters are hidden from screen readers with <code className="text-ghost-purple">aria-hidden</code></li>
 <li>Semantic HTML structure for better screen reader navigation</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Performance</h2>

 <p className="mb-6">
 The GooeyCard is optimized for performance:
 </p>

 <ul className="text-ghost-white/70 space-y-2">
 <li><strong className="text-ghost-purple">Shared SVG Filter</strong> - All cards on a page share the same filter definition, reducing DOM overhead</li>
 <li><strong className="text-ghost-purple">GPU Acceleration</strong> - Animations use CSS transforms for smooth 60fps performance</li>
 <li><strong className="text-ghost-purple">Layer Separation</strong> - Only the liquid layer is filtered, keeping content rendering fast</li>
 <li><strong className="text-ghost-purple">Framer Motion</strong> - Powered by production-ready animation library with automatic optimization</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Props</h2>

 <div className="mb-6">
 <PropsTable props={props} />
 </div>
 </div>;
}