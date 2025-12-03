# Design Document

## Overview

The GhostCursor component is a complete refactor that transforms the simple trail-based cursor into a sophisticated, interactive ghost character. The component replaces the system cursor globally and provides rich visual feedback through animations, state changes, and particle effects. Built with Framer Motion for smooth physics-based animations, the component features a detailed SVG ghost with blinking eyes, spring-based movement tracking, hover detection for interactive elements, and click-triggered particle effects.

The design emphasizes performance, smooth animations, and proper cleanup to ensure no memory leaks or visual artifacts. The component is self-contained with embedded styles and SVG assets, making it easy to drop into any application.

## Architecture

### Component Structure

```
GhostCursor (Main Component)
├── Global Style Injection
├── Motion-tracked Cursor Container
│   ├── Glow Aura Effect
│   └── SpookyGhostIcon SVG
│       ├── Body Path
│       ├── Animated Eyes Group (Blinking)
│       ├── Mouth Path
│       ├── Hand Path
│       └── Tail Path
└── Click Effects Layer (AnimatePresence)
    └── Animated Text Particles
```

### State Management

The component uses React hooks for state management:

- **Motion Values**: `cursorX` and `cursorY` track raw mouse position
- **Spring Values**: `x` and `y` apply physics to motion values for smooth movement
- **Boolean States**: `isHovering` and `isClicking` control visual feedback
- **Effect Array**: `effects` stores active click effect particles
- **Ref Counter**: `effectIdRef` generates unique IDs for effects

### Event Handling

The component registers global event listeners:

- **mousemove**: Updates cursor position and detects hover state
- **mousedown**: Triggers click animations and spawns particle effects

### CSS Strategy

Global styles are injected via a `<style>` tag to hide the system cursor:

```css
body.ghost-cursor-active,
body.ghost-cursor-active * {
  cursor: none !important;
}
```

The `!important` flag ensures cursor hiding overrides any inline styles or component-level CSS.

## Components and Interfaces

### GhostCursor Component

**Props**: None (component is self-contained)

**Exports**: Named export `GhostCursor`

**Dependencies**:
- `react`: useState, useEffect, useRef, useCallback
- `framer-motion`: motion, AnimatePresence, useMotionValue, useSpring
- `clsx` and `tailwind-merge`: For className utilities (cn function)

### SpookyGhostIcon Component

**Props**:
```typescript
interface SpookyGhostIconProps {
  className?: string;
}
```

**Purpose**: Renders the detailed ghost SVG with all visual elements

