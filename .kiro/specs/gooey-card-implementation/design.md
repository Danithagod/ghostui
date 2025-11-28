# Design Document

## Overview

The GooeyCard component is a visually striking card component that displays content within a container featuring animated liquid drip effects and SVG-based specular lighting. The component creates a "melting" aesthetic with multiple animated drips concentrated on the right side of the card, while maintaining sharp, readable content through careful layer separation.

The implementation follows GhostUI library conventions, using framer-motion for animations, the cn utility for className management, and TypeScript for type safety. The component will be integrated into both the packages/ghostui component library and the apps/docs documentation application.

## Architecture

### Component Structure

```
GooeyCard (Container)
├── SVG Filter Definition (card-goo)
├── Liquid Layer (filtered)
│   ├── Background Shape
│   ├── Animated Drips (5 elements)
│   └── Static Pool Elements (3 elements)
├── Content Layer (unfiltered)
│   └── Children
└── Decorative Borders (2 overlays)
```

### Layer Hierarchy (z-index)

1. **z-10**: Animated drips and pool elements (within filtered layer)
2. **z-20**: Content layer (children, unfiltered)
3. **z-30**: Decorative border overlays (non-interactive)

### File Structure

```
packages/ghostui/src/
├── components/
│   ├── GooeyCard.tsx          # Main component implementation
│   └── index.ts               # Export barrel (updated)
└── lib/
    └── utils.ts               # cn utility (existing)

apps/docs/app/docs/components/
└── gooey-card/
    └── page.tsx               # Documentation page
```

## Components and Interfaces

### GooeyCard Component

**File**: `packages/ghostui/src/components/GooeyCard.tsx`

```typescript
interface GooeyCardProps {
  children: React.ReactNode;
  className?: string;
  gooColor?: string;
}

export const GooeyCard: React.FC<GooeyCardProps>
```

**Props**:
- `children` (required): Content to display within the card
- `className` (optional): Additional CSS classes for the content container
- `gooColor` (optional): Color for liquid elements (Tailwind class or hex), defaults to "bg-[#5b21b6]"

**Behavior**:
- Renders a card with minimum dimensions (320px width, 200px height)
- Applies SVG filter only to liquid layer
- Keeps content layer unfiltered for clarity
- Animates drips continuously with staggered timing
- Uses rounded corners (rounded-3xl for main shape)

### SVG Filter Pipeline

The component uses a multi-stage SVG filter to create the gooey effect with highlights:

1. **Gaussian Blur** (stdDeviation: 8): Blurs the source graphic
2. **Color Matrix**: Increases contrast to create sharp liquid edges (alpha channel: 25, offset: -9)
3. **Gaussian Blur on Goo** (stdDeviation: 2): Smooths for lighting calculation
4. **Specular Lighting**: Creates highlights with:
   - surfaceScale: 6
   - specularConstant: 1.5
   - specularExponent: 40
   - lightingColor: #ffffff
   - Light source: azimuth 225°, elevation 45°
5. **Composite (in)**: Masks highlights to goo shape
6. **Composite (over)**: Combines highlights with goo

## Data Models

### Animation Configuration

```typescript
// Drip configurations (5 drips)
interface DripConfig {
  position: string;      // CSS right position
  width: string;         // Tailwind width class
  top: string;          // CSS top position
  heights: [string, string, string];  // [initial, max, initial]
  duration: number;     // Animation duration in seconds
  delay: number;        // Animation delay in seconds
}

const dripConfigs: DripConfig[] = [
  {
    position: 'right-6',
    width: 'w-5',
    top: 'calc(100% - 35px)',
    heights: ['40px', '90px', '40px'],
    duration: 4.5,
    delay: 0
  },
  // ... 4 more drip configurations
];
```

### Pool Configuration

