# Design Document

## Overview

The GooeyButton upgrade introduces a sophisticated visual effects system that enhances the component's liquid aesthetic through specular lighting, organic animations, and architectural improvements. The design separates rendering concerns into distinct layers: a filtered liquid layer for gooey effects and a clean content layer for crisp text and interactions.

The upgrade removes tooltip integration to maintain single responsibility, allowing developers to compose tooltip functionality externally when needed. The component becomes self-contained by inlining the `cn` utility function, eliminating external dependencies.

## Architecture

### Layer-Based Rendering Architecture

The component uses a three-layer rendering strategy:

1. **Background Layer (Glow Ring)**: Static glow effect positioned with negative z-index
2. **Filter Layer (Liquid Effects)**: Contains button body, drips, and splash with SVG filter applied
3. **Content Layer (Interactive Elements)**: Button element with text, positioned absolutely to overlap filter layer

This separation ensures SVG filters affect only visual elements while keeping text sharp and readable.

### Component Structure

```
<div> (Container with hover state management)
  ├── <svg> (Filter definitions)
  ├── <div> (Glow ring - background layer)
  ├── <div style="filter: url(#goo)"> (Filter layer)
  │   ├── <motion.div> (Animated button body)
  │   ├── <motion.div> (Drip container)
  │   │   ├── <motion.div> (Drip 1)
  │   │   ├── <motion.div> (Drip 2)
  │   │   └── <motion.div> (Drip 3)
  │   └── <AnimatePresence> (Splash effects)
  └── <button> (Content layer - text and interaction)
```


## Components and Interfaces

### Core Interfaces

```typescript
interface ThemeConfig {
  bg: string;        // Background color class
  glow: string;      // Shadow/glow effect class
  text: string;      // Text color class
  drip: string;      // Drip element color class
}

interface FluidityConfig {
  duration: number;      // Animation duration in seconds
  displacement: number;  // Vertical displacement in pixels
}

interface GooeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slime' | 'blood' | 'ectoplasm';
  fluidity?: 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}
```

### Theme Configuration

Three predefined themes with distinct color palettes:
- **Slime**: Lime green with toxic aesthetic
- **Blood**: Deep red with horror aesthetic  
- **Ectoplasm**: Purple with spectral aesthetic (default)

### Fluidity Configuration

Three intensity levels with adjusted displacement values:
- **Low**: 2.5s duration, 15px displacement
- **Medium**: 1.8s duration, 25px displacement (default)
- **High**: 1.2s duration, 35px displacement


## Data Models

### State Management

```typescript
// Hover state for animation control
const [isHovered, setIsHovered] = React.useState<boolean>(false);

// Click counter for splash animation keying
const [clickKey, setClickKey] = React.useState<number>(0);

// Unique filter ID generation
const id = React.useId();
const filterId = `goo-filter-${id.replace(/:/g, '')}`;
```

### Animation Variants

**Body Wobble Variants:**
```typescript
const bodyVariants: Variants = {
  initial: { scale: 1, borderRadius: "9999px" },
  hover: {
    scale: [1, 1.02, 0.98, 1.01, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  },
  tap: { scale: 0.95 }
};
```

