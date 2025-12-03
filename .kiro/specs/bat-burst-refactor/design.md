# Design Document

## Overview

The BatBurst component refactor transforms the existing simple radial burst animation into a sophisticated, physics-based interactive experience. The new implementation features three distinct phases: a dramatic jumpscare effect, an interactive swarm with cursor repulsion physics, and smooth cleanup. The component leverages Framer Motion's spring animations and useSpring hooks to create fluid, realistic bat movements that respond dynamically to user cursor position.

The architecture separates concerns into three main sub-components: BatIcon (the SVG asset), JumpscareBat (the initial dramatic effect), and AnimatedBat (individual physics-enabled bat entities). The main BatBurst component orchestrates these elements, managing state transitions, event listeners, and the overall effect lifecycle.

## Architecture

### Component Hierarchy

```
BatBurst (Main Container)
├── Style Injection (CSS Keyframes)
├── Trigger Area (Optional, for demo)
├── AnimatePresence (Framer Motion)
    └── Full Screen Overlay (when active)
        ├── Backdrop (darkening effect)
        ├── JumpscareBat (conditional, first 1.5s)
        └── AnimatedBat[] (swarm of 10 bats)
```

### State Management

The component maintains several pieces of state:
- `isActive`: Boolean controlling the entire effect lifecycle
- `triggerScare`: Boolean controlling the jumpscare sub-effect (auto-resets after 1.5s)
- `mousePos`: Object tracking cursor x/y coordinates
- `windowSize`: Object tracking viewport width/height for position calculations

### Event Flow

1. **Activation**: User triggers effect (button click or hover)
2. **Jumpscare Phase**: Large bat scales up dramatically (0-1.5s)
3. **Interactive Phase**: Swarm appears, responds to cursor (1.5s+)
4. **Deactivation**: User leaves trigger area, effect fades out
5. **Cleanup**: Event listeners removed, timers cleared

## Components and Interfaces

### BatIcon Component

```typescript
interface BatIconProps {
  className?: string;
}

const BatIcon: React.FC<BatIconProps>
```

A pure presentational component that renders the bat SVG. Uses `currentColor` for theming support. The SVG path data is exactly as provided in the specification.

### JumpscareBat Component

```typescript
const JumpscareBat: React.FC
```

A self-contained component that renders the jumpscare effect. Uses Framer Motion's `motion.div` with specific animation parameters:
- Initial: `opacity: 0, scale: 0.2, y: 300`
- Animate: `opacity: 1, scale: 5, y: 0`
- Exit: `opacity: 0, scale: 8, y: -200`
- Duration: 600ms with custom easing `[0.16, 1, 0.3, 1]`

Styling includes drop shadow and subtle blur for dramatic effect.

### AnimatedBat Component

```typescript
interface AnimatedBatProps {
  id: number;
  size: number;
  homeX: number;  // Percentage 0-100
  homeY: number;  // Percentage 0-100
  opacity: number;
  blur?: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
  windowSize: { width: number; height: number };
}

const AnimatedBat: React.FC<AnimatedBatProps>
```

The core physics-enabled bat component. Uses Framer Motion's `useSpring` hooks for smooth, spring-based animations:
- `x` spring: Controls horizontal position
- `y` spring: Controls vertical position
- `rotate` spring: Controls rotation angle

**Physics Calculations:**
1. Convert home position from percentage to pixels
2. Calculate distance vector from bat to cursor
3. If distance < 300px (repulsion radius):
   - Calculate normalized force (0-1 based on proximity)
   - Apply repulsion strength (150px max displacement)
   - Calculate rotation based on direction
4. Update spring targets with new positions

**Spring Configuration:**
- Stiffness: 60 (moderate responsiveness)
- Damping: 15 (smooth, slightly bouncy)
- Mass: 1 (standard weight)

### BatBurst Main Component

```typescript
interface BatBurstProps {
  className?: string;
  onComplete?: () => void;
}

export const BatBurst: React.FC<BatBurstProps>
```

The main orchestrator component. Manages:
- Effect activation/deactivation
- Mouse position tracking
- Window resize handling
- Jumpscare timing
- Swarm configuration

**Swarm Configuration:**
10 bats with varied properties:
- Sizes: 100-350px
- Positions: Distributed across viewport (percentage coordinates)
- Opacities: 0.6-1.0
- Each bat has unique flapping timing based on ID

## Data Models

### Mouse Position

```typescript
interface MousePosition {
  x: number;  // Pixels from left edge
  y: number;  // Pixels from top edge
}
```

### Window Size

```typescript
interface WindowSize {
  width: number;   // Viewport width in pixels
  height: number;  // Viewport height in pixels
}
```

### Bat Configuration

