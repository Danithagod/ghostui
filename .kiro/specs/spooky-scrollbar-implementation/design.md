# Design Document

## Overview

The SpookyScrollbar component is a custom scrollbar implementation that replaces native browser scrollbars with a themed, interactive experience. The component consists of three main visual elements: a custom scrollbar track and thumb, a PeekingGhost that appears on interaction, and a JumpScareGhost that appears when reaching the bottom of content. The implementation uses React hooks for state management, framer-motion for animations, and CSS for styling.

## Architecture

The SpookyScrollbar follows a container-wrapper pattern where:

1. **Outer Container**: A relative-positioned wrapper that contains all elements
2. **Content Area**: An absolutely-positioned scrollable div with hidden native scrollbar
3. **Scrollbar Track**: An absolutely-positioned custom scrollbar on the right side
4. **Scrollbar Thumb**: A draggable element within the track
5. **Ghost Overlays**: Animated SVG components that appear based on interaction state

The component uses refs to access DOM elements for scroll calculations and event handling. State management tracks thumb position, hover state, drag state, and jump scare visibility.

### Component Hierarchy

```
SpookyScrollbar (container)
├── <style> (inline CSS for scrollbar hiding)
├── Content Area (scrollable div with children)
├── Scrollbar Track
│   └── Scrollbar Thumb
│       ├── PeekingGhost (conditional, with AnimatePresence)
│       └── Glow Effect (conditional)
└── Jump Scare Overlay (conditional, with AnimatePresence)
    └── JumpScareGhost
```

## Components and Interfaces

### SpookyScrollbar Component

**Props Interface:**
```typescript
interface SpookyScrollbarProps {
  children: React.ReactNode;
  className?: string;
}
```

**State:**
- `thumbHeight: number` - Calculated height of the scrollbar thumb in pixels
- `scrollTop: number` - Current top position of the thumb in pixels
- `isHovering: boolean` - Whether the user is hovering over the scrollbar
- `isDragging: boolean` - Whether the user is actively dragging the thumb
- `showJumpScare: boolean` - Whether to display the jump scare effect

**Refs:**
- `contentRef: RefObject<HTMLDivElement>` - Reference to the scrollable content container
- `trackRef: RefObject<HTMLDivElement>` - Reference to the scrollbar track element

### PeekingGhost Component

A presentational component that renders an SVG ghost with floating animation.

**Props Interface:**
```typescript
interface PeekingGhostProps {
  className?: string;
}
```

The SVG includes:
- Main ghost body with white fill
- Eyes and facial features
- Floating animation via CSS keyframes
- Drop shadow for depth

### JumpScareGhost Component

A presentational component that renders a larger, more dramatic ghost SVG.

**Props Interface:**
```typescript
interface JumpScareGhostProps {
  className?: string;
}
```

The SVG includes:
- Larger ghost body with detailed features
- Eyes, cheeks, and highlights
- Drop shadow for dramatic effect

## Data Models

### Scroll Calculations

**Thumb Height Calculation:**
```
thumbHeight = max(
  (clientHeight / scrollHeight) * trackHeight,
  40  // minimum height in pixels
)
```

**Thumb Position Calculation:**
```
scrollRatio = scrollTop / (scrollHeight - clientHeight)
maxThumbTop = trackHeight - thumbHeight
thumbTop = scrollRatio * maxThumbTop
```

**Jump Scare Trigger:**
```
distanceFromBottom = scrollHeight - scrollTop - clientHeight
shouldShowJumpScare = distanceFromBottom < 10
```

