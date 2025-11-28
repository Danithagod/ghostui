# Design Document

## Overview

The BloodSmear component upgrade transforms a simple directional wipe into a sophisticated page transition system. The design centers on three key visual layers: a solid blood block, a complex dripping SVG edge, and independent droplet particles. The component uses Framer Motion's AnimatePresence for orchestration and provides a clean API for navigation state management.

The architecture separates concerns between the transition component (BloodSmear), the visual asset (DripEdge SVG), and the integration layer (demo application). This separation allows the component to be reusable across different contexts while maintaining visual consistency.

## Architecture

### Component Hierarchy

```
BloodSmear (Main Component)
├── AnimatePresence (Framer Motion wrapper)
│   └── motion.div (Animated container)
│       ├── div (Solid blood block)
│       └── div (Drip edge container)
│           ├── DripEdge (SVG component)
│           └── motion.div[] (Droplet particles × 3)
```

### State Management

The component is controlled externally through props:
- `isNavigating`: Boolean prop that triggers the animation
- `onComplete`: Callback invoked when the transition finishes

The demo application manages:
- Current page state
- Navigation in-progress flag
- Timing coordination for content swaps

### Animation Timeline

```
0ms:    Animation starts (y: -100%)
1000ms: Content swap occurs (screen ~40% covered)
2500ms: Animation completes (y: 200%), onComplete fires
```

## Components and Interfaces

### BloodSmear Component

**Props Interface:**
```typescript
interface BloodSmearProps {
  isNavigating: boolean;
  onComplete?: () => void;
}
```

**Responsibilities:**
- Render full-screen overlay when `isNavigating` is true
- Animate from top to bottom with viscous easing
- Coordinate three visual layers (block, edge, droplets)
- Invoke callback on animation completion
- Remove from DOM when not active

**Key Implementation Details:**
- Uses `fixed` positioning with `inset-0` for full coverage
- Z-index of 100 ensures overlay appears above content
- `pointer-events-none` prevents interaction blocking
- AnimatePresence `mode="wait"` ensures clean enter/exit
- Motion values: initial `y: -100%`, animate `y: 200%`
- Duration: 2.5 seconds
- Easing: `[0.45, 0, 0.55, 1]` (custom cubic-bezier)

### DripEdge Component

**Props Interface:**
```typescript
interface DripEdgeProps {
  className?: string;
}
```

**Responsibilities:**
- Render complex wavy SVG path
- Accept className for styling flexibility
- Maintain proper aspect ratio behavior

**SVG Path Design:**
- ViewBox: `0 0 1440 320`
- Path creates 9 wave peaks across width
- Varies between y: 0 and y: 300 for organic appearance
- Uses `preserveAspectRatio="none"` to stretch horizontally
- Fill uses `currentColor` for theme flexibility

### Droplet Particles

**Configuration:**
Three droplets with varying properties:

1. **Droplet 1 (Fast):**
   - Position: left 20%, top 50%
   - Size: 4×6 (w×h in Tailwind units)
   - Animation: y: 0→400, duration 1s, scaleY 1.5
   - Repeat: infinite

2. **Droplet 2 (Slow, Large):**
   - Position: left 60%, top 33%
   - Size: 6×8
   - Animation: y: 0→300, duration 1.5s, scaleY 1.2
   - Delay: 0.2s
   - Repeat: infinite

3. **Droplet 3 (Tiny):**
   - Position: left 85%, top 66%
   - Size: 3×4
   - Animation: y: 0→500, duration 0.8s
   - Delay: 0.5s
   - Repeat: infinite

### Utility Functions

**cn Function:**
```typescript
function cn(...inputs: ClassValue[]): string
```

Combines `clsx` and `twMerge` for Tailwind class merging. Handles conditional classes and resolves Tailwind conflicts.

## Data Models

### Page Configuration (Demo)

```typescript
interface PageConfig {
  title: string;
  theme: string;        // Tailwind classes for bg/text
  icon: React.ReactNode;
  description: string;
}

type PageKey = 'safe' | 'danger';

const PAGES: Record<PageKey, PageConfig>
```

### Component State (Demo)

```typescript
interface DemoState {
  currentPage: PageKey;
  isNavigating: boolean;
}
```

