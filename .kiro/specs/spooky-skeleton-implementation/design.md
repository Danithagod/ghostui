# Design Document

## Overview

The SpookySkeleton component is a themed skeleton loader that provides four distinct supernatural animation variants to replace traditional grey loading states. The component consists of a main `SpookySkeleton` component that renders a pre-configured card layout, and a composable `SkeletonBlock` sub-component that allows developers to create custom skeleton layouts.

The design leverages CSS keyframe animations injected via a `<style>` tag, Tailwind CSS for styling, and the existing GhostUI utility patterns. The component will be fully typed with TypeScript, accessible, and performant for multiple instances on a single page.

## Architecture

### Component Hierarchy

```
SpookySkeleton (Main Component)
├── <style> (CSS Keyframes Injection)
├── Card Container
│   ├── Avatar Section
│   │   ├── SkeletonBlock (circular avatar)
│   │   └── Text Group
│   │       ├── SkeletonBlock (title)
│   │       └── SkeletonBlock (subtitle)
│   ├── Content Section
│   │   ├── SkeletonBlock (line 1)
│   │   ├── SkeletonBlock (line 2)
│   │   └── SkeletonBlock (line 3)
│   └── Decorative Icon (Ghost)
│
SkeletonBlock (Sub-component)
├── Base Container (div)
├── Animation Classes (variant-specific)
└── Fog Overlay (conditional, fog variant only)
```

### File Structure

```
packages/ghostui/src/components/
├── SpookySkeleton.tsx          # Main component implementation
└── index.ts                     # Updated with exports

apps/docs/app/docs/components/
└── spooky-skeleton/
    └── page.tsx                 # Documentation page
```

### Dependencies

- **React**: Core library (peer dependency)
- **clsx & tailwind-merge**: Class name merging via `cn` utility
- **lucide-react**: Icon library for decorative Ghost icon
- **Tailwind CSS**: Styling framework
- **TypeScript**: Type safety

## Components and Interfaces

### SpookySkeleton Component

**Purpose**: Renders a pre-configured skeleton card with avatar, title, subtitle, and content lines.

**TypeScript Interface**:
```typescript
export interface SpookySkeletonProps {
  variant: 'sweep' | 'scan' | 'flicker' | 'fog';
  className?: string;
}
```

**Props**:
- `variant` (required): Determines which animation style to apply
- `className` (optional): Additional Tailwind classes for the card container

**Rendering Logic**:
1. Inject CSS keyframes via `<style>` tag
2. Render card container with dark theme styling
3. Render avatar section with circular SkeletonBlock
4. Render title and subtitle SkeletonBlocks
5. Render three content line SkeletonBlocks with varying widths
6. Render decorative Ghost icon in top-right corner

### SkeletonBlock Component

**Purpose**: Renders an individual skeleton element with animation applied.

**TypeScript Interface**:
```typescript
interface SkeletonBlockProps {
  variant: 'sweep' | 'scan' | 'flicker' | 'fog';
  className?: string;
}
```

**Props**:
- `variant` (required): Animation style to apply
- `className` (optional): Additional Tailwind classes for size, shape, and positioning

**Rendering Logic**:
1. Apply base styles: `relative overflow-hidden rounded-md`
2. Determine variant-specific class based on animation type
3. For 'fog' variant, render additional overlay div with blur effect
4. Merge all classes using `cn` utility

**Variant Class Mapping**:
- `sweep`: `animate-spirit-sweep` (gradient animation)
- `scan`: `bg-[#1e1e2e] scanline` (dark base + pseudo-element scanline)
- `flicker`: `animate-ecto-flicker` (opacity flicker)
- `fog`: `bg-[#2d2d44]` + fog overlay child element

## Data Models

### Animation Variant Type

```typescript
type AnimationVariant = 'sweep' | 'scan' | 'flicker' | 'fog';
```

This union type ensures type safety when passing variant props and prevents invalid animation names.

### Variant Configuration (Documentation)

For the documentation demo, we'll use a configuration array:

