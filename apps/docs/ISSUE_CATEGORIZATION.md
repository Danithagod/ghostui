# Issue Categorization and Fix Strategies

**Purpose:** Understand each type of issue and how to fix it  
**Audience:** Developers working on documentation fixes

---

## Table of Contents

1. [Typography Issues](#typography-issues)
2. [Preview Container Issues](#preview-container-issues)
3. [Spacing Issues](#spacing-issues)
4. [Structure Issues](#structure-issues)
5. [API Documentation Issues](#api-documentation-issues)

---

## Typography Issues

**Total:** 292 issues (48.7% of all issues)  
**Auto-fixable:** 271 (92.8%)  
**Manual:** 21 (7.2%)

### 1.1 H1 Typography (13 issues, 12 pages)

**Problem:** H1 headers missing responsive classes or accent color

**Current (Incorrect):**
```tsx
<h1 className="text-3xl font-display text-ghost-white">
  Component Name
</h1>
```

**Expected (Correct):**
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
  Component Name
</h1>
```

**Fix Strategy:**
- ⚡ **Automated:** Fixer will update className
- **Manual Verification:** Ensure text is readable at all breakpoints

**Why This Matters:**
- Consistent sizing across all pages
- Responsive design for mobile/tablet/desktop
- Accent color draws attention to component name
- Tracking improves readability of large text

---

### 1.2 H2 Typography (76 issues, 14 pages)

**Problem:** H2 section headers missing responsive classes or accent color

**Current (Incorrect):**
```tsx
<h2 className="text-3xl font-display text-ghost-white mt-12">
  Section Name
</h2>
```

**Expected (Correct):**
```tsx
<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
  Section Name
</h2>
```

**Fix Strategy:**
- ⚡ **Automated:** Fixer will update className
- **Note:** Remove `mt-12` as spacing is handled by parent container

**Why This Matters:**
- Visual hierarchy (H2 smaller than H1)
- Consistent accent color for all headers
- Responsive sizing for different screens

---

### 1.3 H3 Typography (104 issues, 15 pages)

**Problem:** H3 subsection headers missing responsive classes

**Current (Incorrect):**
```tsx
<h3 className="text-xl font-semibold text-ghost-white">
  Subsection Name
</h3>
```

**Expected (Correct):**
```tsx
<h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
  Subsection Name
</h3>
```

**Fix Strategy:**
- ⚡ **Automated:** Fixer will add `md:text-2xl`
- **Note:** H3 uses `text-ghost-white` (not orange) to differentiate from H1/H2

**Why This Matters:**
- Clear visual hierarchy (H3 < H2 < H1)
- Responsive sizing improves readability
- White color distinguishes from major headers

---

### 1.4 Lead Paragraph (21 issues, ALL pages)

**Problem:** Missing or improperly styled introductory paragraph after H1

**Current (Incorrect):**
```tsx
<h1>Component Name</h1>
<p className="text-ghost-white/80">
  This is a component...
</p>
```

**Expected (Correct):**
```tsx
<h1>Component Name</h1>
<p className="lead text-ghost-white/90">
  A [component type] that [primary function]. Features [key characteristics]
  and [special behavior], perfect for [use case].
</p>
```

**Fix Strategy:**
- ✋ **Manual:** Must write appropriate content for each component
- **Template:** See FIX_PLAN.md Phase 2 for component-specific paragraphs
- **Classes:** `lead` (larger text) + `text-ghost-white/90` (slightly brighter)

**Why This Matters:**
- Provides immediate context about the component
- Larger text draws attention
- Helps developers quickly understand purpose
- Improves SEO and accessibility

---

### 1.5 Inline Code (78 issues, 15 pages)

**Problem:** Inline code elements missing proper styling

**Current (Incorrect):**
```tsx
<code className="text-ghost-green">variant</code>
<code className="text-ghost-green bg-black/30 px-1 rounded">variant</code>
<code>variant</code>
```

**Expected (Correct):**
```tsx
<code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
  variant
</code>
```

**Fix Strategy:**
- ⚡ **Automated:** Fixer will update className
- **Verification:** Check that code is readable and stands out from body text

**Why This Matters:**
- Consistent code styling across all pages
- Clear visual distinction from regular text
- Proper padding improves readability
- Monospace font indicates code

**Class Breakdown:**
- `px-1.5 py-0.5` - Comfortable padding
- `rounded` - Soft corners
- `bg-ghost-dark/50` - Subtle background
- `text-ghost-green` - Accent color for code
- `font-mono` - Monospace font
- `text-xs` - Slightly smaller than body text

---

## Preview Container Issues

**Total:** 169 issues (28.2% of all issues)  
**Auto-fixable:** 169 (100%)

### 2.1 Border Styling (113 issues, 16 pages)

**Problem:** Preview containers using wrong border color

**Current (Incorrect):**
```tsx
<div className="p-4 bg-ghost-gray/10 rounded-lg border border-ghost-gray/20">
  {/* preview content */}
</div>
```

**Expected (Correct):**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview content */}
</div>
```

**Fix Strategy:**
- ⚡ **Automated:** Replace `border-ghost-gray/20` with `border-ghost-orange/30`
- **Why:** Orange accent color creates visual consistency

**Why This Matters:**
- Accent color ties preview to overall theme
- More visible than gray border
- Consistent with other UI elements

---

### 2.2 Border Radius (38 issues, 9 pages)

**Problem:** Preview containers missing rounded corners

**Current (Incorrect):**
```tsx
<div className="p-8 bg-ghost-gray/10 border border-ghost-orange/30">
  {/* preview content */}
</div>
```

**Expected (Correct):**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview content */}
</div>
```

**Fix Strategy:**
- ⚡ **Automated:** Add `rounded-lg` class
- **Visual Impact:** Softer, more polished appearance

---

### 2.3 Hardcoded Colors (11 issues, 5 pages)

**Problem:** Using hardcoded color values instead of CSS variables

**Current (Incorrect):**
```tsx
<div style={{ backgroundColor: '#1a1a1a' }}>
  {/* content */}
</div>
```

**Expected (Correct):**
```tsx
<div style={{ backgroundColor: 'var(--ghost-dark)' }}>
  {/* content */}
</div>
```

**Fix Strategy:**
- ⚡ **Automated:** Replace hardcoded colors with CSS variables
- **Benefits:** Theme-aware, easier to maintain

**Common Replacements:**
- `#1a1a1a` → `var(--ghost-dark)`
- `#ff6b35` → `var(--ghost-orange)`
- `#4ade80` → `var(--ghost-green)`
- `#ffffff` → `var(--ghost-white)`

**Why This Matters:**
- Supports theme switching
- Centralized color management
- Easier to update colors globally

---

### 2.4 Code Block Scrolling (7 issues, 5 pages)

**Problem:** Code blocks without horizontal scroll support

**Current (Incorrect):**
```tsx
<pre>
  <code>{longCodeExample}</code>
</pre>
```

**Expected (Correct):**
```tsx
<pre className="overflow-x-auto">
  <code>{longCodeExample}</code>
</pre>
```

**Fix Strategy:**
- ⚡ **Automated:** Add `overflow-x-auto` class
- **Impact:** Long code lines scroll instead of breaking layout

**Why This Matters:**
- Prevents layout breaking on narrow screens
- Preserves code formatting
- Better mobile experience

---

## Spacing Issues

**Total:** 78 issues (13.0% of all issues)  
**Auto-fixable:** 78 (100%)

### 3.1 Preview Container Padding (71 issues, 13 pages)

**Problem:** Inconsistent padding in preview containers

**Current (Incorrect):**
```tsx
<div className="p-4 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview */}
</div>
```

**Expected (Correct):**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview */}
</div>
```

**Fix Strategy:**
- ⚡ **Automated:** Update padding class
- **Options:** `py-12`, `p-8`, or `p-6` depending on content

**Padding Guidelines:**
- `py-12` - Large components, full-width examples
- `p-8` - Standard components, most common
- `p-6` - Compact components, inline examples

**Why This Matters:**
- Consistent visual rhythm
- Adequate breathing room for components
- Professional appearance

---

### 3.2 Root Container Spacing (7 issues, 7 pages)

**Problem:** Insufficient spacing between major sections

**Current (Incorrect):**
```tsx
<div className="space-y-8">
  {/* page content */}
</div>
```

**Expected (Correct):**
```tsx
<div className="space-y-12">
  {/* page content */}
</div>
```

**Fix Strategy:**
- ⚡ **Automated:** Replace `space-y-8` with `space-y-12`
- **Impact:** More generous spacing between sections

**Why This Matters:**
- Improved readability
- Clear section separation
- Consistent with style guide
- Better visual hierarchy

---

## Structure Issues

**Total:** 44 issues (7.3% of all issues)  
**Auto-fixable:** 0 (0%)  
**Manual:** 44 (100%)

### 4.1 Missing Lead Paragraph (21 issues, ALL pages)

**Problem:** No introductory paragraph after H1

**Fix Strategy:**
- ✋ **Manual:** Write component-specific lead paragraph
- **Reference:** See FIX_PLAN.md Phase 2 for all 21 paragraphs
- **Template:** See Typography Issues section 1.4

**Why This Matters:**
- First impression of the component
- Helps developers understand purpose quickly
- Improves documentation quality

---

### 4.2 Section Order (11 issues, 11 pages)

**Problem:** Sections not following standard order

**Current (Incorrect):**
```
1. Header
2. Examples
3. Basic Usage
4. API
```

**Expected (Correct):**
```
1. Header (H1 + lead paragraph)
2. Basic Usage (first ComponentPlayground)
3. API (PropsTable)
4. Examples (additional ComponentPlaygrounds)
5. Variants
6. Advanced Usage
7. Accessibility
```

**Fix Strategy:**
- ✋ **Manual:** Cut and paste sections into correct order
- **Caution:** Don't lose any content during reorganization
- **Test:** Verify all links and references still work

**Why This Matters:**
- Predictable documentation structure
- Developers know where to find information
- Follows industry best practices
- Easier to maintain

---

### 4.3 Minimum Examples (6 issues, 6 pages)

**Problem:** Only 2 ComponentPlayground examples instead of 3

**Affected Pages:**
- blood-smear
- ghost-cursor
- ghost-toast
- gooey-button
- grave-modal
- shadow-crawl

**Fix Strategy:**
- ✋ **Manual:** Create third ComponentPlayground example
- **Focus:** Variants, advanced usage, or different configurations

**Example Types:**
1. **Basic Usage** - Simple, minimal example
2. **Variants** - Different visual styles or sizes
3. **Advanced** - Complex configuration or integration

**Template:**
```tsx
<ComponentPlayground
  preview={
    <div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
      {/* Your example */}
    </div>
  }
  code={`
// Copy-paste ready code
import { Component } from '@ghostui/core';

export default function Example() {
  return <Component variant="advanced" />;
}
  `}
  api={<PropsTable props={componentProps} />}
/>
```

**Why This Matters:**
- Shows component versatility
- Helps developers understand different use cases
- Provides more copy-paste examples
- Demonstrates best practices

---

### 4.4 First ComponentPlayground Position (5 issues, 5 pages)

**Problem:** First ComponentPlayground appears after H2 headers

**Current (Incorrect):**
```tsx
<h1>Component Name</h1>
<p className="lead">Description</p>

<h2>The Spirit Medium</h2>
<p>Some text...</p>

<ComponentPlayground {...basicUsage} />
```

**Expected (Correct):**
```tsx
<h1>Component Name</h1>
<p className="lead">Description</p>

<ComponentPlayground {...basicUsage} />

<h2>Additional Examples</h2>
<p>More examples...</p>
```

**Fix Strategy:**
- ✋ **Manual:** Move ComponentPlayground immediately after lead paragraph
- **Remove or relocate:** Intervening H2 headers
- **Ensure:** Smooth content flow

**Why This Matters:**
- Immediate hands-on example
- Follows "show, don't tell" principle
- Reduces time to first interaction
- Matches user expectations

---

### 4.5 Missing API Prop in First Playground (1 issue)

**Problem:** First ComponentPlayground missing `api` prop

**Page:** ghost-cursor

**Current (Incorrect):**
```tsx
<ComponentPlayground
  preview={<GhostCursor />}
  code={codeExample}
/>
```

**Expected (Correct):**
```tsx
<ComponentPlayground
  preview={<GhostCursor />}
  code={codeExample}
  api={<PropsTable props={ghostCursorProps} />}
/>
```

**Fix Strategy:**
- ✋ **Manual:** Add `api` prop with PropsTable
- **Ensure:** PropsTable is defined with complete prop information

---

## API Documentation Issues

**Total:** 16 issues (2.7% of all issues)  
**Auto-fixable:** 0 (0%)  
**Manual:** 16 (100%)

### 5.1 Missing PropsTable (5 issues, 5 pages)

**Problem:** Page completely missing API documentation

**Affected Pages:**
- blood-smear
- ghost-cursor
- shadow-crawl
- wisp-trail
- grave-modal

**Fix Strategy:**
1. ✋ **Review component source code** in `packages/ghostui/src/components/`
2. ✋ **Identify all props** from TypeScript interface
3. ✋ **Create PropsTable** with complete information
4. ✋ **Add to page** in API section

**PropsTable Template:**
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

// In the page:
<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
  API Reference
</h2>
<PropsTable props={componentProps} />
```

**Why This Matters:**
- Essential for developers to use component correctly
- Documents all available options
- Provides type information
- Shows default values

---

### 5.2 Incomplete Prop Definitions (11 issues, 4 pages)

**Problem:** Props missing `default` field

**Affected Pages:**
- coffin-card (3 props)
- ghost-toast (2 props)
- gooey-card (3 props)
- gooey-drawer (3 props)

**Current (Incorrect):**
```tsx
{
  name: "children",
  type: "React.ReactNode",
  description: "The content to display"
  // Missing: default
}
```

**Expected (Correct):**
```tsx
{
  name: "children",
  type: "React.ReactNode",
  default: "undefined",
  description: "The content to display inside the component"
}
```

**Fix Strategy:**
1. ✋ **Review component source** to find actual default values
2. ✋ **Add `default` field** to each prop
3. ✋ **Use appropriate values:**
   - `"undefined"` - No default, prop is required
   - `'""'` - Empty string default
   - `"false"` - Boolean default
   - `'"value"'` - String default
   - `"-"` - No meaningful default

**Common Defaults:**
- `children`: `"undefined"` (usually required)
- `className`: `'""'` (empty string)
- `disabled`: `"false"`
- `variant`: `'"primary"'` or similar
- `size`: `'"md"'` or similar

**Why This Matters:**
- Developers need to know if prop is required
- Shows what happens if prop is omitted
- Complete API documentation
- Reduces confusion and errors

---

## Quick Reference: Fix Priority

### Do First (High Impact, Low Effort):
1. ⚡ Run automated fixer (518 issues, 2-3 hours)
2. ✋ Add lead paragraphs (21 issues, 4-6 hours)

### Do Second (High Impact, Medium Effort):
3. ✋ Complete API documentation (16 issues, 3-4 hours)
4. ✋ Add third examples (6 issues, 3-4 hours)

### Do Last (Medium Impact, High Effort):
5. ✋ Reorganize sections (17 issues, 4-6 hours)

---

## Testing Checklist

After fixing each issue type, verify:

### Typography:
- [ ] Headers render at correct sizes on mobile/tablet/desktop
- [ ] Accent colors are visible and consistent
- [ ] Lead paragraphs are readable and informative
- [ ] Inline code stands out from body text

### Preview Containers:
- [ ] Borders are visible with orange accent
- [ ] Corners are rounded
- [ ] Padding provides adequate space
- [ ] Code blocks scroll horizontally when needed
- [ ] Colors adapt to theme changes

### Spacing:
- [ ] Sections have clear visual separation
- [ ] Page doesn't feel cramped or too sparse
- [ ] Consistent rhythm throughout page

### Structure:
- [ ] Sections appear in logical order
- [ ] First example appears immediately after intro
- [ ] Navigation makes sense
- [ ] All content is preserved

### API Documentation:
- [ ] All props are documented
- [ ] Types are accurate
- [ ] Defaults are correct
- [ ] Descriptions are clear and helpful

---

## Common Mistakes to Avoid

1. **Don't remove content** - Only reorganize or enhance
2. **Don't break functionality** - Test components after fixes
3. **Don't skip testing** - Verify changes render correctly
4. **Don't mix concerns** - Fix one issue type at a time
5. **Don't forget accessibility** - Maintain ARIA attributes and keyboard navigation
6. **Don't hardcode values** - Use CSS variables for colors
7. **Don't skip lead paragraphs** - Every page needs one
8. **Don't guess defaults** - Check source code for accurate values

---

## Getting Help

If you encounter issues:

1. **Check the audit report** - Detailed information about each issue
2. **Review the style guide** - `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
3. **Look at compliant pages** - gooey-button has the best score (45%)
4. **Test incrementally** - Fix one thing, test, commit
5. **Ask for review** - Get feedback before committing large changes

