# Design Document

## Overview

The GhostToast redesign transforms the notification system from a traditional toast component into a character-driven, whimsical notification experience. The core concept features an animated ghost character that appears from either side of the screen, delivering messages in a speech bubble. The design emphasizes playfulness through randomized positioning, rotation, and scaling, creating a dynamic "haunted" aesthetic.

The architecture consists of three main layers:
1. **Provider Layer**: Context-based state management for toast lifecycle
2. **Presentation Layer**: Animated ghost character and speech bubble rendering
3. **Animation Layer**: Framer Motion-powered entrance, exit, and layout animations

## Architecture

### Component Structure

```
GhostToastProvider (Context Provider)
├── Children (Application Components)
└── GhostToastContainer (Fixed Positioned)
    └── AnimatePresence
        └── GhostToastItem[] (Individual Toasts)
            ├── SpookyGhostIcon (SVG Character)
            └── Speech Bubble (Message Container)
                ├── Connection Arrow
                ├── Message Text
                └── Close Button
```

### State Management

The toast system uses React Context for state management:

- **Toast State**: Array of toast objects stored in provider state
- **Toast Creation**: `addToast` function generates unique IDs and random positioning values
- **Toast Removal**: Automatic timeout-based removal and manual dismissal via `removeToast`
- **Randomization**: Each toast receives random values for side, scale, rotation, and offset at creation time

### Animation Strategy

The component uses Framer Motion for all animations:

- **Entry Animation**: Spring-based animation from off-screen (150%) with initial rotation
- **Exit Animation**: Ease-based animation back off-screen with scale reduction
- **Layout Animation**: Automatic repositioning of remaining toasts when one is removed
- **Stacking**: `mode="popLayout"` in AnimatePresence for smooth stack management

## Components and Interfaces

### GhostToastProvider

**Purpose**: Provides toast context and renders the toast container

**Props**:
```typescript
interface GhostToastProviderProps {
  children: React.ReactNode;
}
```

**State**:
```typescript
interface ToastType {
  id: string;
  message: string;
  type: 'info' | 'curse';
  side: 'left' | 'right';
  scale: number;
  rotation: number;
  offsetX: number;
}

const [toasts, setToasts] = useState<ToastType[]>([]);
```

**Context Value**:
```typescript
interface ToastContextType {
  addToast: (message: string, type?: 'info' | 'curse') => void;
}
```

### useGhostToast Hook

**Purpose**: Provides access to toast API from any child component

**Returns**:
```typescript
{
  addToast: (message: string, type?: 'info' | 'curse') => void;
}
```

**Behavior**:
- Throws error if used outside GhostToastProvider
- Provides type-safe access to toast functions

### GhostToastItem

**Purpose**: Renders individual toast with ghost character and speech bubble

**Props**:
```typescript
interface GhostToastItemProps {
  toast: ToastType;
  removeToast: (id: string) => void;
}
```

**Layout**:
- Flexbox container with conditional `flex-row` or `flex-row-reverse` based on side
- Ghost character: 24x24 (w-24 h-24) with negative margin overlap
- Speech bubble: max-w-xs with padding and rounded corners
- Connection arrow: Absolutely positioned triangle

### SpookyGhostIcon

**Purpose**: Renders the animated ghost SVG character

**Features**:
- Custom SVG with body, eyes, mouth, hand, and tail paths
- CSS keyframe animation for eye blinking (4s interval)
- Horizontal flip via scale-x-[-1] for left-side toasts
- Drop shadow filter for depth

**SVG Structure**:
```typescript
<svg viewBox="0 0 174.57 164.28">
  <path className="cls-1" /> {/* Body */}
  <g className="animate-[blink_4s_infinite]"> {/* Eyes */}
    <path className="cls-2" />
    <path className="cls-2" />
  </g>
  <path className="cls-2" /> {/* Mouth */}
  <path className="cls-1" /> {/* Hand */}
  <path className="cls-1" /> {/* Tail */}
</svg>
```

### GhostToastContainer

**Purpose**: Fixed-position container for all toasts

**Styling**:
- `fixed inset-y-0 left-0 right-0`: Full viewport height
- `pointer-events-none`: Allows clicks through container
- `flex flex-col justify-end`: Stacks toasts from bottom
- `z-[9999]`: Ensures toasts appear above all content

## Data Models

### Toast Object

