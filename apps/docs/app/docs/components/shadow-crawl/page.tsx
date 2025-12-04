'use client';

import { useState } from 'react';
import { ShadowCrawl, GooeyButton } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
export default function ShadowCrawlPage() {
 const [isActive, setIsActive] = useState(false);
 const [fastCrawl, setFastCrawl] = useState(false);
 const [slowCrawl, setSlowCrawl] = useState(false);
 const propsData = [{
  name: 'isActive',
  type: 'boolean',
  required: true,
  description: 'Controls whether the shadow crawl transition is active. Set to true to trigger the effect.'
 }, {
  name: 'onComplete',
  type: '() => void',
  required: false,
  description: 'Callback function fired when the transition completes. Use this to reset state or trigger follow-up actions.'
 }, {
  name: 'duration',
  type: 'number',
  required: false,
  default: '1.2',
  description: 'Total duration of the transition in seconds. Controls how long the shadow tendrils take to crawl across the screen.'
 }];
 return <div className="space-y-12">
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">ShadowCrawl</h1>
 <p className="lead text-ghost-white/90">
 A dramatic creeping darkness transition with shadow tendrils that crawl across the screen from bottom to top. Perfect for scene transitions, loading states, or creating suspenseful moments in your horror-themed interface.
 </p>
 </div>

 <ComponentPlayground preview={<div className="relative h-[300px] flex items-center justify-center">
 <GooeyButton onClick={() => setIsActive(true)} disabled={isActive}>
 {isActive ? 'Shadows Crawling...' : 'Trigger Shadow Crawl'}
 </GooeyButton>
 <ShadowCrawl isActive={isActive} onComplete={() => setIsActive(false)} duration={1.2} />
 </div>} code={`import { ShadowCrawl } from 'ghostui-react';
 import { useState } from 'react';

 export default function MyComponent() {
  const [isActive, setIsActive] = useState(false);

  return (
   <>
   <button onClick={() => setIsActive(true)}>
   Trigger Transition
   </button>
   <ShadowCrawl
   isActive={isActive}
   onComplete={() => setIsActive(false)}
   duration={1.2}
   />
   </>
  );
 }`} api={<PropsTable props={propsData} />} />

 {/* Duration Variants Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Duration Variants</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Control the speed of the shadow crawl by adjusting the duration prop. Faster transitions create urgency, while slower ones build suspense.
 </p>

 <div className="space-y-6">
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white mb-4">Fast Crawl (0.6s)</h3>
 <ComponentPlayground preview={<div className="relative h-[250px] flex items-center justify-center">
 <GooeyButton onClick={() => setFastCrawl(true)} disabled={fastCrawl}>
 {fastCrawl ? 'Active...' : 'Quick Shadows'}
 </GooeyButton>
 <ShadowCrawl isActive={fastCrawl} onComplete={() => setFastCrawl(false)} duration={0.6} />
 </div>} code={`<ShadowCrawl
 isActive={isActive}
 onComplete={() => setIsActive(false)}
 duration={0.6}
 />`} />
 </div>

 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white mb-4">Slow Crawl (2.5s)</h3>
 <ComponentPlayground preview={<div className="relative h-[250px] flex items-center justify-center">
 <GooeyButton onClick={() => setSlowCrawl(true)} disabled={slowCrawl}>
 {slowCrawl ? 'Active...' : 'Creeping Shadows'}
 </GooeyButton>
 <ShadowCrawl isActive={slowCrawl} onComplete={() => setSlowCrawl(false)} duration={2.5} />
 </div>} code={`<ShadowCrawl
 isActive={isActive}
 onComplete={() => setIsActive(false)}
 duration={2.5}
 />`} />
 </div>
 </div>
 </section>

 {/* Animation Breakdown Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Animation Breakdown</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 The ShadowCrawl effect consists of three distinct phases that create a dramatic page transition:
 </p>

 <div className="grid gap-4 md:grid-cols-3">
 <div className="p-8">
 <h4 className="text-ghost-orange font-semibold mb-2">Phase 1: Crawl (40%)</h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed mb-3">
 Eight shadow tendrils crawl up from the bottom with staggered timing, creating a creeping darkness effect.
 </p>
 <p className="text-ghost-white/60 text-xs">
 Duration: 40% of total (0.48s at default 1.2s)
 </p>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2">Phase 2: Cover (20%)</h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed mb-3">
 A solid black overlay fades in to completely cover the screen, perfect for page transitions.
 </p>
 <p className="text-ghost-white/60 text-xs">
 Duration: 20% of total (0.24s at default 1.2s)
 </p>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2">Phase 3: Fade (40%)</h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed mb-3">
 The entire shadow effect fades out, revealing the new page content underneath.
 </p>
 <p className="text-ghost-white/60 text-xs">
 Duration: 40% of total (0.48s at default 1.2s)
 </p>
 </div>
 </div>

 <div className="border-ghost-orange/30">
 <h4 className="text-ghost-white font-semibold mb-3">Staggered Timing</h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed">
 The eight tendrils are staggered by 0.05 seconds each, creating a wave-like crawling effect. This prevents the transition from feeling too uniform and adds organic movement to the darkness.
 </p>
 </div>
 </section>

 {/* Usage Examples Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Usage Examples</h2>

 <div className="space-y-8">
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Scene Transitions</h3>
 <p className="text-ghost-white/80 leading-relaxed">
 Use ShadowCrawl to transition between different sections or pages with dramatic effect:
 </p>
 <CodeBlock language="tsx" code={`import { ShadowCrawl } from 'ghostui-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SceneTransition() {
 const [transitioning, setTransitioning] = useState(false);
 const router = useRouter();

 const navigateWithTransition = (path: string) => {
  setTransitioning(true);
  // Navigate after shadows cover the screen (60% of duration)
  setTimeout(() => {
   router.push(path);
  }, duration * 600); // 0.72s at default 1.2s
 };

 return (
  <>
   <button onClick={() => navigateWithTransition('/next-scene')}>
    Enter the Darkness
   </button>
   <ShadowCrawl
    isActive={transitioning}
    onComplete={() => setTransitioning(false)}
    duration={1.2}
   />
  </>
 );
}`} />
 </div>

 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Loading State</h3>
 <p className="text-ghost-white/80 leading-relaxed">
 Create suspenseful loading experiences by combining ShadowCrawl with async operations:
 </p>
 <CodeBlock language="tsx" code={`import { ShadowCrawl } from 'ghostui-react';
import { useState } from 'react';

export default function LoadingTransition() {
 const [loading, setLoading] = useState(false);

 const loadContent = async () => {
  setLoading(true);
  await fetchData(); // Your async operation
  setLoading(false);
 };

 return (
  <>
   <button onClick={loadContent}>Load Content</button>
   <ShadowCrawl
    isActive={loading}
    onComplete={() => setLoading(false)}
    duration={1.5}
   />
  </>
 );
}`} />
 </div>
 </div>
 </section>

 {/* Technical Details Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Technical Details</h2>
 
 <p className="text-ghost-white/80 leading-relaxed">
 The shadow crawl effect uses optimized animations and positioning for smooth transitions:
 </p>

 <ul className="text-ghost-white/80 leading-relaxed space-y-3 mt-4 list-disc list-inside">
 <li>
 Uses <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">fixed inset-0</code> to cover the entire viewport regardless of scroll position.
 </li>
 <li>
 Uses <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">pointer-events-none</code> to ensure the overlay doesn't block interactions during the transition.
 </li>
 <li>
 Leverages Framer Motion's AnimatePresence to handle mount/unmount animations smoothly with the onExitComplete callback.
 </li>
 <li>
 Set to <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">z-50</code> to ensure the shadow overlay appears above most content. Adjust if needed for your layout.
 </li>
 </ul>
 </section>
 </div>;
}