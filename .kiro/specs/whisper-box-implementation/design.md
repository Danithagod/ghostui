# Design Document

## Overview

The WhisperBox component is a haunted textarea field with dynamic energy-based visual effects that respond to typing intensity. It features SVG filter-based ectoplasm border distortion, floating runic symbols, whisper glow effects, and a spirit status indicator. The component will be implemented as a React component using TypeScript, Framer Motion for animations, and Tailwind CSS for styling. It will be added to the GhostUI library and documented in the docs application following existing patterns.

## Architecture

The implementation follows a three-layer architecture:

1. **Component Layer** (`packages/ghostui/src/components/WhisperBox.tsx`)
   - Core WhisperBox component with TypeScript interface
   - Manages focus state, text state, and energy system
   - Forwards refs and standard textarea props
   - Uses Framer Motion for rune animations
   - Implements SVG filter for ectoplasm distortion

2. **Library Export Layer** (`packages/ghostui/src/components/index.ts`)
   - Exports WhisperBox for consumption by applications
   - Maintains consistent export pattern with other components

3. **Documentation Layer** (`apps/docs/app/docs/components/whisper-box/page.tsx`)
   - Interactive playground demonstrating component features
   - Code examples and props documentation
   - Usage guidelines and energy system explanation

## Components and Interfaces

### WhisperBox Component

**File:** `packages/ghostui/src/components/WhisperBox.tsx`

**Interface:**
```typescript
interface WhisperBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}
```

**Props:**
- `label` (optional): Text label displayed above/inside the textarea (default: "Invoke the Spirits")
- `className` (optional): Additional CSS classes for custom styling
- All standard HTML textarea attributes (placeholder, value, onChange, rows, etc.)
- Supports ref forwarding to the textarea element

**Internal State:**
- `text`: String tracking the current textarea value
- `isFocused`: Boolean tracking focus state for animation triggers
- `energy`: Number (0-100) tracking typing intensity for visual effects
- `lastTypeTime`: Ref tracking the timestamp of last keystroke

**Constants:**
- `RUNES`: Array of runic symbols ["᚛", "᚜", "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚩ", "ᚳ", "ᚷ", "ᚹ", "ᚻ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛝ", "ᛟ", "ᛞ"]

**Key Features:**
- Uses `React.forwardRef` to expose textarea ref
- Energy system with automatic decay via useEffect interval
- Dynamic SVG filter with animated turbulence
- Conditional rendering of floating runes based on energy threshold
- Status indicator that changes based on energy level

### Energy System

The energy system is the core mechanic that drives the visual intensity of the component:

**Energy Increase:**
- Triggered on every keystroke in handleChange
- Adds 15 points per keystroke
- Capped at maximum of 100
- Formula: `setEnergy((prev) => Math.min(100, prev + 15))`

**Energy Decay:**
- Runs on 100ms interval via useEffect
- Decreases by 5 points per tick
- Stops at minimum of 0
- Formula: `setEnergy((prev) => Math.max(0, prev - 5))`

**Energy Effects:**
- `glowOpacity`: `Math.min(energy / 100, 0.8)` - Controls whisper glow intensity (max 0.8)
- `distortionScale`: `20 + (energy / 2)` - Controls SVG turbulence displacement (20-70 range)
- Rune visibility: Runes appear when `energy > 10`
- Status icon: Sparkles appear when `energy > 50`

### Animation Specifications

**Floating Runes:**
- Quantity: 6 runes when energy > 10
- Initial state: `opacity: 0, scale: 0.8`
- Animate state: `opacity: (Math.random() * 0.5) + (energy/200), scale: 1, x: random(-10, 10), y: random(-10, 10)`
- Exit state: `opacity: 0, scale: 1.2`
- Duration: 2s
- Easing: easeInOut
- Position: Random within 10-90% width, 10-90% height
- Rotation: Random 0-360 degrees
- Font: Cinzel (runic font)
- Color: `text-purple-300/20`
- Size: `text-4xl`

