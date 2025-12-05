'use client';

import React, { useState } from 'react';
import { WhisperBox } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';

// Multi-Field Form Example Component
function FormExample() {
 const [submittedData, setSubmittedData] = useState<{
  name: string;
  email: string;
  subject: string;
  message: string;
 } | null>(null);
 const [charCounts, setCharCounts] = useState({
  subject: 0,
  message: 0
 });
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  setSubmittedData({
   name: formData.get('name') as string,
   email: formData.get('email') as string,
   subject: formData.get('subject') as string,
   message: formData.get('message') as string
  });

  // Reset form
  (e.target as HTMLFormElement).reset();
  setCharCounts({
   subject: 0,
   message: 0
  });
 };
 const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setCharCounts(prev => ({
   ...prev,
   subject: e.target.value.length
  }));
 };
 const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setCharCounts(prev => ({
   ...prev,
   message: e.target.value.length
  }));
 };
 return <div className="w-full max-w-5xl mx-auto space-y-6">
 <form onSubmit={handleSubmit} className="space-y-6">
 {/* Two-column layout for smaller fields */}
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <label htmlFor="name" className="block text-sm font-medium text-ghost-white/80 mb-3">
 Name *
 </label>
 <WhisperBox id="name" name="name" placeholder="Your name..." required maxLength={100} rows={1} className="w-full !min-h-[60px] !max-h-[60px] resize-none overflow-hidden" />
 </div>

 <div>
 <label htmlFor="email" className="block text-sm font-medium text-ghost-white/80 mb-3">
 Email *
 </label>
 <WhisperBox id="email" name="email" placeholder="your.email@example.com" required maxLength={100} rows={1} className="w-full !min-h-[60px] !max-h-[60px] resize-none overflow-hidden" />
 </div>
 </div>

 {/* Medium-sized field */}
 <div>
 <label htmlFor="subject" className="block text-sm font-medium text-ghost-white/80 mb-3">
 Subject *
 </label>
 <WhisperBox id="subject" name="subject" placeholder="Brief subject line... (max 150 characters)" required maxLength={150} onChange={handleSubjectChange} rows={2} className="w-full min-h-[100px]" />
 <div className="mt-2 text-xs text-ghost-white/50 text-right">
 {charCounts.subject} / 150 characters
 </div>
 </div>

 {/* Large field */}
 <div>
 <label htmlFor="message" className="block text-sm font-medium text-ghost-white/80 mb-3">
 Message *
 </label>
 <WhisperBox id="message" name="message" placeholder="Enter your detailed message... (max 1000 characters)" required maxLength={1000} onChange={handleMessageChange} rows={8} className="w-full min-h-[240px]" />
 <div className="mt-2 text-xs text-ghost-white/50 text-right">
 {charCounts.message} / 1000 characters
 </div>
 </div>

 <button type="submit" className="w-full md:w-auto px-8 py-3 bg-ghost-purple hover:bg-ghost-purple/80 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-ghost-purple/50">
 Submit Form
 </button>
 </form>

 {submittedData && <div className="border-ghost-orange/30">
 <h4 className="text-lg font-semibold text-ghost-purple mb-4">Submitted Data:</h4>

 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <span className="text-xs text-ghost-white/50 uppercase tracking-wide">Name</span>
 <p className="text-ghost-white/80 mt-1">{submittedData.name}</p>
 </div>
 <div>
 <span className="text-xs text-ghost-white/50 uppercase tracking-wide">Email</span>
 <p className="text-ghost-white/80 mt-1">{submittedData.email}</p>
 </div>
 </div>

 <div>
 <span className="text-xs text-ghost-white/50 uppercase tracking-wide">Subject</span>
 <p className="text-ghost-white/80 mt-1">{submittedData.subject}</p>
 </div>

 <div>
 <span className="text-xs text-ghost-white/50 uppercase tracking-wide">Message</span>
 <p className="text-ghost-white/80 mt-1 whitespace-pre-wrap">{submittedData.message}</p>
 </div>
 </div>}
 </div>;
}
export default function WhisperBoxPage() {
 const props = [{
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes for custom styling. Use to control width, height, and other styles.'
 }, {
  name: 'placeholder',
  type: 'string',
  default: '-',
  description: 'Placeholder text displayed in the textarea when empty.'
 }, {
  name: 'rows',
  type: 'number',
  default: '-',
  description: 'Number of visible text rows. Use rows={1} for input-style single-line fields.'
 }, {
  name: 'value',
  type: 'string',
  default: '-',
  description: 'Controlled textarea value. Use with onChange for controlled component pattern.'
 }, {
  name: 'defaultValue',
  type: 'string',
  default: '-',
  description: 'Default value for uncontrolled textarea.'
 }, {
  name: 'onChange',
  type: '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
  default: '-',
  description: 'Change event handler.'
 }, {
  name: 'onFocus',
  type: '(e: React.FocusEvent<HTMLTextAreaElement>) => void',
  default: '-',
  description: 'Focus event handler.'
 }, {
  name: 'onBlur',
  type: '(e: React.FocusEvent<HTMLTextAreaElement>) => void',
  default: '-',
  description: 'Blur event handler.'
 }, {
  name: 'disabled',
  type: 'boolean',
  default: 'false',
  description: 'Disables the textarea.'
 }, {
  name: 'readOnly',
  type: 'boolean',
  default: 'false',
  description: 'Makes the textarea read-only.'
 }, {
  name: 'required',
  type: 'boolean',
  default: 'false',
  description: 'Marks the textarea as required for form validation.'
 }, {
  name: 'maxLength',
  type: 'number',
  default: '-',
  description: 'Maximum number of characters allowed.'
 }, {
  name: 'name',
  type: 'string',
  default: '-',
  description: 'Name attribute for form submission.'
 }, {
  name: 'ref',
  type: 'React.Ref<HTMLTextAreaElement>',
  default: '-',
  description: 'Ref forwarded to the textarea element.'
 }];
 const basicUsageCode = `import { WhisperBox } from 'ghostui-react';

 export default function MyComponent() {
  return (
   <div className="w-full max-w-4xl">
   <WhisperBox
   placeholder="Type something..."
   className="w-full"
   />
   </div>
  );
 }`;
 const controlledCode = `import { WhisperBox } from 'ghostui-react';
 import { useState } from 'react';

 export default function ControlledExample() {
  const [value, setValue] = useState('');

  return (
   <WhisperBox
   value={value}
   onChange={(e) => setValue(e.target.value)}
   placeholder="Controlled input..."
   />
  );
 }`;
 const formCode = `import { WhisperBox } from 'ghostui-react';
 import { useState } from 'react';

 export default function FormExample() {
  const [charCounts, setCharCounts] = useState({ subject: 0, message: 0 });

  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   const formData = new FormData(e.target as HTMLFormElement);
   console.log({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
   });
  };

  return (
   <form onSubmit={handleSubmit} className="space-y-6">
   {/* Two-column layout for input-style fields */}
   <div className="grid md:grid-cols-2 gap-6">
   <div>
   <label htmlFor="name">Name *</label>
   <WhisperBox
   id="name"
   name="name"
   placeholder="Your name..."
   required
   maxLength={100}
   rows={1}
   className="w-full !min-h-[60px] !max-h-[60px] resize-none"
   />
   </div>

   <div>
   <label htmlFor="email">Email *</label>
   <WhisperBox
   id="email"
   name="email"
   placeholder="your.email@example.com"
   required
   maxLength={100}
   rows={1}
   className="w-full !min-h-[60px] !max-h-[60px] resize-none"
   />
   </div>
   </div>

   {/* Medium-sized field */}
   <div>
   <label htmlFor="subject">Subject *</label>
   <WhisperBox
   id="subject"
   name="subject"
   placeholder="Brief subject line..."
   required
   maxLength={150}
   onChange={(e) => setCharCounts(prev =>
   ({ ...prev, subject: e.target.value.length })
  )}
  rows={2}
  previewClassName="w-full min-h-[100px]"
  />
  <div className="text-xs text-right">
  {charCounts.subject} / 150
  </div>
  </div>

  {/* Large textarea field */}
  <div>
  <label htmlFor="message">Message *</label>
  <WhisperBox
  id="message"
  name="message"
  placeholder="Enter your detailed message..."
  required
  maxLength={1000}
  onChange={(e) => setCharCounts(prev =>
  ({ ...prev, message: e.target.value.length })
 )}
 rows={8}
 previewClassName="w-full min-h-[240px]"
 />
 <div className="text-xs text-right">
 {charCounts.message} / 1000
 </div>
 </div>

 <button type="submit">Submit Form</button>
 </form>
);
}`;
const inputStyleCode = `import { WhisperBox } from 'ghostui-react';

// Single-line input style
export default function InputStyleExample() {
 return (
  <div className="w-full max-w-md">
  <WhisperBox
  placeholder="Enter your email..."
  rows={1}
  className="w-full !min-h-[60px] !max-h-[60px] resize-none"
  />
  </div>
 );
}`;
const customStyleCode = `import { WhisperBox } from 'ghostui-react';

// Large textarea with custom styling
export default function CustomStyleExample() {
 return (
  <div className="w-full max-w-2xl">
  <WhisperBox
  placeholder="Custom styled textarea..."
  rows={10}
  className="w-full min-h-[300px] text-xl"
  />
  </div>
 );
}`;
return <div className="space-y-12 prose prose-invert max-w-none">
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">WhisperBox</h1>

<p className="lead text-ghost-white/90">
A haunted textarea with dynamic energy-based effects that respond to typing intensity.
Fully customizable sizing allows it to work as both single-line inputs and multi-line textareas.
</p>

<ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[400px] w-full px-4">
<div className="w-full max-w-4xl">
<WhisperBox placeholder="Type to see the effects..." className="w-full" />
</div>
</div>} code={basicUsageCode} api={<PropsTable props={props} />} />

