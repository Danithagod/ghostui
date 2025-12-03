# Design Document: GhostUI Component Consistency Standardization

## Overview

This design document outlines the technical approach to standardize all GhostUI components for consistency in code patterns, API design, theme integration, accessibility, and maintainability. The goal is to establish a unified component architecture that improves developer experience and reduces bugs.

## Architecture

### Current State

The GhostUI library currently has 30+ components with varying levels of consistency:

```
packages/ghostui/src/
├── components/
│   ├── CursorEffect/          # Well-organized subfolder
│   ├── GooeyButton.tsx        # Local cn, no theme
│   ├── GooeyCard.tsx          # Static filter ID
│   ├── MoonlightSwitch.tsx    # Good pattern
│   ├── CoffinCard.tsx         # Good pattern
│   ├── SpiritInput.tsx        # Good pattern
│   ├── GhostToast.tsx         # Local cn, no theme
│   ├── SpectralTabs.tsx       # Missing displayName
│   ├── WhisperBox.tsx         # Static filter ID
│   ├── GooeyProgressBar.tsx   # Static filter IDs
│   ├── SpookySkeleton.tsx     # Good pattern
│   ├── SpookyScrollbar.tsx    # Missing displayName
│   ├── SpookyTooltip.tsx      # Hardcoded colors
│   ├── GraveModal.tsx         # Good pattern
│   ├── HauntedVignette.tsx    # No theme support
│   ├── GooeySidebar.tsx       # Local cn
│   ├── BloodSmear.tsx         # Static filter ID
│   ├── ShadowCrawl.tsx        # Basic
│   ├── BatBurst.tsx           # Missing displayName
│   ├── SpectralRiver.tsx      # Static filter ID
│   ├── GhostCursor.tsx        # Local cn
│   ├── WispTrail.tsx          # Basic
│   ├── ThemeProvider.tsx      # Core - good
│   ├── AnimatedBat.tsx        # Good pattern
│   ├── BatIcon.tsx            # Good pattern
│   ├── JumpscareBat.tsx       # Good pattern
│   └── index.ts               # Barrel exports
├── lib/
│   └── utils.ts               # Shared cn utility
└── types/
    ├── index.ts
    ├── tooltip.ts
    └── cursor-effects.ts
```

### Target State

All components will follow a standardized pattern:

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';  // Always import from utils
import { useThemeOptional, type Theme } from './ThemeProvider';

