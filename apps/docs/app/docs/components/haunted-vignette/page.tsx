'use client';

import { useState } from 'react';
import { HauntedVignette, HauntedCard } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function HauntedVignettePage() {
 const [demoEnabled, setDemoEnabled] = useState(true);
 const vignettePropsData = [{
  name: 'radius',
  type: 'number',
  required: false,
  default: '350',
  description: 'Size of the flashlight circle in pixels. Controls how large the visible area around the cursor is.'
 }, {
  name: 'darkness',
  type: 'number',
  required: false,
  default: '0.9',
  description: 'Darkness of the overlay (0-1). Higher values create a darker vignette effect.'
 }, {
  name: 'blur',
  type: 'number',
  required: false,
  default: '2',
  description: 'Backdrop blur amount in pixels. Adds a subtle blur to content outside the flashlight.'
 }, {
  name: 'enabled',
  type: 'boolean',
  required: false,
  default: 'true',
  description: 'Whether the vignette effect is enabled. Set to false to disable the overlay.'
 }, {
  name: 'springDamping',
  type: 'number',
  required: false,
  default: '25',
  description: 'Spring damping for cursor following animation. Higher values create smoother, slower movement.'
 }, {
  name: 'springStiffness',
  type: 'number',
  required: false,
  default: '150',
  description: 'Spring stiffness for cursor following animation. Higher values create snappier movement.'
 }, {
  name: 'className',
  type: 'string',
  required: false,
  default: undefined,
  description: 'Additional CSS classes to apply to the vignette overlay.'
 }];
 const cardPropsData = [{
  name: 'children',
  type: 'React.ReactNode',
  required: true,
  default: undefined,
  description: 'Content to wrap with the ghost effect. Can be any React element.'
 }, {
  name: 'className',
  type: 'string',
  required: false,
  default: undefined,
  description: 'Additional CSS classes for the wrapper container.'
 }, {
  name: 'peekDelay',
  type: 'number',
  required: false,
  default: '250',
  description: 'Delay in milliseconds before the ghost appears on hover. Longer delays build more suspense.'
 }, {
  name: 'ghostEnabled',
  type: 'boolean',
  required: false,
  default: 'true',
  description: 'Whether the peek-a-boo ghost effect is enabled.'
 }, {
  name: 'ghostSize',
  type: 'number',
  required: false,
  default: '112',
  description: 'Size of the ghost in pixels.'
 }, {
  name: 'showBoo',
  type: 'boolean',
  required: false,
  default: 'true',
  description: 'Whether to show the "BOO!" text animation when the ghost appears.'
 }, {
  name: 'contentClassName',
  type: 'string',
  required: false,
  default: undefined,
  description: 'Custom classes for the content wrapper layer (z-20).'
 }];
 return <div className="space-y-12">
 {/* Global Demo Toggle Button */}
 <div className="fixed top-20 right-8 z-[100]">
 <button onClick={() => setDemoEnabled(!demoEnabled)} className={`px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest transition-colors border ${demoEnabled ? 'bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-red-300' : 'bg-green-500/20 hover:bg-green-500/30 border-green-500/40 text-green-300'}`}>
 {demoEnabled ? '🔴 Disable Demo Overlay' : '🟢 Enable Demo Overlay'}
 </button>
 </div>

 {/* Header Section */}
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
 HauntedVignette
 </h1>
 <p className="lead text-ghost-white/90">
 A dynamic cursor-following flashlight effect with peek-a-boo ghosts. The
 HauntedVignette creates an immersive &quot;exploring in the dark&quot; experience,
 while HauntedCard wraps any content to add spooky ghost appearances on hover.
 </p>
 {!demoEnabled && <div className="p-8 border-ghost-orange/30">
 <p className="text-yellow-500 text-sm">
 ⚠️ Demo overlay is disabled. Click the button in the top-right to
 re-enable.
 </p>
 </div>}
 <div className="bg-ghost-orange/10 border border-ghost-orange/30 rounded-lg p-6">
 <h4 className="text-lg font-semibold text-ghost-white mb-2">Key Features</h4>
 <ul className="space-y-2 text-ghost-white/80 text-sm">
 <li>• Cursor-following flashlight overlay with smooth spring animations</li>
 <li>• Peek-a-boo ghosts that appear from random edges on hover</li>
 <li>• Wrap any content with HauntedCard for ghost effects</li>
 <li>• Configurable timing, size, and animation parameters</li>
 </ul>
 </div>
 </div>

 {/* Basic Usage - HauntedCard */}
 <ComponentPlayground preview={<div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
 <HauntedCard>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">The Attic</h3>
 <p className="text-ghost-white/70 text-sm">
 Dust motes dance in the sliver of moonlight.
 </p>
 </div>
 </HauntedCard>
 <HauntedCard>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Cellar Door</h3>
 <p className="text-ghost-white/70 text-sm">
 Locked from the inside. Scratch marks everywhere.
 </p>
 </div>
 </HauntedCard>
 <HauntedCard>
 <div className="rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Dusty Mirror</h3>
 <p className="text-ghost-white/70 text-sm">
 Your reflection lags behind your movements.
 </p>
 </div>
 </HauntedCard>
 </div>} code={`import { HauntedCard } from 'ghostui-react';

 export default function GhostCards() {
  return (
   <div className="grid grid-cols-3 gap-12">
   <HauntedCard>
   <div className="bg-ghost-dark border border-ghost-orange/20 p-6 rounded-xl">
   <h3 className="text-xl font-bold text-ghost-white">The Attic</h3>
   <p className="text-ghost-white/70 text-sm">
   Dust motes dance in the sliver of moonlight.
   </p>
   </div>
   </HauntedCard>

   <HauntedCard>
   <div className="bg-ghost-dark border border-ghost-orange/20 p-6 rounded-xl">
   <h3 className="text-xl font-bold text-ghost-white">Cellar Door</h3>
   <p className="text-ghost-white/70 text-sm">
   Locked from the inside. Scratch marks everywhere.
   </p>
   </div>
   </HauntedCard>

   <HauntedCard>
   <div className="bg-ghost-dark border border-ghost-orange/20 p-6 rounded-xl">
   <h3 className="text-xl font-bold text-ghost-white">Dusty Mirror</h3>
   <p className="text-ghost-white/70 text-sm">
   Your reflection lags behind your movements.
   </p>
   </div>
   </HauntedCard>
   </div>
  );
 }`} api={<PropsTable props={cardPropsData} className="text-xl md:text-2xl font-semibold text-ghost-white" />} className="md:text-2xl font-semibold rounded-lg text-xl text-ghost-white" />


 {/* Flashlight Overlay */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Flashlight Overlay
 </h2>
 <p className="text-ghost-white/80 leading-relaxed">
 The HauntedVignette component creates a dark overlay with a cursor-following
 flashlight effect. Use it as a full-page overlay to create an immersive
 exploration experience.
 </p>

 <ComponentPlayground previewSize="lg" preview={<div className="relative w-full h-full min-h-[400px]">
 {demoEnabled && <HauntedVignette radius={300} darkness={0.85} />}
 <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-8">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Move Your Cursor</h3>
 <p className="text-ghost-white/60 text-center max-w-md">
 {demoEnabled ? 'The flashlight follows your cursor, revealing content in the darkness.' : 'Enable the demo overlay to see the flashlight effect.'}
 </p>
 </div>
 </div>} code={`import { HauntedVignette } from 'ghostui-react';

 export default function FlashlightPage() {
  return (
   <div className="relative min-h-screen bg-ghost-dark">
   <HauntedVignette
   radius={300}
   darkness={0.85}
   />
   <div className="relative z-10 flex items-center justify-center h-screen">
   <h1 className="text-3xl font-bold text-ghost-white">
   Move Your Cursor
   </h1>
   </div>
   </div>
  );
 }`} api={<PropsTable props={vignettePropsData} />} className="text-xl md:text-2xl font-semibold text-ghost-white" />
 </section>

 {/* Custom Timing */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Custom Ghost Timing
 </h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Control the tension by adjusting the{' '}
 <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
 peekDelay
 </code>{' '}
 prop. A longer delay builds anticipation before the ghost appears.
 </p>

 <ComponentPlayground preview={<div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
 <HauntedCard peekDelay={100}>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 Quick (100ms)
 </h3>
 <p className="text-ghost-orange text-sm">Ghost appears fast!</p>
 </div>
 </HauntedCard>
 <HauntedCard peekDelay={250}>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-lg font-bold mb-2 text-xl md:text-2xl font-semibold text-ghost-white">
 Default (250ms)
 </h3>
 <p className="text-ghost-orange text-sm">Balanced timing.</p>
 </div>
 </HauntedCard>
 <HauntedCard peekDelay={500}>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 Slow (500ms)
 </h3>
 <p className="text-ghost-orange text-sm">Builds suspense...</p>
 </div>
 </HauntedCard>
 </div>} code={`import { HauntedCard } from 'ghostui-react';

 export default function CustomTiming() {
  return (
   <div className="grid grid-cols-3 gap-12">
   {/* Quick appearance - 100ms */}
   <HauntedCard peekDelay={100}>
   <MyCard title="Quick" />
   </HauntedCard>

   {/* Default timing - 250ms */}
   <HauntedCard peekDelay={250}>
   <MyCard title="Default" />
   </HauntedCard>

   {/* Slow build-up - 500ms */}
   <HauntedCard peekDelay={500}>
   <MyCard title="Slow" />
   </HauntedCard>
   </div>
  );
 }`} className="text-xl md:text-2xl font-semibold text-ghost-white border-ghost-orange/30 rounded-lg" />

 <div className="p-8 border-ghost-orange/30">
 <p className="text-ghost-white/80 text-sm">
 💡 <strong>Tip:</strong> Use shorter delays (100-150ms) for interactive
 elements like buttons, and longer delays (400-600ms) for content cards to
 build suspense.
 </p>
 </div>
 </section>

 {/* Wrap Any Element */}
 <section className="space-y-6 mt-12 border-ghost-orange/30 rounded-lg">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Wrap Any Element
 </h2>
 <p className="text-ghost-white/80 leading-relaxed">
 HauntedCard works with any content - buttons, images, custom components,
 anything! The ghost will peek from behind whatever you wrap.
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap gap-8 justify-center items-center w-full text-xl md:text-2xl font-semibold text-ghost-white">
 <HauntedCard>
 <button className="px-6 py-3 bg-ghost-orange hover:bg-ghost-orange/80 text-ghost-black font-bold rounded-lg transition-colors">
 Spooky Button
 </button>
 </HauntedCard>
 <HauntedCard ghostSize={80}>
 <div className="p-8">
 <span className="text-3xl text-xl md:text-2xl font-semibold text-ghost-white">👻</span>
 </div>
 </HauntedCard>
 <HauntedCard>
 <div className="p-8 border-ghost-orange/30">
 <p className="text-ghost-white/80 text-sm">Any content works!</p>
 </div>
 </HauntedCard>
 </div>} code={`import { HauntedCard } from 'ghostui-react';

 export default function WrapAnything() {
  return (
   <div className="flex gap-8">
   {/* Wrap a button */}
   <HauntedCard>
   <button className="px-6 py-3 bg-ghost-orange text-ghost-black rounded-lg">
   Spooky Button
   </button>
   </HauntedCard>

   {/* Wrap an icon with smaller ghost */}
   <HauntedCard ghostSize={80}>
   <div className="w-24 h-24 bg-gradient-to-br from-ghost-orange to-red-600 rounded-full">
   <span className="text-3xl">👻</span>
   </div>
   </HauntedCard>

   {/* Wrap any content */}
   <HauntedCard>
   <div className="bg-ghost-dark p-4 rounded-lg">
   <p>Any content works!</p>
   </div>
   </HauntedCard>
   </div>
  );
 }`} className="text-xl md:text-2xl font-semibold text-ghost-white p-8 border-ghost-orange/30" />
 </section>


 {/* Variants - Disable Effects */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Effect Variants
 </h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Control which parts of the effect are enabled using{' '}
 <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
 ghostEnabled
 </code>{' '}
 and{' '}
 <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
 showBoo
 </code>{' '}
 props.
 </p>

 <ComponentPlayground preview={<div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
 <HauntedCard ghostEnabled={true} showBoo={true}>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 Full Effect
 </h3>
 <p className="text-green-400 text-sm">Ghost + BOO!</p>
 </div>
 </HauntedCard>
 <HauntedCard ghostEnabled={true} showBoo={false} className="py-12 or p-8 or p-6 border-ghost-orange/30">
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 Ghost Only
 </h3>
 <p className="text-yellow-400 text-sm">No BOO! text</p>
 </div>
 </HauntedCard>
 <HauntedCard ghostEnabled={false}>
 <div className="border-ghost-orange/30 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 Disabled
 </h3>
 <p className="text-red-400 text-sm">No ghost effect</p>
 </div>
 </HauntedCard>
 </div>} code={`import { HauntedCard } from 'ghostui-react';

 export default function EffectVariants() {
  return (
   <div className="grid grid-cols-3 gap-12">
   {/* Full effect - ghost and BOO! text */}
   <HauntedCard ghostEnabled={true} showBoo={true}>
   <MyCard title="Full Effect" />
   </HauntedCard>

   {/* Ghost only - no BOO! text */}
   <HauntedCard ghostEnabled={true} showBoo={false}>
   <MyCard title="Ghost Only" />
   </HauntedCard>

   {/* Completely disabled */}
   <HauntedCard ghostEnabled={false}>
   <MyCard title="Disabled" />
   </HauntedCard>
   </div>
  );
 }`} className="py-12 or p-8 or border-ghost-orange/30 rounded-lg text-xl md:text-2xl font-semibold text-ghost-white" />
 </section>

 {/* Accessibility */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Accessibility
 </h2>

 <div className="space-y-4">
 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2">ARIA Attributes</h4>
 <p className="text-ghost-white/70 text-sm">
 The HauntedVignette overlay includes{' '}
 <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
 aria-hidden=&quot;true&quot;
 </code>{' '}
 to ensure screen readers ignore the decorative overlay element.
 </p>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2 border-ghost-orange/30 rounded-lg">Motion Preferences</h4>
 <p className="text-ghost-white/70 text-sm text-xl md:text-2xl font-semibold text-ghost-white">
 Consider providing a way to disable animations for users who prefer
 reduced motion. Use the{' '}
 <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
 enabled
 </code>{' '}
 prop to respect{' '}
 <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs border-ghost-orange/30 rounded-lg">
 prefers-reduced-motion
 </code>{' '}
 media query.
 </p>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2 border-ghost-orange/30 rounded-lg">Content Visibility</h4>
 <p className="text-ghost-white/70 text-sm text-xl md:text-2xl font-semibold text-ghost-white">
 The flashlight effect is purely visual. All content remains accessible
 to assistive technologies regardless of the overlay state.
 </p>
 </div>
 </div>
 </section>
 </div>;
}