<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Features</h2>

<ul className="text-ghost-white/70 space-y-2">
<li><strong className="text-ghost-purple">Flexible Sizing</strong> - Use as single-line inputs with <code className="text-xs">rows={1}</code> or multi-line textareas with custom heights</li>
<li><strong className="text-ghost-purple">Energy System</strong> - Visual effects intensify as you type, creating a dynamic supernatural experience</li>
<li><strong className="text-ghost-purple">Ectoplasm Border</strong> - SVG-filtered distortion effect that appears on focus and scales with typing energy</li>
<li><strong className="text-ghost-purple">Floating Runes</strong> - Ancient symbols materialize when energy exceeds threshold</li>
<li><strong className="text-ghost-purple">Whisper Glow</strong> - Ethereal glow that pulses with your typing intensity</li>
<li><strong className="text-ghost-purple">Theme Support</strong> - Automatically adapts to spectral or blood themes</li>
<li><strong className="text-ghost-purple">Fully Reconfigurable</strong> - No hardcoded size constraints, complete control via className prop</li>
</ul>

<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Controlled Example</h2>

<p>
Use the component in controlled mode for full state management:
</p>

<ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[400px] w-full px-4">
<div className="w-full max-w-2xl">
<WhisperBox placeholder="Controlled textarea..." className="w-full" />
</div>
</div>} code={controlledCode} />