**SVG Structure**:
- ViewBox: "0 0 174.57 164.28"
- Body: White fill (#fff)
- Eyes: Dark gray fill (#2b2b28) with blink animation
- Mouth: Dark gray fill
- Hand and Tail: White fill

### Utility Functions

**cn(...inputs: ClassValue[])**
- Merges Tailwind classes using clsx and tailwind-merge
- Handles conditional classes and prevents conflicts

## Data Models

### ClickEffect Type

```typescript
type ClickEffect = {
  id: number;        // Unique identifier
  x: number;         // X coordinate in viewport
  y: number;         // Y coordinate in viewport
  text: string;      // Display text ("BOO!" or "POOF!")
};
```

### Motion Configuration

```typescript
const springConfig = {
  damping: 25,      // Resistance to motion
  stiffness: 300,   // Spring tension
  mass: 0.5         // Object weight
};
```

### Animation States

```typescript
// Cursor scale and rotation based on state
{
  scale: isClicking ? 0.8 : (isHovering ? 1.2 : 1),
  rotate: isClicking ? -15 : (isHovering ? 10 : 0)
}

// Click effect animation
{
  initial: { opacity: 1, scale: 0.5, y: 0 },
  animate: { opacity: 0, scale: 1.5, y: -40 },
  transition: { duration: 0.8, ease: "easeOut" }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Mouse movement updates motion values
*For any* mouse move event, the motion values should be updated to match the event's clientX and clientY coordinates.
**Validates: Requirements 2.1**

### Property 2: Click effects have unique IDs
*For any* sequence of clicks, all generated click effects should have unique, incrementing IDs with no duplicates.
**Validates: Requirements 5.3**

### Property 3: Click effect text is valid
*For any* click effect created, the text should be either "BOO!" or "POOF!" and no other value.
**Validates: Requirements 5.2**

### Property 4: Click effect rotation is within range
*For any* click effect rendered, the rotation value should be between -15 and 15 degrees inclusive.
**Validates: Requirements 5.8**

### Property 5: Multiple clicks create multiple effects
*For any* number of rapid clicks, the system should create a separate click effect for each individual click event.
**Validates: Requirements 12.2**

### Property 6: All clicks spawn effects at correct coordinates
*For any* click at coordinates (x, y), the system should create a click effect positioned at those exact coordinates.
**Validates: Requirements 5.1**

## Error Handling

### Event Listener Errors

The component handles potential errors in event listeners gracefully:

- **Invalid Event Targets**: The mousemove handler checks if `e.target` is an HTMLElement before accessing properties
- **Missing Methods**: Uses optional chaining when calling `closest()` to handle elements without this method
- **Computed Style Access**: Safely accesses `window.getComputedStyle()` which may fail on non-element nodes

### Cleanup Errors

The component prevents common cleanup errors:

- **Unmount with Pending Timeouts**: Timeouts use functional state updates to avoid stale closures
- **Double Cleanup**: The useEffect cleanup function safely removes listeners even if already removed
- **Class Removal**: Removing the body class is safe even if it doesn't exist

### Animation Errors

Framer Motion handles animation errors internally:

- **Invalid Motion Values**: Spring physics gracefully handle any numeric input
- **Rapid State Changes**: AnimatePresence manages component lifecycle during rapid updates
- **Transform Conflicts**: The component uses Framer Motion's style prop which overrides CSS transforms safely

## Testing Strategy

### Unit Testing

The component will use **Vitest** and **React Testing Library** for unit tests:

**Test Coverage**:
- Component mounting adds the cursor-hiding class to body
- Component unmounting removes the cursor-hiding class
- Event listeners are registered on mount
- Event listeners are removed on unmount
- Hover state detection for buttons, links, and pointer-cursor elements
- Click state triggers and resets after timeout
- Click effects are created with correct structure
- SVG renders with correct viewBox and structure
- Spring configuration values are correct
- Animation targets match specifications for hover/click states

**Testing Utilities**:
- `@testing-library/react` for rendering and queries
- `@testing-library/user-event` for simulating interactions
- `vitest` fake timers for timeout testing
- Custom render wrapper if needed for Framer Motion

### Property-Based Testing

The component will use **fast-check** for property-based testing:

**Property Test Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with format: `**Feature: ghost-cursor-refactor, Property {number}: {property_text}**`

**Property Tests**:

1. **Mouse Movement Property**: Generate random mouse coordinates and verify motion values update correctly
2. **Unique ID Property**: Generate multiple clicks and verify all effect IDs are unique
3. **Valid Text Property**: Generate many clicks and verify all effect texts are "BOO!" or "POOF!"
4. **Rotation Range Property**: Generate many clicks and verify all rotations are within [-15, 15]
5. **Multiple Clicks Property**: Generate rapid click sequences and verify effect count matches click count
6. **Coordinate Accuracy Property**: Generate random click coordinates and verify effects spawn at exact positions

**Generators**:
- Mouse coordinates: `fc.record({ clientX: fc.integer(0, 1920), clientY: fc.integer(0, 1080) })`
- Click sequences: `fc.array(fc.record({ x: fc.integer(), y: fc.integer() }), { minLength: 1, maxLength: 20 })`
- Time delays: `fc.integer(0, 2000)` for testing timeout behavior

### Integration Testing

Integration tests verify the component works correctly in realistic scenarios:

- Rendering within a Next.js application context
- Interaction with other cursor-related components
- Performance with many simultaneous click effects
- Behavior when rapidly mounting/unmounting

### Visual Regression Testing

While not automated, visual testing should verify:

- Ghost SVG renders correctly across browsers
- Animations are smooth and performant
- Glow effect is visible and aesthetically pleasing
- Click effects don't cause layout shifts

## Performance Considerations

### Optimization Strategies

1. **Motion Value Efficiency**: Using Framer Motion's `useMotionValue` avoids re-renders on every mouse move
2. **Spring Physics**: Spring configuration balances smoothness with performance (damping: 25, stiffness: 300)
3. **Effect Cleanup**: Click effects are automatically removed after 1 second to prevent memory leaks
4. **Event Delegation**: Uses window-level listeners instead of per-element listeners
5. **CSS Animations**: Eye blinking uses CSS keyframes instead of JavaScript for better performance

### Performance Targets

- **Mouse Tracking**: Should maintain 60fps during continuous mouse movement
- **Click Effects**: Should handle 10+ simultaneous effects without frame drops
- **Memory**: Should not leak memory over extended usage (hours)
- **Initial Render**: Should render in under 16ms (one frame)

### Potential Bottlenecks

- **Too Many Effects**: If users click extremely rapidly, effect array could grow large
  - Mitigation: Effects auto-remove after 1 second
- **SVG Rendering**: Complex SVG could be slow on low-end devices
  - Mitigation: SVG is relatively simple with few paths
- **Global Event Listeners**: Could conflict with other cursor components
  - Mitigation: Component should be used exclusively, not with other cursor replacements

## Browser Compatibility

### Supported Browsers

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Required Features

- CSS Custom Properties
- CSS Animations and Keyframes
- SVG rendering
- Framer Motion compatibility
- ES6+ JavaScript features

### Fallback Behavior

If the component fails to load or encounters errors:
- System cursor remains visible (graceful degradation)
- No JavaScript errors thrown to parent application
- Event listeners cleaned up properly

## Accessibility Considerations

### Cursor Visibility

**Challenge**: Hiding the system cursor can be problematic for accessibility

**Approach**:
- Component is opt-in and should be used sparingly
- Consider providing a user preference to disable custom cursor
- Ensure sufficient contrast for ghost visibility

### Keyboard Navigation

**Challenge**: Component only responds to mouse events

**Approach**:
- Does not interfere with keyboard navigation
- Clickable elements remain keyboard accessible
- Focus indicators should still be visible

### Screen Readers

**Challenge**: Visual-only component provides no semantic information

**Approach**:
- Component is purely decorative
- Does not interfere with screen reader functionality
- No ARIA attributes needed

### Motion Sensitivity

**Challenge**: Animations may cause discomfort for users with motion sensitivity

**Approach**:
- Respect `prefers-reduced-motion` media query
- Consider disabling or simplifying animations when motion is reduced
- Provide option to disable component entirely

## Integration Guidelines

### Installation

```bash
npm install ghostui
```

### Basic Usage

```tsx
import { GhostCursor } from 'ghostui';

export default function App() {
  return (
    <>
      <GhostCursor />
      {/* Your app content */}
    </>
  );
}
```

### Usage Recommendations

**When to Use**:
- Halloween-themed websites or applications
- Gaming interfaces with spooky themes
- Marketing pages with playful interactions
- Portfolio sites showcasing creative design

**When NOT to Use**:
- Professional business applications
- Accessibility-critical interfaces
- Mobile devices (no mouse cursor)
- Applications requiring precise cursor positioning

### Conflicts to Avoid

- Do not use with other cursor replacement components
- Do not use with `cursor: none` CSS on specific elements
- Do not use with other global cursor event listeners
- Ensure parent elements don't have `pointer-events: none`

## File Structure

```
packages/ghostui/src/components/
├── GhostCursor.tsx              # Main component file
├── GhostCursor.test.tsx         # Unit tests
├── GhostCursor.property.test.tsx # Property-based tests
└── index.ts                     # Updated exports

apps/docs/app/docs/components/
└── ghost-cursor/
    └── page.tsx                 # Documentation page
```

## Migration from Old Component

The old GhostCursor component had a different API:

**Old API**:
```tsx
<GhostCursor 
  color="#A855F7" 
  size={20} 
  trailLength={8} 
/>
```

**New API**:
```tsx
<GhostCursor />
```

**Breaking Changes**:
- No props accepted (self-contained design)
- Completely different visual appearance
- Hides system cursor globally (old version didn't)
- Different animation style (spring physics vs trail)

**Migration Steps**:
1. Remove all props from GhostCursor usage
2. Test that cursor hiding works as expected
3. Verify no conflicts with other cursor styles
4. Update any documentation referencing old API

## Future Enhancements

Potential improvements for future versions:

1. **Customization Props**: Allow color, size, and animation speed customization
2. **Multiple Ghost Styles**: Different ghost designs (scary, cute, silly)
3. **Sound Effects**: Optional audio on click/hover
4. **Particle Variety**: More click effect options beyond "BOO!" and "POOF!"
5. **Reduced Motion Support**: Simplified animations for accessibility
6. **Mobile Support**: Touch-based alternative for mobile devices
7. **Context API**: Global configuration for multiple instances
8. **Performance Monitoring**: Built-in FPS tracking and warnings