```typescript
interface BatConfig {
  id: number;      // Unique identifier
  size: number;    // Size in pixels
  x: number;       // Home X position (percentage 0-100)
  y: number;       // Home Y position (percentage 0-100)
  op: number;      // Opacity (0-1)
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Activation triggers jumpscare

*For any* BatBurst component, when the effect is activated, the jumpscare effect should be visible for exactly 1.5 seconds before automatically deactivating.

**Validates: Requirements 1.2, 2.4**

### Property 2: Repulsion force inversely proportional to distance

*For any* AnimatedBat and cursor position, when the cursor is within the repulsion radius (300px), the repulsion force applied should increase as the distance decreases, with force = 0 at 300px and force = 1 at 0px.

**Validates: Requirements 3.1, 3.2**

### Property 3: Spring animation returns to home

*For any* AnimatedBat, when the cursor moves outside the repulsion radius, the bat's position should converge back to its home position over time through spring physics.

**Validates: Requirements 3.4**

### Property 4: Rotation direction matches repulsion

*For any* AnimatedBat being repelled, the rotation angle should be positive when the bat is pushed right (dx > 0) and negative when pushed left (dx < 0), with magnitude proportional to repulsion force.

**Validates: Requirements 3.5**

### Property 5: Window resize maintains relative positions

*For any* AnimatedBat with home position (homeX%, homeY%), when the window is resized, the pixel position should equal (homeX% × new_width, homeY% × new_height).

**Validates: Requirements 9.1, 9.5**

### Property 6: Event listeners cleaned up on deactivation

*For any* BatBurst component, when the effect transitions from active to inactive, all mousemove and resize event listeners should be removed from the window object.

**Validates: Requirements 10.1, 10.2**

### Property 7: Flapping duration varies per bat

*For any* two AnimatedBat instances with different IDs, their flapping animation durations should differ, calculated as 0.1 + (id % 5) × 0.02 seconds.

**Validates: Requirements 5.3**

### Property 8: Backdrop opacity transitions correctly

*For any* BatBurst component, when activated, the backdrop should fade in over 300ms, and when deactivated, should fade out over 300ms.

**Validates: Requirements 6.4**

### Property 9: BatIcon uses exact SVG path

*For any* BatIcon component rendered, the SVG path element should contain the exact path data specified in the requirements, with no modifications.

**Validates: Requirements 7.1, 7.5**

### Property 10: Pointer events disabled on animated elements

*For any* animated bat element (JumpscareBat or AnimatedBat), the CSS class should include `pointer-events-none` to prevent interference with page interactions.

**Validates: Requirements 10.5**

## Error Handling

### Invalid Props

- If `homeX` or `homeY` are outside 0-100 range, clamp to valid range
- If `size` is negative or zero, default to 100px
- If `opacity` is outside 0-1 range, clamp to valid range

### Browser Compatibility

- Check for `window` object existence before adding event listeners (SSR safety)
- Gracefully degrade if Framer Motion is not available (show static bats)
- Handle missing `requestAnimationFrame` for older browsers

### Memory Leaks

- Always clean up event listeners in useEffect return functions
- Clear all timers (setTimeout) when component unmounts
- Remove spring subscriptions when component unmounts

### Performance

- Throttle mouse move events if performance degrades (consider using requestAnimationFrame)
- Limit number of bats to prevent excessive DOM nodes
- Use CSS transforms for animations (GPU-accelerated)

## Testing Strategy

### Unit Tests

**BatIcon Component:**
- Renders with correct SVG path data
- Applies className prop correctly
- Uses currentColor for fill

**JumpscareBat Component:**
- Renders with correct initial animation values
- Completes animation in 600ms
- Applies correct styling (drop shadow, blur)

**AnimatedBat Component:**
- Calculates repulsion force correctly for various distances
- Converts percentage positions to pixels correctly
- Applies rotation in correct direction
- Updates spring values when props change

**BatBurst Main Component:**
- Activates jumpscare on trigger
- Adds/removes event listeners correctly
- Cleans up timers on unmount
- Renders correct number of bats in swarm

### Property-Based Tests

We will use **fast-check** as the property-based testing library for TypeScript/React.

**Property 1: Repulsion Force Calculation**
- Generate random cursor positions and bat home positions
- Verify force is always between 0 and 1
- Verify force increases as distance decreases
- Verify force is 0 when distance >= 300px

**Property 2: Position Conversion**
- Generate random percentage coordinates (0-100) and window sizes
- Verify pixel position = (percentage / 100) × window dimension
- Verify positions are always within window bounds

**Property 3: Rotation Direction**
- Generate random dx values (positive and negative)
- Verify rotation sign matches dx sign
- Verify rotation magnitude is proportional to force

**Property 4: Event Listener Cleanup**
- Simulate multiple activation/deactivation cycles
- Verify no event listeners remain after final deactivation
- Verify no memory leaks in listener references

### Integration Tests

- Test full activation → jumpscare → interactive → deactivation flow
- Test cursor interaction with multiple bats simultaneously
- Test window resize during active effect
- Test rapid activation/deactivation cycles
- Test component behavior in SSR environment

### Visual Regression Tests

- Capture screenshots of jumpscare at key frames
- Capture screenshots of swarm at rest
- Capture screenshots of swarm during cursor interaction
- Compare against baseline images

## Implementation Notes

### CSS Keyframes

The flapping animation is defined using CSS keyframes for performance:

```css
@keyframes flap {
  0% { transform: scaleY(1) scaleX(1); }
  100% { transform: scaleY(0.4) scaleX(0.8); }
}
```

This is injected via a `<style>` tag in the component for encapsulation.

### Z-Index Layering

- Backdrop: z-index 9990
- AnimatedBats: z-index 100 (when active), z-index 0 (when idle)
- JumpscareBat: z-index 9999

### Performance Optimizations

- Use `pointer-events-none` on all animated elements
- Leverage GPU acceleration with CSS transforms
- Minimize re-renders by memoizing bat configurations
- Use `useCallback` for event handlers
- Debounce window resize events if needed

### Accessibility Considerations

- Add `aria-hidden="true"` to decorative bat elements
- Ensure trigger button has proper focus states
- Provide `prefers-reduced-motion` support to disable animations
- Ensure backdrop doesn't trap keyboard focus

## Migration Path

### Breaking Changes

None. The new component maintains the same external API as the old BatBurst component.

### Deprecations

The old `batCount` and `duration` props are no longer used but can be kept for backward compatibility (ignored internally).

### Upgrade Steps

1. Replace BatBurst.tsx with new implementation
2. Update documentation page with new demo
3. Test existing usage in applications
4. Update examples to showcase new interactive features