## Co
rrectness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, I've identified properties that can be tested across all inputs versus specific examples that test concrete values. Many of the requirements specify exact configuration values (colors, durations, positions) which are best tested as examples rather than universal properties.

**Property 1: Navigation state controls rendering**
*For any* value of the `isNavigating` prop, when true the component SHALL render a full-screen overlay, and when false SHALL render nothing to the DOM.
**Validates: Requirements 1.1, 1.3, 5.1**

**Property 2: Callback invocation on completion**
*For any* provided `onComplete` callback function, the component SHALL invoke it exactly once when the animation completes.
**Validates: Requirements 1.2, 5.2**

**Property 3: Consistent blood color**
*For any* rendered blood element (block, edge, droplets), all SHALL use the color #991b1b.
**Validates: Requirements 2.4**

**Property 4: Minimum droplet count**
*For any* render during navigation, the component SHALL display at least 3 independent droplet particles.
**Validates: Requirements 4.1**

**Property 5: Unique droplet speeds**
*For any* set of droplet particles, each SHALL have a different animation duration to create varied movement.
**Validates: Requirements 4.2**

**Property 6: Droplet vertical scaling**
*For any* droplet particle, its animation SHALL include vertical scaling (scaleY) to simulate stretching.
**Validates: Requirements 4.3**

**Property 7: Infinite droplet animation**
*For any* droplet particle during navigation, its animation SHALL repeat infinitely.
**Validates: Requirements 4.4**

**Property 8: Navigation triggers transition**
*For any* navigation button click in the demo, the BloodSmear transition SHALL be triggered (isNavigating becomes true).
**Validates: Requirements 6.2**

**Property 9: Navigation state reset**
*For any* completed transition, the navigation state SHALL return to false.
**Validates: Requirements 6.4**

**Property 10: Button disabling during transition**
*For any* active transition, all navigation buttons SHALL be disabled.
**Validates: Requirements 6.5**

**Property 11: Class name merging**
*For any* set of Tailwind classes with conflicts, the cn utility function SHALL resolve conflicts by keeping the last class.
**Validates: Requirements 9.2**

**Property 12: Custom className application**
*For any* provided className prop to BloodSmear or DripEdge, the classes SHALL be applied to the rendered element.
**Validates: Requirements 9.3, 9.4**

## Error Handling

### Invalid Props

**Missing Required Props:**
- If `isNavigating` is undefined, TypeScript will catch at compile time
- Component gracefully handles missing `onComplete` by checking before invocation

**Invalid Callback:**
- If `onComplete` is not a function, wrap invocation in try-catch
- Log error to console but don't crash the component

### Animation Failures

**Framer Motion Errors:**
- AnimatePresence handles cleanup automatically
- If animation is interrupted, onExitComplete still fires
- Component unmounts cleanly even if animation doesn't complete

### Demo Application Errors

**Rapid Navigation Clicks:**
- Navigation buttons are disabled during transitions
- State checks prevent multiple simultaneous transitions
- If user somehow triggers multiple navigations, the last one wins

**Content Swap Timing:**
- setTimeout is used for content swap coordination
- If component unmounts before timeout, cleanup prevents state updates
- Use cleanup function in useEffect if needed

## Testing Strategy

### Unit Testing

We'll use **Vitest** with **React Testing Library** for unit tests. Focus areas:

**Component Rendering:**
- Test that component renders with isNavigating=true
- Test that component doesn't render with isNavigating=false
- Test that all required child elements are present (block, edge, droplets)

**Prop Handling:**
- Test that onComplete callback is invoked after animation
- Test that custom className props are applied
- Test TypeScript type checking (compile-time)

**Demo Application:**
- Test that navigation buttons trigger state changes
- Test that buttons are disabled during navigation
- Test that page content swaps occur

### Property-Based Testing

