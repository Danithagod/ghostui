'use client';

import { GooeyDrawer } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { useState } from 'react';
export default function GooeyDrawerPage() {
 // Props data array for PropsTable
 const props = [{
  name: 'isOpen',
  type: 'boolean',
  default: '-',
  description: 'Controls drawer visibility. When true, the drawer animates into view; when false, it animates out and is removed from the DOM.'
 }, {
  name: 'onClose',
  type: '() => void',
  default: '-',
  description: 'Callback function invoked when the drawer should close. Triggered by backdrop click, close button click, or Escape key press.'
 }, {
  name: 'placement',
  type: "'right' | 'left' | 'bottom' | 'top'",
  default: "'right'",
  description: 'Screen edge from which the drawer appears. Determines positioning, sizing, and animation direction.'
 }, {
  name: 'children',
  type: 'React.ReactNode',
  default: '-',
  description: 'Content to render inside the drawer\'s scrollable body area.'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes to apply to the drawer container for customization.'
 }];

 // Basic usage code example
 const basicUsageCode = `import { GooeyDrawer } from 'ghostui-react';
 import { useState } from 'react';

 export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <>
   <button onClick={() => setIsOpen(true)}>
   Open Drawer
   </button>

   <GooeyDrawer
   isOpen={isOpen}
   onClose={() => setIsOpen(false)}
   placement="right"
   >
   <div className="space-y-4">
   <h3 className="text-xl font-semibold text-white">
   Drawer Content
   </h3>
   <p className="text-white/70">
   Your content goes here. The drawer supports any React elements.
   </p>
   </div>
   </GooeyDrawer>
   </>
  );
 }`;
 return <div className="space-y-12">
 {/* Header Section */}
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
 GooeyDrawer
 </h1>
 <p className="lead text-ghost-white/90">
 An animated overlay component that slides into view from any edge of the screen with distinctive liquid dripping effects.
 Unlike traditional drawers, GooeyDrawer floats near screen edges with rounded corners and features animated liquid drips
 that create a supernatural, melting appearance powered by SVG filters with specular lighting.
 </p>
 </div>

 {/* Basic Usage Section */}
 <div className="space-y-6">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>

 <p className="text-ghost-white/70">
 GooeyDrawer is a controlled component that requires you to manage its open/closed state.
 Use the <code className="text-ghost-purple">isOpen</code> prop to control visibility and
 the <code className="text-ghost-purple">onClose</code> callback to handle close events.
 </p>

 <BasicUsageDemo code={basicUsageCode} props={props} />
 </div>

 {/* Key Features */}
 <div className="space-y-6">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Key Features</h2>

 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2">
 Liquid Drips
 </h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed">
 12 animated drip elements with randomized timing and positioning create a natural melting effect
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2 text-2xl md:text-3xl font-display tracking-wide">
 SVG Filters
 </h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed p-8 border-ghost-orange/30">
 Advanced filter pipeline with specular lighting creates realistic 3D liquid appearance with highlights
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2">
 Four Placements
 </h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed p-8 border-ghost-orange/30">
 Position the drawer from any edge: right, left, top, or bottom with automatic sizing and centering
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-orange font-semibold mb-2">
 Spring Animations
 </h4>
 <p className="text-ghost-white/70 text-sm leading-relaxed p-8 border-ghost-orange/30">
 Smooth physics-based transitions with natural bounce using Framer Motion spring animations
 </p>
 </div>
 </div>
 </div>

 {/* Placement Options Section */}
 <div className="rounded-lg">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Placement Options</h2>

 <p className="text-ghost-white/70">
 The GooeyDrawer can appear from any edge of the screen. Use the <code className="text-ghost-purple">placement</code> prop
 to control which edge the drawer slides in from. Each placement automatically adjusts the drawer's size, position, and
 animation direction for optimal user experience.
 </p>

 <div className="space-y-4">
 <ul className="space-y-3 text-ghost-white/70">
 <li className="flex items-start gap-3">
 <span className="text-ghost-purple font-mono text-sm mt-0.5">'right'</span>
 <span className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 (Default) Drawer appears from the right edge, vertically centered. Sized at 350px wide × 70vh tall.
 Ideal for navigation menus and settings panels.
 </span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-ghost-purple font-mono text-sm mt-0.5">'left'</span>
 <span>
 Drawer appears from the left edge, vertically centered. Sized at 350px wide × 70vh tall.
 Perfect for primary navigation and sidebars.
 </span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-ghost-purple font-mono text-sm mt-0.5">'bottom'</span>
 <span>
 Drawer appears from the bottom edge, horizontally centered. Sized at 80vw (max 672px) wide × 50vh tall.
 Great for mobile-friendly sheets and action panels.
 </span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-ghost-purple font-mono text-sm mt-0.5">'top'</span>
 <span>
 Drawer appears from the top edge, horizontally centered. Sized at 80vw (max 672px) wide × 50vh tall.
 Useful for notifications and announcements.
 </span>
 </li>
 </ul>
 </div>

 <PlacementDemo />
 </div>

 {/* Custom Content Section */}
 <div className="space-y-6">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Custom Content</h2>

 <p className="text-ghost-white/70">
 The GooeyDrawer supports any React content in its body area. The content area is fully scrollable,
 allowing you to display navigation menus, forms, notifications, or any other content that fits your use case.
 Below are examples of common content patterns.
 </p>

 <CustomContentDemo />
 </div>

 {/* Accessibility Section */}
 <div className="space-y-6 text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p className="text-ghost-white/70">
 The GooeyDrawer follows WCAG guidelines with keyboard navigation, screen reader support, and motion preferences.
 </p>

 <div className="space-y-3">
 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-purple font-semibold mb-2">Keyboard Support</h4>
 <ul className="text-ghost-white/70 text-sm space-y-1">
 <li><kbd className="px-2 py-1 bg-ghost-purple/20 border border-ghost-purple/40 rounded text-ghost-purple font-mono text-xs">Esc</kbd> closes the drawer</li>
 <li><kbd className="px-2 py-1 bg-ghost-purple/20 border border-ghost-purple/40 rounded text-ghost-purple font-mono text-xs">Tab</kbd> navigates interactive elements</li>
 </ul>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-purple font-semibold mb-2">Screen Readers</h4>
 <p className="text-ghost-white/70 text-sm">
 SVG filters are hidden with <span className="font-mono text-ghost-purple">aria-hidden="true"</span>.
 The close button includes proper labeling for assistive technologies.
 </p>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <h4 className="text-ghost-purple font-semibold mb-2">Reduced Motion</h4>
 <p className="text-ghost-white/70 text-sm">
 Respects <span className="font-mono text-ghost-purple">prefers-reduced-motion</span> to minimize animations for users with motion sensitivity.
 </p>
 </div>
 </div>

 <div className="p-8 border-ghost-orange/30">
 <p className="text-ghost-white/90 text-sm">
 <span className="font-semibold text-ghost-orange">💡 Best Practice:</span> Manage focus by moving it to the drawer when opened and returning it to the trigger element when closed. Implement focus trapping to keep keyboard navigation within the drawer.
 </p>
 </div>
 </div>

 {/* Code Example for Accessibility */}
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Implementation Example</h3>

 <p className="text-ghost-white/70">
 Here's an example implementing the GooeyDrawer with accessibility enhancements:
 </p>

 <div className="p-8 border-ghost-orange/30">
 <pre className="text-sm text-ghost-white/90">
 <code>{`import { GooeyDrawer } from 'ghostui-react';
 import { useState, useRef, useEffect } from 'react';

 export default function AccessibleDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
   setIsOpen(false);
   // Return focus to trigger button
   triggerRef.current?.focus();
  };

  return (
   <>
   <button
   ref={triggerRef}
   onClick={() => setIsOpen(true)}
   className="px-4 py-2 bg-ghost-purple text-white rounded-lg"
   >
   Open Navigation
   </button>

   <GooeyDrawer
   isOpen={isOpen}
   onClose={handleClose}
   placement="right"
   >
   <div>
   <h2 id="drawer-title" className="text-xl font-semibold text-white mb-4">
   Navigation Menu
   </h2>
   <nav aria-labelledby="drawer-title">
   {/* Navigation items */}
   </nav>
   </div>
   </GooeyDrawer>
   </>
  );
 }`}</code>
 </pre>
 </div>
 </div>

 {/* Real-World Examples Section */}
 <div className="space-y-6">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Real-World Examples</h2>

 <p className="text-ghost-white/70">
 Explore practical, production-ready examples that demonstrate how to use the GooeyDrawer in real applications.
 Each example includes complete, copy-paste-ready code that you can adapt to your specific needs.
 </p>

 <RealWorldExamples />
 </div>
 </div>;
}

