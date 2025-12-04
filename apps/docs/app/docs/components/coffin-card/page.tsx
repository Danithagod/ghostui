'use client';

import { CoffinCard } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function CoffinCardPage() {
 const props = [{
  name: 'children',
  type: 'React.ReactNode',
  default: undefined,
  description: 'Card content'
 }, {
  name: 'title',
  type: 'string',
  default: undefined,
  description: 'Optional title displayed at the top of the card with Creepster font'
 }, {
  name: 'index',
  type: 'number',
  default: '0',
  description: 'Animation delay index for staggered scroll animations'
 }, {
  name: 'className',
  type: 'string',
  default: undefined,
  description: 'Additional CSS classes'
 }, {
  name: 'animated',
  type: 'boolean',
  default: 'true',
  description: 'Enable scroll-based reveal animations'
 }, {
  name: 'intensity',
  type: "'subtle' | 'medium' | 'intense'",
  default: "'medium'",
  description: 'Animation intensity level'
 }, {
  name: 'showGlow',
  type: 'boolean',
  default: 'true',
  description: 'Show purple glow shadow effect on hover'
 }];
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">CoffinCard</h1>

 <p className="lead text-ghost-white/90">
 A hexagonal coffin-shaped card container for content display with scroll-based reveal animations and hover effects.
 </p>

 <ComponentPlayground previewSize="lg" preview={<div className="grid gap-8 md:grid-cols-3 w-full">
 <CoffinCard title="Ectoplasm" index={0} className="min-h-[320px]">
 <div className="p-8 border-ghost-orange/30 rounded-lg">
 <span className="text-purple-400 text-2xl">👻</span>
 </div>
 <p>Liquid physics buttons using SVG filters. Ectoplasm drips respond to interaction.</p>
 </CoffinCard>
 <CoffinCard title="Moon Phase" index={1} className="min-h-[320px]">
 <div className="p-8 border-ghost-orange/30 rounded-lg">
 <span className="text-yellow-400 text-2xl">🌙</span>
 </div>
 <p>Toggle between the living and the dead. Animated states that track the lunar cycle.</p>
 </CoffinCard>
 <CoffinCard title="Possessed" index={2} className="min-h-[320px]">
 <div className="p-8 border-ghost-orange/30 rounded-lg">
 <span className="text-red-400 text-2xl">💀</span>
 </div>
 <p>Inputs that validate with a poltergeist shake and summon smoke when focused.</p>
 </CoffinCard>
 </div>} code={`<CoffinCard title="Ectoplasm" index={0} className="min-h-[320px]">
 <div className="h-24 flex items-center justify-center border-b border-white/5 mb-4">
 <span className="text-purple-400 text-2xl">👻</span>
 </div>
 <p>Card content here</p>
 </CoffinCard>`} api={<PropsTable props={props} />} className="py-12 or p-8 or p-6 border-ghost-orange/30 rounded-lg" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Usage</h2>

 <p className="py-12 or p-8 or p-6 border-ghost-orange/30 rounded-lg">
 CoffinCard is perfect for displaying features, stats, blog post previews, or any content that needs emphasis.
 The hexagonal shape provides a unique, Halloween-themed aesthetic.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Hover Effects</h2>

 <p>
 CoffinCard features a 3D floating effect with purple glow shadows on hover.
 Control the animation intensity with the <code>intensity</code> prop:
 </p>

 <ComponentPlayground previewSize="md" preview={<div className="grid gap-8 md:grid-cols-3 w-full">
 <CoffinCard title="Subtle" intensity="subtle" className="min-h-[280px]">
 <p className="text-ghost-white/70 text-sm">
 Gentle glow effect with soft hover transitions
 </p>
 </CoffinCard>
 <CoffinCard title="Medium" intensity="medium" className="min-h-[280px]">
 <p className="text-ghost-white/70 text-sm">
 Balanced animation with moderate glow
 </p>
 </CoffinCard>
 <CoffinCard title="Intense" intensity="intense" className="min-h-[280px] text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 <p className="text-ghost-white/70 text-sm">
 Maximum spookiness with strong hover effects
 </p>
 </CoffinCard>
 </div>} code={`// Subtle animation
 <CoffinCard title="Subtle" intensity="subtle" className="min-h-[280px]">
 <p>Gentle glow effect</p>
 </CoffinCard>

 // Medium animation (default)
 <CoffinCard title="Medium" intensity="medium" className="min-h-[280px]">
 <p>Balanced animation</p>
 </CoffinCard>

 // Intense animation
 <CoffinCard title="Intense" intensity="intense" className="min-h-[280px]">
 <p>Maximum spookiness</p>
 </CoffinCard>

 // Disable glow
 <CoffinCard showGlow={false}>
 <p>No glow effect</p>
 </CoffinCard>`} className="text-2xl md:text-3xl text-ghost-orange tracking-wide font-display" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Theme-Reactive Colors</h2>

 <p>
 CoffinCard automatically adapts its hover colors based on the active theme.
 In <code>spectral</code> theme, the card uses purple accents. In <code>blood</code> theme, it switches to red accents.
 Use the MoonlightSwitch in the sidebar to toggle themes and see the effect.
 </p>

 <ComponentPlayground previewSize="md" preview={<div className="grid gap-8 md:grid-cols-2 w-full">
 <CoffinCard title="Theme Reactive" className="min-h-[280px]">
 <p className="text-ghost-white/70 text-sm">
 Border, glow, and title colors adapt to the current theme
 </p>
 </CoffinCard>
 <CoffinCard title="Automatic" className="min-h-[280px]">
 <p className="text-ghost-white/70 text-sm">
 No extra props needed — colors react to global theme
 </p>
 </CoffinCard>
 </div>} code={`// CoffinCard automatically uses theme colors from the global ThemeProvider
 <CoffinCard title="Theme Reactive">
 <p>Border, glow, and title colors adapt to the current theme</p>
 </CoffinCard>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <ul>
 <li>Semantic HTML structure</li>
 <li>Keyboard navigable when interactive</li>
 <li>Smooth animations with reduced motion support</li>
 <li>High contrast borders for visibility</li>
 </ul>
 </div>;
}