```typescript
interface PoolConfig {
  position: string;     // CSS right position
  width: string;        // Tailwind width class
  height: string;       // Tailwind height class
  bottom: string;       // CSS bottom position
}

const poolConfigs: PoolConfig[] = [
  { position: 'right-4', width: 'w-12', height: 'h-6', bottom: '-bottom-2' },
  { position: 'right-16', width: 'w-8', height: 'h-6', bottom: '-bottom-2' },
  { position: 'right-32', width: 'w-5', height: 'h-4', bottom: '-bottom-1' }
];
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Children rendering preservation

*For any* valid React children content, rendering it within a GooeyCard should result in that content being present in the DOM within the content layer.

**Validates: Requirements 1.2**

### Property 2: ClassName merging consistency

*For any* valid className string provided to GooeyCard, the rendered content container should include both the provided classes and the default classes without conflicts.

**Validates: Requirements 1.3**

### Property 3: Color propagation to liquid elements

*For any* valid gooColor value provided to GooeyCard, all drip elements and pool elements should have that color class applied.

**Validates: Requirements 1.4**

### Property 4: Animation height property usage

*For any* drip element in the GooeyCard, the animation configuration should include height as an animated property with an array of values indicating continuous change.

**Validates: Requirements 2.2**

### Property 5: Animation delay uniqueness

*For any* set of drip elements in the GooeyCard, each drip should have a unique animation delay value to create staggered timing.

**Validates: Requirements 2.3**

### Property 6: Animation easing consistency

*For any* drip element in the GooeyCard, the animation transition configuration should specify "easeInOut" as the easing function.

**Validates: Requirements 2.4**

## Error Handling

### Invalid Props

- **Invalid gooColor**: If a malformed color value is provided, the component will pass it through to Tailwind/CSS. Invalid Tailwind classes will be ignored by the framework, and invalid CSS colors will be ignored by the browser. No runtime errors will occur.
- **Invalid className**: The cn utility handles invalid or conflicting class names gracefully through tailwind-merge.
- **Missing children**: TypeScript enforces children as required. If undefined is passed at runtime, React will render nothing in the content area.

### Browser Compatibility

- **SVG Filter Support**: The gooey effect requires SVG filter support. All modern browsers support this, but very old browsers may not render the effect. The content will still be visible and functional.
- **Framer Motion**: Requires JavaScript enabled. If JavaScript is disabled, the card will render statically without animations.
- **CSS Custom Properties**: The component uses calc() for positioning, which is supported in all modern browsers.

### Performance Considerations

- **Animation Performance**: Uses CSS transforms (height) which may not be GPU-accelerated. For better performance, consider using scaleY instead of height in future iterations.
- **Filter Performance**: SVG filters can be computationally expensive. Limit the number of GooeyCards on a single page for optimal performance.
- **Motion Reduce**: The component should respect prefers-reduced-motion for accessibility (to be added in implementation).

## Testing Strategy

### Unit Testing

The GooeyCard component will use Vitest and React Testing Library for unit tests. Tests will focus on:

1. **Component Rendering**: Verify the component renders without errors
2. **Props Handling**: Test default props and custom prop values
3. **DOM Structure**: Verify correct number of drip and pool elements
4. **SVG Filter**: Verify filter definition exists with correct attributes
5. **Layer Separation**: Verify filter is applied only to liquid layer
6. **Export Verification**: Verify component is exported from index.ts

Example test structure:

```typescript
describe('GooeyCard', () => {
  it('renders children content', () => {
    render(<GooeyCard><div>Test</div></GooeyCard>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies custom gooColor to drips', () => {
    const { container } = render(
      <GooeyCard gooColor="bg-red-500">Content</GooeyCard>
    );
    const drips = container.querySelectorAll('.bg-red-500');
    expect(drips.length).toBeGreaterThan(0);
  });

  it('uses default color when gooColor not provided', () => {
    const { container } = render(<GooeyCard>Content</GooeyCard>);
    const defaultColorElements = container.querySelectorAll('.bg-\\[\\#5b21b6\\]');
    expect(defaultColorElements.length).toBeGreaterThan(0);
  });
});
```

### Property-Based Testing

Property-based tests will use the fast-check library (JavaScript PBT framework) to verify universal properties. Each test will run a minimum of 100 iterations with randomly generated inputs.

**PBT Library**: fast-check (https://github.com/dubzzz/fast-check)

**Property Test Requirements**:
- Each property-based test must run at least 100 iterations
- Each test must be tagged with a comment referencing the design document property
- Tag format: `// Feature: gooey-card-implementation, Property {number}: {property_text}`
- Each correctness property should be implemented by a single property-based test

**Property Tests to Implement**:

1. **Property 1 Test**: Generate random React elements (text, divs with various content) and verify they appear in the rendered output
2. **Property 2 Test**: Generate random className strings and verify they appear in the content container alongside default classes
3. **Property 3 Test**: Generate random valid Tailwind color classes and verify all liquid elements have that class
4. **Property 4 Test**: Verify all drip animations include height in their animate configuration
5. **Property 5 Test**: Verify all drip delays are unique values
6. **Property 6 Test**: Verify all drip animations use "easeInOut" easing

Example property test structure:

```typescript
import fc from 'fast-check';

// Feature: gooey-card-implementation, Property 2: ClassName merging consistency
it('merges custom classNames with defaults', () => {
  fc.assert(
    fc.property(
      fc.string(), // Generate random className
      (customClass) => {
        const { container } = render(
          <GooeyCard className={customClass}>Content</GooeyCard>
        );
        const contentLayer = container.querySelector('[class*="relative z-20"]');
        
        // Should have both custom and default classes
        expect(contentLayer?.className).toContain('relative');
        expect(contentLayer?.className).toContain('z-20');
        if (customClass) {
          expect(contentLayer?.className).toContain(customClass);
        }
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

Integration tests will verify:

1. **Documentation Page**: The component renders correctly in the docs app
2. **Export Chain**: Component can be imported from the main package entry point
3. **TypeScript Types**: Types are available and correct when importing
4. **Multiple Instances**: Multiple GooeyCards can render on the same page without conflicts

### Visual Regression Testing

While not automated in this spec, visual regression testing is recommended for:

- SVG filter rendering across browsers
- Animation smoothness and timing
- Color application and blending
- Layer stacking and z-index behavior

## Implementation Notes

### Dependency on Existing Utilities

- **cn utility**: Import from `@/lib/utils` (existing)
- **framer-motion**: Already in package.json dependencies
- **clsx & tailwind-merge**: Already in package.json dependencies

### Code Reuse from GooeyButton

The GooeyCard shares similar SVG filter concepts with GooeyButton but differs in:
- Filter ID (card-goo vs goo-filter-{id})
- Filter parameters (different blur and contrast values)
- No hover state or click interactions
- Different drip positioning (right-side concentration vs bottom-center)
- Card shape (rounded-3xl) vs button shape (rounded-full)

### Accessibility Considerations

1. **SVG aria-hidden**: The SVG filter definition should have `aria-hidden="true"` since it's purely decorative
2. **Semantic HTML**: Use div elements appropriately; the card itself is a container, not an interactive element
3. **Motion Preferences**: Consider adding `motion-reduce:` variants to disable animations for users who prefer reduced motion
4. **Color Contrast**: Ensure text content has sufficient contrast against the gooColor background

### Performance Optimizations

1. **Static SVG**: The SVG filter is defined once and reused via ID reference
2. **CSS Transforms**: Animations use transform properties where possible
3. **Will-change**: Consider adding `will-change: height` to drip elements for better animation performance
4. **Lazy Loading**: The component doesn't require lazy loading as it's lightweight

## Documentation Requirements

### Component Page Structure

The documentation page at `apps/docs/app/docs/components/gooey-card/page.tsx` should include:

1. **Hero Section**: Visual example with the "Quest Complete" demo
2. **Description**: Explanation of the component's purpose and visual effect
3. **Installation**: Import statement and usage
4. **Props Table**: Document all props with types and defaults
5. **Examples Section**:
   - Basic usage
   - Custom color
   - Custom content (different layouts)
   - Multiple cards
6. **Code Blocks**: Show implementation code for each example
7. **Technical Notes**: Explain the SVG filter and animation approach

### Props Documentation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Content to display within the card |
| className | string | undefined | Additional CSS classes for content container |
| gooColor | string | "bg-[#5b21b6]" | Tailwind color class for liquid elements |

### Usage Examples

```typescript
// Basic usage
<GooeyCard>
  <h1>Hello World</h1>
</GooeyCard>

// Custom color
<GooeyCard gooColor="bg-emerald-600">
  <p>Custom green liquid</p>
</GooeyCard>

// With custom styling
<GooeyCard className="text-center">
  <div className="space-y-4">
    <h2>Title</h2>
    <p>Description</p>
  </div>
</GooeyCard>
```
