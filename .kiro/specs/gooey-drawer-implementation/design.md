# Design Document: Gooey Drawer Component

## Overview

The Gooey Drawer is a sophisticated overlay component that combines modern UI patterns with supernatural visual effects. It extends the GhostUI library's gooey-themed component family by providing a drawer/modal pattern with animated liquid drips and SVG-based 3D lighting effects.

The component architecture separates concerns into three distinct visual layers:
1. **Liquid Layer** - Animated drips and background shapes with SVG filter effects applied
2. **Content Layer** - Sharp, unfiltered user content rendered above the liquid
3. **Overlay Layer** - Crisp borders and decorative elements

This separation ensures that visual effects enhance rather than interfere with content readability, while maintaining the distinctive melting aesthetic that defines the gooey component family.

## Architecture

### Component Structure

```
GooeyDrawer (Main Component)
├── AnimatePresence (Framer Motion)
│   ├── Backdrop (motion.div)
│   │   └── Click handler → onClose
│   └── Drawer Container (motion.div)
│       ├── SVG Filter Definition
│       │   └── Unique filter ID per instance
│       ├── Liquid Layer (filtered)
│       │   ├── GooeyMesh Component
│       │   │   ├── Main background shape
│       │   │   ├── Animated drips (12x)
│       │   │   └── Static bulges (2x)
│       │   └── Filter application
│       ├── Content Layer (unfiltered)
│       │   ├── Header
│       │   │   ├── Icon + Title
│       │   │   └── Close Button
│       │   └── Scrollable Body
│       │       └── {children}
│       └── Border Overlay
```

### Technology Stack

- **React 18+**: Component framework with hooks (useId, useState, useEffect)
- **TypeScript**: Type safety and developer experience
- **Framer Motion**: Spring-based animations and AnimatePresence for enter/exit
- **Tailwind CSS**: Utility-first styling with custom properties
- **Lucide React**: Icon library for UI elements
- **clsx + tailwind-merge**: Conditional className composition

### File Organization

```
packages/ghostui/src/components/
├── GooeyDrawer.tsx          # Main component implementation
└── index.ts                 # Export with types

apps/docs/
├── app/docs/components/gooey-drawer/
│   └── page.tsx             # Documentation page
└── lib/navigation.ts        # Add to navigation menu
```

## Components and Interfaces

### Main Component: GooeyDrawer

```typescript
export interface GooeyDrawerProps {
  /** Controls drawer visibility */
  isOpen: boolean;
  
  /** Callback invoked when drawer should close */
  onClose: () => void;
  
  /** Screen edge placement */
  placement?: 'right' | 'left' | 'bottom' | 'top';
  
  /** Content to render inside drawer */
  children: React.ReactNode;
  
  /** Additional CSS classes for customization */
  className?: string;
}

export const GooeyDrawer: React.FC<GooeyDrawerProps>
```

**Responsibilities:**
- Manage AnimatePresence for enter/exit animations
- Render backdrop with click-to-close behavior
- Position drawer based on placement prop
- Generate unique filter ID to avoid conflicts
- Coordinate between liquid and content layers
- Handle keyboard events (Escape to close)

### Sub-Component: GooeyMesh

```typescript
interface GooeyMeshProps {
  // Internal component, no public props
}

const GooeyMesh: React.FC<GooeyMeshProps>
```

**Responsibilities:**
- Render main background shape (rounded rectangle)
- Generate and animate 12 drip elements with varied timing
- Render static bulge elements for visual connection
- Provide the shapes that will be filtered into liquid

**Drip Configuration:**
```typescript
interface DripConfig {
  id: number;
  width: number;        // 15-45px
  height: number;       // Initial height 20-60px
  left: string;         // Position 10-90%
  duration: number;     // 2-4 seconds
  delay: number;        // 0-2 seconds
  stretch: number;      // Extension distance 30-80px
}
```

### Sub-Component: DrawerStyles

```typescript
const DrawerStyles: React.FC
```

**Responsibilities:**
- Inject global CSS for Creepster font
- Define CSS custom properties for theming
- Provide no-scrollbar utility class

## Data Models

### Animation Variants

```typescript
type Placement = 'right' | 'left' | 'bottom' | 'top';

interface AnimationVariants {
  hidden: {
    x: string;
    y: string;
    scale: number;
    opacity: number;
  };
  visible: {
    x: string;
    y: string;
    scale: number;
    opacity: number;
    transition: SpringTransition;
  };
  exit: {
    x: string;
    y: string;
    scale: number;
    opacity: number;
    transition: Transition;
  };
}
```