**Drip Animation Variants:**
```typescript
const createDripVariants = (delay: number): Variants => ({
  initial: { y: 0, scale: 1 },
  hover: {
    y: [0, displacement, 0],
    scaleY: [1, 1.5, 1],
    scaleX: [1, 0.8, 1],
    transition: {
      duration: fluidityConfig.duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay
    }
  }
});
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Hover triggers body animation

*For any* GooeyButton instance, when the user hovers over the button (and it's not disabled), the button body should animate to the "hover" variant state.

**Validates: Requirements 2.1**

### Property 2: Hover off returns to initial state

*For any* GooeyButton instance, when the user stops hovering, the button body should return to the "initial" variant state.

**Validates: Requirements 2.4**

### Property 3: Tap applies scale feedback

*For any* GooeyButton instance, when the user taps/clicks the button (and it's not disabled), the button body should apply the "tap" variant with scale 0.95.

**Validates: Requirements 2.5**

### Property 4: Click triggers splash animation

*For any* GooeyButton instance, when the user clicks the button, the clickKey state should increment, triggering a new splash animation.

**Validates: Requirements 3.1**

### Property 5: Splash cleanup after animation

*For any* splash animation triggered by a click, after the animation completes, the splash element should be removed from the DOM.

**Validates: Requirements 3.3**

### Property 6: Multiple clicks create independent splashes

*For any* sequence of clicks on a GooeyButton, each click should create an independent splash animation with a unique key.

**Validates: Requirements 3.4**


### Property 7: Fluidity low uses correct displacement

*For any* GooeyButton with fluidity="low", the drip animation displacement should be 15 pixels.

**Validates: Requirements 6.1**

### Property 8: Fluidity medium uses correct displacement

*For any* GooeyButton with fluidity="medium", the drip animation displacement should be 25 pixels.

**Validates: Requirements 6.2**

### Property 9: Fluidity high uses correct displacement

*For any* GooeyButton with fluidity="high", the drip animation displacement should be 35 pixels.

**Validates: Requirements 6.3**

### Property 10: Glow ring initial state

*For any* GooeyButton that is not hovered, the glow ring should render with opacity-60 and scale-100 classes.

**Validates: Requirements 7.1**

### Property 11: Glow ring hover state

*For any* GooeyButton that is hovered, the glow ring should render with opacity-100 and scale-105 classes.

**Validates: Requirements 7.2**

### Property 12: Disabled button prevents interaction but shows glow

*For any* GooeyButton with disabled=true, the button should not respond to clicks (onClick not called) but the glow ring should still render and respond to hover state.

**Validates: Requirements 7.4**

### Property 13: No tooltip wrapping

*For any* GooeyButton instance, the component should not render a SpookyTooltip wrapper, regardless of props.

**Validates: Requirements 8.2**

### Property 14: Click increments state

*For any* GooeyButton instance, clicking the button should increment the clickKey state by 1.

**Validates: Requirements 9.1**

### Property 15: onClick handler invoked with event

*For any* GooeyButton with an onClick handler, clicking the button should invoke the handler with the original click event object.

**Validates: Requirements 9.2, 9.3**

### Property 16: Splash without onClick handler

*For any* GooeyButton without an onClick handler, clicking the button should still trigger the splash animation (clickKey increments).

**Validates: Requirements 9.4**

### Property 17: cn function merges classes correctly

*For any* set of Tailwind class strings, the inline cn function should merge them correctly, with later classes overriding earlier conflicting classes.

**Validates: Requirements 10.2**


## Error Handling

### Invalid Props Handling

- **Invalid variant**: Falls back to 'ectoplasm' theme using `themes[variant] || themes.ectoplasm`
- **Invalid fluidity**: Falls back to 'medium' settings using `fluiditySettings[fluidity] || fluiditySettings.medium`
- **Missing children**: React will handle rendering nothing, no special error handling needed
- **Invalid className**: Passed through to cn() which handles invalid inputs gracefully

### Disabled State

When `disabled={true}`:
- Button element receives `disabled` attribute preventing clicks
- Opacity reduced to 50% via `disabled && 'opacity-50'` class
- Cursor changed to not-allowed via `disabled && 'cursor-not-allowed'` class
- Hover animations prevented by checking `isHovered && !disabled` condition
- Tap animations prevented by checking `!disabled` condition

### Motion Reduce Support

For users with `prefers-reduced-motion`:
- Drip elements hidden via `motion-reduce:hidden` class
- Body wobble and tap animations still work (Framer Motion respects motion preferences)
- Splash animations still work but may be simplified by Framer Motion

### Filter ID Conflicts

- Uses `React.useId()` to generate unique IDs per component instance
- Sanitizes ID by removing colons: `id.replace(/:/g, '')` to ensure valid CSS selector
- Each button has its own filter definition preventing conflicts


## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific examples and edge cases:

1. **Rendering Tests**
   - Component renders without crashing
   - All three variants render with correct theme classes
   - All three fluidity levels render with correct configuration
   - Disabled state applies correct classes and attributes

2. **Structure Tests**
   - SVG filter elements exist with correct attributes (specular lighting, blur, composite)
   - Filter layer and content layer both render
   - Three drip elements render at correct positions
   - Glow ring renders with correct initial classes

3. **Interaction Tests**
   - Clicking button calls onClick handler
   - Clicking button increments clickKey
   - Hovering sets isHovered to true
   - Leaving hover sets isHovered to false

4. **Edge Cases**
   - Disabled button doesn't call onClick
   - Button without onClick still shows splash
   - Invalid variant falls back to ectoplasm
   - Invalid fluidity falls back to medium

5. **Composition Tests**
   - GooeyButton can be wrapped with SpookyTooltip manually
   - No tooltip props exist on GooeyButton interface

### Property-Based Testing Approach

Property-based tests will verify universal behaviors across many inputs using **fast-check** (JavaScript/TypeScript PBT library). Each test will run a minimum of 100 iterations.

1. **Animation State Properties**
   - Property 1: Hover triggers animation (test with random variants/fluidity)
   - Property 2: Hover off returns to initial (test with random states)
   - Property 3: Tap applies scale feedback (test with random button configs)

2. **Click Behavior Properties**
   - Property 4: Click triggers splash (test with random click sequences)
   - Property 6: Multiple clicks create independent splashes (test with random click counts)
   - Property 14: Click increments state (test with random initial states)
   - Property 15: onClick handler receives event (test with random handlers)
   - Property 16: Splash without onClick (test with buttons missing onClick)

3. **Configuration Properties**
   - Property 7-9: Fluidity displacement mapping (test all fluidity values)
   - Property 10-11: Glow ring state (test hover on/off with random variants)
   - Property 12: Disabled button behavior (test with random props)

4. **Utility Function Properties**
   - Property 17: cn function merges classes (test with random class combinations)

### Testing Framework Configuration

- **Unit Tests**: Vitest with React Testing Library
- **Property Tests**: fast-check library
- **Test Location**: Co-located with component as `GooeyButton.test.tsx`
- **Minimum PBT Iterations**: 100 per property test
- **Property Test Tags**: Each test tagged with `// Feature: gooey-button-upgrade, Property X: [description]`