**Label Animation:**
- Default position: `left-4 top-4`
- Focused/Has text: `-translate-y-7` (moves up 1.75rem)
- Default size: `text-xs`
- Focused/Has text: `text-[10px]`
- Default color: `text-purple-200/50`
- Focused/Has text: `text-purple-400`
- Duration: 300ms
- Font: Cinzel with `tracking-widest` and `uppercase`

**Ectoplasm Border:**
- Element: Absolute positioned div with -inset-1 (extends 4px beyond textarea)
- Background: `bg-purple-900/30`
- Filter: `url(#ectoplasm-distortion)`
- Opacity when focused: `0.6 + (glowOpacity/2)`
- Opacity when unfocused: 0
- Transition: 300ms

**Whisper Glow:**
- Element: Absolute positioned div with inset-0
- Background: `bg-purple-500/10`
- Blur: `blur-xl`
- Opacity: Dynamic based on energy (`glowOpacity`)
- Transition: 100ms

**Status Indicator:**
- Position: `absolute bottom-4 right-4 z-20`
- Transition: 500ms
- High energy (>50): Sparkles icon with `animate-spin`, `text-purple-400`
- Focused: Ghost icon, `text-purple-700`
- Unfocused: Ghost icon, `text-purple-900/40`
- Size: `w-5 h-5`

**Box Shadow (Dynamic):**
- Focused: `0 0 ${20 + energy}px rgba(168, 85, 247, ${0.1 + (energy/500)})`
- Unfocused: none
- Intensity increases with energy (20-120px spread, 0.1-0.3 opacity)

### SVG Filter Specifications

**Filter ID:** `ectoplasm-distortion`

**Filter Structure:**
```xml
<filter id="ectoplasm-distortion">
  <feTurbulence 
    type="fractalNoise" 
    baseFrequency="0.01 0.04" 
    numOctaves="3" 
    result="noise"
  >
    <animate 
      attributeName="baseFrequency" 
      dur="15s" 
      values="0.01 0.04; 0.02 0.06; 0.01 0.04" 
      repeatCount="indefinite" 
    />
  </feTurbulence>
  <feDisplacementMap 
    in="SourceGraphic" 
    in2="noise" 
    scale={distortionScale}
  />
</filter>
```

**Parameters:**
- `type`: fractalNoise (creates organic, turbulent patterns)
- `baseFrequency`: Animates between 0.01/0.04 and 0.02/0.06 over 15 seconds
- `numOctaves`: 3 (controls detail level)
- `scale`: Dynamic 20-70 based on energy (controls displacement intensity)

### Color System

**Background Colors:**
- Textarea: `bg-[#0a0510]/80` with `backdrop-blur-sm`
- Ectoplasm border: `bg-purple-900/30`
- Whisper glow: `bg-purple-500/10`

**Text Colors:**
- Input text: `text-purple-100`
- Placeholder: `text-purple-900/50`
- Label (default): `text-purple-200/50`
- Label (focused): `text-purple-400`
- Runes: `text-purple-300/20`
- Status icon (high energy): `text-purple-400`
- Status icon (focused): `text-purple-700`
- Status icon (unfocused): `text-purple-900/40`

**Border Colors:**
- Main border: `border-purple-500/20`
- Focused border: `border-purple-500/50`
- Corner accents: `border-purple-500/40`

**Selection:**
- Background: `selection:bg-purple-500/30`
- Text: `selection:text-white`

### Typography

**Textarea:**
- Font: `font-serif`
- Size: `text-lg`
- Line height: `leading-relaxed`
- Additional: `ghost-text` class (custom text-shadow)

**Label:**
- Font: `font-rune` (Cinzel)
- Transform: `uppercase`
- Tracking: `tracking-widest`

**Runes:**
- Font: `font-rune` (Cinzel)
- Size: `text-4xl`
- User select: none

## Data Models

### Component Props Type

```typescript
interface WhisperBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}
```

### Internal State