**Placement-Specific Transforms:**
- **Right**: `x: 120%` (hidden) → `x: 0%` (visible)
- **Left**: `x: -120%` (hidden) → `x: 0%` (visible)
- **Bottom**: `y: 120%` (hidden) → `y: 0%` (visible)
- **Top**: `y: -120%` (hidden) → `y: 0%` (visible)

All placements include scale (0.8 → 1.0) and opacity (0 → 1) transitions.

### Position Classes

```typescript
const positionClasses: Record<Placement, string> = {
  right: "fixed top-1/2 right-8 h-[70vh] w-[350px] -translate-y-1/2",
  left: "fixed top-1/2 left-8 h-[70vh] w-[350px] -translate-y-1/2",
  bottom: "fixed bottom-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2",
  top: "fixed top-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2",
};
```

### SVG Filter Pipeline

```typescript
interface FilterStage {
  name: string;
  input: string;
  output: string;
  parameters: Record<string, string | number>;
}

const filterPipeline: FilterStage[] = [
  {
    name: 'feGaussianBlur',
    input: 'SourceGraphic',
    output: 'blur',
    parameters: { stdDeviation: 10 }
  },
  {
    name: 'feColorMatrix',
    input: 'blur',
    output: 'goo',
    parameters: {
      mode: 'matrix',
      values: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9'
    }
  },
  {
    name: 'feGaussianBlur',
    input: 'goo',
    output: 'smoothGoo',
    parameters: { stdDeviation: 2 }
  },
  {
    name: 'feSpecularLighting',
    input: 'smoothGoo',
    output: 'specular',
    parameters: {
      surfaceScale: 4,
      specularConstant: 1.3,
      specularExponent: 30,
      lightingColor: 'var(--goo-highlight)'
    }
  },
  // ... compositing stages
];
```

## Data Flow

### Opening Sequence

1. Parent component sets `isOpen={true}`
2. AnimatePresence detects new child
3. Backdrop fades in (opacity 0 → 1)
4. Drawer animates from hidden variant:
   - Slides from off-screen (x/y: 120% → 0%)
   - Scales up (0.8 → 1.0)
   - Fades in (opacity 0 → 1)
5. Spring physics create natural bounce
6. Drip animations begin looping
7. Focus traps within drawer

### Closing Sequence

1. User triggers close (backdrop click, close button, or Escape key)
2. `onClose()` callback invoked
3. Parent component sets `isOpen={false}`
4. AnimatePresence detects child removal
5. Drawer animates to exit variant:
   - Slides off-screen (x/y: 0% → 120%)
   - Scales down (1.0 → 0.8)
   - Fades out (opacity 1 → 0)
6. Backdrop fades out (opacity 1 → 0)
7. AnimatePresence removes from DOM after animation completes

### Drip Animation Loop

```
Initial State (height: width)
    ↓
Stretch Phase (2-4s, easeInOut)
    ↓
Extended State (height: width + stretch)
    ↓
Retract Phase (2-4s, easeInOut)
    ↓
Initial State (loop infinitely)
```

Each drip has unique timing (duration + delay) for natural variation.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Drawer visibility matches isOpen prop

*For any* valid GooeyDrawer props configuration, when isOpen is true, the drawer element should be present in the rendered DOM, and when isOpen is false, the drawer should not be present (after exit animation completes).

**Validates: Requirements 1.2, 1.3**

### Property 2: Children content is rendered

*For any* valid React children provided to GooeyDrawer, the children should appear in the rendered output within the drawer's content area.

**Validates: Requirements 1.4**

### Property 3: Close callback invocation

*For any* valid onClose callback function, the callback should be invoked when any close trigger is activated (backdrop click, close button click, or Escape key press).

**Validates: Requirements 1.5, 7.6, 8.4, 11.2**

### Property 4: Placement affects positioning

*For any* placement value ('right', 'left', 'top', 'bottom'), the drawer should have CSS classes that position it appropriately near that edge with proper centering.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 10.4**

### Property 5: Drip timing variation

*For any* rendered drawer, all drip elements should have unique delay values between 0 and 2 seconds, and duration values between 2 and 4 seconds, ensuring natural variation.

**Validates: Requirements 4.3, 4.4**

### Property 6: Drip positioning constraints

*For any* rendered drawer, all drip elements should have left position values between 10% and 90% of the container width.

**Validates: Requirements 4.7**

### Property 7: Drip dimension constraints

*For any* rendered drawer, all drip elements should have width values between 15px and 45px, and stretch values between 30px and 80px.

**Validates: Requirements 4.8, 4.9**

### Property 8: Unique filter IDs

