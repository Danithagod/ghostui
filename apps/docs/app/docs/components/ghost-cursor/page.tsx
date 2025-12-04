'use client';

import { GhostCursor } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { useState } from 'react';
export default function GhostCursorPage() {
 const [isEnabled, setIsEnabled] = useState(false);
 const props = [{
  name: 'No props',
  type: '-',
  default: '-',
  description: 'GhostCursor is a self-contained component that requires no props. It automatically handles cursor tracking, animations, and effects.'
 }];
 return <div className="space-y-12">
 {/* Header Section */}
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
 GhostCursor
 </h1>
 <p className="lead text-ghost-white/90">
 A sophisticated custom cursor replacement featuring an animated ghost character with blinking eyes,
 smooth spring-based physics, and interactive click effects. The ghost reacts to hover states on
 clickable elements and spawns playful "BOO!" and "POOF!" particles on click.
 </p>
 </div>

 {/* Basic Usage */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Basic Usage
 </h2>

 <p className="text-ghost-white/80 leading-relaxed">
 Simply add the GhostCursor component to your app and it will automatically replace the system cursor with an animated ghost character.
 </p>

 <ComponentPlayground preview={<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
 <div className="relative h-[300px] flex items-center justify-center">
 {isEnabled && <GhostCursor />}
 <button onClick={() => setIsEnabled(!isEnabled)} className="px-6 py-3 bg-gradient-to-r from-ghost-orange/80 to-ghost-yellow/80
 text-ghost-black font-semibold rounded-lg border-2 border-ghost-orange/70
 hover:border-ghost-orange hover:shadow-[0_0_25px_rgba(255,111,0,0.6)]
 transition-all duration-300 transform hover:scale-105">
 {isEnabled ? 'Disable' : 'Enable'} Ghost Cursor
 </button>
 <p className="absolute bottom-4 text-sm text-ghost-white/60">
 {isEnabled ? 'Move your mouse around and click to see the ghost in action!' : 'Click to enable the ghost cursor'}
 </p>
 </div>
 </div>} code={`import { GhostCursor } from 'ghostui-react';

 export default function MyApp() {
  return (
   <>
   <GhostCursor />
   {/* Your app content */}
   </>
  );
 }`} />
 </section>

 {/* API Documentation */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 API
 </h2>

 <p className="text-ghost-white/80 leading-relaxed">
 GhostCursor is a zero-configuration component that works out of the box without any props.
 </p>

 <PropsTable props={props} />
 </section>

 {/* Interactive Behavior */}
 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Interactive Behavior
 </h2>
 
 <p className="text-ghost-white/80 leading-relaxed">
 The ghost cursor responds to user interactions with smooth animations and visual feedback:
 </p>

 <ul className="text-ghost-white/80 leading-relaxed space-y-3 mt-4 list-disc list-inside">
 <li>
 When hovering over clickable elements (buttons, links, or elements with <code>cursor: pointer</code>),
 the ghost scales up and rotates, providing clear visual feedback: <code>scale: 1.2, rotate: 10deg</code>
 </li>

 <li>
 On click, the ghost shrinks and rotates in the opposite direction (<code>scale: 0.8, rotate: -15deg</code>). Additionally, animated
 text particles (<code>"BOO!"</code> or <code>"POOF!"</code>) spawn at the click location and float upward before fading out.
 </li>

 <li>
 The ghost features animated blinking eyes that blink every 4 seconds, adding personality
 and making the cursor feel alive.
 </li>
 </ul>
 </section>
</div>;
}