<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Form Integration</h2>

<p>
WhisperBox works seamlessly with forms and supports standard HTML textarea attributes.
This example demonstrates using multiple WhisperBox components with different sizes -
input-style fields for name/email, and progressively larger textareas for subject/message.
Try submitting the form below:
</p>

<ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[800px] w-full">
<FormExample />
</div>} code={formCode} previewSize="lg" />

<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Input-Style Usage</h2>

<p>
Use WhisperBox as a single-line input by setting <code>rows={1}</code> and constraining the height.
Perfect for form fields like name, email, or search inputs:
</p>

<ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[200px] w-full px-4">
<div className="w-full max-w-md">
<WhisperBox placeholder="Enter your email..." rows={1} className="w-full !min-h-[60px] !max-h-[60px] resize-none overflow-hidden" />
</div>
</div>} code={inputStyleCode} />

<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Custom Styling</h2>

<p>
Customize the appearance using the className prop. You can adjust size, padding, font, and other styles:
</p>

<ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[400px] w-full px-4">
<div className="w-full max-w-2xl">
<WhisperBox placeholder="Custom styled textarea..." rows={10} className="w-full min-h-[300px] text-xl" />
</div>
</div>} code={customStyleCode} />

<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Configuration Tips</h2>

<div className="border-ghost-orange/30">
<div className="space-y-4 text-ghost-white/70">
<div>
<strong className="text-ghost-purple">Controlled vs Uncontrolled:</strong>
<p className="mt-1">Use <code className="text-ghost-white/80">value</code> + <code className="text-ghost-white/80">onChange</code> for controlled mode, or <code className="text-ghost-white/80">defaultValue</code> for uncontrolled mode.</p>
</div>

<div>
<strong className="text-ghost-purple">Size Customization:</strong>
<p className="mt-1">
Use <code className="text-ghost-white/80">rows={1}</code> with fixed height for input-style fields,
or <code className="text-ghost-white/80">rows={8}</code> with <code className="text-ghost-white/80">min-h-[240px]</code> for textareas.
The component has no hardcoded size constraints - fully customizable via className.
</p>
</div>

<div>
<strong className="text-ghost-purple text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Form Validation:</strong>
<p className="mt-1">Use <code className="text-ghost-white/80">required</code>, <code className="text-ghost-white/80">maxLength</code>, and other standard HTML attributes for validation.</p>
</div>

<div>
<strong className="text-ghost-purple">Event Handlers:</strong>
<p className="mt-1">All standard textarea events are supported: <code className="text-ghost-white/80">onChange</code>, <code className="text-ghost-white/80">onFocus</code>, <code className="text-ghost-white/80">onBlur</code>, etc.</p>
</div>

<div>
<strong className="text-ghost-purple">Accessibility:</strong>
<p className="mt-1">The component forwards refs and supports all ARIA attributes for screen readers.</p>
</div>
</div>
</div>
</div>;
}