*For any* set of simultaneously rendered GooeyDrawer instances, each drawer should have a unique filter ID to prevent SVG filter conflicts.

**Validates: Requirements 5.1**

### Property 9: Accessibility attributes

*For any* rendered drawer, the SVG filter element should have aria-hidden="true", and the close button should have appropriate accessible attributes.

**Validates: Requirements 5.8, 11.4**

### Property 10: Layer separation

*For any* rendered drawer, the liquid layer should have a filter style applied, the content layer should not have a filter style applied, and the content layer should have a higher z-index than the liquid layer.

**Validates: Requirements 6.1, 6.2**

### Property 11: Backdrop presence

*For any* open drawer, a backdrop element should be present in the DOM covering the full viewport (fixed positioning with inset-0).

**Validates: Requirements 7.1**

### Property 12: Header structure

*For any* rendered drawer, a header element should be present containing both an icon/title section and a close button.

**Validates: Requirements 8.1, 8.3**

### Property 13: Scrollable content area

*For any* rendered drawer, the content area should have overflow-y-auto or similar scrolling capability enabled.

**Validates: Requirements 9.1**

### Property 14: Custom className application

*For any* valid className string provided as a prop, that className should appear in the rendered drawer container's class list.

**Validates: Requirements 10.1**

## Error Handling

### Invalid Props

**Scenario**: Developer provides invalid placement value
- **Handling**: TypeScript will prevent invalid values at compile time
- **Fallback**: Runtime default to 'right' if somehow bypassed

**Scenario**: Developer provides undefined or null children
- **Handling**: React will render empty content area gracefully
- **Impact**: Drawer still functions, just displays empty space

**Scenario**: Developer provides non-function onClose
- **Handling**: TypeScript prevents this at compile time
- **Runtime**: Optional chaining (`onClose?.()`) prevents crashes

### Animation Edge Cases

**Scenario**: Drawer is closed before open animation completes
- **Handling**: AnimatePresence handles interruption gracefully
- **Behavior**: Smoothly transitions from current state to exit animation

**Scenario**: Multiple rapid open/close toggles
- **Handling**: React state updates batch naturally
- **Behavior**: AnimatePresence queues animations appropriately

### Browser Compatibility

**Scenario**: SVG filters not supported (very old browsers)
- **Handling**: Graceful degradation - drawer still functions
- **Appearance**: Solid background without liquid effects
- **Mitigation**: Feature detection could hide drips if needed

**Scenario**: Backdrop blur not supported
- **Handling**: CSS fallback to solid semi-transparent background
- **Impact**: Slightly less visual depth, but fully functional

### Performance Considerations

**Scenario**: Many drips cause performance issues on low-end devices
- **Handling**: CSS `prefers-reduced-motion` media query
- **Behavior**: Disable drip animations when user prefers reduced motion
- **Implementation**: Use `motion-reduce:hidden` on drip elements

**Scenario**: Multiple drawers rendered simultaneously
- **Handling**: Each drawer has unique filter ID
- **Impact**: Minimal - SVG filters are efficient
- **Recommendation**: Avoid rendering many drawers at once

## Testing Strategy

### Unit Testing

**Component Rendering Tests:**
- Drawer renders when isOpen is true
- Drawer does not render when isOpen is false
- Children content appears in output
- Header with close button is present
- Backdrop is rendered when open
- Correct placement classes applied for each placement value
- Custom className is applied to container
- Default placement is 'right' when not specified

**Interaction Tests:**
- Close button click invokes onClose callback
- Backdrop click invokes onClose callback
- Escape key press invokes onClose callback (requires keyboard event simulation)

**Accessibility Tests:**
- SVG filter has aria-hidden="true"
- Close button has accessible label
- Proper semantic HTML structure

**Edge Case Tests:**
- Empty children renders without errors
- Undefined placement defaults to 'right'
- Multiple drawers have unique filter IDs

### Property-Based Testing

The testing framework will be **fast-check** for TypeScript/JavaScript property-based testing. Each property test should run a minimum of 100 iterations to ensure statistical confidence.

**Property Test 1: Visibility consistency**
- Generate: random isOpen boolean, random placement, random children
- Test: When isOpen is true, drawer is in DOM; when false, drawer is not in DOM
- Tag: `**Feature: gooey-drawer-implementation, Property 1: Drawer visibility matches isOpen prop**`

**Property Test 2: Children rendering**
- Generate: random React children (strings, numbers, elements)
- Test: All children appear in rendered output
- Tag: `**Feature: gooey-drawer-implementation, Property 2: Children content is rendered**`

