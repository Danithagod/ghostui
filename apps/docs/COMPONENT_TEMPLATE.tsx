/**
 * GhostUI Component Documentation Template
 * 
 * This template provides a standardized structure for documenting GhostUI components.
 * Copy this file and replace the placeholder content with your component's specific details.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to: apps/docs/app/docs/components/[component-name]/page.tsx
 * 2. Replace all [COMPONENT_NAME] placeholders with your component name
 * 3. Replace all [component-name] placeholders with your kebab-case component name
 * 4. Update the props array with your component's actual props
 * 5. Add real code examples and interactive previews
 * 6. Include at least 3 distinct usage examples (Basic Usage + 2 more)
 * 7. Document all variants if your component has them
 * 8. Add accessibility information if applicable
 * 9. Remove any sections that don't apply to your component
 * 10. Keep the section order: Overview → Basic Usage → API → Examples → Variants → Accessibility
 */

'use client';

import React from 'react';
/**
 * COMPONENT DOCUMENTATION TEMPLATE
 * 
 * This is a template file for creating new component documentation pages.
 * Replace [COMPONENT_NAME] with your actual component name throughout this file.
 * 
 * This file is not meant to be compiled - it's a reference template.
 */

// @ts-nocheck
// TODO: Import your component from ghostui-react
// import { [COMPONENT_NAME] } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';

