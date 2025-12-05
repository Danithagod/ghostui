'use client';

import { useState } from 'react';
import { GraveModal, GooeyButton } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
export default function GraveModalPage() {
 const [isOpen, setIsOpen] = useState(false);
 return <div className="space-y-12">
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">GraveModal</h1>
 <p className="lead text-ghost-white/90">
 A modal dialog that rises from the grave with a stone texture overlay and backdrop blur.
 </p>
 </div>

 <section className="space-y-6">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 The GraveModal component provides a dramatic modal dialog with a stone texture overlay.
 Control its visibility with the <code className="font-mono text-ghost-green">isOpen</code> prop
 and handle close events with <code className="font-mono text-ghost-green">onClose</code>.
 </p>
 </section>

 <ComponentPlayground preview={<div className="flex items-center justify-center h-[200px]">
 <GooeyButton onClick={() => setIsOpen(true)}>
 Summon Modal
 </GooeyButton>
 <GraveModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Rest in Peace">
 <div className="space-y-4">
 <p>
 This modal has risen from the depths to bring you important information.
 The background features a subtle stone texture overlay.
 </p>
 <div className="flex justify-end gap-2">
 <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm text-ghost-white/60 hover:text-ghost-white transition-colors">
 Cancel
 </button>
 <GooeyButton onClick={() => setIsOpen(false)} className="text-sm px-4 py-2">
 Confirm
 </GooeyButton>
 </div>
 </div>
 </GraveModal>
 </div>} code={`import { useState } from 'react';
 import { GraveModal, GooeyButton } from 'ghostui-react';

 export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <>
   <GooeyButton onClick={() => setIsOpen(true)}>
   Open Modal
   </GooeyButton>

   <GraveModal
   isOpen={isOpen}
   onClose={() => setIsOpen(false)}
   title="Warning"
   >
   <p>Are you sure you want to disturb the spirits?</p>
   <div className="mt-4 flex justify-end">
   <GooeyButton onClick={() => setIsOpen(false)}>
   Proceed
   </GooeyButton>
   </div>
   </GraveModal>
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
 <td className="py-2 px-4 font-mono text-ghost-green">isOpen</td>
 <td className="py-2 px-4 font-mono text-xs">boolean</td>
 <td className="py-2 px-4 font-mono text-xs">false</td>
 <td className="py-2 px-4">Whether the modal is visible.</td>
 </tr>
 <tr className="border-b border-ghost-purple/10">
 <td className="py-2 px-4 font-mono text-ghost-green">onClose</td>
 <td className="py-2 px-4 font-mono text-xs">() =&gt; void</td>
 <td className="py-2 px-4 font-mono text-xs">Required</td>
 <td className="py-2 px-4">Callback fired when the modal requests to close.</td>
 </tr>
 <tr className="border-b border-ghost-purple/10">
 <td className="py-2 px-4 font-mono text-ghost-green">title</td>
 <td className="py-2 px-4 font-mono text-xs">ReactNode</td>
 <td className="py-2 px-4 font-mono text-xs">-</td>
 <td className="py-2 px-4">The title of the modal.</td>
 </tr>
 <tr className="border-b border-ghost-purple/10">
 <td className="py-2 px-4 font-mono text-ghost-green">children</td>
 <td className="py-2 px-4 font-mono text-xs">ReactNode</td>
 <td className="py-2 px-4 font-mono text-xs">-</td>
 <td className="py-2 px-4">The content of the modal.</td>
 </tr>
 <tr className="border-b border-ghost-purple/10">
 <td className="py-2 px-4 font-mono text-ghost-green">className</td>
 <td className="py-2 px-4 font-mono text-xs">string</td>
 <td className="py-2 px-4 font-mono text-xs">-</td>
 <td className="py-2 px-4">Additional CSS classes.</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white" />

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Custom Content</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 The modal accepts any React content as children, allowing you to create custom layouts with forms,
 images, or complex interactions.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center h-[200px]">
 <GooeyButton onClick={() => setIsOpen(true)}>
 View Details
 </GooeyButton>
 <GraveModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Spirit Information">
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4 text-sm">
 <div>
 <p className="text-ghost-white/60">Name:</p>
 <p className="text-ghost-white">Phantom Entity</p>
 </div>
 <div>
 <p className="text-ghost-white/60">Type:</p>
 <p className="text-ghost-white">Ethereal</p>
 </div>
 <div>
 <p className="text-ghost-white/60">Status:</p>
 <p className="text-ghost-green">Active</p>
 </div>
 <div>
 <p className="text-ghost-white/60">Level:</p>
 <p className="text-ghost-white">13</p>
 </div>
 </div>
 <div className="p-8 border-ghost-orange/30 rounded-lg">
 <p className="text-ghost-white/70 text-sm">
 This spirit has been haunting the premises since 1892.
 Approach with caution and respect.
 </p>
 </div>
 <div className="flex justify-end">
 <GooeyButton onClick={() => setIsOpen(false)} className="text-sm px-4 py-2">
 Close
 </GooeyButton>
 </div>
 </div>
 </GraveModal>
 </div>} code={`import { useState } from 'react';
 import { GraveModal, GooeyButton } from 'ghostui-react';

 export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <>
   <GooeyButton onClick={() => setIsOpen(true)}>
   View Details
   </GooeyButton>

   <GraveModal
   isOpen={isOpen}
   onClose={() => setIsOpen(false)}
   title="Spirit Information"
   >
   <div className="space-y-4">
   <div className="grid grid-cols-2 gap-4 text-sm">
   <div>
   <p className="text-ghost-white/60">Name:</p>
   <p className="text-ghost-white">Phantom Entity</p>
   </div>
   <div>
   <p className="text-ghost-white/60">Type:</p>
   <p className="text-ghost-white">Ethereal</p>
   </div>
   </div>
   <div className="flex justify-end">
   <GooeyButton onClick={() => setIsOpen(false)}>
   Close
   </GooeyButton>
   </div>
   </div>
   </GraveModal>
   </>
  );
 }`} previewClassName="py-12 or p-8 or p-6 border-ghost-orange/30 rounded-lg" />
 </section>
 </div>;
}