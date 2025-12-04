'use client';

import { SpookyScrollbar } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function SpookyScrollbarPage() {
 const props = [{
  name: 'children',
  type: 'React.ReactNode',
  default: '-',
  description: 'The scrollable content to be displayed within the custom scrollbar container.'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes for custom styling. Merged with default styles using tailwind-merge.'
 }];
 const basicUsageCode = `import { SpookyScrollbar } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <SpookyScrollbar className="h-96">
   <div className="p-6 space-y-4">
   <p>Your scrollable content goes here...</p>
   <p>Add as much content as you need!</p>
   </div>
   </SpookyScrollbar>
  );
 }`;
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">SpookyScrollbar</h1>

 <p className="lead">
 A custom scrollbar component that replaces native browser scrollbars with a themed,
 interactive experience featuring animated ghost characters. Includes a peeking ghost
 that appears on hover and a dramatic jump scare effect when reaching the bottom of content.
 </p>

 <section className="space-y-6 mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Basic Usage
 </h2>

 <p className="text-ghost-white/80 leading-relaxed">
 Wrap your scrollable content with SpookyScrollbar and set a fixed height.
 The component will automatically handle all scrolling interactions and
 display the custom scrollbar when content overflows.
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center py-12 min-h-[600px] w-full">
 <div className="w-full max-w-2xl">
 <SpookyScrollbar className="h-[500px]">
 <div className="p-8 space-y-6">
 <div>
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Welcome to the Haunted Scroll
 </h2>
 <p className="text-ghost-white/70">
 Scroll down to explore the mysterious depths of this enchanted container.
 Hover over the scrollbar to meet a friendly ghost, and dare to reach
 the bottom to witness something truly spooky...
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter I: The Beginning</h3>
 <p className="text-ghost-white/70">
 In the realm of custom scrollbars, few dare to venture beyond the mundane.
 But you, brave soul, have chosen a path less traveled. The SpookyScrollbar
 awaits your interaction, ready to reveal its secrets.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter II: The Peeking Spirit</h3>
 <p className="text-ghost-white/70">
 As you hover over the scrollbar track, a playful spirit emerges from the shadows.
 With a cheerful "Boo! Scrolled ya!" it accompanies your journey through the content.
 This friendly ghost floats gently, providing visual feedback as you navigate.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter III: The Journey</h3>
 <p className="text-ghost-white/70">
 The scrollbar thumb glows with an ethereal light when you interact with it.
 Drag it smoothly to any position, or simply scroll naturally with your mouse wheel.
 The custom implementation ensures precise control while maintaining the spooky aesthetic.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter IV: The Descent</h3>
 <p className="text-ghost-white/70">
 As you continue scrolling, you may notice the content growing darker, more mysterious.
 The scrollbar adapts to your every movement, calculating positions with mathematical
 precision. Each pixel of your journey is tracked and reflected in the thumb position.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter V: The Warning</h3>
 <p className="text-ghost-white/70">
 You're getting closer now. The bottom approaches. Something stirs in the depths
 of this scrollable container. Ancient code awakens, preparing to reveal itself.
 The jump scare mechanism activates when you're within 10 pixels of the end...
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter VI: The Approach</h3>
 <p className="text-ghost-white/70">
 The air grows thick with anticipation. Your scroll wheel turns, bringing you
 ever closer to the inevitable conclusion. The ResizeObserver watches silently,
 ensuring the scrollbar remains accurate even as content shifts and changes.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter VII: The Threshold</h3>
 <p className="text-ghost-white/70">
 You stand at the precipice now. Just a few more pixels separate you from
 the bottom. The jump scare ghost prepares its entrance, ready to spring
 forth with dramatic flair. Framer Motion animations are primed and ready.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter VIII: Almost There</h3>
 <p className="text-ghost-white/70">
 The distance from bottom calculation runs continuously, checking if you've
 crossed the threshold. When scrollHeight minus scrollTop minus clientHeight
 becomes less than 10, the magic happens. Are you ready?
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter IX: The Moment</h3>
 <p className="text-ghost-white/70">
 This is it. The final section. As you read these words, you're mere pixels
 away from triggering the jump scare. The overlay awaits, the ghost is ready,
 and "The End Is Here" text stands prepared to make its dramatic appearance.
 </p>
 </div>

 <div className="p-6 rounded-lg bg-ghost-bg border border-ghost-border">
 <h3 className="text-xl font-semibold text-ghost-accent mb-2">Chapter X: The End</h3>
 <p className="text-ghost-white/70">
 You've reached the bottom. The jump scare should have appeared by now,
 with its dark overlay, backdrop blur, and large ghost character. If you
 scroll back up, it will disappear, allowing you to trigger it again.
 This is the power of the SpookyScrollbar - interactive, engaging, and
 delightfully spooky. Thank you for scrolling!
 </p>
 </div>
 </div>
 </SpookyScrollbar>
 </div>
 </div>} code={basicUsageCode} api={<PropsTable props={props} />} />
 </section>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Features</h2>

 <p>
 SpookyScrollbar provides a rich set of interactive features that enhance the scrolling
 experience while maintaining the spooky aesthetic of GhostUI.
 </p>

 <ul className="mb-20 pb-4">
 <li><strong>Custom Scrollbar Design</strong> - Replaces the native browser scrollbar with a custom-styled track and thumb with theme-aware colors</li>
 <li><strong>Peeking Ghost Animation</strong> - A friendly ghost appears with "Boo! Scrolled ya!&quot; when hovering over the scrollbar</li>
 <li><strong>Jump Scare Effect</strong> - Dramatic ghost appearance when scrolling within 10 pixels of the bottom</li>
 <li><strong>Smooth Drag Interaction</strong> - Click and drag the scrollbar thumb for precise scroll control</li>
 <li><strong>Visual Feedback</strong> - Rich hover effects and glowing animations on interaction</li>
 <li><strong>Dynamic Content Handling</strong> - Automatically adjusts to content changes using ResizeObserver</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide pt-10
 ">Usage Examples</h2>

 <p>
 Explore different ways to integrate SpookyScrollbar into your application.
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md">
 <SpookyScrollbar className="h-64">
 <div className="p-6 space-y-4">
 <p className="text-ghost-white">
 This is a simple example of SpookyScrollbar with basic content.
 </p>
 <p className="text-ghost-white/70">
 The scrollbar appears automatically when content exceeds the container height.
 </p>
 <p className="text-ghost-white/70">
 Try hovering over the scrollbar to see the peeking ghost!
 </p>
 <p className="text-ghost-white/70">
 You can also drag the thumb to scroll to any position.
 </p>
 <p className="text-ghost-white/70">
 Keep scrolling down to see more content and trigger the jump scare effect.
 </p>
 <p className="text-ghost-white/70">
 The component uses framer-motion for smooth animations.
 </p>
 <p className="text-ghost-white/70">
 All native scrolling functionality is preserved, including mouse wheel and keyboard navigation.
 </p>
 </div>
 </SpookyScrollbar>
 </div>
 </div>} code={`import { SpookyScrollbar } from 'ghostui-react';

 export default function BasicExample() {
  return (
   <SpookyScrollbar className="h-64">
   <div className="p-6 space-y-4">
   <p>Your scrollable content goes here...</p>
   <p>Add as much content as you need!</p>
   </div>
   </SpookyScrollbar>
  );
 }`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Technical Details</h2>

 <p>
 Understanding how SpookyScrollbar works under the hood can help you use it more effectively.
 </p>

 <ul>
 <li><strong>Scroll Calculations</strong> - Thumb height is calculated as <code>(clientHeight / scrollHeight) * trackHeight</code> with a minimum of 40px</li>
 <li><strong>ResizeObserver Integration</strong> - Automatically updates scrollbar dimensions when content changes</li>
 <li><strong>Jump Scare Trigger</strong> - Activates when <code>(scrollHeight - scrollTop - clientHeight) &lt; 10</code></li>
 <li><strong>Animation Performance</strong> - Uses framer-motion for spring animations and GPU-accelerated CSS keyframes</li>
 <li><strong>Browser Compatibility</strong> - Works in all modern browsers supporting ResizeObserver</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide pt-10">Accessibility</h2>

 <p>
 SpookyScrollbar maintains core accessibility features to ensure all users can interact with scrollable content.
 </p>

 <ul>
 <li>Keyboard navigable with standard tab order and arrow keys</li>
 <li>Supports Page Up/Down, Home/End, and spacebar navigation</li>
 <li>Screen readers can access all content normally</li>
 <li>Native mouse wheel scrolling is fully preserved</li>
 <li>Custom scrollbar is purely visual and doesn&apos;t interfere with assistive technologies</li>
 </ul>

 </div>;
}
