# Accessibility Analysis

This document describes the accessibility analysis capabilities of the GhostUI code review system.

## Overview

The `AccessibilityAnalyzer` evaluates React components for accessibility compliance, checking for proper keyboard navigation, ARIA attributes, focus indicators, and motion reduction support.

## Analyses Performed

### 1. Keyboard Navigation Support (Requirement 4.1)

**Property 14: Keyboard navigation support**

Checks that interactive components properly handle keyboard events:

- **Enter/Space keys** for buttons and toggles
- **Arrow keys** for navigation components (tabs, menus)
- **Escape key** for dismissible components (modals, dialogs)
- Proper use of semantic HTML elements with built-in keyboard support

**Severity Levels:**
- **High**: Custom interactive elements without keyboard handlers
- **Medium**: Missing specific keyboard patterns (e.g., Arrow keys in tabs)

**Example Issues:**
- Toggle component using `<div onClick>` without `onKeyDown` handler
- Modal component not handling Escape key
- Tab component missing Arrow key navigation

### 2. ARIA Attributes (Requirement 4.2)

**Property 15: ARIA attribute presence**

Verifies that components use appropriate ARIA attributes:

- **Roles**: `button`, `switch`, `dialog`, `tab`, `tablist`, `tabpanel`, `tooltip`, etc.
- **Labels**: `aria-label`, `aria-labelledby` for unlabeled controls
- **States**: `aria-expanded`, `aria-checked`, `aria-selected`
- **Relationships**: `aria-describedby`, `aria-controls`

**Severity Levels:**
- **High**: Missing roles on custom controls, missing labels, missing dialog attributes
- **Medium**: Missing state attributes, missing tooltip attributes
- **Low**: Missing progress/loader attributes

**Component-Specific Checks:**
- **Modals/Dialogs**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Toggles/Switches**: `role="switch"`, `aria-checked`
- **Tabs**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
- **Tooltips**: `role="tooltip"`, `aria-describedby`
- **Progress/Loaders**: `role="progressbar"` or `role="status"`, `aria-live`

### 3. Focus Indicator Styles (Requirement 4.3)

**Property 16: Focus indicator visibility**

Ensures interactive elements have visible focus indicators:

- Checks for `:focus-visible` styles (preferred)
- Checks for `:focus` styles (legacy)
- Detects removed outlines without replacement
- Verifies focus indicators use ring, border, shadow, or background

**Severity Levels:**
- **Critical**: Outline removed without replacement (`outline: none` without alternative)
- **High**: No focus indicator styles defined

**Best Practices:**
- Use `:focus-visible` pseudo-class for keyboard-only focus indicators
- Use Tailwind's `focus-visible:ring` utilities
- Never remove `outline` without providing an alternative
- Ensure sufficient contrast for focus indicators

### 4. Motion Reduction Support (Requirements 4.4, 11.4)

**Property 17: Motion reduction support**

Verifies that animations respect user preferences for reduced motion:

- Checks for `motion-reduce:` class variants
- Checks for `prefers-reduced-motion` media query
- Checks for JavaScript-based motion reduction logic

**Severity Levels:**
- **High**: Animations without motion reduction support

**Detection Patterns:**
- Framer Motion animations (`<motion.*>`, `variants`, `animate`)
- CSS animations (`@keyframes`, `animation:`, `transition:`)
- Transform animations (`translate`, `scale`, `rotate`)
- Tailwind animation utilities (`animate-*`, `transition-*`)

**Recommended Solutions:**
- Use Tailwind's `motion-reduce:` prefix: `motion-reduce:animate-none`
- Use CSS media query: `@media (prefers-reduced-motion: reduce)`
- Check in JavaScript: `window.matchMedia("(prefers-reduced-motion: reduce)")`

## Usage

### Basic Usage

```typescript
import { FileScanner } from './fileScanner';
import { AccessibilityAnalyzer } from './accessibilityAnalyzer';
import { IssueCollector } from './issueCollector';

// Initialize
const scanner = new FileScanner();
const issueCollector = new IssueCollector();
const analyzer = new AccessibilityAnalyzer(issueCollector);

// Scan components
const components = scanner.scanComponents();

// Run all analyses
const results = analyzer.analyzeAll(components);

console.log(`Total issues: ${results.allIssues.length}`);
console.log(`Keyboard issues: ${results.keyboardNavigation.length}`);
console.log(`ARIA issues: ${results.ariaAttributes.length}`);
console.log(`Focus issues: ${results.focusIndicators.length}`);
console.log(`Motion issues: ${results.motionReduction.length}`);
```

