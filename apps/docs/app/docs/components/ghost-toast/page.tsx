'use client';

import { GhostToastProvider, useGhostToast } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';

// DemoControls component with toast type buttons
function DemoControls() {
 const {
  addToast
 } = useGhostToast();
 return <div className="flex flex-col gap-6 items-center z-10">
 <div className="text-center space-y-2">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">The Spirit Medium</h2>
 <p className="text-gray-500 text-sm">Summon messages from the other side.</p>
 </div>
 <div className="flex gap-4">
 <button onClick={() => addToast("The spirits whisper your name...", "info")} className="px-8 py-3 bg-purple-900/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-900/40 transition-all font-mono text-sm hover:scale-105 active:scale-95">
 Summon Spirit
 </button>
 <button onClick={() => addToast("The ritual is complete!", "success")} className="px-8 py-3 bg-green-900/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-900/40 transition-all font-mono text-sm hover:scale-105 active:scale-95">
 Blessed Omen
 </button>
 <button onClick={() => addToast("DO NOT LOOK BEHIND YOU.", "curse")} className="px-8 py-3 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-all font-mono text-sm hover:scale-105 active:scale-95">
 Invoke Curse
 </button>
 </div>
 </div>;
}

// Toast types demo component
function ToastTypesDemo() {
 const {
  addToast
 } = useGhostToast();
 return <div className="flex flex-col gap-4 items-center z-10">
 <div className="text-center space-y-2">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Toast Types Demo</h3>
 <p className="text-gray-500 text-sm">Try all notification styles</p>
 </div>
 <div className="flex gap-4">
 <button onClick={() => addToast("This is an info message from the spirits", "info")} className="px-6 py-2 bg-purple-900/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-900/40 transition-all font-mono text-sm">
 Info Toast
 </button>
 <button onClick={() => addToast("Success! The spirits are pleased.", "success")} className="px-6 py-2 bg-green-900/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-900/40 transition-all font-mono text-sm">
 Success Toast
 </button>
 <button onClick={() => addToast("Warning! Dark forces approach!", "curse")} className="px-6 py-2 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-all font-mono text-sm text-xl md:text-2xl font-semibold text-ghost-white">
 Curse Toast
 </button>
 </div>
 </div>;
}
export default function GhostToastPage() {
 const hookProps = [{
  name: 'addToast',
  type: "(message: string, type?: 'info' | 'curse' | 'success') => void",
  description: 'Display a ghost toast notification with the specified message and type'
 }];
 const providerProps = [{
  name: 'children',
  type: 'React.ReactNode',
  required: true,
  description: 'Child components that can access the toast context'
 }];
 return <div className="space-y-12">
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">GhostToast</h1>
 <p className="lead text-ghost-white/90">
 Toast notification system with provider, hook, and themed notification styles.
 </p>
 </div>

 <section className="space-y-6">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Wrap your app with <code className="font-mono text-ghost-green">GhostToastProvider</code> and use the <code className="font-mono text-ghost-green">useGhostToast</code> hook to display notifications.
 </p>
 </section>

 <ComponentPlayground preview={<GhostToastProvider>
 {/* Full-screen container with dark background and gradient */}
 <div className="p-8 border-ghost-orange/30">
 {/* Background Texture */}
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-[#050505] to-[#050505]" />

 {/* Centered content */}
 <DemoControls />
 </div>
 </GhostToastProvider>} code={`import { GhostToastProvider, useGhostToast } from 'ghostui-react';

 function MyApp() {
  return (
   <GhostToastProvider>
   <MyComponent />
   </GhostToastProvider>
  );
 }

 function MyComponent() {
  const { addToast } = useGhostToast();

  return (
   <div>
   <button onClick={() => addToast('The spirits whisper your name...', 'info')}>
   Summon Spirit
   </button>
   <button onClick={() => addToast('The ritual is complete!', 'success')}>
   Blessed Omen
   </button>
   <button onClick={() => addToast('DO NOT LOOK BEHIND YOU.', 'curse')}>
   Invoke Curse
   </button>
   </div>
  );
 }`} api={<PropsTable props={providerProps} />} />

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Toast Types</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Three notification types are available, each with a themed ghost character and speech bubble.
 </p>
 <ComponentPlayground preview={<GhostToastProvider>
 <div className="p-8 border-ghost-orange/30">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-[#050505] to-[#050505]" />
 <ToastTypesDemo />
 </div>
 </GhostToastProvider>} code={`import { GhostToastProvider, useGhostToast } from 'ghostui-react';

 function ToastDemo() {
  const { addToast } = useGhostToast();

  return (
   <div className="flex gap-4">
   <button onClick={() => addToast('Info message', 'info')}>
   Info Toast
   </button>
   <button onClick={() => addToast('Success message', 'success')}>
   Success Toast
   </button>
   <button onClick={() => addToast('Warning message', 'curse')}>
   Curse Toast
   </button>
   </div>
  );
 }

 export default function App() {
  return (
   <GhostToastProvider>
   <ToastDemo />
   </GhostToastProvider>
  );
 }`} />
 </section>

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">useGhostToast Hook</h2>
 <p className="text-ghost-white/80 leading-relaxed">
 Use within a <code className="font-mono text-ghost-green">GhostToastProvider</code> to access the notification system.
 </p>
 <PropsTable props={hookProps} />

 <div className="mt-6">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Available Types</h3>
 <ul className="space-y-2 text-ghost-white/80">
 <li><code className="text-purple-400">'info'</code> - Purple-themed toast for informational messages (default)</li>
 <li><code className="text-green-400">'success'</code> - Green-themed toast for success messages</li>
 <li><code className="text-red-400">'curse'</code> - Red-themed toast for warnings or errors</li>
 </ul>
 </div>
 </section>

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Features</h2>

 <ul className="space-y-2 text-ghost-white/80">
 <li><strong>Animated Ghost Character:</strong> Each toast features a custom SVG ghost with blinking eyes</li>
 <li><strong>Randomized Positioning:</strong> Toasts appear from either left or right with varied scale, rotation, and offset</li>
 <li><strong>Speech Bubble Design:</strong> Messages appear in themed speech bubbles connected to the ghost</li>
 <li><strong>Spring Animations:</strong> Smooth entrance and exit animations using Framer Motion</li>
 <li><strong>Auto-dismiss:</strong> Toasts automatically disappear after 5 seconds</li>
 <li><strong>Manual Dismiss:</strong> Click the X button to dismiss toasts immediately</li>
 </ul>
 </section>
 </div>;
}