```typescript
const [text, setText] = useState<string>("");
const [isFocused, setIsFocused] = useState<boolean>(false);
const [energy, setEnergy] = useState<number>(0); // 0-100
const lastTypeTime = useRef<number>(Date.now());
const containerRef = useRef<HTMLDivElement>(null);
```

### Constants

```typescript
const RUNES: string[] = [
  "᚛", "᚜", "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚩ", "ᚳ", "ᚷ", "ᚹ", 
  "ᚻ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", 
  "ᛖ", "ᛗ", "ᛚ", "ᛝ", "ᛟ", "ᛞ"
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing all testable criteria, several properties can be consolidated:

- Properties 3.1, 3.2, 3.3 (focus effects) can be combined into a comprehensive focus state property
- Properties 3.4, 3.5 (blur effects) can be combined into a comprehensive blur state property
- Properties 5.1, 5.2, 5.3 (status indicator states) can be combined into a single status indicator property
- Properties 2.3, 2.4 (energy visual effects) are related but test different aspects, so both are valuable
- Properties 12.1, 12.2, 12.3, 12.4 (label animation) can be combined into comprehensive label state properties
- Many "example" tests verify static styling and can be grouped into fewer comprehensive tests

The consolidated properties eliminate redundancy while maintaining complete coverage of functional requirements.

### Core Properties

**Property 1: Component renders with label and textarea**
*For any* label string (or default), rendering the WhisperBox component should produce a DOM structure containing both a label element with that text and a textarea element.
**Validates: Requirements 1.3**

**Property 2: Standard textarea attributes are forwarded**
*For any* valid HTML textarea attribute (placeholder, rows, disabled, etc.), when passed to WhisperBox, that attribute should appear on the rendered textarea element.
**Validates: Requirements 1.4**

**Property 3: Ref forwarding works correctly**
*For any* ref object passed to WhisperBox, the ref.current should reference the underlying textarea DOM element after rendering.
**Validates: Requirements 1.5**

**Property 4: Energy increases with typing**
*For any* WhisperBox instance, when a keystroke occurs, the energy value should increase by 15 points (capped at 100).
**Validates: Requirements 2.1**

**Property 5: Energy decays over time**
*For any* WhisperBox instance with energy > 0, after 100 milliseconds of no typing, the energy should decrease by 5 points (floored at 0).
**Validates: Requirements 2.2**

**Property 6: Glow opacity scales with energy**
*For any* energy value between 0 and 100, the whisper glow opacity should equal min(energy / 100, 0.8).
**Validates: Requirements 2.3**

**Property 7: Distortion scale increases with energy**
*For any* energy value between 0 and 100, the SVG turbulence displacement scale should equal 20 + (energy / 2).
**Validates: Requirements 2.4, 6.3**

**Property 8: Runes appear above energy threshold**
*For any* WhisperBox instance, when energy exceeds 10, exactly 6 floating runic symbols should be rendered; when energy is 10 or below, no runes should be rendered.
**Validates: Requirements 2.5, 4.1**

**Property 9: Focus state applies correct effects**
*For any* WhisperBox instance, when the textarea receives focus, the ectoplasm border should be visible, the label should have purple color and upward transform, and the box shadow should be applied.
**Validates: Requirements 3.1, 3.2, 3.3, 6.4**

**Property 10: Blur state removes focus effects**
*For any* focused WhisperBox instance, when the textarea loses focus, the ectoplasm border opacity should become 0, and if the textarea is empty, the label should return to its original position.
**Validates: Requirements 3.4, 3.5**

**Property 11: Rune positions are within bounds**
*For any* visible runic symbol, its position should be within 10-90% of the container width and 10-90% of the container height.
**Validates: Requirements 4.5**

**Property 12: Rune rotations are applied**
*For any* visible runic symbol, it should have a rotation transform applied (0-360 degrees).
**Validates: Requirements 4.3**

**Property 13: Status indicator reflects energy level**
*For any* WhisperBox instance, when energy > 50, a Sparkles icon should be displayed; when energy ≤ 50 and focused, a Ghost icon in dark purple should be displayed; when energy ≤ 50 and unfocused, a Ghost icon in very dark purple with low opacity should be displayed.
**Validates: Requirements 5.1, 5.2, 5.3**

**Property 14: Custom className is merged**
*For any* custom className string, when provided to WhisperBox, those classes should be present on the textarea element alongside the default classes.
**Validates: Requirements 7.1**

**Property 15: Custom label is displayed**
*For any* label string provided via props, that label should be displayed instead of the default "Invoke the Spirits".
**Validates: Requirements 7.2**

**Property 16: onChange handler is invoked**
*For any* onChange handler function, when provided to WhisperBox and the textarea value changes, the handler should be called with the change event.
**Validates: Requirements 10.1**

**Property 17: onFocus handler is preserved**
*For any* onFocus handler function, when provided to WhisperBox and the textarea receives focus, the handler should be called after internal state updates.
**Validates: Requirements 10.2**

**Property 18: onBlur handler is preserved**
*For any* onBlur handler function, when provided to WhisperBox and the textarea loses focus, the handler should be called after internal state updates.
**Validates: Requirements 10.3**

**Property 19: Form integration works**
*For any* WhisperBox instance within a form element, the textarea should support form submission and its value should be included in form data.
**Validates: Requirements 10.4**

**Property 20: Placeholder text displays**
*For any* placeholder string, when provided to WhisperBox, that text should appear as the textarea's placeholder attribute.
**Validates: Requirements 10.5**

**Property 21: Label animates based on state**
*For any* WhisperBox instance, when empty and unfocused, the label should be positioned inside the textarea; when focused or containing text, the label should be translated upward with smaller font size and purple color.
**Validates: Requirements 12.1, 12.2, 12.3, 12.4**

## Error Handling

### Invalid Props

- **Invalid label type**: Label prop should be string or undefined. TypeScript will enforce this at compile time.
- **Invalid className type**: className should be string or undefined. TypeScript enforces this.
- **Invalid textarea attributes**: Standard HTML validation applies to forwarded attributes.

### Runtime Errors

- **Ref forwarding failures**: Component uses React.forwardRef correctly to prevent ref-related errors
- **Animation errors**: Framer Motion handles animation errors gracefully with fallbacks
- **Event handler errors**: User-provided event handlers are wrapped in try-catch implicitly by React
- **Energy calculation errors**: Energy is clamped with Math.min/Math.max to prevent invalid values
- **Interval cleanup**: useEffect properly cleans up the energy decay interval on unmount

### Edge Cases

- **Rapid typing**: Energy increase is capped at 100, preventing overflow
- **Energy decay during typing**: New keystrokes reset the decay, energy can increase while decay is active
- **Very long text**: Textarea supports resize-y and will scroll naturally
- **Empty label**: Component will render with empty label text (valid but not recommended)
- **Rapid focus/blur**: Framer Motion's AnimatePresence handles rapid state changes
- **SVG filter not supported**: Border will still be visible without distortion effect (graceful degradation)
- **Conflicting className**: tailwind-merge utility resolves conflicting Tailwind classes

## Testing Strategy

### Unit Testing

The component will use Vitest and React Testing Library for unit tests. Tests will cover:

**Basic Rendering:**
- Component renders with default and custom labels
- Textarea element is present in DOM
- SVG filter is defined
- Corner accents are rendered
- Status indicator is present

**Prop Forwarding:**
- Standard HTML textarea attributes are forwarded
- Ref forwarding works correctly
- Custom className is applied
- Placeholder text is displayed

**Energy System:**
- Energy increases on typing
- Energy decreases over time
- Energy is capped at 0 and 100
- Visual effects scale with energy

**Interaction:**
- Focus and blur events trigger state changes
- User-provided event handlers are called
- Text changes update internal state
- Form integration works correctly

**Visual Effects:**
- Runes appear when energy > 10
- Runes disappear when energy ≤ 10
- Status indicator changes based on energy
- Label animates on focus/blur
- Ectoplasm border appears on focus

**Edge Cases:**
- Component handles missing optional props
- Rapid typing doesn't break energy system
- Interval cleanup prevents memory leaks
- SVG filter degrades gracefully if not supported

### Property-Based Testing

The component will use fast-check (a JavaScript property-based testing library) for property tests. The testing strategy will:

- Generate random strings for labels, placeholders, and text content
- Generate random numbers for energy values (0-100)
- Generate random event handler functions
- Generate random textarea attributes
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
    fc.option(fc.string(), { nil: undefined }), // random placeholder
    (label, placeholder) => {
      // Test property holds for all inputs
    }
  ),
  { numRuns: 100 }
);
```

