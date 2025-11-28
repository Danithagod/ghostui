# Design Document

## Overview

The SpiritInput component is a haunted text input field that provides supernatural visual feedback through animated underlines, spectral smoke effects, and error shake animations. It will be implemented as a React component using TypeScript, Framer Motion for animations, and Tailwind CSS for styling. The component will be added to the GhostUI library and documented in the docs application following existing patterns.

## Architecture

The implementation follows a three-layer architecture:

1. **Component Layer** (`packages/ghostui/src/components/SpiritInput.tsx`)
   - Core SpiritInput component with TypeScript interface
   - Manages focus state and animation triggers
   - Forwards refs and standard input props
   - Uses Framer Motion for animations

2. **Library Export Layer** (`packages/ghostui/src/components/index.ts`)
   - Exports SpiritInput for consumption by applications
   - Maintains consistent export pattern with other components

3. **Documentation Layer** (`apps/docs/app/docs/components/spirit-input/page.tsx`)
   - Interactive playground demonstrating component features
   - Code examples and props documentation
   - Usage guidelines and accessibility notes

## Components and Interfaces

### SpiritInput Component

**File:** `packages/ghostui/src/components/SpiritInput.tsx`

**Interface:**
```typescript
interface SpiritInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  ghostIcon?: boolean;
}
```

**Props:**
- `label` (required): Text label displayed above the input
- `error` (optional): Error message displayed below the input
- `ghostIcon` (optional): Boolean to show/hide ghost icon
- All standard HTML input attributes (placeholder, value, onChange, etc.)
- Supports ref forwarding to the input element

**Internal State:**
- `isFocused`: Boolean tracking focus state for animation triggers

**Key Features:**
- Uses `React.forwardRef` to expose input ref
- Uses `React.useId()` for automatic id generation when not provided
- Merges custom className with default styles using `cn` utility
- Preserves user's onFocus/onBlur handlers while adding internal logic

### Animation Specifications