**Property Test 3: Close callback invocation**
- Generate: random mock callback function
- Test: Callback is invoked for each close trigger
- Tag: `**Feature: gooey-drawer-implementation, Property 3: Close callback invocation**`

**Property Test 4: Placement positioning**
- Generate: random placement value from valid set
- Test: Rendered output contains appropriate positioning classes
- Tag: `**Feature: gooey-drawer-implementation, Property 4: Placement affects positioning**`

**Property Test 5: Drip timing variation**
- Generate: render drawer, extract drip configurations
- Test: All delays are 0-2s, all durations are 2-4s, all values are unique
- Tag: `**Feature: gooey-drawer-implementation, Property 5: Drip timing variation**`

**Property Test 6: Drip positioning constraints**
- Generate: render drawer, extract drip positions
- Test: All left positions are between 10% and 90%
- Tag: `**Feature: gooey-drawer-implementation, Property 6: Drip positioning constraints**`

**Property Test 7: Drip dimension constraints**
- Generate: render drawer, extract drip dimensions
- Test: All widths are 15-45px, all stretches are 30-80px
- Tag: `**Feature: gooey-drawer-implementation, Property 7: Drip dimension constraints**`

**Property Test 8: Unique filter IDs**
- Generate: random number of drawer instances (2-10)
- Test: All filter IDs are unique
- Tag: `**Feature: gooey-drawer-implementation, Property 8: Unique filter IDs**`

**Property Test 9: Accessibility attributes**
- Generate: random drawer configuration
- Test: SVG has aria-hidden, close button has accessible attributes
- Tag: `**Feature: gooey-drawer-implementation, Property 9: Accessibility attributes**`

**Property Test 10: Layer separation**
- Generate: random drawer configuration
- Test: Liquid layer has filter, content layer doesn't, z-index ordering correct
- Tag: `**Feature: gooey-drawer-implementation, Property 10: Layer separation**`

**Property Test 11: Backdrop presence**
- Generate: random drawer configuration with isOpen=true
- Test: Backdrop element exists with full viewport coverage
- Tag: `**Feature: gooey-drawer-implementation, Property 11: Backdrop presence**`

**Property Test 12: Header structure**
- Generate: random drawer configuration
- Test: Header contains icon/title and close button
- Tag: `**Feature: gooey-drawer-implementation, Property 12: Header structure**`

**Property Test 13: Scrollable content area**
- Generate: random drawer configuration
- Test: Content area has overflow-y-auto or similar
- Tag: `**Feature: gooey-drawer-implementation, Property 13: Scrollable content area**`

**Property Test 14: Custom className application**
- Generate: random valid className strings
- Test: className appears in rendered output
- Tag: `**Feature: gooey-drawer-implementation, Property 14: Custom className application**`

### Integration Testing

**Full User Flow:**
1. Render app with drawer closed
2. Click trigger button to open drawer
3. Verify drawer animates in
4. Verify backdrop appears
5. Verify content is visible and scrollable
6. Click close button
7. Verify drawer animates out
8. Verify backdrop disappears

**Multiple Placements:**
- Test opening drawer from each placement
- Verify positioning is correct for each
- Verify animations work from all directions

**Keyboard Navigation:**
- Open drawer
- Tab through interactive elements
- Press Escape to close
- Verify focus management

### Visual Regression Testing

**Snapshot Tests:**
- Drawer in each placement (right, left, top, bottom)
- Drawer with various content types
- Drip animations at different keyframes
- SVG filter effects rendering correctly
- Backdrop blur effect

**Animation Tests:**
- Record opening animation sequence
- Record closing animation sequence
- Verify spring physics produce expected curves
- Verify drip animations loop correctly

## Implementation Notes

### Performance Optimizations

1. **Shared Filter Definition**: All drips share the same SVG filter, reducing DOM overhead
2. **Layer Separation**: Only liquid layer is filtered, keeping content rendering fast
3. **GPU Acceleration**: Framer Motion automatically uses CSS transforms for animations
4. **Lazy Rendering**: AnimatePresence only renders drawer when isOpen is true
5. **Reduced Motion**: Drip animations disabled when user prefers reduced motion

### Accessibility Considerations

1. **Focus Management**: Trap focus within drawer when open (implement with focus-trap-react or similar)
2. **Keyboard Support**: Escape key closes drawer
3. **Screen Readers**: SVG filters hidden with aria-hidden, semantic HTML structure
4. **Color Contrast**: Ensure text has sufficient contrast against liquid background
5. **Motion Preferences**: Respect prefers-reduced-motion for animations

### Browser Support