**Generators:**
- `fc.string()`: Random strings for text props
- `fc.integer({ min: 0, max: 100 })`: Random energy values
- `fc.option(fc.string(), { nil: undefined })`: Optional string props
- `fc.func()`: Random functions for event handlers
- `fc.record()`: Random objects for textarea attributes
- `fc.constantFrom(RUNES)`: Random rune selection

Each property-based test will be tagged with a comment referencing the design document property:
```typescript
// Feature: whisper-box-implementation, Property 1: Component renders with label and textarea
```

### Integration Testing

Integration tests will verify:
- Component works within the GhostUI package exports
- Documentation page renders correctly
- Component integrates with forms
- Animations perform smoothly in real browser environment
- Energy system works correctly over time
- SVG filters render properly in different browsers

## Implementation Notes

### Dependencies

- **React**: ^18.0.0 || ^19.0.0 (peer dependency)
- **Framer Motion**: ^12.23.24 (for rune animations)
- **Lucide React**: ^0.554.0 (for Ghost and Sparkles icons)
- **clsx & tailwind-merge**: For className utilities (via cn helper)

### File Structure

```
packages/ghostui/src/
├── components/
│   ├── WhisperBox.tsx          # Main component
│   ├── WhisperBox.test.tsx     # Unit tests
│   ├── WhisperBox.property.test.tsx  # Property-based tests
│   └── index.ts                 # Export barrel
├── lib/
│   └── utils.ts                 # cn utility (already exists)
└── types/
    └── index.ts                 # Type exports

apps/docs/app/docs/components/
└── whisper-box/
    └── page.tsx                 # Documentation page
```

