'use client';

import { useState } from 'react';
import { SpectralRiver, GooeyButton } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
export default function SpectralRiverPage() {
   const [isActive, setIsActive] = useState(false);
   return <div className="space-y-12">
   <div className="space-y-4">
   <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">SpectralRiver</h1>
   <p className="lead text-ghost-white/90">
   A dramatic full-screen liquid slime transition effect with animated purple drips and SVG goo filter effects.
   </p>
   </div>

   <section className="space-y-6">
   <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>
   <p className="text-ghost-white/80 leading-relaxed">
   The SpectralRiver component creates a full-screen liquid transition effect.
   Trigger it by setting <code className="font-mono text-ghost-green">isActive</code> to true,
   and use the <code className="font-mono text-ghost-green">onComplete</code> callback to reset the state
   when the animation finishes.
   </p>
   </section>

   <ComponentPlayground preview={<div className="relative">
   <GooeyButton onClick={() => setIsActive(true)}>
   Trigger Spectral River
   </GooeyButton>
   <SpectralRiver isActive={isActive} onComplete={() => setIsActive(false)} />
   </div>} code={`import { SpectralRiver } from 'ghostui-react';

   export default function MyComponent() {
      const [isActive, setIsActive] = useState(false);

      return (
         <>
         <button onClick={() => setIsActive(true)}>
         Trigger Transition
         </button>
         <SpectralRiver
         isActive={isActive}
         onComplete={() => setIsActive(false)}
         />
         </>
      );
   }`} api={<div className="space-y-6">
   <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Props</h3>
   <div className="overflow-x-auto">
   <table className="w-full text-left text-sm text-ghost-white/80">
   <thead className="border-b border-ghost-purple/20 text-ghost-purple">
   <tr>
   <th className="py-2 px-4">Prop</th>
   <th className="py-2 px-4">Type</th>
   <th className="py-2 px-4">Default</th>
   <th className="py-2 px-4">Description</th>
   </tr>
   </thead>
   <tbody>
   <tr className="border-b border-ghost-purple/10">
   <td className="py-2 px-4 font-mono text-ghost-green">isActive</td>
   <td className="py-2 px-4 font-mono text-xs">boolean</td>
   <td className="py-2 px-4 font-mono text-xs">Required</td>
   <td className="py-2 px-4">Controls whether the transition is active</td>
   </tr>
   <tr className="border-b border-ghost-purple/10">
   <td className="py-2 px-4 font-mono text-ghost-green">onComplete</td>
   <td className="py-2 px-4 font-mono text-xs">() =&gt; void</td>
   <td className="py-2 px-4 font-mono text-xs">-</td>
   <td className="py-2 px-4">Callback invoked when the transition animation completes</td>
   </tr>
   </tbody>
   </table>
   </div>
   </div>} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white" />

   <section className="space-y-6 mt-12">
   <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Page Transitions</h2>
   <p className="text-ghost-white/80 leading-relaxed">
   Use SpectralRiver to create dramatic page transitions. The effect covers the entire viewport,
   making it perfect for scene changes or navigation between major sections of your application.
   </p>
   <ComponentPlayground preview={<div className="relative h-[300px] bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8 overflow-hidden">
   <div className="flex flex-col items-center justify-center h-full space-y-4">
   <p className="text-ghost-white/80 text-center">
   Click the button to see the transition effect
   </p>
   <GooeyButton onClick={() => setIsActive(true)}>
   Navigate to Next Page
   </GooeyButton>
   </div>
   <SpectralRiver isActive={isActive} onComplete={() => {
      setIsActive(false);
      // In a real app, you would navigate here
      // router.push('/next-page');
   }} />
   </div>} code={`import { useState } from 'react';
   import { SpectralRiver, GooeyButton } from 'ghostui-react';
   import { useRouter } from 'next/navigation';

   export default function NavigationExample() {
      const [isActive, setIsActive] = useState(false);
      const router = useRouter();

      const handleNavigate = () => {
         setIsActive(true);
      };

      return (
         <>
         <GooeyButton onClick={handleNavigate}>
         Navigate to Next Page
         </GooeyButton>

         <SpectralRiver
         isActive={isActive}
         onComplete={() => {
            router.push('/next-page');
         }}
         />
         </>
      );
   }`} />
   </section>
   </div>;
}