```typescript
interface VariantConfig {
  id: AnimationVariant;
  label: string;
  icon: React.ReactNode;
}

const variants: VariantConfig[] = [
  { id: 'sweep', label: 'Spirit Sweep', icon: <Ghost size={16} /> },
  { id: 'scan', label: 'Ghost Scan', icon: <Scan size={16} /> },
  { id: 'flicker', label: 'Ecto Flicker', icon: <Zap size={16} /> },
  { id: 'fog', label: 'Fog Pulse', icon: <CloudFog size={16} /> },
];
```

## CSS Keyframes and Animations

### 1. Spirit Sweep Animation

**Keyframe**: `spirit-sweep`
```css
@keyframes spirit-sweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Applied Class**: `animate-spirit-sweep`
```css
.animate-spirit-sweep {
  background: linear-gradient(90deg, #1a0b2e 0%, #2e1065 25%, #22c55e 50%, #2e1065 75%, #1a0b2e 100%);
  background-size: 200% 100%;
  animation: spirit-sweep 3s linear infinite;
}
```

**Effect**: Purple-to-green gradient sweeps horizontally across the element.

### 2. Ghost Scanline Animation

**Keyframe**: `scanline-move`
```css
@keyframes scanline-move {
  0% { top: -10%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 110%; opacity: 0; }
}
```

**Applied Class**: `scanline`
```css
.scanline::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: #00ff7f;
  box-shadow: 0 0 10px #00ff7f, 0 0 20px #00ff7f;
  opacity: 0.6;
  animation: scanline-move 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  z-index: 10;
}
```

**Effect**: Green glowing line moves vertically from top to bottom, creating a radar scan effect.

### 3. Ecto Flicker Animation

**Keyframe**: `ecto-flicker`
```css
@keyframes ecto-flicker {
  0%, 100% { opacity: 0.3; }
  5% { opacity: 0.8; }
  10% { opacity: 0.3; }
  15% { opacity: 0.3; }
  20% { opacity: 0.7; }
  40% { opacity: 0.3; }
  80% { opacity: 0.5; }
}
```

**Applied Class**: `animate-ecto-flicker`
```css
.animate-ecto-flicker {
  animation: ecto-flicker 3s steps(10, start) infinite;
  background-color: #4c1d95;
}
```

**Effect**: Irregular opacity flickering simulating unstable ectoplasm energy.

### 4. Fog Pulse Animation

**Keyframe**: `fog-drift`
```css
@keyframes fog-drift {
  0% { transform: translateX(-10%); opacity: 0.2; }
  50% { transform: translateX(10%); opacity: 0.5; }
  100% { transform: translateX(-10%); opacity: 0.2; }
}
```

**Applied Class**: `fog-overlay`
```css
.fog-overlay {
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  filter: blur(20px);
  animation: fog-drift 6s ease-in-out infinite alternate;
}
```

**Effect**: Blurred radial gradient drifts horizontally, simulating rolling mist.

### CSS Injection Strategy

All keyframes and animation classes will be injected once per component instance via a `<style>` tag. While this means multiple instances will inject the same styles multiple times, modern browsers handle duplicate style definitions efficiently, and this approach:
- Keeps the component self-contained
- Avoids global CSS pollution
- Works without build-time CSS processing
- Maintains compatibility with the existing GhostUI architecture

For production optimization, these styles could be extracted to the main CSS bundle in a future iteration.

## Accessibility Considerations

### Reduced Motion Support

All animations will respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-spirit-sweep,
  .animate-ecto-flicker,
  .fog-overlay,
  .scanline::after {
    animation: none;
  }
}
```

This will be added to the injected `<style>` tag to ensure users with motion sensitivity see static skeleton states.

### Semantic HTML

- Use semantic `<div>` elements with appropriate structure
- Decorative Ghost icon will have `aria-hidden="true"` implied by its decorative nature
- No interactive elements within skeleton (loading states are non-interactive)

### Screen Reader Considerations

Consider adding an optional `aria-label` or `aria-busy` attribute to the container:

```typescript
<div 
  className={cn("...", className)}
  role="status"
  aria-label="Loading content"
>
```

This provides context to screen reader users that content is loading.

## Performance Optimizations

### GPU Acceleration

All animations use GPU-accelerated CSS properties:
- `transform` (translateX, translateY)
- `opacity`
- `background-position`

Avoid animating properties that trigger layout recalculation (width, height, margin, padding).

### Animation Performance