### Styling Approach

- Use Tailwind CSS utility classes for all styling
- Use inline style prop for dynamic box shadow and SVG filter opacity
- Embed custom CSS for ghost-text effect and font imports in a style tag
- Use explicit hex colors (#0a0510, #A855F7) to match design spec
- Ensure all animations respect prefers-reduced-motion
- Use CSS variables for dynamic values where appropriate

### Custom Styles

The component includes embedded styles for:

**Font Imports:**
```css
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap');
```

**Ghost Text Effect:**
```css
.ghost-text {
  text-shadow: 0 0 8px rgba(168, 85, 247, 0.4), 2px 2px 0px rgba(0,0,0,0.5);
  caret-color: #d8b4fe;
}
```

**Rune Font:**
```css
.font-rune {
  font-family: 'Cinzel', serif;
  user-select: none;
}
```

### Energy System Implementation

The energy system is implemented with two key mechanisms:

**1. Energy Increase (handleChange):**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setText(e.target.value);
  setEnergy((prev) => Math.min(100, prev + 15));
  lastTypeTime.current = Date.now();
  props.onChange?.(e);
};
```

**2. Energy Decay (useEffect):**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setEnergy((prev) => Math.max(0, prev - 5));
  }, 100);
  return () => clearInterval(interval);
}, []);
```

### SVG Filter Implementation

The SVG filter is defined inline and referenced via CSS:

```typescript
<svg className="absolute w-0 h-0 pointer-events-none">
  <defs>
    <filter id="ectoplasm-distortion">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.01 0.04" 
        numOctaves="3" 
        result="noise"
      >
        <animate 
          attributeName="baseFrequency" 
          dur="15s" 
          values="0.01 0.04; 0.02 0.06; 0.01 0.04" 
          repeatCount="indefinite" 
        />
      </feTurbulence>
      <feDisplacementMap 
        in="SourceGraphic" 
        in2="noise" 
        scale={distortionScale}
      />
    </filter>
  </defs>
</svg>
```

Applied via inline style:
```typescript
style={{ filter: "url(#ectoplasm-distortion)" }}
```

### Accessibility Considerations

- Label is properly associated with textarea via htmlFor/id (if needed)
- Textarea receives all standard ARIA attributes through prop forwarding
- Focus states are clearly visible through multiple indicators
- Keyboard navigation works without mouse
- Color is not the only indicator of state (animations and icons provide additional cues)
- Consider adding aria-label for status indicator icons
- Runes are decorative and have user-select: none
- Energy system is purely visual and doesn't affect functionality

### Performance Considerations

- Energy decay interval runs every 100ms - acceptable for visual effects
- Rune animations use GPU-accelerated properties (transform, opacity)
- SVG filter may be expensive on low-end devices - consider performance testing
- Use React.memo if component re-renders unnecessarily
- Framer Motion's AnimatePresence only renders runes when needed
- No expensive calculations in render path
- Event handlers are stable (don't create new functions on each render)
- Interval cleanup prevents memory leaks

### Browser Compatibility

- SVG filters are supported in all modern browsers
- Fallback: Border will be visible without distortion if filters not supported
- Framer Motion handles browser differences automatically
- CSS backdrop-filter requires vendor prefixes (handled by Tailwind)
- Custom fonts load asynchronously with fallbacks

## Documentation Structure

The documentation page will follow the established pattern from other GhostUI components:

1. **Title and Description**: Component name and brief overview of the energy system
2. **Basic Example**: Simple usage with ComponentPlayground
3. **Props Table**: Complete prop documentation using PropsTable component
4. **Energy System**: Detailed explanation of how typing affects visual effects
5. **Focus States**: Demonstration of focus animations and ectoplasm border
6. **Floating Runes**: Demonstration of runes appearing at high energy levels
7. **Status Indicator**: Explanation of Ghost vs Sparkles icon states
8. **Custom Styling**: Examples of className customization
9. **Form Integration**: Example of component in a form context
10. **Accessibility**: Notes on keyboard navigation and screen reader support
11. **Usage Notes**: Best practices, performance tips, and browser compatibility

Each section will include:
- Visual preview in ComponentPlayground
- Syntax-highlighted code example
- Explanatory text about the feature
- Tips for optimal usage

### Documentation Examples

**Basic Usage:**
```typescript
import { WhisperBox } from 'ghostui-react';

export default function Example() {
  return <WhisperBox placeholder="The void listens..." />;
}
```

**Custom Label:**
```typescript
<WhisperBox 
  label="Share Your Secrets" 
  placeholder="Type here..."
/>
```

**Form Integration:**
```typescript
const [message, setMessage] = useState('');

<form onSubmit={handleSubmit}>
  <WhisperBox
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Enter your message..."
  />
  <button type="submit">Send</button>
</form>
```

**Custom Styling:**
```typescript
<WhisperBox 
  className="w-full min-h-[300px] text-xl"
  placeholder="Larger textarea..."
/>
```

## Build and Distribution

- Component will be built with Vite
- TypeScript definitions will be generated automatically
- Component will be included in the main package export
- Custom CSS will be embedded in the component (not in global styles)
- Fonts will be loaded via Google Fonts CDN
- No breaking changes to existing exports
- SVG filters are inline and don't require external assets

## Future Enhancements

Potential future improvements (not in scope for initial implementation):

- Configurable energy increase/decay rates
- Custom rune sets via props
- Configurable energy thresholds for effects
- Alternative status indicator icons
- Configurable SVG filter intensity
- Dark/light theme variants
- Reduced motion mode with simplified effects
- Custom color schemes via CSS variables
- Sound effects for high energy states
- Particle effects beyond runes