**Animated Underline:**
- Initial state: `scaleX: 0, opacity: 0`
- Focused/Error state: `scaleX: 1, opacity: 1`
- Origin: center
- Duration: 0.4s
- Easing: circOut
- Colors: Purple (#A855F7) for focus, Red (#EF4444) for error
- Glow: Box shadow with matching color

**Spectral Smoke Effect:**
- Initial state: `opacity: 0, y: 10, scaleY: 0`
- Focused state: `opacity: 0.6, y: -10, scaleY: 1.5`
- Blur: 8px
- Duration: 0.8s
- Easing: easeOut
- Only visible on focus (not on error)

**Error Shake Animation:**
- Keyframes: `x: [-5, 5, -5, 5, 0]`
- Duration: 0.4s
- Triggered when error prop changes to truthy value

**Error Message Animation:**
- Entry: `opacity: 0, y: -5` → `opacity: 1, y: 0`
- Exit: `opacity: 1, y: 0` → `opacity: 0, y: -5`
- Uses AnimatePresence for mount/unmount animations

### Color System

**Label Colors:**
- Default: `text-gray-400`
- Focused: `text-[#A855F7]` (purple)
- Error: `text-red-500`

**Underline Colors:**
- Base border: `bg-gray-700` (1px height)
- Focused: `bg-[#A855F7]` with `shadow-[0_0_10px_rgba(168,85,247,0.6)]`
- Error: `bg-red-500` with `shadow-[0_0_12px_rgba(239,68,68,0.8)]`

**Ghost Icon Colors:**
- Default: `text-gray-600`
- Focused: `text-[#A855F7]`
- Error: `text-red-500`

**Input Styling:**
- Background: transparent
- Text: `text-gray-100`
- Placeholder: `text-gray-700`
- Border: none (underline only)

## Data Models

### Component Props Type

```typescript
interface SpiritInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  ghostIcon?: boolean;
}
```

### Internal State

```typescript
const [isFocused, setIsFocused] = useState<boolean>(false);
```

### Generated ID

```typescript
const inputId = id || React.useId();
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing all testable criteria, several properties can be consolidated:

- Properties 2.1-2.6 (focus/blur behavior) can be grouped into comprehensive focus state and blur state properties
- Properties 4.3-4.5 (icon colors) can be combined into a single icon color property
- Properties 3.2-3.4 (error styling) can be combined into a comprehensive error state property
- Documentation properties (6.1-7.4) are all examples verifying specific page content

The consolidated properties eliminate redundancy while maintaining complete coverage of functional requirements.

### Core Properties

**Property 1: Component renders with label and input**
*For any* label string, rendering the SpiritInput component should produce a DOM structure containing both a label element with that text and an input element.
**Validates: Requirements 1.3**

**Property 2: Standard attributes are forwarded**
*For any* valid HTML input attribute (placeholder, type, disabled, etc.), when passed to SpiritInput, that attribute should appear on the rendered input element.
**Validates: Requirements 1.4**

**Property 3: Ref forwarding works correctly**
*For any* ref object passed to SpiritInput, the ref.current should reference the underlying input DOM element after rendering.
**Validates: Requirements 1.5**

**Property 4: Focus state applies correct styling**
*For any* SpiritInput instance, when the input receives focus, the label should have purple color class, the animated underline should be visible with purple styling, and the spectral smoke effect should be rendered.
**Validates: Requirements 2.1, 2.2, 2.3**

**Property 5: Blur state removes focus styling**
*For any* focused SpiritInput instance, when the input loses focus (and has no error), the label should return to gray color, the animated underline should collapse, and the spectral smoke should fade out.
**Validates: Requirements 2.4, 2.5, 2.6**

**Property 6: Error message displays correctly**
*For any* error message string, when provided as the error prop, the message should be rendered below the input field with the error styling.
**Validates: Requirements 3.1**

**Property 7: Error state applies correct styling**
*For any* SpiritInput instance with an error prop, the label should have red color class, the underline should have red color with glow, and the shake animation should be triggered.
**Validates: Requirements 3.2, 3.3, 3.4**

**Property 8: Error message animates on appearance**
*For any* SpiritInput instance, when an error prop changes from undefined to a string value, the error message should animate in with fade and slide effects.
**Validates: Requirements 3.5**

**Property 9: Error message animates on removal**
*For any* SpiritInput instance with an error, when the error prop changes to undefined, the error message should animate out with fade effects.
**Validates: Requirements 3.6**

**Property 10: Ghost icon renders when enabled**
*For any* SpiritInput instance with ghostIcon prop set to true, a ghost icon element should be rendered on the left side of the input.
**Validates: Requirements 4.1**

**Property 11: Ghost icon adds input padding**
*For any* SpiritInput instance with ghostIcon prop set to true, the input element should have left padding class applied.
**Validates: Requirements 4.2**

**Property 12: Ghost icon color matches input state**
*For any* SpiritInput instance with ghostIcon enabled, the icon color should be purple when focused, red when error is present, and gray otherwise.
**Validates: Requirements 4.3, 4.4, 4.5**

**Property 13: Custom className is merged**
*For any* custom className string, when provided to SpiritInput, those classes should be present on the input element alongside the default classes.
**Validates: Requirements 5.1**

**Property 14: Custom id is used for accessibility**
*For any* id string provided to SpiritInput, that id should be set on the input element and the label's htmlFor attribute should reference it.
**Validates: Requirements 5.5**

**Property 15: onChange handler is invoked**
*For any* onChange handler function, when provided to SpiritInput and the input value changes, the handler should be called with the change event.
**Validates: Requirements 8.1**

**Property 16: onFocus handler is preserved**
*For any* onFocus handler function, when provided to SpiritInput and the input receives focus, the handler should be called after internal state updates.
**Validates: Requirements 8.2**

**Property 17: onBlur handler is preserved**
*For any* onBlur handler function, when provided to SpiritInput and the input loses focus, the handler should be called after internal state updates.
**Validates: Requirements 8.3**

**Property 18: Form integration works**
*For any* SpiritInput instance within a form element, the input should support form submission and its value should be included in form data.
**Validates: Requirements 8.4**

**Property 19: Placeholder text displays**
*For any* placeholder string, when provided to SpiritInput, that text should appear as the input's placeholder attribute.
**Validates: Requirements 8.5**

## Error Handling

### Invalid Props

- **Missing label**: Component requires label prop. TypeScript will enforce this at compile time.
- **Invalid error type**: Error prop should be string or undefined. TypeScript enforces this.
- **Invalid ghostIcon type**: ghostIcon should be boolean or undefined. TypeScript enforces this.

### Runtime Errors

- **Ref forwarding failures**: Component uses React.forwardRef correctly to prevent ref-related errors
- **Animation errors**: Framer Motion handles animation errors gracefully with fallbacks
- **Event handler errors**: User-provided event handlers are wrapped in try-catch implicitly by React

### Edge Cases

- **Empty label**: Component will render with empty label text (valid but not recommended)
- **Very long error messages**: Error message container will wrap text appropriately
- **Rapid focus/blur**: Framer Motion's AnimatePresence handles rapid state changes
- **No id provided**: Component generates unique id using React.useId()
- **Conflicting className**: tailwind-merge utility resolves conflicting Tailwind classes

## Testing Strategy

### Unit Testing

The component will use Vitest and React Testing Library for unit tests. Tests will cover:

**Basic Rendering:**
- Component renders with required props
- Label text is displayed correctly
- Input element is present in DOM

**Prop Forwarding:**
- Standard HTML attributes are forwarded
- Ref forwarding works correctly
- Custom className is applied

**Interaction:**
- Focus and blur events trigger state changes
- User-provided event handlers are called
- Form integration works correctly

**Edge Cases:**
- Component handles missing optional props
- Generated id is unique across instances
- Error state overrides focus state styling

### Property-Based Testing

The component will use fast-check (a JavaScript property-based testing library) for property tests. The testing strategy will:

- Generate random strings for labels, errors, placeholders, and ids
- Generate random boolean values for ghostIcon prop
- Generate random event handler functions
- Verify properties hold across all generated inputs
- Run minimum 100 iterations per property test

**Property Test Configuration:**
```typescript
import fc from 'fast-check';
import { render, screen } from '@testing-library/react';

// Example property test structure
fc.assert(
  fc.property(
    fc.string(), // random label
    fc.option(fc.string(), { nil: undefined }), // random error or undefined
    (label, error) => {
      // Test property holds for all inputs
    }
  ),
  { numRuns: 100 }
);
```

**Generators:**
- `fc.string()`: Random strings for text props
- `fc.boolean()`: Random boolean for ghostIcon
- `fc.option(fc.string(), { nil: undefined })`: Optional string props
- `fc.func()`: Random functions for event handlers
- `fc.constantFrom()`: Random selection from valid values

Each property-based test will be tagged with a comment referencing the design document property:
```typescript
// Feature: spirit-input-implementation, Property 1: Component renders with label and input
```

### Integration Testing

Integration tests will verify:
- Component works within the GhostUI package exports
- Documentation page renders correctly
- Component integrates with forms
- Animations perform smoothly in real browser environment

## Implementation Notes

### Dependencies

- **React**: ^18.0.0 || ^19.0.0 (peer dependency)
- **Framer Motion**: ^12.23.24 (for animations)
- **Lucide React**: ^0.554.0 (for Ghost icon)
- **clsx & tailwind-merge**: For className utilities (via cn helper)

### File Structure

```
packages/ghostui/src/
├── components/
│   ├── SpiritInput.tsx          # Main component
│   ├── SpiritInput.test.tsx     # Unit tests
│   ├── SpiritInput.property.test.tsx  # Property-based tests
│   └── index.ts                 # Export barrel
├── lib/
│   └── utils.ts                 # cn utility (already exists)
└── types/
    └── index.ts                 # Type exports

apps/docs/app/docs/components/
└── spirit-input/
    └── page.tsx                 # Documentation page
```

### Styling Approach

- Use Tailwind CSS utility classes for all styling
- Use inline style prop only for dynamic blur filter on smoke effect
- Leverage existing GhostUI color tokens where possible
- Use explicit hex colors (#A855F7) for purple to match design spec
- Ensure all animations respect prefers-reduced-motion

### Accessibility Considerations

- Label is properly associated with input via htmlFor/id
- Input receives all standard ARIA attributes through prop forwarding
- Error messages should be announced to screen readers (consider aria-live)
- Focus states are clearly visible
- Keyboard navigation works without mouse
- Color is not the only indicator of state (animations and text provide additional cues)

### Performance Considerations

- Use React.memo if component re-renders unnecessarily
- Framer Motion's AnimatePresence only renders when needed
- Animations use GPU-accelerated properties (transform, opacity)
- No expensive calculations in render path
- Event handlers are stable (don't create new functions on each render)

## Documentation Structure

The documentation page will follow the established pattern from other GhostUI components:

1. **Title and Description**: Component name and brief overview
2. **Basic Example**: Simple usage with ComponentPlayground
3. **Props Table**: Complete prop documentation using PropsTable component
4. **Focus States**: Demonstration of focus animations and spectral smoke
5. **Error States**: Demonstration of error validation and shake animation
6. **Ghost Icon**: Examples with and without the ghost icon
7. **Custom Styling**: Examples of className customization
8. **Form Integration**: Example of component in a form context
9. **Accessibility**: Notes on keyboard navigation and screen reader support
10. **Usage Notes**: Best practices and tips

Each section will include:
- Visual preview in ComponentPlayground
- Syntax-highlighted code example
- Explanatory text

## Build and Distribution

- Component will be built with Vite
- TypeScript definitions will be generated automatically
- Component will be included in the main package export
- CSS will be bundled in the distributed styles.css
- No breaking changes to existing exports