We'll use **fast-check** for property-based testing. This library provides:
- Arbitrary value generation for React props
- Shrinking to find minimal failing cases
- Configurable iteration counts (we'll use 100 minimum)

**Property Test Configuration:**
Each property test will:
- Run 100+ iterations with randomized inputs
- Include a comment tag linking to the design property
- Use format: `// Feature: bloodsmear-upgrade, Property N: [property text]`

**Key Properties to Test:**

1. **Navigation state controls rendering** - Generate random boolean values for isNavigating
2. **Callback invocation** - Generate random callback functions and verify invocation
3. **Consistent blood color** - Render and verify all blood elements have #991b1b
4. **Droplet properties** - Verify count, unique speeds, scaling, and infinite repeat
5. **Class name merging** - Generate random Tailwind class combinations and verify cn behavior

**Generator Strategies:**

- **Boolean generator**: Use fc.boolean() for isNavigating
- **Function generator**: Use fc.func() for callbacks
- **String generator**: Use fc.array(fc.string()) for className arrays
- **Component generator**: Render with random props and query DOM

### Integration Testing

**Full Navigation Flow:**
- Test complete navigation cycle from button click to completion
- Verify timing of content swap (around 1000ms)
- Verify state cleanup after transition

**Documentation Page:**
- Test that all required sections render
- Test that interactive demo works
- Test that code examples are present

### Visual Regression Testing

While not automated in this spec, consider:
- Screenshot testing for animation frames
- Visual comparison of drip edge rendering
- Droplet positioning verification

## Implementation Notes

### Dependencies

**Required:**
- `framer-motion`: ^10.x for animations
- `react`: ^18.x
- `clsx`: ^2.x for class merging
- `tailwind-merge`: ^2.x for Tailwind conflict resolution
- `lucide-react`: ^0.x for demo icons (demo only)

**Dev Dependencies:**
- `vitest`: ^1.x for unit testing
- `@testing-library/react`: ^14.x for component testing
- `@testing-library/user-event`: ^14.x for interaction testing
- `fast-check`: ^3.x for property-based testing

### File Structure

```
packages/ghostui/src/components/
├── BloodSmear.tsx          # Main component + DripEdge + cn utility
└── index.ts                # Export BloodSmear and BloodSmearProps

apps/docs/app/docs/components/blood-smear/
└── page.tsx                # Documentation page with full demo
```

### Performance Considerations

**Animation Performance:**
- Use `transform` properties (translateY) for GPU acceleration
- Avoid layout-triggering properties during animation
- Keep droplet count reasonable (3 is optimal)

**Re-render Optimization:**
- Component is controlled, so parent manages re-renders
- AnimatePresence handles mounting/unmounting efficiently
- No internal state means no unnecessary re-renders

**Bundle Size:**
- Framer Motion is tree-shakeable
- SVG is inline (no external asset loading)
- Utility functions are minimal

### Accessibility

**Motion Preferences:**
- Consider adding `prefers-reduced-motion` support
- Could provide a `reducedMotion` prop to disable animations
- Fallback to instant transition if motion is disabled

**Screen Readers:**
- Transition is purely visual, no semantic meaning
- Consider adding `aria-live` region for navigation announcements
- Ensure focus management during page transitions

### Browser Compatibility

**Target Support:**
- Modern browsers with CSS transforms
- Framer Motion handles vendor prefixes
- SVG support is universal in target browsers

**Fallbacks:**
- If animations fail, content still swaps
- Component gracefully degrades without motion support

## Migration from Old BloodSmear

### Breaking Changes

**API Changes:**
- Old: `isActive`, `direction`, `duration` props
- New: `isNavigating`, `onComplete` props
- `direction` prop is removed (always top-to-bottom)
- `duration` is hardcoded to 2.5s (was configurable)

### Migration Path

**Option 1: Keep Both Components**
- Export old component as `BloodSmearLegacy`
- Export new component as `BloodSmear`
- Deprecate legacy version in docs

**Option 2: Breaking Change**
- Replace old component entirely
- Update all internal uses in docs
- Document migration in changelog

**Recommended: Option 2** - The new component is significantly different in purpose (page transitions vs directional wipes). Clean break is clearer.

### Update Checklist

1. Replace component implementation in `BloodSmear.tsx`
2. Update exports in `index.ts`
3. Update documentation page with new demo
4. Update any internal uses in docs site
5. Add migration note to changelog
6. Update TypeScript types

## Future Enhancements

**Potential Additions:**
- Configurable blood color via prop
- Adjustable animation duration
- Multiple drip edge styles
- Sound effects integration
- Particle count configuration
- Direction variants (left, right, diagonal)

**Not in Scope:**
- Multiple simultaneous transitions
- Transition between specific elements (not full-screen)
- Reverse animation capability
- Custom easing function props
