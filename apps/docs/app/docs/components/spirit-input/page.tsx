'use client';

import { SpiritInput } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';
import { useState, useRef } from 'react';
export default function SpiritInputPage() {
 const props = [{
  name: 'label',
  type: 'string',
  default: 'Required',
  description: 'Text label displayed above the input field'
 }, {
  name: 'error',
  type: 'string',
  default: '-',
  description: 'Error message displayed below the input with shake animation'
 }, {
  name: 'ghostIcon',
  type: 'boolean',
  default: 'false',
  description: 'Display a ghost icon on the left side of the input'
 }, {
  name: 'placeholder',
  type: 'string',
  default: '-',
  description: 'Placeholder text displayed in the input field'
 }, {
  name: 'value',
  type: 'string',
  default: '-',
  description: 'Controlled input value'
 }, {
  name: 'onChange',
  type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
  default: '-',
  description: 'Change event handler'
 }, {
  name: 'onFocus',
  type: '(e: React.FocusEvent<HTMLInputElement>) => void',
  default: '-',
  description: 'Focus event handler'
 }, {
  name: 'onBlur',
  type: '(e: React.FocusEvent<HTMLInputElement>) => void',
  default: '-',
  description: 'Blur event handler'
 }, {
  name: 'className',
  type: 'string',
  default: '-',
  description: 'Additional CSS classes for custom styling'
 }, {
  name: 'id',
  type: 'string',
  default: 'Auto-generated',
  description: 'Custom id for the input element and label association'
 }, {
  name: 'ref',
  type: 'React.Ref<HTMLInputElement>',
  default: '-',
  description: 'Ref forwarded to the underlying input element'
 }];
 return <div className="space-y-12 prose prose-invert max-w-none">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">SpiritInput</h1>

 <p className="lead text-ghost-white/90">
 A haunted text input field with spectral animations, animated underlines, focus effects,
 and error validation. Features include spectral smoke effects that drift upward on focus,
 shake animations for errors, and optional ghost icon support.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[200px]">
 <SpiritInput label="Email Address" placeholder="Enter your email..." />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function Example() {
  return (
   <SpiritInput
   label="Email Address"
   placeholder="Enter your email..."
   />
  );
 }`} api={<PropsTable props={props} />} />

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Focus State</h2>

 <p className="text-ghost-white/80">
 When the input receives focus, it displays a spectral smoke effect that drifts upward,
 an animated purple underline that expands from the center, and the label changes to purple.
 Click or tab into the input below to see the haunting focus animations in action.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[200px]">
 <SpiritInput label="Username" placeholder="Focus me to see the spectral smoke..." />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function FocusExample() {
  return (
   <SpiritInput
   label="Username"
   placeholder="Focus me to see the spectral smoke..."
   />
  );
 }`} />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Spectral Smoke Effect:</strong> The smoke effect is a blurred, semi-transparent
 visual element that animates upward when the input gains focus. It uses Framer Motion
 to smoothly transition from invisible to visible, creating an ethereal atmosphere.
 When the input loses focus, the smoke gracefully fades away.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Error State</h2>

 <p className="text-ghost-white/80">
 The SpiritInput provides visual feedback for validation errors with a shake animation,
 red styling, and an error message that fades in below the input. The error state overrides
 the focus state styling, ensuring errors are clearly communicated to users.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[200px]">
 <SpiritInput label="Email Address" placeholder="user@example.com" error="Please enter a valid email address" />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function ErrorExample() {
  return (
   <SpiritInput
   label="Email Address"
   placeholder="user@example.com"
   error="Please enter a valid email address"
   />
  );
 }`} />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Error Animations:</strong> When an error is present, the component triggers a
 horizontal shake animation to draw attention. The label and underline turn red with a
 glowing effect, and the error message animates in from above with a fade effect. When
 the error is cleared, the message smoothly fades out.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Ghost Icon</h2>

 <p className="text-ghost-white/80">
 Enable the optional ghost icon to enhance the haunted aesthetic. The icon appears on the
 left side of the input and changes color based on the input state: gray by default, purple
 when focused, and red when an error is present.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col gap-12 items-center py-12 min-h-[300px]">
 <SpiritInput label="With Ghost Icon" placeholder="Type something spooky..." ghostIcon />
 <SpiritInput label="Without Ghost Icon" placeholder="Standard input..." />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function GhostIconExample() {
  return (
   <>
   <SpiritInput
   label="With Ghost Icon"
   placeholder="Type something spooky..."
   ghostIcon
   />
   <SpiritInput
   label="Without Ghost Icon"
   placeholder="Standard input..."
   />
   </>
  );
 }`} />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Icon Color States:</strong> The ghost icon dynamically changes color to match
 the input state. Try focusing the input above to see the icon turn purple, or view the
 error state example below to see it turn red.
 </p>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Ghost Icon with Focus</h3>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[200px]">
 <SpiritInput label="Haunted Email" placeholder="Focus to see purple ghost..." ghostIcon />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function GhostIconFocusExample() {
  return (
   <SpiritInput
   label="Haunted Email"
   placeholder="Focus to see purple ghost..."
   ghostIcon
   />
  );
 }`} className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Ghost Icon with Error</h3>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[200px]">
 <SpiritInput label="Cursed Password" placeholder="Enter password..." ghostIcon error="Password must be at least 8 characters" />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function GhostIconErrorExample() {
  return (
   <SpiritInput
   label="Cursed Password"
   placeholder="Enter password..."
   ghostIcon
   error="Password must be at least 8 characters"
   />
  );
 }`} />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Automatic Padding:</strong> When the ghost icon is enabled, the component
 automatically adds left padding to the input text to prevent overlap with the icon.
 This ensures the text remains readable while maintaining the haunted aesthetic.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Custom Styling</h2>

 <p className="text-ghost-white/80">
 The SpiritInput component supports custom styling through the className prop. You can
 customize the appearance while preserving all core animations and interaction behaviors.
 The component uses tailwind-merge to intelligently merge your custom classes with the
 default styles, allowing you to override specific properties without breaking functionality.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col gap-12 items-center py-12 min-h-[400px]">
 <SpiritInput label="Custom Width" placeholder="Wider input field..." className="w-96" />
 <SpiritInput label="Custom Text Size" placeholder="Larger text..." className="text-xl" />
 <SpiritInput label="Custom Background" placeholder="With background..." className="bg-gray-900/50 px-4 py-2 rounded-lg" />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function CustomStylingExample() {
  return (
   <>
   {/* Custom width */}
   <SpiritInput
   label="Custom Width"
   placeholder="Wider input field..."
   className="w-96"
   />

   {/* Custom text size */}
   <SpiritInput
   label="Custom Text Size"
   placeholder="Larger text..."
   className="text-xl"
   />

   {/* Custom background and padding */}
   <SpiritInput
   label="Custom Background"
   placeholder="With background..."
   className="bg-gray-900/50 px-4 py-2 rounded-lg"
   />
   </>
  );
 }`} className="text-xl md:text-2xl font-semibold text-ghost-white" />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Preserved Behaviors:</strong> All custom styling preserves the core component
 behaviors including focus animations, spectral smoke effects, error shake animations,
 and state-based color changes. The className prop only affects visual presentation,
 not functionality.
 </p>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Advanced Customization</h3>

 <p className="text-ghost-white/80">
 You can combine multiple custom classes to create unique variations. Here are some
 examples of more advanced customizations that maintain the haunted aesthetic while
 adapting to different design contexts.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col gap-12 items-center py-12 min-h-[400px]">
 <SpiritInput label="Compact Style" placeholder="Smaller, tighter spacing..." className="text-sm py-1" />
 <SpiritInput label="Monospace Input" placeholder="For code or tokens..." className="font-mono tracking-wider" />
 <SpiritInput label="Bordered Variant" placeholder="With visible border..." className="border border-gray-700 rounded px-3 py-2" ghostIcon />
 </div>} code={`import { SpiritInput } from 'ghostui-react';

 export default function AdvancedCustomizationExample() {
  return (
   <>
   {/* Compact style */}
   <SpiritInput
   label="Compact Style"
   placeholder="Smaller, tighter spacing..."
   className="text-sm py-1"
   />

   {/* Monospace for code input */}
   <SpiritInput
   label="Monospace Input"
   placeholder="For code or tokens..."
   className="font-mono tracking-wider"
   />

   {/* Bordered variant with ghost icon */}
   <SpiritInput
   label="Bordered Variant"
   placeholder="With visible border..."
   className="border border-gray-700 rounded px-3 py-2"
   ghostIcon
   />
   </>
  );
 }`} className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide" />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Best Practices:</strong> When customizing the SpiritInput, avoid overriding
 transition or animation properties, as these are essential for the spectral effects.
 Focus on layout, spacing, typography, and background customizations. The component's
 intelligent class merging ensures your custom styles work harmoniously with the default
 haunted aesthetic.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Form Integration</h2>

 <p className="text-ghost-white/80">
 The SpiritInput component works seamlessly in forms, supporting standard form submission,
 validation, and controlled input patterns. It integrates with form libraries and native
 HTML forms, making it easy to build complete form experiences with haunted aesthetics.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[500px]">
 <FormExample />
 </div>} code={`import { SpiritInput } from 'ghostui-react';
 import { useState } from 'react';

 export default function FormExample() {
  const [formData, setFormData] = useState({
   username: '',
   email: '',
   password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();

   // Validation
   const newErrors: any = {};
   if (!formData.username) {
    newErrors.username = 'Username is required';
   }
   if (!formData.email || !formData.email.includes('@')) {
    newErrors.email = 'Please enter a valid email';
   }
   if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
   }

   setErrors(newErrors);

   if (Object.keys(newErrors).length === 0) {
    setSubmitted(true);
    console.log('Form submitted:', formData);
   }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
   setFormData({ ...formData, [field]: e.target.value });
   // Clear error when user starts typing
   if (errors[field]) {
    setErrors({ ...errors, [field]: undefined });
   }
  };

  if (submitted) {
   return (
    <div className="text-center text-green-400 text-lg">
    ✓ Form submitted successfully!
    </div>
   );
  }

  return (
   <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
   <SpiritInput
   label="Username"
   placeholder="Enter your username..."
   value={formData.username}
   onChange={handleChange('username')}
   error={errors.username}
   ghostIcon
   />

   <SpiritInput
   label="Email Address"
   type="email"
   placeholder="user@example.com"
   value={formData.email}
   onChange={handleChange('email')}
   error={errors.email}
   ghostIcon
   />

   <SpiritInput
   label="Password"
   type="password"
   placeholder="At least 8 characters..."
   value={formData.password}
   onChange={handleChange('password')}
   error={errors.password}
   ghostIcon
   />

   <button
   type="submit"
   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
   >
   Submit Form
   </button>
   </form>
  );
 }`} className="text-xl md:text-2xl font-semibold text-ghost-white" />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Form Validation:</strong> The example above demonstrates real-time validation
 with error messages that appear when validation fails. Errors are cleared as the user
 types, providing immediate feedback. The SpiritInput's shake animation and red styling
 draw attention to fields that need correction.
 </p>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Uncontrolled Form</h3>

 <p className="text-ghost-white/80">
 For simpler use cases, you can use SpiritInput in uncontrolled mode with refs and
 native form data. This approach is useful when you don't need to track every keystroke
 or when integrating with form libraries that manage state internally.
 </p>

 <ComponentPlayground preview={<div className="flex flex-col items-center py-12 min-h-[400px]">
 <UncontrolledFormExample />
 </div>} code={`import { SpiritInput } from 'ghostui-react';
 import { useRef, useState } from 'react';

 export default function UncontrolledFormExample() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();

   if (formRef.current) {
    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    const email = formData.get('email');

    setMessage(\`Submitted: \${name} (\${email})\`);
    formRef.current.reset();
   }
  };

  return (
   <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
   <SpiritInput
   label="Full Name"
   name="name"
   placeholder="Enter your name..."
   required
   />

   <SpiritInput
   label="Email"
   name="email"
   type="email"
   placeholder="your@email.com"
   required
   />

   <button
   type="submit"
   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
   >
   Submit
   </button>

   {message && (
    <div className="text-green-400 text-sm text-center">
    {message}
    </div>
   )}
   </form>
  );
 }`} />

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Native Form Features:</strong> The uncontrolled approach leverages native HTML
 form features like the <code>name</code> attribute for form data collection and the
 <code>required</code> attribute for basic validation. This works well with server-side
 form handling and progressive enhancement strategies.
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <p className="text-ghost-white/80">
 The SpiritInput component is built with accessibility in mind, ensuring that all users
 can interact with haunted input fields regardless of their input method or assistive
 technology. The component follows WCAG guidelines and supports keyboard navigation,
 screen readers, and reduced motion preferences.
 </p>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Keyboard Navigation</h3>

 <div className="border-ghost-orange/30">
 <ul className="space-y-3 text-ghost-white/80">
 <li>
 <strong className="text-purple-400">Tab:</strong> Move focus to the input field.
 The spectral smoke effect and purple underline will appear, providing clear visual
 feedback that the field is active.
 </li>
 <li>
 <strong className="text-purple-400">Shift + Tab:</strong> Move focus backward to
 the previous focusable element. The input will blur and animations will reverse.
 </li>
 <li>
 <strong className="text-purple-400">Type:</strong> Enter text directly into the
 focused input. All standard text editing shortcuts work as expected.
 </li>
 <li>
 <strong className="text-purple-400">Escape:</strong> While not handled by the
 component itself, you can add custom onKeyDown handlers to implement escape-to-clear
 or other keyboard shortcuts.
 </li>
 </ul>
 </div>

 <p className="text-ghost-white/80 text-sm">
 <strong>Focus Indicators:</strong> The component provides multiple focus indicators beyond
 just color changes. The animated underline, spectral smoke effect, and label color change
 work together to ensure focus is visible even for users with color vision deficiencies.
 The animations are smooth and non-jarring, creating a pleasant experience for keyboard users.
 </p>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Screen Reader Support</h3>

 <div className="border-ghost-orange/30">
 <ul className="space-y-3 text-ghost-white/80">
 <li>
 <strong className="text-purple-400">Label Association:</strong> The label is
 properly associated with the input using the <code>htmlFor</code> attribute,
 ensuring screen readers announce the label when the input receives focus.
 </li>
 <li>
 <strong className="text-purple-400">Error Messages:</strong> Error messages are
 rendered in the DOM and can be read by screen readers. Consider adding
 <code>aria-describedby</code> to link the error message to the input for better
 screen reader support.
 </li>
 <li>
 <strong className="text-purple-400">Input Type:</strong> The component forwards
 the <code>type</code> attribute, allowing you to specify semantic input types
 like "email", "password", or "tel" for better screen reader context.
 </li>
 <li>
 <strong className="text-purple-400">Required Fields:</strong> Use the
 <code>required</code> attribute to indicate mandatory fields. Screen readers
 will announce this to users.
 </li>
 </ul>
 </div>

 <p className="text-ghost-white/80 text-sm">
 <strong>Recommendation:</strong> For enhanced accessibility, consider wrapping error
 messages in an element with <code>role="alert"</code> or <code>aria-live="polite"</code>
 to ensure screen readers announce validation errors immediately when they appear.
 </p>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Reduced Motion</h3>

 <p className="text-ghost-white/80">
 The SpiritInput respects the <code>prefers-reduced-motion</code> media query. Users who
 have enabled reduced motion in their operating system settings will experience simplified
 animations that maintain functionality while reducing visual motion. The component remains
 fully functional with all state changes clearly indicated through color and opacity changes
 rather than complex animations.
 </p>

 <div className="border-ghost-orange/30">
 <p className="text-ghost-white/80 mb-3">
 <strong className="text-purple-400">With Reduced Motion:</strong>
 </p>
 <ul className="space-y-2 text-ghost-white/80 text-sm">
 <li>• Spectral smoke effect transitions are simplified</li>
 <li>• Underline animations are instant or very brief</li>
 <li>• Error shake animation is reduced or removed</li>
 <li>• Color changes remain to indicate state</li>
 </ul>
 </div>

 <p className="text-ghost-white/80 text-sm">
 <strong>Testing:</strong> To test reduced motion behavior, enable "Reduce motion" in your
 operating system's accessibility settings (macOS: System Preferences → Accessibility →
 Display, Windows: Settings → Ease of Access → Display).
 </p>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Usage Tips</h2>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Best Practices</h3>

 <div className="border-ghost-orange/30">
 <ul className="space-y-4 text-ghost-white/80">
 <li>
 <strong className="text-purple-400">Always Provide Labels:</strong> The label
 prop is required for good reason. Labels are essential for accessibility and
 usability. Never use placeholder text as a substitute for labels.
 </li>
 <li>
 <strong className="text-purple-400">Use Meaningful Error Messages:</strong> Error
 messages should be specific and actionable. Instead of "Invalid input", use
 "Email must include an @ symbol" or "Password must be at least 8 characters".
 </li>
 <li>
 <strong className="text-purple-400">Clear Errors on Input:</strong> When using
 controlled inputs, clear error messages as soon as the user starts typing. This
 provides immediate feedback that they're addressing the issue.
 </li>
 <li>
 <strong className="text-purple-400">Appropriate Input Types:</strong> Use semantic
 HTML input types (<code className="text-xl md:text-2xl font-semibold text-ghost-white">type="email"</code>, <code className="text-xl md:text-2xl font-semibold text-ghost-white">type="tel"</code>, etc.) to
 provide better mobile keyboard layouts and browser validation.
 </li>
 <li>
 <strong className="text-purple-400">Ghost Icon Usage:</strong> The ghost icon
 enhances the haunted aesthetic but adds visual weight. Use it sparingly for
 emphasis on key fields rather than on every input in a form.
 </li>
 </ul>
 </div>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Common Patterns</h3>

 <div className="border-ghost-orange/30">
 <div className="space-y-4 text-ghost-white/80">
 <div>
 <strong className="text-purple-400">Real-time Validation:</strong>
 <p className="text-sm mt-1">
 Validate input as the user types, but delay showing errors until they've
 finished typing (use debouncing) or until they blur the field. This prevents
 showing errors prematurely while they're still entering data.
 </p>
 </div>
 <div>
 <strong className="text-purple-400">Password Strength Indicators:</strong>
 <p className="text-sm mt-1">
 For password fields, consider showing strength indicators below the input
 instead of using the error prop. Reserve the error state for actual validation
 failures.
 </p>
 </div>
 <div>
 <strong className="text-purple-400 text-xl md:text-2xl font-semibold text-ghost-white">Optional Fields:</strong>
 <p className="text-sm mt-1">
 Indicate optional fields in the label text (e.g., "Phone Number (optional)")
 rather than marking required fields with asterisks. This is clearer for users.
 </p>
 </div>
 <div>
 <strong className="text-purple-400">Autocomplete:</strong>
 <p className="text-sm mt-1">
 Use the <code>autoComplete</code> attribute to help browsers and password
 managers fill in forms correctly. For example, <code>autoComplete="email"</code>
 or <code>autoComplete="current-password"</code>.
 </p>
 </div>
 </div>
 </div>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Performance Considerations</h3>

 <p className="text-ghost-white/80">
 The SpiritInput component is optimized for performance with GPU-accelerated animations
 and efficient re-rendering. However, when using many inputs in a single form, consider
 these tips:
 </p>

 <div className="border-ghost-orange/30">
 <ul className="space-y-3 text-ghost-white/80 text-sm">
 <li>
 <strong className="text-purple-400">Controlled vs Uncontrolled:</strong> For
 large forms, uncontrolled inputs with refs can reduce re-renders compared to
 controlled inputs that update state on every keystroke.
 </li>
 <li>
 <strong className="text-purple-400">Debounce Validation:</strong> If performing
 expensive validation (like API calls), debounce the validation logic to avoid
 excessive calls while the user is typing.
 </li>
 <li>
 <strong className="text-purple-400">Memoization:</strong> If passing complex
 objects or functions as props, use <code>useMemo</code> and <code>useCallback</code>
 to prevent unnecessary re-renders.
 </li>
 </ul>
 </div>

 <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Integration with Form Libraries</h3>

 <p className="text-ghost-white/80">
 The SpiritInput works seamlessly with popular form libraries like React Hook Form, Formik,
 and others. Here's a quick example with React Hook Form:
 </p>

 <div className="border-ghost-orange/30">
 <pre className="text-sm text-ghost-white/80 overflow-x-auto">
 <code>{`import { useForm } from 'react-hook-form';
 import { SpiritInput } from 'ghostui-react';

 function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
   <SpiritInput
   label="Email"
   {...register('email', {
    required: 'Email is required',
    pattern: {
     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
     message: 'Invalid email address'
    }
   })}
   error={errors.email?.message}
   ghostIcon
   />
   </form>
  );
 }`}</code>
 </pre>
 </div>

 <p className="text-ghost-white/80 text-sm mt-4">
 <strong>Note:</strong> The component's ref forwarding ensures compatibility with form
 libraries that need direct access to the input element. All standard HTML input attributes
 are forwarded, making integration straightforward.
 </p>
 </div>;
}
function FormExample() {
 const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: ''
 });
 const [errors, setErrors] = useState<Record<string, string>>({});
 const [submitted, setSubmitted] = useState(false);
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  const newErrors: Record<string, string> = {};
  if (!formData.username) {
   newErrors.username = 'Username is required';
  }
  if (!formData.email || !formData.email.includes('@')) {
   newErrors.email = 'Please enter a valid email';
  }
  if (formData.password.length < 8) {
   newErrors.password = 'Password must be at least 8 characters';
  }
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
   setSubmitted(true);
   console.log('Form submitted:', formData);
  }
 };
 const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
   ...formData,
   [field]: e.target.value
  });
  // Clear error when user starts typing
  if (errors[field]) {
   const newErrors = {
    ...errors
   };
   delete newErrors[field];
   setErrors(newErrors);
  }
 };
 if (submitted) {
  return <div className="text-center text-green-400 text-lg">
  ✓ Form submitted successfully!
  </div>;
 }
 return <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 text-xl md:text-2xl font-semibold text-ghost-white">
 <SpiritInput label="Username" placeholder="Enter your username..." value={formData.username} onChange={handleChange('username')} error={errors.username} ghostIcon />

 <SpiritInput label="Email Address" type="email" placeholder="user@example.com" value={formData.email} onChange={handleChange('email')} error={errors.email} ghostIcon />

 <SpiritInput label="Password" type="password" placeholder="At least 8 characters..." value={formData.password} onChange={handleChange('password')} error={errors.password} ghostIcon />

 <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
 Submit Form
 </button>
 </form>;
}
function UncontrolledFormExample() {
 const formRef = useRef<HTMLFormElement>(null);
 const [message, setMessage] = useState('');
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (formRef.current) {
   const formData = new FormData(formRef.current);
   const name = formData.get('name');
   const email = formData.get('email');
   setMessage(`Submitted: ${name} (${email})`);
   formRef.current.reset();
  }
 };
 return <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
 <SpiritInput label="Full Name" name="name" placeholder="Enter your name..." required />

 <SpiritInput label="Email" name="email" type="email" placeholder="your@email.com" required className="text-xl md:text-2xl font-semibold text-ghost-white" />

 <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
 Submit
 </button>

 {message && <div className="text-green-400 text-sm text-center">
 {message}
 </div>}
 </form>;
}