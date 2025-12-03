# Design Document

## Overview

This design outlines the refactoring of the CrackTransition documentation page to achieve consistency with other GhostUI component documentation pages. The refactor involves two main areas: (1) updating color classes to match established patterns, and (2) simplifying the demo to focus on the component's core functionality as a transition trigger.

The CrackTransition component is a full-screen overlay effect that creates animated crack lines and a shatter overlay. Unlike narrative-driven components, it serves as a pure visual transition effect triggered by user actions (button clicks, navigation events, etc.). The documentation should reflect this focused purpose.

## Architecture

### Component Structure

The documentation page follows the standard GhostUI docs pattern:

```
CrackTransitionPage (Client Component)
├── Page Header (h1 + description)
├── ComponentPlayground
│   ├── preview (interactive demo)
│   ├── code (usage example)
│   └── api (props table)
└── Additional sections (optional)
```

### Color System

The GhostUI documentation uses a consistent color palette defined in Tailwind classes:

- **Headings (h1, h2, h3)**: `text-ghost-white` with `font-display`
- **Prop names**: `text-ghost-green` with `font-mono`
- **Type information**: `text-ghost-white/80` or similar muted colors with `font-mono`
- **Table headers**: `text-ghost-purple`
- **Body text**: Default prose styling with `prose-invert`

### Demo Pattern

Transition components (CrackTransition, SpectralRiver) follow a simple demo pattern:
1. Single trigger button (using GooeyButton)
2. State management for isActive
3. onComplete callback to reset state
4. No narrative or thematic text in the demo area

## Components and Interfaces

### Page Component

```typescript
export default function CrackTransitionPage() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="space-y-8">
      {/* Header section */}
      {/* ComponentPlayground */}
    </div>
  );
}
```

### Props Table Data

```typescript
const props = [
  {
    name: 'isActive',
    type: 'boolean',
    default: 'Required',
    description: 'Controls whether the transition is active'
  },
  {
    name: 'onComplete',
    type: '() => void',
    default: '-',
    description: 'Callback invoked when the transition animation completes'
  },
  {
    name: 'duration',
    type: 'number',
    default: '1',
    description: 'Duration of the transition effect in seconds'
  }
];
```

## Data Models

### Color Class Mappings

Current → Target:

| Element | Current Class | Target Class |
|---------|--------------|--------------|
| h1 | `text-ghost-purple` | `text-ghost-white` |
| h2, h3 | N/A (if added) | `text-ghost-white font-display` |
| Prop names | `text-ghost-green` | `text-ghost-green` (keep) |
| Table headers | `text-ghost-purple` | `text-ghost-purple` (keep) |
| Type info | `text-xs` | `text-xs` (keep) |

### Demo State Model

```typescript
interface DemoState {
  isActive: boolean;
}

// State transitions:
// Initial: { isActive: false }
// On button click: { isActive: true }
// On transition complete: { isActive: false }
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Color class consistency

*For any* heading element (h1, h2, h3) in the documentation page, the rendered output should include the `text-ghost-white` class and NOT include the `text-ghost-purple` class

**Validates: Requirements 1.1, 1.2**

### Property 2: Prop name styling consistency

*For any* prop name cell in the API table, the rendered output should include both `text-ghost-green` and `font-mono` classes

**Validates: Requirements 1.3**

### Property 3: Demo simplicity

*For any* render of the demo preview section, the output should contain exactly one button element and zero narrative text elements (paragraphs, headings within the demo)

**Validates: Requirements 2.1, 2.4**

### Property 4: State reset on completion

*For any* sequence where the trigger button is clicked and the transition completes, the component state should return to `isActive: false`, allowing re-triggering

**Validates: Requirements 2.3**

### Property 5: Structural consistency

*For any* comparison between the CrackTransition page structure and other transition component pages (e.g., SpectralRiver), the section ordering and ComponentPlayground prop structure should match

**Validates: Requirements 3.1, 3.2**

## Error Handling

This refactor involves static documentation updates with minimal error-prone logic:

1. **Missing imports**: Ensure all required components (ComponentPlayground, GooeyButton, CrackTransition) are imported
2. **State management**: Verify useState is imported from React
3. **Prop validation**: Ensure all props passed to ComponentPlayground are valid

No runtime error handling is required beyond standard React error boundaries already in place.

## Testing Strategy

### Unit Testing

Since this is a documentation page refactor, traditional unit tests are not applicable. However, we can verify:

1. **Visual regression testing**: Compare rendered output before/after to ensure color changes are applied
2. **Manual testing**: Click the trigger button and verify the transition plays and resets correctly
3. **Cross-browser testing**: Verify the page renders correctly in Chrome, Firefox, Safari

### Property-Based Testing

Property-based testing is not applicable for this documentation refactor, as we're updating static markup and styling rather than implementing algorithmic logic. The correctness properties defined above serve as verification criteria for manual review rather than automated test execution.

### Manual Verification Checklist

- [ ] h1 uses `text-ghost-white` instead of `text-ghost-purple`
- [ ] Prop names in table use `text-ghost-green` and `font-mono`
- [ ] Demo contains only a trigger button, no narrative text
- [ ] Clicking trigger button activates the transition
- [ ] Transition completes and resets state automatically
- [ ] Code example is minimal and practical
- [ ] Page structure matches other transition component pages (SpectralRiver)

## Implementation Notes

### Files to Modify

- `apps/docs/app/docs/components/crack-transition/page.tsx` - Main documentation page

### Reference Files

Use these as patterns:
- `apps/docs/app/docs/components/spectral-river/page.tsx` - Similar transition component
- `apps/docs/app/docs/components/gooey-button/page.tsx` - Color class patterns
- `apps/docs/app/docs/components/spooky-tooltip/page.tsx` - Table styling patterns

### Key Changes

1. **Header section**: Change h1 from `text-ghost-purple` to `text-ghost-white`
2. **Demo preview**: Remove any narrative elements, keep only the trigger button
3. **Code example**: Simplify to show minimal usage
4. **API table**: Verify prop names use `text-ghost-green font-mono`
5. **Overall structure**: Ensure consistency with SpectralRiver page

### Accessibility Considerations

- Maintain semantic HTML structure (h1, h2, h3 hierarchy)
- Ensure button has clear, descriptive label
- Verify color contrast meets WCAG AA standards (ghost-white on dark background)
- Preserve keyboard navigation functionality