**Minimum Requirements:**
- Modern browsers with ES6+ support
- SVG filter support (all modern browsers)
- CSS backdrop-filter support (fallback to solid background)
- Framer Motion requirements (React 18+)

**Tested Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Future Enhancements

**Potential Features:**
- Custom color theming (allow override of CSS custom properties)
- Size variants (small, medium, large)
- Custom header content (replace default icon/title)
- Disable backdrop click to close
- Custom animation timing
- Multiple drawers stacked
- Drawer with tabs or sections
- Swipe to close gesture on mobile

**Integration Opportunities:**
- Theme provider integration (like GooeySidebar)
- Global drawer manager/context
- Drawer composition with other gooey components
- Animation presets library

## Documentation Structure

### Page Sections

1. **Hero Section**
   - Component name and description
   - Key features list
   - Basic interactive demo with all four placements

2. **Basic Usage**
   - Minimal code example
   - Props table
   - Import statement

3. **Placement Options**
   - Interactive demos for each placement
   - Explanation of positioning behavior
   - Code examples

4. **Custom Content**
   - Examples with different content layouts
   - Menu items, forms, notifications
   - Scrollable content demo

5. **How It Works**
   - Explanation of SVG filter pipeline
   - Layer separation architecture
   - Animation system overview

6. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - Reduced motion preferences

7. **Real-World Examples**
   - Navigation drawer
   - Notification panel
   - Settings panel
   - Shopping cart

8. **API Reference**
   - Complete props table
   - Type definitions
   - Default values

### Code Examples

**Minimum Required:**
- Basic usage (controlled component)
- All four placements
- Custom content example
- Scrollable content example
- Real-world use case (navigation menu)

**Code Example Format:**
```tsx
import { GooeyDrawer } from 'ghostui-react';
import { useState } from 'react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer
      </button>
      
      <GooeyDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
      >
        <div>Your content here</div>
      </GooeyDrawer>
    </>
  );
}
```

### Documentation Style

Follow the GhostUI Component Documentation Style Guide:
- Use ComponentPlayground for interactive demos
- Use PropsTable for API documentation
- Follow typography standards (H1, H2, H3 sizing and colors)
- Use consistent spacing (mt-12 for sections, space-y-6 for content)
- Include code examples with proper syntax highlighting
- Provide real-world usage examples
- Document accessibility features
- Explain technical concepts (SVG filters, animations)

## Dependencies

### Required Packages

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.263.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Development Dependencies

```json
{
  "@testing-library/react": "^14.0.0",
  "@testing-library/user-event": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "fast-check": "^3.0.0",
  "vitest": "^1.0.0"
}
```

### Peer Dependencies

- TypeScript 5.0+
- Tailwind CSS 3.0+
- Next.js 14+ (for documentation app)

## File Structure

```
packages/ghostui/src/components/
├── GooeyDrawer.tsx                    # Main component (350 lines)
│   ├── DrawerStyles component         # Global styles injection
│   ├── GooeyMesh component           # Drip animations
│   ├── GooeyDrawer component         # Main export
│   └── Type definitions
│
└── index.ts                          # Add exports

packages/ghostui/src/components/GooeyDrawer.test.tsx
└── Unit tests (200 lines)

packages/ghostui/src/components/GooeyDrawer.property.test.tsx
└── Property-based tests (400 lines)

apps/docs/app/docs/components/gooey-drawer/
└── page.tsx                          # Documentation (600 lines)

apps/docs/lib/navigation.ts
└── Add navigation entry
```

## Migration Path

Since this is a new component, no migration is needed. However, developers familiar with other drawer libraries should note:

**Differences from common drawer patterns:**
- Floating near edges rather than edge-attached
- Always includes liquid drip effects
- Fixed header with close button (not customizable in v1)
- Controlled component only (no uncontrolled mode)
- No nested drawer support in v1

**Similarities to existing GhostUI components:**
- Follows same gooey aesthetic as GooeyCard, GooeyButton
- Uses Framer Motion like other animated components
- Supports theme integration like GooeySidebar
- Same TypeScript patterns and prop conventions

## Success Criteria

The implementation will be considered complete when:

1. ✅ Component renders correctly in all four placements
2. ✅ All 14 correctness properties pass with 100+ iterations each
3. ✅ Unit tests achieve >90% code coverage
4. ✅ Documentation page follows style guide completely
5. ✅ Component exports correctly from library
6. ✅ Navigation entry added and working
7. ✅ No TypeScript errors or warnings
8. ✅ No accessibility violations in automated testing
9. ✅ Visual regression tests pass
10. ✅ Performance benchmarks meet targets (60fps animations)