```typescript
interface ToastType {
  id: string;              // Unique identifier (random string)
  message: string;         // Toast message content
  type: 'info' | 'curse'; // Visual theme
  side: 'left' | 'right'; // Screen side (50/50 random)
  scale: number;          // Size variation (0.85 - 1.1)
  rotation: number;       // Rotation angle (-15 to 15 degrees)
  offsetX: number;        // Horizontal offset (0 - 60px)
}
```

### Randomization Calculations

```typescript
// Side: 50/50 probability
side = Math.random() > 0.5 ? 'right' : 'left';

// Scale: 0.85 to 1.1 (range of 0.25)
scale = 0.85 + Math.random() * 0.25;

// Rotation: -15 to 15 degrees (range of 30)
rotation = (Math.random() - 0.5) * 30;

// Offset: 0 to 60 pixels
offsetX = Math.random() * 60;
```

### Theme Configuration

```typescript
const themes = {
  info: {
    background: 'bg-[#0f0a1f]/95',
    border: 'border-purple-900/50',
    text: 'text-purple-100'
  },
  curse: {
    background: 'bg-[#2a0a0a]/95',
    border: 'border-red-900/50',
    text: 'text-red-100'
  }
};
```

## Correctnes
s Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Toast creation adds to state

*For any* message string, calling `addToast` should result in the toast array length increasing by one.
**Validates: Requirements 1.2**

### Property 2: Theme consistency

*For any* valid toast type ('info' or 'curse'), the rendered toast should contain CSS classes matching that type's color scheme for both background and border.
**Validates: Requirements 2.4**

### Property 3: Side randomization produces both values

*For any* sufficiently large number of toast creations (n > 20), both 'left' and 'right' sides should appear in the results.
**Validates: Requirements 3.1**

### Property 4: Scale bounds

*For any* created toast, the scale value should be greater than or equal to 0.85 and less than or equal to 1.1.
**Validates: Requirements 3.2**

### Property 5: Rotation bounds

*For any* created toast, the rotation value should be greater than or equal to -15 and less than or equal to 15.
**Validates: Requirements 3.3**

### Property 6: Offset bounds

*For any* created toast, the offsetX value should be greater than or equal to 0 and less than or equal to 60.
**Validates: Requirements 3.4**

### Property 7: Independent randomization

*For any* two toasts created sequentially, they should have different values for at least one of: scale, rotation, or offsetX (with very high probability).
**Validates: Requirements 3.5**

### Property 8: Dismissal removes from state

*For any* toast in the toast array, calling `removeToast` with its ID should result in that toast no longer being in the array.
**Validates: Requirements 5.2**

### Property 9: Arrow color matching

*For any* toast type, the connection arrow's background and border colors should match the speech bubble's background and border colors.
**Validates: Requirements 7.4**

## Error Handling

### Invalid Hook Usage

**Error**: Hook used outside provider context
**Handling**: Throw descriptive error with message "useGhostToast must be used within a GhostToastProvider"
**Prevention**: Clear documentation and TypeScript types

### Missing Dependencies

**Error**: Framer Motion or other dependencies not installed
**Handling**: Build-time error with clear dependency requirements
**Prevention**: Proper peer dependencies in package.json

### Invalid Toast Type

**Error**: Type other than 'info' or 'curse' passed
**Handling**: TypeScript prevents at compile time; runtime defaults to 'info'
**Prevention**: Union type definition restricts valid values

### Memory Leaks

**Error**: Timeouts not cleared when component unmounts
**Handling**: Cleanup function in useEffect to clear pending timeouts
**Prevention**: Proper React lifecycle management

## Testing Strategy

### Unit Testing

The component will use Vitest and React Testing Library for unit tests:

**Core Functionality Tests**:
- Provider renders children correctly
- Hook throws error when used outside provider
- addToast creates toast with correct message
- removeToast removes specific toast
- Auto-dismiss after 5 seconds
- Manual dismiss via close button

**Rendering Tests**:
- Ghost SVG renders with all required elements
- Speech bubble renders with message
- Connection arrow renders and positions correctly
- Theme classes apply correctly for 'info' and 'curse'
- Side-based layout (flex-row vs flex-row-reverse)
- Ghost flips horizontally for left-side toasts

**Animation Tests**:
- Initial animation props set correctly
- Exit animation props set correctly
- Spring configuration values correct
- Layout prop present for stack animations

**Accessibility Tests**:
- Container has pointer-events-none
- Individual toasts have pointer-events-auto
- Close button has accessible label
- Proper z-index layering

### Property-Based Testing