- **Spirit Sweep**: Uses `background-position` which is GPU-accelerated
- **Ghost Scan**: Uses `transform: translateY` via `top` property (could be optimized to pure transform)
- **Ecto Flicker**: Uses `opacity` which is GPU-accelerated
- **Fog Pulse**: Uses `transform: translateX` and `opacity`, both GPU-accelerated

### Multiple Instances

The component is designed to handle multiple instances efficiently:
- CSS keyframes are defined once and reused
- No JavaScript-based animations (pure CSS)
- No event listeners or timers
- Minimal DOM structure

## Documentation Structure

The documentation page will follow the established GhostUI pattern with these sections:

1. **Hero Section**: Title, description, and primary example
2. **How It Works**: Explanation of the four animation variants
3. **Basic Usage**: Simple code example with ComponentPlayground
4. **Animation Variants**: Interactive demo with variant selector buttons
5. **Custom Layouts**: Examples showing SkeletonBlock composition
6. **Profile Card Example**: Pre-configured SpookySkeleton usage
7. **Media Card Example**: Custom layout with image placeholder
8. **Real-World Examples**: Practical use cases (loading lists, cards, forms)
9. **Accessibility**: Reduced motion support and semantic HTML
10. **Performance**: GPU acceleration and multi-instance handling
11. **Props Table**: Complete API documentation

### ComponentPlayground Integration

Each example will use the `ComponentPlayground` component:

```typescript
<ComponentPlayground
  preview={<SpookySkeleton variant="sweep" />}
  code={`import { SpookySkeleton } from 'ghostui-react';

export default function MyComponent() {
  return <SpookySkeleton variant="sweep" />;
}`}
  api={<PropsTable props={props} />}
/>
```

## Integration Steps

### 1. Component Implementation

Create `packages/ghostui/src/components/SpookySkeleton.tsx` with:
- SpookySkeleton main component
- SkeletonBlock sub-component
- TypeScript interfaces
- CSS keyframes injection
- Proper exports

### 2. Package Exports

Update `packages/ghostui/src/components/index.ts`:
```typescript
export { SpookySkeleton, SkeletonBlock, type SpookySkeletonProps, type SkeletonBlockProps } from './SpookySkeleton';
```

### 3. Documentation Page

Create `apps/docs/app/docs/components/spooky-skeleton/page.tsx` with:
- Component imports
- Props table data
- Interactive examples
- Code samples
- Comprehensive documentation sections

### 4. Build and Test

- Run `npm run build` in `packages/ghostui` to compile TypeScript
- Verify exports in dist bundle
- Test documentation page in dev mode
- Verify all four animation variants work correctly



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Variant animation class application

*For any* valid animation variant ('sweep', 'scan', 'flicker', 'fog'), when SpookySkeleton or SkeletonBlock is rendered with that variant, the component should apply the corresponding animation class or styling to the skeleton elements.

**Validates: Requirements 1.2, 7.3**

### Property 2: ClassName merging preserves custom classes

*For any* custom className string provided to SpookySkeleton or SkeletonBlock, the rendered component should include those custom classes in addition to the base component classes without losing either set of styles.

**Validates: Requirements 1.3, 7.1, 7.4**

### Property 3: SpookySkeleton structure completeness

*For any* render of SpookySkeleton with any valid variant, the component should render all required structural elements: a card container with dark background and border, a circular avatar skeleton block, title and subtitle skeleton blocks, exactly three content line skeleton blocks with varying widths, and a decorative Ghost icon in the top-right corner.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 4: Reduced motion disables animations

*For any* animation variant, when the prefers-reduced-motion media query is enabled, the component should not apply active animations to skeleton elements.

**Validates: Requirements 6.1**

### Property 5: Semantic HTML and ARIA attributes

*For any* render of SpookySkeleton, the component should use semantic HTML elements and include appropriate ARIA attributes (such as role="status") to provide context for assistive technologies.

**Validates: Requirements 6.2**

### Property 6: Interactive variant selector updates display

*For any* variant selector button in the documentation demo, when clicked, the displayed skeleton examples should update to show the selected animation variant.

**Validates: Requirements 9.5**

## Error Handling

### Invalid Variant Prop

The component uses TypeScript to enforce valid variant values at compile time. If an invalid variant is somehow passed at runtime, the component should:

1. Fall back to a default variant ('sweep')
2. Log a warning to the console in development mode
3. Continue rendering without crashing

Implementation:
```typescript
const getVariantClass = () => {
  switch (variant) {
    case 'sweep':
      return "animate-spirit-sweep";
    case 'scan':
      return "bg-[#1e1e2e] scanline";
    case 'flicker':
      return "animate-ecto-flicker";
    case 'fog':
      return "bg-[#2d2d44]";
    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid variant "${variant}" provided to SkeletonBlock. Falling back to default.`);
      }
      return "animate-spirit-sweep"; // Default fallback
  }
};
```

### Missing Dependencies

If lucide-react icons are not available:
- The component should still render the skeleton structure
- The decorative Ghost icon should gracefully fail (empty space)
- No runtime errors should occur

### CSS Injection Failures

If the `<style>` tag fails to inject (unlikely but possible in restricted environments):
- The component should still render with base styling
- Animations may not work, but structure remains intact
- No runtime errors should occur

## Testing Strategy

### Unit Testing

We will use **Vitest** and **React Testing Library** (already configured in the GhostUI package) for unit tests.

**Test Coverage**:

1. **Component Rendering**:
   - Test that SpookySkeleton renders without errors
   - Test that SkeletonBlock renders without errors
   - Verify basic DOM structure is present

2. **Variant Application**:
   - Test each variant ('sweep', 'scan', 'flicker', 'fog') applies correct classes
   - Test that invalid variants fall back gracefully

3. **ClassName Merging**:
   - Test that custom className prop is applied to container
   - Test that base classes are preserved when custom classes are added

4. **Structure Validation**:
   - Test that all required skeleton blocks are rendered
   - Test that Ghost icon is present
   - Test that correct number of content lines are rendered

5. **Accessibility**:
   - Test that role="status" attribute is present
   - Test that aria-label is applied
   - Test that decorative elements don't interfere with screen readers

**Example Unit Test**:
```typescript
import { render, screen } from '@testing-library/react';
import { SpookySkeleton } from './SpookySkeleton';