export default function [COMPONENT_NAME]Page() {
    /**
     * Props Definition
     * 
     * Define all props for your component with complete information.
     * Each prop should have: name, type, default (if applicable), and description.
     * Mark required props by omitting the default value or adding a note in the description.
     * 
     * Requirements: 1.1, 6.1, 6.2, 6.3
     */
    const props = [
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'tertiary'",
            default: "'primary'",
            description: 'Visual style variant of the component. Each variant has unique styling and behavior.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the component affecting dimensions and spacing.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the component when true, preventing user interaction.',
        },
        {
            name: 'className',
            type: 'string',
            default: '-',
            description: 'Additional CSS classes to apply to the component for custom styling.',
        },
        {
            name: 'children',
            type: 'React.ReactNode',
            default: '-',
            description: 'Content to be rendered inside the component. (Required)',
        },
        {
            name: 'onClick',
            type: '(event: React.MouseEvent) => void',
            default: '-',
            description: 'Click event handler called when the component is clicked.',
        },
        {
            name: 'ref',
            type: 'React.Ref<HTMLElement>',
            default: '-',
            description: 'Ref forwarded to the underlying HTML element for direct DOM access.',
        },
        // TODO: Add all your component's props here
        // Include: name, type, default (or '-'), description
        // Be specific about union types, object shapes, and function signatures
    ];

    /**
     * Basic Usage Code Example
     * 
     * Provide a minimal, working example that demonstrates the simplest use case.
     * This should be copy-paste ready and show the most common configuration.
     * 
     * Requirements: 1.3, 4.5
     */
    const basicUsageCode = `import { [COMPONENT_NAME] } from 'ghostui-react';

export default function MyComponent() {
  return (
    <[COMPONENT_NAME]>
      Hello, World!
    </[COMPONENT_NAME]>
  );
}`;

    /**
     * Page Structure
     * 
     * Follow this exact structure for consistency across all component pages:
     * 1. Header Section (h1 + lead paragraph)
     * 2. Basic Usage (ComponentPlayground with preview, code, and API)
     * 3. Additional Sections (variants, examples, composition, etc.)
     * 4. Accessibility (if applicable)
     * 
     * Requirements: 2.1, 2.2, 2.3, 4.1, 5.1, 5.2, 5.4
     */
    return (
        <div className="space-y-12">
            {/* 
                SECTION 1: Header
                
                The header introduces the component with a title and lead paragraph.
                - h1: Component name in title case
                - Lead paragraph: Brief description (1-2 sentences) of purpose and key features
                
                Requirements: 2.2, 2.3, 4.5, 5.1
            */}
            <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
                    [COMPONENT_NAME]
                </h1>
                <p className="lead text-ghost-white/90">
                    {/* TODO: Write a compelling 1-2 sentence description of your component */}
                    A brief description of what this component does and its key features. 
                    Highlight what makes it unique or useful.
                </p>
            </div>

            {/* 
                SECTION 2: Basic Usage
                
                The first interactive example showing the simplest use case.
                Uses ComponentPlayground with three tabs: Preview, Code, and API.
                
                Requirements: 1.1, 1.2, 1.3, 4.2, 4.3
            */}
            <ComponentPlayground
                preview={
                    <div className="flex items-center justify-center py-12">
                        {/* TODO: Add your component with basic props */}
                        {/* <[COMPONENT_NAME]>Basic Example</[COMPONENT_NAME]> */}
                        <div className="text-ghost-white/60">
                            Replace this with your component preview
                        </div>
                    </div>
                }
                code={basicUsageCode}
                api={<PropsTable props={props} />}
            />

            {/* 
                SECTION 3: Variants (if applicable)
                
                If your component has variants, document each one with examples.
                Show all variants side-by-side for easy comparison.
                
                Requirements: 1.4, 3.4, 10.2
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Variants
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    {/* TODO: Describe the available variants and their use cases */}
                    [COMPONENT_NAME] supports multiple variants, each designed for different contexts and visual styles.
                </p>

                <ComponentPlayground
                    preview={
                        <div className="flex flex-wrap items-center gap-6">
                            {/* TODO: Show all variants side-by-side */}
                            {/* <[COMPONENT_NAME] variant="primary">Primary</[COMPONENT_NAME]> */}
                            {/* <[COMPONENT_NAME] variant="secondary">Secondary</[COMPONENT_NAME]> */}
                            {/* <[COMPONENT_NAME] variant="tertiary">Tertiary</[COMPONENT_NAME]> */}
                            <div className="text-ghost-white/60">
                                Add variant examples here
                            </div>
                        </div>
                    }
                    code={`<[COMPONENT_NAME] variant="primary">Primary</[COMPONENT_NAME]>
<[COMPONENT_NAME] variant="secondary">Secondary</[COMPONENT_NAME]>
<[COMPONENT_NAME] variant="tertiary">Tertiary</[COMPONENT_NAME]>`}
                />

                {/* Variant descriptions */}
                <ul className="space-y-3 text-ghost-white/80">
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">primary</strong> - Description of when to use this variant
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">secondary</strong> - Description of when to use this variant
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">tertiary</strong> - Description of when to use this variant
                        </div>
                    </li>
                </ul>
            </section>

            {/* 
                SECTION 4: Additional Examples
                
                Provide at least 2 more examples beyond Basic Usage.
                Show different prop combinations, use cases, or composition patterns.
                Each example should demonstrate something new and useful.
                
                Requirements: 1.2, 3.1, 3.3, 10.1, 10.3, 10.4
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Example: [Example Title]
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    {/* TODO: Explain what this example demonstrates */}
                    This example shows how to use [COMPONENT_NAME] with [specific props or in a specific context].
                </p>

                <ComponentPlayground
                    preview={
                        <div className="flex items-center justify-center py-12">
                            {/* TODO: Add your example */}
                            <div className="text-ghost-white/60">
                                Add your example here
                            </div>
                        </div>
                    }
                    code={`// TODO: Add code for this example
import { [COMPONENT_NAME] } from 'ghostui-react';

export default function Example() {
  return (
    <[COMPONENT_NAME] prop="value">
      Example content
    </[COMPONENT_NAME]>
  );
}`}
                />
            </section>

            {/* 
                SECTION 5: Advanced Example
                
                Show a more complex use case, composition pattern, or advanced configuration.
                This helps users understand the full capabilities of the component.
                
                Requirements: 3.1, 3.2, 10.3
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Advanced Usage
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    {/* TODO: Explain the advanced use case */}
                    For more complex scenarios, [COMPONENT_NAME] can be combined with other components 
                    or configured with advanced props.
                </p>

                <ComponentPlayground
                    preview={
                        <div className="flex items-center justify-center py-12">
                            {/* TODO: Add your advanced example */}
                            <div className="text-ghost-white/60">
                                Add your advanced example here
                            </div>
                        </div>
                    }
                    code={`// TODO: Add code for advanced example
import { [COMPONENT_NAME] } from 'ghostui-react';

export default function AdvancedExample() {
  // Add state, handlers, or other logic
  
  return (
    <[COMPONENT_NAME]
      // Advanced props
    >
      Advanced content
    </[COMPONENT_NAME]>
  );
}`}
                />
            </section>

            {/* 
                SECTION 6: Disabled State (if applicable)
                
                If your component supports a disabled state, show it here.
                
                Requirements: 1.4, 3.4
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Disabled State
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    Use the <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">disabled</code> prop 
                    to disable the component and prevent user interaction.
                </p>

                <ComponentPlayground
                    preview={
                        <div className="flex flex-wrap items-center gap-6">
                            {/* TODO: Show disabled variants */}
                            <div className="text-ghost-white/60">
                                Add disabled state examples here
                            </div>
                        </div>
                    }
                    code={`<[COMPONENT_NAME] disabled>Disabled</[COMPONENT_NAME]>`}
                />
            </section>

            {/* 
                SECTION 7: Composition (if applicable)
                
                Show how the component works with other GhostUI components.
                This is especially important for components that are commonly composed.
                
                Requirements: 3.1, 3.2
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Composition with Other Components
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    {/* TODO: Explain composition patterns */}
                    [COMPONENT_NAME] works well with other GhostUI components. Here's an example 
                    of composing it with [OTHER_COMPONENT].
                </p>

                <ComponentPlayground
                    preview={
                        <div className="flex items-center justify-center py-12">
                            {/* TODO: Show composition example */}
                            <div className="text-ghost-white/60">
                                Add composition example here
                            </div>
                        </div>
                    }
                    code={`import { [COMPONENT_NAME], [OTHER_COMPONENT] } from 'ghostui-react';

export default function CompositionExample() {
  return (
    <[OTHER_COMPONENT]>
      <[COMPONENT_NAME]>
        Composed content
      </[COMPONENT_NAME]>
    </[OTHER_COMPONENT]>
  );
}`}
                />
            </section>

            {/* 
                SECTION 8: Accessibility
                
                Document accessibility features and best practices.
                Include keyboard navigation, ARIA attributes, screen reader support, etc.
                
                Requirements: 1.5
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Accessibility
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    [COMPONENT_NAME] follows accessibility best practices to ensure it's usable by everyone.
                </p>

                <ul className="space-y-3 text-ghost-white/80">
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">Keyboard Navigation:</strong> Describe keyboard shortcuts and tab order
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">Screen Reader Support:</strong> Describe ARIA labels and announcements
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">Focus Management:</strong> Describe focus states and indicators
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">Reduced Motion:</strong> Describe support for prefers-reduced-motion
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-ghost-orange mr-3 mt-1">•</span>
                        <div>
                            <strong className="text-ghost-orange">Color Contrast:</strong> Describe color contrast ratios and compliance
                        </div>
                    </li>
                </ul>

                {/* Optional: Add an info box with additional accessibility notes */}
                <div className="bg-ghost-orange/10 border border-ghost-orange/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-ghost-white mb-3">
                        Accessibility Best Practices
                    </h3>
                    <p className="text-ghost-white/70 text-sm">
                        {/* TODO: Add specific accessibility recommendations */}
                        When using [COMPONENT_NAME], ensure you provide appropriate ARIA labels 
                        and descriptions for screen reader users. Test with keyboard navigation 
                        and verify that all interactive elements are accessible.
                    </p>
                </div>
            </section>

            {/* 
                SECTION 9: Usage with Refs (if applicable)
                
                If your component supports ref forwarding, document it here.
                
                Requirements: 1.1, 6.1
            */}
            <section className="space-y-6 mt-12">
                <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
                    Usage with Refs
                </h2>
                
                <p className="text-ghost-white/80 leading-relaxed">
                    [COMPONENT_NAME] supports ref forwarding for direct DOM access. This is useful 
                    for programmatic focus management or measuring element dimensions.
                </p>

                <ComponentPlayground
                    preview={
                        <div className="flex items-center justify-center py-12">
                            {/* TODO: Add ref example */}
                            <div className="text-ghost-white/60">
                                Add ref usage example here
                            </div>
                        </div>
                    }
                    code={`import { useRef } from 'react';
import { [COMPONENT_NAME] } from 'ghostui-react';

export default function RefExample() {
  const componentRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    // Access the DOM element directly
    componentRef.current?.focus();
  };

  return (
    <[COMPONENT_NAME] ref={componentRef}>
      Content
    </[COMPONENT_NAME]>
  );
}`}
                />
            </section>

            {/* 
                ADDITIONAL SECTIONS
                
                Add any other sections specific to your component:
                - Theming
                - Performance considerations
                - Common patterns
                - Troubleshooting
                - Migration guides
                
                Always maintain the space-y-6 mt-12 structure for consistency.
            */}
        </div>
    );
}

