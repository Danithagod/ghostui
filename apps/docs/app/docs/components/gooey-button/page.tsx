'use client';

import { GooeyButton } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function GooeyButtonPage() {
 const props = [{
  name: 'variant',
  type: "'slime' | 'blood' | 'ectoplasm'",
  default: "'ectoplasm'",
  description: 'Visual style variant with different color schemes and liquid effects. Each variant has unique glow colors.'
 }, {
  name: 'fluidity',
  type: "'low' | 'medium' | 'high'",
  default: "'medium'",
  description: 'Animation intensity level controlling drip speed and displacement on hover.'
 }, {
  name: 'onClick',
  type: '() => void',
  default: '-',
  description: 'Click handler function'
 }, {
  name: 'children',
  type: 'React.ReactNode',
  default: '-',
  description: 'Button content (required)'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes to apply to the button'
 }, {
  name: 'disabled',
  type: 'boolean',
  default: 'false',
  description: 'Disables the button and its animations'
 }, {
  name: 'ref',
  type: 'React.Ref<HTMLButtonElement>',
  default: '-',
  description: 'Ref forwarded to the underlying button element'
 }];
 const codeExample = `import { GooeyButton } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <GooeyButton
   variant="ectoplasm"
   fluidity="medium"
   onClick={() => console.log('Clicked!')}
   >
   Click Me
   </GooeyButton>
  );
 }`;
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">GooeyButton</h1>

 <p className="lead">
 A primary call-to-action button with liquid distortion hover effects and animated drips.
 </p>

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Basic Usage
 </h2>

 <p className="text-ghost-white/80 leading-relaxed">
 Import GooeyButton and use it like a standard button. Choose from three atmospheric variants and control the animation intensity with the fluidity prop.
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap gap-4">
 <GooeyButton variant="slime">Slime Variant</GooeyButton>
 <GooeyButton variant="blood">Blood Variant</GooeyButton>
 <GooeyButton variant="ectoplasm">Ectoplasm Variant</GooeyButton>
 </div>} code={codeExample} api={<PropsTable props={props} />} />
 </section>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Variants</h2>

 <p>
 GooeyButton supports three atmospheric variants, each with unique color schemes and glow effects.
 Hover over each button to see the drip animations in action:
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap items-center gap-6">
 <GooeyButton variant="slime">Slime</GooeyButton>
 <GooeyButton variant="blood">Blood</GooeyButton>
 <GooeyButton variant="ectoplasm">Ectoplasm</GooeyButton>
 </div>} code={`<GooeyButton variant="slime">Slime</GooeyButton>
 <GooeyButton variant="blood">Blood</GooeyButton>
 <GooeyButton variant="ectoplasm">Ectoplasm</GooeyButton>`} />

 <ul className="mb-20 pb-4">
 <li><strong>slime</strong> - Lime green with toxic glow effect</li>
 <li><strong>blood</strong> - Deep red with crimson glow</li>
 <li className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide"><strong className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">ectoplasm</strong> - Violet purple with spectral glow (default)</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Fluidity</h2>

 <p>
 Control the animation intensity with the <code>fluidity</code> prop.
 Higher fluidity means faster animations with larger drip displacement:
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap items-center gap-6">
 <GooeyButton variant="ectoplasm" fluidity="low">Low Fluidity</GooeyButton>
 <GooeyButton variant="ectoplasm" fluidity="medium">Medium Fluidity</GooeyButton>
 <GooeyButton variant="ectoplasm" fluidity="high">High Fluidity</GooeyButton>
 </div>} code={`<GooeyButton fluidity="low">Low Fluidity</GooeyButton>
 <GooeyButton fluidity="medium">Medium Fluidity</GooeyButton>
 <GooeyButton fluidity="high">High Fluidity</GooeyButton>`} />

 <ul className="mb-20 pb-4">
 <li><strong>low</strong> - Slower, subtle drip animations (2.5s duration, 20px displacement)</li>
 <li><strong>medium</strong> - Balanced animation speed (1.8s duration, 35px displacement) - default</li>
 <li><strong>high</strong> - Fast, dramatic drip animations (1.2s duration, 50px displacement)</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Combined Examples</h2>

 <p className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Mix variants and fluidity levels to create the perfect effect for your application:
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap items-center gap-6">
 <GooeyButton variant="slime" fluidity="high">Toxic Splash</GooeyButton>
 <GooeyButton variant="blood" fluidity="low">Slow Drip</GooeyButton>
 <GooeyButton variant="ectoplasm" fluidity="high">Spirit Burst</GooeyButton>
 </div>} code={`<GooeyButton variant="slime" fluidity="high">Toxic Splash</GooeyButton>
 <GooeyButton variant="blood" fluidity="low">Slow Drip</GooeyButton>
 <GooeyButton variant="ectoplasm" fluidity="high">Spirit Burst</GooeyButton>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Disabled State</h2>

 <p>
 Use the <code>disabled</code> prop to disable the button. Animations are paused when disabled:
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap items-center gap-6">
 <GooeyButton variant="ectoplasm" disabled>Disabled</GooeyButton>
 <GooeyButton variant="blood" disabled>Disabled</GooeyButton>
 <GooeyButton variant="slime" disabled>Disabled</GooeyButton>
 </div>} code={`<GooeyButton variant="ectoplasm" disabled>Disabled</GooeyButton>
 <GooeyButton variant="blood" disabled>Disabled</GooeyButton>
 <GooeyButton variant="slime" disabled>Disabled</GooeyButton>`} />

 <h2 className="mt-12 text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p>
 GooeyButton follows accessibility best practices:
 </p>

 <ul>
 <li>Keyboard navigable with standard tab order</li>
 <li>Activatable via Enter or Space keys</li>
 <li>Supports reduced motion preferences (disables drip animations)</li>
 <li>Proper focus states with visible focus ring</li>
 <li>Semantic HTML button element with ref forwarding</li>
 <li>Forwards all standard HTML button attributes (aria-label, type, etc.)</li>
 </ul>


 </div>;
}