'use client';

import { useState } from 'react';
import { SpookyTooltip, GooeyButton } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
export default function SpookyTooltipPage() {
 const props = [{
  name: 'content',
  type: 'React.ReactNode',
  default: 'Required',
  description: 'Tooltip content to display (string or React node)'
 }, {
  name: 'children',
  type: 'React.ReactNode',
  default: 'Required',
  description: 'Element to attach tooltip to'
 }, {
  name: 'position',
  type: "'top' | 'bottom' | 'left' | 'right'",
  default: "'top'",
  description: 'Tooltip position relative to the child element'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes for custom styling'
 }];
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">SpookyTooltip</h1>

 <p className="lead">
 A themed tooltip component with spectral glow effects and flexible positioning.
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-4 h-[200px]">
 <SpookyTooltip content="Hover for magic!" position="top">
 <GooeyButton>Top Tooltip</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip content="Spectral wisdom awaits" position="bottom">
 <GooeyButton variant="blood">Bottom Tooltip</GooeyButton>
 </SpookyTooltip>
 </div>} code={`import { SpookyTooltip, GooeyButton } from 'ghostui-react';

 export default function Example() {
  return (
   <SpookyTooltip content="Click to summon spirits" position="top">
   <GooeyButton>Hover Me</GooeyButton>
   </SpookyTooltip>
  );
 }`} api={<PropsTable props={props} />} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Positioning</h2>

 <p>
 Control tooltip placement with the <code>position</code> prop.
 The tooltip automatically adjusts to stay within the viewport:
 </p>

 <ComponentPlayground preview={<div className="flex flex-wrap items-center justify-center gap-12 py-12">
 <SpookyTooltip content="Top position" position="top">
 <GooeyButton variant="ectoplasm">Top</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content="Bottom position" position="bottom">
 <GooeyButton variant="ectoplasm">Bottom</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content="Left position" position="left" className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
 <GooeyButton variant="ectoplasm">Left</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content="Right position" position="right">
 <GooeyButton variant="ectoplasm">Right</GooeyButton>
 </SpookyTooltip>
 </div>} code={`<SpookyTooltip content="Top position" position="top">
 <GooeyButton>Top</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip content="Bottom position" position="bottom">
 <GooeyButton>Bottom</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip content="Left position" position="left">
 <GooeyButton>Left</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip content="Right position" position="right">
 <GooeyButton>Right</GooeyButton>
 </SpookyTooltip>`} className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Simple String Content</h2>

 <p>
 The most common use case is displaying simple text tooltips:
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-4 py-8">
 <SpookyTooltip content="Save your work">
 <GooeyButton variant="slime">Save</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content="This action cannot be undone">
 <GooeyButton variant="blood">Delete</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content="Cancel and return">
 <GooeyButton variant="ectoplasm">Cancel</GooeyButton>
 </SpookyTooltip>
 </div>} code={`<SpookyTooltip content="Save your work">
 <GooeyButton variant="slime">Save</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip content="This action cannot be undone">
 <GooeyButton variant="blood">Delete</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip content="Cancel and return">
 <GooeyButton variant="ectoplasm">Cancel</GooeyButton>
 </SpookyTooltip>`} className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Complex Content</h2>

 <p>
 Tooltips support React nodes for rich content including formatted text, icons, and multiple lines:
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-4 py-8">
 <SpookyTooltip content={<div>
 <strong>Keyboard Shortcut</strong>
 <br />
 Press <code>Ctrl+S</code> to save
 </div>} position="top">
 <GooeyButton variant="slime">Save</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content={<div>
 <strong>Warning!</strong>
 <br />
 • This will delete all data
 <br />
 • Cannot be undone
 </div>} position="bottom">
 <GooeyButton variant="blood">Delete All</GooeyButton>
 </SpookyTooltip>
 </div>} code={`<SpookyTooltip
 content={
  <div>
  <strong>Keyboard Shortcut</strong>
  <br />
  Press <code>Ctrl+S</code> to save
  </div>
 }
 position="top"
 >
 <GooeyButton variant="slime">Save</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip
 content={
  <div>
  <strong>Warning!</strong>
  <br />
  • This will delete all data
  <br />
  • Cannot be undone
  </div>
 }
 position="bottom"
 >
 <GooeyButton variant="blood">Delete All</GooeyButton>
 </SpookyTooltip>`} className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Custom Styling</h2>

 <p>
 Use the <code>className</code> prop to apply custom styles to the tooltip:
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-4 py-8">
 <SpookyTooltip content="Custom styled tooltip" className="bg-purple-900 text-purple-100 border-purple-500">
 <GooeyButton variant="ectoplasm">Purple Theme</GooeyButton>
 </SpookyTooltip>
 <SpookyTooltip content="Another custom style" className="bg-red-900 text-red-100 border-red-500">
 <GooeyButton variant="blood">Red Theme</GooeyButton>
 </SpookyTooltip>
 </div>} code={`<SpookyTooltip
 content="Custom styled tooltip"
 className="bg-purple-900 text-purple-100 border-purple-500"
 >
 <GooeyButton variant="ectoplasm">Purple Theme</GooeyButton>
 </SpookyTooltip>

 <SpookyTooltip
 content="Another custom style"
 className="bg-red-900 text-red-100 border-red-500"
 >
 <GooeyButton variant="blood">Red Theme</GooeyButton>
 </SpookyTooltip>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Integration with Components</h2>

 <p>
 Most GhostUI interactive components support tooltips through built-in props,
 eliminating the need to wrap them manually. However, SpookyTooltip can be used
 directly for custom elements or when you need more control:
 </p>

 <ComponentPlayground preview={<div className="flex items-center justify-center gap-4 py-8">
 <SpookyTooltip content="Custom element with tooltip">
 <div className="p-8 border-ghost-orange/30 rounded-lg">
 Custom Element
 </div>
 </SpookyTooltip>
 </div>} code={`<SpookyTooltip content="Custom element with tooltip">
 <div className="px-4 py-2 bg-ghost-gray/20 rounded cursor-pointer">
 Custom Element
 </div>
 </SpookyTooltip>`} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p>
 SpookyTooltip follows accessibility best practices:
 </p>

 <ul>
 <li>Proper ARIA attributes (aria-describedby, role="tooltip")</li>
 <li>Tooltips appear on both hover and keyboard focus</li>
 <li>Screen reader accessible content</li>
 <li>Keyboard navigation support (focus/blur events)</li>
 <li>Unique IDs for proper ARIA linking</li>
 <li>Respects prefers-reduced-motion for animations</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Usage Notes</h2>

 <ul>
 <li>Tooltips only render when visible (performance optimized)</li>
 <li>Automatically adjusts position to stay within viewport</li>
 <li>Supports both string and React node content</li>
 <li>Works with any child element (buttons, inputs, custom components)</li>
 <li>Smooth fade-in/fade-out animations with spectral glow</li>
 </ul>
 </div>;
}