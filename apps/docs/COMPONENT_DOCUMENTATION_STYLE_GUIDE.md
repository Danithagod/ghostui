# GhostUI Component Documentation Style Guide

This style guide defines the standards for creating consistent, comprehensive documentation for all GhostUI components. Following these guidelines ensures that developers have a uniform experience across all component pages.

## Table of Contents

1. [Page Structure](#page-structure)
2. [Typography Standards](#typography-standards)
3. [Spacing Guidelines](#spacing-guidelines)
4. [Container Styles](#container-styles)
5. [Code Examples](#code-examples)
6. [API Documentation](#api-documentation)
7. [Usage Examples](#usage-examples)
8. [Accessibility Information](#accessibility-information)

---

## Page Structure

Every component documentation page should follow this standard structure:

### Required Sections (in order)

1. **Header Section**
   - Component name (H1)
   - Lead paragraph describing the component's purpose and key features
   - Optional: Key features list in an info box

2. **Basic Usage**
   - ComponentPlayground with interactive demo
   - Code example showing minimal implementation
   - API reference (PropsTable)

3. **Additional Examples**
   - At least 2-3 more examples demonstrating different use cases
   - Each example should have a descriptive title (H2 or H3)
   - Include both preview and code

4. **Variants** (if applicable)
   - Document all available variants
   - Show examples of each variant

5. **Advanced Usage** (optional)
   - Complex examples
   - Composition patterns
   - Integration with other components

6. **Accessibility** (if applicable)
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support

### Example Page Structure

```tsx
export default function ComponentPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
          Component Name
        </h1>
        <p className="lead text-ghost-white/90">
          Brief description of the component's purpose and key features.
        </p>
      </div>

      {/* 2. Basic Usage with ComponentPlayground */}
      <ComponentPlayground
        preview={/* Interactive demo */}
        code={/* Code example */}
        api={<PropsTable props={propsData} />}
      />

      {/* 3. Additional Sections */}
      <section className="space-y-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
          Section Title
        </h2>
        {/* Section content */}
      </section>
    </div>
  );
}
```

---

## Typography Standards

### Headers

Use consistent header styles to maintain visual hierarchy:

#### H1 - Component Title
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
  Component Name
</h1>
```
- **Size**: `text-3xl md:text-4xl lg:text-5xl`
- **Font**: `font-display`
- **Color**: `text-ghost-orange`
- **Tracking**: `tracking-wide`

#### H2 - Major Sections
```tsx
<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
  Section Title
</h2>
```
- **Size**: `text-2xl md:text-3xl`
- **Font**: `font-display`
- **Color**: `text-ghost-orange`
- **Tracking**: `tracking-wide`

#### H3 - Subsections
```tsx
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
  Subsection Title
</h3>
```
- **Size**: `text-xl md:text-2xl`
- **Weight**: `font-semibold`
- **Color**: `text-ghost-white`

#### H4 - Minor Subsections
```tsx
<h4 className="text-lg font-semibold text-ghost-white">
  Minor Title
</h4>
```
- **Size**: `text-lg`
- **Weight**: `font-semibold`
- **Color**: `text-ghost-white`

### Body Text

#### Lead Paragraph
```tsx
<p className="lead text-ghost-white/90">
  This is the lead paragraph that introduces the component.
</p>
```
- **Class**: `lead` (custom class for larger text)
- **Color**: `text-ghost-white/90`

#### Regular Body Text
```tsx
<p className="text-ghost-white/80 leading-relaxed">
  This is regular body text with comfortable line height.
</p>
```
- **Color**: `text-ghost-white/80`
- **Line Height**: `leading-relaxed`

#### Inline Code
```tsx
<code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
  propName
</code>
```
- **Padding**: `px-1.5 py-0.5`
- **Background**: `bg-ghost-dark/50`
- **Color**: `text-ghost-green`
- **Font**: `font-mono`

---

## Spacing Guidelines

Consistent spacing creates visual rhythm and improves readability.

### Vertical Spacing Scale

- **Between major sections**: `mt-12` (48px)
- **Between subsections**: `mt-8` (32px)
- **Between content blocks**: `mt-6` (24px)
- **Between header and content**: `space-y-4` (16px)
- **Between paragraphs**: `space-y-6` (24px)
- **Within lists**: `space-y-3` (12px)

### Page Container
```tsx
<div className="space-y-12">
  {/* All major sections */}
</div>
```

### Section Container
```tsx
<section className="space-y-6 mt-12">
  {/* Section content */}
</section>
```

### Header-Content Spacing
```tsx
<div className="space-y-4">
  <h1>Title</h1>
  <p>Content immediately following header</p>
</div>
```

---

## Container Styles

### Preview Container

Use for interactive component demonstrations:

```tsx
<div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
  {/* Component preview */}
</div>
```

**Standard padding**: `p-8` (32px)  
**Compact padding**: `p-6` (24px) for smaller components

### Code Block Container

```tsx
<div className="rounded-lg bg-ghost-black border border-ghost-orange/30 overflow-hidden shadow-lg hover:border-ghost-orange/50 transition-all duration-300">
  <div className="bg-ghost-orange/10 px-4 py-2 border-b border-ghost-orange/30">
    <span className="text-ghost-orange text-sm font-mono font-semibold">
      Filename.tsx
    </span>
  </div>
  <pre className="p-4 overflow-x-auto">
    <code className="text-sm text-ghost-white/90 font-mono">
      {/* Code content */}
    </code>
  </pre>
</div>
```

### Info Box

Use for highlighting important information:

```tsx
<div className="bg-ghost-orange/10 border border-ghost-orange/30 rounded-lg p-6">
  <h4 className="text-lg font-semibold text-ghost-white mb-2">
    Info Title
  </h4>
  <p className="text-ghost-white/80 text-sm leading-relaxed">
    Information content
  </p>
</div>
```

### Warning Box

```tsx
<div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
  <h4 className="text-sm font-semibold text-yellow-500 mb-2">
    Warning Title
  </h4>
  <p className="text-ghost-white/70 text-xs">
    Warning content
  </p>
</div>
```

### Feature Box

Use for listing key features:

```tsx
<div className="p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/10">
  <h4 className="text-ghost-orange font-semibold mb-2">
    Feature Title
  </h4>
  <p className="text-ghost-white/70 text-sm leading-relaxed">
    Feature description
  </p>
</div>
```

---

## Code Examples

### Minimum Requirements

Every component page must include:

1. **Basic usage example** - Minimal working code
2. **At least 2 additional examples** - Different use cases or prop combinations
3. **Variant examples** - If the component has variants

### Code Example Format

```tsx
<ComponentPlayground
  preview={
    <div className="bg-[#05020a] rounded-lg p-8">
      {/* Interactive component demo */}
    </div>
  }
  code={`import { Component } from 'ghostui-react';

export default function Example() {
  return (
    <Component prop="value" />
  );
}`}
  api={<PropsTable props={propsData} />}
/>
```

### Code Snippet Best Practices

- **Keep examples focused** - One concept per example
- **Use realistic scenarios** - Show practical applications
- **Include imports** - Always show necessary imports
- **Add comments** - Explain non-obvious code
- **Make it copyable** - Code should work when copied directly

---

## API Documentation

### PropsTable Component

Every component must have a complete API reference using the PropsTable component:

```tsx
import { PropsTable } from '@/components/PropsTable';

const propsData = [
  {
    name: 'propName',
    type: 'string',
    required: true,
    default: undefined,
    description: 'Clear description of what this prop does',
  },
  // ... more props
];

<PropsTable props={propsData} />
```

### Components Without Props

For components that accept no props (self-contained components), omit the PropsTable and instead include an "Implementation Notes" section explaining the component's behavior:

```tsx
<ComponentPlayground
  preview={/* Interactive demo */}
  code={/* Code example */}
  // No api prop - component has no props
/>

{/* Add Implementation Notes section instead */}
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Implementation Notes
  </h2>
  
  <div className="space-y-4">
    <div className="p-6 rounded-lg bg-ghost-orange/10 border border-ghost-orange/30">
      <h3 className="text-lg font-semibold text-ghost-white mb-3">
        No Props Required
      </h3>
      <p className="text-ghost-white/80 text-sm leading-relaxed">
        This component is self-contained and requires no props. 
        Simply add it to your app and it will work automatically.
      </p>
    </div>
  </div>
</section>
```

### Prop Documentation Requirements

Each prop must include:

1. **Name** - Exact prop name (camelCase)
2. **Type** - TypeScript type (string, number, boolean, etc.)
3. **Required** - Whether the prop is required (true/false)
4. **Default** - Default value if not required
5. **Description** - Clear explanation of the prop's purpose and behavior

### Complex Types

For union types or object shapes, provide clear explanations:

```tsx
{
  name: 'variant',
  type: "'primary' | 'secondary' | 'ghost'",
  required: false,
  default: "'primary'",
  description: 'Visual style variant. Primary uses orange, secondary uses purple, ghost is transparent.',
}
```

---

## Usage Examples

### Example Categories

Provide examples in these categories:

1. **Basic Usage** - Minimal implementation
2. **Prop Variations** - Different prop combinations
3. **Variants** - All available variants
4. **Composition** - Using with other components
5. **Advanced** - Complex scenarios or patterns

### Example Structure

```tsx
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Example Category
  </h2>
  <p className="text-ghost-white/80 leading-relaxed">
    Brief explanation of what this example demonstrates.
  </p>
  
  <ComponentPlayground
    preview={/* Demo */}
    code={/* Code */}
  />
  
  <div className="mt-6 p-4 rounded-lg bg-ghost-orange/10 border border-ghost-orange/20">
    <p className="text-ghost-white/80 text-sm">
      Additional notes or tips about this example.
    </p>
  </div>
</section>
```

---

## Accessibility Information

### When to Include

Include accessibility information when the component:

- Uses ARIA attributes
- Supports keyboard navigation
- Has screen reader considerations
- Requires specific markup for accessibility

### Accessibility Section Format

```tsx
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Accessibility
  </h2>
  
  <div className="space-y-4">
    <div className="p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/10">
      <h4 className="text-ghost-orange font-semibold mb-2">
        Keyboard Navigation
      </h4>
      <ul className="space-y-2 text-ghost-white/70 text-sm">
        <li><kbd>Tab</kbd> - Focus the component</li>
        <li><kbd>Enter</kbd> - Activate</li>
        <li><kbd>Escape</kbd> - Close/dismiss</li>
      </ul>
    </div>
    
    <div className="p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/10">
      <h4 className="text-ghost-orange font-semibold mb-2">
        ARIA Attributes
      </h4>
      <p className="text-ghost-white/70 text-sm">
        The component automatically includes appropriate ARIA attributes
        for screen reader support.
      </p>
    </div>
  </div>
</section>
```

---

## Quick Reference Checklist

Use this checklist when creating or updating component documentation:

### Content
- [ ] Component name and description
- [ ] Lead paragraph with key features
- [ ] Basic usage example
- [ ] At least 3 total examples
- [ ] Complete API documentation (PropsTable)
- [ ] All variants documented (if applicable)
- [ ] Accessibility information (if applicable)

### Styling
- [ ] H1 uses `text-3xl md:text-4xl lg:text-5xl`
- [ ] H2 uses `text-2xl md:text-3xl`
- [ ] H3 uses `text-xl md:text-2xl`
- [ ] Major sections have `mt-12` spacing
- [ ] Subsections have `mt-8` spacing
- [ ] Preview containers use `p-8` or `p-6`
- [ ] Consistent border and background colors
- [ ] Body text uses `text-ghost-white/80 leading-relaxed`

### Code Quality
- [ ] All code examples are syntactically valid
- [ ] Imports are included in examples
- [ ] Examples are copyable and functional
- [ ] Complex code has explanatory comments

### API Documentation
- [ ] All props have name, type, and description
- [ ] Required props are marked
- [ ] Default values are specified
- [ ] Complex types are explained clearly

---

## Using the Style Guide Utilities

Import the style guide utilities in your component page:

```tsx
import {
  docStyles,
  createPageHeader,
  createSectionHeader,
  createCodeExample,
  createPropsData,
} from '@/lib/doc-styles';

export default function ComponentPage() {
  const header = createPageHeader(
    'Component Name',
    'Component description'
  );
  
  const propsData = createPropsData([
    {
      name: 'prop1',
      type: 'string',
      required: true,
      description: 'Description',
    },
  ]);
  
  return (
    <div className={docStyles.page.container}>
      <div className={header.container}>
        <h1 className={header.title}>{header.titleText}</h1>
        <p className={header.description}>{header.descriptionText}</p>
      </div>
      
      {/* Rest of the page */}
    </div>
  );
}
```

---

## Examples of Well-Documented Components

Reference these components for examples of excellent documentation:

- **bat-burst** - Comprehensive with detailed explanations
- **gooey-button** - Clear variant documentation
- **ghost-toast** - Good API documentation
- **moonlight-switch** - Excellent usage examples
- **whisper-box** - Well-structured sections
- **ghost-cursor** - Example of documenting a component without props

---

## Getting Help

If you have questions about the style guide or need help with documentation:

1. Review the examples listed above
2. Check the `apps/docs/lib/doc-styles.ts` file for available utilities
3. Look at the PropsTable and ComponentPlayground components
4. Consult the design document at `.kiro/specs/component-docs-standardization/design.md`

---

## Learnings from Standardization Project

### Common Issues Discovered

During the documentation standardization project (December 2025), we audited all 21 component pages and identified several common patterns that should be avoided:

#### Typography Issues
1. **Inconsistent H3 styling** - Most common issue (104 occurrences)
   - Always use: `text-xl md:text-2xl font-semibold text-ghost-white`
   - Don't use: `text-lg` or `text-2xl` without responsive classes

2. **Missing responsive classes on headers**
   - H1 must include: `text-3xl md:text-4xl lg:text-5xl`
   - H2 must include: `text-2xl md:text-3xl`
   - Never use single breakpoint sizing

3. **Inline code without proper styling** (78 occurrences)
   - Always include all classes: `px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs`
   - Don't use partial styling or omit padding

#### Preview Container Issues
1. **Wrong border colors** (113 occurrences)
   - Use: `border-ghost-orange/30` (accent color)
   - Don't use: `border-ghost-gray/20` or other colors

2. **Missing border radius** (38 occurrences)
   - Always include: `rounded-lg`

3. **Hardcoded colors instead of CSS variables** (11 occurrences)
   - Use: `var(--ghost-orange)`, `var(--ghost-dark)`, etc.
   - Don't use: `#ff6b35`, `#1a1a1a`, etc.

#### Spacing Issues
1. **Inconsistent preview padding** (71 occurrences)
   - Standard: `p-8` for most components
   - Large: `py-12` for full-width examples
   - Compact: `p-6` for small components
   - Don't use: `p-4` or other values

2. **Wrong page container spacing** (7 occurrences)
   - Use: `space-y-12` for major sections
   - Don't use: `space-y-8` or other values

#### Structural Issues
1. **Missing lead paragraphs** - Affected ALL pages initially
   - Every page must have a lead paragraph after H1
   - Must use: `lead text-ghost-white/90` classes

2. **Sections out of order** (11 pages)
   - Follow standard order: Header → Basic Usage → API → Examples → Variants
   - Don't place examples before basic usage

3. **ComponentPlayground positioned incorrectly** (5 pages)
   - First playground must appear immediately after lead paragraph
   - Don't place H2 headers between lead and first example

### Best Practices Learned

1. **Use the audit tool regularly**
   ```bash
   npm run audit
   ```
   Run before committing documentation changes to catch issues early.

2. **Test responsive design**
   - Always check documentation at mobile, tablet, and desktop sizes
   - Responsive typography classes are essential, not optional

3. **Follow the template exactly**
   - The COMPONENT_TEMPLATE.tsx exists for a reason
   - Deviating from the template creates inconsistencies

4. **Complete API documentation**
   - Every prop must have: name, type, default, description
   - Use `"undefined"` for props without defaults
   - Don't leave `default` field empty

5. **Provide at least 3 examples**
   - Basic usage (minimal)
   - Variants or configurations
   - Advanced usage or integration

### Automated vs Manual Fixes

**Auto-fixable (86.5% of issues):**
- Typography class updates
- Preview container styling
- Spacing adjustments
- Border and radius additions
- CSS variable replacements

**Requires manual work (13.5% of issues):**
- Writing lead paragraphs
- Creating additional examples
- Reorganizing sections
- Adding missing API documentation
- Creating content for missing sections

### Maintenance Guidelines

1. **Run audit in CI/CD**
   - Add to pre-commit hooks
   - Fail builds below 95% compliance
   - Track compliance trends over time

2. **Use dry-run mode for previews**
   ```bash
   npm run audit -- --fix --dry-run
   ```
   Review changes before applying them.

3. **Fix issues incrementally**
   - Apply automated fixes first (quick wins)
   - Then tackle manual fixes by priority
   - Test thoroughly after each batch

4. **Document exceptions**
   - If a component needs different styling, document why
   - Create exception list in style guide
   - Get team approval for deviations

### Common Mistakes to Avoid

1. **Don't remove content during fixes**
   - Only reorganize or enhance existing content
   - Preserve all examples and explanations

2. **Don't skip testing**
   - Always verify pages render correctly after changes
   - Check that interactive elements still work
   - Test responsive behavior

3. **Don't mix concerns**
   - Fix one issue type at a time
   - Commit changes in logical batches
   - Makes rollback easier if needed

4. **Don't guess at defaults**
   - Check component source code for accurate default values
   - Use `"undefined"` when truly no default exists

5. **Don't hardcode values**
   - Always use CSS variables for colors
   - Use Tailwind classes instead of inline styles
   - Maintains theme consistency

### Tools and Commands

**Audit all pages:**
```bash
npm run audit
```

**Audit specific component:**
```bash
npm run audit -- --component=gooey-button
```

**Generate report:**
```bash
npm run audit -- --report --format=markdown
```

**Apply automated fixes (with preview):**
```bash
npm run audit -- --fix --dry-run
```

**Apply automated fixes (for real):**
```bash
npm run audit -- --fix
```

**Generate HTML report:**
```bash
npm run audit -- --report --format=html
```

### Success Metrics

After standardization project completion:
- ✅ 100% content compliance (all essential elements present)
- ✅ All pages have API documentation
- ✅ All pages have multiple usage examples
- ✅ All pages have lead paragraphs
- ✅ Consistent structure across all pages

Remaining opportunities:
- 462 auto-fixable style issues identified
- Can achieve 100% style compliance with automated fixes
- 83 manual improvements for enhanced quality

---

**Last Updated**: December 5, 2025  
**Version**: 1.1.0