describe('SpookySkeleton', () => {
  it('renders with sweep variant', () => {
    const { container } = render(<SpookySkeleton variant="sweep" />);
    const animatedElement = container.querySelector('.animate-spirit-sweep');
    expect(animatedElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<SpookySkeleton variant="sweep" className="custom-class" />);
    const cardContainer = container.firstChild;
    expect(cardContainer).toHaveClass('custom-class');
  });

  it('renders all structural elements', () => {
    const { container } = render(<SpookySkeleton variant="sweep" />);
    // Verify avatar, title, subtitle, and content lines are present
    const skeletonBlocks = container.querySelectorAll('.rounded-md');
    expect(skeletonBlocks.length).toBeGreaterThanOrEqual(6); // avatar + title + subtitle + 3 lines
  });
});
```

### Property-Based Testing

We will use **fast-check** (needs to be added as a dev dependency) for property-based testing.

**Property Test Configuration**:
- Minimum 100 iterations per property test
- Each test will be tagged with a comment referencing the design document property

**Property Tests**:

1. **Property 1: Variant animation class application**
   ```typescript
   import * as fc from 'fast-check';
   import { render } from '@testing-library/react';
   import { SpookySkeleton, SkeletonBlock } from './SpookySkeleton';

   // Feature: spooky-skeleton-implementation, Property 1: Variant animation class application
   it('applies correct animation class for any valid variant', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('sweep', 'scan', 'flicker', 'fog'),
         (variant) => {
           const { container } = render(<SpookySkeleton variant={variant} />);
           
           const expectedClasses = {
             sweep: 'animate-spirit-sweep',
             scan: 'scanline',
             flicker: 'animate-ecto-flicker',
             fog: 'fog-overlay'
           };
           
           const hasExpectedClass = container.innerHTML.includes(expectedClasses[variant]);
           expect(hasExpectedClass).toBe(true);
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

2. **Property 2: ClassName merging preserves custom classes**
   ```typescript
   // Feature: spooky-skeleton-implementation, Property 2: ClassName merging preserves custom classes
   it('preserves custom classes for any className string', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('sweep', 'scan', 'flicker', 'fog'),
         fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z-]+$/.test(s)),
         (variant, customClass) => {
           const { container } = render(<SpookySkeleton variant={variant} className={customClass} />);
           const cardContainer = container.firstChild as HTMLElement;
           
           // Custom class should be present
           expect(cardContainer.className).toContain(customClass);
           
           // Base classes should also be present
           expect(cardContainer.className).toContain('rounded-2xl');
           expect(cardContainer.className).toContain('border');
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

3. **Property 3: SpookySkeleton structure completeness**
   ```typescript
   // Feature: spooky-skeleton-implementation, Property 3: SpookySkeleton structure completeness
   it('renders complete structure for any variant', () => {
     fc.assert(
       fc.property(
         fc.constantFrom('sweep', 'scan', 'flicker', 'fog'),
         (variant) => {
           const { container } = render(<SpookySkeleton variant={variant} />);
           
           // Should have card container with dark background
           const cardContainer = container.firstChild as HTMLElement;
           expect(cardContainer.className).toContain('bg-[#0f0716]');
           expect(cardContainer.className).toContain('rounded-2xl');
           expect(cardContainer.className).toContain('border');
           
           // Should have multiple skeleton blocks (avatar + title + subtitle + 3 lines = 6)
           const skeletonBlocks = container.querySelectorAll('.rounded-md, .rounded-full');
           expect(skeletonBlocks.length).toBeGreaterThanOrEqual(6);
           
           // Should have Ghost icon
           const ghostIcon = container.querySelector('svg');
           expect(ghostIcon).toBeInTheDocument();
         }
       ),
       { numRuns: 100 }
     );
   });
   ```

### Integration Testing

Integration tests will verify:

1. **Package Exports**: Verify SpookySkeleton and SkeletonBlock are exported from 'ghostui-react'
2. **Documentation Page**: Verify the documentation page renders without errors
3. **Multiple Instances**: Verify multiple SpookySkeleton components can render on the same page
4. **Build Process**: Verify the component builds correctly and TypeScript definitions are generated

### Manual Testing Checklist

- [ ] Visual verification of all four animation variants
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test with reduced motion preferences enabled
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify animations are smooth at 60fps
- [ ] Test responsive behavior at different screen sizes
- [ ] Verify documentation examples are accurate and functional

## Build and Deployment

### Build Process

1. **Component Build**:
   ```bash
   cd packages/ghostui
   npm run build
   ```
   This will:
   - Compile TypeScript to JavaScript
   - Generate type definitions (.d.ts files)
   - Bundle with Vite
   - Output to `dist/` directory

2. **Documentation Build**:
   ```bash
   cd apps/docs
   npm run build
   ```
   This will:
   - Build Next.js application
   - Generate static pages
   - Output to `.next/` directory

### Verification Steps

After building:

1. Verify exports in `packages/ghostui/dist/index.d.ts`:
   ```typescript
   export { SpookySkeleton, SkeletonBlock, type SpookySkeletonProps } from './SpookySkeleton';
   ```

2. Verify component bundle size is reasonable (< 10KB gzipped)

3. Test import in a sample application:
   ```typescript
   import { SpookySkeleton } from 'ghostui-react';
   ```

4. Verify documentation page is accessible at `/docs/components/spooky-skeleton`

### Dependencies

**No new runtime dependencies required**. The component uses:
- Existing: `clsx`, `tailwind-merge`, `lucide-react`, `react`

**New dev dependency for testing**:
- `fast-check`: For property-based testing

Add to `packages/ghostui/package.json`:
```json
{
  "devDependencies": {
    "fast-check": "^3.15.0"
  }
}
```

## Future Enhancements

Potential improvements for future iterations:

1. **Global CSS Extraction**: Move keyframes to main CSS bundle to avoid duplicate injection
2. **Additional Variants**: Add more animation styles (pulse, wave, shimmer)
3. **Customizable Colors**: Allow color customization via props
4. **Preset Layouts**: Add more pre-configured layouts (list item, form, table row)
5. **Animation Speed Control**: Add prop to control animation duration
6. **Dark/Light Mode**: Adapt colors based on theme
7. **Storybook Integration**: Add Storybook stories for visual testing
8. **Performance Monitoring**: Add performance metrics tracking for animations
