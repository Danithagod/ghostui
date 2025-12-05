'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GooeyProgressBar, GooeyButton } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function GooeyProgressBarPage() {
 const [progressValue, setProgressValue] = useState(0);
 const [isAnimating, setIsAnimating] = useState(false);
 const animationRef = useRef<number | null>(null);
 const startTimeRef = useRef<number>(0);
 const startProgressAnimation = () => {
  if (isAnimating) return;
  setIsAnimating(true);
  setProgressValue(0);
  startTimeRef.current = performance.now();
  const duration = 2500; // 2.5 seconds for full animation

  const animate = (currentTime: number) => {
   const elapsed = currentTime - startTimeRef.current;
   const progress = Math.min(elapsed / duration * 100, 100);
   setProgressValue(Math.round(progress));
   if (progress < 100) {
    animationRef.current = requestAnimationFrame(animate);
   } else {
    setIsAnimating(false);
   }
  };
  animationRef.current = requestAnimationFrame(animate);
 };
 useEffect(() => {
  return () => {
   if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
   }
  };
 }, []);
 const props = [{
  name: 'value',
  type: 'number',
  default: '-',
  description: 'Progress value between 0 and 100 representing completion percentage. Values outside this range are automatically clamped.'
 }, {
  name: 'variant',
  type: "'blood' | 'candle' | 'soul'",
  default: "'blood'",
  description: 'Visual theme variant. Blood features dark red viscous effects with dripping, candle shows pale wax with drips, and soul displays indigo with floating particles.'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes for custom styling. Merged with default styles using tailwind-merge.'
 }];
 const basicUsageCode = `import { GooeyProgressBar } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <GooeyProgressBar value={75} variant="blood" />
  );
 }`;
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">GooeyProgressBar</h1>

 <p className="lead">
 An animated progress indicator with three thematic variants featuring advanced visual effects
 including 3D goo morphing, dripping animations, and particle effects. Perfect for adding
 supernatural flair to loading states and progress tracking.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[400px] w-full">
 <div className="w-full max-w-md space-y-8">
 {/* All three variants with synchronized progress */}
 <GooeyProgressBar value={progressValue} variant="blood" />
 <GooeyProgressBar value={progressValue} variant="candle" />
 <GooeyProgressBar value={progressValue} variant="soul" />

 {/* Button to trigger animation */}
 <div className="mt-8 flex justify-center">
 <GooeyButton variant="ectoplasm" onClick={startProgressAnimation} disabled={isAnimating}>
 {isAnimating ? 'Summoning...' : 'Start Ritual'}
 </GooeyButton>
 </div>

 {/* Interactive slider control */}
 <div className="mt-8 space-y-4">
 <div className="flex items-center justify-between">
 <label htmlFor="progress-slider" className="text-ghost-white font-medium">
 Progress Value:
 </label>
 <span className="text-ghost-white text-xl font-bold">
 {progressValue}%
 </span>
 </div>
 <input id="progress-slider" type="range" min="0" max="100" value={progressValue} onChange={e => setProgressValue(Number(e.target.value))} disabled={isAnimating} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50" />
 </div>
 </div>
 </div>} code={basicUsageCode} api={<PropsTable props={props} />} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Variants</h2>
 <p className="text-ghost-white/80">
 GooeyProgressBar comes with three distinct thematic variants, each with unique visual effects
 and animations that bring different supernatural aesthetics to your progress indicators.
 </p>

 <div className="space-y-12 mt-8">
 {/* Blood Variant */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Blood</h3>
 <p className="text-ghost-white/70 mb-6">
 The blood variant features a dark red viscous appearance with 3D goo morphing effects
 and animated dripping. Perfect for horror themes, health bars, or danger indicators.
 Uses SVG filters to create a realistic liquid texture with specular lighting.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md">
 <GooeyProgressBar value={65} variant="blood" />
 </div>
 </div>} code={`<GooeyProgressBar value={65} variant="blood" />`} />
 </div>


 {/* Candle Variant */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Candle</h3>
 <p className="text-ghost-white/70 mb-6">
 The candle variant displays a pale wax-colored progress bar with warm orange glow
 and melting wax drip animations. Ideal for mystical themes, ritual progress, or
 warm atmospheric interfaces. Features the same 3D goo effects as blood but with
 softer, warmer tones.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md">
 <GooeyProgressBar value={80} variant="candle" />
 </div>
 </div>} code={`<GooeyProgressBar value={80} variant="candle" />`} previewClassName="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />
 </div>

 {/* Soul Variant */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Soul</h3>
 <p className="text-ghost-white/70 mb-6">
 The soul variant showcases an indigo progress bar with floating spirit particles
 that drift across the fill. Perfect for magical themes, spiritual energy, or ethereal
 interfaces. Unlike blood and candle, this variant uses clean edges with particle
 effects and a noise texture overlay for a ghostly appearance.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md">
 <GooeyProgressBar value={45} variant="soul" />
 </div>
 </div>} code={`<GooeyProgressBar value={45} variant="soul" />`} />
 </div>
 </div>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Usage Examples</h2>
 <p className="text-ghost-white/80">
 Explore different ways to use GooeyProgressBar in your application, from basic implementation
 to advanced customization and integration patterns.
 </p>

 <div className="space-y-12 mt-8">
 {/* Basic Import and Usage */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Basic Import and Usage</h3>
 <p className="text-ghost-white/70 mb-6">
 Import the component from the GhostUI package and provide a value between 0 and 100.
 The component will automatically clamp values outside this range.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md">
 <GooeyProgressBar value={60} />
 </div>
 </div>} code={`import { GooeyProgressBar } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <GooeyProgressBar value={60} />
  );
 }`} />
 </div>

 {/* Button Triggered Progress */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Button Triggered Progress</h3>
 <p className="text-ghost-white/70 mb-6 text-xl md:text-2xl font-semibold text-ghost-white">
 Combine GooeyProgressBar with GooeyButton to create interactive progress animations.
 Perfect for loading states, form submissions, or ritual-themed interactions.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md space-y-6">
 <GooeyProgressBar value={progressValue} variant="blood" />
 <div className="flex justify-center">
 <GooeyButton variant="blood" onClick={startProgressAnimation} disabled={isAnimating}>
 {isAnimating ? 'Loading...' : 'Trigger Progress'}
 </GooeyButton>
 </div>
 </div>
 </div>} code={`import { useState, useEffect, useRef } from 'react';
 import { GooeyProgressBar, GooeyButton } from 'ghostui-react';

 export default function ProgressWithButton() {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
   if (isAnimating) return;
   setIsAnimating(true);
   setProgress(0);

   let current = 0;
   animationRef.current = setInterval(() => {
    current += 2;
    setProgress(current);
    if (current >= 100) {
     clearInterval(animationRef.current!);
     setIsAnimating(false);
    }
   }, 50);
  };

  useEffect(() => {
   return () => {
    if (animationRef.current) clearInterval(animationRef.current);
   };
  }, []);

  return (
   <div className="space-y-6">
   <GooeyProgressBar value={progress} variant="blood" />
   <GooeyButton
   variant="blood"
   onClick={startAnimation}
   disabled={isAnimating}
   >
   {isAnimating ? 'Loading...' : 'Trigger Progress'}
   </GooeyButton>
   </div>
  );
 }`} previewClassName="md:text-3xl text-ghost-orange tracking-wide text-xl md:text-2xl font-semibold text-ghost-white" />
 </div>

 {/* Custom className */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Custom Styling with className</h3>
 <p className="text-ghost-white/70 mb-6">
 Add custom Tailwind classes to adjust spacing, sizing, or add additional effects.
 The className prop is merged with default styles, so you can extend without breaking
 core functionality.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md space-y-6">
 <GooeyProgressBar value={70} variant="soul" className="scale-110 opacity-90" />
 <GooeyProgressBar value={85} variant="candle" className="shadow-2xl shadow-orange-500/50" />
 </div>
 </div>} code={`import { GooeyProgressBar } from 'ghostui-react';

 export default function CustomStyledProgress() {
  return (
   <div className="space-y-6">
   <GooeyProgressBar
   value={70}
   variant="soul"
   className="scale-110 opacity-90"
   />
   <GooeyProgressBar
   value={85}
   variant="candle"
   className="shadow-2xl shadow-orange-500/50"
   />
   </div>
  );
 }`} />
 </div>

 {/* Integration with Other Components */}
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Integration with Other Components</h3>
 <p className="text-ghost-white/70 mb-6">
 Combine GooeyProgressBar with other GhostUI components to create rich, thematic interfaces.
 Here's an example showing progress bars integrated with cards and text elements.
 </p>
 <ComponentPlayground preview={<div className="flex items-center justify-center py-8 w-full">
 <div className="w-full max-w-md space-y-6">
 <div className="border-ghost-orange/30">
 <div className="flex items-center justify-between">
 <h4 className="text-ghost-white font-display text-lg">Health</h4>
 <span className="text-red-400 font-mono text-sm">650/1000</span>
 </div>
 <GooeyProgressBar value={65} variant="blood" />
 </div>

 <div className="border-ghost-orange/30">
 <div className="flex items-center justify-between">
 <h4 className="text-ghost-white font-display text-lg">Mana</h4>
 <span className="text-indigo-400 font-mono text-sm">420/500</span>
 </div>
 <GooeyProgressBar value={84} variant="soul" />
 </div>

 <div className="border-ghost-orange/30">
 <div className="flex items-center justify-between">
 <h4 className="text-ghost-white font-display text-lg">Ritual Progress</h4>
 <span className="text-orange-400 font-mono text-sm">3/4 Candles</span>
 </div>
 <GooeyProgressBar value={75} variant="candle" />
 </div>
 </div>
 </div>} code={`import { GooeyProgressBar } from 'ghostui-react';

 export default function GameStats() {
  return (
   <div className="space-y-6">
   {/* Health Bar */}
   <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
   <div className="flex items-center justify-between">
   <h4 className="text-ghost-white font-display text-lg">Health</h4>
   <span className="text-red-400 font-mono text-sm">650/1000</span>
   </div>
   <GooeyProgressBar value={65} variant="blood" />
   </div>

   {/* Mana Bar */}
   <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
   <div className="flex items-center justify-between">
   <h4 className="text-ghost-white font-display text-lg">Mana</h4>
   <span className="text-indigo-400 font-mono text-sm">420/500</span>
   </div>
   <GooeyProgressBar value={84} variant="soul" />
   </div>

   {/* Ritual Progress */}
   <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
   <div className="flex items-center justify-between">
   <h4 className="text-ghost-white font-display text-lg">Ritual Progress</h4>
   <span className="text-orange-400 font-mono text-sm">3/4 Candles</span>
   </div>
   <GooeyProgressBar value={75} variant="candle" />
   </div>
   </div>
  );
 }`} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white border-ghost-orange/30" />
 </div>
 </div>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>
 <p className="text-ghost-white/80">
 GooeyProgressBar is designed with accessibility in mind, ensuring that all users can
 understand the progress state regardless of how they interact with your application.
 </p>

 <div className="mt-8 space-y-6">
 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Semantic HTML Structure</h3>
 <p className="text-xl md:text-2xl font-semibold text-ghost-white">
 The component uses semantic HTML elements with proper structure to ensure screen
 readers and assistive technologies can correctly interpret the progress information.
 The progress bar is built with div elements that maintain a clear visual hierarchy.
 </p>
 </div>

 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Label and Percentage Display</h3>
 <p className="border-ghost-orange/30">
 Each progress bar includes a visible label header that displays the variant name
 and the current percentage value. This ensures users can understand the progress
 state without relying solely on visual fill indicators. The percentage is calculated
 from the clamped value and displayed using Math.round for clarity.
 </p>
 </div>

 <div className="p-8 rounded-lg">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Icon Usage for Visual Identification</h3>
 <p>
 Each variant includes a thematic icon (Skull for blood, Flame for candle, Ghost for soul)
 that provides quick visual identification of the progress bar type. These icons from
 lucide-react are rendered alongside the variant label to enhance recognition and
 reinforce the thematic design.
 </p>
 </div>

 <div>
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Key Accessibility Features</h3>
 <ul className="list-disc list-inside space-y-2 text-ghost-white/70">
 <li>
 <strong className="text-ghost-white">Text-based progress indication:</strong> Numeric
 percentage displayed prominently alongside the visual progress bar
 </li>
 <li>
 <strong className="text-ghost-white">Variant labeling:</strong> Clear text labels
 (BLOOD, CANDLE, SOUL) identify each progress bar type
 </li>
 <li>
 <strong className="text-ghost-white">Icon reinforcement:</strong> Thematic icons
 provide additional visual context for variant identification
 </li>
 <li>
 <strong className="text-ghost-white">High contrast colors:</strong> Each variant
 uses distinct, high-contrast colors for better visibility
 </li>
 <li>
 <strong className="text-ghost-white">Smooth animations:</strong> Spring-based
 animations respect user preferences and provide natural motion feedback
 </li>
 <li>
 <strong className="text-ghost-white">Value clamping:</strong> Automatic clamping
 ensures progress values are always valid and predictable
 </li>
 <li>
 <strong className="text-ghost-white">Completion feedback:</strong> Visual burst
 effect at 100% provides clear completion indication
 </li>
 </ul>
 </div>

 <div className="border-ghost-orange/30">
 <p className="text-ghost-white/70 text-sm">
 <strong className="text-ghost-white">Note:</strong> While the component provides
 visual accessibility features, consider adding ARIA attributes (such as role="progressbar",
 aria-valuenow, aria-valuemin, and aria-valuemax) when integrating into your application
 for enhanced screen reader support.
 </p>
 </div>
 </div>
 </div>;
}