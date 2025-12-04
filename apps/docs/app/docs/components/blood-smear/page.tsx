'use client';

import { BloodSmear } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';

// Simple preview demo with just the trigger button
function SimpleDemo() {
 return <div className="text-center space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Click to trigger the blood smear effect</h3>
 <BloodSmear variant="blood" buttonText="Trigger Blood Smear" className="px-8 py-3 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-all font-mono text-sm hover:scale-105 active:scale-95" />
 </div>;
}

// Variant demo showing different fluid types
function VariantDemo() {
 return <div className="text-center py-8">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Try different fluid variants</h3>
 <div className="flex flex-wrap gap-8 justify-center mt-12">
 <BloodSmear variant="blood" buttonText="Blood" className="px-8 py-3 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-all font-mono text-sm hover:scale-105 active:scale-95" />
 <BloodSmear variant="goo" buttonText="Radioactive Goo" className="px-8 py-3 bg-[#32CD32]/20 text-lime-300 border border-lime-500/30 rounded-lg hover:bg-[#32CD32]/40 transition-all font-mono text-sm hover:scale-105 active:scale-95" />
 <BloodSmear variant="ectoplasm" buttonText="Ectoplasm" className="px-8 py-3 bg-purple-900/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-900/40 transition-all font-mono text-sm hover:scale-105 active:scale-95" />
 </div>
 </div>;
}
export default function BloodSmearPage() {
 return <div className="space-y-12">
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
 BloodSmear
 </h1>
 <p className="lead text-ghost-white/90">
 A dramatic full-screen page transition with viscous blood-dripping animation and organic flow, perfect for horror-themed navigation experiences.
 </p>
 </div>

 <ComponentPlayground preview={<SimpleDemo />} code={`import { BloodSmear } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <div>
   <BloodSmear
   variant="blood"
   buttonText="Trigger Blood Smear"
   />
   </div>
  );
 }`} api={<div className="space-y-6">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Props</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm text-ghost-white/80">
 <thead className="border-b border-ghost-gray/30 text-ghost-purple">
 <tr>
 <th className="py-2 px-4">Prop</th>
 <th className="py-2 px-4">Type</th>
 <th className="py-2 px-4">Default</th>
 <th className="py-2 px-4">Description</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-ghost-gray/10">
 <td className="py-2 px-4 font-mono text-ghost-green">variant</td>
 <td className="py-2 px-4 font-mono text-xs">'blood' | 'goo' | 'ectoplasm'</td>
 <td className="py-2 px-4 font-mono text-xs">'blood'</td>
 <td className="py-2 px-4">The fluid variant to use for the transition effect</td>
 </tr>
 <tr className="border-b border-ghost-gray/10">
 <td className="py-2 px-4 font-mono text-ghost-green">buttonText</td>
 <td className="py-2 px-4 font-mono text-xs">string</td>
 <td className="py-2 px-4 font-mono text-xs">'Trigger Blood Smear'</td>
 <td className="py-2 px-4">Text to display on the trigger button</td>
 </tr>
 <tr className="border-b border-ghost-gray/10">
 <td className="py-2 px-4 font-mono text-ghost-green">className</td>
 <td className="py-2 px-4 font-mono text-xs">string</td>
 <td className="py-2 px-4 font-mono text-xs">-</td>
 <td className="py-2 px-4">Optional custom classes for the trigger button</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="mt-8 space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Installation</h3>
 <div className="p-8 border-ghost-orange/30">
 <p className="text-sm text-ghost-white/80 mb-3">
 Install the GhostUI package to get access to the BloodSmear component:
 </p>
 <pre className="bg-black/40 p-3 rounded text-ghost-green text-sm overflow-x-auto">
 <code>npm install ghostui-react framer-motion</code>
 </pre>
 <p className="text-xs text-ghost-white/60 mt-2">
 Note: Framer Motion is a peer dependency required for animations.
 </p>
 </div>
 </div>
 </div>} className="md:text-2xl text-xl font-semibold text-ghost-white p-8 border-ghost-orange/30" />

 {/* Additional Examples Section */}
 <div className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Additional Examples</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Explore different use cases and integration patterns for the BloodSmear transition effect.
 </p>

 <ComponentPlayground preview={<VariantDemo />} code={`import { BloodSmear } from 'ghostui-react';

 export default function VariantExample() {
  return (
   <div className="flex gap-4">
   <BloodSmear
   variant="blood"
   buttonText="Blood"
   />

   <BloodSmear
   variant="goo"
   buttonText="Radioactive Goo"
   className="bg-lime-700 hover:bg-lime-600"
   />

   <BloodSmear
   variant="ectoplasm"
   buttonText="Ectoplasm"
   className="bg-purple-900 hover:bg-purple-800"
   />
   </div>
  );
 }`} api={<div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Fluid Variants</h3>
 <p className="text-ghost-white/70 text-sm leading-relaxed">
 Each variant uses a different color palette with matching highlights and shine effects for a cohesive thematic look.
 </p>
 <div className="space-y-3 text-ghost-white/80 text-sm">
 <div className="p-8 border-ghost-orange/30">
 <h4 className="font-semibold text-ghost-purple mb-2">Variant Themes:</h4>
 <ul className="space-y-1 list-disc list-inside ml-2">
 <li><strong>blood</strong>: Deep red with pinkish highlights - classic horror</li>
 <li><strong>goo</strong>: Lime green with bright highlights - radioactive/toxic theme</li>
 <li><strong>ectoplasm</strong>: Purple with lavender highlights - ghostly/spectral theme</li>
 </ul>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="font-semibold text-ghost-purple mb-2">Customization:</h4>
 <p className="text-sm leading-relaxed">
 Use the <code className="text-ghost-green">className</code> prop to style the trigger button to match your variant theme.
 </p>
 </div>
 </div>
 </div>} className="md:text-2xl p-8 border-ghost-orange/30 text-xl font-semibold text-ghost-white" />
 </div>

 {/* Usage Notes Section */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Usage Notes
 </h2>
 <div className="space-y-4">
 <div className="border-ghost-orange/30">
 <p className="text-ghost-white/80 leading-relaxed">
 A full-screen page transition with 3.8-second viscous dripping animation. Includes built-in trigger button with state management.
 Requires <code className="text-ghost-green bg-black/30 px-1 rounded">'use client'</code> directive for Framer Motion compatibility.
 </p>
 </div>

 <div className="rounded-lg">
 <h4 className="font-semibold text-ghost-white mb-3">Key Features</h4>
 <ul className="text-ghost-white/80 space-y-2 text-sm">
 <li>• Three fluid variants: blood (red), goo (lime green), ectoplasm (purple)</li>
 <li>• Hardware-accelerated animations with SVG filters for organic flow</li>
 <li>• Keyboard accessible with proper focus management</li>
 <li>• Works on Chrome/Edge 90+, Firefox 88+, Safari 14+</li>
 </ul>
 </div>

 <div className="border-ghost-orange/30">
 <h4 className="font-semibold text-ghost-white mb-3">Best For</h4>
 <p className="text-ghost-white/80 text-sm leading-relaxed">
 Horror-themed websites, Halloween events, dramatic page transitions, and interactive storytelling.
 Perfect for game level transitions or loading states that need theatrical flair.
 </p>
 </div>
 </div>
 </section>
 </div>;
}