// Interactive demo component for basic usage
function BasicUsageDemo({
 code,
 props
}: {
 code: string;
 props: any[];
}) {
 const [isOpen, setIsOpen] = useState(false);
 return <ComponentPlayground preview={<>
 <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Open Drawer
 </button>

 <GooeyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right">
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 Welcome to the Drawer
 </h3>
 <p className="text-white/70">
 This is a basic example of the GooeyDrawer component.
 You can close it by clicking the backdrop, pressing Escape,
 or clicking the close button in the header.
 </p>
 <div className="space-y-2">
 <div className="p-8 border-ghost-orange/30">
 <p className="text-white/80 text-sm">
 ✨ Animated liquid drips
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <p className="text-white/80 text-sm">
 🎨 SVG filter effects
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <p className="text-white/80 text-sm">
 ⚡ Spring animations
 </p>
 </div>
 </div>
 </div>
 </GooeyDrawer>
 </>} code={code} api={<PropsTable props={props} className="py-12 or p-8 or p-6 border-ghost-orange/30" />} previewClassName="md:text-2xl text-ghost-white p-8 border-ghost-orange/30 text-xl font-semibold" />;
}

// Interactive demo component for placement options
function PlacementDemo() {
 const [isOpen, setIsOpen] = useState(false);
 const [placement, setPlacement] = useState<'right' | 'left' | 'bottom' | 'top'>('right');
 const openDrawer = (newPlacement: 'right' | 'left' | 'bottom' | 'top') => {
  setPlacement(newPlacement);
  setIsOpen(true);
 };
 const placementCode = `import { GooeyDrawer } from 'ghostui-react';
 import { useState } from 'react';

 export default function PlacementExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState('right');

  return (
   <>
   <div className="flex gap-3">
   <button onClick={() => { setPlacement('right'); setIsOpen(true); }}>
   Right
   </button>
   <button onClick={() => { setPlacement('left'); setIsOpen(true); }}>
   Left
   </button>
   <button onClick={() => { setPlacement('bottom'); setIsOpen(true); }}>
   Bottom
   </button>
   <button onClick={() => { setPlacement('top'); setIsOpen(true); }}>
   Top
   </button>
   </div>

   <GooeyDrawer
   isOpen={isOpen}
   onClose={() => setIsOpen(false)}
   placement={placement}
   >
   <div className="space-y-4">
   <h3 className="text-xl font-semibold text-white">
   {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
   </h3>
   <p className="text-white/70">
   This drawer slides in from the {placement} edge of the screen.
   </p>
   </div>
   </GooeyDrawer>
   </>
  );
 }`;
 return <ComponentPlayground preview={<>
 <div className="flex flex-wrap gap-3">
 <button onClick={() => openDrawer('right')} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Right
 </button>
 <button onClick={() => openDrawer('left')} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Left
 </button>
 <button onClick={() => openDrawer('bottom')} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Bottom
 </button>
 <button onClick={() => openDrawer('top')} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Top
 </button>
 </div>

 <GooeyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement={placement}>
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
 {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
 </h3>
 <p className="text-white/70">
 This drawer slides in from the <span className="text-ghost-purple font-semibold">{placement}</span> edge
 of the screen with animated liquid drips and spring physics.
 </p>
 <div className="space-y-2">
 <div className="p-8 border-ghost-orange/30">
 <p className="text-white/80 text-sm">
 <span className="font-semibold">Placement:</span> {placement}
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <p className="text-white/80 text-sm">
 <span className="font-semibold">Size:</span> {placement === 'right' || placement === 'left' ? '350px × 70vh' : '80vw × 50vh'}
 </p>
 </div>
 <div className="p-8 border-ghost-orange/30">
 <p className="text-white/80 text-sm">
 <span className="font-semibold">Animation:</span> Slides from {placement} edge
 </p>
 </div>
 </div>
 </div>
 </GooeyDrawer>
 </>} code={placementCode} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white p-8 border-ghost-orange/30" />;
}

// Interactive demo component for custom content examples
function CustomContentDemo() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [formOpen, setFormOpen] = useState(false);
 const [notificationsOpen, setNotificationsOpen] = useState(false);
 const [scrollableOpen, setScrollableOpen] = useState(false);

 // Menu items code example
 const menuCode = `import { GooeyDrawer } from 'ghostui-react';
 import { Home, Settings, User, Mail, LogOut } from 'lucide-react';

 export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
   { icon: Home, label: 'Dashboard', href: '/dashboard' },
   { icon: User, label: 'Profile', href: '/profile' },
   { icon: Mail, label: 'Messages', href: '/messages' },
   { icon: Settings, label: 'Settings', href: '/settings' },
   { icon: LogOut, label: 'Logout', href: '/logout' },
  ];

  return (
   <GooeyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
   <nav className="space-y-2">
   {menuItems.map((item) => (
    <a
    key={item.label}
    href={item.href}
    className="flex items-center gap-3 px-4 py-3 rounded-lg
    hover:bg-white/10 transition-colors group"
    >
    <item.icon className="w-5 h-5 text-ghost-purple
    group-hover:text-ghost-orange transition-colors" />
    <span className="text-white group-hover:text-white">
    {item.label}
    </span>
    </a>
   ))}
   </nav>
   </GooeyDrawer>
  );
 }`;

 // Form code example
 const formCode = `import { GooeyDrawer } from 'ghostui-react';

 export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <GooeyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
   <form className="space-y-4">
   <div>
   <label className="block text-white text-sm font-medium mb-2">
   Name
   </label>
   <input
   type="text"
   className="w-full px-4 py-2 bg-white/5 border border-white/10
   rounded-lg text-white placeholder-white/40
   focus:outline-none focus:border-ghost-purple"
   placeholder="Enter your name"
   />
   </div>

   <div>
   <label className="block text-white text-sm font-medium mb-2">
   Email
   </label>
   <input
   type="email"
   className="w-full px-4 py-2 bg-white/5 border border-white/10
   rounded-lg text-white placeholder-white/40
   focus:outline-none focus:border-ghost-purple"
   placeholder="your@email.com"
   />
   </div>

   <div>
   <label className="block text-white text-sm font-medium mb-2">
   Message
   </label>
   <textarea
   rows={4}
   className="w-full px-4 py-2 bg-white/5 border border-white/10
   rounded-lg text-white placeholder-white/40
   focus:outline-none focus:border-ghost-purple resize-none"
   placeholder="Your message..."
   />
   </div>

   <button
   type="submit"
   className="w-full px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80
   text-white rounded-lg transition-colors font-medium"
   >
   Send Message
   </button>
   </form>
   </GooeyDrawer>
  );
 }`;

 // Notifications code example
 const notificationsCode = `import { GooeyDrawer } from 'ghostui-react';
 import { Bell, Check, X, AlertCircle } from 'lucide-react';

 export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
   {
    id: 1,
    type: 'success',
    title: 'Task completed',
    message: 'Your export has finished successfully',
    time: '2 min ago',
   },
   {
    id: 2,
    type: 'warning',
    title: 'Update available',
    message: 'A new version is ready to install',
    time: '1 hour ago',
   },
   {
    id: 3,
    type: 'info',
    title: 'New message',
    message: 'You have 3 unread messages',
    time: '3 hours ago',
   },
  ];

  return (
   <GooeyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
   <div className="space-y-3">
   {notifications.map((notif) => (
    <div
    key={notif.id}
    className="p-4 bg-white/5 border border-white/10 rounded-lg
    hover:bg-white/10 transition-colors"
    >
    <div className="flex items-start justify-between gap-3">
    <div className="flex-1">
    <h4 className="text-white font-medium mb-1">
    {notif.title}
    </h4>
    <p className="text-white/70 text-sm mb-2">
    {notif.message}
    </p>
    <span className="text-white/50 text-xs">
    {notif.time}
    </span>
    </div>
    <button className="text-white/50 hover:text-white/90">
    <X className="w-4 h-4" />
    </button>
    </div>
    </div>
   ))}
   </div>
   </GooeyDrawer>
  );
 }`;

 // Scrollable content code example
 const scrollableCode = `import { GooeyDrawer } from 'ghostui-react';

 export default function ScrollableContent() {
  const [isOpen, setIsOpen] = useState(false);

  const items = Array.from({ length: 50 }, (_, i) => ({
   id: i + 1,
   title: \`Item \${i + 1}\`,
   description: 'This is a sample item in a long scrollable list',
  }));

  return (
   <GooeyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
   <div className="space-y-3">
   <p className="text-white/70 text-sm">
   The drawer body is fully scrollable. Try scrolling through
   this long list of items.
   </p>

   {items.map((item) => (
    <div
    key={item.id}
    className="p-3 bg-white/5 border border-white/10 rounded-lg
    hover:bg-white/10 transition-colors"
    >
    <h4 className="text-white font-medium">{item.title}</h4>
    <p className="text-white/60 text-sm">{item.description}</p>
    </div>
   ))}
   </div>
   </GooeyDrawer>
  );
 }`;
 return <div className="space-y-8">
 {/* Menu Items Example */}
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Navigation Menu</h3>
 <p className="text-ghost-white/70 text-sm">
 Use the drawer for navigation menus with icons and hover states. Perfect for mobile-friendly navigation.
 </p>

 <ComponentPlayground preview={<>
 <button onClick={() => setMenuOpen(true)} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Open Menu
 </button>

 <GooeyDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} placement="left">
 <nav className="space-y-2">
 {[{
  label: 'Dashboard',
  icon: '🏠'
 }, {
  label: 'Profile',
  icon: '👤'
 }, {
  label: 'Messages',
  icon: '✉️'
 }, {
  label: 'Settings',
  icon: '⚙️'
 }, {
  label: 'Logout',
  icon: '🚪'
 }].map(item => <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group text-left">
 <span className="text-xl">{item.icon}</span>
 <span className="text-white group-hover:text-white">
 {item.label}
 </span>
 </button>)}
 </nav>
 </GooeyDrawer>
 </>} code={menuCode} />
 </div>

 {/* Form Example */}
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Form Layout</h3>
 <p className="text-ghost-white/70 text-sm">
 Display forms in the drawer for quick data entry without navigating away from the current page.
 </p>

 <ComponentPlayground preview={<>
 <button onClick={() => setFormOpen(true)} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Open Form
 </button>

 <GooeyDrawer isOpen={formOpen} onClose={() => setFormOpen(false)} placement="right">
 <form className="space-y-4 text-xl md:text-2xl font-semibold text-ghost-white" onSubmit={e => e.preventDefault()}>
 <div>
 <label className="block text-white text-sm font-medium mb-2">
 Name
 </label>
 <input type="text" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-ghost-purple" placeholder="Enter your name" />
 </div>

 <div>
 <label className="block text-white text-sm font-medium mb-2">
 Email
 </label>
 <input type="email" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-ghost-purple" placeholder="your@email.com" />
 </div>

 <div>
 <label className="block text-white text-sm font-medium mb-2">
 Message
 </label>
 <textarea rows={4} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-ghost-purple resize-none" placeholder="Your message..." />
 </div>

 <button type="submit" className="w-full px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Send Message
 </button>
 </form>
 </GooeyDrawer>
 </>} code={formCode} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white" />
 </div>

 {/* Notifications Example */}
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Notifications Panel</h3>
 <p className="text-ghost-white/70 text-sm">
 Display notifications, alerts, or activity feeds in an organized, dismissible format.
 </p>

 <ComponentPlayground preview={<>
 <button onClick={() => setNotificationsOpen(true)} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Open Notifications
 </button>

 <GooeyDrawer isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} placement="right">
 <div className="space-y-3">
 {[{
  id: 1,
  title: 'Task completed',
  message: 'Your export has finished successfully',
  time: '2 min ago',
  icon: '✅'
 }, {
  id: 2,
  title: 'Update available',
  message: 'A new version is ready to install',
  time: '1 hour ago',
  icon: '⚠️'
 }, {
  id: 3,
  title: 'New message',
  message: 'You have 3 unread messages',
  time: '3 hours ago',
  icon: '💬'
 }].map(notif => <div key={notif.id} className="p-8 border-ghost-orange/30">
 <div className="flex items-start justify-between gap-3">
 <div className="flex gap-3 flex-1">
 <span className="text-xl">{notif.icon}</span>
 <div className="flex-1">
 <h4 className="text-white font-medium mb-1">
 {notif.title}
 </h4>
 <p className="text-white/70 text-sm mb-2">
 {notif.message}
 </p>
 <span className="text-white/50 text-xs">
 {notif.time}
 </span>
 </div>
 </div>
 <button className="text-white/50 hover:text-white/90 text-lg">
 ×
 </button>
 </div>
 </div>)}
 </div>
 </GooeyDrawer>
 </>} code={notificationsCode} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white p-8 border-ghost-orange/30" />
 </div>

 {/* Scrollable Content Example */}
 <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Scrollable Long Lists</h3>
 <p className="text-ghost-white/70 text-sm">
 The drawer body automatically handles overflow with smooth scrolling. The scrollbar is hidden for a cleaner appearance.
 </p>

 <ComponentPlayground preview={<>
 <button onClick={() => setScrollableOpen(true)} className="px-6 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors font-medium">
 Open Scrollable List
 </button>

 <GooeyDrawer isOpen={scrollableOpen} onClose={() => setScrollableOpen(false)} placement="right">
 <div className="space-y-3">
 <p className="text-white/70 text-sm">
 The drawer body is fully scrollable. Try scrolling through this long list of items.
 </p>

 {Array.from({
  length: 50
 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: 'This is a sample item in a long scrollable list'
 })).map(item => <div key={item.id} className="p-8 border-ghost-orange/30">
 <h4 className="text-white font-medium">{item.title}</h4>
 <p className="text-white/60 text-sm">{item.description}</p>
 </div>)}
 </div>
 </GooeyDrawer>
 </>} code={scrollableCode} previewClassName="text-xl md:text-2xl font-semibold text-ghost-white p-8 border-ghost-orange/30" />
 </div>
 </div>;
}

