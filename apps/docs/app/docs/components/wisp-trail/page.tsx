'use client';

import { useState } from 'react';
import { WispTrail } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
export default function WispTrailPage() {
 const [isEnabled, setIsEnabled] = useState(false);
 const [greenTrail, setGreenTrail] = useState(false);
 const [purpleTrail, setPurpleTrail] = useState(false);
 const [orangeTrail, setOrangeTrail] = useState(false);
 const propsData = [{
  name: 'color',
  type: 'string',
  required: false,
  default: "'#90FFB5'",
  description: 'The color of the wisp particles. Accepts any valid CSS color value (hex, rgb, hsl).'
 }, {
  name: 'particleCount',
  type: 'number',
  required: false,
  default: '3',
  description: 'Number of particles emitted per cursor movement. Higher values create denser trails.'
 }];
 return <div className="space-y-12">
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">WispTrail</h1>
 <p className="lead text-ghost-white/90">
 A magical particle trail effect that emits glowing wisps as you move the cursor. Perfect for adding an ethereal, mystical touch to your interface with customizable colors and particle density.
 </p>
 </div>

 <ComponentPlayground preview={<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
 <div className="relative h-[300px] flex items-center justify-center">
 {isEnabled && <WispTrail color="#90FFB5" particleCount={3} />}
 <button onClick={() => setIsEnabled(!isEnabled)} className="px-6 py-3 bg-ghost-green text-ghost-dark rounded-lg hover:bg-ghost-green/80 transition-colors font-semibold">
 {isEnabled ? 'Disable' : 'Enable'} Wisp Trail
 </button>
 {isEnabled && <p className="absolute bottom-4 text-xs text-ghost-white/60">Move your cursor to see the effect</p>}
 </div>
 </div>} code={`import { WispTrail } from 'ghostui-react';

 export default function MyApp() {
  return (
   <>
   <WispTrail color="#90FFB5" particleCount={3} />
   {/* Your app content */}
   </>
  );
 }`} api={<PropsTable props={propsData} />} />

 {/* Color Variants Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Color Variants</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Customize the wisp trail color to match your theme or create different moods. The color prop accepts any valid CSS color value.
 </p>

 <div className="grid gap-6 md:grid-cols-3">
 <ComponentPlayground preview={<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-6">
 <div className="relative h-[200px] flex items-center justify-center">
 {greenTrail && <WispTrail color="#90FFB5" particleCount={3} />}
 <button onClick={() => setGreenTrail(!greenTrail)} className="px-4 py-2 bg-[#90FFB5] text-ghost-dark rounded hover:opacity-80 transition-opacity text-sm font-semibold">
 {greenTrail ? 'Stop' : 'Start'}
 </button>
 </div>
 <p className="text-center text-xs text-ghost-white/60 mt-2">Ghost Green</p>
 </div>} code={`<WispTrail color="#90FFB5" particleCount={3} />`} />

 <ComponentPlayground preview={<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-6">
 <div className="relative h-[200px] flex items-center justify-center">
 {purpleTrail && <WispTrail color="#B794F4" particleCount={3} />}
 <button onClick={() => setPurpleTrail(!purpleTrail)} className="px-4 py-2 bg-[#B794F4] text-ghost-dark rounded hover:opacity-80 transition-opacity text-sm font-semibold">
 {purpleTrail ? 'Stop' : 'Start'}
 </button>
 </div>
 <p className="text-center text-xs text-ghost-white/60 mt-2">Ghost Purple</p>
 </div>} code={`<WispTrail color="#B794F4" particleCount={3} />`} />

 <ComponentPlayground preview={<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-6">
 <div className="relative h-[200px] flex items-center justify-center">
 {orangeTrail && <WispTrail color="#FF6F00" particleCount={3} />}
 <button onClick={() => setOrangeTrail(!orangeTrail)} className="px-4 py-2 bg-[#FF6F00] text-white rounded hover:opacity-80 transition-opacity text-sm font-semibold">
 {orangeTrail ? 'Stop' : 'Start'}
 </button>
 </div>
 <p className="text-center text-xs text-ghost-white/60 mt-2">Ghost Orange</p>
 </div>} code={`<WispTrail color="#FF6F00" particleCount={3} />`} />
 </div>
 </section>

 {/* Particle Density Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Particle Density</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Control the density of the wisp trail by adjusting the particleCount prop. More particles create a denser, more dramatic effect.
 </p>

 <ComponentPlayground preview={<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
 {(() => {
  const [density, setDensity] = useState<1 | 3 | 6>(3);
  const [active, setActive] = useState(false);
  return <div className="space-y-12">
  <div className="flex gap-2 justify-center">
  <button onClick={() => setDensity(1)} className={`px-3 py-1 rounded text-sm ${density === 1 ? 'bg-ghost-orange text-white' : 'bg-ghost-orange/20 text-ghost-white'}`}>
  Light (1)
  </button>
  <button onClick={() => setDensity(3)} className={`px-3 py-1 rounded text-sm ${density === 3 ? 'bg-ghost-orange text-white' : 'bg-ghost-orange/20 text-ghost-white'}`}>
  Medium (3)
  </button>
  <button onClick={() => setDensity(6)} className={`px-3 py-1 rounded text-sm ${density === 6 ? 'bg-ghost-orange text-white' : 'bg-ghost-orange/20 text-ghost-white'}`}>
  Dense (6)
  </button>
  </div>
  <div className="relative h-[250px] flex items-center justify-center">
  {active && <WispTrail color="#90FFB5" particleCount={density} />}
  <button onClick={() => setActive(!active)} className="px-6 py-3 bg-ghost-green text-ghost-dark rounded-lg hover:bg-ghost-green/80 transition-colors font-semibold">
  {active ? 'Stop' : 'Start'} Trail
  </button>
  </div>
  </div>;
 })()}
 </div>} code={`// Light trail
 <WispTrail color="#90FFB5" particleCount={1} />

 // Medium trail (default)
 <WispTrail color="#90FFB5" particleCount={3} />

 // Dense trail
 <WispTrail color="#90FFB5" particleCount={6} />`} previewClassName="space-y-12" />
 </section>

 {/* Usage Examples Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Usage Examples</h2>

 <div className="space-y-8">
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Full Page Effect</h3>
 <p className="text-ghost-white/80 leading-relaxed">
 Add the WispTrail to your app layout for a persistent magical cursor effect across all pages:
 </p>
 <CodeBlock language="tsx" code={`import { WispTrail } from 'ghostui-react';

export default function RootLayout({ children }) {
 return (
  <html>
   <body>
    <WispTrail color="#90FFB5" particleCount={3} />
    {children}
   </body>
  </html>
 );
}`} />
 </div>

 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Conditional Activation</h3>
 <p className="text-ghost-white/80 leading-relaxed">
 Enable the wisp trail only in specific sections or based on user preferences:
 </p>
 <CodeBlock language="tsx" code={`import { WispTrail } from 'ghostui-react';
import { useState } from 'react';

export default function MagicalSection() {
 const [effectEnabled, setEffectEnabled] = useState(false);

 return (
  <section>
   {effectEnabled && <WispTrail color="#B794F4" particleCount={4} />}
   <button onClick={() => setEffectEnabled(!effectEnabled)}>
    Toggle Magic
   </button>
   {/* Section content */}
  </section>
 );
}`} />
 </div>
 </div>
 </section>

 {/* Technical Details Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Technical Details</h2>
 
 <p className="text-ghost-white/80 leading-relaxed">
 The wisp trail uses optimized rendering and memory management for smooth performance:
 </p>

 <ul className="text-ghost-white/80 leading-relaxed space-y-3 mt-4 list-disc list-inside">
 <li>
 Particles are emitted every 50ms to prevent performance issues while maintaining smooth visual effect.
 </li>
 <li>
 Each particle fades out over 1 second while moving in a random direction, creating organic movement patterns.
 </li>
 <li>
 Only the last 30 particles are kept in memory, automatically cleaning up old particles to prevent memory leaks.
 </li>
 <li>
 Uses fixed positioning with <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">pointer-events-none</code> to ensure particles don't interfere with page interactions.
 </li>
 </ul>
 </section>
 </div>;
}