/**
 * CHECKLIST BEFORE PUBLISHING
 * 
 * Ensure your documentation meets all requirements:
 * 
 * Content:
 * ☐ Component name and description are clear and accurate
 * ☐ All props are documented with name, type, default, and description
 * ☐ At least 3 distinct usage examples are provided
 * ☐ All variants are documented (if applicable)
 * ☐ Accessibility information is included (if applicable)
 * ☐ Code examples are syntactically correct and copy-paste ready
 * 
 * Styling:
 * ☐ Page uses space-y-12 for main container
 * ☐ H1 uses text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide
 * ☐ H2 uses text-2xl md:text-3xl font-display text-ghost-orange tracking-wide
 * ☐ Lead paragraph uses lead text-ghost-white/90
 * ☐ Body text uses text-ghost-white/80 leading-relaxed
 * ☐ Sections use space-y-6 mt-12
 * ☐ Preview containers have appropriate padding (py-12 or p-8)
 * 
 * Components:
 * ☐ ComponentPlayground is used for all interactive examples
 * ☐ PropsTable is used for API documentation
 * ☐ All imports are correct
 * 
 * Requirements Coverage:
 * ☐ 1.1 - Complete API reference with all props
 * ☐ 1.2 - At least 3 distinct usage examples
 * ☐ 1.3 - Basic usage section with minimal example
 * ☐ 1.4 - All variants and states documented
 * ☐ 1.5 - Accessibility information included
 * ☐ 2.1 - Consistent spacing (space-y-12 between sections)
 * ☐ 2.2 - Consistent header-content spacing (space-y-4)
 * ☐ 2.3 - Uniform typography styles
 * ☐ 2.4 - Consistent preview container padding
 * ☐ 2.5 - Consistent preview container styling
 * ☐ 4.1 - Standard section order followed
 * ☐ 4.2 - ComponentPlayground used for examples
 * ☐ 4.3 - PropsTable used for API
 * ☐ 4.4 - Consistent CSS classes applied
 * ☐ 4.5 - Lead paragraph included
 */
