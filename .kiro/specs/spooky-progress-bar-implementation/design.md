# Design Document: SpookyProgressBar Component

## Overview

The SpookyProgressBar is an animated progress indicator component that displays completion percentage with three distinct thematic variants: blood, candle, and soul. The component leverages SVG filters for 3D goo morphing effects, Framer Motion for smooth animations, and Tailwind CSS for styling. It will be integrated into the GhostUI component library following established patterns and conventions.

The component features:
- Three visual variants with unique animations (blood with dripping, candle with wax drips, soul with floating particles)
- Smooth spring-based progress animations
- 3D goo effects using SVG filters with specular lighting
- Completion celebration effects at 100%
- Accessible labeling with icons and percentage display
- Full TypeScript support with proper type definitions

## Architecture

### Component Structure

```
SpookyProgressBar (Main Component)
├── Label Header (Icon + Variant Name + Percentage)
├── SVG Filter Definitions (Conditional - blood/candle only)
├── Progress Bar Container
│   ├── Background Track
│   ├── Animated Fill (with filter applied)
│   │   ├── Soul Variant Effects (particles, noise, glow)
│   │   └── Drip Effects (blood/candle variants)
│   └── Completion Burst Effect (AnimatePresence)
```

### Technology Stack

- **React**: Component framework (client-side rendering with 'use client' directive)
- **TypeScript**: Type safety and developer experience
- **Framer Motion**: Animation library for smooth transitions and effects
- **Tailwind CSS**: Utility-first styling
- **clsx + tailwind-merge**: Class name composition via cn utility
- **lucide-react**: Icon library (Skull, Flame, Ghost icons)

### File Organization

```
packages/ghostui/src/
├── components/
│   ├── SpookyProgressBar.tsx          # Main component implementation
│   └── index.ts                        # Updated to export SpookyProgressBar
├── lib/
│   └── utils.ts                        # Existing cn utility (reused)
└── index.ts                            # Main package export (updated)

apps/docs/app/docs/components/
└── spooky-progress-bar/
    └── page.tsx                        # Documentation page
```

## Components and Interfaces

### SpookyProgressBar Component

**File**: `packages/ghostui/src/components/SpookyProgressBar.tsx`

#### TypeScript Interface

```typescript
interface SpookyProgressBarProps {
  value: number;                              // Progress value 0-100
  variant?: 'blood' | 'candle' | 'soul';     // Visual theme
  className?: string;                         // Additional Tailwind classes
}
```

#### Props Details

- **value** (required): Number between 0-100 representing completion percentage. Values outside this range are clamped.
- **variant** (optional): Determines the visual theme and animation style. Defaults to 'blood'.
- **className** (optional): Additional CSS classes merged with component defaults using cn utility.

### Variant Configuration

Each variant has a configuration object defining:

```typescript
interface VariantConfig {
  container: string;    // Background track styling
  fill: string;         // Progress fill color
  glow: string;         // Shadow/glow effect
  filterId: string;     // SVG filter ID (or 'none')
  dripColor: string;    // Drip element color
  icon: React.ReactNode; // Lucide icon component
}
```

**Variant Specifications**:

1. **Blood Variant**
   - Dark red viscous appearance (#8a1c1c)
   - Red glow effect with 15px blur
   - Goo filter with ID 'goo-3d-blood'
   - Animated dripping effects
   - Skull icon

2. **Candle Variant**
   - Pale wax color (#ffedd5)
   - Orange glow effect with 15px blur
   - Goo filter with ID 'goo-3d-candle'
   - Animated wax drips
   - Flame icon

3. **Soul Variant**
   - Indigo color (#4f46e5)
   - Bright indigo glow with 20px blur
   - No goo filter (clean edges)
   - Floating particle effects
   - Ghost icon

## Data Models

### Internal State

The component maintains minimal internal state:

```typescript
const progress = Math.min(100, Math.max(0, value)); // Clamped value
const isComplete = progress === 100;                 // Completion flag
const theme = configs[variant];                      // Selected variant config
const useGoo = variant !== 'soul';                   // Filter application flag
```

### Animation Configuration

**Spring Physics** (Framer Motion):
```typescript
{
  type: "spring",
  stiffness: 50,
  damping: 15
}
```

**Drip Animation** (blood/candle):
```typescript
{
  height: [10, 25, 10],  // Oscillating drip length
  duration: 2-3,
  repeat: Infinity,
  ease: "easeInOut"
}
```

**Particle Animation** (soul):
```typescript
{
  left: ["0%", "100%"],
  opacity: [0, 1, 0],
  duration: 2 + index,
  repeat: Infinity,
  ease: "linear"
}
```

**Completion Burst**:
```typescript
{
  opacity: [0, 1, 0],
  scale: 1.2,
  duration: 1,
  repeat: Infinity
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Value Clamping
*For any* numeric value provided to the component, the rendered progress width should never exceed 100% or fall below 0%, regardless of the input value.
**Validates: Requirements 1.3**

### Property 2: Variant Rendering Consistency
*For any* variant selection ('blood', 'candle', 'soul'), the component should render with the correct color scheme, icon, and animation effects specific to that variant.
**Validates: Requirements 2.1, 2.2, 2.3**

### Property 3: Filter Application Correctness
*For any* variant that uses goo effects (blood, candle), the SVG filter should be present in the DOM and applied to the fill element; for the soul variant, no goo filter should be applied.
**Validates: Requirements 2.4, 9.1, 9.2, 9.3**

### Property 4: Animation Trigger on Value Change
*For any* change in the value prop, the progress bar fill width should animate smoothly to the new percentage using spring physics.
**Validates: Requirements 3.1**

### Property 5: Completion Effect Visibility
*For any* progress value, the completion burst effect should be visible if and only if the value equals 100.
**Validates: Requirements 3.2**

### Property 6: Continuous Animation Presence
*For any* blood or candle variant, drip animations should continuously run regardless of progress value; for soul variant, particle animations should continuously run.
**Validates: Requirements 3.3, 3.4**

### Property 7: Export Availability
*For any* import statement from 'ghostui-react', the SpookyProgressBar component should be available as a named export with proper TypeScript types.
**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 8: Class Name Composition
*For any* className prop provided, the component should merge it with default classes without overriding essential styling.
**Validates: Requirements 1.5**

### Property 9: Label Display Accuracy
*For any* progress value and variant, the displayed percentage text should match the clamped progress value, and the icon should match the variant type.
**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

### Property 10: Unique Filter IDs
*For any* multiple instances of blood or candle variants rendered on the same page, each should have a unique SVG filter ID to prevent visual conflicts.
**Validates: Requirements 9.5**

## Error Handling

### Input Validation

1. **Value Clamping**: Values outside 0-100 range are automatically clamped using `Math.min(100, Math.max(0, value))`. No errors are thrown.

2. **Variant Fallback**: If an invalid variant is provided, TypeScript will catch it at compile time. At runtime, the component defaults to 'blood' variant.

3. **Missing Props**: The `value` prop is required. TypeScript enforces this at compile time.

### Edge Cases

1. **Negative Values**: Clamped to 0
2. **Values > 100**: Clamped to 100
3. **NaN or undefined**: Component should handle gracefully by treating as 0
4. **Rapid Value Changes**: Spring animation naturally handles this with smooth transitions
5. **Multiple Instances**: Unique filter IDs prevent SVG filter conflicts

### Performance Considerations

1. **Animation Performance**: All animations use CSS transforms and opacity for GPU acceleration
2. **Filter Performance**: SVG filters are computationally expensive; soul variant avoids them for better performance
3. **Re-render Optimization**: Component is functional with no unnecessary state, minimizing re-renders
4. **Motion Reduction**: Animations respect `prefers-reduced-motion` via Framer Motion's built-in support

## Testing Strategy

### Unit Testing

The component will include unit tests covering:

1. **Rendering Tests**
   - Component renders without crashing
   - Correct variant styling is applied
   - Icons match variants
   - Percentage display is accurate

2. **Value Clamping Tests**
   - Values below 0 are clamped to 0
   - Values above 100 are clamped to 100
   - Valid values render correctly

3. **Variant Tests**
   - Each variant renders with correct colors
   - Goo filters are present for blood/candle
   - No goo filter for soul variant
   - Correct icons are displayed

4. **Completion Tests**
   - Completion effect appears at 100%
   - Completion effect is hidden below 100%

5. **Class Name Composition**
   - Custom className is applied
   - Default classes are preserved

### Property-Based Testing

The testing strategy will use **fast-check** (JavaScript/TypeScript property-based testing library) to verify correctness properties. Each property-based test will run a minimum of 100 iterations.

**Property-Based Tests**:

1. **Property 1: Value Clamping**
   - Generate random numbers (including negatives, > 100, decimals)
   - Verify rendered width is always between 0-100%
   - **Feature: spooky-progress-bar-implementation, Property 1: Value Clamping**

2. **Property 2: Variant Rendering Consistency**
   - Generate random variant selections
   - Verify correct theme configuration is applied
   - **Feature: spooky-progress-bar-implementation, Property 2: Variant Rendering Consistency**

3. **Property 3: Filter Application Correctness**
   - Generate random variants
   - Verify filter presence/absence matches variant type
   - **Feature: spooky-progress-bar-implementation, Property 3: Filter Application Correctness**

4. **Property 7: Export Availability**
   - Verify component is exported from all required entry points
   - Verify TypeScript types are available
   - **Feature: spooky-progress-bar-implementation, Property 7: Export Availability**

5. **Property 8: Class Name Composition**
   - Generate random className strings
   - Verify they are merged without breaking core functionality
   - **Feature: spooky-progress-bar-implementation, Property 8: Class Name Composition**

6. **Property 9: Label Display Accuracy**
   - Generate random values and variants
   - Verify percentage text matches clamped value
   - Verify icon matches variant
   - **Feature: spooky-progress-bar-implementation, Property 9: Label Display Accuracy**

### Integration Testing

1. **Documentation Page Rendering**
   - Verify docs page renders without errors
   - Verify all examples display correctly
   - Verify interactive demo functions properly

2. **Package Export Testing**
   - Verify component can be imported from 'ghostui-react'
   - Verify TypeScript types are correctly exported

### Manual Testing Checklist

1. Visual inspection of all three variants
2. Smooth animation when adjusting slider
3. Completion effect triggers at 100%
4. Drip animations run continuously
5. Soul particles animate correctly
6. Responsive behavior at different widths
7. Accessibility: keyboard navigation, screen reader compatibility

## Implementation Notes

### SVG Filter Details

The 3D goo effect is achieved through a multi-step SVG filter pipeline:

1. **feGaussianBlur**: Creates soft edges (stdDeviation="4")
2. **feColorMatrix**: Increases contrast to create blob shapes (alpha channel manipulation)
3. **feGaussianBlur** (second pass): Smooths for height map (stdDeviation="2")
4. **feSpecularLighting**: Adds 3D highlights with point light source
5. **feComposite**: Masks highlight to goo shape
6. **feComposite** (final): Layers highlight over solid color

### Animation Timing

- **Progress Fill**: Spring animation (stiffness: 50, damping: 15)
- **Drips**: 2-3 second infinite loops with easeInOut
- **Particles**: 2-5 second infinite loops with linear easing
- **Completion Burst**: 1 second infinite pulse

### Styling Approach

- Uses Tailwind utility classes for all styling
- Custom colors defined inline for precise control
- Shadow effects for glows
- Absolute positioning for layered effects
- Overflow handling for drip effects

### Dependencies

All required dependencies are already present in the GhostUI package:
- framer-motion: ^11.x
- clsx: ^2.x
- tailwind-merge: ^2.x
- lucide-react: ^0.x
- react: ^18.x

No additional dependencies need to be installed.

## Documentation Structure

### Documentation Page Layout

**File**: `apps/docs/app/docs/components/spooky-progress-bar/page.tsx`

1. **Header Section**
   - Component name and description
   - Lead paragraph explaining purpose

2. **Interactive Playground**
   - Live demo with all three variants
   - Slider control to adjust progress
   - Code example showing basic usage

3. **Props Table**
   - Complete API documentation
   - Type information
   - Default values
   - Descriptions

4. **Variants Section**
   - Visual examples of each variant
   - Description of each theme
   - Code snippets

5. **Usage Examples**
   - Basic usage
   - Variant selection
   - Custom styling
   - Integration patterns

6. **Accessibility Section**
   - Keyboard support
   - Screen reader compatibility
   - ARIA attributes
   - Semantic HTML

### Code Examples

The documentation will include:
- Basic import and usage
- All three variants
- Custom className usage
- Integration with other components
- Responsive layouts
- Multiple progress bars on one page

## Integration Checklist

1. ✅ Create SpookyProgressBar.tsx component file
2. ✅ Export from components/index.ts
3. ✅ Export from main package index.ts
4. ✅ Create documentation page
5. ✅ Add to docs navigation/sidebar
6. ✅ Write unit tests
7. ✅ Write property-based tests
8. ✅ Build and verify package exports
9. ✅ Test in docs app
10. ✅ Visual QA all variants