### Individual Analyses

```typescript
// Check only keyboard navigation
const keyboardIssues = analyzer.checkKeyboardNavigationSupport(components);

// Check only ARIA attributes
const ariaIssues = analyzer.verifyARIAAttributes(components);

// Check only focus indicators
const focusIssues = analyzer.checkFocusIndicatorStyles(components);

// Check only motion reduction
const motionIssues = analyzer.verifyMotionReductionSupport(components);
```

### Example Script

Run the example script to see the analyzer in action:

```bash
npx tsx src/review/example-accessibility-analysis.ts
```

## Issue Structure

Each issue includes:

```typescript
{
  id: string;              // Unique identifier (e.g., "ISSUE-0001")
  severity: Severity;      // 'critical' | 'high' | 'medium' | 'low'
  category: string;        // 'Accessibility'
  requirement: string;     // Requirement number (e.g., '4.1')
  title: string;           // Brief description
  description: string;     // Detailed explanation
  location: string;        // File path
  recommendation: string;  // How to fix
  effort: Effort;         // 'low' | 'medium' | 'high'
}
```

## Common Patterns

### Good Examples

#### Keyboard Navigation
```tsx
// Using semantic button (built-in keyboard support)
<button onClick={handleClick}>Click me</button>

// Custom element with keyboard handler
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom Button
</div>
```

#### ARIA Attributes
```tsx
// Modal with proper ARIA
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
  {/* content */}
</div>

// Toggle with proper ARIA
<button
  role="switch"
  aria-checked={isChecked}
  onClick={toggle}
>
  Toggle
</button>
```

#### Focus Indicators
```tsx
// Using focus-visible
<button className="focus-visible:ring-2 focus-visible:ring-purple-500">
  Button
</button>

// Custom focus styles
<button className="focus:outline-none focus:ring-2 focus:ring-offset-2">
  Button
</button>
```

#### Motion Reduction
```tsx
// Tailwind motion-reduce
<div className="animate-spin motion-reduce:animate-none">
  Loading...
</div>

// Framer Motion with reduced motion
<motion.div
  animate={{ scale: shouldReduceMotion ? 1 : 1.2 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
>
  Content
</motion.div>
```

### Bad Examples

#### Keyboard Navigation
```tsx
// ❌ Custom interactive element without keyboard support
<div onClick={handleClick}>Click me</div>

// ❌ Modal without Escape key handler
<div className="modal">
  {/* No onKeyDown handler */}
</div>
```

#### ARIA Attributes
```tsx
// ❌ Custom control without role
<div onClick={toggle}>Toggle</div>

// ❌ Icon button without label
<button onClick={handleClick}>
  <Icon />
</button>
```

#### Focus Indicators
```tsx
// ❌ Outline removed without replacement
<button className="outline-none">Button</button>

// ❌ No focus styles
<button>Button</button>
```

#### Motion Reduction
```tsx
// ❌ Animation without motion reduction support
<motion.div animate={{ x: 100 }}>
  Content
</motion.div>

// ❌ CSS animation without media query
<div className="animate-bounce">
  Bouncing
</div>
```

## Integration with Review System

The accessibility analyzer integrates with the broader code review system:

1. **File Scanner**: Discovers all component files
2. **Accessibility Analyzer**: Analyzes each component
3. **Issue Collector**: Collects and categorizes issues
4. **Report Generator**: Includes accessibility findings in the final report

## Future Enhancements

Potential improvements for the accessibility analyzer:

1. **Color Contrast Analysis**: Check text and background color contrast ratios
2. **Semantic HTML Validation**: Verify proper use of semantic elements
3. **Screen Reader Testing**: Simulate screen reader behavior
4. **Focus Trap Detection**: Identify components that trap keyboard focus
5. **Live Region Analysis**: Check for proper use of `aria-live` regions
6. **Heading Hierarchy**: Verify logical heading structure

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/resources/)