The component will use fast-check for property-based testing:

**Library**: fast-check (JavaScript/TypeScript property-based testing)
**Configuration**: Minimum 100 iterations per property test

**Property Tests**:

1. **Toast Creation Property** (Property 1)
   - Generate random message strings
   - Verify toast array grows by one
   - Tag: `**Feature: ghost-toast-redesign, Property 1: Toast creation adds to state**`

2. **Theme Consistency Property** (Property 2)
   - Generate random toast types
   - Verify color classes match type
   - Tag: `**Feature: ghost-toast-redesign, Property 2: Theme consistency**`

3. **Side Randomization Property** (Property 3)
   - Create 50 toasts
   - Verify both 'left' and 'right' appear
   - Tag: `**Feature: ghost-toast-redesign, Property 3: Side randomization produces both values**`

4. **Scale Bounds Property** (Property 4)
   - Create many toasts
   - Verify all scales in [0.85, 1.1]
   - Tag: `**Feature: ghost-toast-redesign, Property 4: Scale bounds**`

5. **Rotation Bounds Property** (Property 5)
   - Create many toasts
   - Verify all rotations in [-15, 15]
   - Tag: `**Feature: ghost-toast-redesign, Property 5: Rotation bounds**`

6. **Offset Bounds Property** (Property 6)
   - Create many toasts
   - Verify all offsets in [0, 60]
   - Tag: `**Feature: ghost-toast-redesign, Property 6: Offset bounds**`

7. **Independent Randomization Property** (Property 7)
   - Create pairs of toasts
   - Verify they differ in at least one random value
   - Tag: `**Feature: ghost-toast-redesign, Property 7: Independent randomization**`

8. **Dismissal Property** (Property 8)
   - Generate random toast IDs
   - Verify removal from array
   - Tag: `**Feature: ghost-toast-redesign, Property 8: Dismissal removes from state**`

9. **Arrow Color Matching Property** (Property 9)
   - Generate random toast types
   - Verify arrow colors match bubble colors
   - Tag: `**Feature: ghost-toast-redesign, Property 9: Arrow color matching**`

### Integration Testing

**Documentation Integration**:
- Demo page renders without errors
- Demo buttons trigger toasts
- Code examples are syntactically correct
- Props tables display all required information

**Package Integration**:
- Component exports correctly from package
- TypeScript types are available
- Dependencies resolve correctly
- Build process completes successfully

## Implementation Notes

### Utility Function

The component includes a local `cn` utility function for className merging:

```typescript
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This could be imported from the shared lib/utils, but is included inline for component independence.

### Animation Keyframes

The blinking animation is defined inline using Tailwind's arbitrary animation syntax:

```typescript
<style>{`
  @keyframes blink {
    0%, 96%, 100% { transform: scaleY(1); }
    98% { transform: scaleY(0.1); }
  }
`}</style>
```

This is included in the container component to ensure the animation is available.

### Z-Index Strategy

- Container: No explicit z-index (relies on fixed positioning)
- Individual toasts: `z-index: 100` to ensure they appear above most content
- Ghost character: `z-20` (relative within toast)
- Speech bubble: `z-10` (relative within toast, behind ghost)

### Responsive Considerations

The component is designed to work on all screen sizes:
- Toast max-width: `max-w-xs` (320px) prevents overflow on mobile
- Fixed positioning with padding ensures toasts don't touch screen edges
- Randomization values are small enough to not cause horizontal overflow

### Performance Considerations

- Toasts auto-dismiss after 5 seconds to prevent memory buildup
- AnimatePresence with `mode="popLayout"` optimizes layout animations
- SVG ghost is lightweight and renders efficiently
- No heavy computations in render path

### Migration from Old Component

The new design is a breaking change from the old GhostToast component:

**API Changes**:
- `showToast` → `addToast`
- `useToast` → `useGhostToast`
- Toast types reduced from 5 to 2 ('info', 'curse')
- Position prop removed (now randomized left/right)
- No title prop (simplified to message only)
- No duration prop (fixed at 5 seconds)

**Visual Changes**:
- Ghost character replaces icon-based design
- Speech bubble replaces card-based design
- Side-based positioning replaces corner positioning
- Randomized stacking replaces uniform stacking

**Migration Strategy**:
- Keep old component as `GhostToast` (deprecated)
- New component could be named `GhostToastV2` or replace old after major version bump
- Provide migration guide in documentation
- Consider providing a compatibility layer for common use cases