// Interactive demo component for real-world examples
function RealWorldExamples() {
 const [navDrawerOpen, setNavDrawerOpen] = useState(false);
 const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

 // Navigation Drawer Example Code
 const navigationDrawerCode = `import { GooeyDrawer } from 'ghostui-react';
 import { useState } from 'react';
 import { Home, Users, FileText, Settings, HelpCircle, LogOut } from 'lucide-react';

 export default function AppNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
   { icon: Home, label: 'Dashboard', href: '/dashboard', badge: null },
   { icon: Users, label: 'Team', href: '/team', badge: '3' },
   { icon: FileText, label: 'Documents', href: '/documents', badge: null },
   { icon: Settings, label: 'Settings', href: '/settings', badge: null },
   { icon: HelpCircle, label: 'Help & Support', href: '/help', badge: null },
  ];

  return (
   <>
   <button
   onClick={() => setIsOpen(true)}
   className="flex items-center gap-2 px-4 py-2 bg-ghost-purple
   hover:bg-ghost-purple/80 text-white rounded-lg transition-colors"
   >
   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
   d="M4 6h16M4 12h16M4 18h16" />
   </svg>
   Menu
   </button>

   <GooeyDrawer
   isOpen={isOpen}
   onClose={() => setIsOpen(false)}
   placement="left"
   >
   <div className="space-y-6">
   {/* User Profile Section */}
   <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
   <div className="w-12 h-12 bg-ghost-purple rounded-full flex items-center
   justify-center text-white font-semibold text-lg">
   JD
   </div>
   <div className="flex-1">
   <h3 className="text-white font-semibold">John Doe</h3>
   <p className="text-white/60 text-sm">john@example.com</p>
   </div>
   </div>

   {/* Navigation Items */}
   <nav className="space-y-1">
   {navigationItems.map((item) => (
    <a
    key={item.label}
    href={item.href}
    className="flex items-center justify-between gap-3 px-4 py-3
    rounded-lg hover:bg-white/10 transition-colors group"
    >
    <div className="flex items-center gap-3">
    <item.icon className="w-5 h-5 text-ghost-purple
    group-hover:text-ghost-orange transition-colors" />
    <span className="text-white group-hover:text-white">
    {item.label}
    </span>
    </div>
    {item.badge && (
     <span className="px-2 py-0.5 bg-ghost-orange/20 text-ghost-orange
     text-xs font-semibold rounded-full">
     {item.badge}
     </span>
    )}
    </a>
   ))}
   </nav>

   {/* Logout Button */}
   <button
   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
   border border-white/10 hover:bg-red-500/10 hover:border-red-500/30
   transition-colors group"
   >
   <LogOut className="w-5 h-5 text-white/60 group-hover:text-red-400
   transition-colors" />
   <span className="text-white group-hover:text-red-400">
   Logout
   </span>
   </button>
   </div>
   </GooeyDrawer>
   </>
  );
 }`;

 // Notification Panel Example Code
 const notificationPanelCode = `import { GooeyDrawer } from 'ghostui-react';
 import { useState } from 'react';
 import { Bell, Check, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';

 export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
   {
    id: 1,
    type: 'success',
    icon: CheckCircle,
    title: 'Deployment Successful',
    message: 'Your application has been deployed to production',
    time: '2 minutes ago',
    read: false,
   },
   {
    id: 2,
    type: 'warning',
    icon: AlertTriangle,
    title: 'High Memory Usage',
    message: 'Server memory usage is at 85%. Consider scaling up.',
    time: '15 minutes ago',
    read: false,
   },
   {
    id: 3,
    type: 'info',
    icon: Info,
    title: 'New Team Member',
    message: 'Sarah Johnson joined your workspace',
    time: '1 hour ago',
    read: true,
   },
   {
    id: 4,
    type: 'success',
    icon: Check,
    title: 'Backup Complete',
    message: 'Database backup completed successfully',
    time: '3 hours ago',
    read: true,
   },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
   setNotifications(prev =>
   prev.map(n => n.id === id ? { ...n, read: true } : n)
  );
 };

 const dismissNotification = (id: number) => {
  setNotifications(prev => prev.filter(n => n.id !== id));
 };

 const getTypeStyles = (type: string) => {
  switch (type) {
   case 'success':
   return 'bg-green-500/10 border-green-500/20 text-green-400';
   case 'warning':
   return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
   case 'info':
   return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
   default:
   return 'bg-white/5 border-white/10 text-white/70';
  }
 };

 return (
  <>
  <button
  onClick={() => setIsOpen(true)}
  className="relative px-4 py-2 bg-ghost-purple hover:bg-ghost-purple/80
  text-white rounded-lg transition-colors"
  >
  <Bell className="w-5 h-5" />
  {unreadCount > 0 && (
   <span className="absolute -top-1 -right-1 w-5 h-5 bg-ghost-orange
   text-white text-xs font-bold rounded-full flex items-center
   justify-center">
   {unreadCount}
   </span>
  )}
  </button>

  <GooeyDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  placement="right"
  >
  <div className="space-y-4">
  {/* Header */}
  <div className="flex items-center justify-between">
  <h3 className="text-xl font-semibold text-white">
  Notifications
  </h3>
  {unreadCount > 0 && (
   <span className="px-2 py-1 bg-ghost-orange/20 text-ghost-orange
   text-xs font-semibold rounded-full">
   {unreadCount} new
   </span>
  )}
  </div>

  {/* Notifications List */}
  <div className="space-y-3">
  {notifications.length === 0 ? (
   <div className="text-center py-8">
   <Bell className="w-12 h-12 text-white/20 mx-auto mb-3" />
   <p className="text-white/60">No notifications</p>
   </div>
  ) : (
   notifications.map((notif) => (
    <div
    key={notif.id}
    className={\`p-4 border rounded-lg transition-all \${
     notif.read ? 'bg-white/5 border-white/10' : getTypeStyles(notif.type)
    }\`}
    >
    <div className="flex items-start gap-3">
    <notif.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
    <div className="flex-1 min-w-0">
    <div className="flex items-start justify-between gap-2 mb-1">
    <h4 className="text-white font-medium">
    {notif.title}
    </h4>
    <button
    onClick={() => dismissNotification(notif.id)}
    className="text-white/50 hover:text-white/90 transition-colors"
    >
    <X className="w-4 h-4" />
    </button>
    </div>
    <p className="text-white/70 text-sm mb-2">
    {notif.message}
    </p>
    <div className="flex items-center justify-between">
    <span className="text-white/50 text-xs">
    {notif.time}
    </span>
    {!notif.read && (
     <button
     onClick={() => markAsRead(notif.id)}
     className="text-xs text-ghost-purple hover:text-ghost-orange
     transition-colors"
     >
     Mark as read
     </button>
    )}
    </div>
    </div>
    </div>
    </div>
   ))
  )}
  </div>
  </div>
  </GooeyDrawer>
  </>
 );
}`;
return <div className="space-y-12">
{/* Navigation Drawer Example */}
<div className="space-y-4">
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Navigation Drawer</h3>
<p className="text-ghost-white/70 text-sm">
A complete navigation drawer with user profile, menu items with badges, and logout functionality.
Perfect for application sidebars and mobile navigation menus.
</p>

<ComponentPlayground preview={<>
<button onClick={() => setNavDrawerOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
</svg>
Menu
</button>

<GooeyDrawer isOpen={navDrawerOpen} onClose={() => setNavDrawerOpen(false)} placement="left">
<div className="space-y-6">
{/* User Profile Section */}
<div className="p-8 border-ghost-orange/30">
<div className="p-8 border-ghost-orange/30 rounded-lg">
JD
</div>
<div className="flex-1">
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">John Doe</h3>
<p className="text-white/60 text-sm">john@example.com</p>
</div>
</div>

{/* Navigation Items */}
<nav className="space-y-1">
{[{
 label: 'Dashboard',
 icon: '🏠',
 badge: null
}, {
 label: 'Team',
 icon: '👥',
 badge: '3'
}, {
 label: 'Documents',
 icon: '📄',
 badge: null
}, {
 label: 'Settings',
 icon: '⚙️',
 badge: null
}, {
 label: 'Help & Support',
 icon: '❓',
 badge: null
}].map(item => <button key={item.label} className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group text-left">
<div className="flex items-center gap-3">
<span className="text-xl">{item.icon}</span>
<span className="text-white group-hover:text-white">
{item.label}
</span>
</div>
{item.badge && <span className="px-2 py-0.5 bg-ghost-orange/20 text-ghost-orange text-xs font-semibold rounded-full">
{item.badge}
</span>}
</button>)}
</nav>

{/* Logout Button */}
<button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 transition-colors group">
<span className="text-xl">🚪</span>
<span className="text-white group-hover:text-red-400">
Logout
</span>
</button>
</div>
</GooeyDrawer>
</>} code={navigationDrawerCode} previewClassName="text-xl md:text-2xl text-ghost-white p-8 border-ghost-orange/30 rounded-lg" />
</div>

{/* Notification Panel Example */}
<div className="space-y-4">
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Notification Panel</h3>
<p className="text-ghost-white/70 text-sm">
A fully-featured notification center with different notification types, read/unread states,
and dismiss functionality. Includes an unread badge on the trigger button.
</p>

<ComponentPlayground preview={<>
<button onClick={() => setNotificationPanelOpen(true)} className="relative px-4 py-2 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-colors">
<span className="text-xl">🔔</span>
<span className="absolute -top-1 -right-1 w-5 h-5 bg-ghost-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
2
</span>
</button>

<GooeyDrawer isOpen={notificationPanelOpen} onClose={() => setNotificationPanelOpen(false)} placement="right">
<div className="space-y-4">
{/* Header */}
<div className="flex items-center justify-between">
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
Notifications
</h3>
<span className="px-2 py-1 bg-ghost-orange/20 text-ghost-orange text-xs font-semibold rounded-full">
2 new
</span>
</div>

{/* Notifications List */}
<div className="space-y-3">
{[{
 id: 1,
 type: 'success',
 icon: '✅',
 title: 'Deployment Successful',
 message: 'Your application has been deployed to production',
 time: '2 minutes ago',
 read: false
}, {
 id: 2,
 type: 'warning',
 icon: '⚠️',
 title: 'High Memory Usage',
 message: 'Server memory usage is at 85%. Consider scaling up.',
 time: '15 minutes ago',
 read: false
}, {
 id: 3,
 type: 'info',
 icon: 'ℹ️',
 title: 'New Team Member',
 message: 'Sarah Johnson joined your workspace',
 time: '1 hour ago',
 read: true
}, {
 id: 4,
 type: 'success',
 icon: '✔️',
 title: 'Backup Complete',
 message: 'Database backup completed successfully',
 time: '3 hours ago',
 read: true
}].map(notif => <div key={notif.id} className={`p-4 border rounded-lg transition-all ${notif.read ? 'bg-white/5 border-white/10' : notif.type === 'success' ? 'bg-green-500/10 border-green-500/20' : notif.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
<div className="flex items-start gap-3">
<span className="text-xl">{notif.icon}</span>
<div className="flex-1 min-w-0">
<div className="flex items-start justify-between gap-2 mb-1">
<h4 className="text-white font-medium">
{notif.title}
</h4>
<button className="text-white/50 hover:text-white/90 transition-colors text-lg">
×
</button>
</div>
<p className="text-white/70 text-sm mb-2">
{notif.message}
</p>
<div className="rounded-lg">
<span className="text-white/50 text-xs p-8 border-ghost-orange/30 rounded-lg">
{notif.time}
</span>
{!notif.read && <button className="text-xs text-ghost-purple hover:text-ghost-orange transition-colors">
Mark as read
</button>}
</div>
</div>
</div>
</div>)}
</div>
</div>
</GooeyDrawer>
</>} code={notificationPanelCode} previewClassName="md:text-2xl text-ghost-white space-y-12 rounded-lg text-xl font-semibold" />
</div>

</div>;
}