// Theme color configuration
const themeColors = {
  spectral: { /* colors */ },
  blood: { /* colors */ },
} as const;

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  // Props with JSDoc comments
  /** Description of prop */
  propName?: string;
  className?: string;
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ propName, className, ...props }, ref) => {
    const id = React.useId();  // For unique IDs
    const themeContext = useThemeOptional();
    const theme: Theme = themeContext?.theme ?? 'spectral';
    const colors = themeColors[theme];

    return (
      <div ref={ref} className={cn('base-classes', className)} {...props}>
        {/* SVG filters use id */}
        <svg aria-hidden="true">
          <filter id={`filter-${id}`}>...</filter>
        </svg>
        {/* Content */}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

## Components and Interfaces

### Standardized Component Interface

```typescript
// Base interface for all components
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// For components with theme support
interface ThemedComponentProps extends BaseComponentProps {
  variant?: Theme;  // Override theme context
}

// For components with animation control
interface AnimatedComponentProps extends BaseComponentProps {
  animated?: boolean;
  intensity?: 'subtle' | 'medium' | 'intense';
}
```

### Component Categories and Required Patterns

| Category | Components | Required Patterns |
|----------|-----------|-------------------|
| Interactive | GooeyButton, MoonlightSwitch, SpiritInput, WhisperBox | forwardRef, ARIA, theme |
| Display | GooeyCard, CoffinCard, SpookySkeleton | theme, displayName |
| Feedback | GhostToast, SpookyTooltip, GraveModal | ARIA live, theme |
| Navigation | SpectralTabs, GooeySidebar | ARIA roles, theme |
| Effects | GhostCursor, WispTrail, HauntedVignette | aria-hidden, reduced motion |
| Transitions | BloodSmear, ShadowCrawl, BatBurst, SpectralRiver | aria-hidden, unique IDs |
| Progress | GooeyProgressBar, SpookyScrollbar | ARIA valuenow, theme |

## Data Models

### Theme Configuration Type

```typescript
interface ThemeColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
  textSecondary: string;
}

const themeColors: Record<Theme, ThemeColorConfig> = {
  spectral: {
    primary: '#2e1065',
    secondary: '#1a0b2e',
    accent: '#FF6F00',
    glow: 'rgba(255, 111, 0, 0.4)',
    border: 'rgba(139, 92, 246, 0.2)',
    text: '#e9d5ff',
    textSecondary: '#c4b5fd',
  },
  blood: {
    primary: '#450a0a',
    secondary: '#1f0a0a',
    accent: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    border: 'rgba(239, 68, 68, 0.2)',
    text: '#fecaca',
    textSecondary: '#fca5a5',
  },
};
```

### SVG Filter ID Pattern

```typescript
// Pattern for unique filter IDs
function useFilterId(prefix: string): string {
  const id = React.useId();
  // Sanitize ID for CSS selector usage (remove colons)
  return `${prefix}-${id.replace(/:/g, '')}`;
}

// Usage in component
const filterId = useFilterId('goo-filter');
// Results in: "goo-filter-r0" (unique per instance)
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Shared utility import consistency
*For any* component file in the components directory that uses className merging, the file should import `cn` from `../lib/utils` and should NOT define a local `cn` function.
**Validates: Requirements 1.1, 1.2**

### Property 2: forwardRef implementation
*For any* interactive component (buttons, inputs, textareas, switches), the component should be wrapped with `React.forwardRef` and the ref should be attached to the primary interactive DOM element.
**Validates: Requirements 2.1, 2.2**

### Property 3: displayName assignment
*For any* exported component, the component should have a `displayName` property set to a string matching the component name.
**Validates: Requirements 3.1**

### Property 4: Theme integration
*For any* component that renders colored elements, the component should either use `useThemeOptional()` hook or CSS variables (`var(--ghost-*)`) for colors, and colors should change when the theme context changes.
**Validates: Requirements 4.1, 4.2**

### Property 5: Unique SVG filter IDs
*For any* component that defines SVG filters, the filter ID should be generated using `React.useId()`, and when multiple instances of the component are rendered, each instance should have a unique filter ID.
**Validates: Requirements 5.1, 5.2**

### Property 6: ARIA attributes for interactive elements
*For any* component with interactive elements (buttons, switches, tabs, modals), appropriate ARIA roles and states should be applied to the rendered output.
**Validates: Requirements 6.1**

### Property 7: ARIA live regions for status
*For any* component that displays dynamic status information (toasts, progress bars), the component should use `aria-live` regions to announce changes to screen readers.
**Validates: Requirements 6.2**

### Property 8: Decorative elements hidden from accessibility tree
*For any* purely decorative element (SVG filters, background effects, transition overlays), the element should have `aria-hidden="true"` to hide it from screen readers.
**Validates: Requirements 6.3**

## Error Handling

### Validation Patterns

```typescript
// Prop validation for numeric ranges
function validateIntensity(value: number | undefined, defaultValue: number): number {
  if (value === undefined) return defaultValue;
  if (typeof value !== 'number' || isNaN(value)) return defaultValue;
  return Math.max(0, Math.min(1, value));
}

// Ref validation
function validateRef(ref: React.RefObject<HTMLElement>, componentName: string): boolean {
  if (!ref.current) {
    console.warn(`[${componentName}] Ref is null`);
    return false;
  }
  return true;
}
```

### Graceful Degradation

- Components should work without ThemeProvider (fallback to 'spectral')
- SVG filters should have fallback styles if filters aren't supported
- Animations should respect `prefers-reduced-motion`

## Testing Strategy

### Dual Testing Approach

This implementation will use both unit tests and property-based tests:

1. **Unit Tests**: Verify specific examples and edge cases
2. **Property-Based Tests**: Verify universal properties across all inputs

### Property-Based Testing Library

We will use **fast-check** for property-based testing in TypeScript/React.

### Test File Organization

```
packages/ghostui/src/
├── components/
│   ├── ComponentName.tsx
│   ├── ComponentName.test.tsx          # Unit tests
│   └── ComponentName.property.test.tsx # Property tests
```

### Property Test Examples

```typescript
// Example: Property 1 - cn utility import
import fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Property 1: Shared utility import consistency', () => {
  // **Feature: component-consistency-analysis, Property 1: Shared utility import consistency**
  it('should not have local cn definitions in any component', () => {
    const componentsDir = path.join(__dirname, '../');
    const componentFiles = fs.readdirSync(componentsDir)
      .filter(f => f.endsWith('.tsx') && !f.includes('.test.'));
    
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (filename) => {
          const content = fs.readFileSync(path.join(componentsDir, filename), 'utf-8');
          const hasLocalCn = /function cn\s*\(/.test(content);
          const importsFromUtils = /import.*cn.*from.*['"]\.\.\/lib\/utils['"]/.test(content);
          
          // If uses cn, must import from utils
          if (content.includes('cn(')) {
            return importsFromUtils && !hasLocalCn;
          }
          return true;
        }
      ),
      { numRuns: componentFiles.length }
    );
  });
});

// Example: Property 5 - Unique filter IDs
describe('Property 5: Unique SVG filter IDs', () => {
  // **Feature: component-consistency-analysis, Property 5: Unique SVG filter IDs**
  it('should generate unique filter IDs for multiple instances', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 10 }),
        (instanceCount) => {
          const { container } = render(
            <>
              {Array.from({ length: instanceCount }).map((_, i) => (
                <GooeyCard key={i}>Content {i}</GooeyCard>
              ))}
            </>
          );
          
          const filterIds = Array.from(container.querySelectorAll('filter'))
            .map(f => f.id);
          const uniqueIds = new Set(filterIds);
          
          return uniqueIds.size === filterIds.length;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Examples

```typescript
// Unit test for specific component behavior
describe('GooeyButton', () => {
  it('should forward ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<GooeyButton ref={ref}>Click me</GooeyButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should have displayName set', () => {
    expect(GooeyButton.displayName).toBe('GooeyButton');
  });

  it('should apply theme colors from context', () => {
    const { container } = render(
      <ThemeProvider defaultTheme="blood">
        <GooeyButton>Click me</GooeyButton>
      </ThemeProvider>
    );
    // Verify blood theme colors are applied
  });
});
```

### Test Coverage Requirements

- Each correctness property must have a corresponding property-based test
- Each component must have unit tests for:
  - Ref forwarding (if applicable)
  - displayName
  - Theme integration
  - Accessibility attributes
  - Basic rendering

## Implementation Phases

### Phase 1: Critical Fixes (P0)
1. Remove local `cn` definitions from 4 components
2. Add unique filter IDs using `useId()` to 6 components
3. Add forwardRef to interactive components

### Phase 2: High Priority (P1)
1. Add theme integration to hardcoded components
2. Add missing ARIA attributes
3. Add displayName to all components

### Phase 3: Standardization (P2)
1. Standardize export patterns
2. Extend HTML attributes where appropriate
3. Establish prop naming conventions

### Phase 4: Polish (P3)
1. Extract inline styles
2. Add JSDoc documentation
3. Create component demos consistently