**Drag Scroll Calculation:**
```
relativeY = mouseY - trackTop - (thumbHeight / 2)
scrollRatio = clamp(relativeY / (trackHeight - thumbHeight), 0, 1)
newScrollTop = scrollRatio * (scrollHeight - clientHeight)
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing the prework analysis, several properties can be consolidated:

- Properties 1.2 and 1.4 are inverses (scroll→thumb position and drag→scroll position) but both provide unique validation
- Property 7.1 and 7.2 are redundant - both test resize handling, can be combined
- Property 1.1 is more of a rendering check than a universal property
- Properties 3.1 and 3.4 are complementary (show/hide jump scare) and should both be kept

### Correctness Properties

Property 1: Thumb position reflects scroll position
*For any* scroll position in the content, the thumb position should be calculated as `(scrollTop / (scrollHeight - clientHeight)) * (trackHeight - thumbHeight)`
**Validates: Requirements 1.2**

Property 2: Thumb height proportional to content ratio
*For any* content height and container height, the thumb height should equal `max((clientHeight / scrollHeight) * trackHeight, 40)`
**Validates: Requirements 1.3, 7.1**

Property 3: Dragging scrolls to correct position
*For any* mouse Y position during drag, the content scroll position should equal `scrollRatio * (scrollHeight - clientHeight)` where scrollRatio is derived from the mouse position relative to the track
**Validates: Requirements 1.4, 6.2**

Property 4: Jump scare appears near bottom
*For any* content configuration, when the distance from bottom is less than 10 pixels, the jump scare should be visible
**Validates: Requirements 3.1**

Property 5: Jump scare hides when scrolling away
*For any* content configuration, when the distance from bottom exceeds 10 pixels, the jump scare should be hidden
**Validates: Requirements 3.4**

## Error Handling

The SpookyScrollbar component handles several edge cases and error conditions:

### Null Reference Handling

All DOM operations check for null refs before accessing properties:
```typescript
if (!contentRef.current || !trackRef.current) return;
```

This prevents errors when:
- Component is unmounting
- Refs haven't been assigned yet
- DOM elements are not available

### Content Shorter Than Container

When content is shorter than the container (scrollHeight <= clientHeight):
- The thumb height calculation will result in a value >= trackHeight
- The component should handle this gracefully by either hiding the scrollbar or setting thumb to full height
- Scroll calculations should not produce NaN or negative values

### Minimum Thumb Height

The thumb height is clamped to a minimum of 40px to ensure:
- The thumb remains visible and clickable
- Users can always interact with very long content
- The UI remains usable even with massive scroll areas

### Drag Boundary Clamping

During drag operations, the scroll ratio is clamped between 0 and 1:
```typescript
const scrollRatio = Math.max(0, Math.min(1, relativeY / (trackHeight - thumbHeight)));
```

This prevents:
- Scrolling beyond content boundaries
- Negative scroll positions
- Invalid thumb positions

### Event Cleanup

The component properly cleans up event listeners in useEffect return functions:
- Scroll event listeners are removed on unmount
- ResizeObserver is disconnected
- Mouse event listeners are removed when dragging ends

This prevents memory leaks and ensures proper component lifecycle management.

## Testing Strategy

The SpookyScrollbar will be tested using a combination of unit tests and property-based tests to ensure correctness across various scenarios.

### Unit Testing Approach

Unit tests will verify:
- Component renders with children
- Props (className, children) are properly applied
- State changes occur on user interactions (hover, drag, scroll)
- Ghost components appear/disappear based on conditions
- Event handlers are attached and cleaned up properly
- CSS classes are applied correctly
- Specific UI elements (speech bubbles, text) are rendered

**Testing Library:** Vitest with React Testing Library

Unit tests will use:
- `render()` to mount components
- `fireEvent` and `userEvent` for simulating interactions
- `screen.getBy*` queries to verify DOM elements
- `waitFor` for async state updates
- Mock refs and ResizeObserver where needed

### Property-Based Testing Approach

Property-based tests will verify universal properties across many randomly generated inputs using **fast-check** (JavaScript property testing library).

**Library:** fast-check

Each property test will:
- Run a minimum of 100 iterations
- Generate random test data (scroll positions, content heights, mouse positions)
- Verify the correctness property holds for all generated inputs
- Be tagged with a comment referencing the design document property

**Property Test Tags Format:**
```typescript
// Feature: spooky-scrollbar-implementation, Property 1: Thumb position reflects scroll position
```

**Property Test Coverage:**

1. **Property 1 Test**: Generate random scroll positions and verify thumb position calculation
   - Generators: scrollTop (0 to scrollHeight), scrollHeight (100 to 10000), clientHeight (50 to scrollHeight)
   - Verify: thumbTop === (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - thumbHeight)

2. **Property 2 Test**: Generate random content/container heights and verify thumb height
   - Generators: scrollHeight (0 to 10000), clientHeight (50 to 1000), trackHeight (100 to 800)
   - Verify: thumbHeight === max((clientHeight / scrollHeight) * trackHeight, 40)

3. **Property 3 Test**: Generate random mouse positions during drag and verify scroll position
   - Generators: mouseY (trackTop to trackTop + trackHeight), trackHeight, thumbHeight
   - Verify: scrollTop === scrollRatio * (scrollHeight - clientHeight)

4. **Property 4 Test**: Generate random content configurations and verify jump scare appears near bottom
   - Generators: scrollHeight, clientHeight, scrollTop (near bottom)
   - Verify: when (scrollHeight - scrollTop - clientHeight) < 10, showJumpScare === true

5. **Property 5 Test**: Generate random content configurations and verify jump scare hides when away from bottom
   - Generators: scrollHeight, clientHeight, scrollTop (not near bottom)
   - Verify: when (scrollHeight - scrollTop - clientHeight) >= 10, showJumpScare === false

### Integration Testing

Integration tests will verify:
- Complete user flows (scroll, hover, drag, reach bottom)
- Interaction between multiple state changes
- Animation triggers and completions
- ResizeObserver integration with content changes

### Test Organization

```
SpookyScrollbar.test.tsx          # Unit tests
SpookyScrollbar.property.test.ts  # Property-based tests
PeekingGhost.test.tsx             # Ghost component unit tests
JumpScareGhost.test.tsx           # Ghost component unit tests
```

## Implementation Notes

### Dependencies

The component requires:
- `react` - Core React library
- `framer-motion` - Animation library for ghost animations
- `clsx` and `tailwind-merge` - For className merging (cn utility)

### Styling Approach

The component uses:
- Tailwind CSS classes for styling
- Inline styles for dynamic positioning (thumb height and position)
- Inline `<style>` tag for scrollbar hiding CSS
- CSS keyframes for ghost floating animation

### Performance Considerations

1. **Scroll Event Throttling**: The handleScroll callback is wrapped in useCallback to prevent unnecessary re-renders
2. **ResizeObserver**: Used instead of polling for efficient content size detection
3. **Conditional Rendering**: Ghost components only render when needed (AnimatePresence)
4. **CSS Animations**: Floating animation uses CSS keyframes (GPU-accelerated) instead of JavaScript

### Accessibility Considerations

While the component provides a custom scrollbar experience:
- Keyboard scrolling (arrow keys, page up/down) still works through the content area
- Screen readers can still access all content
- The scrollbar is primarily a visual enhancement
- Consider adding ARIA labels if needed for screen reader users

### Browser Compatibility

The component uses:
- ResizeObserver (supported in all modern browsers)
- CSS custom properties (widely supported)
- Framer Motion (handles browser compatibility internally)

Fallback considerations:
- Native scrollbar hiding works in Chrome, Safari, Firefox, Edge
- ResizeObserver has polyfills available if needed for older browsers

## Documentation Structure

The documentation page will follow the standard GhostUI component documentation pattern:

### Page Structure

1. **Hero Section**: Component name and brief description
2. **Interactive Demo**: Live SpookyScrollbar with scrollable content
3. **Installation**: Import statement and dependencies
4. **Usage**: Basic code example
5. **Props Table**: Detailed prop descriptions
6. **Examples**: Additional use cases
7. **Styling**: Customization options

### Code Examples

The documentation will include:
- Basic usage example
- Custom className example
- Integration with other components
- Demo source code

### Props Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | The scrollable content |
| className | string | undefined | Additional CSS classes for the container |

## File Structure

```
packages/ghostui/src/components/
├── SpookyScrollbar.tsx           # Main component
├── SpookyScrollbar.test.tsx      # Unit tests
└── SpookyScrollbar.property.test.ts  # Property tests

apps/docs/app/docs/components/spooky-scrollbar/
└── page.tsx                      # Documentation page
```

## Migration and Integration

### Adding to Component Index

The component must be exported from:
- `packages/ghostui/src/components/index.ts`
- `packages/ghostui/src/index.ts`

### Navigation Update

Add entry to `apps/docs/lib/navigation.ts`:
```typescript
{
  title: 'Spooky Scrollbar',
  href: '/docs/components/spooky-scrollbar',
}
```

### Type Exports

If custom types are needed, export from:
- `packages/ghostui/src/types/index.ts`
