# Common Documentation Issues and Fixes

**Purpose:** Quick reference guide for fixing common documentation issues  
**Audience:** Developers working on GhostUI documentation  
**Last Updated:** December 5, 2025

---

## Table of Contents

1. [Typography Issues](#typography-issues)
2. [Preview Container Issues](#preview-container-issues)
3. [Spacing Issues](#spacing-issues)
4. [Structural Issues](#structural-issues)
5. [API Documentation Issues](#api-documentation-issues)
6. [Quick Fix Cheat Sheet](#quick-fix-cheat-sheet)

---

## Typography Issues

### H1: Missing Responsive Classes

**❌ Incorrect:**
```tsx
<h1 className="text-3xl font-display text-ghost-orange">
  Gooey Button
</h1>
```

**✅ Correct:**
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
  Gooey Button
</h1>
```

**What's wrong:**
- Missing `md:text-4xl` and `lg:text-5xl` for responsive sizing
- Missing `tracking-wide` for better readability

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add the missing classes

**Why it matters:**
- Ensures consistent sizing across all breakpoints
- Improves readability on larger screens
- Maintains visual hierarchy

---

### H2: Wrong Color or Size

**❌ Incorrect:**
```tsx
<h2 className="text-3xl font-display text-ghost-white mt-12">
  Basic Usage
</h2>
```

**✅ Correct:**
```tsx
<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
  Basic Usage
</h2>
```

**What's wrong:**
- Using `text-3xl` instead of `text-2xl md:text-3xl`
- Using `text-ghost-white` instead of `text-ghost-orange`
- Missing `tracking-wide`
- Has `mt-12` (spacing should be handled by parent container)

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Replace with correct classes, remove `mt-12`

**Why it matters:**
- H2 should be smaller than H1 (visual hierarchy)
- Orange accent color creates consistency
- Spacing should be handled by parent container

---

### H3: Missing Responsive Classes

**❌ Incorrect:**
```tsx
<h3 className="text-xl font-semibold text-ghost-white">
  Variants
</h3>
```

**✅ Correct:**
```tsx
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
  Variants
</h3>
```

**What's wrong:**
- Missing `md:text-2xl` for responsive sizing

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add `md:text-2xl`

**Why it matters:**
- Maintains visual hierarchy (H3 < H2 < H1)
- Improves readability on larger screens
- Note: H3 uses white color (not orange) to differentiate from H1/H2

---

### Lead Paragraph: Missing or Wrong Classes

**❌ Incorrect:**
```tsx
<h1>Gooey Button</h1>
<p className="text-ghost-white/80 leading-relaxed">
  This is a button component with gooey effects.
</p>
```

**✅ Correct:**
```tsx
<h1>Gooey Button</h1>
<p className="lead text-ghost-white/90">
  An interactive button component with a distinctive gooey, morphing effect. 
  Features smooth hover animations, multiple variants, and customizable styling, 
  ideal for creating engaging call-to-action elements.
</p>
```

**What's wrong:**
- Missing `lead` class (makes text larger)
- Using `text-ghost-white/80` instead of `text-ghost-white/90`
- Content is too brief and doesn't follow template

**How to fix:**
- ✋ Manual only - requires writing appropriate content
- Use template: "A [type] component that [function]. Features [characteristics], ideal for [use case]."
- Add `lead text-ghost-white/90` classes

**Why it matters:**
- Lead paragraph is the first thing developers read
- Larger text draws attention
- Provides immediate context about the component
- Improves SEO and accessibility

---

### Inline Code: Missing Styling

**❌ Incorrect:**
```tsx
<p>
  Set the <code>variant</code> prop to change the style.
</p>

<p>
  Set the <code className="text-ghost-green">variant</code> prop.
</p>

<p>
  Set the <code className="text-ghost-green bg-black/30 px-1 rounded">variant</code> prop.
</p>
```

**✅ Correct:**
```tsx
<p>
  Set the <code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">variant</code> prop to change the style.
</p>
```

**What's wrong:**
- Missing padding, background, or font classes
- Inconsistent styling across the page

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add all required classes

**Class breakdown:**
- `px-1.5 py-0.5` - Comfortable padding
- `rounded` - Soft corners
- `bg-ghost-dark/50` - Subtle background
- `text-ghost-green` - Accent color for code
- `font-mono` - Monospace font
- `text-xs` - Slightly smaller than body text

**Why it matters:**
- Clear visual distinction from regular text
- Consistent code styling across all pages
- Improves readability

---

## Preview Container Issues

### Border: Wrong Color

**❌ Incorrect:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-gray/20">
  <GooeyButton>Click me</GooeyButton>
</div>
```

**✅ Correct:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  <GooeyButton>Click me</GooeyButton>
</div>
```

**What's wrong:**
- Using `border-ghost-gray/20` instead of `border-ghost-orange/30`

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change to `border-ghost-orange/30`

**Why it matters:**
- Orange accent color creates visual consistency
- More visible than gray border
- Ties preview to overall theme

---

### Border Radius: Missing

**❌ Incorrect:**
```tsx
<div className="p-8 bg-ghost-gray/10 border border-ghost-orange/30">
  <GooeyButton>Click me</GooeyButton>
</div>
```

**✅ Correct:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  <GooeyButton>Click me</GooeyButton>
</div>
```

**What's wrong:**
- Missing `rounded-lg` class

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add `rounded-lg`

**Why it matters:**
- Softer, more polished appearance
- Consistent with other UI elements
- Matches design system

---

### Colors: Hardcoded Instead of CSS Variables

**❌ Incorrect:**
```tsx
<div style={{ backgroundColor: '#1a1a1a', color: '#ff6b35' }}>
  <p>Content</p>
</div>

<div className="bg-[#1a1a1a] text-[#ff6b35]">
  <p>Content</p>
</div>
```

**✅ Correct:**
```tsx
<div style={{ backgroundColor: 'var(--ghost-dark)', color: 'var(--ghost-orange)' }}>
  <p>Content</p>
</div>

<div className="bg-ghost-dark text-ghost-orange">
  <p>Content</p>
</div>
```

**What's wrong:**
- Using hardcoded hex values
- Not theme-aware

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Replace with CSS variables or Tailwind classes

**Common replacements:**
- `#1a1a1a` → `var(--ghost-dark)` or `bg-ghost-dark`
- `#ff6b35` → `var(--ghost-orange)` or `text-ghost-orange`
- `#4ade80` → `var(--ghost-green)` or `text-ghost-green`
- `#ffffff` → `var(--ghost-white)` or `text-ghost-white`

**Why it matters:**
- Supports theme switching
- Centralized color management
- Easier to update colors globally

---

### Code Blocks: Missing Scroll Support

**❌ Incorrect:**
```tsx
<pre>
  <code className="text-sm text-ghost-white/90 font-mono">
    {longCodeExample}
  </code>
</pre>
```

**✅ Correct:**
```tsx
<pre className="overflow-x-auto">
  <code className="text-sm text-ghost-white/90 font-mono">
    {longCodeExample}
  </code>
</pre>
```

**What's wrong:**
- Missing `overflow-x-auto` on `<pre>` element

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add `overflow-x-auto` to `<pre>`

**Why it matters:**
- Prevents layout breaking on narrow screens
- Long code lines scroll instead of wrapping
- Better mobile experience

---

## Spacing Issues

### Page Container: Wrong Spacing

**❌ Incorrect:**
```tsx
export default function ComponentPage() {
  return (
    <div className="space-y-8">
      {/* page content */}
    </div>
  );
}
```

**✅ Correct:**
```tsx
export default function ComponentPage() {
  return (
    <div className="space-y-12">
      {/* page content */}
    </div>
  );
}
```

**What's wrong:**
- Using `space-y-8` instead of `space-y-12`

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change to `space-y-12`

**Why it matters:**
- More generous spacing between major sections
- Improved readability
- Consistent with style guide
- Better visual hierarchy

---

### Preview Container: Inconsistent Padding

**❌ Incorrect:**
```tsx
<div className="p-4 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  <GooeyButton>Click me</GooeyButton>
</div>
```

**✅ Correct:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  <GooeyButton>Click me</GooeyButton>
</div>
```

**What's wrong:**
- Using `p-4` instead of standard padding

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change to appropriate padding

**Padding guidelines:**
- `py-12` - Large components, full-width examples
- `p-8` - Standard components (most common)
- `p-6` - Compact components, inline examples

**Why it matters:**
- Consistent visual rhythm
- Adequate breathing room for components
- Professional appearance

---

### Section Container: Missing Spacing

**❌ Incorrect:**
```tsx
<section>
  <h2>Section Title</h2>
  <p>Content</p>
</section>
```

**✅ Correct:**
```tsx
<section className="space-y-6 mt-12">
  <h2>Section Title</h2>
  <p>Content</p>
</section>
```

**What's wrong:**
- Missing `space-y-6` for internal spacing
- Missing `mt-12` for top margin

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add `space-y-6 mt-12`

**Why it matters:**
- Clear section separation
- Consistent spacing between elements
- Better visual hierarchy

---

## Structural Issues

### Lead Paragraph: Missing

**❌ Incorrect:**
```tsx
<div className="space-y-12">
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
    Gooey Button
  </h1>
  
  <ComponentPlayground {...basicUsage} />
</div>
```

**✅ Correct:**
```tsx
<div className="space-y-12">
  <div className="space-y-4">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
      Gooey Button
    </h1>
    <p className="lead text-ghost-white/90">
      An interactive button component with a distinctive gooey, morphing effect. 
      Features smooth hover animations, multiple variants, and customizable styling, 
      ideal for creating engaging call-to-action elements.
    </p>
  </div>
  
  <ComponentPlayground {...basicUsage} />
</div>
```

**What's wrong:**
- No lead paragraph after H1
- Missing header-content wrapper with `space-y-4`

**How to fix:**
- ✋ Manual only - requires writing content
- Wrap H1 and lead paragraph in `<div className="space-y-4">`
- Write descriptive lead paragraph using template

**Template:**
```
A [component type] that [primary function]. Features [key characteristics] 
and [special behavior], ideal for [use case].
```

**Why it matters:**
- Provides immediate context
- Helps developers understand purpose quickly
- Improves documentation quality and SEO

---

### Section Order: Incorrect

**❌ Incorrect:**
```tsx
<div className="space-y-12">
  {/* 1. Header */}
  <h1>Component Name</h1>
  
  {/* 2. Examples (wrong - should be after basic usage) */}
  <section>
    <h2>Examples</h2>
    <ComponentPlayground {...example1} />
  </section>
  
  {/* 3. Basic Usage (wrong - should be first) */}
  <ComponentPlayground {...basicUsage} />
  
  {/* 4. API */}
  <section>
    <h2>API Reference</h2>
    <PropsTable props={props} />
  </section>
</div>
```

**✅ Correct:**
```tsx
<div className="space-y-12">
  {/* 1. Header */}
  <div className="space-y-4">
    <h1>Component Name</h1>
    <p className="lead">Description</p>
  </div>
  
  {/* 2. Basic Usage (first example) */}
  <ComponentPlayground {...basicUsage} />
  
  {/* 3. API */}
  <section className="space-y-6 mt-12">
    <h2>API Reference</h2>
    <PropsTable props={props} />
  </section>
  
  {/* 4. Additional Examples */}
  <section className="space-y-6 mt-12">
    <h2>Examples</h2>
    <ComponentPlayground {...example1} />
  </section>
</div>
```

**Standard order:**
1. Header (H1 + lead paragraph)
2. Basic Usage (first ComponentPlayground)
3. API (PropsTable)
4. Examples (additional ComponentPlaygrounds)
5. Variants
6. Advanced Usage
7. Accessibility

**How to fix:**
- ✋ Manual only - requires reorganizing content
- Cut and paste sections into correct order
- Don't lose any content
- Test that all links still work

**Why it matters:**
- Predictable documentation structure
- Developers know where to find information
- Follows industry best practices

---

### ComponentPlayground: Positioned Incorrectly

**❌ Incorrect:**
```tsx
<h1>Component Name</h1>
<p className="lead">Description</p>

<h2>The Spirit Medium</h2>
<p>Some introductory text...</p>

<ComponentPlayground {...basicUsage} />
```

**✅ Correct:**
```tsx
<h1>Component Name</h1>
<p className="lead">Description</p>

<ComponentPlayground {...basicUsage} />

<section className="space-y-6 mt-12">
  <h2>Additional Information</h2>
  <p>Some text...</p>
</section>
```

**What's wrong:**
- H2 header between lead paragraph and first ComponentPlayground
- First example should appear immediately after introduction

**How to fix:**
- ✋ Manual only - requires moving content
- Move ComponentPlayground immediately after lead paragraph
- Remove or relocate intervening H2 headers

**Why it matters:**
- Immediate hands-on example
- Follows "show, don't tell" principle
- Reduces time to first interaction
- Matches user expectations

---

### Examples: Insufficient Count

**❌ Incorrect:**
```tsx
<div className="space-y-12">
  {/* Header */}
  <h1>Component Name</h1>
  <p className="lead">Description</p>
  
  {/* Only 2 examples */}
  <ComponentPlayground {...basicUsage} />
  
  <section>
    <h2>Variants</h2>
    <ComponentPlayground {...variants} />
  </section>
</div>
```

**✅ Correct:**
```tsx
<div className="space-y-12">
  {/* Header */}
  <h1>Component Name</h1>
  <p className="lead">Description</p>
  
  {/* 3+ examples */}
  <ComponentPlayground {...basicUsage} />
  
  <section className="space-y-6 mt-12">
    <h2>Variants</h2>
    <ComponentPlayground {...variants} />
  </section>
  
  <section className="space-y-6 mt-12">
    <h2>Advanced Usage</h2>
    <ComponentPlayground {...advanced} />
  </section>
</div>
```

**What's wrong:**
- Only 2 ComponentPlayground examples (need at least 3)

**How to fix:**
- ✋ Manual only - requires creating content
- Add third example showing:
  - Different variants
  - Advanced configuration
  - Integration with other components

**Example types:**
1. **Basic Usage** - Minimal, simple example
2. **Variants** - Different visual styles or sizes
3. **Advanced** - Complex configuration or integration

**Why it matters:**
- Shows component versatility
- Helps developers understand different use cases
- Provides more copy-paste examples
- Demonstrates best practices

---

## API Documentation Issues

### PropsTable: Missing

**❌ Incorrect:**
```tsx
<div className="space-y-12">
  <h1>Component Name</h1>
  <p className="lead">Description</p>
  
  <ComponentPlayground {...basicUsage} />
  
  {/* No API documentation */}
</div>
```

**✅ Correct:**
```tsx
<div className="space-y-12">
  <h1>Component Name</h1>
  <p className="lead">Description</p>
  
  <ComponentPlayground {...basicUsage} />
  
  <section className="space-y-6 mt-12">
    <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
      API Reference
    </h2>
    <PropsTable props={componentProps} />
  </section>
</div>
```

**What's wrong:**
- No API documentation section
- Developers can't see available props

**How to fix:**
- ✋ Manual only - requires documenting props
- Review component source code in `packages/ghostui/src/components/`
- Create props array with complete information
- Add PropsTable to page

**Props array template:**
```tsx
const componentProps = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "ghost"',
    default: '"primary"',
    description: "The visual style variant of the component"
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "The size of the component"
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the component is disabled"
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional CSS classes to apply"
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    description: "The content to display inside the component"
  }
];
```

**Why it matters:**
- Essential for developers to use component correctly
- Documents all available options
- Provides type information
- Shows default values

---

### Prop Definitions: Incomplete

**❌ Incorrect:**
```tsx
const componentProps = [
  {
    name: "variant",
    type: "string",
    description: "The variant"
    // Missing: default
  },
  {
    name: "children",
    type: "React.ReactNode",
    // Missing: default and description
  }
];
```

**✅ Correct:**
```tsx
const componentProps = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "ghost"',
    default: '"primary"',
    description: "The visual style variant of the component. Primary uses orange, secondary uses purple, ghost is transparent."
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    description: "The content to display inside the component"
  }
];
```

**What's wrong:**
- Missing `default` field
- Vague or missing descriptions
- Generic types instead of specific unions

**How to fix:**
- ✋ Manual only - requires checking source code
- Add `default` field to each prop
- Improve description clarity
- Use specific types (union types for variants)

**Default value guidelines:**
- `"undefined"` - No default, prop is required
- `'""'` - Empty string default
- `"false"` - Boolean default
- `'"value"'` - String default
- `"-"` - No meaningful default

**Why it matters:**
- Developers need to know if prop is required
- Shows what happens if prop is omitted
- Complete API documentation
- Reduces confusion and errors

---

## Quick Fix Cheat Sheet

### Typography

```tsx
// H1
className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide"

// H2
className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide"

// H3
className="text-xl md:text-2xl font-semibold text-ghost-white"

// H4
className="text-lg font-semibold text-ghost-white"

// Lead paragraph
className="lead text-ghost-white/90"

// Body text
className="text-ghost-white/80 leading-relaxed"

// Inline code
className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs"
```

### Containers

```tsx
// Page container
className="space-y-12"

// Section container
className="space-y-6 mt-12"

// Header-content wrapper
className="space-y-4"

// Preview container (standard)
className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30"

// Preview container (large)
className="py-12 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30"

// Preview container (compact)
className="p-6 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30"
```

### Code Blocks

```tsx
// Code block container
<div className="rounded-lg bg-ghost-black border border-ghost-orange/30 overflow-hidden">
  <div className="bg-ghost-orange/10 px-4 py-2 border-b border-ghost-orange/30">
    <span className="text-ghost-orange text-sm font-mono font-semibold">
      Filename.tsx
    </span>
  </div>
  <pre className="p-4 overflow-x-auto">
    <code className="text-sm text-ghost-white/90 font-mono">
      {code}
    </code>
  </pre>
</div>
```

### CSS Variables

```tsx
// Common color replacements
'#1a1a1a' → 'var(--ghost-dark)'
'#ff6b35' → 'var(--ghost-orange)'
'#4ade80' → 'var(--ghost-green)'
'#ffffff' → 'var(--ghost-white)'
'#8b5cf6' → 'var(--ghost-purple)'
```

### Commands

```bash
# Audit all pages
npm run audit

# Audit specific component
npm run audit -- --component=gooey-button

# Preview fixes
npm run audit -- --fix --dry-run

# Apply fixes
npm run audit -- --fix

# Generate report
npm run audit -- --report --format=html
```

---

## Need More Help?

- **Style Guide:** `apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- **Maintenance Guide:** `apps/docs/DOCUMENTATION_MAINTENANCE_GUIDE.md`
- **Fix Plan:** `apps/docs/FIX_PLAN.md`
- **Issue Categorization:** `apps/docs/ISSUE_CATEGORIZATION.md`

---

**Last Updated:** December 5, 2025  
**Version:** 1.0.0
