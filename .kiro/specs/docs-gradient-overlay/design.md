# Design Document: Docs Gradient Overlay

## Overview

This feature adds a dark linear gradient overlay to the GhostUI Docs application to create visual depth and atmosphere. The implementation uses CSS-only techniques applied to the existing global styles, leveraging theme variables for consistency across both Spectral and Blood Moon themes.

## Architecture

The gradient overlay will be implemented as a pseudo-element (`::before`) on the body element, creating a fixed overlay that doesn't interfere with content layout. This approach:
- Keeps the gradient separate from content layers
- Allows the gradient to remain fixed during scroll
- Uses existing CSS infrastructure without new components

```
┌─────────────────────────────────────┐
│  Body Element                       │
│  ├── ::before (gradient overlay)    │
│  │   └── fixed, full viewport       │
│  └── Content (children)             │
│      └── z-index above overlay      │
└─────────────────────────────────────┘
```

## Components and Interfaces

No new React components are required. The implementation modifies `apps/docs/app/globals.css` only.

### CSS Changes

The gradient overlay uses CSS custom properties to ensure theme consistency (Requirement 2.1):

```css
/* Theme-aware gradient overlay variables */
:root {
  --ghost-gradient-start: transparent;
  --ghost-gradient-mid: rgba(0, 0, 0, 0.3);
  --ghost-gradient-end: rgba(0, 0, 0, 0.5);
}

[data-theme="blood"] {
  --ghost-gradient-mid: rgba(15, 0, 0, 0.35);
  --ghost-gradient-end: rgba(15, 0, 0, 0.55);
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: linear-gradient(
    to bottom,
    var(--ghost-gradient-start) 0%,
    var(--ghost-gradient-mid) 50%,
    var(--ghost-gradient-end) 100%
  );
  pointer-events: none;
  z-index: 0;
}
```

**Design Decisions:**
- **Theme-aware variables**: Custom properties (`--ghost-gradient-*`) allow each theme to define its own gradient colors, ensuring visual harmony with the theme palette
- **Blood Moon variant**: Uses a subtle red tint (`rgba(15, 0, 0, ...)`) instead of pure black to complement the red theme
- **Top-to-bottom gradient**: Darkens from top to bottom, keeping the header area lighter for better navigation visibility while adding depth to the content area
- **Fixed positioning**: Ensures the gradient stays in place during scroll (Requirement 1.4)

## Data Models

No data models required - this is a pure CSS enhancement.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, one testable property was identified:

### Property 1: Theme gradient adaptation
*For any* theme configuration (Spectral or Blood Moon), when the theme changes, the gradient overlay should remain visually compatible with the theme's color palette by using theme-aware opacity values.

**Validates: Requirements 1.3**

Note: Most acceptance criteria for this feature relate to visual appearance (readability, artifacts) or are single-example verifications (gradient exists, uses CSS variables) rather than universal properties. The implementation will be validated through manual visual inspection and code review.

## Error Handling

- **Fallback behavior**: If CSS custom properties are undefined, browsers will ignore the gradient declaration and display no overlay (graceful degradation)
- **Interaction safety**: The `pointer-events: none` ensures the overlay never blocks user interaction with content
- **Full coverage**: Using `position: fixed` with `inset: 0` ensures full viewport coverage regardless of content height
- **Performance**: No JavaScript required; CSS-only implementation avoids layout shifts (Requirement 2.2)
- **Z-index management**: Using `z-index: 0` on the overlay ensures content remains accessible above it

## Testing Strategy

### Manual Testing
- Visual inspection of gradient appearance on both themes (Requirement 1.1, 1.3)
- Scroll behavior verification - gradient remains fixed (Requirement 1.4)
- Text readability check across all documentation pages (Requirement 1.2)
- Performance verification - no layout shifts during page load (Requirement 2.2)

### Unit Testing
Given this is a CSS-only change with no logic, traditional unit tests are not applicable.

### Property-Based Testing
Property-based testing is not practical for this CSS-only feature. The single identified property (theme adaptation) is best verified through visual regression testing or manual inspection, as it involves subjective visual compatibility rather than computable assertions.

### Validation Checklist
The implementation will be validated through:
1. **Code review**: Ensure CSS custom properties are defined for both themes (Requirement 2.1)
2. **Theme switching**: Verify gradient adapts when toggling between Spectral and Blood Moon themes (Requirement 1.3)
3. **Scroll testing**: Confirm gradient stays fixed during page scroll (Requirement 1.4)
4. **Readability audit**: Check text contrast remains acceptable across all pages (Requirement 1.2)
