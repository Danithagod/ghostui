'use client';

import { useState, useEffect } from 'react';
import { SpookySkeleton, SkeletonBlock, useTheme } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { Ghost, Scan, Zap, CloudFog } from 'lucide-react';
type AnimationVariant = 'sweep' | 'scan' | 'flicker' | 'fog';
export default function SpookySkeletonPage() {
 const [activeVariant, setActiveVariant] = useState<AnimationVariant>('sweep');
 const [mounted, setMounted] = useState(false);
 const {
  theme
 } = useTheme();

 useEffect(() => {
  setMounted(true);
 }, []);
 const variants = [{
  id: 'sweep' as const,
  label: 'Spirit Sweep',
  icon: <Ghost size={16} />
 }, {
  id: 'scan' as const,
  label: 'Ghost Scan',
  icon: <Scan size={16} />
 }, {
  id: 'flicker' as const,
  label: 'Ecto Flicker',
  icon: <Zap size={16} />
 }, {
  id: 'fog' as const,
  label: 'Fog Pulse',
  icon: <CloudFog size={16} />
 }];
 const props = [{
  name: 'variant',
  type: "'sweep' | 'scan' | 'flicker' | 'fog'",
  default: '-',
  description: 'Animation style: sweep (gradient shimmer), scan (radar line), flicker (unstable opacity), fog (rolling mist).'
 }, {
  name: 'children',
  type: 'ReactNode',
  default: '-',
  description: 'Pass your actual component layout here. SpookySkeleton will auto-generate a matching skeleton.'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes for the container.'
 }];
 const skeletonBlockProps = [{
  name: 'variant',
  type: "'sweep' | 'scan' | 'flicker' | 'fog'",
  default: '-',
  description: 'Animation style to apply.'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Size and shape classes (e.g., h-4 w-full rounded-lg).'
 }];


 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">SpookySkeleton</h1>

 <p className="lead">
 A smart skeleton loader that mirrors your actual component layout. Pass your component as children
 and watch it transform into a spooky loading state. Theme-aware with four haunting animation variants.
 </p>

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Basic Usage
 </h2>

 <p className="text-ghost-white/80 leading-relaxed">
 Wrap your component layout with SpookySkeleton and it will automatically generate a matching skeleton. The skeleton mirrors your component's structure, so you don't need to manually build skeleton layouts.
 </p>

 <ComponentPlayground preview={<div className="flex justify-center py-8 w-full">
 {mounted && <SpookySkeleton variant="sweep" className="w-full max-w-md">
 <div className="space-y-6">
 {/* Header section */}
 <div className="flex gap-4 items-start">
 <img className="w-16 h-16 rounded-full" alt="" />
 <div className="flex-1 space-y-3">
 <h3 className="text-xl font-semibold text-ghost-white">Title goes here</h3>
 <p className="h-4 w-full">Description text that spans the full width</p>
 <p className="h-4 w-5/6">Secondary description line</p>
 </div>
 </div>
 {/* Content section */}
 <div className="p-6 rounded-lg border border-ghost-border space-y-3">
 <p className="h-4 w-full">Content line one with full width</p>
 <p className="h-4 w-11/12">Content line two slightly shorter</p>
 <p className="h-4 w-4/5">Content line three even shorter</p>
 </div>
 {/* Action section */}
 <div className="flex gap-3 pt-2">
 <button className="h-10 w-24 rounded-lg">Button</button>
 <button className="h-10 w-24 rounded-lg">Button</button>
 </div>
 </div>
 </SpookySkeleton>}
 </div>} code={`import { SpookySkeleton } from 'ghostui-react';

 // Your actual component layout
 const ContentCard = () => (
  <div className="space-y-6">
  {/* Header section */}
  <div className="flex gap-4 items-start">
  <img className="w-16 h-16 rounded-full" />
  <div className="flex-1 space-y-2">
  <h3>Title goes here</h3>
  <p>Description text</p>
  <p>Secondary description</p>
  </div>
  </div>
  {/* Content section */}
  <div className="space-y-3 pt-2 border-t">
  <p>Content line one</p>
  <p>Content line two</p>
  <p>Content line three</p>
  </div>
  {/* Action section */}
  <div className="flex gap-3 pt-2">
  <button>Action</button>
  <button>Cancel</button>
  </div>
  </div>
 );

 // Wrap it - skeleton auto-matches the layout!
 <SpookySkeleton variant="sweep">
 <ContentCard />
 </SpookySkeleton>`} api={<PropsTable props={props} />} />
 </section>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Animation Variants</h2>

 <p>
 Four supernatural styles to match your vibe. Currently viewing: <span className="text-ghost-accent font-semibold">{theme}</span> theme.
 </p>

 <ComponentPlayground preview={<div className="w-full space-y-6">
 <div className="flex flex-wrap gap-3 justify-center">
 {variants.map(v => <button key={v.id} onClick={() => setActiveVariant(v.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all" style={activeVariant === v.id ? {
  backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
  borderColor: 'var(--ghost-accent)',
  color: 'var(--ghost-white)'
 } : {
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderColor: 'rgba(var(--ghost-accent-rgb), 0.2)',
  color: 'rgba(255, 255, 255, 0.7)'
 }}>
 {v.icon}
 <span className="text-sm font-medium">{v.label}</span>
 </button>)}
 </div>
 <div className="flex justify-center">
 {mounted && <SpookySkeleton variant={activeVariant} className="w-full max-w-sm">
 <div className="space-y-5">
 <div className="flex gap-4 items-start">
 <img className="w-20 h-20 rounded-full" alt="" />
 <div className="flex-1 space-y-3">
 <h3 className="text-xl font-semibold text-ghost-white">Title goes here</h3>
 <p className="h-4 w-full">Description text that spans the full width</p>
 <p className="h-4 w-5/6">Secondary description line</p>
 </div>
 </div>
 <div className="space-y-3 pt-2">
 <p className="h-4 w-full">Additional content line one</p>
 <p className="h-4 w-11/12">Additional content line two</p>
 <p className="h-4 w-4/5">Additional content line three</p>
 <p className="h-4 w-2/3">Final content line</p>
 </div>
 </div>
 </SpookySkeleton>}
 </div>
 </div>} code={`import { SpookySkeleton } from 'ghostui-react';

 // Choose your animation variant
 <SpookySkeleton variant="${activeVariant}">
 <YourComponent />
 </SpookySkeleton>

 // Available variants:
 // - "sweep"   → Spirit Sweep (gradient shimmer)
 // - "scan"    → Ghost Scan (radar line)
 // - "flicker" → Ecto Flicker (unstable opacity)
 // - "fog"     → Fog Pulse (rolling mist)`} />

 <ul className="mb-20 pb-4">
 <li><strong>sweep</strong> - Spirit Sweep with gradient shimmer effect</li>
 <li><strong>scan</strong> - Ghost Scan with radar line animation</li>
 <li><strong>flicker</strong> - Ecto Flicker with unstable opacity</li>
 <li><strong>fog</strong> - Fog Pulse with rolling mist effect</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Layout Mirroring</h2>

 <p>
 The magic: pass your real component structure and SpookySkeleton analyzes it to create
 a matching skeleton. No more manually building skeleton layouts!
 </p>

 <ComponentPlayground preview={<div className="flex justify-center py-6 w-full">
 {mounted && <SpookySkeleton variant="scan" className="w-full max-w-md">
 <div className="space-y-5">
 <div className="flex items-start gap-4">
 <img className="w-12 h-12 rounded-full" alt="" />
 <div className="flex-1 space-y-3">
 <h4 className="h-5 w-32">Username</h4>
 <span className="h-3 w-20">@handle</span>
 </div>
 </div>
 <div className="space-y-3">
 <p className="h-4 w-full">Tweet content goes here...</p>
 <p className="h-4 w-5/6">More tweet content continues</p>
 </div>
 <div className="flex gap-8 pt-2">
 <span className="h-4 w-14">💬 42</span>
 <span className="h-4 w-14">❤️ 128</span>
 <span className="h-4 w-14">🔄 24</span>
 </div>
 </div>
 </SpookySkeleton>}
 </div>} code={`<SpookySkeleton variant="scan">
 <div className="space-y-5">
 <div className="flex items-start gap-4">
 <img className="w-12 h-12 rounded-full" />
 <div className="flex-1 space-y-2">
 <h4>Username</h4>
 <span>@handle</span>
 </div>
 </div>
 <div className="space-y-2">
 <p>Tweet content...</p>
 <p>More content...</p>
 </div>
 <div className="flex gap-8 pt-2">
 <span>💬 42</span>
 <span>❤️ 128</span>
 <span>🔄 24</span>
 </div>
 </div>
 </SpookySkeleton>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">SkeletonBlock</h2>

 <p>
 Need full control? Use SkeletonBlock to build custom skeletons from scratch.
 </p>

 <ComponentPlayground preview={<div className="flex justify-center py-6 w-full">
 <div className="w-full max-w-md">
 <div className="space-y-4 p-6">
 <SkeletonBlock variant="flicker" className="h-32 w-full rounded-lg" />
 <SkeletonBlock variant="flicker" className="h-5 w-2/3" />
 <SkeletonBlock variant="flicker" className="h-4 w-full" />
 <SkeletonBlock variant="flicker" className="h-4 w-4/5" />
 </div>
 </div>
 </div>} code={`import { SkeletonBlock } from 'ghostui-react';

 <div className="space-y-3 p-6 rounded-2xl">
 <SkeletonBlock variant="flicker" className="h-32 w-full rounded-lg" />
 <SkeletonBlock variant="flicker" className="h-5 w-2/3" />
 <SkeletonBlock variant="flicker" className="h-4 w-full" />
 <SkeletonBlock variant="flicker" className="h-4 w-4/5" />
 </div>`} api={<PropsTable props={skeletonBlockProps} />} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Theme-Aware</h2>

 <p>
 SpookySkeleton automatically adapts to your ThemeProvider. Toggle the theme in the sidebar
 to see the skeleton colors shift between <span className="text-purple-400">spectral</span> (purple/green)
 and <span className="text-red-400">blood</span> (red/orange) palettes.
 </p>

 <ComponentPlayground preview={<div className="flex justify-center py-6 w-full">
 <div className="w-full max-w-md">
 <p className="text-ghost-white/60 text-sm mb-4">
 Current theme: <code className="text-ghost-accent">{theme}</code>
 </p>
 <div className="grid grid-cols-2 gap-4">
 {mounted && <>
 <SpookySkeleton variant="sweep" className="w-full">
 <div className="flex gap-3">
 <img className="w-8 h-8 rounded-full" alt="" />
 <div className="flex-1 space-y-3">
 <p className="h-3 w-full">Line 1</p>
 <p className="h-3 w-3/4">Line 2</p>
 </div>
 </div>
 </SpookySkeleton>
 <SpookySkeleton variant="fog" className="w-full">
 <div className="flex gap-3">
 <img className="w-8 h-8 rounded-full" alt="" />
 <div className="flex-1 space-y-3">
 <p className="h-3 w-full">Line 1</p>
 <p className="h-3 w-3/4">Line 2</p>
 </div>
 </div>
 </SpookySkeleton>
 </>}
 </div>
 </div>
 </div>} code={`import { SpookySkeleton, useTheme } from 'ghostui-react';

 const { theme } = useTheme();

 // Skeletons automatically adapt to the current theme
 <div>
 <p>Current theme: {theme}</p>
 <SpookySkeleton variant="sweep">
 <YourComponent />
 </SpookySkeleton>
 </div>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p>
 SpookySkeleton includes <code>role="status"</code> and <code>aria-label="Loading content"</code> by default.
 Animations respect <code>prefers-reduced-motion</code> — they'll pause automatically for users who prefer less motion.
 </p>
 </div>;
}
