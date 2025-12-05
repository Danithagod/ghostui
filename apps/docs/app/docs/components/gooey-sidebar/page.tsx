'use client';

import { GooeySidebar, GooeySidebarDemo, useTheme } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { useState } from 'react';
import { Home, Users, FileText, Settings as SettingsIcon, Bell, Calendar } from 'lucide-react';
export default function GooeySidebarPage() {
 const props = [{
  name: 'menuItems',
  type: 'MenuItem[]',
  default: '-',
  description: 'Array of menu items to display. Each item requires id and label properties, with an optional icon.'
 }, {
  name: 'activeId',
  type: 'string',
  default: '-',
  description: 'ID of the currently active menu item. When provided, the component operates in controlled mode.'
 }, {
  name: 'onActiveChange',
  type: '(id: string) => void',
  default: '-',
  description: 'Callback function invoked when a menu item is clicked, receiving the item\'s id.'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes to apply to the sidebar container.'
 }];
 const codeExample = `import { GooeySidebar } from 'ghostui-react';
 import { Home, Users, FileText, Settings, Bell, Calendar, BarChart, Package } from 'lucide-react';

 const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'team', label: 'Team', icon: <Users size={20} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
  { id: 'products', label: 'Products', icon: <Package size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
 ];

 export default function MyComponent() {
  return (
   <GooeySidebar menuItems={menuItems} />
  );
 }`;
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">GooeySidebar</h1>

 <p className="lead text-ghost-white/90">
 A sophisticated navigation sidebar featuring liquid morphing effects with 3D goo filters
 and spring-based physics animations. The active state indicator stretches and deforms
 organically when transitioning between menu items, creating a viscous, haunted appearance.
 Now with full theme support - colors adapt to spectral (purple/orange) or blood (red) themes.
 </p>

 <ComponentPlayground preview={<CustomMenuExample />} code={codeExample} api={<PropsTable props={props} />} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Full Demo with Content Area</h2>

 <p>
 The <code>GooeySidebarDemo</code> component provides a complete layout with sidebar and
 content area. It automatically responds to theme changes from the ThemeProvider. Use the
 theme toggle in the header to see the colors change!
 </p>

 <ComponentPlayground preview={<GooeySidebarDemo />} code={`import { GooeySidebarDemo, ThemeProvider } from 'ghostui-react';

 // Wrap your app with ThemeProvider
 function App() {
  return (
   <ThemeProvider defaultTheme="spectral">
   <GooeySidebarDemo />
   </ThemeProvider>
  );
 }

 // The demo includes:
 // - Theme-aware sidebar with goo effects
 // - Content area that updates based on selection
 // - Smooth transitions between sections`} previewClassName="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Theme Support</h2>

 <p>
 The GooeySidebar automatically adapts to the current theme from ThemeProvider:
 </p>

 <div className="border-ghost-orange/30">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Theme Colors</h3>
 <ul className="space-y-3 text-ghost-white/80">
 <li>
 <strong className="text-orange-400">Spectral Theme:</strong> Deep purple background
 with orange goo blobs. Text transitions from purple to white on active state.
 </li>
 <li>
 <strong className="text-red-400">Blood Theme:</strong> Deep red background
 with red goo blobs. Text transitions from red to white on active state.
 </li>
 </ul>
 </div>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>

 <p>
 The GooeySidebar requires a <code>menuItems</code> array to define your navigation structure.
 Each menu item needs an <code>id</code>, <code>label</code>, and optionally an <code>icon</code>:
 </p>

 <ComponentPlayground preview={<CustomMenuExample />} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white" code={`import { GooeySidebar } from 'ghostui-react';
 import { Home, Users, FileText, Settings, Bell, Calendar } from 'lucide-react';

 const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'team', label: 'Team', icon: <Users size={20} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
 ];

 export default function App() {
  return <GooeySidebar menuItems={menuItems} />;
 }`} />


 <p className="text-ghost-white/70 text-sm mt-4">
 The component automatically manages the active state, selecting the first item by default.
 Icons are optional but recommended for better visual hierarchy.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Controlled Mode</h2>

 <p>
 Use the <code>activeId</code> and <code>onActiveChange</code> props to control the active
 menu item from your application state. This is useful when you need to synchronize the
 sidebar with routing or other application logic:
 </p>

 <ComponentPlayground preview={<ControlledExample />} code={`import { GooeySidebar } from 'ghostui-react';
 import { useState } from 'react';
 import { Home, Users, FileText, Settings, Bell, Calendar } from 'lucide-react';

 const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'team', label: 'Team', icon: <Users size={20} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
 ];

 export default function ControlledExample() {
  const [activeId, setActiveId] = useState('home');

  return (
   <div className="flex gap-8">
   <GooeySidebar
   menuItems={menuItems}
   activeId={activeId}
   onActiveChange={setActiveId}
   />

   <div className="flex-1 p-8">
   <h2 className="text-2xl text-white mb-4">
   Current Page
   </h2>
   <p className="text-gray-400">
   Active menu item: <span className="text-purple-400">{activeId}</span>
   </p>
   </div>
   </div>
  );
 }`} previewClassName="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Menu Items Without Icons</h2>

 <p>
 Icons are optional. You can create menu items with labels only, and the component will
 handle the layout gracefully:
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center">
 <GooeySidebar menuItems={[{
  id: 'overview',
  label: 'Overview'
 }, {
  id: 'analytics',
  label: 'Analytics'
 }, {
  id: 'reports',
  label: 'Reports'
 }, {
  id: 'export',
  label: 'Export Data'
 }, {
  id: 'dashboard',
  label: 'Dashboard'
 }, {
  id: 'settings',
  label: 'Settings'
 }]} />
 </div>} code={`import { GooeySidebar } from 'ghostui-react';

 const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'export', label: 'Export Data' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'settings', label: 'Settings' },
 ];

 export default function NoIconsExample() {
  return <GooeySidebar menuItems={items} />;
 }`} previewClassName="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Teardrop Animation System</h2>

 <p>
 The GooeySidebar features an organic teardrop-style goo transition. When switching between
 menu items, the blob stretches and pinches like a liquid droplet, creating a viscous,
 direction-aware animation:
 </p>

 <div className="border-ghost-orange/30">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Teardrop Physics</h3>
 <ul className="space-y-3 text-ghost-white/80">
 <li>
 <strong className="text-orange-400">Head Blob:</strong> The leading element that
 moves first with spring physics (stiffness: 180, damping: 28). It dynamically
 stretches based on travel distance.
 </li>
 <li>
 <strong className="text-orange-400">Middle Connector:</strong> A slower-moving blob
 (stiffness: 100, mass: 2.5) that creates the stretchy connection between head and tail,
 giving the liquid strand effect.
 </li>
 <li>
 <strong className="text-orange-400">Trailing Tail:</strong> The heaviest element
 (mass: 4, stiffness: 60) that pinches and stretches based on direction. It scales
 horizontally (pinch) and vertically (stretch) during transitions.
 </li>
 <li className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 <strong className="text-orange-400">Extra Drip:</strong> For longer transitions
 (more than 1 item), an additional droplet appears to enhance the liquid effect.
 </li>
 </ul>
 </div>

 <p className="text-ghost-white/70 text-sm">
 <strong className="border-ghost-orange/30">Direction Awareness:</strong> The animation adapts based on whether you're moving
 up or down the menu. The tail origin point changes to create a natural teardrop shape
 that follows the direction of movement.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility Features</h2>

 <p>
 The GooeySidebar is built with accessibility in mind, ensuring all users can navigate
 effectively regardless of their input method or assistive technology:
 </p>

 <div className="border-ghost-orange/30">
 <ul className="space-y-3 text-ghost-white/80">
 <li>
 <strong className="text-orange-400">Semantic HTML:</strong> Uses proper
 <code>&lt;nav&gt;</code> and <code>&lt;button&gt;</code> elements for correct
 screen reader interpretation
 </li>
 <li>
 <strong className="text-orange-400">Keyboard Navigation:</strong> All menu items
 are keyboard accessible via Tab key with standard tab order
 </li>
 <li>
 <strong className="text-orange-400">Focus Indicators:</strong> Visible focus rings
 appear on all interactive elements with proper contrast
 </li>
 <li>
 <strong className="text-orange-400">Keyboard Activation:</strong> Menu items
 respond to both Enter and Space keys for activation
 </li>
 </ul>
 </div>
 </div>;
}

// Helper component for controlled mode example
function ControlledExample() {
 const [activeId, setActiveId] = useState('home');
 const {
  theme
 } = useTheme();
 const menuItems = [{
  id: 'home',
  label: 'Home',
  icon: <Home size={20} />
 }, {
  id: 'team',
  label: 'Team',
  icon: <Users size={20} />
 }, {
  id: 'documents',
  label: 'Documents',
  icon: <FileText size={20} />
 }, {
  id: 'notifications',
  label: 'Notifications',
  icon: <Bell size={20} />
 }, {
  id: 'calendar',
  label: 'Calendar',
  icon: <Calendar size={20} />
 }, {
  id: 'settings',
  label: 'Settings',
  icon: <SettingsIcon size={20} />
 }];
 const accentColor = theme === 'blood' ? 'text-red-400' : 'text-orange-400';
 return <div className="flex gap-8 w-full">
 <GooeySidebar menuItems={menuItems} activeId={activeId} onActiveChange={setActiveId} />

 <div className="border-ghost-orange/30">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 Current Page
 </h2>
 <p className="text-gray-400">
 Active menu item: <span className={`${accentColor} font-mono`}>{activeId}</span>
 </p>
 <p className="text-gray-500 text-sm mt-2">
 Theme: <span className="font-mono">{theme}</span>
 </p>
 </div>
 </div>;
}

// Helper component for custom menu items example
function CustomMenuExample() {
 const customItems = [{
  id: 'home',
  label: 'Home',
  icon: <Home size={20} />
 }, {
  id: 'team',
  label: 'Team',
  icon: <Users size={20} />
 }, {
  id: 'documents',
  label: 'Documents',
  icon: <FileText size={20} />
 }, {
  id: 'settings',
  label: 'Settings',
  icon: <SettingsIcon size={20} />
 }, {
  id: 'notifications',
  label: 'Notifications',
  icon: <Bell size={20} />
 }, {
  id: 'calendar',
  label: 'Calendar',
  icon: <Calendar size={20} />
 }];
 return <div className="space-y-12">
 <GooeySidebar menuItems={customItems} />
 </div>;
}