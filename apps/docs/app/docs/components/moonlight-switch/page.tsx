'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Droplet } from 'lucide-react';
import { MoonlightSwitch, useTheme } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { cn } from '@/lib/utils';
export default function MoonlightSwitchDemo() {
 const {
  theme,
  setTheme
 } = useTheme();
 const [demoChecked, setDemoChecked] = useState(false);

 // Map theme to spectral state: spectral = purple, blood = red
 const isSpectral = theme === 'spectral';
 const setIsSpectral = (value: boolean) => setTheme(value ? 'spectral' : 'blood');
 const bgClass = isSpectral ? "bg-[#1a0b2e] text-purple-100" : "bg-[#1f0a0a] text-red-100";
 const props = [{
  name: 'checked',
  type: 'boolean',
  default: 'false',
  description: 'Switch state'
 }, {
  name: 'onChange',
  type: '(checked: boolean) => void',
  default: '-',
  description: 'Callback when switch is toggled'
 }, {
  name: 'disabled',
  type: 'boolean',
  default: 'false',
  description: 'Disable the switch'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes'
 }];
 return <div className="space-y-12">
 <div className="prose prose-invert max-w-none px-8">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">MoonlightSwitch</h1>

 <p className="lead text-ghost-white/90">
 A mystical toggle switch with moonlight glow effects and smooth transitions. Perfect for theme switching and binary state controls with an ethereal touch.
 </p>
 </div>

 <ComponentPlayground previewSize="xl" previewClassName={cn("!p-0 flex flex-col items-center justify-center transition-colors duration-1000 font-sans relative overflow-hidden", bgClass)} preview={<>
 <div className="text-center mb-12 space-y-4 z-10">
 <h1 className={cn("text-5xl font-bold tracking-widest uppercase font-serif transition-colors duration-700", isSpectral ? "text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]")}>
 {isSpectral ? "Spectral Realm" : "Blood Realm"}
 </h1>
 <p className="opacity-60 text-sm max-w-md mx-auto tracking-widest">
 Choose your allegiance.
 </p>
 </div>

 <div className={cn("p-16 rounded-[3rem] shadow-2xl transition-all duration-700 flex flex-col items-center gap-10 relative overflow-hidden", isSpectral ? "bg-[#2e1065] border border-purple-700/50 shadow-[0_0_60px_rgba(126,34,206,0.3)]" : "bg-[#450a0a] border border-red-800/50 shadow-[0_0_60px_rgba(185,28,28,0.2)]")}>
 <div className={cn("absolute inset-0 blur-3xl opacity-20 transition-colors duration-1000 pointer-events-none", isSpectral ? "bg-purple-400" : "bg-red-500")} />

 <div className="flex items-center gap-24 text-xs font-bold tracking-[0.2em] uppercase relative z-10">
 <span className={cn("flex flex-col items-center gap-3 transition-all duration-500", !isSpectral ? "text-red-500 scale-110 opacity-100" : "text-gray-600 opacity-40 grayscale")}>
 <Droplet size={24} className={!isSpectral ? "fill-current animate-bounce" : ""} />
 Blood
 </span>

 <span className={cn("flex flex-col items-center gap-3 transition-all duration-500", isSpectral ? "text-purple-300 scale-110 opacity-100" : "text-gray-600 opacity-40 grayscale")}>
 <Ghost size={24} className={isSpectral ? "fill-current animate-pulse" : ""} />
 Spirit
 </span>
 </div>

 <div className="scale-125 relative z-20">
 <MoonlightSwitch checked={isSpectral} onChange={setIsSpectral} />
 </div>

 <div className="mt-2 text-[10px] font-mono opacity-40 uppercase tracking-widest z-10">
 Phase: {isSpectral ? 'FULL_SPECTRAL' : 'BLOOD_ECLIPSE'}
 </div>
 </div>
 </>} code={`import { useState } from 'react';
 import { MoonlightSwitch, useTheme } from 'ghostui-react';
 import { Ghost, Droplet } from 'lucide-react';

 export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  // Map theme to spectral state: spectral = purple, blood = red
  const isSpectral = theme === 'spectral';
  const setIsSpectral = (value: boolean) => setTheme(value ? 'spectral' : 'blood');

  return (
   <div className="flex flex-col items-center gap-10">
   <h1 className="text-5xl font-bold">
   {isSpectral ? "Spectral Realm" : "Blood Realm"}
   </h1>

   <div className="flex items-center gap-24">
   <span className={!isSpectral ? "text-red-500" : "text-gray-600"}>
   <Droplet size={24} />
   Blood
   </span>

   <span className={isSpectral ? "text-purple-300" : "text-gray-600"}>
   <Ghost size={24} />
   Spirit
   </span>
   </div>

   <MoonlightSwitch
   checked={isSpectral}
   onChange={setIsSpectral}
   />
   </div>
  );
 }`} api={<PropsTable props={props} />} className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide" />

 <div className="prose prose-invert max-w-none px-8">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-6 py-8">
 <MoonlightSwitch checked={demoChecked} onChange={setDemoChecked} />
 <span className="text-ghost-white/70">
 Status: {demoChecked ? 'On' : 'Off'}
 </span>
 </div>} code={`import { useState } from 'react';
 import { MoonlightSwitch } from 'ghostui-react';

 export default function Example() {
  const [checked, setChecked] = useState(false);

  return (
   <MoonlightSwitch
   checked={checked}
   onChange={setChecked}
   />
  );
 }`} api={<PropsTable props={props} />} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Theme Provider Integration</h2>

 <p>
 MoonlightSwitch can automatically connect to the ThemeProvider context for global theme management.
 When used without <code>checked</code> and <code>onChange</code> props, it will control the application theme:
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center gap-4 py-8">
 <MoonlightSwitch variant="day-night" />
 <ThemeDisplay />
 </div>} code={`// Uncontrolled mode - connects to ThemeProvider
 import { MoonlightSwitch, ThemeProvider } from 'ghostui-react';

 // In your app layout:
 <ThemeProvider defaultTheme="dark">
 <App />
 </ThemeProvider>

 // Anywhere in your app - no props needed!
 <MoonlightSwitch variant="day-night" />

 // Access theme programmatically:
 import { useTheme } from 'ghostui-react';

 function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  return <p>Current theme: {theme}</p>;
 }`} className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Controlled vs Uncontrolled</h3>

 <p>
 You can still use MoonlightSwitch in controlled mode by providing <code>checked</code> and <code>onChange</code> props:
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-6 py-8">
 <MoonlightSwitch checked={demoChecked} onChange={setDemoChecked} variant="day-night" />
 <span className="text-ghost-white/70">
 Controlled: {demoChecked ? 'On' : 'Off'}
 </span>
 </div>} code={`// Controlled mode - manages its own state
 const [checked, setChecked] = useState(false);

 <MoonlightSwitch
 checked={checked}
 onChange={setChecked}
 variant="day-night"
 />`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p>
 MoonlightSwitch follows accessibility best practices:
 </p>

 <ul>
 <li>Keyboard navigable with standard tab order</li>
 <li>Activatable via Enter or Space keys</li>
 <li>Proper ARIA attributes for screen readers</li>
 <li>Visible focus indicators</li>
 </ul>
 </div>
 </div>;
}
function ThemeDisplay() {
 const {
  theme
 } = useTheme();
 return <span className="space-y-12">
 Current theme: <code className="text-ghost-purple">{theme}</code>
 </span>;
}